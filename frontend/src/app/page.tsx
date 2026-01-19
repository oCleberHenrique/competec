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

// --- INTERFACE DE DADOS ---
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

  // CORREÇÃO 1: O slug continua aqui (não remova!)
  services: Array<{
    id: number;
    title: string;
    slug: string; 
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
    linkedin: string; // <--- CORREÇÃO 2: ADICIONADO AQUI!
    copyright_text: string;
  } | null;
}

export default function HomePage() {
  const [data, setData] = useState<HomeData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/home-data/`, {
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

  // Se não houver dados, não renderiza nada
  if (!data) return null;

  return (
    <main className="min-h-screen bg-white pb-0">
      <Navbar />
      
      {data.hero && <Hero data={data.hero} />}
      
      <div className="bg-[#E5E5E5]">
        {data.about && <About data={data.about} />}
        {data.differentiators && <Differentiators data={data.differentiators} />}
      </div>

      {data.services && data.services_section && (
        <Services 
          cardData={data.services} 
          sectionData={data.services_section} 
        />
      )}

      {data.history && <History data={data.history} />}

      {data.testimonials && data.testimonials_section && (
        <Testimonials 
            items={data.testimonials} 
            section={data.testimonials_section} 
        />
      )}

      {data.partners && <Partners data={data.partners} />}

      {data.blog_section && data.blog_posts && (
        <BlogPreview posts={data.blog_posts} section={data.blog_section} />
      )}

      {data.footer && <Footer data={data.footer} />}
    </main>
  );
}