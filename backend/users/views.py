from rest_framework import generics, permissions, status
from rest_framework.response import Response
from rest_framework.views import APIView
from django.contrib.auth import get_user_model
from .serializers import RegisterSerializer, UserProfileSerializer
from .permissions import IsAdmin

User = get_user_model()

# Register
class RegisterView(generics.CreateAPIView):
    queryset         = User.objects.all()
    serializer_class = RegisterSerializer
    permission_classes = [permissions.AllowAny]


# Get & Update own profile
class ProfileView(generics.RetrieveUpdateAPIView):
    serializer_class   = UserProfileSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_object(self):
        return self.request.user


# Admin only — list all users
class UserListView(generics.ListAPIView):
    queryset           = User.objects.all()
    serializer_class   = UserProfileSerializer
    permission_classes = [IsAdmin]