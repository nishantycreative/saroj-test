"use client";

import { motion } from "framer-motion";

import Image from "next/image";
import Link from "next/link";
import { BLOG_POSTS } from "@/lib/data/blogs";
import { IMAGES } from "@/lib/data/images";
import { useStore } from "@/lib/store";
import { Reveal, useStaggerVariants } from "@/components/ui/Reveal";
import { IconArrowRight } from "@/components/ui/icons";

export function BlogsView() {
  const { t } = useStore();
  const { container, item } = useStaggerVariants(0.1, 24);

  return (
    <main className="min-h-screen bg-white">
      <div className="container-lux py-10 md:py-16">
        <Reveal>
          <p className="eyebrow text-gold">{t("blogs.eyebrow")}</p>
          <h1 className="serif mt-3 text-4xl font-black uppercase tracking-[-0.01em] text-ink md:text-5xl">
            {t("blogs.title")}
          </h1>
        </Reveal>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-6% 0px" }}
          className="mt-8 grid gap-6 md:grid-cols-3"
        >
          {BLOG_POSTS.map((post) => (
            <motion.div key={post.slug} variants={item}>
              <Link
                href={`/blogs/${post.slug}`}
                className="group flex h-full flex-col overflow-hidden border border-line bg-white shadow-lux-sm transition-shadow duration-500 hover:shadow-lux"
              >
                <div className="relative aspect-[16/10] overflow-hidden bg-bone">
                  <Image
                    src={IMAGES[post.image]}
                    alt={post.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-[1.05]"
                  />
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-gold">
                    {post.tag} · {t("blogs.minRead", { n: post.readTimeMin })}
                  </p>
                  <h2 className="serif mt-2 text-xl font-bold leading-snug text-ink transition-colors duration-300 group-hover:text-gold">
                    {post.title}
                  </h2>
                  <p className="mt-2.5 line-clamp-3 text-[14px] leading-relaxed text-taupe">
                    {post.excerpt}
                  </p>
                  <span className="mt-auto inline-flex items-center gap-2 pt-4 text-[12px] font-medium uppercase tracking-[0.16em] text-taupe transition-colors duration-300 group-hover:text-ink">
                    {t("blogs.read")}
                    <IconArrowRight className="h-3.5 w-3.5 rtl:rotate-180" />
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </main>
  );
}
