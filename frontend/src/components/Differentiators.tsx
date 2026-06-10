import { ArrowUpRight } from "lucide-react";

// --- COMPONENTES SVG REFEITOS (TAB NA DIREITA) ---

// Path desenhado manualmente para garantir a curva suave na direita
// M 0 60 -> Começa na esquerda (altura do corpo, mais baixo)
// C ... -> Faz a curva suave subindo para a direita
// L ... -> Desenha a aba no topo direito

const folderPath = "M0 48C0 34.7452 10.7452 24 24 24H200C225 24 245 0 280 0H376C389.255 0 400 10.7452 400 24V296C400 309.255 389.255 320 376 320H24C10.7452 320 0 309.255 0 296V48Z";

// SVG do Folder Branco
const WhiteFolderSVG = () => (
  <svg viewBox="0 0 400 320" fill="none" xmlns="http://www.w3.org/2000/svg" className="absolute inset-0 h-full w-full drop-shadow-xl" preserveAspectRatio="none">
    <path d={folderPath} fill="white"/>
  </svg>
);

// SVG do Folder Laranja
const OrangeFolderSVG = () => (
  <svg viewBox="0 0 400 320" fill="none" xmlns="http://www.w3.org/2000/svg" className="absolute inset-0 h-full w-full drop-shadow-xl" preserveAspectRatio="none">
     <path d={folderPath} fill="#E65100"/>
  </svg>
);

// --- INTERFACES ---
interface DifferentiatorItem {
  id: number;
  title: string;
  description: string;
  is_highlighted: boolean;
}

interface DifferentiatorsProps {
  data: DifferentiatorItem[];
}

// --- COMPONENTE PRINCIPAL ---
export function Differentiators({ data }: DifferentiatorsProps) {
  if (!data || data.length === 0) return null;

  return (
    <section className="w-full bg-[#E5E5E5] pb-20 lg:pb-32">
      <div className="mx-auto max-w-[1216px] px-6">
        
        {/* DIVIDER LARANJA */}
        <div className="mb-16 h-[2px] w-full bg-[#E65100]"></div>

        {/* HEADER DA SEÇÃO */}
        <div className="mb-16 grid grid-cols-1 gap-8 lg:grid-cols-2 lg:items-end">
          <div>
            <span className="text-sm font-bold uppercase text-[#E65100]">
              Nossa cultura
            </span>
            <h2 className="mt-2 text-4xl font-bold leading-tight text-[#2C3E50] lg:text-5xl">
              Três pilares.<br />
              Sua operação mais eficiente.
            </h2>
          </div>
          <div className="pb-2 text-lg text-gray-600 lg:max-w-md">
            A Competec é o seu parceiro para aumentar a eficiência, previsibilidade e maturidade das operações industriais
          </div>
        </div>

        {/* GRID DE CARDS */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3 mt-16"> 
          {data.map((item) => (
            <div
              key={item.id}
              className="group relative flex min-h-[320px] flex-col justify-between transition-transform hover:-translate-y-2"
            >
              {/* --- FUNDO SVG --- */}
              <div className="absolute inset-0 z-0">
                {item.is_highlighted ? <OrangeFolderSVG /> : <WhiteFolderSVG />}
              </div>

              {/* --- CONTEÚDO DO CARD --- */}
              {/* Ajustei o padding-top (pt-12) para o texto não bater na curva da aba */}
              <div className={`relative z-10 h-full p-8 pt-12 flex flex-col justify-between ${item.is_highlighted ? 'text-white' : 'text-[#2C3E50]'}`}>
                
                {/* Ícone de Seta (Agora alinhado dentro da aba direita) */}
                <div className="absolute top-6 right-6">
                    <ArrowUpRight 
                    className={`h-8 w-8 ${item.is_highlighted ? 'text-white' : 'text-[#E65100]'}`} 
                    />
                </div>

                {/* Texto */}
                <div className="mt-auto">
                    <h3 className="mb-4 text-2xl font-bold leading-tight">
                    {item.title}
                    </h3>
                    <p className={`text-base leading-relaxed ${item.is_highlighted ? 'text-orange-50' : 'text-gray-600'}`}>
                    {item.description}
                    </p>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
