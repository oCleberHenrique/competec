import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Se as imagens continuarem dando erro, descomente a linha abaixo (tira a proteção de otimização):
    unoptimized: true, 
    
    remotePatterns: [
      // 1. REGRA DE PRODUÇÃO (ESSENCIAL - Adicionada agora)
      {
        protocol: "https",
        hostname: "api.v4jasson.com.br",
        pathname: "/media/**",
      },
      
      // 2. Regras de Desenvolvimento (Mantidas)
      {
        protocol: "http",
        hostname: "localhost",
        port: "8000",
        pathname: "/media/**",
      },
      {
        protocol: "http",
        hostname: "127.0.0.1",
        port: "8000",
        pathname: "/media/**",
      },
    ],
  },
};

export default nextConfig;