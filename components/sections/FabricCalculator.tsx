"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  GARMENT_CATEGORIES,
  GARMENT_BY_ID,
  estimateFabric,
  type GarmentDef,
  type FabricEstimate,
} from "@/lib/data/fabric-calculator";
import { IMAGES } from "@/lib/data/images";
import { useStore } from "@/lib/store";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Button } from "@/components/ui/Button";
import { Reveal, EASE_LUX, ScrollFloat, CountUp } from "@/components/ui/Reveal";
import { IconCheck, IconClose } from "@/components/ui/icons";

interface FieldErrors {
  [key: string]: string;
}

export function FabricCalculator() {
  const { t, showToast } = useStore();
  const [categoryId, setCategoryId] = useState(GARMENT_CATEGORIES[0].id);
  const [garmentId, setGarmentId] = useState(GARMENT_CATEGORIES[0].garments[0].id);
  const [values, setValues] = useState<Record<string, number>>({});
  const [touched, setTouched] = useState(false);
  const [errors, setErrors] = useState<FieldErrors>({});

  const garment: GarmentDef = GARMENT_BY_ID[garmentId];
  const category = GARMENT_CATEGORIES.find((c) => c.id === categoryId)!;

  const validate = (v: Record<string, number>): FieldErrors => {
    const e: FieldErrors = {};
    for (const f of garment.fields) {
      const val = v[f.key];
      if (val === undefined || Number.isNaN(val)) {
        e[f.key] = t("fabric.required");
      } else if (val < f.min || val > f.max) {
        e[f.key] = t("fabric.rangeError", {
          label: t(f.labelKey),
          min: f.min,
          max: f.max,
          unit: t(f.unitKey),
        });
      }
    }
    return e;
  };

  const estimate: FabricEstimate | null = useMemo(() => {
    if (!touched) return null;
    return Object.keys(errors).length === 0
      ? estimateFabric(garmentId, values)
      : null;
  }, [touched, errors, garmentId, values]);

  const setField = (key: string, raw: string) => {
    const num = raw === "" ? NaN : Number(raw);
    const next = { ...values, [key]: num };
    setValues(next);
    setErrors(validate(next));
  };

  const selectCategory = (id: string) => {
    const cat = GARMENT_CATEGORIES.find((c) => c.id === id)!;
    setCategoryId(id);
    setGarmentId(cat.garments[0].id);
    setValues({});
    setErrors({});
    setTouched(false);
  };

  const selectGarment = (id: string) => {
    setGarmentId(id);
    setValues({});
    setErrors({});
    setTouched(false);
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate(values);
    setErrors(errs);
    setTouched(true);
    if (Object.keys(errs).length === 0) {
      showToast(t("fabric.toastConfirm"));
    }
  };

  const inputCls = (err?: string) =>
    `mt-2 h-12 w-full border bg-paper ps-4 pe-14 text-[14px] text-ink placeholder:text-taupe-light transition-colors focus:outline-none focus:ring-2 ${
      err
        ? "border-coral focus:border-coral focus:ring-coral/20"
        : "border-ink/15 focus:border-saffron focus:ring-saffron/25"
    }`;

  return (
    <section id="fabric-calculator" className="bg-white">
      <div className="container-lux py-10 md:py-16">
        <SectionHeader
          eyebrow={t("fabric.eyebrow")}
          title={t("fabric.title")}
          accent={t("fabric.accent")}
          align="center"
          tone="forest"
        />
        <Reveal delay={0.1}>
          <p className="mx-auto mt-4 max-w-xl text-center text-[15px] text-taupe">
            {t("fabric.sub")}
          </p>
        </Reveal>

        <Reveal delay={0.2}>
          <div className="mx-auto mt-10 grid max-w-5xl gap-6 lg:grid-cols-[1.05fr_0.95fr] lg:gap-8">
            <form
              onSubmit={submit}
              noValidate
              className="rounded-md border border-ink/10 bg-paper p-6 shadow-lux md:p-9"
            >
              <div className="space-y-9">
                <div>
                  <p className="mb-3 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-taupe">
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-saffron/15 text-[10px] font-bold text-saffron">
                      1
                    </span>
                    {t("fabric.category")}
                  </p>
                  <div className="grid grid-cols-2 gap-2">
                    {GARMENT_CATEGORIES.map((c) => (
                      <button
                        key={c.id}
                        type="button"
                        onClick={() => selectCategory(c.id)}
                        aria-pressed={categoryId === c.id}
                        className={`border px-3 py-3.5 text-start transition-all duration-300 ${
                          categoryId === c.id
                            ? "border-saffron bg-saffron/10 shadow-lux-sm"
                            : "border-ink/15 hover:border-ink/35"
                        }`}
                      >
                        <span
                          className={`block text-[13px] font-semibold ${
                            categoryId === c.id ? "text-ink" : "text-taupe"
                          }`}
                        >
                          {t(c.labelKey)}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <p className="mb-3 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-taupe">
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-saffron/15 text-[10px] font-bold text-saffron">
                      2
                    </span>
                    {t("fabric.garmentType")}
                  </p>
                  <div className="grid grid-cols-2 gap-2">
                    {category.garments.map((g) => (
                      <button
                        key={g.id}
                        type="button"
                        onClick={() => selectGarment(g.id)}
                        aria-pressed={garmentId === g.id}
                        className={`border px-3 py-3.5 text-start transition-all duration-300 ${
                          garmentId === g.id
                            ? "border-saffron bg-saffron/10 shadow-lux-sm"
                            : "border-ink/15 hover:border-ink/35"
                        }`}
                      >
                        <span
                          className={`block text-[13px] font-semibold leading-snug ${
                            garmentId === g.id ? "text-ink" : "text-taupe"
                          }`}
                        >
                          {t(g.labelKey)}
                        </span>
                        <span
                          className={`mt-1 block text-[11px] leading-snug ${
                            garmentId === g.id ? "text-saffron" : "text-taupe-light"
                          }`}
                        >
                          {t(g.noteKey)}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <p className="mb-3 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-taupe">
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-saffron/15 text-[10px] font-bold text-saffron">
                      3
                    </span>
                    {t("fabric.measurements")}
                  </p>
                  <div className="grid grid-cols-2 gap-4">
                    {garment.fields.map((f) => (
                      <div
                        key={f.key}
                        className={garment.fields.length % 2 ? "last:col-span-2" : ""}
                      >
                        <label
                          htmlFor={`fc-${f.key}`}
                          className="text-[13px] font-medium text-ink"
                        >
                          {t(f.labelKey)}
                        </label>
                        <div className="relative">
                          <input
                            id={`fc-${f.key}`}
                            type="number"
                            inputMode="decimal"
                            step={f.step}
                            min={f.min}
                            max={f.max}
                            placeholder={f.placeholder}
                            value={Number.isNaN(values[f.key]) ? "" : (values[f.key] ?? "")}
                            onChange={(e) => setField(f.key, e.target.value)}
                            aria-invalid={Boolean(errors[f.key])}
                            className={inputCls(errors[f.key])}
                          />
                          <span className="pointer-events-none absolute end-4 top-1/2 mt-1 -translate-y-1/2 text-[12px] font-medium text-taupe-light">
                            {t(f.unitKey)}
                          </span>
                        </div>
                        {errors[f.key] && (
                          <p className="mt-1.5 flex items-center gap-1.5 text-[11px] text-coral">
                            <IconClose className="h-3 w-3" />
                            {errors[f.key]}
                          </p>
                        )}
                        {!errors[f.key] && f.helpKey && (
                          <p className="mt-1.5 text-[11px] leading-snug text-taupe-light">
                            {t(f.helpKey)}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <Button
                    type="submit"
                    fullWidth
                    size="lg"
                    className="!bg-saffron hover:!bg-terracotta"
                  >
                    {t("fabric.calculate")}
                  </Button>
                </div>
              </div>
            </form>

            <div className="flex flex-col gap-6">
              <div className="texture-grain relative overflow-hidden rounded-md border border-marigold/30 bg-forest p-8 text-cream shadow-lux md:p-9">
                <p className="eyebrow text-marigold">{t("fabric.yourEstimate")}</p>
                <AnimatePresence mode="wait">
                  {estimate ? (
                    <motion.div
                      key="result"
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, ease: EASE_LUX }}
                    >
                      <p className="mt-5 text-[12px] font-semibold uppercase tracking-[0.16em] text-cream-muted">
                        {t(garment.labelKey)}
                      </p>
                      <motion.p
                        initial={{ scale: 0.92 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 0.5, ease: EASE_LUX, delay: 0.15 }}
                        className="serif mt-3 text-6xl font-black tabular-nums text-cream"
                      >
                        <CountUp value={estimate.meters} decimals={1} duration={0.9} />
                        <span className="ms-2 text-xl font-medium text-cream-muted">
                          {t("fabric.metres")}
                        </span>
                      </motion.p>
                      <div className="mt-6 space-y-2 border-t border-cream/15 pt-5 text-[14px]">
                        <div className="flex items-center justify-between text-cream-muted">
                          <span>{t("fabric.requiredYardage")}</span>
                          <span className="tabular-nums">
                            {estimate.meters.toFixed(1)} {t("fabric.units.m")}
                          </span>
                        </div>
                        <div className="flex justify-between text-cream-muted">
                          <span>{t("fabric.wastage")}</span>
                          <span className="flex items-center gap-1.5 text-marigold">
                            <IconCheck className="h-3.5 w-3.5" />
                            {t("fabric.included")}
                          </span>
                        </div>
                      </div>
                      <Button
                        fullWidth
                        size="sm"
                        href="/collections/fabrics"
                        onClick={() => showToast(t("fabric.toastReserve"))}
                        className="mt-8"
                      >
                        {t("fabric.reserve")}
                      </Button>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="empty"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="mt-6 flex flex-col items-center gap-4 py-8 text-center"
                    >
                      <span className="flex h-12 w-12 items-center justify-center rounded-full border border-marigold/50 text-marigold">
                        <IconCheck className="h-5 w-5" />
                      </span>
                      <p className="max-w-[15rem] text-[14px] text-cream-muted">
                        {t("fabric.emptyHint")}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <div className="relative min-h-[16rem] flex-1 overflow-hidden rounded-md border border-ink/10 shadow-lux md:min-h-[20rem]">
                <ScrollFloat distance={18} scale={0} className="absolute inset-0">
                  <Image
                    src={IMAGES.fabricCalc}
                    alt={t("features.a.eyebrow")}
                    fill
                    sizes="(max-width: 1024px) 100vw, 40vw"
                    className="object-cover object-center"
                  />
                  <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-6">
                    <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-marigold">
                      {t("fabric.eyebrow")}
                    </p>
                    <p className="serif mt-1 text-xl font-bold leading-snug text-cream">
                      {t("features.c1.badgeTitle")}
                    </p>
                  </div>
                </ScrollFloat>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
