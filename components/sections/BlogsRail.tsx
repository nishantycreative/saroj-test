"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { BLOG_POSTS } from "@/lib/data/blogs";
import { IMAGES } from "@/lib/data/images";
import { useStore } from "@/lib/store";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { ScrollFloat, useStaggerVariants } from "@/components/ui/Reveal";
import { IconArrowRight } from "@/components/ui/icons";

/*
  Section 18 — "Blogs" rail: 3 blog-post cards linking into /blogs/{slug}.
*/

export function BlogsRail() {
  const { t } = useStore();
  const { container, item } = useStaggerVariants(0.12, 24);

  return (
    <section id="blogs" className="bg-white">
      <div className="container-lux py-10 md:py-16">
        <SectionHeader
          eyebrow={t("blogs.eyebrow")}
          title={t("blogs.title")}
          accent={t("blogs.accent")}
          tone="burgundy"
          action={
            <Link
              href="/blogs"
              className="inline-flex items-center gap-2 text-[12px] font-medium uppercase tracking-[0.16em] text-taupe transition-colors hover:text-ink"
            >
              {t("blogs.all")}
              <IconArrowRight className="h-3.5 w-3.5 rtl:rotate-180" />
            </Link>
          }
        />

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-6% 0px" }}
          className="mt-6 grid gap-6 md:mt-8 md:grid-cols-3 md:gap-8"
        >
          {BLOG_POSTS.map((post) => (
            <motion.div
              key={post.slug}
              variants={item}
              whileHover={{ y: -7 }}
            >
              <Link
                href={`/blogs/${post.slug}`}
                className="group overflow-hidden rounded-md border border-line bg-white shadow-lux-sm transition-shadow duration-500 hover:shadow-lux"
              >
                <ScrollFloat
                  distance={12}
                  scale={0.015}
                  className="relative aspect-[16/10] overflow-hidden bg-ivory-deep"
                >
                  {/* TODO_CLIENT_IMAGE: blog imagery */}
                  <Image
                    src={IMAGES[post.image]}
                    alt={post.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-[1.05]"
                  />
                </ScrollFloat>
                <div className="p-5">
                  <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-gold">
                    {post.tag} · {t("blogs.minRead", { n: post.readTimeMin })}
                  </p>
                  <h3 className="serif mt-2 text-[1.35rem] font-bold leading-snug text-ink transition-colors duration-300 group-hover:text-gold">
                    {post.title}
                  </h3>
                  <p className="mt-2.5 line-clamp-2 text-[14px] leading-relaxed text-taupe">
                    {post.excerpt}
                  </p>
                  <span className="mt-4 inline-flex items-center gap-2 text-[12px] font-medium uppercase tracking-[0.16em] text-taupe transition-colors duration-300 group-hover:text-ink">
                    {t("blogs.read")}
                    <IconArrowRight className="h-3.5 w-3.5 transition-transform duration-500 group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1" />
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
