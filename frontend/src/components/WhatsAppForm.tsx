"use client";

import type { FormEvent, ReactNode } from "react";

const FIELD_LABELS: Record<string, string> = {
  nome: "Nome",
  email: "E-mail",
  telefone: "Telefone/WhatsApp",
  cidade: "Cidade",
  cargo: "Cargo",
  empresa: "Empresa",
  mensagem: "Mensagem",
  necessidade: "Necessidade",
};

interface WhatsAppFormProps {
  ctaLink?: string;
  className?: string;
  children: ReactNode;
}

export function WhatsAppForm({ ctaLink, className, children }: WhatsAppFormProps) {
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const baseLink = ctaLink || "https://wa.me/5562995530750";
    const formData = new FormData(event.currentTarget);

    const message = Array.from(formData.entries())
      .filter(([, value]) => typeof value === "string" && value.trim() !== "")
      .map(([name, value]) => `*${FIELD_LABELS[name] || name}:* ${value}`)
      .join("\n");

    let whatsappUrl = baseLink;
    if (message) {
      try {
        const url = new URL(baseLink);
        url.searchParams.set("text", message);
        whatsappUrl = url.toString();
      } catch {
        whatsappUrl = `${baseLink}${baseLink.includes("?") ? "&" : "?"}text=${encodeURIComponent(message)}`;
      }
    }

    window.open(whatsappUrl, "_blank");
  };

  return (
    <form onSubmit={handleSubmit} className={className}>
      {children}
    </form>
  );
}
