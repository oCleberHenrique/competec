import Image from "next/image";

interface HistoryData {
  tag: string;
  title: string;
  text: string;
  footer_text: string;
  image: string;
}

interface HistoryProps {
  data: HistoryData;
}

export function History({ data }: HistoryProps) {
  if (!data) return null;

  // CORRIGIDO: Usa a variável de ambiente em vez de localhost
  const imageUrl = data.image.startsWith("http") 
    ? data.image 
    : `${process.env.NEXT_PUBLIC_API_URL}${data.image}`;

  // --- FUNÇÃO PARA FORMATAR O TÍTULO ---
  // Procura a palavra "Competec", quebra a linha antes e pinta de laranja
  const formatTitle = (text: string) => {
    // Se não tiver a palavra Competec, retorna o texto normal
    if (!text.toLowerCase().includes("competec")) {
      return text;
    }

    // Separa o texto em antes e depois da palavra "Competec"
    // O regex /Competec/i ignora maiúsculas/minúsculas
    const parts = text.split(/(Competec.*)/i);

    // parts[0] = "Quem é a "
    // parts[1] = "Competec?" (o resto da frase)
    
    if (parts.length < 2) return text;

    return (
      <>
        {parts[0]}
        <br /> {/* A quebra de linha forçada */}
        <span className="text-[#E65100]">
          {parts[1]} {/* O nome Competec + pontuação */}
        </span>
      </>
    );
  };

  return (
    <section className="w-full bg-[#2C3E50] py-20 lg:py-32 text-white">
      <div className="mx-auto max-w-[1216px] px-6">
        
        <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-2">
          
          {/* LADO ESQUERDO: Texto */}
          <div className="flex flex-col gap-8">
            <div>
              {/* Tag Laranja */}
              <span className="text-sm font-bold uppercase text-[#E65100] tracking-wider">
                {data.tag}
              </span>
              
              {/* Título com a formatação especial aplicada */}
              <h2 className="mt-3 text-4xl font-bold leading-tight lg:text-5xl">
                {formatTitle(data.title)}
              </h2>
            </div>

            {/* Texto Principal */}
            <div className="space-y-6 text-lg leading-relaxed text-gray-300 whitespace-pre-line">
              {data.text}
            </div>
          </div>

          {/* LADO DIREITO: Imagem */}
          <div className="relative h-[400px] w-full lg:h-[500px]">
            {/* Design Arredondado Orgânico */}
            <div className="relative h-full w-full overflow-hidden rounded-[32px] border border-gray-600/30 shadow-2xl">
              <Image 
                src={imageUrl} 
                alt="Quem é a Competec"
                fill
                className="object-cover"
                unoptimized
              />
            </div>
          </div>

        </div>

        {/* RODAPÉ DA SEÇÃO */}
        {data.footer_text && (
            <div className="mt-24 text-center">
                <p className="text-xl font-semibold text-[#E65100] lg:text-2xl">
                    {data.footer_text}
                </p>
            </div>
        )}

      </div>
    </section>
  );
}