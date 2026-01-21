from django.urls import path
# ADICIONEI AboutPageView AQUI NOS IMPORTS
from .views import (
    HomeDataView, InformationDetailView, NavbarDataView, 
    ServiceDetailView, BlogPostDetailView, AboutPageView
)

urlpatterns = [
    # API da Home Page
    path("home-data/", HomeDataView.as_view(), name="home-data"),
    
    # --- NOVA ROTA DO QUEM SOMOS (FALTAVA ISSO) ---
    path("about-page/", AboutPageView.as_view(), name="about-page"),
    # ----------------------------------------------

    # API da Página Interna de Serviço
    path("service/<slug:slug>/", ServiceDetailView.as_view(), name="service-detail"),
    
    # API da Página Interna de Blog
    path("blog-post/<slug:slug>/", BlogPostDetailView.as_view(), name="blog-post-detail"),

    path("information/<slug:slug>/", InformationDetailView.as_view(), name="info-detail"),

    path("navbar-data/", NavbarDataView.as_view(), name="navbar-data"),
]