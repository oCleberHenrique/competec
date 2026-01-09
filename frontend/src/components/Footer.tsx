import Image from "next/image";
import Link from "next/link";
import { Phone, Mail, Facebook, Instagram, Youtube, Linkedin } from "lucide-react"; // <--- Importei Linkedin

// --- ÍCONE CUSTOMIZADO DO WHATSAPP (SVG) ---
// O Lucide não tem o logo oficial do WhatsApp, então usamos este SVG direto.
function WhatsAppIcon({ size = 18, className = "" }: { size?: number, className?: string }) {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
    >
      <path d="M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9L3 21" />
      <path d="M9 10a.5.5 0 0 0 1 0V9a.5.5 0 0 0 1 0v1a5 5 0 0 0 5 5h1a.5.5 0 0 0 0-1h-1a.5.5 0 0 0 0-1h1a.5.5 0 0 0 0 1h-1a.5.5 0 0 0 0 1h1v1a.5.5 0 0 0 1 0v-1a.5.5 0 0 0 1 0v1a.5.5 0 0 0 1 0v-9a.5.5 0 0 0-.5-.5h-8a.5.5 0 0 0-.5.5v2a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 0-1h-1a.5.5 0 0 0 0-1h1a.5.5 0 0 0 0 1h-1a.5.5 0 0 0 0 1h1v1a.5.5 0 0 0 1 0v-1a.5.5 0 0 0 1 0v1a.5.5 0 0 0 1 0v-2a.5.5 0 0 0-.5-.5h-4a.5.5 0 0 0-.5.5v4a.5.5 0 0 0 .5.5h2a.5.5 0 0 0 0-1h-2a.5.5 0 0 0 0-1h2a.5.5 0 0 0 0 1h-2a.5.5 0 0 0 0 1h2v1a.5.5 0 0 0 1 0v-1a.5.5 0 0 0 1 0v1a.5.5 0 0 0 1 0v-3a.5.5 0 0 0-.5-.5H9a.5.5 0 0 0-.5.5v1z" fill="none" stroke="none" /> 
      {/* Desenho simplificado do telefone do Whats */}
      <path d="M9 10a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v4a1 1 0 0 1-1 1h-4a1 1 0 0 1-1-1v-4Z" opacity="0" /> 
      <path d="M17.498 14.382c-.301-.15-1.767-.867-2.04-.966-.273-.101-.473-.15-.673.15-.197.295-.771.966-.944 1.164-.173.199-.347.223-.648.075-.3-.15-1.27-.468-2.421-1.494-.888-.792-1.488-1.77-1.66-2.07-.174-.3-.019-.465.13-.615.136-.135.301-.35.451-.523.151-.174.2-.298.3-.497.099-.198.05-.371-.025-.52-.075-.149-.672-1.62-0.922-2.22-.242-.581-.487-.5-.668-.51l-.573-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.767-.721 2.016-1.418.25-.697.25-1.294.174-1.418-.074-.125-.272-.2-.572-.35z" />
    </svg>
  );
}

interface FooterData {
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
  linkedin: string; 
  copyright_text: string;
}

interface FooterProps {
  data: FooterData;
}

export function Footer({ data }: FooterProps) {
  if (!data) return null;

  const logoUrl = data.logo.startsWith("http") ? data.logo : `http://localhost:8000${data.logo}`;

  return (
    <footer className="w-full bg-[#2C3E50] text-white">
      <div className="mx-auto max-w-[1216px] px-6 py-16 lg:py-20">
        <div className="flex flex-col gap-12 lg:flex-row lg:justify-between">
          
          {/* COLUNA 1: Logo */}
          <div className="flex max-w-xs flex-col gap-6">
            <div className="relative h-12 w-48">
              <Image 
                src={logoUrl} 
                alt="Competec" 
                fill 
                className="object-contain object-left"
                unoptimized
              />
            </div>
            <p className="text-sm leading-relaxed text-gray-300">
              {data.description}
            </p>
          </div>

          {/* COLUNA 2: Endereço */}
          <div className="flex max-w-xs flex-col gap-6">
            <h4 className="text-lg font-bold text-[#E65100]">
              {data.address_title}
            </h4>
            <div className="text-sm leading-relaxed text-gray-300 whitespace-pre-line">
              {data.address_text}
            </div>
          </div>

          {/* COLUNA 3: Contato */}
          <div className="flex max-w-xs flex-col gap-6">
            <h4 className="text-lg font-bold text-[#E65100]">
              {data.contact_title}
            </h4>
            <div className="flex flex-col gap-4 text-sm text-gray-300">
              
              {/* Telefone Fixo (Ícone de Telefone) */}
              {data.phone && (
                <div className="flex items-center gap-3">
                  <Phone size={18} className="text-[#E65100]" />
                  <span>{data.phone}</span>
                </div>
              )}

              {/* Whatsapp 1 (Ícone do WhatsApp) */}
              {data.whatsapp && (
                <div className="flex items-center gap-3">
                  <WhatsAppIcon size={18} className="text-[#E65100]" />
                  <span>{data.whatsapp}</span>
                </div>
              )}

               {/* Whatsapp 2 (Ícone do WhatsApp) */}
               {data.whatsapp_2 && (
                <div className="flex items-center gap-3">
                  <WhatsAppIcon size={18} className="text-[#E65100]" />
                  <span>{data.whatsapp_2}</span>
                </div>
              )}

              {/* Email */}
              {data.email && (
                <div className="flex items-center gap-3">
                  <Mail size={18} className="text-[#E65100]" />
                  <a href={`mailto:${data.email}`} className="hover:text-white transition-colors">
                    {data.email}
                  </a>
                </div>
              )}
            </div>
          </div>

          {/* COLUNA 4: Redes Sociais */}
          <div className="flex flex-col gap-6 lg:items-end">
            <div className="flex gap-4">
              
              {/* Só renderiza se tiver link cadastrado */}
              {data.facebook && (
                <Link 
                  href={data.facebook} 
                  target="_blank"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-[#E65100] text-[#E65100] transition-all hover:bg-[#E65100] hover:text-white"
                >
                  <Facebook size={20} />
                </Link>
              )}

              {data.instagram && (
                <Link 
                  href={data.instagram} 
                  target="_blank"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-[#E65100] text-[#E65100] transition-all hover:bg-[#E65100] hover:text-white"
                >
                  <Instagram size={20} />
                </Link>
              )}

              {data.linkedin && (
                <Link 
                  href={data.linkedin} 
                  target="_blank"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-[#E65100] text-[#E65100] transition-all hover:bg-[#E65100] hover:text-white"
                >
                  <Linkedin size={20} />
                </Link>
              )}

              {data.youtube && (
                <Link 
                  href={data.youtube} 
                  target="_blank"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-[#E65100] text-[#E65100] transition-all hover:bg-[#E65100] hover:text-white"
                >
                  <Youtube size={20} />
                </Link>
              )}

            </div>
          </div>

        </div>
      </div>

      <div className="w-full bg-[#E65100] py-4 text-center">
        <p className="text-sm font-medium text-white px-6">
          {data.copyright_text}
        </p>
      </div>

    </footer>
  );
}