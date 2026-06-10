import type { ComponentProps } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowUpRight,
  CheckCircle2,
  ClipboardCheck,
  Cog,
  Factory,
  Gauge,
  PackageCheck,
  Wrench,
} from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { getApiUrl, getImageUrl } from "@/lib/utils";

type FooterData = ComponentProps<typeof Footer>["data"] | null;

interface ServiceData {
  id: number;
  title: string;
  slug: string;
  internal_subtitle?: string;
  internal_text?: string;
  internal_image?: string | null;
  rich_text?: string;
  regions_served?: string;
  cta_text?: string;
  cta_link?: string;
}

interface PageData {
  service: ServiceData;
  footer: FooterData;
}

interface ParsedContent {
  serviceHeading: string;
  serviceItems: string[];
  componentsTitle: string;
  componentsText: string;
  challengesTitle: string;
  challenges: string[];
  cards: Array<{ title: string; text: string }>;
  finalCta: string;
}

const defaultContent: ParsedContent = {
  serviceHeading: "Soluções técnicas",
  serviceItems: [],
  componentsTitle: "Aplicações industriais",
  componentsText: "",
  challengesTitle: "Quando sua operação precisa de resposta técnica",
  challenges: [],
  cards: [],
  finalCta: "",
};

function parseRichText(value?: string): ParsedContent {
  if (!value) return defaultContent;

  const lines = value
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean);

  const indexOf = (text: string) => lines.findIndex((line) => line === text);
  const slice = (start: number, end: number) =>
    start >= 0 ? lines.slice(start + 1, end >= 0 ? end : undefined) : [];

  const servicesIndex = indexOf("CONHEÇA NOSSOS SERVIÇOS DE USINAGEM");
  const componentsIndex = indexOf("COMPONENTES JÁ PRODUZIDOS");
  const challengesIndex = indexOf("QUANDO SUA OPERAÇÃO ENFRENTA ESTES DESAFIOS");
  const developmentIndex = indexOf("DESENVOLVIMENTO TÉCNICO OU RECUPERAÇÃO DE COMPONENTES CRÍTICOS");
  const capacityIndex = indexOf("CAPACIDADE PRODUTIVA PARA ESCALA E DEMANDA CONTÍNUA");
  const finalIndex = lines.findIndex((line) => line.startsWith("MAIS DE 25 ANOS"));

  return {
    serviceHeading: servicesIndex >= 0 ? lines[servicesIndex] : defaultContent.serviceHeading,
    serviceItems: slice(servicesIndex, componentsIndex),
    componentsTitle: componentsIndex >= 0 ? lines[componentsIndex] : defaultContent.componentsTitle,
    componentsText: slice(componentsIndex, challengesIndex).join(" "),
    challengesTitle: challengesIndex >= 0 ? lines[challengesIndex] : defaultContent.challengesTitle,
    challenges: slice(challengesIndex, developmentIndex),
    cards: [
      {
        title: developmentIndex >= 0 ? lines[developmentIndex] : "",
        text: slice(developmentIndex, capacityIndex).join(" "),
      },
      {
        title: capacityIndex >= 0 ? lines[capacityIndex] : "",
        text: slice(capacityIndex, finalIndex).join(" "),
      },
    ].filter((card) => card.title && card.text),
    finalCta: finalIndex >= 0 ? lines[finalIndex] : "",
  };
}

function getServerApiUrl() {
  const publicUrl = getApiUrl();
  return process.env.INTERNAL_API_URL || publicUrl.replace("localhost", "backend");
}

async function getServiceData(slug: string): Promise<PageData | null> {
  try {
    const res = await fetch(`${getServerApiUrl()}/api/service/${slug}/`, {
      cache: "no-store",
    });
    if (!res.ok) {
      console.error("Erro ao carregar serviço:", res.status, res.statusText);
      return null;
    }

    const data = await res.json();
    if (data?.service) return data as PageData;
    if (data?.slug) return { service: data, footer: null } as PageData;
    return null;
  } catch (error) {
    console.error("Erro ao carregar serviço:", error);
    return null;
  }
}

function getUsinagemCardImage(index: number) {
  return `${getApiUrl()}/media/services/usinagem-b/card-${index + 1}.png`;
}

function getUsinagemGalleryImage(index: number) {
  return `${getApiUrl()}/media/services/usinagem-b/gallery/usinagem-gallery-${index + 1}.png`;
}

const usinagemGalleryItems = [
  "Ferramental de Blister",
  "Eixos e Rotores",
  "Buchas e Acoplamentos",
  "Guias de Movimentação",
  "Gabaritos de Montagem",
  "Facas, Bicos e Pinos",
];

const usinagemChallenges = [
  {
    title: "Fornecedor que atrasa entrega",
    text: "Seu cronograma depende de previsibilidade real.",
  },
  {
    title: "Componente crítico indisponível",
    text: "Recriamos peças obsoletas ou fora de linha.",
  },
  {
    title: "Capacidade interna esgotada",
    text: "Absorvemos demandas extras de usinagem.",
  },
  {
    title: "Necessidade de produzir em escala",
    text: "Fabricamos componentes recorrentes com padrão técnico.",
  },
];

const usinagemCapabilityColumns = [
  {
    title: "Desenvolvimento técnico\nou recuperação de\ncomponentes críticos",
    text: "Criamos soluções do zero para novas demandas operacionais ou reproduzimos peças essenciais por engenharia reversa para manter sua produção em movimento.",
    cards: [
      {
        icon: Cog,
        title: "Desenvolvimento do zero",
        text: "Projetamos dispositivos, adaptações e componentes inéditos para gargalos e necessidades específicas da sua operação.",
      },
      {
        icon: ClipboardCheck,
        title: "Recuperação estratégica",
        text: "Recriamos peças importadas, obsoletas ou indisponíveis com aplicação direta na sua linha produtiva.",
      },
    ],
  },
  {
    title: "Capacidade produtiva\npara escala e demanda\ncontínua",
    text: "Atuamos como extensão da sua operação com execução recorrente, produção seriada e estrutura pronta para grandes volumes.",
    cards: [
      {
        icon: ClipboardCheck,
        title: "Produção em escala",
        text: "Fabricamos componentes em volume com repetibilidade técnica, padrão dimensional e previsibilidade de entrega.",
      },
      {
        icon: PackageCheck,
        title: "Capacidade sob demanda",
        text: "Sua empresa fornece a matéria-prima e a Competec entrega horas produtivas para absorver demandas recorrentes de usinagem.",
      },
    ],
  },
];

export default async function ServiceInternalPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const data = await getServiceData(slug);

  if (!data) return null;

  const { service, footer } = data;
  const imageUrl = service.internal_image ? getImageUrl(service.internal_image) : null;
  const heroTitle = service.internal_subtitle || service.title;
  const heroText = service.internal_text || "Descrição detalhada em breve.";
  const isUsinagemB = service.slug === "usinagem-b";
  const parsed = parseRichText(service.rich_text);
  const proofItems = service.regions_served
    ? service.regions_served.split(/[;\n]+/).map((item) => item.trim()).filter(Boolean)
    : [];

  return (
    <main className="min-h-screen bg-white">
      <Navbar />

      <section
        className={`${isUsinagemB ? "relative h-[650px] w-full overflow-hidden bg-[#2C3E50] bg-cover bg-center bg-no-repeat" : "bg-[#2C3E50] pt-32 lg:pt-40"} text-white`}
        style={isUsinagemB && imageUrl ? { backgroundImage: `url(${imageUrl})` } : undefined}
      >
        {isUsinagemB && <div className="absolute inset-0 bg-[#2C3E50]/65" />}

        <div className={`${isUsinagemB ? "relative z-10 mx-auto flex h-full max-w-[1216px] flex-col justify-center px-6 pt-20" : "mx-auto grid max-w-[1216px] grid-cols-1 gap-12 px-6 pb-20 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:pb-28"}`}>
          <div>
            <Link
              href="/#services"
              className={`${isUsinagemB ? "mb-8" : "mb-8"} inline-flex items-center text-sm font-bold text-white/70 transition-colors hover:text-[#E65100]`}
            >
              <ArrowLeft className="mr-2 h-4 w-4" /> Voltar para Soluções
            </Link>

            {!isUsinagemB && (
              <span className="text-sm font-bold uppercase tracking-wider text-[#E65100]">
                Soluções Competec
              </span>
            )}
            <h1 className={`${isUsinagemB ? "max-w-[543px] whitespace-pre-line text-[42px] leading-[1] lg:text-[48px]" : "mt-4 text-4xl leading-tight lg:text-6xl"} font-bold`}>
              {heroTitle}
            </h1>
            <p className={`${isUsinagemB ? "mt-8 max-w-[510px] whitespace-pre-line text-base leading-[1.45]" : "mt-6 max-w-2xl text-lg leading-relaxed"} text-gray-200`}>
              {heroText}
            </p>

            {!isUsinagemB && proofItems.length > 0 && (
              <div className="mt-8 flex flex-wrap gap-3">
                {proofItems.map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs font-bold uppercase tracking-wide text-white"
                  >
                    {item}
                  </span>
                ))}
              </div>
            )}

            <div className="mt-10">
              <Link
                href={service.cta_link || "#"}
                target="_blank"
                className={`${isUsinagemB ? "min-h-[53px] w-full max-w-[497px] rounded-[3px] px-6 text-lg" : "rounded-lg px-8 py-4"} inline-flex items-center justify-center bg-[#E65100] font-bold uppercase text-white shadow-lg transition-all hover:-translate-y-1 hover:bg-white hover:text-[#E65100]`}
              >
                {service.cta_text || "Solicitar análise técnica"}
                {!isUsinagemB && <ArrowUpRight className="ml-2 h-5 w-5" />}
              </Link>
            </div>

            {isUsinagemB && proofItems.length > 0 && (
              <p className="mt-3 max-w-[497px] text-center text-xs font-bold uppercase tracking-wide text-white">
                {proofItems[0]}
              </p>
            )}
          </div>

          {!isUsinagemB && (
            <div className="relative h-[420px] overflow-hidden rounded-[28px] bg-white/10 shadow-2xl lg:h-[560px]">
              {imageUrl ? (
                <Image
                  src={imageUrl}
                  alt={service.title}
                  fill
                  className="object-cover"
                  priority
                  unoptimized
                />
              ) : (
                <div className="flex h-full items-center justify-center text-white/60">
                  Imagem interna
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      {isUsinagemB && parsed.serviceItems.length > 0 && (
        <section className="bg-white py-16 lg:py-24">
          <div className="mx-auto max-w-[1216px] px-6">
            <h2 className="mx-auto max-w-[848px] text-center text-[34px] font-bold uppercase leading-[1] text-[#242424] lg:text-[48px]">
              {parsed.serviceHeading}
            </h2>

            <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {parsed.serviceItems.map((item, index) => (
                <Link
                  key={item}
                  href={service.cta_link || "#"}
                  target="_blank"
                  className="group flex min-h-[330px] flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition-all hover:-translate-y-1 hover:border-[#E65100] hover:shadow-lg"
                >
                  <div
                    className="relative h-[180px] w-full bg-[#E7EAED] bg-cover bg-center bg-no-repeat"
                    style={{ backgroundImage: `url(${getUsinagemCardImage(index)})` }}
                    aria-label={item}
                  >
                    <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[#2C3E50]/60 to-transparent" />
                  </div>

                  <div className="flex flex-1 flex-col justify-between p-6">
                    <div className="flex items-start justify-between gap-4">
                      <h3 className="text-xl font-bold leading-tight text-[#2C3E50]">
                        {item}
                      </h3>
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-orange-50 text-[#E65100] transition-colors group-hover:bg-[#E65100] group-hover:text-white">
                        <ArrowUpRight size={20} />
                      </span>
                    </div>

                    <div className="mt-8 flex items-center gap-3 text-xs font-bold uppercase tracking-wide text-[#E65100]">
                      <span className="h-px flex-1 bg-gray-200 transition-colors group-hover:bg-[#E65100]" />
                      Ver solução
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {isUsinagemB && (
        <section
          className="relative flex min-h-[720px] w-full items-center justify-center overflow-hidden bg-[#2C3E50] bg-cover bg-center bg-no-repeat px-6 py-16"
          style={imageUrl ? { backgroundImage: `url(${imageUrl})` } : undefined}
        >
          <div className="absolute inset-0 bg-[#2C3E50]/58" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#2C3E50]/45 via-transparent to-[#2C3E50]/35" />

          <form
            action={service.cta_link || "#"}
            target="_blank"
            className="relative z-10 w-full max-w-[560px] rounded-2xl bg-[#EB6338] px-6 py-10 shadow-2xl sm:px-8 lg:px-10 lg:py-12"
          >
            <h2 className="mx-auto max-w-[455px] text-center text-[28px] font-bold uppercase leading-[1.08] text-white lg:text-[30px]">
              Fale conosco e transforme seu projeto em realidade.
            </h2>

            <div className="mt-8 flex flex-col gap-6">
              <input
                type="text"
                name="nome"
                required
                placeholder="* Nome"
                className="h-11 w-full rounded-md border border-[#D8DEE4] bg-white px-3 text-sm text-[#2C3E50] outline-none transition-colors placeholder:text-[#B8C0C8] focus:border-[#2C3E50]"
              />
              <input
                type="text"
                name="cargo"
                required
                placeholder="* Qual o seu cargo?"
                className="h-11 w-full rounded-md border border-[#D8DEE4] bg-white px-3 text-sm text-[#2C3E50] outline-none transition-colors placeholder:text-[#B8C0C8] focus:border-[#2C3E50]"
              />
              <input
                type="email"
                name="email"
                required
                placeholder="* E-mail"
                className="h-11 w-full rounded-md border border-[#D8DEE4] bg-white px-3 text-sm text-[#2C3E50] outline-none transition-colors placeholder:text-[#B8C0C8] focus:border-[#2C3E50]"
              />
              <input
                type="tel"
                name="telefone"
                required
                placeholder="* Telefone/WhatsApp"
                className="h-11 w-full rounded-md border border-[#D8DEE4] bg-white px-3 text-sm text-[#2C3E50] outline-none transition-colors placeholder:text-[#B8C0C8] focus:border-[#2C3E50]"
              />
              <textarea
                name="necessidade"
                placeholder="Descreva sua Necessidade"
                rows={6}
                className="min-h-[140px] w-full resize-none rounded-md border border-[#D8DEE4] bg-white px-3 py-3 text-sm text-[#2C3E50] outline-none transition-colors placeholder:text-[#B8C0C8] focus:border-[#2C3E50]"
              />
            </div>

            <button
              type="submit"
              className="mx-auto mt-6 flex h-[54px] w-full max-w-[370px] items-center justify-center rounded-[3px] bg-[#2C3E50] px-6 text-sm font-medium uppercase text-white transition-all hover:bg-white hover:text-[#2C3E50]"
            >
              Solicitar contato da Competec
            </button>
          </form>
        </section>
      )}

      {!isUsinagemB && parsed.serviceItems.length > 0 && (
        <section className="bg-white py-20 lg:py-28">
          <div className="mx-auto max-w-[1216px] px-6">
            <div className="mb-12 max-w-3xl">
              <span className="text-sm font-bold uppercase tracking-wider text-[#E65100]">
                Usinagem industrial
              </span>
              <h2 className="mt-3 text-3xl font-bold leading-tight text-[#2C3E50] lg:text-5xl">
                {parsed.serviceHeading}
              </h2>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {parsed.serviceItems.map((item, index) => (
                <div
                  key={item}
                  className="min-h-[132px] rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-all hover:border-[#E65100]/40 hover:shadow-lg"
                >
                  <div className="mb-5 flex h-10 w-10 items-center justify-center rounded-lg bg-orange-50 text-[#E65100]">
                    {index % 3 === 0 ? <Wrench size={20} /> : index % 3 === 1 ? <Factory size={20} /> : <Gauge size={20} />}
                  </div>
                  <h3 className="text-lg font-bold leading-tight text-[#2C3E50]">{item}</h3>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {isUsinagemB && (
        <section className="relative overflow-hidden bg-[#F5F5F5] py-16 lg:min-h-[730px] lg:py-[58px]">
          <div
            className="pointer-events-none absolute -right-28 top-0 hidden h-full w-[520px] text-[760px] font-black leading-[0.78] text-[#E6E6E6] lg:block"
            aria-hidden="true"
          >
            K
          </div>

          <div className="relative z-10 mx-auto max-w-[960px] px-6">
            <h2 className="text-center text-[34px] font-bold uppercase leading-tight text-[#242424] lg:text-[40px]">
              Componentes já produzidos
            </h2>

            <div className="mt-12 grid grid-cols-1 overflow-hidden sm:grid-cols-2 lg:grid-cols-3">
              {usinagemGalleryItems.map((item, index) => (
                <div
                  key={item}
                  className="min-h-[238px] bg-cover bg-center bg-no-repeat"
                  style={{ backgroundImage: `url(${getUsinagemGalleryImage(index)})` }}
                  aria-label={item}
                />
              ))}
            </div>
          </div>
        </section>
      )}

      {isUsinagemB && (
        <section className="relative overflow-hidden bg-[#EB6338]">
          <div
            className="pointer-events-none absolute -left-10 top-0 hidden h-full text-[640px] font-black leading-[0.88] text-white/15 lg:block"
            aria-hidden="true"
          >
            K
          </div>

          <div className="relative z-10 mx-auto grid min-h-[608px] max-w-[1216px] grid-cols-1 items-end gap-10 px-6 pt-16 lg:grid-cols-[0.82fr_1fr] lg:gap-12 lg:pt-0">
            <div className="relative order-2 h-[440px] lg:order-1 lg:h-[608px]">
              <Image
                src={`${getApiUrl()}/media/services/usinagem-b/desafios-operador.png`}
                alt="Gestor industrial analisando desafios de produção"
                fill
                className="object-contain object-bottom"
                unoptimized
              />
            </div>

            <div className="order-1 pb-0 lg:order-2 lg:pb-20">
              <h2 className="max-w-[620px] text-[34px] font-bold uppercase leading-[1.03] text-white lg:text-[40px]">
                Quando sua operação enfrenta estes desafios
              </h2>

              <div className="mt-7 flex max-w-[589px] flex-col gap-2.5">
                {usinagemChallenges.map((challenge) => (
                  <article
                    key={challenge.title}
                    className="rounded-md bg-white px-6 py-3 text-[#242424] shadow-sm"
                  >
                    <h3 className="text-xl font-bold leading-tight">
                      {challenge.title}
                    </h3>
                    <p className="mt-0.5 text-base leading-tight text-gray-600">
                      {challenge.text}
                    </p>
                  </article>
                ))}
              </div>

              <Link
                href={service.cta_link || "#"}
                target="_blank"
                className="mt-11 inline-flex h-[45px] w-full max-w-[365px] items-center justify-center rounded-[3px] bg-[#16252C] px-6 text-sm font-medium uppercase text-white transition-all hover:bg-white hover:text-[#16252C]"
              >
                Solicitar análise técnica
              </Link>
            </div>
          </div>
        </section>
      )}

      {isUsinagemB && (
        <section className="relative overflow-hidden bg-[#F4F4F4] py-16 lg:min-h-[762px] lg:py-[54px]">
          <div
            className="pointer-events-none absolute -right-20 top-0 hidden h-full text-[760px] font-black leading-[0.78] text-[#E1E1E1] lg:block"
            aria-hidden="true"
          >
            K
          </div>

          <div className="relative z-10 mx-auto max-w-[960px] px-6">
            <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-[130px]">
              {usinagemCapabilityColumns.map((column) => (
                <div key={column.title}>
                  <h2 className="whitespace-pre-line text-[32px] font-bold uppercase leading-[1.02] text-[#1C2A30] lg:text-[40px]">
                    {column.title}
                  </h2>
                  <p className="mt-5 max-w-[390px] text-base leading-relaxed text-[#45565E]">
                    {column.text}
                  </p>

                  <div className="mt-10 flex flex-col gap-3">
                    {column.cards.map((card) => {
                      const Icon = card.icon;

                      return (
                        <article
                          key={card.title}
                          className="grid min-h-[149px] grid-cols-[56px_1fr] gap-5 border border-[#DFDFDF] bg-white px-5 py-6 shadow-sm"
                        >
                          <Icon className="mt-1 h-12 w-12 text-[#EB6338]" strokeWidth={2.4} />
                          <div>
                            <h3 className="text-xl font-bold uppercase leading-tight text-[#1C2A30]">
                              {card.title}
                            </h3>
                            <p className="mt-2 text-base leading-tight text-[#45565E]">
                              {card.text}
                            </p>
                          </div>
                        </article>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-11 flex justify-center">
              <Link
                href={service.cta_link || "#"}
                target="_blank"
                className="inline-flex h-[45px] w-full max-w-[365px] items-center justify-center rounded-[3px] bg-[#EB6338] px-6 text-sm font-medium uppercase text-white transition-all hover:bg-[#16252C]"
              >
                Solicitar análise técnica
              </Link>
            </div>
          </div>
        </section>
      )}

      {!isUsinagemB && (
      <section className="bg-[#F5F6F7] py-20 lg:py-28">
        <div className="mx-auto grid max-w-[1216px] grid-cols-1 gap-12 px-6 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
          <div>
            <span className="text-sm font-bold uppercase tracking-wider text-[#E65100]">
              Componentes e desafios
            </span>
            <h2 className="mt-3 text-3xl font-bold leading-tight text-[#2C3E50] lg:text-5xl">
              {parsed.componentsTitle}
            </h2>
            {parsed.componentsText && (
              <p className="mt-6 text-lg leading-relaxed text-gray-600">
                {parsed.componentsText}
              </p>
            )}
          </div>

          {parsed.challenges.length > 0 && (
            <div className="rounded-2xl bg-white p-8 shadow-sm">
              <h3 className="text-2xl font-bold leading-tight text-[#2C3E50]">
                {parsed.challengesTitle}
              </h3>
              <div className="mt-6 space-y-4">
                {parsed.challenges.map((challenge) => (
                  <div key={challenge} className="flex gap-3">
                    <CheckCircle2 className="mt-1 h-5 w-5 flex-none text-[#E65100]" />
                    <p className="text-base leading-relaxed text-gray-600">{challenge}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
      )}

      {parsed.cards.length > 0 && (
        <section className="bg-white py-20 lg:py-28">
          <div className="mx-auto grid max-w-[1216px] grid-cols-1 gap-8 px-6 lg:grid-cols-2">
            {parsed.cards.map((card) => (
              <article
                key={card.title}
                className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm"
              >
                <div className="mb-6 h-1 w-16 rounded-full bg-[#E65100]" />
                <h2 className="text-2xl font-bold leading-tight text-[#2C3E50] lg:text-3xl">
                  {card.title}
                </h2>
                <p className="mt-5 text-base leading-relaxed text-gray-600">{card.text}</p>
              </article>
            ))}
          </div>
        </section>
      )}

      <section className="bg-[#2C3E50] py-16 text-center text-white">
        <div className="mx-auto max-w-4xl px-6">
          <h2 className="text-3xl font-bold leading-tight lg:text-5xl">
            {parsed.finalCta || "Transforme desafios industriais em soluções."}
          </h2>
          <Link
            href={service.cta_link || "#"}
            target="_blank"
            className="mt-8 inline-flex items-center justify-center rounded-lg bg-[#E65100] px-8 py-4 font-bold text-white transition-all hover:bg-white hover:text-[#E65100]"
          >
            Solicitar análise técnica
            <ArrowUpRight className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </section>

      {footer && <Footer data={footer} />}
    </main>
  );
}
