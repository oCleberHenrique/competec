"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Loader2, ArrowLeft } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

// Interface atualizada com os campos opcionais (?)
interface ServiceData {
  id: number;
  title: string;
  internal_subtitle?: string;
  internal_text?: string;
  internal_image?: string | null; // Pode ser nulo
  cta_text?: string;
  cta_link?: string;
}

interface PageData {
  service: ServiceData;
  footer: any;
}

export default function ServiceInternalPage() {
  const params = useParams();
  const slug = params.slug; 

  const [data, setData] = useState<PageData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      if (!slug) return;
      try {
        // CORRIGIDO: Usa a variável de ambiente para buscar o serviço
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/service/${slug}/?t=${Date.now()}`, { 
            cache: 'no-store' 
        });
        if (!res.ok) throw new Error("Serviço não encontrado");
        const json = await res.json();
        setData(json);
      } catch (error) {
        console.error("Erro:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [slug]);

  if (loading) return <div className="flex h-screen items-center justify-center bg-white"><Loader2 className="h-10 w-10 animate-spin text-orange-600" /></div>;
  
  if (!data) return null;

  const { service, footer } = data;

  // LÓGICA SEGURA DE IMAGEM:
  // Só cria a URL se internal_image existir. Se não, fica null.
  // CORRIGIDO: Usa a variável de ambiente para montar a URL da imagem
  const imageUrl = service.internal_image 
    ? (service.internal_image.startsWith("http") ? service.internal_image : `${process.env.NEXT_PUBLIC_API_URL}${service.internal_image}`)
    : null;

  return (
    <main className="min-h-screen bg-white">
      <Navbar />

      <div className="mx-auto max-w-[1216px] px-6 py-32 lg:py-40">
        <Link href="/#services" className="inline-flex items-center text-sm font-bold text-gray-500 hover:text-[#E65100] mb-8 transition-colors">
            <ArrowLeft className="mr-2 h-4 w-4" /> Voltar para Soluções
        </Link>

        <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-2">
          {/* TEXTO */}
          <div>
            <span className="text-sm font-bold uppercase text-[#E65100] tracking-wider">Soluções Competec</span>
            <h1 className="mt-2 text-3xl font-bold leading-tight text-[#2C3E50] lg:text-4xl">{service.title}</h1>
            
            {service.internal_subtitle && (
                <div className="mt-6 border-l-4 border-[#E65100] pl-6 py-2 bg-gray-50 rounded-r-lg">
                    <p className="text-xl font-medium text-gray-800 italic">"{service.internal_subtitle}"</p>
                </div>
            )}

            <div className="mt-8 space-y-4 text-base leading-relaxed text-gray-600 whitespace-pre-line text-justify">
              {service.internal_text || "Descrição detalhada em breve."}
            </div>

            <div className="mt-10">
                <Link href={service.cta_link || "#"} target="_blank" className="inline-flex items-center justify-center rounded-lg bg-[#E65100] px-8 py-4 text-white font-bold transition-all hover:bg-[#bf4300] shadow-lg hover:shadow-xl hover:-translate-y-1">
                    {service.cta_text || "Solicitar Orçamento"}
                </Link>
            </div>
          </div>

          {/* IMAGEM (Só renderiza se imageUrl existir) */}
          <div className="relative h-[400px] w-full lg:h-[500px] sticky top-24">
            <div className="relative h-full w-full overflow-hidden rounded-2xl shadow-2xl bg-gray-100 flex items-center justify-center text-gray-400">
                {imageUrl ? (
                    <Image 
                        src={imageUrl} 
                        alt={service.title} 
                        fill 
                        className="object-cover" 
                        unoptimized 
                    />
                ) : (
                    // Placeholder caso não tenha imagem cadastrada
                    <div className="flex flex-col items-center gap-2">
                        <span className="text-4xl">📷</span>
                        <p>Sem imagem interna</p>
                    </div>
                )}
            </div>
          </div>
        </div>
      </div>
      <Footer data={footer} />
    </main>
  );
}