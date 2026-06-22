import { hollywoodStudiosAreas } from "./areas.js";
import { hollywoodStudiosAttractions } from "./attractions.js";
import { hollywoodStudiosDining } from "./dining.js";

export {
  hollywoodStudiosAreas,
  hollywoodStudiosAttractions,
  hollywoodStudiosDining,
};

export const hollywoodStudiosItems = [
  ...hollywoodStudiosAttractions,
  ...hollywoodStudiosDining,
];

export const hollywoodStudiosPark = {
  id: "hollywood-studios",
  name: "Hollywood Studios",
  resort: "Disney",
  areas: hollywoodStudiosAreas,
  items: hollywoodStudiosItems,
};
