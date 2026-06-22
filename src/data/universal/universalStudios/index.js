import { universalStudiosAreas } from "./areas.js";
import { universalStudiosAttractions } from "./attractions.js";
import { universalStudiosDining } from "./dining.js";

export {
  universalStudiosAreas,
  universalStudiosAttractions,
  universalStudiosDining,
};

export const universalStudiosItems = [
  ...universalStudiosAttractions,
  ...universalStudiosDining,
];

export const universalStudiosPark = {
  id: "universal-studios-florida",
  name: "Universal Studios Florida",
  resort: "Universal",
  areas: universalStudiosAreas,
  items: universalStudiosItems,
};
