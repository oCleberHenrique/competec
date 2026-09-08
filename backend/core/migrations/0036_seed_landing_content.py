from django.db import migrations


USINAGEM_CHALLENGES = [
    ("Fornecedor que atrasa entrega", "Seu cronograma depende de previsibilidade real."),
    ("Componente crítico indisponível", "Recriamos peças obsoletas ou fora de linha."),
    ("Capacidade interna esgotada", "Absorvemos demandas extras de usinagem."),
    ("Necessidade de produzir em escala", "Fabricamos componentes recorrentes com padrão técnico."),
]

CALIBRACAO_AUTHORITY_POINTS = [
    "Servicos reconhecidos e aceitos em auditorias rigorosas nacionais e internacionais.",
    "Acreditacao RBC ISO/IEC 17025, comprovando competencia tecnica e garantia da qualidade.",
    "Atendimento tecnico especializado para tirar duvidas e apontar o servico ideal.",
]

USINAGEM_BENEFITS = [
    ("Desenvolvimento do zero", "Projetamos dispositivos, adaptações e componentes inéditos para gargalos e necessidades específicas da sua operação."),
    ("Recuperação estratégica", "Recriamos peças importadas, obsoletas ou indisponíveis com aplicação direta na sua linha produtiva."),
    ("Produção em escala", "Fabricamos componentes em volume com repetibilidade técnica, padrão dimensional e previsibilidade de entrega."),
    ("Capacidade sob demanda", "Sua empresa fornece a matéria-prima e a Competec entrega horas produtivas para absorver demandas recorrentes de usinagem."),
]

CALIBRACAO_BENEFITS = [
    ("Rastreabilidade Comprovada", "Certificados com evidencia de rastreabilidade a padroes nacionais/internacionais (RBC/Inmetro) que nao falham em auditorias."),
    ("Acreditacao CGCRE/INMETRO desde 2008", "Maior escopo de calibracao de capital nacional do Centro-Oeste brasileiro, validando a excelencia metrologica da Competec."),
    ("Documentacao para auditorias", "Relatorios claros, com incertezas de medicao, limites de erro toleraveis e orientacoes tecnicas de calibracao."),
    ("Atendimento consultivo", "Nossa equipe orienta sobre a melhor abordagem e periodicidade para seu escopo de calibracao, focada no custo-beneficio."),
    ("Agilidade com qualidade", "Prazos competitivos com entrega dos certificados atestados em nuvem."),
]

CALIBRACAO_EQUIPMENT_CATEGORIES = [
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

LANDING_COPY = {
    "calibracao": {
        "landing_equipment_title": "Quais sao os equipamentos e instrumentos que calibramos?",
        "landing_equipment_text": "Temos um escopo amplo para atender as industrias, desde calibracoes com padroes certificados ate RBC em nosso laboratorio proprio.",
        "landing_callout": "Nao encontrou o instrumento que precisa calibrar? Fale com a nossa equipe, nos vamos encontrar a solucao adequada para o seu caso.",
        "landing_authority_title": "Maior numero de acreditacoes CGCRE/INMETRO de capital nacional do Centro-Oeste!",
        "landing_authority_text": "Desde 2008 garantindo a conformidade e seguranca em industrias, laboratorios de metrologia, saude e outros que necessitam de alta exatidao.",
        "landing_form_title": "Servico de calibracao para manter sua industria em conformidade",
        "landing_form_text": "Preencha os dados abaixo e nossa equipe tecnica entrara em contato em ate 24h uteis para entender sua demanda e elaborar proposta detalhada.",
        "landing_benefits_title": "Por que gestores escolhem a Competec?",
        "landing_benefits_text": "Quem vive da rotina de regulacao em laboratorios e industrias, sabe que nao da para contar com a sorte em auditorias e gestao da qualidade.",
        "landing_final_cta": "Calibracao com rastreabilidade para sua proxima auditoria.",
    },
    "usinagem-b": {
        "landing_equipment_title": "Solucoes de usinagem para demandas criticas",
        "landing_equipment_text": "Atuamos no desenvolvimento, recuperacao e producao de componentes industriais com precisao, repetibilidade e resposta tecnica.",
        "landing_callout": "Tem uma peca critica, obsoleta ou uma demanda interna represada? Fale com a equipe tecnica para avaliar o melhor caminho.",
        "landing_authority_title": "Estrutura tecnica para industrias que nao podem parar",
        "landing_authority_text": "Mais de 25 anos transformando desafios de manutencao, producao e reposicao em componentes funcionais para operacoes industriais.",
        "landing_form_title": "Orcamento tecnico para usinagem, caldeiraria e componentes sob demanda",
        "landing_form_text": "Preencha os dados abaixo e nossa equipe entra em contato para entender desenho, amostra, criticidade, prazo e volume da sua demanda.",
        "landing_benefits_title": "Por que industrias escolhem a Competec?",
        "landing_benefits_text": "A Competec atua como extensao tecnica da sua operacao para reduzir dependencia de fornecedores, atrasos e paradas nao planejadas.",
        "landing_final_cta": "Transforme demandas criticas em componentes prontos para operar.",
    },
}


def seed_landing_content(apps, schema_editor):
    Service = apps.get_model('core', 'Service')
    ServiceAuthorityPoint = apps.get_model('core', 'ServiceAuthorityPoint')
    ServiceBenefit = apps.get_model('core', 'ServiceBenefit')
    ServiceEquipmentCategory = apps.get_model('core', 'ServiceEquipmentCategory')
    ServiceFAQ = apps.get_model('core', 'ServiceFAQ')

    for slug, copy in LANDING_COPY.items():
        service = Service.objects.filter(slug=slug).first()
        if not service:
            continue

        service.use_landing_template = True
        for field, value in copy.items():
            setattr(service, field, value)
        service.save()

        if slug == "calibracao":
            authority_points = CALIBRACAO_AUTHORITY_POINTS
        else:
            authority_points = [f"{title}: {text}" for title, text in USINAGEM_CHALLENGES]
        if not ServiceAuthorityPoint.objects.filter(service=service).exists():
            for order, text in enumerate(authority_points):
                ServiceAuthorityPoint.objects.create(service=service, description=text, order=order)

        benefits = CALIBRACAO_BENEFITS if slug == "calibracao" else USINAGEM_BENEFITS
        if not ServiceBenefit.objects.filter(service=service).exists():
            for order, (title, text) in enumerate(benefits):
                ServiceBenefit.objects.create(service=service, title=title, description=text, order=order)

        if slug == "calibracao" and not ServiceEquipmentCategory.objects.filter(service=service).exists():
            for order, (title, items) in enumerate(CALIBRACAO_EQUIPMENT_CATEGORIES):
                ServiceEquipmentCategory.objects.create(
                    service=service, title=title, description="\n".join(items),
                    cta_text="Solicite orcamento", order=order,
                )

        if slug == "calibracao" and not ServiceFAQ.objects.filter(service=service).exists():
            for order, (question, answer) in enumerate(CALIBRACAO_FAQS):
                ServiceFAQ.objects.create(service=service, question=question, answer=answer, order=order)


def noop_reverse(apps, schema_editor):
    pass


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0035_service_landing_authority_text_and_more'),
    ]

    operations = [
        migrations.RunPython(seed_landing_content, noop_reverse),
    ]
