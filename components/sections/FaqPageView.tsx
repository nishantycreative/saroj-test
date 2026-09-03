"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { InfoHero } from "@/components/ui/InfoBlocks";
import { EASE_LUX, Reveal } from "@/components/ui/Reveal";
import { IconChevron } from "@/components/ui/icons";

/*
  Dedicated /faq page — full question bank organised into six
  categories, one-at-a-time accordion. Mirrors the premium editorial
  language of the rest of the site on a light canvas.
*/

interface QAPair {
  q: string;
  a: string;
}

const CATEGORIES: { title: string; items: QAPair[] }[] = [
  {
    title: "Shopping & Orders",
    items: [
      {
        q: "What does Saroj Ensemble sell?",
        a: "Saroj Ensemble offers a curated collection of premium fabrics selected for their quality, texture, colour, craftsmanship and versatility. Our collection is designed for customers who appreciate beautiful textiles and want to create garments and ensembles with character.",
      },
      {
        q: "How do I choose the right fabric?",
        a: "Every fabric has its own texture, weight, drape and character. We recommend looking at the product photographs, reading the fabric description and checking the details provided on each product page. If you are unsure which fabric would work best for your requirement, our team can help you make a more informed choice based on the type of garment, occasion, preferred fall, colour and overall look you have in mind.",
      },
      {
        q: "Are the colours shown on the website accurate?",
        a: "We make every effort to photograph our fabrics as accurately as possible. However, colours can appear slightly different depending on lighting conditions, photography, your monitor, phone display and screen settings. For this reason, a minor variation between the colour displayed online and the physical fabric should be expected.",
      },
      {
        q: "Can I order fabric for a specific garment?",
        a: "Yes. Our fabrics can be selected for a wide variety of garments and styling requirements. If you have a particular garment in mind, such as a saree, kurta, blouse, suit, dress, jacket or other custom creation, our team can help you select a suitable fabric.",
      },
      {
        q: "Can I purchase fabric in different quantities?",
        a: "Product availability and quantity options vary by fabric. The available quantity options will be displayed on the relevant product page. For larger requirements, please contact our team before placing your order so that we can help confirm availability.",
      },
      {
        q: "Are all fabrics available all the time?",
        a: "No. Some of our fabrics are produced or sourced in limited quantities, and availability can change. Certain colours, textures or collections may therefore sell out. If a fabric you are looking for is unavailable, you can contact our team to enquire about future availability or suitable alternatives.",
      },
    ],
  },
  {
    title: "Orders & Payments",
    items: [
      {
        q: "How do I place an order?",
        a: "Simply browse our collection, select the fabric you would like to purchase, choose the available quantity or required option, and add it to your cart. Once you have reviewed your order, proceed to checkout and complete the payment and delivery details. You will receive an order confirmation after your order has been successfully placed.",
      },
      {
        q: "Can I modify my order after placing it?",
        a: "Please contact us as soon as possible if you need to make a change to your order. Because we aim to dispatch orders within 24 hours, there may be a limited window in which an order can be modified or cancelled. Once an order has been dispatched, changes may no longer be possible.",
      },
      {
        q: "Can I cancel my order?",
        a: "If your order has not yet been dispatched, please contact our team immediately and we will check whether cancellation is possible. Once an order has been dispatched, it may no longer be possible to cancel it.",
      },
      {
        q: "How will I know that my order has been dispatched?",
        a: "Once your order has been dispatched, you will receive shipping information and tracking details where available. You can use the tracking information to follow the progress of your delivery.",
      },
    ],
  },
  {
    title: "Shipping & Delivery",
    items: [
      {
        q: "How quickly do you dispatch orders?",
        a: "We dispatch orders within 24 hours. Fast dispatch is one of our commitments to our customers. Orders are prepared and handed over for shipping as quickly as possible after successful order confirmation, subject to product availability and verification.",
      },
      {
        q: "How long does delivery take?",
        a: "Our standard delivery timeline is up to 7 days for domestic orders, depending on the destination and courier service. International delivery timelines can vary depending on the destination country, customs procedures and local delivery networks.",
      },
      {
        q: "Do you offer international delivery?",
        a: "Yes. Saroj Ensemble offers international delivery to 200+ countries worldwide. International delivery times and charges vary by destination. Any applicable customs duties, taxes or import charges may be payable by the recipient depending on the destination country's regulations.",
      },
      {
        q: "How can I track my order?",
        a: "Once your order has been dispatched, tracking information will be shared with you where available. Use the tracking link or tracking number provided to monitor your shipment.",
      },
      {
        q: "What if my order is delayed?",
        a: "While we work with reliable shipping partners to deliver orders within the expected timeline, delays can occasionally occur because of weather, courier disruptions, customs, incorrect address information or other circumstances outside our direct control. If your order appears to be significantly delayed, please contact our customer support team with your order number.",
      },
    ],
  },
  {
    title: "Returns & Exchanges",
    items: [
      {
        q: "What is your return policy?",
        a: "We offer a 14-day return window for eligible products. If you receive a product that qualifies for a return, please contact us within 14 days of receiving your order and follow the return instructions provided by our team.",
      },
      {
        q: "Can I return fabric after cutting it?",
        a: "For hygiene, quality-control and resale reasons, cut, altered, washed, used or otherwise modified fabric may not be eligible for return. Please inspect your fabric carefully before cutting, stitching, washing or altering it.",
      },
      {
        q: "What condition must a returned product be in?",
        a: "Returned fabric should be unused, unwashed, unaltered and in its original condition and packaging, wherever applicable. Products showing signs of use, damage, alteration, washing, cutting or improper handling may not be accepted.",
      },
      {
        q: "What if I receive damaged or incorrect fabric?",
        a: "Please contact us as soon as possible after receiving your order. Share your order number along with clear photographs or videos showing the issue and the packaging. Our team will review the issue and guide you through the next steps.",
      },
      {
        q: "How long does a refund take?",
        a: "Once a return has been received and inspected, we will process the eligible refund according to the applicable payment method and our return policy. The time taken for the refunded amount to appear in your account may vary depending on your payment provider or bank.",
      },
    ],
  },
  {
    title: "Fabric Care",
    items: [
      {
        q: "How should I care for my fabric?",
        a: "Care instructions vary depending on the fibre, weave, finish and construction of the fabric. Always refer to the specific care instructions provided with your purchase where available. When in doubt, professional dry cleaning is generally the safer choice for delicate, embellished or premium fabrics.",
      },
      {
        q: "Can I wash my fabric at home?",
        a: "Not every fabric should be machine washed or hand washed. Washing can affect colour, texture, shrinkage and drape. Before washing or treating a fabric, check its recommended care instructions. For delicate or premium fabrics, we recommend consulting a professional cleaner.",
      },
      {
        q: "Should I iron my fabric?",
        a: "Use an appropriate temperature for the specific fabric. Delicate fabrics may require low heat or protective pressing techniques. When unsure, test on an inconspicuous area or consult a professional.",
      },
    ],
  },
  {
    title: "International Orders",
    items: [
      {
        q: "Do you ship internationally?",
        a: "Yes. We ship to 200+ countries worldwide.",
      },
      {
        q: "Are customs duties included in the order price?",
        a: "Customs duties, import taxes and other destination-specific charges may apply to international orders depending on local regulations. These charges, where applicable, may be the responsibility of the recipient.",
      },
      {
        q: "What happens if customs holds my package?",
        a: "International shipments may be subject to customs inspection or clearance procedures. Such processes can occasionally affect delivery timelines. If your shipment is held by customs, the recipient may need to provide information or complete procedures required by the destination country's authorities.",
      },
    ],
  },
];

function FaqItem({
  item,
  open,
  onToggle,
  reduceMotion,
}: {
  item: QAPair;
  open: boolean;
  onToggle: () => void;
  reduceMotion: boolean | null;
}) {
  return (
    <div className="border-b border-line">
      <button
        onClick={onToggle}
        aria-expanded={open}
        className="flex w-full items-center justify-between gap-6 py-6 text-start"
      >
        <span
          className={`serif text-lg font-bold transition-colors duration-300 md:text-[1.3rem] ${
            open ? "text-forest" : "text-ink"
          }`}
        >
          {item.q}
        </span>
        <span
          className={`flex h-9 w-9 shrink-0 items-center justify-center border transition-all duration-500 ${
            open
              ? "rotate-180 border-gold text-gold"
              : "border-line-strong text-taupe"
          }`}
        >
          <IconChevron className="h-3.5 w-3.5" />
        </span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{
              duration: reduceMotion ? 0.15 : 0.45,
              ease: EASE_LUX,
            }}
            className="overflow-hidden"
          >
            <p className="max-w-2xl pb-7 text-[15px] leading-relaxed text-taupe">
              {item.a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function FaqPageView() {
  const reduceMotion = useReducedMotion();
  const [openId, setOpenId] = useState<string>("dispatch");

  return (
    <main className="bg-white">
      <InfoHero
        eyebrow="Help & Support"
        title="Frequently Asked Questions"
        subtitle="Everything you need to know about shopping with Saroj Ensemble, from choosing the right fabric to delivery, returns and caring for your purchase."
      />

      <div className="container-lux max-w-3xl py-12 md:py-16">
        {CATEGORIES.map((cat, ci) => (
          <section key={cat.title} className="mb-12">
            <Reveal>
              <h2 className="eyebrow text-gold">{cat.title}</h2>
            </Reveal>
            <div className="mt-2 border-t border-line">
              {cat.items.map((item, ii) => {
                const id = `${ci}-${ii}`;
                const open = openId === id;
                return (
                  <FaqItem
                    key={id}
                    item={item}
                    open={open}
                    reduceMotion={reduceMotion}
                    onToggle={() => {
                      if (open) {
                        setOpenId("");
                      } else {
                        setOpenId(id);
                      }
                    }}
                  />
                );
              })}
            </div>
          </section>
        ))}
      </div>

      <div className="border-t border-line bg-paper">
        <div className="container-lux max-w-3xl py-12 md:py-16">
          <Reveal>
            <h2 className="serif text-[clamp(1.6rem,4vw,2.5rem)] font-black uppercase text-ink">
              Need More Help?
            </h2>
            <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-taupe">
              If your question isn&apos;t answered here, our team is happy to
              assist. Please contact us with your order number or details about
              the fabric you are interested in, and we&apos;ll help you find the
              right information.
            </p>
            <a
              href="/contact"
              className="mt-6 inline-flex h-12 items-center gap-2 bg-forest px-7 text-[12px] font-semibold uppercase tracking-[0.14em] text-cream transition-colors hover:bg-forest-deep"
            >
              Contact our team
            </a>
          </Reveal>
        </div>
      </div>
    </main>
  );
}
