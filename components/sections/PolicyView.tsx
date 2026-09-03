"use client";

import { useStore } from "@/lib/store";
import type { DictKey } from "@/lib/i18n";
import { Reveal } from "@/components/ui/Reveal";

/*
  Legal & policy pages (privacy / terms / shipping / returns).
  One data-driven view: the page id selects its key namespace.
  Copy lives in the i18n dictionaries (translated in all locales).
*/

export type PolicyId = "privacy" | "terms" | "shipping" | "returns";

type SectionPair = readonly [headingKey: DictKey, bodyKey: DictKey];

const POLICY_META: Record<
  PolicyId,
  { title: DictKey; sub: DictKey; sections: SectionPair[] }
> = {
  privacy: {
    title: "policy.privacy.title",
    sub: "policy.privacy.sub",
    sections: [
      ["policy.privacy.s1.heading", "policy.privacy.s1.body"],
      ["policy.privacy.s2.heading", "policy.privacy.s2.body"],
      ["policy.privacy.s3.heading", "policy.privacy.s3.body"],
      ["policy.privacy.s4.heading", "policy.privacy.s4.body"],
    ],
  },
  terms: {
    title: "policy.terms.title",
    sub: "policy.terms.sub",
    sections: [
      ["policy.terms.s1.heading", "policy.terms.s1.body"],
      ["policy.terms.s2.heading", "policy.terms.s2.body"],
      ["policy.terms.s3.heading", "policy.terms.s3.body"],
      ["policy.terms.s4.heading", "policy.terms.s4.body"],
    ],
  },
  shipping: {
    title: "policy.shipping.title",
    sub: "policy.shipping.sub",
    sections: [
      ["policy.shipping.s1.heading", "policy.shipping.s1.body"],
      ["policy.shipping.s2.heading", "policy.shipping.s2.body"],
      ["policy.shipping.s3.heading", "policy.shipping.s3.body"],
      ["policy.shipping.s4.heading", "policy.shipping.s4.body"],
    ],
  },
  returns: {
    title: "policy.returns.title",
    sub: "policy.returns.sub",
    sections: [
      ["policy.returns.s1.heading", "policy.returns.s1.body"],
      ["policy.returns.s2.heading", "policy.returns.s2.body"],
      ["policy.returns.s3.heading", "policy.returns.s3.body"],
      ["policy.returns.s4.heading", "policy.returns.s4.body"],
    ],
  },
};

export function PolicyView({ page }: { page: PolicyId }) {
  const { t } = useStore();
  const meta = POLICY_META[page];

  return (
    <main className="bg-white">
      <div className="texture-grain border-b border-line bg-paper">
        <div className="container-lux py-14 md:py-20">
          <Reveal>
            <p className="eyebrow text-saffron">Saroj Ensemble</p>
            <h1 className="serif mt-4 max-w-2xl text-[clamp(2rem,5vw,3.5rem)] font-black uppercase leading-[1] tracking-[-0.01em] text-ink">
              {t(meta.title)}
            </h1>
            <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-taupe">
              {t(meta.sub)}
            </p>
          </Reveal>
        </div>
      </div>

      <div className="container-lux max-w-3xl py-12 md:py-16">
        <div className="space-y-10">
          {meta.sections.map(([headingKey, bodyKey], i) => (
            <Reveal key={headingKey} delay={i * 0.06}>
              <section>
                <h2 className="serif text-2xl font-bold text-ink">
                  {t(headingKey)}
                </h2>
                <p className="mt-3 text-[15px] leading-relaxed text-taupe">
                  {t(bodyKey)}
                </p>
              </section>
            </Reveal>
          ))}
        </div>
      </div>
    </main>
  );
}
