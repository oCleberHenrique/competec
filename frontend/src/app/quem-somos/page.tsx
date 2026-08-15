"use client";

import { useEffect, useState } from "react";
import type { ComponentProps } from "react";
import Image from "next/image";
import Link from "next/link";
import { CheckCircle2, History } from "lucide-react"; // Adicionei ícones novos
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { getApiUrl, getImageUrl } from "@/lib/utils";

type FooterData = ComponentProps<typeof Footer>["data"];

// --- FUNÇÕES HELPER (INTELIGÊNCIA) ---

// 1. Extrai ID do Youtube
function extractYouTubeId(url: string | null) {
  if (!url) return null;
  if (/^[a-zA-Z0-9_-]{11}$/.test(url)) return url;
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  return (match && match[2].length === 11) ? match[2] : null;
}

// 2. Extrai SRC do Google Maps
function extractMapSrc(input: string | null) {
  if (!input) return null;
  const srcMatch = input.match(/src="([^"]+)"/);
  if (srcMatch && srcMatch[1]) return srcMatch[1];
  return input;
}

// --- INTERFACES ATUALIZADAS ---
interface GalleryItem {
  id: number;
  image: string;
}

interface ValueCard {
  id: number;
  icon: string;
  title: string;
  description: string;
}

// Novas interfaces para os dados que faltavam
interface HistoryItem {
  id: number;
  tag: string;
  title: string;
  text: string;
}

interface DifferentiatorItem {
  id: number;
  title: string;
  description: string;
}

interface PartnerItem {
  id: number;
  name: string;
  logo: string;
}

interface AboutData {
  about: {
    banner_image: string | null;
    tag: string;
    title: string;
    subtitle: string;
    text: string;
    internal_text: string;
    image: string;
    internal_image: string | null;
    youtube_video_id: string;
    map_embed_url: string;
    cta_text: string;
    cta_link: string;
    gallery: GalleryItem[];
    values: ValueCard[];
  } | null;
  // Adicionando as listas novas
  history: HistoryItem[];
  differentiators: DifferentiatorItem[];
  partners: PartnerItem[];
  footer: FooterData;
}

export default function AboutPage() {
  const [data, setData] = useState<AboutData | null>(null);
  const [loading, setLoading] = useState(true);
  const [openLightbox, setOpenLightbox] = useState(false);
  const [photoIndex, setPhotoIndex] = useState(0);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch(`${getApiUrl()}/api/about-page/?t=${Date.now()}`, {
            cache: 'no-store'
        });
        if (!res.ok) throw new Error("Erro ao buscar dados");
        const json = await res.json();
        setData(json);
      } catch (error) {
        console.error("Erro:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  if (loading) return null;

  if (!data?.about) return null;

  const { about, history, differentiators, partners } = data;

  const mainDisplayImage = about.internal_image || about.image;
  const youtubeId = extractYouTubeId(about.youtube_video_id);
  const mapSrc = extractMapSrc(about.map_embed_url);
  const lightboxSlides = about.gallery.map(item => ({ src: getImageUrl(item.image) }));

  return (
    <main className="min-h-screen bg-white">
      <Navbar />

      {/* 1. BANNER */}
      <div className="relative mt-20 h-[250px] w-full lg:h-[350px]">
        {about.banner_image ? (
          <Image
            src={getImageUrl(about.banner_image)}
            alt="Banner Quem Somos"
            fill
            className="object-cover"
            priority
            unoptimized
          />
        ) : (
          <div className="h-full w-full bg-gray-200 flex items-center justify-center text-gray-400">
            Competec
          </div>
        )}
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="absolute inset-0 flex items-center justify-center">
            <h1 className="text-4xl font-bold text-white uppercase tracking-wider">{about.tag || "Quem Somos"}</h1>
        </div>
      </div>

      <div className="mx-auto max-w-[1216px] px-6 py-16 lg:py-24">

        {/* 2. CONTEÚDO PRINCIPAL */}
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 items-center">
          <div>
            <span className="text-sm font-bold uppercase text-[#E65100] tracking-wider">
              {about.tag}
            </span>
            <h2 className="mt-2 text-3xl font-bold leading-tight text-[#2C3E50] lg:text-4xl">
              {about.title}
            </h2>

            {about.subtitle && (
                <p className="mt-4 text-xl font-medium text-gray-700">
                  {about.subtitle}
                </p>
            )}

            {about.internal_text && (
              <div className="mt-6 space-y-4 text-base leading-relaxed text-gray-600 whitespace-pre-line text-justify">
                {about.internal_text}
              </div>
            )}
          </div>

          <div className="relative h-[400px] w-full overflow-hidden rounded-2xl shadow-lg lg:h-[500px]">
            <Image
              src={getImageUrl(mainDisplayImage)}
              alt={about.title}
              fill
              className="object-cover"
              unoptimized
            />
          </div>
        </div>

        {/* 3. CARDS DE VALORES */}
        {about.values && about.values.length > 0 && (
          <div className="mt-24 grid grid-cols-1 gap-8 md:grid-cols-3">
            {about.values.map((card) => (
              <div key={card.id} className="flex flex-col items-center text-center p-6 rounded-2xl bg-gray-50 border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                <div className="relative h-16 w-16 mb-4">
                  <Image
                    src={getImageUrl(card.icon)}
                    alt={card.title}
                    fill
                    className="object-contain"
                    unoptimized
                  />
                </div>
                <h3 className="text-xl font-bold text-[#2C3E50] mb-3">{card.title}</h3>
                <p className="text-gray-600 leading-relaxed text-sm">{card.description}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* --- NOVA SEÇÃO: LINHA DO TEMPO (HISTÓRIA) --- */}
      {history && history.length > 0 && (
          <section className="py-20 bg-gray-50">
            <div className="mx-auto max-w-[1216px] px-6">
                <div className="text-center mb-16">
                    <span className="text-[#E65100] font-bold uppercase tracking-wider">Nossa Jornada</span>
                    <h2 className="text-3xl font-bold text-[#2C3E50] mt-2">História da Competec</h2>
                </div>

                <div className="relative border-l-4 border-gray-200 ml-6 lg:ml-1/2 space-y-12">
                    {history.map((item) => (
                        <div key={item.id} className="relative pl-8 lg:pl-12">
                            {/* Bolinha do Ano */}
                            <div className="absolute -left-[14px] top-0 flex h-6 w-6 items-center justify-center rounded-full bg-[#E65100] ring-4 ring-white">
                                <History className="h-3 w-3 text-white" />
                            </div>

                            <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                                <span className="text-2xl font-bold text-[#E65100] block mb-2">{item.tag}</span>
                                <h3 className="text-xl font-bold text-[#2C3E50] mb-2">{item.title}</h3>
                                <p className="text-gray-600">{item.text}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
          </section>
      )}

      {/* --- NOVA SEÇÃO: DIFERENCIAIS --- */}
      {differentiators && differentiators.length > 0 && (
        <section className="py-20 bg-[#2C3E50] text-white">
             <div className="mx-auto max-w-[1216px] px-6">
                <div className="text-center mb-16">
                    <h2 className="text-3xl font-bold">Nossos Diferenciais</h2>
                </div>
                <div className="grid md:grid-cols-3 gap-8">
                    {differentiators.map((diff) => (
                        <div key={diff.id} className="bg-white/5 p-8 rounded-xl border border-white/10 hover:bg-white/10 transition-colors">
                            <div className="text-[#E65100] mb-4">
                                <CheckCircle2 size={40} />
                            </div>
                            <h3 className="text-xl font-bold mb-3">{diff.title}</h3>
                            <p className="text-gray-300 leading-relaxed">{diff.description}</p>
                        </div>
                    ))}
                </div>
             </div>
        </section>
      )}

      <div className="mx-auto max-w-[1216px] px-6 py-16">
        {/* 4. GALERIA */}
        {about.gallery && about.gallery.length > 0 && (
          <div className="mt-12">
            <h3 className="mb-8 text-2xl font-bold text-[#2C3E50]">Nossa Estrutura</h3>
            <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
              {about.gallery.map((item, index) => (
                <div
                  key={item.id}
                  className="relative aspect-square cursor-pointer overflow-hidden rounded-lg bg-gray-200 transition-opacity hover:opacity-90"
                  onClick={() => {
                    setPhotoIndex(index);
                    setOpenLightbox(true);
                  }}
                >
                  <Image
                    src={getImageUrl(item.image)}
                    alt={`Galeria ${index}`}
                    fill
                    className="object-cover transition-transform duration-500 hover:scale-105"
                    unoptimized
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 5. VÍDEO */}
        {youtubeId && (
          <div className="mt-24">
              <div className="relative w-full overflow-hidden rounded-2xl pt-[56.25%] shadow-xl bg-black">
                <iframe
                  className="absolute inset-0 h-full w-full"
                  src={`https://www.youtube.com/embed/${youtubeId}`}
                  title="YouTube video player"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
          </div>
        )}
      </div>

      {/* --- NOVA SEÇÃO: PARCEIROS --- */}
      {partners && partners.length > 0 && (
        <section className="py-20 bg-gray-50 border-t border-gray-100">
            <div className="mx-auto max-w-[1216px] px-6 text-center">
                <h2 className="text-2xl font-bold text-[#2C3E50] mb-12 opacity-80">Empresas que confiam na Competec</h2>
                <div className="flex flex-wrap justify-center gap-12 items-center opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
                    {partners.map((partner) => (
                        <div key={partner.id} className="relative h-16 w-32 lg:h-20 lg:w-40">
                             <Image
                                src={getImageUrl(partner.logo)}
                                alt={partner.name}
                                fill
                                className="object-contain"
                                unoptimized
                            />
                        </div>
                    ))}
                </div>
            </div>
        </section>
      )}

      {/* 6. MAPA */}
      {mapSrc && (
        <div className="w-full h-[400px] bg-gray-200">
            <iframe
                src={mapSrc}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
        </div>
      )}

      {/* 7. CTA FINAL */}
      <div className="bg-[#2C3E50] py-16 text-center">
        <div className="mx-auto max-w-4xl px-6">
            <h2 className="text-3xl font-bold text-white mb-8">
                Pronto para transformar sua indústria?
            </h2>
            <Link
                href={about.cta_link || "https://wa.me/5562995530750"}
                target="_blank"
                className="inline-flex items-center justify-center rounded-lg bg-[#E65100] px-10 py-4 text-lg font-bold text-white transition-all hover:bg-white hover:text-[#E65100]"
            >
                {about.cta_text || "Fale Conosco"}
            </Link>
        </div>
      </div>

      <Footer data={data.footer} />

      <Lightbox
        open={openLightbox}
        close={() => setOpenLightbox(false)}
        index={photoIndex}
        slides={lightboxSlides}
      />
    </main>
  );
}
