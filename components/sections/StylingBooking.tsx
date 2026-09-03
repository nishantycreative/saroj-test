"use client";

import Image from "next/image";
import { useState } from "react";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
} from "framer-motion";
import { IMAGES } from "@/lib/data/images";
import { STORES } from "@/lib/data/stores";
import { useStore } from "@/lib/store";
import { Button } from "@/components/ui/Button";
import { Reveal, EASE_LUX, SPRING_POP, ScrollFloat } from "@/components/ui/Reveal";
import { IconCheck } from "@/components/ui/icons";

/*
  Section 17 — Personal Styling (v3 redesign).

  Premium fashion-consultation experience: deep forest section with
  marigold accents, grouped card-style fields with proper labels,
  occasion selector, success state and strong CTA. Fully localized.
*/

type Mode = "store" | "video";
type Errors = Partial<
  Record<"name" | "email" | "phone" | "occasion" | "store" | "date" | "time", string>
>;

const TIME_SLOTS = [
  "10:30–11:30",
  "12:00–13:00",
  "14:30–15:30",
  "16:00–17:00",
  "18:00–19:00",
  "19:30–20:30",
];

const OCCASION_KEYS = [
  "styling.occasion.wedding",
  "styling.occasion.festive",
  "styling.occasion.cocktail",
  "styling.occasion.office",
  "styling.occasion.everyday",
  "styling.occasion.other",
] as const;

export function StylingBooking() {
  const { t, showToast } = useStore();
  const reduceMotion = useReducedMotion();
  const [mode, setMode] = useState<Mode>("store");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [occasion, setOccasion] = useState("");
  const [store, setStore] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [requirements, setRequirements] = useState("");
  const [errors, setErrors] = useState<Errors>({});
  const [submitted, setSubmitted] = useState(false);

  const validate = (): Errors => {
    const e: Errors = {};
    if (name.trim().length < 2) e.name = t("styling.err.name");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim()))
      e.email = t("styling.err.email");
    if (!/^[+\d][\d\s-]{8,15}$/.test(phone.trim()))
      e.phone = t("styling.err.phone");
    if (!occasion) e.occasion = t("styling.err.occasion");
    if (mode === "store" && !store) e.store = t("styling.err.store");
    const chosen = new Date(date);
    if (!date || Number.isNaN(chosen.getTime())) e.date = t("styling.err.date");
    else if (chosen < new Date(new Date().setHours(0, 0, 0, 0)))
      e.date = t("styling.err.datePast");
    if (!time) e.time = t("styling.err.time");
    return e;
  };

  const submit = (ev: React.FormEvent) => {
    ev.preventDefault();
    const e = validate();
    setErrors(e);
    if (Object.keys(e).length === 0) {
      setSubmitted(true);
      showToast(t("styling.toast"));
    }
  };

  const inputCls = (err?: string) =>
    `mt-2.5 h-13 w-full rounded-md border bg-paper pl-4 pr-4 text-[14px] text-ink placeholder:text-taupe-light transition-all focus:outline-none focus:ring-2 ${
      err
        ? "border-coral focus:border-coral focus:ring-coral/25"
        : "border-ink/15 hover:border-ink/30 focus:border-saffron focus:ring-saffron/30"
    }`;

  const fieldLabel = (text: string, htmlFor?: string) => (
    <label
      htmlFor={htmlFor}
      className="text-[11px] font-bold uppercase tracking-[0.18em] text-taupe"
    >
      {text}
    </label>
  );

  const modeLabel = (modeKey: Mode) =>
    modeKey === "store" ? t("styling.inStore") : t("styling.videoCall");

  /* Staggered field entrance (collapses to a quick fade under reduced motion) */
  const formVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: reduceMotion ? 0 : 0.06,
        delayChildren: reduceMotion ? 0 : 0.08,
      },
    },
  };
  const fieldVariants = {
    hidden: reduceMotion ? { opacity: 0 } : { opacity: 0, y: 12 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: reduceMotion ? 0.15 : 0.55,
        ease: EASE_LUX,
      },
    },
  };
  const storeFieldTransition = {
    duration: reduceMotion ? 0.1 : 0.45,
    ease: EASE_LUX,
  };

  return (
    <section id="booking" className="texture-grain relative bg-forest text-cream">
      <div className="container-lux grid items-center gap-8 py-10 md:grid-cols-[1.2fr_1fr] md:gap-12 md:py-16">
        {/* ---------- Copy + imagery ---------- */}
        <Reveal>
          <div>
            <p className="eyebrow text-marigold">{t("styling.eyebrow")}</p>
            <h2 className="serif mt-4 text-3xl font-black uppercase leading-[1.05] text-cream md:text-[3.4rem]">
              {t("styling.title")}{" "}
              <span className="text-marigold">{t("styling.accent")}</span>
            </h2>
            <p className="mt-5 max-w-md text-[15px] leading-relaxed text-cream/80">
              {t("styling.sub")}
            </p>
            <ul className="mt-8 space-y-3 text-[13px] text-cream">
              {[
                t("styling.inStore"),
                t("styling.videoCall"),
              ].map((item) => (
                <li key={item} className="flex items-center gap-3">
                  <span className="flex h-5 w-5 items-center justify-center rounded-full border border-brand-gold bg-paper/70 text-[10px] text-brand-deep">
                    <IconCheck className="h-3 w-3" />
                  </span>
                  {item}
                </li>
              ))}
            </ul>
            <div className="mt-9 hidden overflow-hidden md:block">
              {/* TODO_CLIENT_IMAGE: styling session imagery */}
              <ScrollFloat distance={14} scale={0.015} className="relative aspect-[16/9]">
                <Image
                  src={IMAGES.styling}
                  alt={t("styling.eyebrow")}
                  fill
                  sizes="40vw"
                  className="object-cover"
                />
              </ScrollFloat>
            </div>
          </div>
        </Reveal>

        {/* ---------- Booking card ---------- */}
        <Reveal delay={0.15}>
          <div className="rounded-md bg-paper p-7 text-ink shadow-lux md:p-10">
            <AnimatePresence mode="wait">
              {submitted ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, ease: EASE_LUX }}
                  className="flex flex-col items-center gap-5 py-14 text-center"
                >
                  <motion.span
                    initial={{ scale: 0, rotate: -12 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ ...SPRING_POP, delay: 0.1 }}
                    className="flex h-14 w-14 items-center justify-center rounded-full border border-gold text-gold"
                  >
                    <IconCheck className="h-6 w-6" />
                  </motion.span>
                  <h3 className="serif text-3xl font-black text-ink">
                    {t("styling.success.title")}
                  </h3>
                  <p className="max-w-[20rem] text-[14px] leading-relaxed text-taupe">
                    {t("styling.success.copy", {
                      name: name.split(" ")[0],
                      mode: modeLabel(mode),
                      time,
                    })}
                  </p>
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setName("");
                      setEmail("");
                      setPhone("");
                      setOccasion("");
                      setStore("");
                      setDate("");
                      setTime("");
                      setRequirements("");
                    }}
                    className="mt-2 text-[12px] font-medium uppercase tracking-[0.16em] text-gold transition-colors hover:text-bronze"
                  >
                    {t("styling.success.again")}
                  </button>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  initial="hidden"
                  animate="visible"
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.5 }}
                  variants={formVariants}
                  onSubmit={submit}
                  noValidate
                  className="space-y-7"
                >
                  {/* Session type — segmented control */}
                  <motion.div variants={fieldVariants}>
                    {fieldLabel(t("styling.sessionType"))}
                    <div className="mt-3 grid grid-cols-2 gap-2">
                      {(["store", "video"] as const).map((m) => (
                        <button
                          key={m}
                          type="button"
                          onClick={() => setMode(m)}
                          aria-pressed={mode === m}
                          className={`h-13 rounded-md border text-[13px] font-semibold uppercase tracking-[0.12em] transition-colors duration-300 ${
                            mode === m
                              ? "border-saffron bg-saffron/15 text-ink"
                              : "border-ink/20 text-taupe hover:border-ink/40"
                          }`}
                        >
                          {modeLabel(m)}
                        </button>
                      ))}
                    </div>
                    <p className="mt-2 text-[12px] italic text-taupe-light">
                      {mode === "store"
                        ? t("styling.inStoreHint")
                        : t("styling.videoHint")}
                    </p>
                  </motion.div>

                  {/* Name */}
                  <motion.div variants={fieldVariants}>
                    {fieldLabel(t("styling.name"), "bk-name")}
                    <input
                      id="bk-name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder={t("styling.namePh")}
                      className={inputCls(errors.name)}
                      autoComplete="name"
                    />
                    {errors.name && (
                      <p className="mt-1.5 text-[12px] text-coral">{errors.name}</p>
                    )}
                  </motion.div>

                  {/* Email + phone */}
                  <motion.div variants={fieldVariants} className="grid gap-5 sm:grid-cols-2">
                    <div>
                      {fieldLabel(t("styling.email"), "bk-email")}
                      <input
                        id="bk-email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder={t("styling.emailPh")}
                        className={inputCls(errors.email)}
                        autoComplete="email"
                      />
                      {errors.email && (
                        <p className="mt-1.5 text-[12px] text-coral">{errors.email}</p>
                      )}
                    </div>
                    <div>
                      {fieldLabel(t("styling.phone"), "bk-phone")}
                      <input
                        id="bk-phone"
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder={t("styling.phonePh")}
                        className={inputCls(errors.phone)}
                        autoComplete="tel"
                      />
                      {errors.phone && (
                        <p className="mt-1.5 text-[12px] text-coral">{errors.phone}</p>
                      )}
                    </div>
                  </motion.div>

                  {/* Occasion */}
                  <motion.div variants={fieldVariants}>
                    {fieldLabel(t("styling.occasion"), "bk-occasion")}
                    <select
                      id="bk-occasion"
                      value={occasion}
                      onChange={(e) => setOccasion(e.target.value)}
                      className={`${inputCls(errors.occasion)} ${
                        occasion ? "" : "text-taupe-light"
                      }`}
                    >
                      <option value="">{t("styling.occasionPh")}</option>
                      {OCCASION_KEYS.map((key) => (
                        <option key={key} value={key}>
                          {t(key)}
                        </option>
                      ))}
                    </select>
                    {errors.occasion && (
                      <p className="mt-1.5 text-[12px] text-coral">
                        {errors.occasion}
                      </p>
                    )}
                  </motion.div>

                  {/* Store location — only for in-store sessions */}
                  <AnimatePresence initial={false}>
                    {mode === "store" && (
                      <motion.div
                        key="store-field"
                        initial={{ height: 0, opacity: 0, marginTop: 0 }}
                        animate={{ height: "auto", opacity: 1, marginTop: 28 }}
                        exit={{ height: 0, opacity: 0, marginTop: 0 }}
                        transition={storeFieldTransition}
                        className="overflow-hidden"
                      >
                        <div>
                          {fieldLabel(t("styling.store"), "bk-store")}
                          <select
                            id="bk-store"
                            value={store}
                            onChange={(e) => setStore(e.target.value)}
                            className={`${inputCls(errors.store)} ${
                              store ? "" : "text-taupe-light"
                            }`}
                          >
                            <option value="">{t("styling.storePh")}</option>
                            {STORES.map((s) => (
                              <option key={s.id} value={s.neighbourhood}>
                                {s.neighbourhood}
                              </option>
                            ))}
                          </select>
                          {errors.store && (
                            <p className="mt-1.5 text-[12px] text-coral">
                              {errors.store}
                            </p>
                          )}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Date + time */}
                  <motion.div variants={fieldVariants} className="grid gap-5 sm:grid-cols-2">
                    <div>
                      {fieldLabel(t("styling.date"), "bk-date")}
                      <input
                        id="bk-date"
                        type="date"
                        value={date}
                        min={new Date().toISOString().slice(0, 10)}
                        onChange={(e) => setDate(e.target.value)}
                        className={inputCls(errors.date)}
                      />
                      {errors.date && (
                        <p className="mt-1.5 text-[12px] text-coral">{errors.date}</p>
                      )}
                    </div>
                    <div>
                      {fieldLabel(t("styling.time"), "bk-time")}
                      <select
                        id="bk-time"
                        value={time}
                        onChange={(e) => setTime(e.target.value)}
                        className={`${inputCls(errors.time)} ${
                          time ? "" : "text-taupe-light"
                        }`}
                      >
                        <option value="">{t("styling.timePh")}</option>
                        {TIME_SLOTS.map((slot) => (
                          <option key={slot} value={slot}>
                            {slot}
                          </option>
                        ))}
                      </select>
                      {errors.time && (
                        <p className="mt-1.5 text-[12px] text-coral">{errors.time}</p>
                      )}
                    </div>
                  </motion.div>

                  {/* Styling requirements */}
                  <motion.div variants={fieldVariants}>
                    {fieldLabel(
                      `${t("styling.requirements")} ${t("styling.optional")}`,
                      "bk-requirements",
                    )}
                    <textarea
                      id="bk-requirements"
                      value={requirements}
                      onChange={(e) => setRequirements(e.target.value)}
                      placeholder={t("styling.requirementsPh")}
                      rows={3}
                      className="mt-2.5 w-full resize-none rounded-md border border-ink/15 bg-paper px-4 py-3 text-[14px] text-ink placeholder:text-taupe-light transition-all hover:border-ink/30 focus:border-saffron focus:outline-none focus:ring-2 focus:ring-saffron/30"
                    />
                  </motion.div>

                  <motion.div variants={fieldVariants}>
                    <Button type="submit" fullWidth size="lg">
                      {t("styling.submit")}
                    </Button>
                  </motion.div>
                  <motion.p
                    variants={fieldVariants}
                    className="text-center text-[11px] uppercase tracking-[0.16em] text-taupe-light"
                  >
                    {t("styling.footnote")}
                  </motion.p>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
