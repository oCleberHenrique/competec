"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react"; 

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [latestInfoSlug, setLatestInfoSlug] = useState<string | null>(null);

  // --- 1. BUSCA O SLUG DO BANCO DE DADOS ---
  useEffect(() => {
    // CORRIGIDO: Usa a variável de ambiente para buscar os dados do menu
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/navbar-data/`)
      .then((res) => res.json())
      .then((data) => {
        if (data.latest_info_slug) {
          setLatestInfoSlug(data.latest_info_slug);
        }
      })
      .catch((err) => console.error("Erro ao buscar link do menu:", err));
  }, []);

  // --- 2. LISTA DE ITENS (Agora Dinâmica) ---
  const menuItems = [
    { label: "HOME", href: "/" },
    { label: "QUEM SOMOS", href: "/quem-somos" },
    { label: "SOLUÇÕES", href: "/#services" },
    { label: "BLOG", href: "/#blog" },
  ];

  // Adiciona "INFORMAÇÕES" apenas se existir uma página cadastrada
  if (latestInfoSlug) {
    menuItems.push({ label: "INFORMAÇÕES", href: `/informacoes/${latestInfoSlug}` });
  }

  return (
    <>
      <div className="fixed top-6 left-0 right-0 z-50 flex justify-center px-4">
        <nav 
          className="flex h-[80px] w-full max-w-[1216px] items-center justify-between rounded-2xl px-8 shadow-2xl backdrop-blur-sm transition-all"
          style={{ backgroundColor: "#2C3E50" }}
        >
          {/* 1. LOGO */}
          {/* Obs: Certifique-se de que o arquivo 'logo-cliente.svg' existe na pasta 'public' do frontend */}
          <Link href="/" className="relative flex items-center h-full group">
              <div className="relative h-12 w-40 transition-opacity group-hover:opacity-90">
                  <Image 
                      src="/logo-cliente.svg" 
                      alt="Logo Competec"
                      fill
                      className="object-contain object-left"
                      priority
                  />
              </div>
          </Link>

          {/* 2. MENU DESKTOP */}
          <div className="hidden items-center gap-8 md:flex">
            {menuItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="text-sm font-bold text-gray-200 transition-colors hover:text-[#E65100]" 
              >
                {item.label}
              </Link>
            ))}
            
            {/* Botão Contato */}
            <Link href="/#contact">
              <Button className="border-2 border-white bg-transparent text-white font-bold rounded-lg transition-all hover:bg-white hover:text-[#E65100] hover:border-white">
                CONTATO
              </Button>
            </Link>
          </div>

          {/* 3. BOTÃO MOBILE (Hamburger) */}
          <div 
            className="md:hidden text-white cursor-pointer hover:text-[#E65100] transition-colors"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </div>
        </nav>
      </div>

      {/* 4. MENU MOBILE DROPDOWN (Aparece ao clicar no hamburger) */}
      {isOpen && (
        <div className="fixed top-[110px] left-4 right-4 z-40 rounded-xl bg-white p-6 shadow-2xl md:hidden animate-in slide-in-from-top-5 border border-gray-200">
          <div className="flex flex-col gap-4">
            {menuItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="border-b border-gray-100 pb-2 text-sm font-bold text-gray-700 hover:text-[#E65100]"
                onClick={() => setIsOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <Link href="/#contact" onClick={() => setIsOpen(false)}>
                <Button className="w-full bg-[#E65100] hover:bg-[#bf4300] text-white font-bold mt-2">
                    FALE CONOSCO
                </Button>
            </Link>
          </div>
        </div>
      )}
    </>
  );
}