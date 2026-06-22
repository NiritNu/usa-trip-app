import { islandsOfAdventureAreas } from "./areas.js";
import { islandsOfAdventureAttractions } from "./attractions.js";
import { islandsOfAdventureDining } from "./dining.js";

export {
  islandsOfAdventureAreas,
  islandsOfAdventureAttractions,
  islandsOfAdventureDining,
};

export const islandsOfAdventureItems = [
  ...islandsOfAdventureAttractions,
  ...islandsOfAdventureDining,
];

export const islandsOfAdventurePark = {
  id: "islands-of-adventure",
  name: "Islands of Adventure",
  resort: "Universal",
  areas: islandsOfAdventureAreas,
  items: islandsOfAdventureItems,
};
