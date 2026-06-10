"use client";

import { useEffect, useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import type { ComponentProps } from "react";
import Image from "next/image";
import Link from "next/link";
import { getApiUrl, getImageUrl } from "@/lib/utils";
import { ArrowUpRight } from "lucide-react";

type FooterData = ComponentProps<typeof Footer>["data"];

interface BlogPost {
  id: number;
  title: string;
  slug: string;
  image?: string;
  cover_image?: string;
  category?: string;
  date?: string;
  content?: string;
}

interface BlogData {
  blog_posts?: BlogPost[];
  footer: FooterData;
}

export default function BlogListingPage() {
  const [data, setData] = useState<BlogData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch(`${getApiUrl()}/api/home-data/`, {
          cache: "no-store",
        });
        if (!res.ok) throw new Error("Falha ao buscar dados");
        const json = await res.json();
        setData(json);
      } catch (error) {
        console.error("Erro ao carregar blog:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  if (loading) return null;
  if (!data) return null;

  const posts = data.blog_posts || [];

  return (
    <main className="min-h-screen bg-white">
      <Navbar />

      <section className="bg-[#2C3E50] py-20 pt-32 text-white">
        <div className="mx-auto max-w-[1216px] px-6 text-center">
          <span className="text-sm font-bold uppercase text-[#E65100] tracking-wider">
            BLOG COMPETEC
          </span>
          <h1 className="mt-4 text-4xl font-bold lg:text-5xl">
            Conteúdo Técnico
          </h1>
          <p className="mt-4 text-gray-300 max-w-2xl mx-auto">
            Acompanhe nossas novidades, artigos técnicos e atualizações sobre o mundo industrial.
          </p>
        </div>
      </section>

      <section className="py-20 lg:py-32">
        <div className="mx-auto max-w-[1216px] px-6">
          {posts.length === 0 ? (
            <p className="text-center text-gray-500">Nenhuma postagem encontrada no momento.</p>
          ) : (
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              {posts.map((post) => (
                <Link key={post.id} href={`/blog/${post.slug}`} className="group block h-full">
                  <article className="flex h-full flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition-all hover:-translate-y-1 hover:border-[#E65100]/30 hover:shadow-xl">
                    <div className="relative h-60 w-full overflow-hidden bg-gray-100">
                      <Image
                        src={getImageUrl(post.cover_image || post.image)}
                        alt={post.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        unoptimized
                      />
                    </div>

                    <div className="flex flex-1 flex-col p-6">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold uppercase text-[#E65100]">
                          {post.category || "Artigo"}
                        </span>
                        <span className="text-xs text-gray-400">
                          {post.date ? new Date(post.date).toLocaleDateString("pt-BR") : ""}
                        </span>
                      </div>

                      <h3 className="mt-4 text-xl font-bold leading-tight text-[#2C3E50] group-hover:text-[#E65100]">
                        {post.title}
                      </h3>

                      <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-gray-600">
                        {post.content}
                      </p>

                      <div className="mt-auto pt-6">
                        <div className="flex items-center gap-2 text-sm font-bold text-[#E65100]">
                          Ler artigo completo
                          <ArrowUpRight size={16} />
                        </div>
                      </div>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer data={data.footer} />
    </main>
  );
}
