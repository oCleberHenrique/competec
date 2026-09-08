import type { Metadata } from "next";
import { IBM_Plex_Sans } from "next/font/google";
import "./globals.css";
import { CookieBanner } from "@/components/CookieBanner";
import { FloatingWhatsApp } from "@/components/FloatingWhatsApp";
import { getApiUrl } from "@/lib/utils";

const ibmPlexSans = IBM_Plex_Sans({
  variable: "--font-ibm-plex",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const DEFAULT_SEO_TITLE = "Competec - Soluções Industriais";
const DEFAULT_SEO_DESCRIPTION = "Especialistas em Automação, Metrologia e Manutenção Industrial.";

export async function generateMetadata(): Promise<Metadata> {
  try {
    const res = await fetch(`${getApiUrl()}/api/navbar-data/`, { cache: "no-store" });
    if (!res.ok) throw new Error("Falha ao buscar SEO");
    const data = await res.json();
    return {
      title: data.seo_title || DEFAULT_SEO_TITLE,
      description: data.seo_description || DEFAULT_SEO_DESCRIPTION,
      icons: { icon: "/favicon.ico" },
    };
  } catch {
    return {
      title: DEFAULT_SEO_TITLE,
      description: DEFAULT_SEO_DESCRIPTION,
      icons: { icon: "/favicon.ico" },
    };
  }
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className="scroll-smooth">
      <body className={`${ibmPlexSans.variable} antialiased`}>
        {/* Conteúdo Principal */}
        {children}

        {/* Componentes Flutuantes (Globais) */}
        <FloatingWhatsApp />
        <CookieBanner />
      </body>
    </html>
  );
}