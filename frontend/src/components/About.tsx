import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react"; 

interface AboutProps {
  data: {
    title: string;
    text: string;
    image: string;
  } | null;
}

export function About({ data }: AboutProps) {
  if (!data) return null;

  const imageUrl = data.image.startsWith("http") 
    ? data.image 
    : `http://localhost:8000${data.image}`;

  return (
    <section className="relative w-full bg-[#E5E5E5] py-20 lg:py-32">
      <div className="mx-auto w-full max-w-[1216px] px-6">
        
        <div className="relative flex flex-col items-center lg:block">
          
          {/* 1. A IMAGEM DE FUNDO (Engenheira) */}
          <div className="relative h-[300px] w-full overflow-hidden rounded-[32px] lg:h-[450px] lg:w-[85%]">
            <Image 
              src={imageUrl} 
              alt="Quem Somos Competec"
              fill
              className="object-cover object-top"
              unoptimized
            />
          </div>

          {/* 2. O CARD FLUTUANTE (Texto + Botão) */}
          <div className="relative mt-[-40px] w-[90%] rounded-[24px] bg-white p-8 shadow-xl lg:absolute lg:right-0 lg:top-1/2 lg:mt-0 lg:w-[450px] lg:-translate-y-1/2 lg:p-10">
            
            <h3 className="text-xl font-bold leading-tight text-[#2C3E50] lg:text-2xl">
              {data.title}
            </h3>
            
            {/* Detalhe laranja */}
            <div className="mt-6 h-[2px] w-12 bg-[#E65100]"></div> 

            <p className="mt-6 text-base leading-relaxed text-gray-600">
              {data.text}
            </p>

            {/* --- NOVO: Botão CTA --- */}
            <div className="mt-8 pt-4 border-t border-gray-100">
              <Link 
                href="/quem-somos" 
                className="group inline-flex items-center text-sm font-bold text-[#E65100] transition-colors hover:text-[#bf4300]"
              >
                Conheça nossa história completa
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}