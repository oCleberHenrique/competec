"use client";

import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Image from "next/image";
import { useCallback } from "react";

interface PartnerItem {
  id: number;
  name: string;
  logo: string;
}

interface PartnersProps {
  data: PartnerItem[];
}

export function Partners({ data }: PartnersProps) {
  // 1. Hooks primeiro (para evitar erro)
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: "start" }, [
    Autoplay({ delay: 3000, stopOnInteraction: false }),
  ]);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  // 2. Verificação de dados depois
  if (!data || data.length === 0) return null;

  return (
    <section className="w-full bg-white py-20 lg:py-32">
      <div className="mx-auto max-w-[1216px] px-6">
        
        {/* CABEÇALHO */}
        <div className="mb-12">
          <span className="text-sm font-bold uppercase text-[#E65100]">
            Cases
          </span>
          <h2 className="mt-2 text-3xl font-bold leading-tight text-[#2C3E50] lg:text-4xl">
            Transformando desafios<br />
            em cases de sucesso.
          </h2>
        </div>

        {/* ÁREA DO CARROSSEL + BOTÕES */}
        <div className="relative flex items-center gap-4">
          
          {/* BOTÃO ESQUERDA */}
          <button
            onClick={scrollPrev}
            className="hidden lg:flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full border border-[#E65100] text-[#E65100] transition-colors hover:bg-[#E65100] hover:text-white"
          >
            <ArrowLeft size={20} />
          </button>

          {/* O CARROSSEL EM SI */}
          <div className="overflow-hidden w-full" ref={emblaRef}>
            <div className="flex items-center"> {/* Adicionei items-center para alinhar verticalmente */}
              {data.map((item) => {
                 // CORRIGIDO: Usa a variável de ambiente para montar a URL do logo
                 const imageUrl = item.logo.startsWith("http") 
                 ? item.logo 
                 : `${process.env.NEXT_PUBLIC_API_URL}${item.logo}`;

                return (
                  <div
                    key={item.id}
                    className="flex min-w-0 flex-[0_0_50%] items-center justify-center px-4 md:flex-[0_0_33.33%] lg:flex-[0_0_20%]"
                  >
                    {/* --- AQUI ESTÁ O AJUSTE DE TAMANHO --- */}
                    {/* Mobile: h-28 (112px) | Desktop: h-40 (160px) w-40 (160px) */}
                    <div className="relative h-28 w-32 lg:h-40 lg:w-40 grayscale transition-all duration-300 hover:grayscale-0">
                      <Image
                        src={imageUrl}
                        alt={item.name}
                        fill
                        className="object-contain" // Garante que o logo caiba inteiro no quadrado de 160px
                        unoptimized
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* BOTÃO DIREITA */}
          <button
            onClick={scrollNext}
            className="hidden lg:flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full border border-[#E65100] text-[#E65100] transition-colors hover:bg-[#E65100] hover:text-white"
          >
            <ArrowRight size={20} />
          </button>

        </div>

        {/* NAVEGAÇÃO MOBILE */}
        <div className="mt-8 flex justify-center gap-4 lg:hidden">
            <button
            onClick={scrollPrev}
            className="flex h-12 w-12 items-center justify-center rounded-full border border-[#E65100] text-[#E65100]"
          >
            <ArrowLeft size={20} />
          </button>
          <button
            onClick={scrollNext}
            className="flex h-12 w-12 items-center justify-center rounded-full border border-[#E65100] text-[#E65100]"
          >
            <ArrowRight size={20} />
          </button>
        </div>

      </div>
    </section>
  );
}