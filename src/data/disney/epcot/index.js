import { epcotAreas } from "./areas.js";
import { epcotAttractions } from "./attractions.js";
import { epcotDining } from "./dining.js";

export { epcotAreas, epcotAttractions, epcotDining };

export const epcotItems = [
  ...epcotAttractions,
  ...epcotDining,
];

export const epcotPark = {
  id: "epcot",
  name: "EPCOT",
  resort: "Disney",
  areas: epcotAreas,
  items: epcotItems,
};