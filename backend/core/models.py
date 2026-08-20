from django.db import models

# --- 1. HERO SECTION ---
class HeroSection(models.Model):
    title = models.CharField("Título (H1)", max_length=200, help_text="Ex: Usinagem de Precisão")
    subtitle = models.TextField("Subtítulo (H4)", help_text="Ex: Soluções para Indústria 4.0")
    cta_text = models.CharField("Texto do Botão", max_length=50, default="Fale Conosco")
    cta_link = models.CharField("Link do Botão", max_length=200, default="#services")
    image = models.ImageField("Imagem Principal", upload_to="hero/")
    is_active = models.BooleanField("Ativo?", default=True)

    class Meta:
        verbose_name = "Seção Hero"
        verbose_name_plural = "Seção Hero"

    def __str__(self):
        return self.title

# --- 2. QUEM SOMOS ---
class AboutSection(models.Model):
    # --- HOME & GERAL ---
    title = models.CharField("Título Principal", max_length=200, default="Nossa História")
    text = models.TextField("Texto Principal")
    image = models.ImageField("Imagem Principal (Home)", upload_to="about/")

    # --- EXCLUSIVO INTERNA ---
    internal_image = models.ImageField("Imagem Lateral (Interna)", upload_to="about_internal/", blank=True, null=True)
    internal_text = models.TextField("Texto Completo (Interna)", blank=True)
    banner_image = models.ImageField("Banner do Topo (Interna)", upload_to="about_banner/", blank=True, null=True)
    tag = models.CharField("Tag Superior", max_length=50, default="Quem Somos")
    subtitle = models.TextField("Subtítulo (Destaque Interna)", blank=True)

    # --- MÍDIA ---
    youtube_video_id = models.CharField("Link ou ID do Youtube", max_length=200, blank=True)
    map_embed_url = models.TextField("Link ou Iframe do Mapa", blank=True)

    # --- CTA ---
    cta_text = models.CharField("Texto do Botão", max_length=50, default="Entre em Contato")
    cta_link = models.CharField("Link do WhatsApp", max_length=200, default="https://wa.me/5562995530750")

    is_active = models.BooleanField("Ativo?", default=True)

    class Meta:
        verbose_name = "Página Quem Somos"
        verbose_name_plural = "Página Quem Somos"

    def __str__(self):
        return self.title

class AboutGalleryImage(models.Model):
    section = models.ForeignKey(AboutSection, related_name="gallery", on_delete=models.CASCADE)
    image = models.ImageField("Imagem da Galeria", upload_to="about_gallery/")
    order = models.PositiveIntegerField("Ordem", default=0)
    class Meta: ordering = ["order"]

class AboutValueCard(models.Model):
    section = models.ForeignKey(AboutSection, related_name="values", on_delete=models.CASCADE)
    icon = models.ImageField("Ícone", upload_to="about_icons/")
    title = models.CharField("Título", max_length=100)
    description = models.TextField("Texto Curto")
    order = models.PositiveIntegerField("Ordem", default=0)
    class Meta: ordering = ["order"]

# --- 3. DIFERENCIAIS ---
class Differentiator(models.Model):
    title = models.CharField("Título", max_length=100)
    description = models.TextField("Descrição")
    is_highlighted = models.BooleanField("É Destaque?", default=False)
    order = models.PositiveIntegerField("Ordem", default=0)

    class Meta:
        verbose_name = "Diferencial"
        verbose_name_plural = "Diferenciais (Folders)"
        ordering = ["order"]

    def __str__(self):
        return self.title

# --- 4. SERVIÇOS (Cards & Internas) ---

# Essa classe estava faltando e causou o erro.
class ServiceGalleryImage(models.Model):
    service = models.ForeignKey('Service', related_name="gallery", on_delete=models.CASCADE)
    image = models.ImageField("Imagem", upload_to="services/gallery/")
    description = models.CharField("Legenda (Alt)", max_length=100, blank=True)
    order = models.PositiveIntegerField("Ordem", default=0)

    class Meta:
        verbose_name = "Imagem da Galeria"
        verbose_name_plural = "Galeria de Imagens do Serviço"
        ordering = ["order"]

class ServiceEquipmentCategory(models.Model):
    service = models.ForeignKey('Service', related_name="equipment_categories", on_delete=models.CASCADE)
    title = models.CharField("Titulo", max_length=120)
    description = models.TextField("Itens / Descricao", help_text="Use uma linha para cada item.", blank=True)
    cta_text = models.CharField("Texto do botao", max_length=80, default="Solicite orcamento")
    order = models.PositiveIntegerField("Ordem", default=0)

    class Meta:
        verbose_name = "Categoria / Equipamento"
        verbose_name_plural = "Categorias / Equipamentos"
        ordering = ["order"]

    def __str__(self):
        return self.title

class ServiceBenefit(models.Model):
    service = models.ForeignKey('Service', related_name="benefits", on_delete=models.CASCADE)
    title = models.CharField("Titulo", max_length=160)
    description = models.TextField("Descricao")
    order = models.PositiveIntegerField("Ordem", default=0)

    class Meta:
        verbose_name = "Diferencial / Beneficio"
        verbose_name_plural = "Diferenciais / Beneficios"
        ordering = ["order"]

    def __str__(self):
        return self.title

class ServiceFAQ(models.Model):
    service = models.ForeignKey('Service', related_name="faqs", on_delete=models.CASCADE)
    question = models.CharField("Pergunta", max_length=220)
    answer = models.TextField("Resposta")
    order = models.PositiveIntegerField("Ordem", default=0)

    class Meta:
        verbose_name = "Pergunta frequente"
        verbose_name_plural = "Perguntas frequentes"
        ordering = ["order"]

    def __str__(self):
        return self.question

class Service(models.Model):
    # Campos do Card (Home)
    title = models.CharField("Título", max_length=200)
    slug = models.SlugField("Slug (URL)", unique=True, blank=True, null=True)
    short_description = models.TextField("Descrição Curta (Card)")
    icon = models.ImageField(
        "Ícone/Imagem",
        upload_to="services/",
        blank=True,
        null=True,
        help_text="Aparece no card do serviço na Home e na imagem do menu Soluções (dropdown).",
    )

    # Campos da Página Interna
    internal_subtitle = models.CharField("Subtítulo Interno", max_length=200, blank=True, null=True)
    internal_text = models.TextField("Texto Completo", blank=True, null=True)
    internal_image = models.ImageField("Imagem Interna", upload_to="services/internal/", blank=True, null=True)

    # Campos Extras (Rich Text e Regiões - Opcionais para Serviços, mas bons ter)
    rich_text = models.TextField("Texto Completo (HTML)", blank=True)
    regions_served = models.TextField("Cidades/Regiões Atendidas", blank=True)

    cta_text = models.CharField("Texto do Botão", max_length=50, default="Falar com Especialista")
    cta_link = models.CharField("Link do Botão", max_length=200, blank=True, null=True)

    order = models.IntegerField("Ordem de Exibição", default=0)
    is_active = models.BooleanField("Ativo?", default=True)

    class Meta:
        verbose_name = "Serviço (Card + Interna)"
        verbose_name_plural = "2. Soluções e Serviços"
        ordering = ['order']

    def __str__(self):
        return self.title

# --- 5. SERVIÇOS (Capa/Seção) ---
class ServicesSection(models.Model):
    heading = models.CharField("Chapéu (Texto Laranja)", max_length=100, default="Nossos Serviços")
    title = models.CharField("Título Principal", max_length=200, default="Quais são os nossos serviços?")
    image = models.ImageField("Imagem Lateral Grande", upload_to="services_hero/")
    is_active = models.BooleanField("Ativo?", default=True)

    class Meta:
        verbose_name = "Seção Serviços (Capa)"
        verbose_name_plural = "Seção Serviços (Capa)"

    def __str__(self):
        return self.title

# --- 6. HISTÓRIA ---
class HistorySection(models.Model):
    tag = models.CharField("Tag Superior (Laranja)", max_length=50, default="Quem Somos")
    title = models.CharField("Título Principal", max_length=200, default="Quem é a Competec?")
    text = models.TextField("Texto Principal")
    footer_text = models.CharField("Texto Destaque (Rodapé)", max_length=300, blank=True)
    image = models.ImageField("Imagem Aérea", upload_to="history/")
    is_active = models.BooleanField("Ativo?", default=True)

    class Meta:
        verbose_name = "Seção História (Quem é...)"
        verbose_name_plural = "Seção História (Quem é...)"

    def __str__(self):
        return self.title

# --- 7. PARCEIROS (Logos) ---
class Partner(models.Model):
    name = models.CharField("Nome da Empresa", max_length=100)
    logo = models.ImageField("Logo", upload_to="partners/")
    order = models.PositiveIntegerField("Ordem", default=0)

    class Meta:
        verbose_name = "Parceiro"
        verbose_name_plural = "Parceiros / Cases"
        ordering = ["order"]

    def __str__(self):
        return self.name

# --- 8. DEPOIMENTOS ---
class Testimonial(models.Model):
    name = models.CharField("Nome da Pessoa", max_length=100)
    role = models.CharField("Cargo/Empresa (Opcional)", max_length=100, blank=True)
    text = models.TextField("Depoimento")
    image = models.ImageField("Foto do Perfil", upload_to="testimonials/", blank=True, null=True)
    rating = models.IntegerField("Estrelas (1-5)", default=5)
    order = models.PositiveIntegerField("Ordem", default=0)

    class Meta:
        verbose_name = "Depoimento"
        verbose_name_plural = "Depoimentos / Reviews"
        ordering = ["order"]

    def __str__(self):
        return self.name

class TestimonialsSection(models.Model):
    title = models.CharField("Título Principal", max_length=200, default="Parceiro técnico de indústrias\nQue não podem parar")
    subtitle = models.TextField("Texto de Apoio")
    image = models.ImageField("Imagem de Fundo (Rapaz)", upload_to="testimonials_bg/")
    is_active = models.BooleanField("Ativo?", default=True)

    class Meta:
        verbose_name = "Seção Depoimentos (Capa)"
        verbose_name_plural = "Seção Depoimentos (Capa)"

# --- 9. SEÇÃO BLOG (Capa) ---
class BlogSection(models.Model):
    tag = models.CharField("Tag Superior (Laranja)", max_length=50, default="Blog")
    title = models.CharField("Título Principal", max_length=200, default="Conteúdo técnico sobre gestão industrial")
    subtitle = models.CharField("Texto de Apoio (Direita)", max_length=200, default="conformidade e eficiência operacional.")
    cta_text = models.CharField("Texto do Botão", max_length=50, default="Ver todas as postagens")
    cta_link = models.CharField("Link do Botão", max_length=200, default="/blog")
    is_active = models.BooleanField("Ativo?", default=True)

    class Meta:
        verbose_name = "Seção Blog (Capa)"
        verbose_name_plural = "Seção Blog (Capa)"

    def __str__(self):
        return self.title

class BlogPost(models.Model):
    title = models.CharField("Título do Post", max_length=200)
    slug = models.SlugField("Slug (URL)", unique=True, help_text="Identificador único para a URL")
    image = models.ImageField("Capa do Post", upload_to="blog/")
    content = models.TextField("Conteúdo Completo do Post")
    author = models.CharField("Autor", max_length=100, default="Time Competec")
    date = models.DateField("Data de Publicação", default="2025-10-10")
    order = models.PositiveIntegerField("Ordem", default=0)

    class Meta:
        verbose_name = "Post do Blog"
        verbose_name_plural = "Posts do Blog"
        ordering = ["order"]

    def __str__(self):
        return self.title

#--- 10. RODAPÉ (FOOTER) ---
class FooterConfig(models.Model):
    logo = models.ImageField("Logo do Rodapé", upload_to="footer/")
    description = models.TextField("Texto Sobre (Coluna 1)", default="Trabalhamos há mais de 20 anos...")

    address_title = models.CharField("Título Endereço", max_length=50, default="Endereço")
    address_text = models.TextField("Endereço Completo")

    contact_title = models.CharField("Título Contato", max_length=50, default="Contato")
    phone = models.CharField("Telefone Fixo", max_length=50, blank=True)
    whatsapp = models.CharField("WhatsApp", max_length=50, blank=True)
    whatsapp_2 = models.CharField("WhatsApp Secundário", max_length=50, blank=True)
    email = models.CharField("Email", max_length=100, blank=True)

    instagram = models.URLField("Instagram", blank=True)
    linkedin = models.URLField("Linkedin", blank=True)

    copyright_text = models.CharField("Texto Direitos Autorais", max_length=200, default="Todos os direitos reservados...")

    class Meta:
        verbose_name = "Configuração do Rodapé"
        verbose_name_plural = "Configuração do Rodapé"

    def __str__(self):
        return "Configuração do Rodapé"

# --- 11. PÁGINAS DE INFORMAÇÕES (Novo Módulo) ---
class InformationPage(models.Model):
    title = models.CharField("Título da Página", max_length=200)
    slug = models.SlugField("Slug (URL)", unique=True, help_text="Ex: cidades-atendidas")
    banner = models.ImageField("Banner do Topo", upload_to="info_banners/")
    intro_text = models.TextField("Texto Introdutorio", blank=True, help_text="Escreva o texto como no Word")

    # MUDANÇA 2: Mudamos a instrução para usar vírgulas
    regions_content = models.TextField(
        "Lista de Cidades/Regiões",
        blank=True,
        help_text="Digite as cidades separadas por vírgula. Ex: Curitiba, São Paulo, Anápolis, Goiânia"
    )

    cta_title = models.CharField("Título CTA", max_length=100, default="Entre em contato")
    cta_link = models.CharField("Link do Botão", max_length=200, default="https://wa.me/5562995530750")
    is_active = models.BooleanField("Ativo?", default=True)

    class Meta:
        verbose_name = "Página de Informação"
        verbose_name_plural = "Páginas de Informações"

    def __str__(self):
        return self.title

class InformationGalleryImage(models.Model):
    page = models.ForeignKey(InformationPage, related_name="gallery", on_delete=models.CASCADE)
    image = models.ImageField("Imagem", upload_to="info_gallery/")
    order = models.PositiveIntegerField("Ordem", default=0)

    class Meta:
        verbose_name = "Imagem da Galeria"
        verbose_name_plural = "Galeria desta Página"
        ordering = ["order"]

class NavbarConfig(models.Model):
    logo = models.ImageField(upload_to='navbar/', verbose_name="Logo do Site")
    alt_text = models.CharField(max_length=255, default="Competec", verbose_name="Texto Alternativo (Alt)")

    # Redes Sociais (Opcional, mas bom ter)
    facebook_link = models.URLField(blank=True, null=True, verbose_name="Facebook")
    instagram_link = models.URLField(blank=True, null=True, verbose_name="Instagram")
    linkedin_link = models.URLField(blank=True, null=True, verbose_name="LinkedIn")

    floating_whatsapp_link = models.CharField(
        "Link do WhatsApp (Botão Flutuante)",
        max_length=200,
        blank=True,
        default="https://wa.me/5562995530750",
        help_text="Link do botãozinho verde de WhatsApp que fica fixo no canto da tela em todas as páginas. Formato: https://wa.me/55DDDNUMERO",
    )

    class Meta:
        verbose_name = "Configurações Gerais (Logo, WhatsApp e Redes Sociais)"
        verbose_name_plural = "Configurações Gerais (Logo, WhatsApp e Redes Sociais)"

    def __str__(self):
        return "Configuração Principal do Navbar"
