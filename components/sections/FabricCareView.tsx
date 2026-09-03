"use client";

import { InfoHero, InfoSection } from "@/components/ui/InfoBlocks";
import { Reveal } from "@/components/ui/Reveal";
import { IconCheck } from "@/components/ui/icons";

/*
  /fabric-care — fabric care guide. Breakdown by washing, drying,
  ironing, storage, cutting; with the 'gentle by default' principle
  and a pre-tailoring inspection reminder.
*/

const CHECK_LIST = [
  "Colour",
  "Length and quantity",
  "Surface condition",
  "Texture",
  "Weave",
  "Pattern or design",
  "Any visible irregularities",
];

const STORAGE = [
  "Clean and completely dry before storage",
  "Away from excessive moisture",
  "Protected from prolonged direct sunlight",
  "In a clean, dry environment",
  "Folded or rolled appropriately for the textile",
  "Away from substances that could stain or damage the fibres",
];

export function FabricCareView() {
  return (
    <main className="bg-white">
      <InfoHero
        eyebrow="Fabric Care"
        title="Fabric Care"
        subtitle="Beautiful Fabrics Deserve Thoughtful Care. A beautiful fabric can become part of something you keep for years. The way a fabric is stored, washed, dried, pressed and handled can have a significant impact on its colour, texture, softness, finish and longevity."
      />

      <div className="container-lux max-w-3xl py-12 md:py-16">
        <Reveal>
          <p className="text-[15px] leading-relaxed text-taupe">
            Because every textile is different, always check the specific care
            recommendations for your fabric before cleaning or treating it.
          </p>
        </Reveal>

        <div className="mt-2">
          <InfoSection index="01" heading="Before You Care for Your Fabric">
            <p>
              Before washing, ironing or altering your fabric, take a moment to
              understand its composition and finish. Different fibres and
              weaves respond differently to water, heat, friction and cleaning
              products.
            </p>
            <p>
              When in doubt, we recommend consulting a professional fabric or
              garment-care specialist.
            </p>
          </InfoSection>

          <InfoSection index="02" heading="Washing">
            <p>
              <strong className="font-medium text-ink">
                Follow the recommended care instructions.
              </strong>{" "}
              Not all fabrics should be washed in the same way. Depending on
              the textile, washing may cause changes in colour, texture,
              shrinkage, softness or drape. For delicate, embellished, dyed or
              premium fabrics, professional cleaning may be the safer option.
            </p>
            <p>
              <strong className="font-medium text-ink">
                Avoid unnecessary friction.
              </strong>{" "}
              Rough handling, aggressive scrubbing and excessive rubbing can
              damage delicate fibres and affect the surface appearance of a
              fabric. Handle your fabric gently, particularly when it is wet.
            </p>
            <p>
              <strong className="font-medium text-ink">
                Avoid harsh chemicals.
              </strong>{" "}
              Strong detergents, bleach and other aggressive cleaning products
              can affect dyes, fibres and finishes. Use only products
              appropriate for the specific textile.
            </p>
          </InfoSection>

          <InfoSection index="03" heading="Drying">
            <p>
              <strong className="font-medium text-ink">
                Keep delicate fabrics away from excessive heat.
              </strong>{" "}
              High temperatures can affect certain fibres, dyes and finishes.
              Whenever possible, follow the recommended drying method for the
              specific fabric.
            </p>
            <p>
              <strong className="font-medium text-ink">
                Protect colours from prolonged direct sunlight.
              </strong>{" "}
              Extended exposure to strong sunlight can cause certain dyes to
              fade over time. Dry or store fabrics away from prolonged direct
              sunlight unless the fabric&apos;s care instructions specifically
              recommend otherwise.
            </p>
          </InfoSection>

          <InfoSection index="04" heading="Ironing & Pressing">
            <p>
              Different fabrics require different levels of heat. Before
              ironing:
            </p>
            <ul className="list-disc space-y-1 pl-5">
              <li>Check the recommended temperature.</li>
              <li>Use a protective cloth where appropriate.</li>
              <li>
                Avoid pressing delicate surfaces directly with excessive heat.
              </li>
              <li>Test an inconspicuous area if you are uncertain.</li>
            </ul>
            <p>
              For premium or delicate fabrics, professional pressing may be
              preferable.
            </p>
          </InfoSection>

          <InfoSection index="05" heading="Storage">
            <p>Proper storage helps preserve the beauty of your fabric. Keep fabrics:</p>
            <ul className="list-disc space-y-1 pl-5">
              {STORAGE.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <p>
              For delicate fabrics, avoid storing them under excessive weight
              for long periods.
            </p>
          </InfoSection>

          <InfoSection index="06" heading="Embellished & Delicate Fabrics">
            <p>
              Embellished, textured and delicate textiles require additional
              care. Be mindful of jewellery, rough surfaces, sharp objects and
              excessive friction, which can catch threads or damage surface
              details.
            </p>
            <p>
              Where a fabric contains delicate embellishment or special
              finishing, professional cleaning and handling may be recommended.
            </p>
          </InfoSection>

          <InfoSection index="07" heading="Before Cutting or Stitching">
            <p>
              We recommend inspecting your fabric thoroughly before beginning
              any tailoring or alteration work. Check:
            </p>
            <ul className="list-disc space-y-1 pl-5">
              {CHECK_LIST.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <p>
              Natural textiles may contain subtle variations that are part of
              their character.
            </p>
            <p>
              If you believe your fabric has a quality issue, please contact us
              before cutting, stitching, washing or altering the fabric so our
              team can assist you.
            </p>
          </InfoSection>

          <InfoSection index="08" heading="Natural Variations">
            <p>
              Part of the beauty of textiles lies in their individuality.
              Depending on the fabric, subtle differences in weave, texture,
              colour depth, slubs or surface character may occur naturally.
            </p>
            <p>
              These characteristics can be part of the fabric&apos;s
              craftsmanship and should not automatically be considered
              imperfections.
            </p>
          </InfoSection>
        </div>
      </div>

      {/* A simple rule */}
      <div className="border-y border-line bg-forest text-cream">
        <div className="container-lux max-w-3xl py-12 md:py-16">
          <Reveal>
            <h2 className="eyebrow text-marigold">A Simple Rule</h2>
            <p className="serif mt-3 max-w-2xl text-[clamp(1.6rem,4vw,2.6rem)] font-black uppercase leading-tight text-cream">
              When in doubt, treat your fabric gently.
            </p>
            <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-cream/80">
              Avoid unnecessary washing, heat and friction, and choose
              professional care for delicate or premium textiles. The right
              care can help preserve the character, colour and feel of your
              fabric for years to come.
            </p>
          </Reveal>
        </div>
      </div>

      {/* Help */}
      <div className="border-b border-line bg-paper">
        <div className="container-lux max-w-3xl py-12 md:py-16">
          <Reveal>
            <h2 className="serif text-2xl font-black uppercase text-ink md:text-3xl">
              Need Help Choosing or Caring for a Fabric?
            </h2>
            <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-taupe">
              If you are unsure how a particular Saroj Ensemble fabric should
              be handled, please contact our team before washing, cutting or
              altering it. We would be happy to guide you based on the fabric
              and its characteristics.
            </p>
            <a
              href="/contact"
              className="mt-6 inline-flex h-12 items-center gap-2 bg-forest px-7 text-[12px] font-semibold uppercase tracking-[0.14em] text-cream transition-colors hover:bg-forest-deep"
            >
              <IconCheck className="h-4 w-4" />
              Contact our team
            </a>
            <p className="serif mt-8 text-lg font-medium italic text-gold">
              Choose beautifully. Care thoughtfully. Keep it for longer.
            </p>
          </Reveal>
        </div>
      </div>
    </main>
  );
}
