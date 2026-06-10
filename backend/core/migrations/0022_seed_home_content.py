from django.db import migrations


HERO_SUBTITLE = (
    "Usinagem de precisão, e metrologia estratégica em um único parceiro técnico. "
    "Competência comprovada há mais de 25 anos atendendo indústrias de diversos "
    "setores pelo Brasil que exigem conformidade, prazo e rastreabilidade."
)

ABOUT_TITLE = (
    "Para gestores industriais que precisam manter a operação rodando com "
    "previsibilidade e controle técnico"
)
ABOUT_TEXT = (
    "Usinagem de precisão, bem como metrologia estratégica, aplicadas na sua "
    "indústria para reduzir downtime, risco e retrabalho na sua operação"
)

HISTORY_TEXT = (
    "Em 2001, quando o mercado goiano ainda carecia de serviços técnicos "
    "industriais confiáveis, a Competec nasceu com um propósito claro: preencher "
    "o vazio que sufocava as operações da região — a falta de parceiros que "
    "realmente entendessem a urgência de uma linha parada e a complexidade de "
    "uma auditoria regulatória.\n\n"
    "Hoje, mais de 25 anos depois, com o maior número de acreditações "
    "CGCRE/INMETRO do Centro-Oeste entre empresas nacionais e um hub de soluções "
    "completo, a Competec não é apenas um fornecedor, é o seu parceiro estratégico."
)

SERVICE_SECTION_TITLE = "Soluções completas para o seu nível de maturidade industrial"

USINAGEM_DESCRIPTION = (
    "Produzimos componentes em série e somos capazes de absorver a sua demanda "
    "interna de manutenção.\n"
    "Fabricamos peças customizadas, desenvolvendo projetos do zero, ou através "
    "de engenharia reversa, nacionalizando componentes críticos, eliminando "
    "dependência de OEMs com prazos abusivos e preços inflacionados."
)

METROLOGIA_DESCRIPTION = (
    "Atuamos na Gestão Metrológica, Estruturação de Plano Metrológico, Calibração "
    "RBC Inmetro, Qualificação de Equipamentos, Treinamentos e Consultorias, "
    "orientados à garantir conformidade regulatória completa, auditorias seguras "
    "e laudos que geram dados estratégicos."
)


def update_first_or_create(model, values, lookup=None):
    obj = None
    if lookup:
        obj = model.objects.filter(**lookup).first()
    if obj is None:
        obj = model.objects.filter(is_active=True).first()
    if obj is None:
        obj = model.objects.first()
    if obj is None:
        obj = model()

    for field, value in values.items():
        setattr(obj, field, value)
    obj.save()
    return obj


def get_service(Service, pk, slug, fallback_slug=None):
    return (
        Service.objects.filter(pk=pk).first()
        or Service.objects.filter(slug=slug).first()
        or (Service.objects.filter(slug=fallback_slug).first() if fallback_slug else None)
        or Service()
    )


def seed_home_content(apps, schema_editor):
    HeroSection = apps.get_model("core", "HeroSection")
    AboutSection = apps.get_model("core", "AboutSection")
    HistorySection = apps.get_model("core", "HistorySection")
    Differentiator = apps.get_model("core", "Differentiator")
    ServicesSection = apps.get_model("core", "ServicesSection")
    Service = apps.get_model("core", "Service")

    update_first_or_create(
        HeroSection,
        {
            "title": "Hub Integrado de Soluções Industriais!",
            "subtitle": HERO_SUBTITLE,
            "cta_text": "CONHEÇA NOSSAS SOLUÇÕES",
            "cta_link": "#contato",
            "image": "hero/bannerHeroSection_G2XYsNF.png",
            "is_active": True,
        },
    )

    update_first_or_create(
        AboutSection,
        {
            "title": ABOUT_TITLE,
            "text": ABOUT_TEXT,
            "image": "about/CulturaImg_fnfs5nW.png",
            "is_active": True,
        },
    )

    update_first_or_create(
        HistorySection,
        {
            "tag": "Quem Somos",
            "title": "Quem é a Competec?",
            "text": HISTORY_TEXT,
            "footer_text": "É o parceiro que gestores industriais ligam quando não podem errar.",
            "image": "history/historiaIMG.png",
            "is_active": True,
        },
        lookup={"title": "Quem é a Competec?"},
    )

    differentiators = [
        {
            "order": 0,
            "title": "Operação sem Interrupções",
            "description": (
                "Mantemos sua operação rodando, reduzindo paradas e desperdícios "
                "com controle preciso dos processos."
            ),
            "is_highlighted": False,
        },
        {
            "order": 1,
            "title": "Soluções Práticas",
            "description": (
                "Processos para eficiência operacional tanto em operações industriais "
                "clássicas tanto como as mais alinhadas à Indústria 4.0"
            ),
            "is_highlighted": True,
        },
        {
            "order": 2,
            "title": "Competência Mensurável",
            "description": (
                "Experiência técnica aplicada com critérios claros, garantindo "
                "precisão, rastreabilidade e resultados comprováveis."
            ),
            "is_highlighted": False,
        },
    ]

    for item in differentiators:
        obj = Differentiator.objects.filter(order=item["order"]).first()
        if obj is None:
            obj = Differentiator()
        for field, value in item.items():
            setattr(obj, field, value)
        obj.save()

    update_first_or_create(
        ServicesSection,
        {
            "heading": "Nossos Serviços",
            "title": SERVICE_SECTION_TITLE,
            "image": "services_hero/servicesIMG.png",
            "is_active": True,
        },
    )

    usinagem = get_service(Service, 1, "usinagem-b", "usinagem-de-precisao")
    usinagem.title = "Usinagem de Precisão"
    usinagem.slug = "usinagem-b"
    usinagem.short_description = USINAGEM_DESCRIPTION
    usinagem.icon = "services/icons/Icon-arrow.png"
    usinagem.internal_subtitle = "Usinagem de Precisão"
    usinagem.internal_text = USINAGEM_DESCRIPTION
    usinagem.internal_image = "services/internal/bread-mecanica-metalurgia-industrial.webp"
    usinagem.cta_text = "Falar com Especialista"
    usinagem.cta_link = (
        "https://web.whatsapp.com/send?phone=5562995651777&text=Ol%C3%A1%21%20"
        "Gostaria%20de%20mais%20informa%C3%A7%C3%B5es%20sobre%20as%20ofertas%20da%20Competec"
    )
    usinagem.order = 0
    usinagem.is_active = True
    usinagem.save()

    metrologia = get_service(Service, 2, "metrologia-estrategica")
    metrologia.title = "Metrologia Estratégica"
    metrologia.slug = "metrologia-estrategica"
    metrologia.short_description = METROLOGIA_DESCRIPTION
    metrologia.icon = "services/icons/Icon-arrow_iRJZgHn.png"
    metrologia.internal_subtitle = "Metrologia Estratégica"
    metrologia.internal_text = METROLOGIA_DESCRIPTION
    metrologia.internal_image = "services/internal/bread-mecanica-metalurgia-industrial_uJjUbpU.webp"
    metrologia.cta_text = "Falar com Especialista"
    metrologia.cta_link = usinagem.cta_link
    metrologia.order = 1
    metrologia.is_active = True
    metrologia.save()

    Service.objects.exclude(slug__in=["usinagem-b", "metrologia-estrategica"]).update(
        is_active=False
    )


class Migration(migrations.Migration):

    dependencies = [
        ("core", "0021_alter_herosection_subtitle"),
    ]

    operations = [
        migrations.RunPython(seed_home_content, migrations.RunPython.noop),
    ]
