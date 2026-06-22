import { epicUniverseAreas } from "./areas.js";
import { epicUniverseAttractions } from "./attractions.js";
import { epicUniverseDining } from "./dining.js";

export {
  epicUniverseAreas,
  epicUniverseAttractions,
  epicUniverseDining,
};

export const epicUniverseItems = [
  ...epicUniverseAttractions,
  ...epicUniverseDining,
];

export const epicUniversePark = {
  id: "epic-universe",
  name: "Epic Universe",
  resort: "Universal",
  areas: epicUniverseAreas,
  items: epicUniverseItems,
};
