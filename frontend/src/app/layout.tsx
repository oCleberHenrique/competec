import type { Metadata } from "next";
import { IBM_Plex_Sans } from "next/font/google";
import "./globals.css";
import { CookieBanner } from "@/components/CookieBanner";
import { FloatingWhatsApp } from "@/components/FloatingWhatsApp";

const ibmPlexSans = IBM_Plex_Sans({
  variable: "--font-ibm-plex",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Competec - Soluções Industriais",
  description: "Especialistas em Automação, Metrologia e Manutenção Industrial.",
  icons: {
    icon: "/favicon.ico",
  },
};

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