"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getApiUrl } from "@/lib/utils";

function WhatsAppLogoIcon({ size = 30 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="white"
      aria-hidden="true"
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
      <path d="M12.001 2C6.478 2 2 6.477 2 12c0 1.928.548 3.727 1.497 5.255L2 22l4.897-1.483A9.953 9.953 0 0 0 12.001 22C17.523 22 22 17.523 22 12S17.523 2 12.001 2zm0 18.222a8.185 8.185 0 0 1-4.19-1.148l-.3-.179-3.13.947.938-3.06-.196-.314A8.185 8.185 0 0 1 3.778 12c0-4.535 3.688-8.222 8.223-8.222S20.224 7.465 20.224 12 16.536 20.222 12.001 20.222z" />
    </svg>
  );
}

const DEFAULT_WHATSAPP_LINK = "https://wa.me/5562995530750";

export function FloatingWhatsApp() {
  const [whatsappLink, setWhatsappLink] = useState(DEFAULT_WHATSAPP_LINK);

  useEffect(() => {
    fetch(`${getApiUrl()}/api/navbar-data/`)
      .then((res) => res.json())
      .then((data) => {
        if (data.floating_whatsapp_link) {
          setWhatsappLink(data.floating_whatsapp_link);
        }
      })
      .catch((err) => console.error("Erro ao buscar link do WhatsApp:", err));
  }, []);

  return (
    <Link
      href={whatsappLink}
      target="_blank"
      className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-xl transition-transform hover:scale-110 hover:shadow-2xl animate-in fade-in zoom-in duration-300"
      aria-label="Falar no WhatsApp"
    >
      <WhatsAppLogoIcon size={30} />
      {/* Bolinha de notificação (opcional) */}
      <span className="absolute -top-1 -right-1 flex h-4 w-4">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
        <span className="relative inline-flex rounded-full h-4 w-4 bg-red-500"></span>
      </span>
    </Link>
  );
}
