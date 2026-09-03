import type { DictKey } from "@/lib/i18n";

export interface Faq {
  id: string;
  qKey: DictKey;
  aKey: DictKey;
}

export const FAQS: Faq[] = [
  { id: "f1", qKey: "faq.f1.q", aKey: "faq.f1.a" },
  { id: "f2", qKey: "faq.f2.q", aKey: "faq.f2.a" },
  { id: "f3", qKey: "faq.f3.q", aKey: "faq.f3.a" },
  { id: "f4", qKey: "faq.f4.q", aKey: "faq.f4.a" },
  { id: "f5", qKey: "faq.f5.q", aKey: "faq.f5.a" },
  { id: "f6", qKey: "faq.f6.q", aKey: "faq.f6.a" },
  { id: "f7", qKey: "faq.f7.q", aKey: "faq.f7.a" },
];
