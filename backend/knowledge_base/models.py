from django.db import models

class Category(models.Model):
    name = models.CharField(max_length=100, unique=True)

    def __str__(self):
        return self.name


class FAQ(models.Model):
    question    = models.CharField(max_length=500)
    answer      = models.TextField()
    category    = models.ForeignKey(
        Category,
        on_delete=models.SET_NULL,
        null=True, blank=True,
        related_name='faqs'
    )
    tags        = models.CharField(
        max_length=255, blank=True,
        help_text="Comma separated tags e.g. login,password,account"
    )
    is_published = models.BooleanField(default=True)
    created_at  = models.DateTimeField(auto_now_add=True)
    updated_at  = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.question