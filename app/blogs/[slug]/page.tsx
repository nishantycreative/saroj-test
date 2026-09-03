import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SiteChrome } from "@/components/layout/SiteChrome";
import { BlogPostView } from "@/components/sections/BlogPostView";
import { BLOG_POSTS } from "@/lib/data/blogs";

export function generateStaticParams() {
  return BLOG_POSTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = BLOG_POSTS.find((p) => p.slug === slug);
  if (!post) return {};
  return {
    title: `${post.title} — Saroj Ensemble`,
    description: post.metaDescription,
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const exists = BLOG_POSTS.some((p) => p.slug === slug);
  if (!exists) notFound();

  return (
    <SiteChrome>
      <BlogPostView slug={slug} />
    </SiteChrome>
  );
}
