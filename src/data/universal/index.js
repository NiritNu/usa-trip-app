import {
  universalStudiosAreas,
  universalStudiosAttractions,
  universalStudiosDining,
  universalStudiosItems,
  universalStudiosPark,
} from "./universalStudios/index.js";

import {
  islandsOfAdventureAreas,
  islandsOfAdventureAttractions,
  islandsOfAdventureDining,
  islandsOfAdventureItems,
  islandsOfAdventurePark,
} from "./islandsOfAdventure/index.js";

export {
  universalStudiosAreas,
  universalStudiosAttractions,
  universalStudiosDining,
  universalStudiosItems,
  universalStudiosPark,

  islandsOfAdventureAreas,
  islandsOfAdventureAttractions,
  islandsOfAdventureDining,
  islandsOfAdventureItems,
  islandsOfAdventurePark,
};

const epicUniversePark = {
  id: "epic-universe",
  name: "Epic Universe",
  resort: "Universal",
  areas: [],
  items: [],
};

export const universalParks = [
  universalStudiosPark,
  islandsOfAdventurePark,
  epicUniversePark,
];

export const universalItems = universalParks.flatMap((park) => park.items);
