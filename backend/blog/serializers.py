from rest_framework import serializers
from .models import Post

class PostSerializer(serializers.ModelSerializer):
    # Formata a data para ficar bonita (ex: "19/12/2025")
    created_at = serializers.DateTimeField(format="%d/%m/%Y")
    
    class Meta:
        model = Post
        fields = ['id', 'title', 'slug', 'created_at', 'is_published', 'cover_image']