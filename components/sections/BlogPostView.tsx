"use client";

import Image from "next/image";
import Link from "next/link";
import { BLOG_POSTS } from "@/lib/data/blogs";
import { IMAGES } from "@/lib/data/images";
import { useStore } from "@/lib/store";
import { Reveal } from "@/components/ui/Reveal";
import { IconArrowRight } from "@/components/ui/icons";

/*
  Blog post template — H1 title, H2/H3 section structure from post data,
  internal links to collection pages, related-links footer.
*/

export function BlogPostView({ slug }: { slug: string }) {
  const { t } = useStore();
  const post = BLOG_POSTS.find((p) => p.slug === slug);

  if (!post) return null;

  return (
    <main className="min-h-screen bg-white">
      <article>
        {/* ---------- header ---------- */}
        <div className="container-lux max-w-3xl pb-8 pt-10 md:pt-14">
          <Link
            href="/blogs"
            className="inline-flex items-center gap-2 text-[12px] font-semibold uppercase tracking-[0.16em] text-taupe transition-colors hover:text-ink"
          >
            <IconArrowRight className="h-3.5 w-3.5 rotate-180 rtl:rotate-0" />
            {t("blogs.back")}
          </Link>
          <Reveal>
            <p className="eyebrow mt-6 text-gold">
              {post.tag} · {t("blogs.minRead", { n: post.readTimeMin })}
            </p>
            <h1 className="serif mt-3 text-3xl font-black uppercase leading-[1.05] tracking-[-0.01em] text-ink md:text-5xl">
              {post.title}
            </h1>
          </Reveal>
        </div>

        <div className="container-lux max-w-3xl">
          <div className="relative aspect-[16/9] overflow-hidden bg-bone">
            <Image
              src={IMAGES[post.image]}
              alt={post.title}
              fill
              priority
              sizes="(max-width: 768px) 100vw, 768px"
              className="object-cover"
            />
          </div>

          {/* ---------- body ---------- */}
          <div className="py-10">
            {post.body.map((section, i) => (
              <Reveal key={i} delay={0.05}>
                <section className="mt-8 first:mt-0">
                  {section.heading && (
                    <h2 className="serif text-2xl font-bold text-ink md:text-3xl">
                      {section.heading}
                    </h2>
                  )}
                  {section.paragraphs?.map((para, j) => (
                    <p
                      key={j}
                      className={`text-[15px] leading-relaxed text-taupe ${
                        section.heading ? "mt-4" : ""
                      }`}
                    >
                      {para}
                    </p>
                  ))}
                  {section.list && (
                    <ul className="mt-4 space-y-2">
                      {section.list.map((li, j) => (
                        <li
                          key={j}
                          className="flex items-start gap-3 text-[15px] leading-relaxed text-taupe"
                        >
                          <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gold" />
                          {li}
                        </li>
                      ))}
                    </ul>
                  )}
                  {section.subs?.map((sub) => (
                    <div key={sub.heading} className="mt-6">
                      <h3 className="serif text-xl font-bold text-ink">
                        {sub.heading}
                      </h3>
                      {sub.paragraphs.map((para, j) => (
                        <p key={j} className="mt-3 text-[15px] leading-relaxed text-taupe">
                          {para}
                        </p>
                      ))}
                    </div>
                  ))}
                </section>
              </Reveal>
            ))}
          </div>

          {/* ---------- related ---------- */}
          <aside className="border-y border-line py-8">
            <p className="eyebrow text-gold">{t("blogs.read")}</p>
            <div className="mt-4 flex flex-wrap gap-3">
              {post.related.map((r) => (
                <Link
                  key={r.href}
                  href={r.href}
                  className="group inline-flex items-center gap-2 border border-ink/20 px-4 py-2.5 text-[12px] font-semibold uppercase tracking-[0.12em] text-ink transition-colors duration-300 hover:border-forest hover:bg-forest hover:text-cream"
                >
                  {r.label}
                  <IconArrowRight className="h-3.5 w-3.5 rtl:rotate-180" />
                </Link>
              ))}
            </div>
          </aside>
        </div>
      </article>
    </main>
  );
}
