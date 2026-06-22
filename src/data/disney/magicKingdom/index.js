import { magicKingdomAreas } from "./areas";
import { magicKingdomAttractions } from "./attractions";
import { magicKingdomDining } from "./dining";

export { magicKingdomAreas, magicKingdomAttractions, magicKingdomDining };

export const magicKingdomItems = [
  ...magicKingdomAttractions,
  ...magicKingdomDining,
];

export const magicKingdomPark = {
  id: "magic-kingdom",
  name: "Magic Kingdom",
  resort: "Disney",
  areas: magicKingdomAreas,
  items: magicKingdomItems,
};
