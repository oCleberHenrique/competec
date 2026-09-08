from rest_framework import serializers
from .models import (
    BlogSection, FooterConfig, AboutGalleryImage, AboutValueCard,
    HeroSection, AboutSection, Differentiator, DifferentiatorsSection, HistorySection,
    InformationGalleryImage, InformationPage, Partner, PartnersSection, Service, ServiceBenefit,
    ServiceEquipmentCategory, ServiceFAQ, ServiceGalleryImage, ServiceAuthorityPoint,
    ServicesSection, Testimonial, TestimonialsSection, BlogPost, NavbarConfig
)

class HeroSectionSerializer(serializers.ModelSerializer):
    class Meta:
        model = HeroSection
        fields = '__all__'

class DifferentiatorsSectionSerializer(serializers.ModelSerializer):
    class Meta:
        model = DifferentiatorsSection
        fields = '__all__'

class PartnersSectionSerializer(serializers.ModelSerializer):
    class Meta:
        model = PartnersSection
        fields = '__all__'

# Serializer da Galeria
class AboutGalleryImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = AboutGalleryImage
        fields = ['id', 'image', 'order']

# Serializer dos Valores
class AboutValueCardSerializer(serializers.ModelSerializer):
    class Meta:
        model = AboutValueCard
        fields = ['id', 'icon', 'title', 'description', 'order']

# Serializer Principal (Atualizado)
class AboutSectionSerializer(serializers.ModelSerializer):
    # Nested Serializers (traz os filhos juntos)
    gallery = AboutGalleryImageSerializer(many=True, read_only=True)
    values = AboutValueCardSerializer(many=True, read_only=True)

    class Meta:
        model = AboutSection
        fields = '__all__'

class DifferentiatorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Differentiator
        fields = '__all__'

# --- 1. Serializador da SEÇÃO
class ServicesSectionSerializer(serializers.ModelSerializer):
    class Meta:
        model = ServicesSection
        fields = ["heading", "title", "image"]

class ServiceGalleryImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ServiceGalleryImage
        fields = ["id", "image", "description", "order"]

class ServiceEquipmentCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = ServiceEquipmentCategory
        fields = ["id", "title", "description", "cta_text", "order"]

class ServiceBenefitSerializer(serializers.ModelSerializer):
    class Meta:
        model = ServiceBenefit
        fields = ["id", "title", "description", "order"]

class ServiceFAQSerializer(serializers.ModelSerializer):
    class Meta:
        model = ServiceFAQ
        fields = ["id", "question", "answer", "order"]

class ServiceAuthorityPointSerializer(serializers.ModelSerializer):
    class Meta:
        model = ServiceAuthorityPoint
        fields = ["id", "description", "order"]

# --- 2. Serializador dos CARDS
class ServiceSerializer(serializers.ModelSerializer):
    description = serializers.CharField(source="short_description", read_only=True)
    gallery = ServiceGalleryImageSerializer(many=True, read_only=True)
    equipment_categories = ServiceEquipmentCategorySerializer(many=True, read_only=True)
    benefits = ServiceBenefitSerializer(many=True, read_only=True)
    faqs = ServiceFAQSerializer(many=True, read_only=True)
    authority_points = ServiceAuthorityPointSerializer(many=True, read_only=True)

    class Meta:
        model = Service
        fields = [
            "id", "title", "description", "icon", "slug",
            "internal_subtitle", "internal_text", "internal_image", "rich_text",
            "regions_served", "cta_text", "cta_link", "gallery",
            "equipment_categories", "benefits", "faqs", "authority_points",
            "use_landing_template", "landing_equipment_title", "landing_equipment_text",
            "landing_callout", "landing_authority_title", "landing_authority_text",
            "landing_form_title", "landing_form_text", "landing_benefits_title",
            "landing_benefits_text", "landing_final_cta",
        ]

class HistorySectionSerializer(serializers.ModelSerializer):
    class Meta:
        model = HistorySection
        fields = '__all__'

class PartnerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Partner
        fields = '__all__'

class TestimonialSerializer(serializers.ModelSerializer):
    class Meta:
        model = Testimonial
        fields = '__all__'

class TestimonialsSectionSerializer(serializers.ModelSerializer):
    class Meta:
        model = TestimonialsSection
        fields = '__all__'

class BlogSectionSerializer(serializers.ModelSerializer):
    class Meta:
        model = BlogSection
        fields = '__all__'

class BlogPostSerializer(serializers.ModelSerializer):
    class Meta:
        model = BlogPost
        fields = '__all__'

class FooterConfigSerializer(serializers.ModelSerializer):
    class Meta:
        model = FooterConfig
        fields = '__all__'

class InformationGalleryImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = InformationGalleryImage
        fields = ['id', 'image', 'order']

class InformationPageSerializer(serializers.ModelSerializer):
    gallery = InformationGalleryImageSerializer(many=True, read_only=True)

    class Meta:
        model = InformationPage
        fields = [
            "id", "title", "slug", "banner", 
            "intro_text", "regions_content", 
            "cta_title", "cta_link", "gallery"
        ]


class NavbarConfigSerializer(serializers.ModelSerializer):
    class Meta:
        model = NavbarConfig
        fields = '__all__'
