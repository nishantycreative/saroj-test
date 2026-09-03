"use client";

import type { ReactNode } from "react";
import { AnnouncementBar } from "@/components/layout/AnnouncementBar";
import { Header } from "@/components/layout/Header";
import { MobileMenu } from "@/components/layout/MobileMenu";
import { CartDrawer } from "@/components/layout/CartDrawer";
import { WishlistDrawer } from "@/components/layout/WishlistDrawer";
import { Footer } from "@/components/layout/Footer";
import { Toast } from "@/components/ui/Toast";

/*
  Shared chrome for subpages (collection, store, blog, about, contact):
  announcement + header + {children} + footer + drawers + toast.
  Promo popups are intentionally NOT here — newsletter is homepage-only,
  the cart exit popup mounts on the /cart route.
*/

export function SiteChrome({ children }: { children: ReactNode }) {
  return (
    <>
      <AnnouncementBar />
      <Header />
      {children}
      <Footer />
      <MobileMenu />
      <CartDrawer />
      <WishlistDrawer />
      <Toast />
    </>
  );
}
