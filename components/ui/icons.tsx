/*
  Minimal 1.5px-stroke line icons — the only iconography on the site.
  Gold only where the design system calls for it (active states, accents).
*/

import type { SVGProps } from "react";

type P = SVGProps<SVGSVGElement>;

const base = (props: P) => ({
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  viewBox: "0 0 24 24",
  "aria-hidden": true,
  ...props,
});

export const IconSearch = (p: P) => (
  <svg {...base(p)}>
    <circle cx="11" cy="11" r="7" />
    <path d="m20 20-3.8-3.8" />
  </svg>
);

export const IconUser = (p: P) => (
  <svg {...base(p)}>
    <circle cx="12" cy="8" r="4" />
    <path d="M4 21c1.2-3.6 4.2-5.5 8-5.5s6.8 1.9 8 5.5" />
  </svg>
);

export const IconHeart = (p: P) => (
  <svg {...base(p)}>
    <path d="M12 20.3s-7.5-4.6-9.3-9.2C1.5 7.6 3.7 4.8 6.7 4.8c2 0 3.6 1.1 4.3 2.6h2c.7-1.5 2.3-2.6 4.3-2.6 3 0 5.2 2.8 4 6.3-1.8 4.6-9.3 9.2-9.3 9.2Z" />
  </svg>
);

export const IconEye = (p: P) => (
  <svg {...base(p)}>
    <path d="M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12Z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

export const IconBag = (p: P) => (
  <svg {...base(p)}>
    <path d="M6 8h12l1 12.5H5L6 8Z" />
    <path d="M9 10.5V6a3 3 0 0 1 6 0v4.5" />
  </svg>
);

export const IconMenu = (p: P) => (
  <svg {...base(p)}>
    <path d="M3 6.5h18M3 12h18M3 17.5h10" />
  </svg>
);

export const IconClose = (p: P) => (
  <svg {...base(p)}>
    <path d="m5 5 14 14M19 5 5 19" />
  </svg>
);

export const IconChevron = ({ dir = "down", ...p }: P & { dir?: "up" | "down" | "left" | "right" }) => (
  <svg {...base(p)} style={{ transform: `rotate(${dir === "up" ? 180 : dir === "right" ? -90 : dir === "left" ? 90 : 0}deg)` }}>
    <path d="m6 9 6 6 6-6" />
  </svg>
);

export const IconArrowRight = (p: P) => (
  <svg {...base(p)}>
    <path d="M4 12h16m-6-6 6 6-6 6" />
  </svg>
);

export const IconStar = (p: P) => (
  <svg {...base(p)} fill="currentColor" stroke="none">
    <path d="m12 3 2.6 5.6 6.1.7-4.5 4.2 1.2 6-5.4-3-5.4 3 1.2-6L3.3 9.3l6.1-.7L12 3Z" />
  </svg>
);

export const IconGlobe = (p: P) => (
  <svg {...base(p)}>
    <circle cx="12" cy="12" r="9" />
    <path d="M3 12h18M12 3c2.6 2.4 3.9 5.6 3.9 9S14.6 18.6 12 21c-2.6-2.4-3.9-5.6-3.9-9S9.4 5.4 12 3Z" />
  </svg>
);

export const IconPlus = (p: P) => (
  <svg {...base(p)}>
    <path d="M12 5v14M5 12h14" />
  </svg>
);

export const IconMinus = (p: P) => (
  <svg {...base(p)}>
    <path d="M5 12h14" />
  </svg>
);

export const IconCheck = (p: P) => (
  <svg {...base(p)}>
    <path d="m4.5 12.5 5 5 10-11" />
  </svg>
);

export const IconTruck = (p: P) => (
  <svg {...base(p)}>
    <path d="M2 6h12v11H2zM14 10h4.5L21 13v4h-7" />
    <circle cx="6.5" cy="17.5" r="1.8" />
    <circle cx="17" cy="17.5" r="1.8" />
  </svg>
);

export const IconReturns = (p: P) => (
  <svg {...base(p)}>
    <path d="M4 10a8 8 0 1 1 2.3 6.3M4 10V5m0 5h5" />
    <path d="m13 9 2 2 4-4" />
  </svg>
);

export const IconLock = (p: P) => (
  <svg {...base(p)}>
    <rect x="5" y="10.5" width="14" height="9.5" rx="0.5" />
    <path d="M8 10.5V7.8a4 4 0 0 1 8 0v2.7" />
  </svg>
);

export const IconClock = (p: P) => (
  <svg {...base(p)}>
    <circle cx="12" cy="12" r="8.5" />
    <path d="M12 7.5V12l3 2" />
  </svg>
);

export const IconCraft = (p: P) => (
  <svg {...base(p)}>
    <path d="M12 3 4 6.5v5C4 16 7.4 19.8 12 21c4.6-1.2 8-5 8-9.5v-5L12 3Z" />
    <path d="m8.5 12 2.4 2.4 4.6-4.8" />
  </svg>
);

export const IconWhatsApp = (p: P) => (
  <svg {...base(p)} stroke="none" fill="currentColor">
    <path d="M12 2a10 10 0 0 0-8.6 15L2 22l5.2-1.4A10 10 0 1 0 12 2Zm5.2 14.2c-.2.6-1.2 1.2-1.7 1.2-.4.1-1 .1-1.6-.1a13 13 0 0 1-1.5-.6c-2.5-1.1-4.1-3.6-4.2-3.8-.1-.2-1-1.4-1-2.6s.6-1.8.9-2.1c.2-.2.5-.3.7-.3h.5c.2 0 .4 0 .6.4l.9 2.1c.1.2.1.4 0 .6l-.4.6-.5.5c-.2.2-.3.3-.1.6.2.3.9 1.4 1.9 2.3 1.3 1.1 2.4 1.5 2.7 1.6.3.1.5.1.7-.1l1-1.2c.2-.3.4-.2.7-.1l2 1c.3.1.5.2.6.4.1.1.1.7-.2 1.3Z" />
  </svg>
);

export const IconInstagram = (p: P) => (
  <svg {...base(p)}>
    <rect x="3.5" y="3.5" width="17" height="17" rx="4" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.2" cy="6.8" r="0.8" fill="currentColor" stroke="none" />
  </svg>
);

export const IconFacebook = (p: P) => (
  <svg {...base(p)}>
    <path d="M14.5 8.5H17V5h-2.5a3.5 3.5 0 0 0-3.5 3.5V11H8.5v3.5H11V21h3.5v-6.5H17L17.5 11h-3v-2a.5.5 0 0 1 .5-.5Z" />
  </svg>
);

export const IconPinterest = (p: P) => (
  <svg {...base(p)}>
    <circle cx="12" cy="12" r="9" />
    <path d="M10 20.5c.6-2.4 1.7-6.6 1.7-6.6" />
    <path d="M9.2 13.4c-.7-1.2-.6-3 .5-4.1 1.1-1.1 2.9-1.4 4.3-.7 1.5.7 2.3 2.2 2.1 3.9-.2 1.8-1 3.4-2.6 3.9-1 .3-1.9-.1-2.3-.9" />
  </svg>
);

export const IconYouTube = (p: P) => (
  <svg {...base(p)}>
    <rect x="3" y="6" width="18" height="12" rx="3" />
    <path d="m10.5 9.5 4.5 2.5-4.5 2.5v-5Z" fill="currentColor" stroke="none" />
  </svg>
);

/* Google "G" — used only in the reviews block */
export const IconGoogle = (p: P) => (
  <svg {...base(p)} stroke="none" viewBox="0 0 24 24">
    <path
      fill="#4285F4"
      d="M21.6 12.2c0-.7-.1-1.4-.2-2H12v3.9h5.4a4.5 4.5 0 0 1-1.9 2.9v2.5h3.1c1.8-1.7 3-4.1 3-7.3Z"
    />
    <path
      fill="#34A853"
      d="M12 22c2.7 0 5-.9 6.6-2.4l-3.1-2.5c-.9.6-2 1-3.5 1-2.6 0-4.9-1.8-5.7-4.2H3.1v2.6A10 10 0 0 0 12 22Z"
    />
    <path
      fill="#FBBC05"
      d="M6.3 13.9a6 6 0 0 1 0-3.8V7.5H3.1a10 10 0 0 0 0 9l3.2-2.6Z"
    />
    <path
      fill="#EA4335"
      d="M12 5.9c1.5 0 2.8.5 3.8 1.5l2.8-2.8A10 10 0 0 0 3.1 7.5l3.2 2.6c.8-2.4 3.1-4.2 5.7-4.2Z"
    />
  </svg>
);
