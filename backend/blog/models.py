from django.db import models
from django.conf import settings

class Post(models.Model):
    title = models.CharField(
        max_length=200, 
        verbose_name="Título",
        help_text="Digite o título principal do artigo."
    )
    
    slug = models.SlugField(
        unique=True, 
        verbose_name="URL Amigável",
        help_text="Este campo é preenchido automaticamente com base no título. Ex: 'meu-titulo-legal'."
    )
    
    content = models.TextField(
        verbose_name="Conteúdo",
        help_text="Escreva o corpo do seu artigo aqui."
    )
    
    # Campo de Imagem Real
    cover_image = models.ImageField(
        upload_to="blog_covers/", 
        blank=True, 
        null=True, 
        verbose_name="Imagem de Capa",
        help_text="Formato recomendado: JPG ou PNG. Dimensões ideais: 1200x630 pixels."
    )
    
    author = models.ForeignKey(
        settings.AUTH_USER_MODEL, 
        on_delete=models.CASCADE, 
        verbose_name="Autor"
    )
    
    is_published = models.BooleanField(
        default=False, 
        verbose_name="Publicado?",
        help_text="Marque esta caixa apenas quando quiser que o artigo apareça no site."
    )
    
    created_at = models.DateTimeField(auto_now_add=True, verbose_name="Criado em")
    updated_at = models.DateTimeField(auto_now=True, verbose_name="Atualizado em")

    def __str__(self):
        return self.title

    class Meta:
        verbose_name = "Artigo"
        verbose_name_plural = "Artigos"
        ordering = ["-created_at"]