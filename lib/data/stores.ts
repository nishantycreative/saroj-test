import { IMAGES } from "@/lib/data/images";

/*
  Saroj Ensemble stores — all 5 Mumbai locations (confirmed via Google
  Business listings).

  Source: client-provided store table (Round 3):
    - Hours shown are current closing times only. TODO(open-item): pull
      the full daily opening/closing schedule from each Google Business
      listing for the store pages.
    - Ghatkopar & Thane support WhatsApp — surface a WhatsApp CTA there.
    - Juhu is newly listed (no rating yet).

  Store photography is still placeholder (TODO_CLIENT_IMAGE) — real
  per-store photos pending from the client.
*/

export interface Store {
  id: string;
  /** URL slug for /stores/[slug] */
  slug: string;
  neighbourhood: string;
  address: string;
  /** full daily timings, e.g. "10:30 am – 8:30 pm" */
  hours: string;
  /** contact / tel number for display, e.g. "+91 80979 09904" */
  phone?: string;
  /** WhatsApp number (present = WhatsApp supported), e.g. "8097909904" */
  whatsapp?: string;
  rating?: number;
  reviewCount?: number;
  image: keyof typeof IMAGES;
  /** Google Maps search URL built from the real address */
  directionsUrl: string;
  /** keyless Google Maps embed */
  embedUrl: string;
}

const mapsUrl = (address: string) =>
  `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    `Saroj Ensemble ${address}`,
  )}`;

const embedUrl = (address: string) =>
  `https://www.google.com/maps?q=${encodeURIComponent(
    `Saroj Ensemble ${address}`,
  )}&output=embed`;

export const STORES: Store[] = [
  {
    id: "ghatkopar",
    slug: "ghatkopar",
    neighbourhood: "Ghatkopar",
    address:
      "Krish Residency, Plot No 37/B, Tilak Rd, Near Balaji Temple, Raja Wadi, Maheshwar Nagar, Sindhu Wadi, Ghatkopar East, Mumbai 400077",
    hours: "10:30 am – 8:30 pm",
    phone: "+91 80979 09904",
    whatsapp: "8097909904",
    rating: 4.4,
    reviewCount: 970,
    image: "storeFlagship",
    directionsUrl: mapsUrl("Krish Residency, Tilak Rd, Ghatkopar East, Mumbai 400077"),
    embedUrl: embedUrl("Krish Residency, Tilak Rd, Ghatkopar East, Mumbai 400077"),
  },
  {
    id: "nepean-sea-road",
    slug: "nepean-sea-road",
    neighbourhood: "Nepean Sea Road",
    address:
      "Shop No 5, Chandralok A, Wing 97, Nepean Sea Rd, Vasant Vihar, Malabar Hill, Mumbai 400006",
    hours: "10:30 am – 8:30 pm",
    phone: "+91 77381 79175",
    whatsapp: "7738179175",
    rating: 4.5,
    reviewCount: 66,
    image: "storeMumbai",
    directionsUrl: mapsUrl("Chandralok A, Wing 97, Nepean Sea Rd, Mumbai 400006"),
    embedUrl: embedUrl("Chandralok A, Wing 97, Nepean Sea Rd, Mumbai 400006"),
  },
  {
    id: "thane",
    slug: "thane",
    neighbourhood: "Thane",
    address:
      "Giri Vihar, Ram Maruti Road, Cross Lane No 2, Near Rajmata Vadapav, Thane West, Mumbai 400602",
    hours: "10:30 am – 8:30 pm",
    phone: "+91 83568 90755",
    whatsapp: "8356890755",
    rating: 4.1,
    reviewCount: 333,
    image: "storeJaipur",
    directionsUrl: mapsUrl("Giri Vihar, Ram Maruti Road, Thane West, Mumbai 400602"),
    embedUrl: embedUrl("Giri Vihar, Ram Maruti Road, Thane West, Mumbai 400602"),
  },
  {
    id: "goregaon",
    slug: "goregaon",
    neighbourhood: "Goregaon",
    address:
      "Asmi Dreamz, Shop No 3, Junction of SV Road & Mahatma Gandhi Rd, Opp. Ratna Hotel, Goregaon West, Mumbai",
    hours: "10:30 am – 8:30 pm",
    phone: "+91 87790 90494",
    whatsapp: "8779090494",
    rating: 4.9,
    reviewCount: 2031,
    image: "storeBengaluru",
    directionsUrl: mapsUrl("Asmi Dreamz, Shop No 3, SV Road, Goregaon West, Mumbai"),
    embedUrl: embedUrl("Asmi Dreamz, Shop No 3, SV Road, Goregaon West, Mumbai"),
  },
  {
    id: "juhu",
    slug: "juhu",
    neighbourhood: "Juhu",
    address:
      "Shop Number 4, Notan House, Plot No. U-6, Vaikunthlal Mehta Rd, Next to Juhu Police Station, Yamuna Nagar, Nehru Nagar, JVPD",
    hours: "10:30 am – 8:30 pm",
    phone: "+91 80979 09904",
    image: "storeHyderabad",
    directionsUrl: mapsUrl("Notan House, Vaikunthlal Mehta Rd, JVPD, Juhu, Mumbai"),
    embedUrl: embedUrl("Notan House, Vaikunthlal Mehta Rd, JVPD, Juhu, Mumbai"),
  },
];

/** Site-wide contact details (footer, contact page). */
export const STORE_CONTACT = {
  email: "sarojensemble@gmail.com",
  phone: "+91 80979 09904",
} as const;
