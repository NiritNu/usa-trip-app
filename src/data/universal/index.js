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

import {
  epicUniverseAreas,
  epicUniverseAttractions,
  epicUniverseDining,
  epicUniverseItems,
  epicUniversePark,
} from "./epicUniverse/index.js";

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

  epicUniverseAreas,
  epicUniverseAttractions,
  epicUniverseDining,
  epicUniverseItems,
  epicUniversePark,
};

export const universalParks = [
  universalStudiosPark,
  islandsOfAdventurePark,
  epicUniversePark,
];

export const universalItems = universalParks.flatMap((park) => park.items);
