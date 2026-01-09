from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from .models import Post
from .serializers import PostSerializer

class DashboardStatsView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):

        total_posts = Post.objects.count()
        published_posts = Post.objects.filter(is_published=True).count()
        
        recent_posts_qs = Post.objects.order_by('-created_at')[:3]

        recent_posts_data = PostSerializer(recent_posts_qs, many=True).data
        
        return Response({
            "total_posts": total_posts,
            "published_posts": published_posts,
            "draft_posts": total_posts - published_posts,
            "recent_posts": recent_posts_data 
        })