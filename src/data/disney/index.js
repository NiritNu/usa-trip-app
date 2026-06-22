import {
  magicKingdomAreas,
  magicKingdomAttractions,
  magicKingdomDining,
  magicKingdomItems,
  magicKingdomPark,
} from "./magicKingdom/index.js";

import {
  epcotAreas,
  epcotAttractions,
  epcotDining,
  epcotItems,
  epcotPark,
} from "./epcot/index.js";

import {
  hollywoodStudiosAreas,
  hollywoodStudiosAttractions,
  hollywoodStudiosDining,
  hollywoodStudiosItems,
  hollywoodStudiosPark,
} from "./hollywoodStudios/index.js";

import {
  animalKingdomAreas,
  animalKingdomAttractions,
  animalKingdomDining,
  animalKingdomItems,
  animalKingdomPark,
} from "./animalKingdom/index.js";

export {
  magicKingdomAreas,
  magicKingdomAttractions,
  magicKingdomDining,
  magicKingdomItems,
  magicKingdomPark,

  epcotAreas,
  epcotAttractions,
  epcotDining,
  epcotItems,
  epcotPark,

  hollywoodStudiosAreas,
  hollywoodStudiosAttractions,
  hollywoodStudiosDining,
  hollywoodStudiosItems,
  hollywoodStudiosPark,

  animalKingdomAreas,
  animalKingdomAttractions,
  animalKingdomDining,
  animalKingdomItems,
  animalKingdomPark,
};

export const disneyParks = [
  magicKingdomPark,
  epcotPark,
  hollywoodStudiosPark,
  animalKingdomPark,
];

export const disneyItems = disneyParks.flatMap((park) => park.items);
