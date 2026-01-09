from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from django.contrib.auth.models import User
from unfold.admin import ModelAdmin, TabularInline  # <--- O TabularInline estava faltando aqui!

# Importe TODOS os seus models
from .models import (
    HeroSection, 
    AboutSection, AboutGalleryImage, AboutValueCard,
    Differentiator, 
    Service, ServiceGalleryImage, ServicesSection, 
    HistorySection, 
    Partner, 
    Testimonial, TestimonialsSection, 
    BlogSection, BlogPost, 
    FooterConfig,
    InformationPage, InformationGalleryImage # <--- Novos models de Informações
)

# --- CONFIGURAÇÃO DE USUÁRIO (UNFOLD) ---
admin.site.unregister(User)

@admin.register(User)
class UserAdmin(BaseUserAdmin, ModelAdmin):
    pass

# --- 1. HERO SECTION ---
@admin.register(HeroSection)
class HeroSectionAdmin(ModelAdmin):
    list_display = ["title", "is_active"]

# --- 2. QUEM SOMOS (Com Galeria e Valores) ---
class AboutGalleryInline(TabularInline):
    model = AboutGalleryImage
    extra = 1
    tab = True

class AboutValueCardInline(TabularInline):
    model = AboutValueCard
    extra = 1
    tab = True

@admin.register(AboutSection)
class AboutSectionAdmin(ModelAdmin):
    list_display = ["title", "is_active"]
    inlines = [AboutGalleryInline, AboutValueCardInline]

# --- 3. DIFERENCIAIS ---
@admin.register(Differentiator)
class DifferentiatorAdmin(ModelAdmin):
    list_display = ["title", "order", "is_highlighted"]
    list_editable = ["order", "is_highlighted"]

# --- 4. SERVIÇOS (Com Galeria Interna) ---
class ServiceGalleryInline(TabularInline):
    model = ServiceGalleryImage
    extra = 1
    tab = True

@admin.register(Service)
class ServiceAdmin(ModelAdmin):
    list_display = ["title", "order", "is_active"]
    list_editable = ["order"]
    search_fields = ["title"]
    inlines = [ServiceGalleryInline] # <--- Adiciona a galeria aqui

# --- 5. SERVIÇOS (CAPA) ---
@admin.register(ServicesSection)
class ServicesSectionAdmin(ModelAdmin):
    list_display = ["title", "is_active"]

# --- 6. HISTÓRIA ---
@admin.register(HistorySection)
class HistorySectionAdmin(ModelAdmin):
    list_display = ["title", "is_active"]

# --- 7. PARCEIROS ---
@admin.register(Partner)
class PartnerAdmin(ModelAdmin):
    list_display = ["name", "order"]
    list_editable = ["order"]

# --- 8. DEPOIMENTOS ---
@admin.register(TestimonialsSection)
class TestimonialsSectionAdmin(ModelAdmin):
    list_display = ["title", "is_active"]

@admin.register(Testimonial)
class TestimonialAdmin(ModelAdmin):
    list_display = ["name", "role", "rating", "order"]
    list_editable = ["order"]

# --- 9. BLOG ---
@admin.register(BlogSection)
class BlogSectionAdmin(ModelAdmin):
    list_display = ["title", "is_active"]

@admin.register(BlogPost)
class BlogPostAdmin(ModelAdmin):
    list_display = ["title", "date", "order"]
    list_editable = ["order"]
    prepopulated_fields = {"slug": ("title",)} # Preenche slug automático

# --- 10. RODAPÉ ---
@admin.register(FooterConfig)
class FooterConfigAdmin(ModelAdmin):
    list_display = ["contact_title", "email"]

# --- 11. INFORMAÇÕES (NOVO) ---
class InfoGalleryInline(TabularInline): # <--- Aqui estava dando erro antes
    model = InformationGalleryImage
    extra = 1
    tab = True

@admin.register(InformationPage)
class InformationPageAdmin(ModelAdmin):
    list_display = ["title", "slug", "is_active"]
    prepopulated_fields = {"slug": ("title",)}
    inlines = [InfoGalleryInline]