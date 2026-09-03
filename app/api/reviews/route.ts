/*
  GET /api/reviews — live Google reviews for the Saroj Ensemble Google
  Business Profile.

  The Place ID is centralized in lib/data/google.ts so switching from the
  temporary Goregaon listing to the Juhu flagship is a one-line change
  (GOOGLE_PLACE_ID env var or the default below) — the component needs
  no redesign.

  Filtering (as required):
    - rating === 5 stars
    - review text ≥ 50 characters
    - maximum 5 reviews returned (no padding with fake data)

  Required configuration:
    GOOGLE_PLACES_API_KEY  — Google Cloud API key with Places API (New) enabled
    GOOGLE_PLACE_ID        — optional; overrides the default place

  Without the key this route answers { configured: false, missing: [...] }
  and the UI shows a clear configuration notice — it never fabricates
  reviews.
*/

import { NextResponse } from "next/server";
import { DEFAULT_PLACE_ID, GOOGLE_PLACES_API_URL } from "@/lib/data/google";

export const dynamic = "force-dynamic";

const MIN_STARS = 5;
const MIN_TEXT_LENGTH = 50;
const MAX_REVIEWS = 5;

export interface GoogleReviewOut {
  id: string;
  name: string;
  initials: string;
  text: string;
  stars: number;
  relativeTime: string | null;
}

export interface ReviewsResponse {
  configured: boolean;
  missing?: string[];
  error?: string;
  place?: { name: string; rating: number | null; total: number | null };
  reviews?: GoogleReviewOut[];
}

function initialsOf(name: string): string {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase() ?? "")
    .join("");
}

function relativeTime(when: string | null | undefined): string | null {
  if (!when) return null;
  const ms = Date.now() - new Date(when).getTime();
  if (Number.isNaN(ms) || ms < 0) return null;
  const days = Math.floor(ms / 86_400_000);
  if (days <= 0) return "today";
  if (days === 1) return "yesterday";
  if (days < 7) return `${days} days ago`;
  if (days < 30) return `${Math.floor(days / 7)} weeks ago`;
  if (days < 365) return `${Math.floor(days / 30)} months ago`;
  return `${Math.floor(days / 365)} years ago`;
}

export async function GET() {
  const apiKey = process.env.GOOGLE_PLACES_API_KEY;
  const placeId = process.env.GOOGLE_PLACE_ID ?? DEFAULT_PLACE_ID;

  if (!apiKey) {
    return NextResponse.json(
      {
        configured: false,
        missing: ["GOOGLE_PLACES_API_KEY"],
      } satisfies ReviewsResponse,
      { status: 503 },
    );
  }

  const url = `${GOOGLE_PLACES_API_URL}/${encodeURIComponent(placeId)}`;
  try {
    const res = await fetch(url, {
      headers: {
        "X-Goog-Api-Key": apiKey,
        "X-Goog-FieldMask":
          "id,displayName,rating,userRatingCount,reviews.text,reviews.rating,reviews.authorAttribution,reviews.relativePublishTimeDescription",
        "Content-Type": "application/json",
      },
      next: { revalidate: 3600 },
    });

    if (!res.ok) {
      return NextResponse.json(
        {
          configured: true,
          error: `Google Places API responded ${res.status}`,
        } satisfies ReviewsResponse,
        { status: 502 },
      );
    }

    const json = (await res.json()) as {
      displayName?: { text?: string };
      rating?: number;
      userRatingCount?: number;
      reviews?: Array<{
        text?: { text?: string };
        rating?: number;
        authorAttribution?: { displayName?: string };
        relativePublishTimeDescription?: string;
      }>;
    };

    /* Filter: exactly 5 stars, ≥50 characters, then cap at 5. */
    const qualifying = (json.reviews ?? [])
      .filter((r) => r.rating === MIN_STARS)
      .filter((r) => (r.text?.text?.length ?? 0) >= MIN_TEXT_LENGTH)
      .slice(0, MAX_REVIEWS)
      .map((r): GoogleReviewOut => {
        const name = r.authorAttribution?.displayName ?? "Google user";
        return {
          id: `${name}-${r.relativePublishTimeDescription ?? "review"}`,
          name,
          initials: initialsOf(name),
          text: r.text!.text!,
          stars: r.rating ?? MIN_STARS,
          relativeTime: relativeTime(r.relativePublishTimeDescription),
        };
      });

    return NextResponse.json({
      configured: true,
      place: {
        name: json.displayName?.text ?? "Saroj Ensemble",
        rating: typeof json.rating === "number" ? json.rating : null,
        total: typeof json.userRatingCount === "number" ? json.userRatingCount : null,
      },
      reviews: qualifying,
    } satisfies ReviewsResponse);
  } catch {
    return NextResponse.json(
      {
        configured: true,
        error: "Could not reach the Google Places API",
      } satisfies ReviewsResponse,
      { status: 502 },
    );
  }
}
