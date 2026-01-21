from rest_framework.views import APIView
from rest_framework.response import Response
from django.shortcuts import get_object_or_404

# Imports dos Models
from .models import (
    BlogPost, BlogSection, Differentiator, FooterConfig, HeroSection, 
    AboutSection, HistorySection, InformationPage, Partner, Service, ServicesSection, 
    TestimonialsSection, Testimonial, NavbarConfig
)

# Imports dos Serializers
from .serializers import (
    BlogPostSerializer, BlogSectionSerializer, FooterConfigSerializer, 
    HeroSectionSerializer, AboutSectionSerializer, DifferentiatorSerializer, 
    HistorySectionSerializer, InformationPageSerializer, PartnerSerializer, ServiceSerializer, 
    ServicesSectionSerializer, TestimonialSerializer, TestimonialsSectionSerializer, NavbarConfigSerializer
)

# --- 1. HOME ---
class HomeDataView(APIView):
    permission_classes = [] 

    def get(self, request):
        hero_data = HeroSection.objects.filter(is_active=True).first()
        about_data = AboutSection.objects.filter(is_active=True).first()
        differentiators_data = Differentiator.objects.all().order_by('order')
        services_data = Service.objects.filter(is_active=True).order_by('order')
        services_section_data = ServicesSection.objects.filter(is_active=True).first()
        history_data = HistorySection.objects.filter(is_active=True).first()
        partners_data = Partner.objects.all().order_by('order')
        testimonials_data = Testimonial.objects.all().order_by('order')
        testimonials_section = TestimonialsSection.objects.filter(is_active=True).first()
        blog_section = BlogSection.objects.filter(is_active=True).first()
        blog_posts = BlogPost.objects.all().order_by('order')[:4]
        footer_data = FooterConfig.objects.first()

        return Response({
            "hero": HeroSectionSerializer(hero_data).data if hero_data else None,
            "about": AboutSectionSerializer(about_data).data if about_data else None,
            "differentiators": DifferentiatorSerializer(differentiators_data, many=True).data,
            "services": ServiceSerializer(services_data, many=True).data,
            "services_section": ServicesSectionSerializer(services_section_data).data if services_section_data else None,
            "history": HistorySectionSerializer(history_data).data if history_data else None,
            "partners": PartnerSerializer(partners_data, many=True).data,
            "testimonials": TestimonialSerializer(testimonials_data, many=True).data,
            "testimonials_section": TestimonialsSectionSerializer(testimonials_section).data if testimonials_section else None,
            "blog_section": BlogSectionSerializer(blog_section).data if blog_section else None,
            "blog_posts": BlogPostSerializer(blog_posts, many=True).data,
            "footer": FooterConfigSerializer(footer_data).data if footer_data else None
        })

# --- 2. DETALHE DO SERVIÇO (Essa estava faltando!) ---
class ServiceDetailView(APIView):
    permission_classes = []

    def get(self, request, slug):
        # Busca o serviço pelo Slug na URL
        service = get_object_or_404(Service, slug=slug)
        footer_data = FooterConfig.objects.first()

        return Response({
            "service": ServiceSerializer(service).data,
            "footer": FooterConfigSerializer(footer_data).data if footer_data else None
        })

# --- 3. DETALHE DO BLOG ---
class BlogPostDetailView(APIView):
    permission_classes = []

    def get(self, request, slug):
        post = get_object_or_404(BlogPost, slug=slug)
        footer_data = FooterConfig.objects.first()

        return Response({
            "post": BlogPostSerializer(post).data,
            "footer": FooterConfigSerializer(footer_data).data if footer_data else None
        })
    
class InformationDetailView(APIView):
    permission_classes = []

    def get(self, request, slug):
        page = get_object_or_404(InformationPage, slug=slug)
        footer_data = FooterConfig.objects.first()
        
        # Vamos pegar a lista de outras páginas para fazer o menu lateral
        sidebar_links = InformationPage.objects.filter(is_active=True).values('title', 'slug')

        return Response({
            "page": InformationPageSerializer(page).data,
            "sidebar_links": sidebar_links,
            "footer": FooterConfigSerializer(footer_data).data if footer_data else None
        })
    
class NavbarDataView(APIView):
    permission_classes = []
    def get(self, request):
        latest_info = InformationPage.objects.filter(is_active=True).order_by('-id').first()
        
        return Response({
            "latest_info_slug": latest_info.slug if latest_info else None
        })
    
class NavbarDataView(APIView):
    def get(self, request):
        # 1. Pega as configurações gerais (Logo, etc)
        config = NavbarConfig.objects.first()
        config_data = NavbarConfigSerializer(config).data if config else {}

        # 2. Lógica para pegar o último post de informação (já existia)
        latest_info = InformationPage.objects.order_by('-id').first()
        
        # 3. Mescla os dados
        response_data = {
            **config_data, # Espalha os dados do serializer (incluindo a logo)
            "latest_info_slug": latest_info.slug if latest_info else None
        }
        
        return Response(response_data)