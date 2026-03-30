from django.contrib.auth.models import AbstractUser
from django.db import models

class User(AbstractUser):
    class Role(models.TextChoices):
        ADMIN = 'admin', 'Admin'
        AGENT = 'agent', 'Agent'
        USER  = 'user',  'User'

    role = models.CharField(
        max_length=10,
        choices=Role.choices,
        default=Role.USER
    )
    phone = models.CharField(max_length=15, blank=True, null=True)
    profile_picture = models.ImageField(
        upload_to='profile_pics/', blank=True, null=True
    )

    def __str__(self):
        return f"{self.username} ({self.role})"