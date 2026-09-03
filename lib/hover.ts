/*
  Hover-capability detection — used to keep desktop-only hover gestures
  (hover-intent quick-view, mini-cart hover preview) from firing on touch
  devices, where browsers synthesize a transient "hover" before the tap
  and would otherwise flicker an overlay or require a second tap.

  CSS-side, the eye icon visibility uses `[@media(hover:hover)...]`
  variants so coarse-pointer devices always see it (no JS state, no
  hydration mismatch).
*/

export function hoverEnabled(): boolean {
  if (typeof window === "undefined" || typeof window.matchMedia !== "function") {
    return false;
  }
  try {
    return window.matchMedia("(hover: hover) and (pointer: fine)").matches;
  } catch {
    return false;
  }
}