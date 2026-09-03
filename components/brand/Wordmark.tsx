import Image from "next/image";

interface WordmarkProps {
  size?: "sm" | "lg";
}

/*
  Brand wordmark. Always renders the native green logo PNG — never
  recolored, no variants. Sizes were increased 20% from the previous
  dimensions; on mobile the logo is shown 10% smaller (responsive
  width, h-auto keeps the native aspect ratio).
*/

export function Wordmark({ size = "sm" }: WordmarkProps) {
  const base = size === "lg" ? 86 : 72;
  const height = size === "lg" ? 23 : 19;
  /* 10% smaller on mobile (base × 0.9), full size from lg up */
  const widthClass =
    size === "lg"
      ? "w-[77.4px] lg:w-[86px]"
      : "w-[64.8px] lg:w-[72px]";

  return (
    <div className="flex shrink-0 items-center">
      <Image
        src="/images/saroj-logo-full-green.png"
        alt="Saroj Ensemble"
        width={base}
        height={height}
        className={`h-auto ${widthClass}`}
        priority
      />
    </div>
  );
}
