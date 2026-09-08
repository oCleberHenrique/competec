from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from django.contrib.auth.models import User
from django.urls import path
from unfold.admin import ModelAdmin, TabularInline  # <--- O TabularInline estava faltando aqui!

from .admin_links import links_dashboard_view

# Importe TODOS os seus models
from .models import (
    HeroSection,
    AboutSection, AboutGalleryImage, AboutValueCard,
    Differentiator, DifferentiatorsSection,
    NavbarConfig,
    Service, ServiceBenefit, ServiceEquipmentCategory, ServiceFAQ, ServiceGalleryImage, ServiceAuthorityPoint, ServicesSection,
    HistorySection,
    Partner, PartnersSection,
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
    fieldsets = (
        ("Home & Geral", {"fields": ("title", "text", "image")}),
        ("Exclusivo Interna", {"fields": ("internal_image", "internal_text", "banner_image", "tag", "subtitle")}),
        ("Mídia", {"fields": ("youtube_video_id", "map_embed_url")}),
        ("CTA", {"fields": ("cta_text", "cta_link")}),
        (
            "Títulos de Seção (Página Interna)",
            {
                "fields": (
                    "history_section_tag",
                    "history_section_title",
                    "differentiators_section_title",
                    "gallery_section_title",
                    "partners_section_title",
                )
            },
        ),
        ("Status", {"fields": ("is_active",)}),
    )

# --- 3. DIFERENCIAIS ---
@admin.register(DifferentiatorsSection)
class DifferentiatorsSectionAdmin(ModelAdmin):
    list_display = ["title", "is_active"]

@admin.register(Differentiator)
class DifferentiatorAdmin(ModelAdmin):
    list_display = ["title", "order", "is_highlighted"]
    list_editable = ["order", "is_highlighted"]

# --- 4. SERVIÇOS (Com Galeria Interna) ---
class ServiceGalleryInline(TabularInline):
    model = ServiceGalleryImage
    extra = 1
    tab = True

class ServiceEquipmentCategoryInline(TabularInline):
    model = ServiceEquipmentCategory
    extra = 1
    tab = True

class ServiceBenefitInline(TabularInline):
    model = ServiceBenefit
    extra = 1
    tab = True

class ServiceFAQInline(TabularInline):
    model = ServiceFAQ
    extra = 1
    tab = True

class ServiceAuthorityPointInline(TabularInline):
    model = ServiceAuthorityPoint
    extra = 1
    tab = True

@admin.register(Service)
class ServiceAdmin(ModelAdmin):
    list_display = ["title", "slug", "use_landing_template", "order", "is_active"]
    list_editable = ["order"]
    search_fields = ["title", "slug"]
    prepopulated_fields = {"slug": ("title",)}
    inlines = [
        ServiceGalleryInline,
        ServiceEquipmentCategoryInline,
        ServiceBenefitInline,
        ServiceFAQInline,
        ServiceAuthorityPointInline,
    ]
    fieldsets = (
        ("Card (Home)", {"fields": ("title", "slug", "short_description", "icon", "order", "is_active")}),
        ("Página Interna", {"fields": ("internal_subtitle", "internal_text", "internal_image", "rich_text", "regions_served")}),
        ("CTA", {"fields": ("cta_text", "cta_link")}),
        (
            "Landing Page Especial (Great Pages)",
            {
                "classes": ("collapse",),
                "description": (
                    "Só usado quando \"Usar layout de Landing Page?\" está ativado. "
                    "Os Pontos de Autoridade (boxes de confiança abaixo do hero) ficam na aba \"Ponto de Autoridade\" abaixo."
                ),
                "fields": (
                    "use_landing_template",
                    "landing_equipment_title",
                    "landing_equipment_text",
                    "landing_callout",
                    "landing_authority_title",
                    "landing_authority_text",
                    "landing_form_title",
                    "landing_form_text",
                    "landing_benefits_title",
                    "landing_benefits_text",
                    "landing_final_cta",
                ),
            },
        ),
    )

# --- 5. SERVIÇOS (CAPA) ---
@admin.register(ServicesSection)
class ServicesSectionAdmin(ModelAdmin):
    list_display = ["title", "is_active"]

# --- 6. HISTÓRIA ---
@admin.register(HistorySection)
class HistorySectionAdmin(ModelAdmin):
    list_display = ["title", "is_active"]

# --- 7. PARCEIROS ---
@admin.register(PartnersSection)
class PartnersSectionAdmin(ModelAdmin):
    list_display = ["title", "is_active"]

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
    list_display = ["title", "category", "date", "order"]
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

@admin.register(NavbarConfig)
class NavbarConfigAdmin(admin.ModelAdmin):
    list_display = ('id', 'alt_text')

    fieldsets = (
        ("Logo", {"fields": ("logo", "alt_text")}),
        ("WhatsApp Flutuante", {"fields": ("floating_whatsapp_link",)}),
        ("SEO (Google e Compartilhamento)", {"fields": ("seo_title", "seo_description")}),
    )

    # Isso impede que criem mais de uma configuração (Trava para ter apenas 1 logo)
    def has_add_permission(self, request):
        if self.model.objects.exists():
            return False
        return super().has_add_permission(request)


# --- 12. LINKS DE CONTATO (CTAs) — TELA ÚNICA ---
_original_get_urls = admin.site.get_urls


def _get_urls_with_links_dashboard():
    custom_urls = [
        path(
            "links/",
            admin.site.admin_view(links_dashboard_view),
            name="links-dashboard",
        ),
    ]
    return custom_urls + _original_get_urls()


admin.site.get_urls = _get_urls_with_links_dashboard
