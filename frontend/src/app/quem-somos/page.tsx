"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Loader2 } from "lucide-react";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

// --- FUNÇÕES HELPER (INTELIGÊNCIA) ---

// 1. Extrai ID do Youtube de qualquer link
function extractYouTubeId(url: string | null) {
  if (!url) return null;
  // Se já for só o ID (ex: 11 caracteres sem barra), retorna ele
  if (/^[a-zA-Z0-9_-]{11}$/.test(url)) return url;
  
  // Tenta extrair de URLs comuns
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  return (match && match[2].length === 11) ? match[2] : null;
}

// 2. Extrai o link SRC do iframe do Google Maps
function extractMapSrc(input: string | null) {
  if (!input) return null;
  // Se o usuário colou o iframe inteiro (<iframe src="..."), pega só o src
  const srcMatch = input.match(/src="([^"]+)"/);
  if (srcMatch && srcMatch[1]) return srcMatch[1];
  
  // Se colou só o link, retorna o link
  return input;
}

// --- INTERFACES ---
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

interface AboutData {
  about: {
    banner_image: string | null;
    tag: string;
    title: string;
    subtitle: string;
    text: string;  
    internal_text: string;
    image: string; // Imagem da Home (fallback)
    internal_image: string | null; // <--- NOVA: Imagem exclusiva da interna
    youtube_video_id: string;
    map_embed_url: string;
    cta_text: string;
    cta_link: string;
    gallery: GalleryItem[];
    values: ValueCard[];
  } | null;
  footer: any;
}

export default function AboutPage() {
  const [data, setData] = useState<AboutData | null>(null);
  const [loading, setLoading] = useState(true);
  const [openLightbox, setOpenLightbox] = useState(false);
  const [photoIndex, setPhotoIndex] = useState(0);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch(`http://localhost:8000/api/about-page/?t=${Date.now()}`, { cache: 'no-store' });
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

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-white">
        <Loader2 className="h-10 w-10 animate-spin text-orange-600" />
      </div>
    );
  }

  if (!data?.about) return null;

  const { about } = data;
  
  const getFullUrl = (path: string | null) => {
    if (!path) return ""; 
    return path.startsWith("http") ? path : `http://localhost:8000${path}`;
  };

  // Lógica da Imagem Principal: Tenta a Interna, se não tiver, usa a da Home
  const mainDisplayImage = about.internal_image || about.image;
  
  // Processamento dos Links Inteligentes
  const youtubeId = extractYouTubeId(about.youtube_video_id);
  const mapSrc = extractMapSrc(about.map_embed_url);
  const lightboxSlides = about.gallery.map(item => ({ src: getFullUrl(item.image) }));

  return (
    <main className="min-h-screen bg-white">
      <Navbar />

      {/* 1. BANNER */}
      <div className="relative mt-20 h-[250px] w-full lg:h-[350px]">
        {about.banner_image ? (
          <Image
            src={getFullUrl(about.banner_image)}
            alt="Banner Quem Somos"
            fill
            className="object-cover"
            priority
            unoptimized
          />
        ) : (
          <div className="h-full w-full bg-gray-200 flex items-center justify-center text-gray-400">
            Sem Banner
          </div>
        )}
        <div className="absolute inset-0 bg-black/30"></div>
        <div className="absolute inset-0 flex items-center justify-center">
            <h1 className="text-4xl font-bold text-white uppercase tracking-wider">{about.tag}</h1>
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
            
            {/* SUBTÍTULO (Destaque) */}
            {about.subtitle && (
                <p className="mt-4 text-xl font-medium text-gray-700">
                  {about.subtitle}
                </p>
            )}

           {/* TEXTO COMPLETO DA INTERNA (O novo campo) */}
            {about.internal_text && (
              <div className="mt-6 space-y-4 text-base leading-relaxed text-gray-600 whitespace-pre-line text-justify">
                {about.internal_text}
              </div>
            )}
          </div>

          {/* IMAGEM LATERAL (Usa a interna se existir, senão usa a da home) */}
          <div className="relative h-[400px] w-full overflow-hidden rounded-2xl shadow-lg lg:h-[500px]">
            <Image 
              src={getFullUrl(mainDisplayImage)}
              alt={about.title}
              fill
              className="object-cover"
              unoptimized
            />
          </div>
        </div>

        {/* 3. CARDS DE VALORES */}
        {about.values.length > 0 && (
          <div className="mt-24 grid grid-cols-1 gap-8 md:grid-cols-3">
            {about.values.map((card) => (
              <div key={card.id} className="flex flex-col items-center text-center p-6 rounded-2xl bg-gray-50 border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                <div className="relative h-16 w-16 mb-4">
                  <Image 
                    src={getFullUrl(card.icon)}
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

        {/* 4. GALERIA */}
        {about.gallery.length > 0 && (
          <div className="mt-24">
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
                    src={getFullUrl(item.image)}
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

        {/* 5. VÍDEO (Com tratamento de link inteligente) */}
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

      {/* 6. MAPA (Com tratamento de iframe inteligente) */}
      {mapSrc && (
        <div className="w-full h-[250px] bg-gray-200">
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
                href={about.cta_link}
                target="_blank"
                className="inline-flex items-center justify-center rounded-lg bg-[#E65100] px-10 py-4 text-lg font-bold text-white transition-all hover:bg-white hover:text-[#E65100]"
            >
                {about.cta_text}
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