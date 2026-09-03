import { IMAGES } from "@/lib/data/images";
import type { DictKey } from "@/lib/i18n";

export interface EditorialItem {
  id: string;
  image: keyof typeof IMAGES;
  captionKey: DictKey;
  tagKey: DictKey;
}

export const EDITORIAL_GRID: EditorialItem[] = [
  { id: "e1", image: "editLarge", tagKey: "editorial.e1.tag", captionKey: "editorial.e1.caption" },
  { id: "e2", image: "editA", tagKey: "editorial.e2.tag", captionKey: "editorial.e2.caption" },
  { id: "e3", image: "editB", tagKey: "editorial.e3.tag", captionKey: "editorial.e3.caption" },
  { id: "e4", image: "editC", tagKey: "editorial.e4.tag", captionKey: "editorial.e4.caption" },
  { id: "e5", image: "editD", tagKey: "editorial.e5.tag", captionKey: "editorial.e5.caption" },
];
