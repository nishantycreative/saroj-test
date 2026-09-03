/*
  Google Places configuration — single source of truth for the business
  listing used by /api/reviews.

  Temporary: Goregaon store (per client instruction). The Juhu flagship
  Place ID can be dropped in below (or via GOOGLE_PLACE_ID env) with no
  other changes anywhere.

  Goregaon listing: https://maps.app.goo.gl/5m7yXq6rVi29UWbw6
  Place ID (ftid from the official short link): 0x3be7b70016f3eb23:0xfdacc5a4bf47a6ca
*/

export const GOOGLE_PLACES_API_URL =
  "https://places.googleapis.com/v1/places";

export const DEFAULT_PLACE_ID = "0x3be7b70016f3eb23:0xfdacc5a4bf47a6ca";

/* TODO(juhu): replace with the Juhu flagship Place ID when provided */
export const JUHU_PLACE_ID = "";
