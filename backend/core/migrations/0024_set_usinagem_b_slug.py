from django.db import migrations


def set_usinagem_b_slug(apps, schema_editor):
    Service = apps.get_model("core", "Service")
    service = (
        Service.objects.filter(slug="usinagem-b").first()
        or Service.objects.filter(slug="usinagem-de-precisao").first()
        or Service.objects.filter(title="Usinagem de Precisão").first()
    )
    if not service:
        return

    service.slug = "usinagem-b"
    service.internal_subtitle = (
        "Torneamento CNC, \n"
        "Caldeiraria e Usinagem \n"
        "para indústrias que não \n"
        "podem parar"
    )
    service.internal_text = (
        "Com mais de 20 anos de experiência, a Competec é parceira \n"
        "estratégica em usinagem, caldeiraria e fresagem CNC industrial \n"
        "para desenvolvimento, recuperação e produção de componentes \n"
        "críticos com precisão e confiabilidade."
    )
    service.regions_served = "25 ANOS DE MERCADO • ATENDIMENTO NACIONAL • ALTA CAPACIDADE PRODUTIVA"
    service.cta_text = "SOLICITAR ORÇAMENTO TÉCNICO PERSONALIZADO"
    service.internal_image = "services/internal/hero-usinagem-b.png"
    service.is_active = True
    service.order = 0
    service.save(
        update_fields=[
            "slug",
            "internal_subtitle",
            "internal_text",
            "regions_served",
            "cta_text",
            "internal_image",
            "is_active",
            "order",
        ]
    )


class Migration(migrations.Migration):

    dependencies = [
        ("core", "0023_seed_usinagem_internal_content"),
    ]

    operations = [
        migrations.RunPython(set_usinagem_b_slug, migrations.RunPython.noop),
    ]
