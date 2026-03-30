from rest_framework import generics, permissions
from django.db.models import Q
from .models import FAQ, Category
from .serializers import FAQSerializer, CategorySerializer
from users.permissions import IsAdmin


# ─── Category Views ───────────────────────────────────────────

class CategoryListCreateView(generics.ListCreateAPIView):
    queryset           = Category.objects.all()
    serializer_class   = CategorySerializer

    def get_permissions(self):
        if self.request.method == 'GET':
            return [permissions.AllowAny()]   # Anyone can list categories
        return [IsAdmin()]                     # Only admin can create


class CategoryDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset           = Category.objects.all()
    serializer_class   = CategorySerializer
    permission_classes = [IsAdmin]


# ─── FAQ Views ────────────────────────────────────────────────

class FAQListCreateView(generics.ListCreateAPIView):
    serializer_class = FAQSerializer

    def get_permissions(self):
        if self.request.method == 'GET':
            return [permissions.AllowAny()]   # Anyone can read/search FAQs
        return [IsAdmin()]                     # Only admin can create

    def get_queryset(self):
        qs = FAQ.objects.filter(is_published=True)

        # Search by keyword in question or answer
        search = self.request.query_params.get('search')
        if search:
            qs = qs.filter(
                Q(question__icontains=search) |
                Q(answer__icontains=search)   |
                Q(tags__icontains=search)
            )

        # Filter by category
        category = self.request.query_params.get('category')
        if category:
            qs = qs.filter(category__id=category)

        return qs.order_by('-created_at')


class FAQDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset         = FAQ.objects.all()
    serializer_class = FAQSerializer

    def get_permissions(self):
        if self.request.method == 'GET':
            return [permissions.AllowAny()]   # Anyone can read a single FAQ
        return [IsAdmin()]                     # Only admin can edit/delete