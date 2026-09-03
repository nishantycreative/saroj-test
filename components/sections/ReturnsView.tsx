"use client";

import {
  InfoHero,
  InfoSection,
  UspCard,
  PrimeBanner,
} from "@/components/ui/InfoBlocks";
import { Reveal } from "@/components/ui/Reveal";
import {
  IconReturns,
  IconCheck,
  IconClock,
  IconLock,
} from "@/components/ui/icons";

/*
  /returns-policy — full returns & exchanges help page. The 14-day
  window is the anchor, with the critical fabric rule made prominent.
*/

const USPS = [
  {
    icon: <IconReturns className="h-5 w-5" />,
    title: "14 Days to Return",
    copy: "Eligible products may be returned within 14 days of delivery.",
  },
  {
    icon: <IconCheck className="h-5 w-5" />,
    title: "Eligible Conditions",
    copy: "Returns are accepted on unused, unwashed, unaltered fabric in original condition.",
  },
  {
    icon: <IconClock className="h-5 w-5" />,
    title: "Simple Process",
    copy: "Contact our team, share your order details, and follow the guidance provided.",
  },
];

const ELIGIBILITY = [
  "Unused and unwashed",
  "Uncut and unaltered",
  "In its original condition",
  "Free from stains, marks, odours or damage",
  "Returned with its original packaging where applicable",
  "Accompanied by the relevant order details",
];

const RETURN_STEPS = [
  "Contact our customer support team within 14 days of delivery.",
  "Provide your order number and reason for the return.",
  "Share photographs or other information requested by our team.",
  "Wait for return instructions before sending the product back.",
  "Pack the product securely to prevent damage during transit.",
  "Ship the package using the return instructions provided by Saroj Ensemble.",
];

export function ReturnsView() {
  return (
    <main className="bg-white">
      <InfoHero
        eyebrow="Returns & Exchanges"
        title="Returns & Exchanges"
        subtitle="Our 14-Day Return Policy. We want you to feel confident when purchasing from Saroj Ensemble. Eligible products may be returned within 14 days of delivery, provided they meet the conditions outlined below."
      />

      {/* 14-day anchor */}
      <PrimeBanner eyebrow="Return window" title="14 Days to Return">
        <p>
          Eligible products may be returned within 14 days of delivery,
          provided they meet the conditions outlined below.
        </p>
        <p>
          Because fabrics are cut and handled differently once they have been
          used, we ask that you inspect your purchase carefully before cutting,
          stitching, washing or altering it.
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

      <div className="container-lux max-w-3xl py-12 md:py-16">
        <InfoSection index="01" heading="Return Eligibility">
          <p>
            To be eligible for a return, the product should generally be:
          </p>
          <ul className="space-y-2 pt-1">
            {ELIGIBILITY.map((item) => (
              <li key={item} className="flex items-start gap-2.5">
                <IconCheck className="mt-1 h-4 w-4 shrink-0 text-leaf" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <p>
            Products that have been cut, stitched, altered, washed, dyed,
            damaged or otherwise modified may not be eligible for return.
          </p>
        </InfoSection>

        <InfoSection index="02" heading="14-Day Return Window">
          <p>
            Return requests must be raised within 14 days of receiving your
            order. After the 14-day period has passed, we may not be able to
            accept the return.
          </p>
          <p>
            We encourage you to inspect your fabric promptly after delivery so
            that any concern can be reported within the applicable return
            window.
          </p>
        </InfoSection>

        <InfoSection index="03" heading="Damaged or Incorrect Orders">
          <p>
            If you receive an incorrect, defective or damaged product, please
            contact us as soon as possible. To help us resolve the issue
            quickly, please provide:
          </p>
          <ul className="list-disc space-y-1 pl-5">
            <li>Your order number</li>
            <li>A description of the issue</li>
            <li>Clear photographs of the product</li>
            <li>Photographs of the packaging where relevant</li>
            <li>Video evidence where useful</li>
          </ul>
          <p>
            Our team will assess the issue and advise you on the next steps.
          </p>
        </InfoSection>

        <InfoSection index="04" heading="Exchanges">
          <p>
            If you would like to exchange an eligible product, please contact
            our team within the 14-day return window. Exchange availability
            depends on product availability and the condition of the item being
            returned.
          </p>
          <p>
            If the requested replacement is unavailable, our team will discuss
            the available alternatives with you.
          </p>
        </InfoSection>

        <InfoSection index="05" heading="How to Request a Return">
          <ol className="list-decimal space-y-1.5 pl-5">
            {RETURN_STEPS.map((step) => (
              <li key={step}>{step}</li>
            ))}
          </ol>
          <p>
            Please do not send a return to an address that has not been
            confirmed by our team.
          </p>
        </InfoSection>

        <InfoSection index="06" heading="Return Shipping">
          <p>
            The responsibility for return shipping may depend on the reason for
            the return and the circumstances of the order.
          </p>
          <p>
            For damaged, defective or incorrect products confirmed by our team,
            we will provide appropriate guidance regarding the return. For
            other eligible returns, applicable return shipping costs may be the
            responsibility of the customer.
          </p>
        </InfoSection>

        <InfoSection index="07" heading="Inspection & Refunds">
          <p>
            Once the returned product reaches us, it will be inspected to
            determine whether it meets the applicable return conditions. If the
            return is approved, the eligible refund will be processed through
            the applicable payment method.
          </p>
          <p>
            The time required for the refunded amount to reflect in your
            account can vary depending on the payment provider or bank.
          </p>
        </InfoSection>

        <InfoSection index="08" heading="Important Note About Fabrics">
          <p>
            Please inspect your fabric before cutting or altering it. Once
            fabric has been cut, stitched, washed, dyed, altered or otherwise
            modified, it may no longer be possible for us to accept it as a
            return.
          </p>
          <p>
            We strongly recommend confirming the colour, texture, quantity and
            suitability of your fabric before beginning any tailoring or
            alteration work.
          </p>
        </InfoSection>
      </div>

      {/* Contact */}
      <div className="border-t border-line bg-forest text-cream">
        <div className="container-lux max-w-3xl py-12 md:py-16">
          <Reveal>
            <h2 className="eyebrow text-marigold">Contact Us</h2>
            <p className="serif mt-3 max-w-2xl text-[clamp(1.4rem,3vw,2rem)] font-medium leading-snug text-cream">
              If you have any concerns about your order, our team is always
              happy to help you understand the return or exchange process.
            </p>
            <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-cream/80">
              14 days to return. Carefully considered, thoughtfully handled.
            </p>
            <a
              href="/contact"
              className="mt-6 inline-flex h-12 items-center gap-2 bg-cream px-7 text-[12px] font-semibold uppercase tracking-[0.14em] text-forest transition-colors hover:bg-gold"
            >
              <IconLock className="h-4 w-4" />
              Contact our team
            </a>
          </Reveal>
        </div>
      </div>
    </main>
  );
}
