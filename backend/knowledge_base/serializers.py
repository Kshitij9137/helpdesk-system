from rest_framework import serializers
from .models import FAQ, Category


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model  = Category
        fields = ['id', 'name']


class FAQSerializer(serializers.ModelSerializer):
    category_name = serializers.CharField(
        source='category.name', read_only=True
    )

    class Meta:
        model  = FAQ
        fields = [
            'id', 'question', 'answer',
            'category', 'category_name',
            'tags', 'is_published',
            'created_at', 'updated_at'
        ]
        read_only_fields = ['created_at', 'updated_at']