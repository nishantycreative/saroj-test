/*
  GET /api/instagram — latest 6 posts from @sarojensembleofficial.

  Live integration via the Instagram Graph API (Meta). Required config:
    INSTAGRAM_ACCESS_TOKEN — long-lived access token for a Meta app with
      instagram_basic / instagram_content_publish scopes and the business
      Instagram account connected.
    INSTAGRAM_USER_ID     — the Instagram Business Account ID (numeric,
      from GET /me/accounts?fields=instagram_business_account on Graph API).

  Without credentials the route answers { configured: false, missing: [...] }
  and the UI shows a configuration notice — it never renders fake posts.

  Response posts:
    { id, caption, mediaUrl, permalink, thumbnailUrl, timestamp }
*/

import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

const INSTAGRAM_API_BASE = "https://graph.instagram.com/v21.0";
const POST_COUNT = 6;

export interface InstagramPost {
  id: string;
  caption: string | null;
  mediaUrl: string;
  permalink: string;
  thumbnailUrl: string | null;
  timestamp: string | null;
}

export interface InstagramResponse {
  configured: boolean;
  missing?: string[];
  error?: string;
  posts?: InstagramPost[];
}

function captionOf(text: string | null | undefined, limit = 140): string | null {
  if (!text) return null;
  const trimmed = text.trim();
  if (!trimmed) return null;
  return trimmed.length > limit ? `${trimmed.slice(0, limit)}…` : trimmed;
}

export async function GET() {
  const token = process.env.INSTAGRAM_ACCESS_TOKEN;
  const userId = process.env.INSTAGRAM_USER_ID;

  const missing: string[] = [];
  if (!token) missing.push("INSTAGRAM_ACCESS_TOKEN");
  if (!userId) missing.push("INSTAGRAM_USER_ID");

  if (missing.length > 0) {
    return NextResponse.json(
      { configured: false, missing } satisfies InstagramResponse,
      { status: 503 },
    );
  }

  const fields = [
    "id",
    "caption",
    "media_url",
    "permalink",
    "thumbnail_url",
    "timestamp",
    "media_type",
  ].join(",");

  const url = `${INSTAGRAM_API_BASE}/${userId}/media?fields=${fields}&limit=${POST_COUNT}&access_token=${encodeURIComponent(token!)}`;

  try {
    const res = await fetch(url, { next: { revalidate: 900 } });
    if (!res.ok) {
      return NextResponse.json(
        { configured: true, error: `Instagram Graph API responded ${res.status}` } satisfies InstagramResponse,
        { status: 502 },
      );
    }
    const json = (await res.json()) as {
      data?: Array<{
        id: string;
        caption?: string;
        media_url?: string;
        permalink?: string;
        thumbnail_url?: string;
        timestamp?: string;
      }>;
    };

    const posts = (json.data ?? []).slice(0, POST_COUNT).map((m) => ({
      id: m.id,
      caption: captionOf(m.caption),
      mediaUrl: m.media_url ?? "",
      permalink: m.permalink ?? `https://www.instagram.com/sarojensembleofficial/`,
      thumbnailUrl: m.thumbnail_url ?? null,
      timestamp: m.timestamp ?? null,
    })) as InstagramPost[];

    return NextResponse.json({
      configured: true,
      posts,
    } satisfies InstagramResponse);
  } catch {
    return NextResponse.json(
      { configured: true, error: "Could not reach the Instagram Graph API" } satisfies InstagramResponse,
      { status: 502 },
    );
  }
}
