import type { DictKey } from "@/lib/i18n";

export interface TrustItem {
  id: string;
  titleKey: DictKey;
  copyKey: DictKey;
  icon: "truck" | "returns" | "lock" | "craft";
  /** Numeric headline shown as a count-up stat */
  stat: { value: number; prefix?: string; suffix?: string; decimals?: number };
}

export const TRUST_ITEMS: TrustItem[] = [
  {
    id: "t1",
    titleKey: "trust.t1.title",
    copyKey: "trust.t1.copy",
    icon: "truck",
    stat: { value: 2500, prefix: "₹", suffix: "+" },
  },
  {
    id: "t2",
    titleKey: "trust.t2.title",
    copyKey: "trust.t2.copy",
    icon: "returns",
    stat: { value: 14, suffix: "" },
  },
  {
    id: "t3",
    titleKey: "trust.t3.title",
    copyKey: "trust.t3.copy",
    icon: "lock",
    stat: { value: 100, suffix: "%" },
  },
  {
    id: "t4",
    titleKey: "trust.t4.title",
    copyKey: "trust.t4.copy",
    icon: "craft",
    stat: { value: 100, suffix: "+" },
  },
];
