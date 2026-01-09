from django.contrib import admin
from unfold.admin import ModelAdmin
from .models import Post

@admin.register(Post)
class PostAdmin(ModelAdmin):
    list_display = ["title", "author", "is_published", "created_at"]
    search_fields = ["title", "content"]
    list_filter = ["is_published", "created_at"]

    prepopulated_fields = {"slug": ("title",)}