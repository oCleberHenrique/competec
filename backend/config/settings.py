from datetime import timedelta
import os
from pathlib import Path
import dj_database_url
from django.templatetags.static import static
from django.urls import reverse_lazy
from django.utils.translation import gettext_lazy as _

# --- Caminhos Base ---
BASE_DIR = Path(__file__).resolve().parent.parent


def env_bool(name: str, default: bool = False) -> bool:
    value = os.environ.get(name)
    if value is None:
        return default
    return value.strip().lower() in {"1", "true", "yes", "on"}


def env_list(name: str, default: str = "") -> list[str]:
    return [item.strip() for item in os.environ.get(name, default).split(",") if item.strip()]

# --- Segurança ---
SECRET_KEY = os.environ.get("DJANGO_SECRET_KEY", "django-insecure-dev-key-competec-2025")
DEBUG = env_bool("DJANGO_DEBUG", default=True)
ALLOWED_HOSTS = env_list("DJANGO_ALLOWED_HOSTS", "localhost,127.0.0.1,backend")

# --- Aplicações Instaladas ---
INSTALLED_APPS = [
    # 1. Unfold (Admin Theme)
    "unfold",
    "unfold.contrib.filters",
    "unfold.contrib.forms",
    "unfold.contrib.import_export", 
    "unfold.contrib.guardian",
    "unfold.contrib.simple_history",
    
    # 2. Seus Apps
    "core",

    # 3. Django Apps Padrão
    "django.contrib.admin",
    "django.contrib.auth",
    "django.contrib.contenttypes",
    "django.contrib.sessions",
    "django.contrib.messages",
    "django.contrib.staticfiles",

    # 4. Third Party Apps
    "rest_framework",
    "corsheaders",
]

# --- Middleware ---
MIDDLEWARE = [
    "django.middleware.security.SecurityMiddleware",
    "whitenoise.middleware.WhiteNoiseMiddleware",
    "corsheaders.middleware.CorsMiddleware",
    "django.contrib.sessions.middleware.SessionMiddleware",
    "django.middleware.common.CommonMiddleware",
    "django.middleware.csrf.CsrfViewMiddleware",
    "django.contrib.auth.middleware.AuthenticationMiddleware",
    "django.contrib.messages.middleware.MessageMiddleware",
    "django.middleware.clickjacking.XFrameOptionsMiddleware",
]

ROOT_URLCONF = "config.urls"

# --- Templates ---
TEMPLATES = [
    {
        "BACKEND": "django.template.backends.django.DjangoTemplates",
        "DIRS": [BASE_DIR / "core" / "templates"],
        "APP_DIRS": True,
        "OPTIONS": {
            "context_processors": [
                "django.template.context_processors.debug",
                "django.template.context_processors.request",
                "django.contrib.auth.context_processors.auth",
                "django.contrib.messages.context_processors.messages",
            ],
        },
    },
]

WSGI_APPLICATION = "config.wsgi.application"

# --- Banco de Dados ---
DATABASE_URL = os.environ.get("DATABASE_URL")
if DATABASE_URL:
    DATABASES = {
        "default": dj_database_url.config(
            default=DATABASE_URL,
            conn_max_age=600,
            conn_health_checks=True,
        )
    }
else:
    DATABASES = {
        "default": {
            "ENGINE": "django.db.backends.sqlite3",
            "NAME": BASE_DIR / "db.sqlite3",
        }
    }

# --- Validação de Senha ---
AUTH_PASSWORD_VALIDATORS = [
    {"NAME": "django.contrib.auth.password_validation.UserAttributeSimilarityValidator"},
    {"NAME": "django.contrib.auth.password_validation.MinimumLengthValidator"},
    {"NAME": "django.contrib.auth.password_validation.CommonPasswordValidator"},
    {"NAME": "django.contrib.auth.password_validation.NumericPasswordValidator"},
]

# --- Internacionalização ---
LANGUAGE_CODE = "pt-br"
TIME_ZONE = "America/Sao_Paulo"
USE_I18N = True
USE_TZ = True

# --- Arquivos Estáticos e Mídia ---
STATIC_URL = "/static/"
STATIC_ROOT = BASE_DIR / "staticfiles"

STATICFILES_DIRS = [
    BASE_DIR / "core" / "static",
]

MEDIA_URL = "/media/"
MEDIA_ROOT = os.path.join(BASE_DIR, 'media')

STORAGES = {
    "default": {
        "BACKEND": "django.core.files.storage.FileSystemStorage",
    },
    "staticfiles": {
        "BACKEND": "whitenoise.storage.CompressedManifestStaticFilesStorage",
    },
}

# --- Configuração do REST Framework ---
REST_FRAMEWORK = {
    "DEFAULT_AUTHENTICATION_CLASSES": (
        "rest_framework.authentication.SessionAuthentication",
    ),
    "DEFAULT_PERMISSION_CLASSES": [
        "rest_framework.permissions.AllowAny", 
    ],
    "DEFAULT_PAGINATION_CLASS": "rest_framework.pagination.PageNumberPagination",
    "PAGE_SIZE": 10,
}

# --- Configuração CORS ---
CORS_ALLOW_ALL_ORIGINS = env_bool("CORS_ALLOW_ALL_ORIGINS", default=DEBUG)
CORS_ALLOWED_ORIGINS = env_list(
    "CORS_ALLOWED_ORIGINS",
    "http://localhost:3000,https://competec.v4jasson.com.br,https://v4jasson.com.br",
)
CORS_ALLOW_CREDENTIALS = True
# --- UNFOLD ADMIN CONFIGURATION ---
UNFOLD = {
    "SITE_TITLE": "Competec Admin",
    "SITE_HEADER": "Painel de Controle",
    "SITE_URL": "/",
    # Cores personalizadas
    "COLORS": {
        "primary": {
            "50": "240 245 250",
            "100": "220 230 240",
            "200": "190 210 230",
            "300": "160 190 220",
            "400": "130 170 210",
            "500": "52 69 77",
            "600": "45 60 70",
            "700": "35 50 60",
            "800": "25 40 50",
            "900": "15 30 40",
            "950": "5 15 25",
        },
    },
    # Sidebar Navigation
    "SIDEBAR": {
        "show_search": False,
        "show_all_applications": False,
        "navigation": [
            {
                "title": _("Visão Geral"),
                "separator": True,
                "items": [
                    {
                        "title": _("Início"),
                        "icon": "dashboard",
                        "link": reverse_lazy("admin:index"),
                    },
                ],
            },
            
            # --- BLOCO 1: HOME PAGE ---
            {
                "title": _("Edição da Home Page"),
                "separator": True,
                "items": [
                    {
                        "title": _("1. Banner Principal (Hero)"),
                        "icon": "image",
                        "link": reverse_lazy("admin:core_herosection_changelist"),
                    },
                    {
                        "title": _("2. Quem Somos (Resumo)"),
                        "icon": "info",
                        "link": reverse_lazy("admin:core_aboutsection_changelist"),
                    },
                    {
                        "title": _("3. Diferenciais (Ícones)"),
                        "icon": "verified",
                        "link": reverse_lazy("admin:core_differentiator_changelist"),
                    },
                    {
                        "title": _("4. Linha do Tempo (História)"),
                        "icon": "history_edu",
                        "link": reverse_lazy("admin:core_historysection_changelist"),
                    },
                    {
                        "title": _("5. Logos de Parceiros"),
                        "icon": "handshake",
                        "link": reverse_lazy("admin:core_partner_changelist"),
                    },
                ],
            },

            # --- BLOCO 2: SERVIÇOS ---
            {
                "title": _("Soluções e Serviços"),
                "separator": True,
                "items": [
                    {
                        "title": _("Configurar Seção"),
                        "icon": "view_day",
                        "link": reverse_lazy("admin:core_servicessection_changelist"),
                    },
                    {
                        "title": _("Gerenciar Serviços"),
                        "icon": "build",
                        "link": reverse_lazy("admin:core_service_changelist"),
                    },
                ],
            },

            # --- BLOCO 3: INFORMAÇÕES ---
            {
                "title": _("Informações"),
                "separator": True,
                "items": [
                    {
                        "title": _("Gerenciar Páginas"),
                        "icon": "description",
                        "link": reverse_lazy("admin:core_informationpage_changelist"),
                    },
                ],
            },

            # --- BLOCO 4: PROVA SOCIAL ---
            {
                "title": _("Depoimentos"),
                "separator": True,
                "items": [
                    {
                        "title": _("Configurar Seção"),
                        "icon": "settings_suggest",
                        "link": reverse_lazy("admin:core_testimonialssection_changelist"),
                    },
                    {
                        "title": _("Gerenciar Depoimentos"),
                        "icon": "format_quote",
                        "link": reverse_lazy("admin:core_testimonial_changelist"),
                    },
                ],
            },

            # --- BLOCO 5: BLOG ---
            {
                "title": _("Blog & Notícias"),
                "separator": True,
                "items": [
                    {
                        "title": _("Capa do Blog"),
                        "icon": "view_headline",
                        "link": reverse_lazy("admin:core_blogsection_changelist"),
                    },
                    {
                        "title": _("Postagens"),
                        "icon": "article",
                        "link": reverse_lazy("admin:core_blogpost_changelist"),
                    },
                ],
            },

            # --- BLOCO 6: CONFIGURAÇÕES GERAIS ---
            {
                "title": _("Configurações Gerais"),
                "separator": True,
                "items": [
                    # --- AQUI ESTÁ O NOVO ITEM QUE FALTAVA ---
                    {
                        "title": _("Navbar & Logo"),
                        "icon": "web", # Mudei para 'web' para diferenciar
                        "link": reverse_lazy("admin:core_navbarconfig_changelist"),
                    },
                    # -----------------------------------------
                    {
                        "title": _("Rodapé & Contatos"),
                        "icon": "layers",
                        "link": reverse_lazy("admin:core_footerconfig_changelist"),
                    },
                    {
                        "title": _("Usuários do Sistema"),
                        "icon": "people",
                        "link": reverse_lazy("admin:auth_user_changelist"),
                    },
                ],
            },
        ],
    },
}



CSRF_TRUSTED_ORIGINS = env_list(
    "CSRF_TRUSTED_ORIGINS",
    "https://api.v4jasson.com.br,https://competec.v4jasson.com.br",
)

SECURE_PROXY_SSL_HEADER = ('HTTP_X_FORWARDED_PROTO', 'https')
USE_X_FORWARDED_HOST = True
USE_X_FORWARDED_PORT = True

DEFAULT_AUTO_FIELD = "django.db.models.BigAutoField"
