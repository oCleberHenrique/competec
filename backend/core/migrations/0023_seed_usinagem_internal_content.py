from django.db import migrations


USINAGEM_HERO = "Torneamento CNC, Caldeiraria e Usinagem para indústrias que não podem parar"

USINAGEM_INTRO = (
    "Com mais de 25 anos de experiência, a Competec é parceira estratégica em "
    "usinagem, caldeiraria e fresagem CNC industrial para desenvolvimento, "
    "recuperação e produção de componentes críticos com precisão e confiabilidade."
)

USINAGEM_RICH_TEXT = """CONHEÇA NOSSOS SERVIÇOS DE USINAGEM
Torneamento CNC
Fresagem CNC
Caldeiraria Industrial
Soldagem Técnica
Engenharia Reversa
Nacionalização de Componentes
Produção Seriada
Recuperação de Peças Críticas

COMPONENTES JÁ PRODUZIDOS
Peças técnicas sob demanda para operações industriais que precisam de confiabilidade, repetibilidade e resposta rápida.

QUANDO SUA OPERAÇÃO ENFRENTA ESTES DESAFIOS
Paradas não planejadas por falta de componentes críticos.
Dependência de OEMs com prazos longos e preços inflacionados.
Peças obsoletas sem reposição disponível.
Necessidade de produção seriada com padrão e rastreabilidade.
Demanda interna de manutenção acima da capacidade operacional.

DESENVOLVIMENTO TÉCNICO OU RECUPERAÇÃO DE COMPONENTES CRÍTICOS
Criamos soluções do zero para novas demandas operacionais ou reproduzimos peças essenciais por engenharia reversa para manter sua produção em movimento.

CAPACIDADE PRODUTIVA PARA ESCALA E DEMANDA CONTÍNUA
Atuamos como extensão da sua operação com execução recorrente, produção seriada e estrutura pronta para grandes volumes.

MAIS DE 25 ANOS TRANSFORMANDO DESAFIOS INDUSTRIAIS EM SOLUÇÕES."""


def seed_usinagem_internal_content(apps, schema_editor):
    Service = apps.get_model("core", "Service")
    service = (
        Service.objects.filter(slug="usinagem-b").first()
        or Service.objects.filter(slug="usinagem-de-precisao").first()
    )
    if not service:
        return

    service.slug = "usinagem-b"
    service.internal_subtitle = USINAGEM_HERO
    service.internal_text = USINAGEM_INTRO
    service.rich_text = USINAGEM_RICH_TEXT
    service.regions_served = "25 anos de mercado; Atendimento nacional; Alta capacidade produtiva"
    service.save(update_fields=["slug", "internal_subtitle", "internal_text", "rich_text", "regions_served"])


class Migration(migrations.Migration):

    dependencies = [
        ("core", "0022_seed_home_content"),
    ]

    operations = [
        migrations.RunPython(seed_usinagem_internal_content, migrations.RunPython.noop),
    ]
