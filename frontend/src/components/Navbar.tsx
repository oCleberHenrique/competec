"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ChevronDown, Menu, X } from "lucide-react";
import { getApiUrl, getImageUrl } from "@/lib/utils";

interface NavService {
  title: string;
  slug: string;
}

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [latestInfoSlug, setLatestInfoSlug] = useState<string | null>(null);
  const [logo, setLogo] = useState<string | null>(null);
  const [services, setServices] = useState<NavService[]>([]);

  useEffect(() => {
    fetch(`${getApiUrl()}/api/navbar-data/`)
      .then((res) => res.json())
      .then((data) => {
        if (data.latest_info_slug) {
          setLatestInfoSlug(data.latest_info_slug);
        }
        if (data.logo) {
          setLogo(data.logo);
        }
        if (Array.isArray(data.services)) {
          setServices(data.services);
        }
      })
      .catch((err) => console.error("Erro ao buscar dados do menu:", err));
  }, []);

  const menuItems = [
    { label: "HOME", href: "/" },
    { label: "QUEM SOMOS", href: "/quem-somos" },
    { label: "BLOG", href: "/#blog" },
  ];

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
          <Link href="/" className="relative flex h-full items-center group">
            <div className="relative h-12 w-40 transition-opacity group-hover:opacity-90">
              {logo ? (
                <Image
                  src={getImageUrl(logo)}
                  alt="Logo Competec"
                  fill
                  className="object-contain object-left"
                  priority
                  unoptimized
                />
              ) : (
                <span className="flex h-full items-center text-xl font-bold text-white">
                  COMPETEC
                </span>
              )}
            </div>
          </Link>

          <div className="hidden items-center gap-8 md:flex">
            {menuItems.slice(0, 2).map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="text-sm font-bold text-gray-200 transition-colors hover:text-[#E65100]"
              >
                {item.label}
              </Link>
            ))}

            <div className="group relative">
              <Link
                href="/#services"
                className="inline-flex items-center gap-1 text-sm font-bold text-gray-200 transition-colors hover:text-[#E65100]"
              >
                SOLUÇÕES
                <ChevronDown size={16} className="transition-transform group-hover:rotate-180" />
              </Link>

              {services.length > 0 && (
                <div className="invisible absolute left-1/2 top-full z-50 mt-4 w-72 -translate-x-1/2 rounded-xl border border-white/10 bg-[#2C3E50] p-3 opacity-0 shadow-2xl transition-all group-hover:visible group-hover:opacity-100">
                  <div className="absolute -top-4 left-0 h-4 w-full" />
                  {services.map((service) => (
                    <Link
                      key={service.slug}
                      href={`/solucoes/${service.slug}`}
                      className="block rounded-lg px-4 py-3 text-sm font-bold text-gray-100 transition-colors hover:bg-white/10 hover:text-[#E65100]"
                    >
                      {service.title}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {menuItems.slice(2).map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="text-sm font-bold text-gray-200 transition-colors hover:text-[#E65100]"
              >
                {item.label}
              </Link>
            ))}

            <Link href="/#contact">
              <Button className="border-2 border-white bg-transparent text-white font-bold rounded-lg transition-all hover:bg-white hover:text-[#E65100] hover:border-white">
                CONTATO
              </Button>
            </Link>
          </div>

          <button
            type="button"
            aria-label={isOpen ? "Fechar menu" : "Abrir menu"}
            className="md:hidden text-white cursor-pointer hover:text-[#E65100] transition-colors"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </nav>
      </div>

      {isOpen && (
        <div className="fixed top-[110px] left-4 right-4 z-40 rounded-xl bg-white p-6 shadow-2xl md:hidden animate-in slide-in-from-top-5 border border-gray-200">
          <div className="flex flex-col gap-4">
            {menuItems.slice(0, 2).map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="border-b border-gray-100 pb-2 text-sm font-bold text-gray-700 hover:text-[#E65100]"
                onClick={() => setIsOpen(false)}
              >
                {item.label}
              </Link>
            ))}

            <div className="border-b border-gray-100 pb-2">
              <Link
                href="/#services"
                className="block text-sm font-bold text-gray-700 hover:text-[#E65100]"
                onClick={() => setIsOpen(false)}
              >
                SOLUÇÕES
              </Link>
              {services.length > 0 && (
                <div className="mt-3 flex flex-col gap-2 pl-4">
                  {services.map((service) => (
                    <Link
                      key={service.slug}
                      href={`/solucoes/${service.slug}`}
                      className="text-sm font-medium text-gray-500 hover:text-[#E65100]"
                      onClick={() => setIsOpen(false)}
                    >
                      {service.title}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {menuItems.slice(2).map((item) => (
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
