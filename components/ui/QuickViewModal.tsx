"use client";

import { Modal } from "@/components/ui/Modal";
import { ProductPane } from "@/components/sections/ProductPane";
import type { Product } from "@/lib/shopify";

/*
  Quick view — click-triggered, full-window product dialog.

  Renders the exact same product layout used on the real PDP
  (ProductPane), so the dialog and the product page can never drift
  apart. The dialog stays open after "Add to bag" (button flips to
  "Added ✓"); "Buy Now" adds and goes straight to the cart page.

  Size: near-full-screen on mobile, ~5xl (1024px) centered on desktop,
  internal scroll when the content is taller than the viewport.
  Closes via the ×, clicking the dark overlay, or Escape (Modal).
*/

interface QuickViewModalProps {
  product: Product;
  open: boolean;
  onClose: () => void;
}

export function QuickViewModal({ product, open, onClose }: QuickViewModalProps) {
  return (
    <Modal
      open={open}
      onClose={onClose}
      titleId="quick-view-title"
      panelClass="max-w-5xl h-[94dvh] overflow-y-auto md:h-auto md:max-h-[92dvh]"
    >
      <div className="bg-white p-4 sm:p-6 md:p-10">
        <ProductPane product={product} titleId="quick-view-title" showViewDetails />
      </div>
    </Modal>
  );
}