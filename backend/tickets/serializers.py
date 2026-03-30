from rest_framework import serializers
from .models import Ticket
from django.contrib.auth import get_user_model

User = get_user_model()

class TicketSerializer(serializers.ModelSerializer):
    created_by  = serializers.StringRelatedField(read_only=True)
    assigned_to = serializers.StringRelatedField(read_only=True)

    class Meta:
        model  = Ticket
        fields = [
            'id', 'title', 'description',
            'status', 'priority',
            'created_by', 'assigned_to',
            'created_at', 'updated_at'
        ]
        read_only_fields = ['created_by', 'created_at', 'updated_at']


class TicketAssignSerializer(serializers.ModelSerializer):
    """Only admin uses this to assign a ticket to an agent"""
    class Meta:
        model  = Ticket
        fields = ['assigned_to']