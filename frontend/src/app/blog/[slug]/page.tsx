"use client";

import { useEffect, useState } from "react";
import type { ComponentProps } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Calendar, User } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { getApiUrl, getImageUrl } from "@/lib/utils";

type FooterData = ComponentProps<typeof Footer>["data"];

interface BlogPost {
  title: string;
  image: string;
  date?: string;
  author: string;
  content: string;
}

interface BlogPostResponse {
  post: BlogPost;
  footer: FooterData;
}

export default function BlogPostPage() {
  const params = useParams();
  const slug = params.slug;
  const [data, setData] = useState<BlogPostResponse | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      if (!slug) return;
      try {
        const res = await fetch(`${getApiUrl()}/api/blog-post/${slug}/?t=${Date.now()}`, {
            cache: 'no-store'
        });
        if (!res.ok) throw new Error("Post não encontrado");
        const json = await res.json();
        setData(json);
      } catch (error) {
        console.error("Erro:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [slug]);

  if (loading) return null;
  if (!data) return null;

  const { post, footer } = data;

  return (
    <main className="min-h-screen bg-white">
      <Navbar />

      {/* HEADER DO POST */}
      <div className="relative h-[400px] w-full mt-20">
        <Image
            src={getImageUrl(post.image)} // Usando a função corrigida
            alt={post.title}
            fill
            className="object-cover brightness-50"
            unoptimized
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
            <span className="bg-[#E65100] text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-4">Blog Competec</span>
            <h1 className="text-3xl md:text-5xl font-bold text-white max-w-4xl leading-tight">{post.title}</h1>
            <div className="flex items-center gap-6 mt-6 text-gray-200 text-sm font-medium">
                <div className="flex items-center gap-2"><Calendar size={16}/> {post.date ? new Date(post.date).toLocaleDateString('pt-BR') : ""}</div>
                <div className="flex items-center gap-2"><User size={16}/> {post.author}</div>
            </div>
        </div>
      </div>

      <div className="mx-auto max-w-[900px] px-6 py-16">
        <Link href="/blog" className="inline-flex items-center text-sm font-bold text-gray-500 hover:text-[#E65100] mb-8 transition-colors">
            <ArrowLeft className="mr-2 h-4 w-4" /> Voltar para o Blog
        </Link>

        {/* CONTEÚDO DO POST */}
        <div className="prose prose-lg prose-gray max-w-none text-gray-600 text-justify">
            <div className="whitespace-pre-line leading-loose">
                {post.content}
            </div>
        </div>
      </div>

      <Footer data={footer} />
    </main>
  );
}
