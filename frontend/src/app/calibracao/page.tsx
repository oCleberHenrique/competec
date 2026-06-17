import ServiceInternalPage from "@/app/solucoes/[slug]/page";

export default async function CalibracaoPage() {
  return ServiceInternalPage({ params: Promise.resolve({ slug: "calibracao" }) });
}
