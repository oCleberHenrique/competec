from django.urls import path
# IMPORTANTE: Adicione AboutPageView na lista abaixo
from .views import (
    HomeDataView, InformationDetailView, NavbarDataView, 
    ServiceDetailView, BlogPostDetailView, AboutPageView
)

urlpatterns = [
    # 1. Home
    path("home-data/", HomeDataView.as_view(), name="home-data"),
    
    # 2. QUEM SOMOS (A ROTA QUE FALTA)
    path("about-page/", AboutPageView.as_view(), name="about-page"),
    
    # 3. Serviços
    path("service/<slug:slug>/", ServiceDetailView.as_view(), name="service-detail"),
    
    # 4. Blog Post
    path("blog-post/<slug:slug>/", BlogPostDetailView.as_view(), name="blog-post-detail"),

    # 5. Informações
    path("information/<slug:slug>/", InformationDetailView.as_view(), name="info-detail"),

    # 6. Navbar
    path("navbar-data/", NavbarDataView.as_view(), name="navbar-data"),
]