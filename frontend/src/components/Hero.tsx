import Image from "next/image";
import { Button } from "@/components/ui/button";

interface HeroProps {
  data: {
    title: string;
    subtitle: string;
    cta_text: string;
    cta_link: string;
    image: string;
  } | null;
}

export function Hero({ data }: HeroProps) {
  // console.log("DADOS RECEBIDOS NO HERO:", data);
  if (!data) return null;

  // CORRIGIDO: Usa a variável de ambiente em vez de localhost
  const imageUrl = data.image.startsWith("http") 
    ? data.image 
    : `${process.env.NEXT_PUBLIC_API_URL}${data.image}`;

  return (
    <section className="relative flex min-h-[700px] w-full items-center justify-center bg-white pt-[140px] pb-20">
      <div className="grid w-full max-w-[1216px] grid-cols-1 items-center gap-12 px-6 lg:grid-cols-2">
        
        {/* ESQUERDA: Texto */}
        <div className="flex flex-col gap-6 text-left z-10">
          <h1 className="text-[42px] lg:text-[56px] font-bold leading-tight text-[#E65100]">
            {data.title}
          </h1>
          <h4 className="text-[18px] lg:text-[20px] font-medium text-gray-600 max-w-[500px]">
            {data.subtitle}
          </h4>
          
          <div className="mt-4">
            <a href={data.cta_link}>
              {/* Botão usando a cor Primary definida no CSS */}
              <Button size="lg" className="bg-[#E65100] hover:bg-orange-700 text-white font-bold px-8 py-6 rounded-lg text-lg shadow-lg">
                {data.cta_text}
              </Button>
            </a>
          </div>
        </div>

        {/* DIREITA: Imagem */}
        {/* O group-hover e transition dão um charme extra se passar o mouse */}
        <div className="relative h-[400px] lg:h-[600px] w-full flex justify-end">
           <Image 
             src={imageUrl} 
             alt={data.title}
             fill
             className="object-contain lg:object-right rounded-2xl"
             priority
             unoptimized
           />
        </div>

      </div>
    </section>
  );
}