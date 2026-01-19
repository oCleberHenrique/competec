import Image from "next/image";
import { Calendar } from "lucide-react";
import Link from "next/link";
import { getImageUrl } from "@/lib/utils"; // <--- 1. IMPORTAÇÃO ADICIONADA

interface BlogPost {
  id: number;
  title: string;
  slug: string;
  image: string;
  date: string;
}

interface BlogSection {
  tag: string;
  title: string;
  subtitle: string;
  cta_text: string;
  cta_link: string;
}

interface BlogPreviewProps {
  posts: BlogPost[];
  section: BlogSection;
}

export function BlogPreview({ posts, section }: BlogPreviewProps) {
  if (!posts || posts.length === 0) return null;

  return (
    <section id="blog" className="w-full bg-white py-20 lg:py-32">
      <div className="mx-auto max-w-[1216px] px-6">
        
        {/* CABEÇALHO */}
        <div className="mb-16 flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <div className="max-w-xl">
            <span className="text-sm font-bold uppercase text-[#E65100] tracking-wider">
              {section.tag}
            </span>
            <h2 className="mt-2 text-3xl font-bold leading-tight text-[#2C3E50] lg:text-4xl">
              {section.title}
            </h2>
          </div>

          <div className="flex flex-col items-start gap-6 lg:items-end lg:text-right">
            <p className="max-w-md text-lg text-gray-600 font-medium">
              {section.subtitle}
            </p>
            <Link 
              href={section.cta_link}
              className="inline-flex items-center justify-center rounded-lg bg-[#E65100] px-8 py-4 text-sm font-bold text-white transition-colors hover:bg-[#cf4900]"
            >
              {section.cta_text}
            </Link>
          </div>
        </div>

        {/* GRID DE POSTS */}
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {posts.map((post) => {
            // (Removemos a lógica manual antiga daqui)

            return (
              <Link key={post.id} href={`/blog/${post.slug}`} className="group block">
                <article className="flex flex-col gap-4">
                  
                  <div className="relative w-full overflow-hidden rounded-2xl bg-gray-100">
                    <div className="aspect-[280/370] w-full relative"> 
                      <Image
                        src={getImageUrl(post.image)} // <--- 2. USO DA FUNÇÃO AQUI
                        alt={post.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        unoptimized
                      />
                    </div>
                  </div>

                  <div>
                    <h3 className="text-xl font-bold leading-snug text-[#2C3E50] group-hover:text-[#E65100] transition-colors line-clamp-2">
                      {post.title}
                    </h3>
                    
                    <div className="mt-3 flex items-center gap-2 text-sm text-[#E65100] font-medium">
                      <Calendar size={16} />
                      <time>
                        {new Date(post.date).toLocaleDateString('pt-BR')}
                      </time>
                    </div>
                  </div>

                </article>
              </Link>
            );
          })}
        </div>

      </div>
    </section>
  );
}