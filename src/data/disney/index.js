import {
  magicKingdomAreas,
  magicKingdomAttractions,
  magicKingdomDining,
  magicKingdomItems,
  magicKingdomPark,
} from "./magicKingdom";

import {
  epcotAreas,
  epcotAttractions,
  epcotDining,
  epcotItems,
  epcotPark,
} from "./epcot";

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
};

const hollywoodStudiosPark = {
  id: "hollywood-studios",
  name: "Hollywood Studios",
  resort: "Disney",
  areas: [
    {
      id: "hollywood-boulevard",
      name: "Hollywood Boulevard",
      hebrewName: "הוליווד בולברד",
      park: "Hollywood Studios",
      resort: "Disney",
      nearbyAreas: ["echo-lake", "animation-courtyard"],
    },
    {
      id: "echo-lake",
      name: "Echo Lake",
      hebrewName: "אקו לייק",
      park: "Hollywood Studios",
      resort: "Disney",
      nearbyAreas: ["hollywood-boulevard", "grand-avenue"],
    },
    {
      id: "grand-avenue",
      name: "Grand Avenue",
      hebrewName: "גרנד אווניו",
      park: "Hollywood Studios",
      resort: "Disney",
      nearbyAreas: ["echo-lake", "star-wars-galaxys-edge"],
    },
    {
      id: "star-wars-galaxys-edge",
      name: "Star Wars: Galaxy's Edge",
      hebrewName: "סטאר וורס",
      park: "Hollywood Studios",
      resort: "Disney",
      nearbyAreas: ["grand-avenue", "toy-story-land"],
    },
    {
      id: "toy-story-land",
      name: "Toy Story Land",
      hebrewName: "צעצוע של סיפור",
      park: "Hollywood Studios",
      resort: "Disney",
      nearbyAreas: ["star-wars-galaxys-edge", "animation-courtyard"],
    },
    {
      id: "animation-courtyard",
      name: "Animation Courtyard",
      hebrewName: "אנימיישן קורטיארד",
      park: "Hollywood Studios",
      resort: "Disney",
      nearbyAreas: ["hollywood-boulevard", "toy-story-land", "sunset-boulevard"],
    },
    {
      id: "sunset-boulevard",
      name: "Sunset Boulevard",
      hebrewName: "סאנסט בולברד",
      park: "Hollywood Studios",
      resort: "Disney",
      nearbyAreas: ["animation-courtyard", "hollywood-boulevard"],
    },
  ],
  items: [],
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