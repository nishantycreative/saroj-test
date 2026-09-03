"use client";

import {
  InfoHero,
  InfoSection,
  UspCard,
  PrimeBanner,
} from "@/components/ui/InfoBlocks";
import { Reveal } from "@/components/ui/Reveal";
import { IconClock, IconTruck, IconGlobe, IconCheck } from "@/components/ui/icons";

/*
  /shipping-policy — full shipping & delivery help page. The 24-hour
  dispatch commitment is the anchor, reinforced with the 7-day domestic
  and 200+ country trust points.
*/

const USPS = [
  {
    icon: <IconClock className="h-5 w-5" />,
    title: "24-Hour Dispatch",
    copy: "Orders that are placed and confirmed are generally prepared for dispatch within 24 hours.",
  },
  {
    icon: <IconTruck className="h-5 w-5" />,
    title: "7-Day Domestic Delivery",
    copy: "Standard domestic delivery is generally up to 7 days, depending on destination and courier network.",
  },
  {
    icon: <IconGlobe className="h-5 w-5" />,
    title: "200+ Countries",
    copy: "International delivery is available worldwide across 200+ countries.",
  },
];

export function ShippingView() {
  return (
    <main className="bg-white">
      <InfoHero
        eyebrow="Shipping & Delivery"
        title="Shipping & Delivery"
        subtitle="Thoughtfully Packed. Quickly Dispatched. Delivered Worldwide. At Saroj Ensemble, we believe that your experience should begin the moment you place your order. Every order is carefully checked and prepared before it leaves us."
      />

      {/* 24-hour dispatch anchor */}
      <PrimeBanner eyebrow="Our promise" title="Dispatch Within 24 Hours">
        <p className="font-medium text-cream">
          Our 24-hour dispatch commitment is one of our promises to you.
        </p>
        <p>
          Orders that are successfully placed and confirmed are generally
          prepared for dispatch within 24 hours, subject to product
          availability, payment confirmation and order verification.
        </p>
        <p>
          Once your order has been handed over to the shipping partner, you
          will receive tracking information where available.
        </p>
      </PrimeBanner>

      {/* Trust strip */}
      <div className="border-b border-line bg-paper">
        <div className="container-lux grid gap-6 py-12 md:grid-cols-3 md:py-16">
          {USPS.map((u, i) => (
            <Reveal key={u.title} delay={i * 0.08}>
              <UspCard icon={u.icon} title={u.title} copy={u.copy} />
            </Reveal>
          ))}
        </div>
      </div>

      {/* Sections */}
      <div className="container-lux max-w-3xl py-12 md:py-16">
        <InfoSection index="01" heading="Delivery Timeline">
          <p>
            For domestic orders, our standard delivery timeline is up to 7
            days, depending on the destination, courier network and other
            logistical factors.
          </p>
          <p>
            Delivery timelines are estimates and may occasionally be affected
            by circumstances outside our control, including weather conditions,
            courier disruptions, public holidays, incorrect address information
            or unforeseen logistical delays.
          </p>
        </InfoSection>

        <InfoSection index="02" heading="International Delivery">
          <p>
            Saroj Ensemble proudly delivers to 200+ countries worldwide.
          </p>
          <p>
            International delivery timelines vary depending on the destination
            country, local courier network, customs clearance and other local
            factors. Customers placing international orders should be aware
            that customs clearance may add additional time to the estimated
            delivery period.
          </p>
        </InfoSection>

        <InfoSection index="03" heading="Shipping Charges">
          <p>
            Shipping charges are calculated based on factors such as
            destination, package weight, order size and applicable shipping
            arrangements. The applicable shipping cost will be displayed during
            checkout wherever available.
          </p>
          <p>
            For certain international destinations, additional charges may be
            imposed by local authorities or customs.
          </p>
        </InfoSection>

        <InfoSection index="04" heading="Customs, Duties & Taxes">
          <p>
            International shipments may be subject to customs duties, import
            taxes, local fees or other charges imposed by the destination
            country. These charges are determined by the destination
            country&apos;s authorities and are generally outside Saroj
            Ensemble&apos;s control.
          </p>
          <p>
            Where applicable, such charges are the responsibility of the
            recipient.
          </p>
        </InfoSection>

        <InfoSection index="05" heading="Tracking Your Order">
          <p>
            Once your order has been dispatched, tracking details will be
            shared with you where available. Tracking information may take some
            time to become active after the shipment has been handed over to
            the courier.
          </p>
          <p>
            If your tracking information does not update immediately, we
            recommend allowing some time for the courier&apos;s system to
            register the shipment.
          </p>
        </InfoSection>

        <InfoSection index="06" heading="Delivery Address">
          <p>
            Please ensure that your shipping address, contact number and other
            delivery information are accurate at checkout. Saroj Ensemble
            cannot be responsible for delays or failed delivery caused by
            incorrect, incomplete or outdated delivery information provided by
            the customer.
          </p>
          <p>
            If you notice an error in your address after placing an order,
            contact us immediately. We will try to assist, but changes may not
            be possible once the order has entered the dispatch process.
          </p>
        </InfoSection>

        <InfoSection index="07" heading="Delayed Deliveries">
          <p>
            Although we work to meet our stated delivery timelines, unforeseen
            delays can occasionally occur. These may include courier delays,
            severe weather, public holidays, customs inspections, customs
            clearance delays, incorrect or incomplete address information,
            remote-area delivery limitations or unexpected logistical
            disruptions.
          </p>
          <p>
            If your shipment appears to be delayed beyond a reasonable period,
            please contact our team with your order number and tracking
            details.
          </p>
        </InfoSection>

        <InfoSection index="08" heading="Damaged Packages">
          <p>
            If your package appears damaged when delivered, please document the
            condition of the package before opening it where possible. If the
            fabric inside has been damaged, contact us promptly with your order
            number and clear photographs or videos of the package and product.
          </p>
          <p>
            Our team will review the issue and guide you through the
            appropriate resolution.
          </p>
        </InfoSection>
      </div>

      {/* Our promise */}
      <div className="border-t border-line bg-forest text-cream">
        <div className="container-lux max-w-3xl py-12 md:py-16">
          <Reveal>
            <h2 className="eyebrow text-marigold">Our Promise</h2>
            <p className="serif mt-3 max-w-2xl text-[clamp(1.4rem,3vw,2rem)] font-medium leading-snug text-cream">
              From our studio to your doorstep, every order is handled with
              care.
            </p>
            <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-cream/80">
              24-hour dispatch. Delivery across 200+ countries. Thoughtfully
              packed fabrics, sent with care.
            </p>
            <ul className="mt-6 space-y-2 text-[14px] text-cream/80">
              <li className="flex items-center gap-2">
                <IconCheck className="h-4 w-4 text-marigold" /> 24-hour dispatch
              </li>
              <li className="flex items-center gap-2">
                <IconCheck className="h-4 w-4 text-marigold" /> Delivery across
                200+ countries
              </li>
              <li className="flex items-center gap-2">
                <IconCheck className="h-4 w-4 text-marigold" /> Thoughtfully
                packed fabrics
              </li>
            </ul>
          </Reveal>
        </div>
      </div>
    </main>
  );
}
