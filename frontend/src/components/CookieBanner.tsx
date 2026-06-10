"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { X } from "lucide-react";

export function CookieBanner() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    // Verifica se já aceitou antes
    const timer = window.setTimeout(() => {
      const accepted = localStorage.getItem("competec_cookies_accepted");
      setShow(!accepted);
    }, 0);

    return () => window.clearTimeout(timer);
  }, []);

  const acceptCookies = () => {
    localStorage.setItem("competec_cookies_accepted", "true");
    setShow(false);
  };

  if (!show) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[60] bg-gray-900/95 text-white p-4 shadow-2xl backdrop-blur-sm border-t border-gray-800">
      <div className="mx-auto max-w-7xl flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="text-sm text-gray-300 text-center md:text-left">
          <p>
            Utilizamos cookies para melhorar sua experiência. Ao continuar navegando, você concorda com nossa{" "}
            <Link href="#" className="text-[#E65100] hover:underline font-bold">
              Política de Privacidade
            </Link>.
          </p>
        </div>
        <div className="flex items-center gap-3">
            <button 
                onClick={() => setShow(false)} 
                aria-label="Fechar aviso de cookies"
                className="text-gray-400 hover:text-white"
            >
                <X size={20} />
            </button>
            <button 
                onClick={acceptCookies}
                className="bg-[#E65100] hover:bg-[#bf4300] text-white px-6 py-2 rounded-lg text-sm font-bold transition-colors"
            >
                Aceitar e Continuar
            </button>
        </div>
      </div>
    </div>
  );
}
