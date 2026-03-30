from rest_framework import generics, permissions, status
from rest_framework.response import Response
from rest_framework.views import APIView
from django.contrib.auth import get_user_model
from .models import Ticket
from .serializers import TicketSerializer, TicketAssignSerializer
from users.permissions import IsAdmin, IsAdminOrAgent

User = get_user_model()


class TicketListCreateView(generics.ListCreateAPIView):
    serializer_class   = TicketSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        qs   = Ticket.objects.all()

        # Admins & agents see all tickets, users see only their own
        if user.role == 'user':
            qs = qs.filter(created_by=user)

        # Filters
        status_filter   = self.request.query_params.get('status')
        priority_filter = self.request.query_params.get('priority')
        assigned_filter = self.request.query_params.get('assigned_to')

        if status_filter:
            qs = qs.filter(status=status_filter)
        if priority_filter:
            qs = qs.filter(priority=priority_filter)
        if assigned_filter:
            qs = qs.filter(assigned_to__id=assigned_filter)

        return qs.order_by('-created_at')

    def perform_create(self, serializer):
        # Automatically set created_by to the logged-in user
        serializer.save(created_by=self.request.user)


class TicketDetailView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class   = TicketSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        if user.role == 'user':
            return Ticket.objects.filter(created_by=user)
        return Ticket.objects.all()


class TicketAssignView(APIView):
    """Admin only — assign a ticket to an agent"""
    permission_classes = [IsAdmin]

    def patch(self, request, pk):
        try:
            ticket = Ticket.objects.get(pk=pk)
        except Ticket.DoesNotExist:
            return Response(
                {"error": "Ticket not found"},
                status=status.HTTP_404_NOT_FOUND
            )

        # Make sure assigned user is an agent
        assigned_id = request.data.get('assigned_to')
        try:
            agent = User.objects.get(pk=assigned_id, role='agent')
        except User.DoesNotExist:
            return Response(
                {"error": "User not found or is not an agent"},
                status=status.HTTP_400_BAD_REQUEST
            )

        ticket.assigned_to = agent
        ticket.status      = 'in_progress'
        ticket.save()

        return Response(
            TicketSerializer(ticket).data,
            status=status.HTTP_200_OK
        )