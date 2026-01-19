"use client";

import { useEffect, useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Differentiators } from "@/components/Differentiators";
import { Services } from "@/components/Services";
import { History } from "@/components/History";
import { Testimonials } from "@/components/Testimonials";
import { Partners } from "@/components/Partners";
import { BlogPreview } from "@/components/BlogPreview";
import { Footer } from "@/components/Footer";
import { Loader2 } from "lucide-react";


// --- INTERFACE DE DADOS (Espelho da API do Django) ---
interface HomeData {
  hero: {
    title: string;
    subtitle: string;
    cta_text: string;
    cta_link: string;
    image: string;
  } | null;
  
  about: {
    title: string;
    text: string;
    image: string;
  } | null;

  differentiators: Array<{
    id: number;
    title: string;
    description: string;
    is_highlighted: boolean;
    order: number;
  }>;

  services: Array<{
    id: number;
    title: string;
    slug: string; // <--- AQUI ESTÁ A CORREÇÃO
    description: string;
    icon: string | null;
    order: number;
  }>;

  services_section: {
    heading: string;
    title: string;
    image: string;
  } | null;

  history: {
    tag: string;
    title: string;
    text: string;
    footer_text: string;
    image: string;
  } | null;


  testimonials: Array<{
    id: number;
    name: string;
    role: string;
    text: string;
    image: string;
    rating: number;
  }>;

  testimonials_section: {
    title: string;
    subtitle: string;
    image: string;
  } | null;

  partners: Array<{
    id: number;
    name: string;
    logo: string;
  }>;

  blog_section: {
    tag: string;
    title: string;
    subtitle: string;
    cta_text: string;
    cta_link: string;
  } | null;

  blog_posts: Array<{
    id: number;
    title: string;
    image: string;
    date: string;
    slug: string;
  }>;

  footer: {
    logo: string;
    description: string;
    address_title: string;
    address_text: string;
    contact_title: string;
    phone: string;
    whatsapp: string;
    whatsapp_2: string;
    email: string;
    facebook: string;
    instagram: string;
    youtube: string;
    copyright_text: string;
  } | null;
}

export default function HomePage() {
  const [data, setData] = useState<HomeData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        // CORRIGIDO: Aponta para o endpoint da API usando variável de ambiente
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/home/`, {
            cache: 'no-store'
        });
        const json = await res.json();
        setData(json);
      } catch (error) {
        console.error("Erro ao carregar home:", error);
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

  return (
    <main className="min-h-screen bg-white pb-0">
      <Navbar />
      
      {/* 1. Hero Section */}
      {data?.hero && <Hero data={data.hero} />}
      
      {/* 2. Bloco Cinza (Quem Somos + Diferenciais) */}
      <div className="bg-[#E5E5E5]">
        {data?.about && <About data={data.about} />}
        {data?.differentiators && <Differentiators data={data.differentiators} />}
      </div>

      {/* 3. Serviços (Capa + Cards) */}
      {data?.services && data?.services_section && (
        <Services 
          cardData={data.services} 
          sectionData={data.services_section} 
        />
      )}

      {/* 4. História (Quem é a Competec - Fundo Escuro) */}
      {data?.history && <History data={data.history} />}

      {/* 5. Depoimentos (Rapaz + Carrossel de Reviews) */}
      {data?.testimonials && data?.testimonials_section && (
        <Testimonials 
            items={data.testimonials} 
            section={data.testimonials_section} 
        />
      )}

      {/* 6. Parceiros (Carrossel de Logos) */}
      {data?.partners && <Partners data={data.partners} />}

      {/* --- BLOG --- */}
      {data?.blog_section && data?.blog_posts && (
        <BlogPreview posts={data.blog_posts} section={data.blog_section} />
      )}
{/* --- RODAPÉ --- */}
      {data?.footer && <Footer data={data.footer} />}
    </main>
  );
}