from django.urls import path
from .views import (
    TicketSummaryView,
    TicketTrendView,
    TicketResolutionTimeView,
    TicketByPriorityView,
    AgentPerformanceView,
)

urlpatterns = [
    path('summary/',         TicketSummaryView.as_view(),        name='analytics-summary'),
    path('trends/',          TicketTrendView.as_view(),          name='analytics-trends'),
    path('resolution-time/', TicketResolutionTimeView.as_view(), name='analytics-resolution'),
    path('by-priority/',     TicketByPriorityView.as_view(),     name='analytics-priority'),
    path('agent-performance/', AgentPerformanceView.as_view(),   name='analytics-agents'),
]