import { animalKingdomAreas } from "./areas.js";
import { animalKingdomAttractions } from "./attractions.js";
import { animalKingdomDining } from "./dining.js";

export {
  animalKingdomAreas,
  animalKingdomAttractions,
  animalKingdomDining,
};

export const animalKingdomItems = [
  ...animalKingdomAttractions,
  ...animalKingdomDining,
];

export const animalKingdomPark = {
  id: "animal-kingdom",
  name: "Animal Kingdom",
  resort: "Disney",
  areas: animalKingdomAreas,
  items: animalKingdomItems,
};
