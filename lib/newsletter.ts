/*
  Newsletter client seam — the single place promo email capture talks to.

  POST /api/newsletter (app/api/newsletter/route.ts) forwards to Klaviyo
  when KLAVIYO_PRIVATE_KEY + KLAVIYO_LIST_ID are configured; otherwise it
  reports `configured: false` and the UI must not claim a subscription
  happened (the coupon code still shows — the offer is site-side).
*/

export interface NewsletterResult {
  /** subscription recorded by the provider */
  ok: boolean;
  /** mailing integration is live (env configured) */
  configured: boolean;
}

export async function subscribeNewsletter(
  email: string,
): Promise<NewsletterResult> {
  try {
    const res = await fetch("/api/newsletter", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });
    if (!res.ok) {
      const json = (await res.json().catch(() => null)) as
        | NewsletterResult
        | null;
      return { ok: false, configured: json?.configured ?? true };
    }
    const json = (await res.json()) as NewsletterResult;
    return { ok: json.ok, configured: json.configured };
  } catch {
    return { ok: false, configured: false };
  }
}
