/*
  Recently-viewed persistence — a tiny localStorage-backed list of product
  ids, newest-first, deduped, capped. Decoupled from the store on purpose so
  it re-renders independently wherever it's placed (PDP recorder + cart-page
  rail). A custom window event notifies subscribed rails of changes.
*/

const KEY = "saroj.recently-viewed.v1";
const MAX = 8;
export const RECENT_EVENT = "saroj:recently-viewed";

export function readRecentIds(): string[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as unknown;
    if (!Array.isArray(parsed)) return [];
    return parsed.filter((x): x is string => typeof x === "string");
  } catch {
    return [];
  }
}

export function writeRecentIds(ids: string[]): string[] {
  const next = ids.slice(0, MAX);
  if (typeof window !== "undefined") {
    try {
      window.localStorage.setItem(KEY, JSON.stringify(next));
      window.dispatchEvent(new Event(RECENT_EVENT));
    } catch {
      /* ignore quota / privacy-mode failures */
    }
  }
  return next;
}

export function recordRecentId(id: string): string[] {
  const ids = readRecentIds().filter((x) => x !== id);
  ids.unshift(id);
  return writeRecentIds(ids);
}

export function subscribeRecent(listener: () => void): () => void {
  window.addEventListener(RECENT_EVENT, listener);
  return () => window.removeEventListener(RECENT_EVENT, listener);
}
