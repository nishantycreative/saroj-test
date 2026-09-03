import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      /* Instagram Graph API media CDN (live feed images) */
      { protocol: "https", hostname: "scontent.cdninstagram.com" },
      { protocol: "https", hostname: "*.cdninstagram.com" },
    ],
  },
  async redirects() {
    return [
      /* Journal was renamed to Blogs */
      {
        source: "/journal",
        destination: "/blogs",
        permanent: true,
      },
      /* About Us was renamed to Our Story */
      {
        source: "/about",
        destination: "/our-story",
        permanent: true,
      },
      {
        source: "/about-us",
        destination: "/our-story",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
