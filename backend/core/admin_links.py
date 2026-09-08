from django import forms
from django.contrib import admin, messages
from django.forms import modelformset_factory
from django.shortcuts import redirect, render
from django.urls import reverse

from .models import AboutSection, FooterConfig, HeroSection, InformationPage, NavbarConfig, Service

# Unfold reseta todo <input type=text> com "background-color:#0000!important;
# border-style:none!important" (seletor input[type=text], mais especifico que
# uma classe Tailwind isolada). Por isso o estilo deste campo vem de CSS
# proprio no template (seletor "input.cta-field[type=text]"), nao de utility
# classes do Tailwind.
INPUT_CLASS = "cta-field"


class GlobalLinksForm(forms.Form):
    hero_cta_link = forms.CharField(
        label="Botão do Hero (Banner da Home)",
        max_length=200,
        widget=forms.TextInput(attrs={"class": INPUT_CLASS}),
        help_text="Botão principal que aparece no topo da Home, logo abaixo do título. Ex: '#services' ou um link de WhatsApp.",
    )
    about_cta_link = forms.CharField(
        label="Botão \"Entre em Contato\" (Quem Somos)",
        max_length=200,
        widget=forms.TextInput(attrs={"class": INPUT_CLASS}),
        help_text="Link do botão de contato exibido na seção/página Quem Somos.",
    )
    navbar_floating_whatsapp = forms.CharField(
        label="WhatsApp Flutuante (botão fixo)",
        max_length=200,
        required=False,
        widget=forms.TextInput(attrs={"class": INPUT_CLASS}),
        help_text="Link do botãozinho verde de WhatsApp fixo no canto da tela, presente em TODAS as páginas do site. Formato: https://wa.me/55DDDNUMERO",
    )
    footer_whatsapp = forms.CharField(
        label="WhatsApp Principal (Rodapé)",
        max_length=50,
        required=False,
        widget=forms.TextInput(attrs={"class": INPUT_CLASS}),
        help_text="Número de WhatsApp exibido no rodapé do site, em todas as páginas.",
    )
    footer_whatsapp_2 = forms.CharField(
        label="WhatsApp Secundário (Rodapé)",
        max_length=50,
        required=False,
        widget=forms.TextInput(attrs={"class": INPUT_CLASS}),
        help_text="Segundo número de WhatsApp exibido no rodapé, se houver.",
    )


ServiceLinkFormSet = modelformset_factory(
    Service,
    fields=("cta_link",),
    extra=0,
    widgets={"cta_link": forms.TextInput(attrs={"class": INPUT_CLASS})},
)
InfoPageLinkFormSet = modelformset_factory(
    InformationPage,
    fields=("cta_link",),
    extra=0,
    widgets={"cta_link": forms.TextInput(attrs={"class": INPUT_CLASS})},
)


def links_dashboard_view(request):
    hero = HeroSection.objects.filter(is_active=True).first() or HeroSection.objects.first()
    about = AboutSection.objects.filter(is_active=True).first() or AboutSection.objects.first()
    navbar = NavbarConfig.objects.first()
    footer = FooterConfig.objects.first()

    initial = {
        "hero_cta_link": hero.cta_link if hero else "",
        "about_cta_link": about.cta_link if about else "",
        "navbar_floating_whatsapp": navbar.floating_whatsapp_link if navbar else "",
        "footer_whatsapp": footer.whatsapp if footer else "",
        "footer_whatsapp_2": footer.whatsapp_2 if footer else "",
    }

    service_qs = Service.objects.all().order_by("order", "title")
    infopage_qs = InformationPage.objects.all().order_by("title")

    if request.method == "POST":
        global_form = GlobalLinksForm(request.POST, initial=initial)
        service_formset = ServiceLinkFormSet(request.POST, queryset=service_qs, prefix="services")
        infopage_formset = InfoPageLinkFormSet(request.POST, queryset=infopage_qs, prefix="infopages")

        if global_form.is_valid() and service_formset.is_valid() and infopage_formset.is_valid():
            data = global_form.cleaned_data

            if hero:
                hero.cta_link = data["hero_cta_link"]
                hero.save(update_fields=["cta_link"])
            if about:
                about.cta_link = data["about_cta_link"]
                about.save(update_fields=["cta_link"])
            if navbar:
                navbar.floating_whatsapp_link = data["navbar_floating_whatsapp"]
                navbar.save(update_fields=["floating_whatsapp_link"])
            if footer:
                footer.whatsapp = data["footer_whatsapp"]
                footer.whatsapp_2 = data["footer_whatsapp_2"]
                footer.save(update_fields=["whatsapp", "whatsapp_2"])

            service_formset.save()
            infopage_formset.save()

            messages.success(request, "Links atualizados com sucesso!")
            return redirect(reverse("admin:links-dashboard"))
    else:
        global_form = GlobalLinksForm(initial=initial)
        service_formset = ServiceLinkFormSet(queryset=service_qs, prefix="services")
        infopage_formset = InfoPageLinkFormSet(queryset=infopage_qs, prefix="infopages")

    context = {
        **admin.site.each_context(request),
        "title": "Links de Contato (CTAs)",
        "global_form": global_form,
        "service_formset": service_formset,
        "infopage_formset": infopage_formset,
    }
    return render(request, "admin/core/links_dashboard.html", context)
