"use client";

import { MessageCircle } from "lucide-react";
import Link from "next/link";

export function FloatingWhatsApp() {
  const whatsappNumber = "5562999999999";

  return (
    <Link
      href={`https://wa.me/${whatsappNumber}?text=Olá, visitei o site da Competec e gostaria de mais informações.`}
      target="_blank"
      className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-xl transition-transform hover:scale-110 hover:shadow-2xl animate-in fade-in zoom-in duration-300"
      aria-label="Falar no WhatsApp"
    >
      <MessageCircle size={32} fill="white" className="text-white" />
      {/* Bolinha de notificação (opcional) */}
      <span className="absolute -top-1 -right-1 flex h-4 w-4">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
        <span className="relative inline-flex rounded-full h-4 w-4 bg-red-500"></span>
      </span>
    </Link>
  );
}