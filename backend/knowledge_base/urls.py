from django.urls import path
from .views import (
    FAQListCreateView, FAQDetailView,
    CategoryListCreateView, CategoryDetailView
)

urlpatterns = [
    # FAQ endpoints
    path('faqs/',          FAQListCreateView.as_view(), name='faq-list-create'),
    path('faqs/<int:pk>/', FAQDetailView.as_view(),     name='faq-detail'),

    # Category endpoints
    path('categories/',          CategoryListCreateView.as_view(), name='category-list-create'),
    path('categories/<int:pk>/', CategoryDetailView.as_view(),     name='category-detail'),
]