from django.db import migrations, models
import django.db.models.deletion


CALIBRACAO_EQUIPMENT = [
    ("Dimensional", [
        "Paquimetros, micrometros, relogios comparadores",
        "Trena, prumo, esquadros e blocos-padrao",
        "Peneiras granulometricas, durometros",
        "Fitas metricas",
    ]),
    ("Temperatura", [
        "Termometros digitais e analogicos",
        "Termopares e PT100",
        "Banhos termicos",
        "Data loggers de temperatura",
    ]),
    ("Pressao", [
        "Manometros analogicos e digitais",
        "Vacuometros e manovacuometros",
        "Transdutores e transmissores de pressao",
        "Valvulas de seguranca e alivio",
    ]),
    ("Qualificacao de Equipamentos", [
        "Camaras frias e freezers",
        "Estufas e fornos",
        "Autoclaves",
        "Mapeamento termico e qualificacao de desempenho",
    ]),
    ("Volumetria", [
        "Pipetas e micropipetas",
        "Buretas e provetas",
        "Dispensadores de liquidos",
        "Baloes volumetricos e picnometros",
    ]),
    ("Massa e Balancas", [
        "Balancas analiticas e semianaliticas",
        "Balancas industriais",
        "Pesos padrao",
        "Celulas de carga",
    ]),
]

CALIBRACAO_BENEFITS = [
    ("Rastreabilidade Comprovada", "Certificados com evidencia de rastreabilidade a padroes nacionais/internacionais (RBC/Inmetro) que nao falham em auditorias."),
    ("Acreditacao CGCRE/INMETRO desde 2008", "Maior escopo de calibracao de capital nacional do Centro-Oeste brasileiro, validando a excelencia metrologica da Competec."),
    ("Documentacao para auditorias", "Relatorios claros, com incertezas de medicao, limites de erro toleraveis e orientacoes tecnicas de calibracao."),
    ("Atendimento consultivo", "Nossa equipe orienta sobre a melhor abordagem e periodicidade para seu escopo de calibracao, focada no custo-beneficio."),
    ("Agilidade com qualidade", "Prazos competitivos com entrega dos certificados atestados em nuvem."),
]

CALIBRACAO_FAQS = [
    ("Qual a diferenca entre calibracao rastreavel e calibracao comum?", "Calibracao rastreavel possui cadeia documentada ligando o instrumento calibrado a padroes nacionais/internacionais reconhecidos. Calibracao comum, sem rastreabilidade, nao e aceita em auditorias de industrias reguladas e pode gerar nao conformidade."),
    ("O que e rastreabilidade RBC e por que isso importa?", "RBC (Rede Brasileira de Calibracao) e a rede de laboratorios acreditados pelo Inmetro que garante rastreabilidade reconhecida nacionalmente. Certificados com rastreabilidade RBC sao aceitos em auditorias ANVISA, ISO e outras normas tecnicas sem questionamentos."),
    ("Qual a periodicidade ideal para calibracao de instrumentos?", "Depende do instrumento, criticidade do processo e requisitos regulatorios do seu setor. A norma ISO/IEC 17025 recomenda periodicidade baseada em historico de deriva, mas industrias como as farmaceuticas geralmente calibram anualmente. Nosso time tecnico orienta a periodicidade adequada para cada caso atraves de consultoria e treinamento."),
    ("O certificado de calibracao tem validade?", "Tecnicamente, certificados de calibracao nao vencem. Eles atestam a condicao do instrumento na data da calibracao. A periodicidade de recalibracao deve ser definida pela empresa com base em normas aplicaveis, criticidade do processo e historico do instrumento."),
    ("Voces fazem calibracao in loco na minha empresa?", "Sim, para instrumentos de grande porte ou quando o transporte pode afetar a calibracao. Avaliamos caso a caso a viabilidade tecnica considerando condicoes ambientais e requisitos de rastreabilidade. Isso tambem reduz paradas de fabrica e de ativos."),
    ("Como funciona a qualificacao termica de equipamentos?", "Qualificacao termica mapeia a distribuicao de temperatura em camaras frias, estufas, autoclaves e outros equipamentos criticos. Utilizamos data loggers calibrados e seguimos protocolos validados para gerar relatorios aceitos em auditorias regulatorias."),
    ("Meu instrumento reprovou na calibracao. E agora?", "Emitimos certificado como encontrado documentando a condicao real do instrumento. Voce decide se ajusta, repara, solicita nova calibracao ou substitui o equipamento. A equipe orienta tecnicamente a melhor decisao no produto de consultoria."),
    ("Quanto tempo leva uma calibracao?", "Varia conforme o instrumento, escopo, documentos orientativos e complexidade de manuseio. O prazo sera informado no orcamento."),
]

USINAGEM_EQUIPMENT = [
    ("Torneamento CNC", ["Componentes cilindricos", "Eixos, buchas e pinos", "Pecas sob desenho tecnico"]),
    ("Fresagem CNC", ["Dispositivos, bases e suportes", "Componentes com geometrias complexas", "Prototipos e lotes recorrentes"]),
    ("Caldeiraria Industrial", ["Estruturas metalicas", "Conjuntos soldados", "Reparos e fabricacoes sob demanda"]),
    ("Engenharia Reversa", ["Pecas obsoletas", "Componentes importados indisponiveis", "Reproducao por amostra"]),
]

USINAGEM_BENEFITS = [
    ("Desenvolvimento tecnico", "Criamos solucoes do zero para novas demandas operacionais ou reproduzimos pecas essenciais por engenharia reversa."),
    ("Capacidade produtiva", "Atuamos como extensao da operacao com execucao recorrente, producao seriada e estrutura para grandes volumes."),
    ("Recuperacao estrategica", "Recriamos pecas importadas, obsoletas ou indisponiveis com aplicacao direta na linha produtiva."),
    ("Producao sob demanda", "Absorvemos demandas extras de usinagem para reduzir filas internas e atrasos de manutencao."),
]


def upsert_children(model, service, rows, fields):
    model.objects.filter(service=service).delete()
    for order, row in enumerate(rows):
        data = {"service": service, "order": order}
        for key, value in zip(fields, row):
            data[key] = value
        model.objects.create(**data)


def seed_service_landing_content(apps, schema_editor):
    Service = apps.get_model("core", "Service")
    Category = apps.get_model("core", "ServiceEquipmentCategory")
    Benefit = apps.get_model("core", "ServiceBenefit")
    FAQ = apps.get_model("core", "ServiceFAQ")

    calibracao = Service.objects.filter(slug="calibracao").first()
    if calibracao:
        calibracao.title = "Calibracao"
        calibracao.short_description = "Calibracao de equipamentos laboratoriais e industriais com acreditacao RBC."
        calibracao.internal_subtitle = "Calibracao de equipamentos laboratoriais e industriais com acreditacao RBC!"
        calibracao.internal_text = "Conformidade exigida em auditorias e competencia tecnica. Fale com um especialista do seu laboratorio de calibracao."
        calibracao.cta_text = "Solicite orcamento agora"
        calibracao.is_active = True
        calibracao.order = 1
        calibracao.save()
        upsert_children(Category, calibracao, [(title, "\n".join(items), "Solicite orcamento") for title, items in CALIBRACAO_EQUIPMENT], ["title", "description", "cta_text"])
        upsert_children(Benefit, calibracao, CALIBRACAO_BENEFITS, ["title", "description"])
        upsert_children(FAQ, calibracao, CALIBRACAO_FAQS, ["question", "answer"])

    usinagem = Service.objects.filter(slug="usinagem-b").first()
    if usinagem:
        usinagem.title = "Usinagem"
        usinagem.cta_text = "Solicitar orcamento tecnico"
        usinagem.is_active = True
        usinagem.order = 0
        usinagem.save()
        upsert_children(Category, usinagem, [(title, "\n".join(items), "Solicitar orcamento") for title, items in USINAGEM_EQUIPMENT], ["title", "description", "cta_text"])
        upsert_children(Benefit, usinagem, USINAGEM_BENEFITS, ["title", "description"])


class Migration(migrations.Migration):

    dependencies = [
        ("core", "0025_seed_calibracao_internal_content"),
    ]

    operations = [
        migrations.CreateModel(
            name="ServiceBenefit",
            fields=[
                ("id", models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name="ID")),
                ("title", models.CharField(max_length=160, verbose_name="Titulo")),
                ("description", models.TextField(verbose_name="Descricao")),
                ("order", models.PositiveIntegerField(default=0, verbose_name="Ordem")),
                ("service", models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name="benefits", to="core.service")),
            ],
            options={"verbose_name": "Diferencial / Beneficio", "verbose_name_plural": "Diferenciais / Beneficios", "ordering": ["order"]},
        ),
        migrations.CreateModel(
            name="ServiceEquipmentCategory",
            fields=[
                ("id", models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name="ID")),
                ("title", models.CharField(max_length=120, verbose_name="Titulo")),
                ("description", models.TextField(blank=True, help_text="Use uma linha para cada item.", verbose_name="Itens / Descricao")),
                ("cta_text", models.CharField(default="Solicite orcamento", max_length=80, verbose_name="Texto do botao")),
                ("order", models.PositiveIntegerField(default=0, verbose_name="Ordem")),
                ("service", models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name="equipment_categories", to="core.service")),
            ],
            options={"verbose_name": "Categoria / Equipamento", "verbose_name_plural": "Categorias / Equipamentos", "ordering": ["order"]},
        ),
        migrations.CreateModel(
            name="ServiceFAQ",
            fields=[
                ("id", models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name="ID")),
                ("question", models.CharField(max_length=220, verbose_name="Pergunta")),
                ("answer", models.TextField(verbose_name="Resposta")),
                ("order", models.PositiveIntegerField(default=0, verbose_name="Ordem")),
                ("service", models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name="faqs", to="core.service")),
            ],
            options={"verbose_name": "Pergunta frequente", "verbose_name_plural": "Perguntas frequentes", "ordering": ["order"]},
        ),
        migrations.RunPython(seed_service_landing_content, migrations.RunPython.noop),
    ]
