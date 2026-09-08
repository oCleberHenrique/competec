from django.db import migrations


def create_initial_sections(apps, schema_editor):
    DifferentiatorsSection = apps.get_model('core', 'DifferentiatorsSection')
    PartnersSection = apps.get_model('core', 'PartnersSection')

    if not DifferentiatorsSection.objects.exists():
        DifferentiatorsSection.objects.create()

    if not PartnersSection.objects.exists():
        PartnersSection.objects.create()


def noop_reverse(apps, schema_editor):
    pass


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0033_differentiatorssection_partnerssection_and_more'),
    ]

    operations = [
        migrations.RunPython(create_initial_sections, noop_reverse),
    ]
