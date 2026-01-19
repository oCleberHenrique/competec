from django.contrib import admin
from django.urls import path, include, re_path
from django.conf import settings
from django.conf.urls.static import static
from django.views.static import serve

urlpatterns = [
    # 1. Painel Admin (Unfold)
    path("admin/", admin.site.urls),

    # 2. Rotas da API do Site
    path("api/", include("core.urls")), 

    re_path(r'^media/(?P<path>.*)$', serve, {'document_root': settings.MEDIA_ROOT}),
]

# Servir estáticos em desenvolvimento (Opcional, mas bom manter)
if settings.DEBUG:
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)