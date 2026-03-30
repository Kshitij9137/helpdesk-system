from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import permissions
from django.db.models import Count, Avg, F, ExpressionWrapper, DurationField
from django.db.models.functions import TruncDate, TruncWeek
from django.utils import timezone
from datetime import timedelta
from tickets.models import Ticket
from users.permissions import IsAdmin, IsAdminOrAgent


class TicketSummaryView(APIView):
    """
    Overall ticket counts by status.
    Accessible by Admin and Agent.
    """
    permission_classes = [IsAdminOrAgent]

    def get(self, request):
        total      = Ticket.objects.count()
        open_count = Ticket.objects.filter(status='open').count()
        inprog     = Ticket.objects.filter(status='in_progress').count()
        resolved   = Ticket.objects.filter(status='resolved').count()
        closed     = Ticket.objects.filter(status='closed').count()

        return Response({
            "total":       total,
            "open":        open_count,
            "in_progress": inprog,
            "resolved":    resolved,
            "closed":      closed,
        })


class TicketTrendView(APIView):
    """
    Tickets created per day for the last 30 days.
    Accessible by Admin and Agent.
    """
    permission_classes = [IsAdminOrAgent]

    def get(self, request):
        # Default last 30 days, can pass ?days=7 for last 7 days
        days     = int(request.query_params.get('days', 30))
        since    = timezone.now() - timedelta(days=days)

        daily_trend = (
            Ticket.objects
            .filter(created_at__gte=since)
            .annotate(date=TruncDate('created_at'))
            .values('date')
            .annotate(count=Count('id'))
            .order_by('date')
        )

        weekly_trend = (
            Ticket.objects
            .filter(created_at__gte=since)
            .annotate(week=TruncWeek('created_at'))
            .values('week')
            .annotate(count=Count('id'))
            .order_by('week')
        )

        return Response({
            "period_days":    days,
            "daily_trend":    list(daily_trend),
            "weekly_trend":   list(weekly_trend),
        })


class TicketResolutionTimeView(APIView):
    """
    Average resolution time and per-ticket resolution time.
    Only for resolved/closed tickets.
    Accessible by Admin only.
    """
    permission_classes = [IsAdmin]

    def get(self, request):
        resolved_tickets = Ticket.objects.filter(
            status__in=['resolved', 'closed']
        ).annotate(
            resolution_time=ExpressionWrapper(
                F('updated_at') - F('created_at'),
                output_field=DurationField()
            )
        ).values('id', 'title', 'status', 'priority', 'resolution_time')

        # Format duration into readable hours
        ticket_list = []
        total_seconds = 0
        count = 0

        for ticket in resolved_tickets:
            duration = ticket['resolution_time']
            if duration:
                hours = round(duration.total_seconds() / 3600, 2)
                total_seconds += duration.total_seconds()
                count += 1
                ticket_list.append({
                    "id":              ticket['id'],
                    "title":           ticket['title'],
                    "status":          ticket['status'],
                    "priority":        ticket['priority'],
                    "resolution_hours": hours,
                })

        avg_hours = round(total_seconds / 3600 / count, 2) if count else 0

        return Response({
            "average_resolution_hours": avg_hours,
            "resolved_tickets":         ticket_list,
        })


class TicketByPriorityView(APIView):
    """
    Ticket count grouped by priority.
    Accessible by Admin and Agent.
    """
    permission_classes = [IsAdminOrAgent]

    def get(self, request):
        data = (
            Ticket.objects
            .values('priority')
            .annotate(count=Count('id'))
            .order_by('priority')
        )
        return Response(list(data))


class AgentPerformanceView(APIView):
    """
    Per-agent ticket stats — how many assigned, resolved, still open.
    Admin only.
    """
    permission_classes = [IsAdmin]

    def get(self, request):
        from django.contrib.auth import get_user_model
        User = get_user_model()

        agents = User.objects.filter(role='agent')
        result = []

        for agent in agents:
            assigned  = Ticket.objects.filter(assigned_to=agent).count()
            resolved  = Ticket.objects.filter(
                assigned_to=agent,
                status__in=['resolved', 'closed']
            ).count()
            open_count = Ticket.objects.filter(
                assigned_to=agent,
                status__in=['open', 'in_progress']
            ).count()

            result.append({
                "agent_id":       agent.id,
                "agent_username": agent.username,
                "total_assigned": assigned,
                "resolved":       resolved,
                "open":           open_count,
            })

        return Response(result)