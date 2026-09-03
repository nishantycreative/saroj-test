import { IMAGES } from "@/lib/data/images";
import type { DictKey } from "@/lib/i18n";

/*
  THE MAKING OF OUR FABRIC — 4-stage homepage story (dark green).

  Real-image policy: every stage uses a genuine Saroj / client image from
  public/images/. Dedicated process photography is not yet in the asset
  set, so the closest genuine Saroj image is used per stage and flagged —
  swap in the client's sourcing/mill/workshop photos by changing the
  `image` key only (no component changes).

  Current image status:
    - 01 Sourcing           → storytelling2.
    - 02 Spinning & Weaving  → storytelling3.
    - 03 Dyeing & Finishing  → storytelling4.
    - 04 Final Product       → storytelling5.
*/

export interface FabricStoryStage {
  /** rendered as-is: "01"–"04" */
  number: "01" | "02" | "03" | "04";
  titleKey: DictKey;
  copyKey: DictKey;
  image: keyof typeof IMAGES;
}

export const FABRIC_STORY_STAGES: FabricStoryStage[] = [
  {
    number: "01",
    titleKey: "fabricStory.s1.title",
    copyKey: "fabricStory.s1.copy",
    image: "storytelling2",
  },
  {
    number: "02",
    titleKey: "fabricStory.s2.title",
    copyKey: "fabricStory.s2.copy",
    image: "storytelling3",
  },
  {
    number: "03",
    titleKey: "fabricStory.s3.title",
    copyKey: "fabricStory.s3.copy",
    image: "storytelling4",
  },
  {
    number: "04",
    titleKey: "fabricStory.s4.title",
    copyKey: "fabricStory.s4.copy",
    image: "storytelling5",
  },
];
