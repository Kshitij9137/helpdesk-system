from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import User

@admin.register(User)
class CustomUserAdmin(UserAdmin):
    # Columns shown in the user list table
    list_display  = ['username', 'email', 'role', 'is_staff', 'is_active']
    list_filter   = ['role', 'is_staff', 'is_active']
    search_fields = ['username', 'email']
    ordering      = ['username']

    # Add 'role' and 'phone' to the user detail/edit page
    fieldsets = UserAdmin.fieldsets + (
        ('Custom Fields', {
            'fields': ('role', 'phone', 'profile_picture')
        }),
    )

    # Add 'role' to the create user page
    add_fieldsets = UserAdmin.add_fieldsets + (
        ('Custom Fields', {
            'fields': ('role', 'phone')
        }),
    )