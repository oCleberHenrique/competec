from django.db import migrations


CALIBRACAO_RICH_TEXT = """CONHECA NOSSOS SERVICOS DE CALIBRACAO
Dimensional
Temperatura
Pressao
Qualificacao de Equipamentos
Volumetria
Massa e Balancas

EQUIPAMENTOS E INSTRUMENTOS QUE CALIBRAMOS
Temos um escopo amplo para atender as industrias, desde calibracoes com padroes certificados ate RBC em nosso laboratorio proprio.

MAIOR NUMERO DE ACREDITACOES CGCRE/INMETRO DE CAPITAL NACIONAL DO CENTRO-OESTE
Desde 2008 garantindo a conformidade e seguranca em industrias, laboratorios de metrologia, saude e outros que necessitam de alta exatidao.
Servicos reconhecidos e aceitos em auditorias rigorosas nacionais e internacionais.
Acreditacao RBC ISO/IEC 17025, comprovando competencia tecnica e garantia da qualidade.
Atendimento tecnico especializado para tirar duvidas e apontar o servico ideal.

POR QUE GESTORES ESCOLHEM A COMPETEC?
Quem vive da rotina de regulacao em laboratorios e industrias sabe que nao da para contar com a sorte em auditorias e gestao da qualidade.

SOLICITE ORCAMENTO AGORA."""


def seed_calibracao_internal_content(apps, schema_editor):
    Service = apps.get_model("core", "Service")
    source = Service.objects.filter(slug="usinagem-b").first()
    service = Service.objects.filter(slug="calibracao").first() or Service()

    if source and not service.pk:
        service.icon = source.icon
        service.cta_link = source.cta_link

    service.title = "Calibracao"
    service.slug = "calibracao"
    service.short_description = "Calibracao de equipamentos laboratoriais e industriais com acreditacao RBC."
    service.internal_subtitle = (
        "Calibracao de equipamentos \n"
        "laboratoriais e industriais \n"
        "com acreditacao RBC!"
    )
    service.internal_text = (
        "Conformidade exigida em auditorias e competencia tecnica. \n"
        "Fale com um especialista do seu laboratorio de calibracao."
    )
    service.rich_text = CALIBRACAO_RICH_TEXT
    service.regions_served = "25 ANOS DE MERCADO; ATENDIMENTO NACIONAL; CONTROLE METROLOGICO"
    service.cta_text = "SOLICITE ORCAMENTO AGORA"
    service.internal_image = "services/internal/hero-calibracao.png"
    service.is_active = True
    service.order = 1
    service.save()


class Migration(migrations.Migration):

    dependencies = [
        ("core", "0024_set_usinagem_b_slug"),
    ]

    operations = [
        migrations.RunPython(seed_calibracao_internal_content, migrations.RunPython.noop),
    ]
