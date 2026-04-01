from django.urls import path
from rest_framework_simplejwt.views import (
    TokenRefreshView,
    TokenBlacklistView,
)
# ✅ FIX: import custom view instead of default
from .token import CustomTokenObtainPairView
from .views import RegisterView, ProfileView, UserListView

urlpatterns = [
    path('register/',      RegisterView.as_view(),              name='register'),
    path('login/',         CustomTokenObtainPairView.as_view(), name='login'),  # ✅ changed
    path('token/refresh/', TokenRefreshView.as_view(),          name='token_refresh'),
    path('logout/',        TokenBlacklistView.as_view(),        name='logout'),
    path('profile/',       ProfileView.as_view(),               name='profile'),
    path('all-users/',     UserListView.as_view(),              name='all-users'),
]