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
};

const animalKingdomPark = {
  id: "animal-kingdom",
  name: "Animal Kingdom",
  resort: "Disney",
  areas: [
    {
      id: "oasis",
      name: "Oasis",
      hebrewName: "אואזיס",
      park: "Animal Kingdom",
      resort: "Disney",
      nearbyAreas: ["discovery-island"],
    },
    {
      id: "discovery-island",
      name: "Discovery Island",
      hebrewName: "דיסקברי איילנד",
      park: "Animal Kingdom",
      resort: "Disney",
      nearbyAreas: ["oasis", "pandora", "africa", "asia"],
    },
    {
      id: "pandora",
      name: "Pandora - The World of Avatar",
      hebrewName: "פנדורה",
      park: "Animal Kingdom",
      resort: "Disney",
      nearbyAreas: ["discovery-island", "africa"],
    },
    {
      id: "africa",
      name: "Africa",
      hebrewName: "אפריקה",
      park: "Animal Kingdom",
      resort: "Disney",
      nearbyAreas: ["discovery-island", "pandora", "asia"],
    },
    {
      id: "asia",
      name: "Asia",
      hebrewName: "אסיה",
      park: "Animal Kingdom",
      resort: "Disney",
      nearbyAreas: ["discovery-island", "africa", "dinoland-usa"],
    },
    {
      id: "dinoland-usa",
      name: "DinoLand U.S.A.",
      hebrewName: "דינולנד",
      park: "Animal Kingdom",
      resort: "Disney",
      nearbyAreas: ["asia", "discovery-island"],
    },
  ],
  items: [],
};

export const disneyParks = [
  magicKingdomPark,
  epcotPark,
  hollywoodStudiosPark,
  animalKingdomPark,
];

export const disneyItems = disneyParks.flatMap((park) => park.items);
