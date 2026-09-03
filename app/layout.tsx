import type { Metadata } from "next";
import localFont from "next/font/local";
import { MotionConfig } from "framer-motion";
import "./globals.css";
import { StoreProvider } from "@/lib/store";

/*
  Fonts are self-hosted (app/fonts/*) so the build is fully offline.
  Headings: Bodoni Moda (clean high-contrast didone serif — plainer
  capital letterforms than the previous Playfair Display, per the
  "bold, simple, commercial" direction).
  Body/UI: Poppins (fashion-commerce geometric sans).
*/

const bodoni = localFont({
  src: [
    {
      path: "./fonts/bodoni-moda-latin.woff2",
      weight: "400 900",
      style: "normal",
    },
    {
      path: "./fonts/bodoni-moda-italic-latin.woff2",
      weight: "400 900",
      style: "italic",
    },
  ],
  variable: "--font-bodoni",
  display: "swap",
});

const poppins = localFont({
  src: [
    { path: "./fonts/poppins-latin-400.woff2", weight: "400", style: "normal" },
    { path: "./fonts/poppins-latin-500.woff2", weight: "500", style: "normal" },
    { path: "./fonts/poppins-latin-600.woff2", weight: "600", style: "normal" },
    { path: "./fonts/poppins-latin-700.woff2", weight: "700", style: "normal" },
  ],
  variable: "--font-poppins",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Saroj Ensemble — Luxury Ethnic & Contemporary Wear",
  description:
    "Bold luxury for the modern Indian woman. Handloom sarees, kurta sets, lehengas and accessories — heritage craft, contemporary mind.",
  icons: {
    icon: "/images/saroj-favicon-256.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${bodoni.variable} ${poppins.variable}`}>
      <body className="flex min-h-screen flex-col bg-paper text-ink antialiased">
        <MotionConfig reducedMotion="user">
          <StoreProvider>{children}</StoreProvider>
        </MotionConfig>
      </body>
    </html>
  );
}
