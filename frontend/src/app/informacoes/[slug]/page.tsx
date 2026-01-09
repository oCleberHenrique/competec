"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Loader2, Phone, Mail, MapPin, ChevronRight, Menu, CheckCircle2 } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

// Interfaces
interface GalleryImage {
  id: number;
  image: string;
}

interface InfoPageData {
  title: string;
  banner: string;
  intro_text: string;      
  regions_content: string; 
  cta_title: string;
  cta_link: string;
  gallery: GalleryImage[];
}

interface SidebarLink {
  title: string;
  slug: string;
}

interface ApiResponse {
  page: InfoPageData;
  sidebar_links: SidebarLink[];
  footer: any;
}

export default function InformationPage() {
  const params = useParams();
  const slug = params.slug; 

  const [data, setData] = useState<ApiResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      if (!slug) return;
      try {
        const res = await fetch(`http://localhost:8000/api/information/${slug}/?t=${Date.now()}`, { cache: 'no-store' });
        
        if (!res.ok) {
            console.error("Erro 404 ou API Offline");
            setLoading(false);
            return;
        }
        const json = await res.json();
        setData(json);
      } catch (error) {
        console.error("Erro de conexão:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [slug]);

  if (loading) return <div className="flex h-screen items-center justify-center bg-white"><Loader2 className="h-10 w-10 animate-spin text-orange-600" /></div>;
  
  if (!data) return (
    <div className="flex h-screen flex-col items-center justify-center bg-gray-50 text-gray-500">
        <h1 className="text-4xl font-bold mb-4">404</h1>
        <p>Página não encontrada.</p>
        <Link href="/" className="mt-6 text-[#E65100] hover:underline">Voltar para Home</Link>
    </div>
  );

  const { page, sidebar_links, footer } = data;

  const getUrl = (path: string) => {
    if (!path) return null;
    return path.startsWith("http") ? path : `http://localhost:8000${path}`;
  };

  const bannerUrl = getUrl(page.banner);

  // --- LÓGICA DE SEPARAÇÃO (Melhorada) ---
  // Aceita vírgula (,) ou ponto e vírgula (;) ou quebra de linha (\n)
  const cityList = page.regions_content 
    ? page.regions_content.split(/[,;\n]+/).map(city => city.trim()).filter(city => city !== "") 
    : [];

  return (
    <main className="min-h-screen bg-gray-50">
      <Navbar />

      {/* BANNER */}
      <div className="relative h-[250px] lg:h-[350px] w-full mt-[80px]">
         <div className="absolute inset-0 bg-gray-900">
            {bannerUrl && (
                <Image src={bannerUrl} alt={page.title} fill className="object-cover opacity-50" unoptimized />
            )}
         </div>
         <div className="absolute inset-0 flex flex-col justify-center items-center px-4 text-center">
            <h1 className="text-3xl lg:text-5xl font-bold text-white uppercase tracking-wider drop-shadow-md">
                {page.title}
            </h1>
            <div className="h-1 w-20 bg-[#E65100] mt-4 rounded-full"></div>
         </div>
      </div>

      <div className="mx-auto max-w-[1280px] px-6 py-16">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
          
          {/* COLUNA ESQUERDA */}
          <div className="lg:col-span-2 space-y-10">
            
            {/* Galeria */}
            {page.gallery && page.gallery.length > 0 && (
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {page.gallery.map((item) => (
                        <div 
                            key={item.id} 
                            className="relative h-24 w-full cursor-pointer overflow-hidden rounded-lg border-2 border-transparent hover:border-[#E65100] transition-all group"
                            onClick={() => setSelectedImage(getUrl(item.image))}
                        >
                            <Image src={getUrl(item.image)!} alt="Galeria" fill className="object-cover transition-transform duration-500 group-hover:scale-110" unoptimized />
                        </div>
                    ))}
                </div>
            )}

            {/* Texto Rico (HTML) */}
            <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
                <div 
                    className="prose prose-lg max-w-none text-gray-600 leading-relaxed"
                    dangerouslySetInnerHTML={{ __html: page.intro_text }} 
                />
            </div>

            {/* --- LISTA DE CIDADES (TOGGLES) --- */}
            {/* Se a lista existir, renderiza o bloco */}
            {cityList.length > 0 ? (
                <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
                    <h3 className="text-xl font-bold text-[#2C3E50] mb-6 border-b pb-4 flex items-center gap-2">
                        <MapPin className="text-[#E65100]" />
                        Regiões de Atendimento
                    </h3>
                    
                    {/* CONTAINER FLEX WRAP: Isso garante que virem botões um ao lado do outro */}
                    <div className="flex flex-wrap gap-3">
                        {cityList.map((city, index) => (
                            <div 
                                key={index} 
                                className="flex items-center gap-2 bg-white border-2 border-gray-100 pl-3 pr-4 py-2 rounded-full text-sm font-bold text-gray-600 hover:border-[#E65100] hover:text-[#E65100] hover:shadow-md transition-all cursor-default select-none shadow-sm"
                            >
                                <CheckCircle2 size={18} className="text-[#E65100]" />
                                {city}
                            </div>
                        ))}
                    </div>
                </div>
            ) : (
               // Debug: Se não aparecer nada, mostra isso (só pra teste)
               page.regions_content && (
                   <div className="p-4 bg-yellow-100 text-yellow-800 rounded">
                       O campo regiões tem texto, mas não consegui separar. Texto recebido: {page.regions_content}
                   </div>
               )
            )}
          </div>

          {/* SIDEBAR */}
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                <h3 className="text-lg font-bold text-[#2C3E50] mb-4 pb-2 border-b flex items-center gap-2">
                    <Menu size={20} className="text-[#E65100]"/> Informações
                </h3>
                <ul className="space-y-2">
                    {sidebar_links && sidebar_links.map((link) => (
                        <li key={link.slug}>
                            <Link 
                                href={`/informacoes/${link.slug}`} 
                                className={`flex items-center text-sm font-medium p-3 rounded-lg transition-all ${
                                    slug === link.slug 
                                    ? 'bg-orange-50 text-[#E65100] border border-orange-100' 
                                    : 'text-gray-600 hover:bg-gray-50 hover:text-[#E65100]'
                                }`}
                            >
                                <ChevronRight size={16} className={`mr-2 ${slug === link.slug ? 'text-[#E65100]' : 'text-gray-300'}`} />
                                {link.title}
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>

            <div className="bg-gradient-to-br from-[#E65100] to-[#bf4300] p-8 rounded-xl text-white shadow-lg text-center">
                <h3 className="text-xl font-bold mb-3">{page.cta_title}</h3>
                <Link href={page.cta_link || "#"} className="block w-full bg-white text-[#E65100] font-bold py-3 rounded-lg hover:shadow-lg hover:-translate-y-1 transition-all">
                    Entrar em Contato
                </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      {selectedImage && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 p-4 backdrop-blur-sm" onClick={() => setSelectedImage(null)}>
            <div className="relative max-w-5xl w-full h-auto max-h-[90vh]">
                <Image src={selectedImage} alt="Zoom" width={1200} height={800} className="object-contain w-full h-full rounded-md shadow-2xl" unoptimized />
                <button className="absolute -top-10 right-0 text-white font-bold">FECHAR X</button>
            </div>
        </div>
      )}

      <Footer data={footer} />
    </main>
  );
}