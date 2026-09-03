import Link from "next/link";
import type { ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  href?: string;
  onClick?: (e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>) => void;
  variant?:
    | "primary"
    | "black"
    | "forest"
    | "outline"
    | "outline-light"
    | "ghost";
  size?: "md" | "lg" | "sm";
  type?: "button" | "submit";
  disabled?: boolean;
  className?: string;
  fullWidth?: boolean;
  arrow?: boolean;
}

/*
  Button language — real "buy now" moments:
    primary       solid gold fill / black text
    black         solid black fill / cream text (gold on hover)
    forest        solid forest-green fill / cream text
    outline       black hairline
    outline-light white hairline (for dark sections)
  Caps, tracked, tall hit-area.
*/

const base =
  "group/btn inline-flex items-center justify-center gap-3 font-body text-[12px] font-semibold uppercase tracking-[0.16em] transition-all duration-300 select-none disabled:opacity-50";

const sizes = {
  sm: "h-11 px-6",
  md: "h-[54px] px-9",
  lg: "h-[60px] px-11 text-[13px]",
};

const variants = {
  primary:
    "bg-gold text-black hover:bg-gold-light active:bg-bronze disabled:opacity-50 shadow-[0_10px_28px_-12px_rgba(176,141,87,0.7)] hover:shadow-[0_16px_36px_-12px_rgba(176,141,87,0.85)]",
  black:
    "bg-black text-cream hover:bg-espresso-soft active:bg-black disabled:opacity-50",
  forest:
    "bg-forest text-cream hover:bg-forest-deep active:bg-forest-deep disabled:opacity-50 shadow-[0_10px_28px_-12px_rgba(18,48,31,0.65)] hover:shadow-[0_16px_36px_-12px_rgba(18,48,31,0.8)]",
  outline:
    "border border-ink/30 text-ink hover:border-ink hover:bg-ink hover:text-cream disabled:opacity-50",
  "outline-light":
    "border border-cream/40 text-cream hover:border-gold hover:text-gold disabled:opacity-50",
  ghost: "text-taupe hover:text-ink",
};

export function Button({
  children,
  href,
  onClick,
  variant = "primary",
  size = "md",
  type = "button",
  disabled,
  className = "",
  fullWidth,
}: ButtonProps) {
  const cls = `${base} ${sizes[size]} ${variants[variant]} ${
    fullWidth ? "w-full" : ""
  } ${className}`;
  if (href) {
    return (
      <Link href={href} onClick={onClick} className={cls}>
        {children}
      </Link>
    );
  }
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={cls}
    >
      {children}
    </button>
  );
}
