import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { getImageUrl } from "@/lib/utils"; // <--- 1. IMPORTAÇÃO ADICIONADA

// Interface para os CARDS (Lista)
interface ServiceItem {
  id: number;
  title: string;
  slug: string; 
  description: string;
  icon: string | null;
  order: number;
}

// Interface para a CAPA DA SEÇÃO
interface SectionData {
   heading: string;
   title: string;
   image: string;
}

interface ServicesProps {
  cardData: ServiceItem[];
  sectionData: SectionData;
}

export function Services({ cardData, sectionData }: ServicesProps) {
  // (Removemos a lógica manual antiga daqui)

  return (
    // 1. ADICIONADO id="services" PARA O MENU FUNCIONAR
    <section id="services" className="w-full bg-white py-20 lg:py-32">
      <div className="mx-auto grid max-w-[1216px] grid-cols-1 gap-12 px-6 lg:grid-cols-2 lg:items-start">
        
        {/* --- COLUNA DA ESQUERDA --- */}
        <div className="flex flex-col gap-10">
          
          {/* Cabeçalho */}
          <div>
            <span className="text-sm font-bold uppercase text-[#E65100]">
              {sectionData.heading}
            </span>
            <h2 
              className="mt-2 text-4xl font-bold leading-tight text-[#2C3E50] lg:text-5xl"
              style={{whiteSpace: 'pre-line'}} 
            >
              {sectionData.title}
            </h2>
          </div>

          {/* Lista de Cards */}
          <div className="flex flex-col gap-6">
            {cardData.map((item) => (
              // 2. ENVOLVIDO COM LINK (Sem quebrar o layout)
              <Link key={item.id} href={`/solucoes/${item.slug}`} className="block">
                  <div 
                    className="group relative rounded-2xl border border-gray-200 bg-white p-8 transition-all hover:border-[#E65100] hover:shadow-lg"
                  >
                    <div className="flex items-start justify-between">
                      <h3 className="text-xl font-bold text-[#2C3E50] mb-4 pr-12">
                        {item.title}
                      </h3>
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-orange-50 text-[#E65100] transition-colors group-hover:bg-[#E65100] group-hover:text-white">
                        <ArrowUpRight size={20} />
                      </div>
                    </div>
                    <p className="text-base leading-relaxed text-gray-600">
                      {item.description}
                    </p>
                  </div>
              </Link>
            ))}
          </div>

        </div>

        {/* --- COLUNA DA DIREITA (Imagem Grande) --- */}
        <div className="relative h-[400px] w-full overflow-hidden rounded-[32px] lg:h-full lg:min-h-[600px]">
          <Image 
            src={getImageUrl(sectionData.image)} // <--- 2. USO DA FUNÇÃO AQUI
            alt={sectionData.title}
            fill
            className="object-cover"
            unoptimized 
          />
        </div>

      </div>
    </section>
  );
}