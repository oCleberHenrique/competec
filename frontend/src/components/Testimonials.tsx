"use client";

import useEmblaCarousel from "embla-carousel-react";
import { Quote, Star } from "lucide-react";
import Image from "next/image";
import { useState, useEffect, useCallback } from "react";
import type { EmblaCarouselType } from "embla-carousel";
import { getImageUrl } from "@/lib/utils"; // <--- 1. IMPORTAÇÃO

// --- INTERFACES ---
interface TestimonialItem {
  id: number;
  name: string;
  role: string;
  text: string;
  image: string | null;
  rating: number;
}

interface SectionData {
  title: string;
  subtitle: string;
  image: string;
}

interface TestimonialsProps {
  items: TestimonialItem[];
  section: SectionData;
}

export function Testimonials({ items, section }: TestimonialsProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ align: "start", loop: true });
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

  const onInit = useCallback((emblaApi: EmblaCarouselType) => {
    setScrollSnaps(emblaApi.scrollSnapList());
  }, []);

  const onSelect = useCallback((emblaApi: EmblaCarouselType) => {
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, []);

  useEffect(() => {
    if (!emblaApi) return;

    setTimeout(() => {
        onInit(emblaApi);
        onSelect(emblaApi);
    }, 0);
    
    emblaApi.on("reInit", onInit);
    emblaApi.on("reInit", onSelect);
    emblaApi.on("select", onSelect);
  }, [emblaApi, onInit, onSelect]);

  const scrollTo = useCallback(
    (index: number) => emblaApi && emblaApi.scrollTo(index),
    [emblaApi]
  );

  return (
    <section className="w-full bg-[#E5E5E5] py-20 lg:py-32 overflow-hidden">
      <div className="mx-auto max-w-[1216px] px-6">
        
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-8">
          
          {/* --- LADO ESQUERDO: IMAGEM DO RAPAZ --- */}
          <div className="relative">
            <div className="relative mx-auto h-[400px] w-full max-w-[489px] overflow-hidden rounded-[20px] lg:h-[571px]">
              <Image 
                src={getImageUrl(section.image)} // <--- CORRIGIDO: section.image
                alt="Depoimentos Competec"
                fill
                className="object-cover"
                unoptimized
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
            </div>
          </div>

          {/* --- LADO DIREITO: CONTEÚDO + CARROSSEL --- */}
          <div className="flex flex-col justify-center">
            
            <div className="mb-12 lg:pl-10">
              <h2 className="text-3xl font-bold leading-tight text-[#2C3E50] lg:text-4xl whitespace-pre-line">
                {section.title}
              </h2>
              <p className="mt-4 text-lg text-gray-600">
                {section.subtitle}
              </p>
              <p className="mt-2 font-semibold text-gray-800">
                Veja os depoimentos de quem confiou na Competec:
              </p>
            </div>

            {/* --- AJUSTE 1: Aumentei a largura do container --- */}
            <div className="relative z-10 w-full lg:-ml-36 lg:w-[150%]"> 
              
              <div className="overflow-hidden" ref={emblaRef}>
                <div className="flex gap-6 pb-10 pl-4">
                  {items.map((item) => {
                    return (
                      <div 
                        key={item.id} 
                        // --- AJUSTE 2: Diminuí a largura fixa ---
                        className="flex-[0_0_90%] min-w-0 sm:flex-[0_0_380px]"
                      >
                        <div className="flex h-full flex-col justify-between rounded-[20px] border border-[#C0C5C8] bg-white p-8 shadow-sm transition-shadow hover:shadow-md h-[275px]">
                          
                          <div>
                            <Quote className="mb-4 h-10 w-10 text-[#E65100] fill-[#E65100]" />
                            <p className="text-sm leading-relaxed text-gray-600 line-clamp-4">
                              &quot;{item.text}&quot;
                            </p>
                          </div>

                          <div>
                            <div className="my-4 h-[1px] w-full bg-[#EDEDED]"></div>
                            <div className="flex items-center gap-4">
                              <div className="relative flex h-12 w-12 flex-shrink-0 items-center justify-center overflow-hidden rounded-full bg-[#E65100]/10">
                                {item.image ? (
                                  <Image
                                    src={getImageUrl(item.image)}
                                    alt={item.name}
                                    fill
                                    className="object-cover"
                                    unoptimized
                                  />
                                ) : (
                                  <span className="text-sm font-bold text-[#E65100]">
                                    {item.name.charAt(0).toUpperCase()}
                                  </span>
                                )}
                              </div>

                              <div>
                                <h4 className="font-bold text-[#2C3E50] text-sm">{item.name}</h4>
                                <div className="flex gap-1">
                                  {Array.from({ length: 5 }).map((_, i) => (
                                    <Star 
                                      key={i} 
                                      size={14} 
                                      className={`${i < item.rating ? "fill-[#E65100] text-[#E65100]" : "text-gray-300"}`} 
                                    />
                                  ))}
                                </div>
                              </div>
                            </div>
                          </div>

                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* BOLINHAS */}
              <div className="mt-4 flex justify-center gap-3 lg:justify-start lg:pl-44">
                {scrollSnaps.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => scrollTo(index)}
                    className={`h-3 w-3 rounded-full transition-all ${
                      index === selectedIndex ? "bg-[#E65100] w-6" : "bg-gray-300"
                    }`}
                  />
                ))}
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}