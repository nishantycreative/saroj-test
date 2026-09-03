"use client";

import Image from "next/image";
import { IMAGES } from "@/lib/data/images";
import { Reveal } from "@/components/ui/Reveal";
import { IconArrowRight } from "@/components/ui/icons";

/*
  /our-story — editorial brand story for Saroj Ensemble.
  A textile-first narrative: 800 sq. ft. store in South Mumbai in 2000
  growing into a 20,000 sq. ft. fabric destination. Uses only verified
  brand facts and existing site imagery.
*/

const FABRICS_ROUTE = "/collections/fabrics";

const GALLERY = [
  { src: IMAGES.catFabrics, label: "Plains & silks" },
  { src: IMAGES.pBanarasi, label: "Silk" },
  { src: IMAGES.pOrganza, label: "Organza" },
  { src: IMAGES.pChanderi, label: "Chanderi" },
  { src: IMAGES.pJacquard, label: "Jacquard" },
  { src: IMAGES.pZardozi, label: "Embroideries" },
];

const JOURNEY = [
  {
    year: "2000",
    eyebrow: "The Beginning",
    text: "Saroj Ensemble begins its journey from an 800 sq. ft. store in South Mumbai.",
  },
  {
    year: "Growing",
    eyebrow: "A Growing Collection",
    text: "The business expands its selection of fabrics, bringing together different textures, materials, colours, prints and embroideries.",
  },
  {
    year: "Today",
    eyebrow: "A Fabric Destination",
    text: "Saroj has grown into a 20,000 sq. ft. retail space, serving customers across India and internationally.",
  },
];

export function OurStoryView() {
  return (
    <main className="bg-white">
      {/* ---------- Hero ---------- */}
      <section className="relative flex min-h-[70vh] items-end overflow-hidden bg-forest">
        <Image
          src={IMAGES.storyBoutique}
          alt="Premium fabrics at Saroj Ensemble"
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-70"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-forest via-forest/40 to-black/20" />
        <div className="container-lux relative py-20 md:py-28">
          <Reveal>
            <p className="eyebrow text-marigold">Our Story</p>
            <h1 className="serif mt-4 max-w-3xl text-[clamp(2.6rem,7vw,5rem)] font-black uppercase leading-[0.98] tracking-[-0.01em] text-cream">
              Where Every Creation Begins
            </h1>
            <p className="mt-6 max-w-xl text-[15px] leading-relaxed text-cream/85 md:text-base">
              For more than two decades, Saroj Ensemble has been bringing
              together beautiful fabrics, distinctive design and the expertise
              to help you find the one that feels just right.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ---------- Introduction ---------- */}
      <section className="container-lux grid gap-10 py-14 md:grid-cols-[1.1fr_1fr] md:py-24">
        <div className="space-y-5">
          <Reveal>
            <p className="eyebrow text-gold">More Than Fabric</p>
            <h2 className="serif mt-3 max-w-xl text-3xl font-black uppercase leading-tight text-ink md:text-4xl">
              A World of Texture, Colour &amp; Possibility
            </h2>
          </Reveal>
          <Reveal delay={0.08}>
            <div className="space-y-4 text-[15px] leading-relaxed text-taupe md:text-base">
              <p>
                At Saroj Ensemble, we believe that the right fabric is where a
                creation begins.
              </p>
              <p>
                From fluid georgettes and luminous organzas to textured silks,
                graceful chanderis, breathable linens, expressive prints and
                intricate embroideries, our collection brings together fabrics
                for different moods, occasions and ways of creating.
              </p>
              <p>Some are understated.</p>
              <p>Some make a statement.</p>
              <p>
                Some are chosen for the way they fall, while others are chosen
                for the way they catch the light.
              </p>
              <p>
                Together, they give designers, stylists, tailors and individual
                customers the freedom to begin with an idea and make it their
                own.
              </p>
            </div>
          </Reveal>
        </div>
        <Reveal delay={0.15}>
          <div className="relative aspect-[4/5] overflow-hidden bg-forest-deep">
            <Image
              src={IMAGES.catFabrics}
              alt="A selection of Saroj Ensemble fabrics"
              fill
              sizes="(max-width: 768px) 100vw, 45vw"
              className="object-cover"
            />
          </div>
        </Reveal>
      </section>

      {/* ---------- Our Beginning ---------- */}
      <section className="border-y border-line bg-paper">
        <div className="container-lux grid gap-10 py-14 md:grid-cols-2 md:py-24">
          <Reveal>
            <p className="eyebrow text-gold">The Beginning</p>
            <h2 className="serif mt-3 text-3xl font-black uppercase leading-tight text-ink md:text-4xl">
              From a Small Store to a Fabric Destination
            </h2>
            <p className="mt-6 max-w-xl text-[15px] leading-relaxed text-taupe md:text-base">
              Saroj began with a simple ambition: to make beautiful,
              distinctive fabrics more accessible to people who cared about
              what they created.
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="border-t-2 border-gold pt-6">
              <p className="serif text-6xl font-black text-gold md:text-7xl">2000</p>
              <p className="mt-4 text-[15px] leading-relaxed text-taupe md:text-base">
                Starting from an{" "}
                <strong className="font-medium text-ink">
                  800 sq. ft. store in South Mumbai
                </strong>
                , the business grew through a commitment to quality and
                customer service.
              </p>
              <p className="mt-4 text-[15px] leading-relaxed text-taupe md:text-base">
                The journey started small, but the ambition was never limited
                by the size of the space.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ---------- Our Journey (timeline) ---------- */}
      <section className="container-lux py-14 md:py-24">
        <Reveal>
          <p className="eyebrow text-gold">Our Journey</p>
          <h2 className="serif mt-3 text-3xl font-black uppercase leading-tight text-ink md:text-4xl">
            Built one stitch, one step at a time
          </h2>
        </Reveal>
        <div className="mt-10">
          {JOURNEY.map((step, i) => (
            <Reveal key={step.year} delay={i * 0.1}>
              <div className="grid gap-3 border-t border-line py-8 md:grid-cols-[1fr_1.5fr_2fr] md:gap-8 md:py-10">
                <p className="serif text-4xl font-black uppercase leading-none text-gold md:text-5xl">
                  {step.year}
                </p>
                <p className="eyebrow pt-1 text-forest md:pt-2">{step.eyebrow}</p>
                <p className="text-[15px] leading-relaxed text-taupe md:text-base">
                  {step.text}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ---------- The Collection ---------- */}
      <section className="border-y border-line bg-paper">
        <div className="container-lux py-14 md:py-24">
          <div className="max-w-2xl">
            <Reveal>
              <p className="eyebrow text-gold">The Saroj Edit</p>
              <h2 className="serif mt-3 text-3xl font-black uppercase leading-tight text-ink md:text-4xl">
                Chosen With an Eye for Possibility
              </h2>
            </Reveal>
            <Reveal delay={0.08}>
              <div className="mt-5 space-y-4 text-[15px] leading-relaxed text-taupe md:text-base">
                <p>
                  We don&apos;t believe a fabric should simply look beautiful
                  on a shelf. It should inspire what comes next.
                </p>
                <p>
                  That&apos;s why our collection spans a considered mix of
                  plains, prints, embroideries and distinctive textiles —
                  giving you the freedom to choose according to the silhouette,
                  occasion, season and feeling you have in mind.
                </p>
                <p>
                  Whether you&apos;re creating something for a celebration,
                  developing a collection, tailoring a special piece or simply
                  searching for that fabric you haven&apos;t been able to find
                  anywhere else, Saroj is a place to explore.
                </p>
              </div>
            </Reveal>
          </div>

          <div className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-6">
            {GALLERY.map((g, i) => (
              <Reveal key={g.label} delay={i * 0.06}>
                <figure className="group relative aspect-[4/5] overflow-hidden bg-forest-deep">
                  <Image
                    src={g.src}
                    alt={g.label}
                    fill
                    sizes="(max-width: 768px) 50vw, 33vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent px-4 pb-3 pt-10 text-[12px] font-semibold uppercase tracking-[0.14em] text-cream">
                    {g.label}
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- Fabric Expertise ---------- */}
      <section className="container-lux grid gap-10 py-14 md:grid-cols-[1fr_1.1fr] md:py-24">
        <Reveal>
          <div className="relative aspect-[4/3] overflow-hidden bg-forest-deep">
            <Image
              src={IMAGES.storeFlagship}
              alt="Inside a Saroj Ensemble store"
              fill
              sizes="(max-width: 768px) 100vw, 45vw"
              className="object-cover"
            />
          </div>
        </Reveal>
        <div className="flex flex-col justify-center">
          <Reveal>
            <p className="eyebrow text-gold">Expertise That Helps</p>
            <h2 className="serif mt-3 text-3xl font-black uppercase leading-tight text-ink md:text-4xl">
              Sometimes, Finding the Right Fabric Takes More Than Looking
            </h2>
          </Reveal>
          <Reveal delay={0.08}>
            <div className="mt-5 space-y-4 text-[15px] leading-relaxed text-taupe md:text-base">
              <p>
                Fabric shopping isn&apos;t always about colour. It&apos;s about
                understanding how something will fall, feel, move and work with
                the design you have imagined.
              </p>
              <p>
                Our team brings that practical understanding into the
                experience — helping customers explore fabrics, compare
                textures and find combinations that work together.
              </p>
              <p>
                That personal approach is an important part of what has kept
                customers coming back to Saroj over the years.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ---------- For Creators ---------- */}
      <section className="border-y border-line bg-forest text-cream">
        <div className="container-lux py-14 md:py-24">
          <Reveal>
            <p className="eyebrow text-marigold">For Creators</p>
            <h2 className="serif mt-3 max-w-2xl text-3xl font-black uppercase leading-tight text-cream md:text-4xl">
              From an Idea to Something Entirely Your Own
            </h2>
            <div className="mt-5 max-w-2xl space-y-4 text-[15px] leading-relaxed text-cream/80 md:text-base">
              <p>
                Saroj Ensemble serves more than shoppers looking for a piece of
                cloth. Our fabrics become the starting point for garments,
                occasion wear, collections, bespoke pieces and personal
                creations.
              </p>
              <p>
                We also work with designers and support custom fabric
                requirements, bringing together contemporary trends with a
                broad fabric vocabulary.
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.12}>
            <p className="serif mt-10 max-w-xl text-[clamp(1.8rem,4vw,3rem)] font-black uppercase leading-tight text-marigold">
              You bring the idea.
              <br />
              We help you find the fabric.
            </p>
            <a
              href={FABRICS_ROUTE}
              className="group mt-8 inline-flex h-12 items-center gap-2 bg-cream px-7 text-[12px] font-semibold uppercase tracking-[0.14em] text-forest transition-colors hover:bg-gold"
            >
              Explore Fabrics
              <IconArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 rtl:rotate-180" />
            </a>
          </Reveal>
        </div>
      </section>

      {/* ---------- Quality ---------- */}
      <section className="bg-paper">
        <div className="container-lux max-w-3xl py-14 text-center md:py-24">
          <Reveal>
            <p className="eyebrow text-gold">Quality, Always</p>
            <h2 className="serif mt-3 text-3xl font-black uppercase leading-tight text-ink md:text-4xl">
              A Standard Built Over Time
            </h2>
            <p className="mx-auto mt-6 max-w-2xl text-[15px] leading-relaxed text-taupe md:text-base">
              For Saroj, quality isn&apos;t a trend. It is the foundation on
              which the business has been built. From the fabric we select to
              the way we serve our customers, we strive to make every part of
              the experience worthy of the creation that begins with it.
            </p>
            <p className="serif mx-auto mt-6 max-w-xl text-2xl font-medium leading-snug text-ink">
              Our aim is simple: to be a fabric house people can return to with
              confidence — whenever inspiration calls.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ---------- Our Vision ---------- */}
      <section className="container-lux max-w-3xl py-14 md:py-24">
        <Reveal>
          <p className="eyebrow text-gold">Our Vision</p>
          <h2 className="serif mt-3 text-3xl font-black uppercase leading-tight text-ink md:text-4xl">
            To Become the Name You Trust Before You Create
          </h2>
          <p className="mt-6 text-[15px] leading-relaxed text-taupe md:text-base">
            Saroj&apos;s ambition is to become one of the most trusted and
            renowned names in the fashion fabric industry, with quality and
            exclusive service at the centre of that journey.
          </p>
          <p className="mt-4 text-[15px] leading-relaxed text-taupe md:text-base">
            As the world of fashion continues to evolve, our role remains
            beautifully simple:
          </p>
          <p className="serif mt-5 max-w-2xl border-l-2 border-gold pl-5 text-xl font-medium leading-snug text-ink md:text-2xl">
            to keep discovering, curating and bringing together fabrics that
            make creation possible.
          </p>
        </Reveal>
      </section>

      {/* ---------- Final CTA ---------- */}
      <section className="border-t border-line bg-forest text-cream">
        <div className="container-lux py-16 text-center md:py-24">
          <Reveal>
            <h2 className="serif mx-auto max-w-2xl text-[clamp(2rem,5vw,3.5rem)] font-black uppercase leading-tight text-cream">
              Your Next Creation Starts Here.
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-[15px] leading-relaxed text-cream/80">
              A fabric can be the first decision. The detail that changes
              everything. The colour that defines a silhouette. The texture
              that makes a garment unforgettable.
            </p>
            <p className="serif mx-auto mt-5 max-w-xl text-lg font-medium text-marigold">
              Explore the Saroj Ensemble collection and find the fabric that
              brings your idea to life.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <a
                href={FABRICS_ROUTE}
                className="group inline-flex h-12 items-center gap-2 bg-cream px-8 text-[12px] font-semibold uppercase tracking-[0.14em] text-forest transition-colors hover:bg-gold"
              >
                Explore Fabrics
                <IconArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 rtl:rotate-180" />
              </a>
              <a
                href="/contact"
                className="inline-flex h-12 items-center gap-2 border border-cream/30 px-8 text-[12px] font-semibold uppercase tracking-[0.14em] text-cream transition-colors hover:border-gold hover:text-gold"
              >
                Contact Us
              </a>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
