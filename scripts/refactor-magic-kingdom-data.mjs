import fs from "fs";
import path from "path";
import { fileURLToPath, pathToFileURL } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const projectRoot = path.resolve(__dirname, "..");
const oldDataPath = path.join(projectRoot, "src", "data", "attractions.js");

const oldModule = await import(pathToFileURL(oldDataPath).href);
const allItems = oldModule.attractions || [];

const magicKingdomItems = allItems.filter(
  (item) => item.resort === "Disney" && item.park === "Magic Kingdom"
);

const closedOrRemovedNames = new Set([
  "Liberty Square Riverboat",
  "Tom Sawyer Island",
]);

const areaMap = {
  "Main Street, U.S.A.": "main-street",
  "Main Street, U.S.A. / Hub": "main-street",
  "Cinderella Castle / Main Street": "main-street",
  "Parade Route": "main-street",

  Adventureland: "adventureland",
  Frontierland: "frontierland",
  "Liberty Square": "liberty-square",
  Fantasyland: "fantasyland",
  "Storybook Circus": "storybook-circus",
  Tomorrowland: "tomorrowland",
};

const areaDisplayNames = {
  "main-street": "Main Street, U.S.A.",
  adventureland: "Adventureland",
  frontierland: "Frontierland",
  "liberty-square": "Liberty Square",
  fantasyland: "Fantasyland",
  "storybook-circus": "Storybook Circus",
  tomorrowland: "Tomorrowland",
};

const areaHebrewNames = {
  "main-street": "מיין סטריט",
  adventureland: "אדוונצ׳רלנד",
  frontierland: "פרונטירלנד",
  "liberty-square": "ליברטי סקוור",
  fantasyland: "פנטזילנד",
  "storybook-circus": "סטוריבוק סירקס",
  tomorrowland: "טומורולנד",
};

const areaOrder = [
  "main-street",
  "adventureland",
  "frontierland",
  "liberty-square",
  "fantasyland",
  "storybook-circus",
  "tomorrowland",
];

function getAreaId(item) {
  return areaMap[item.area] || slugify(item.area || "unknown");
}

function slugify(value) {
  return String(value)
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function cleanItem(item) {
  const cleaned = {
    ...item,
    areaId: getAreaId(item),
  };

  if (Array.isArray(cleaned.nearby)) {
    cleaned.nearby = cleaned.nearby.filter(
      (name) => !closedOrRemovedNames.has(name)
    );
  }

  return cleaned;
}

function sortByAreaThenPriority(a, b) {
  const areaA = areaOrder.indexOf(a.areaId);
  const areaB = areaOrder.indexOf(b.areaId);

  if (areaA !== areaB) return areaA - areaB;

  const priorityOrder = {
    must_do: 0,
    good_if_time: 1,
    skip_if_busy: 2,
  };

  const priorityA = priorityOrder[a.priority] ?? 99;
  const priorityB = priorityOrder[b.priority] ?? 99;

  if (priorityA !== priorityB) return priorityA - priorityB;

  return a.name.localeCompare(b.name);
}

const activeItems = magicKingdomItems
  .filter((item) => item.id !== "liberty-square-riverboat")
  .filter((item) => item.id !== "tom-sawyer-island")
  .map(cleanItem);

const diningItems = activeItems
  .filter((item) => item.category === "dining")
  .map(enrichDiningItem)
  .sort(sortByAreaThenPriority);

const attractionItems = activeItems
  .filter((item) => item.category !== "dining")
  .sort(sortByAreaThenPriority);

const areas = areaOrder.map((areaId) => ({
  id: areaId,
  name: areaDisplayNames[areaId],
  hebrewName: areaHebrewNames[areaId],
  park: "Magic Kingdom",
  resort: "Disney",
  nearbyAreas: getNearbyAreas(areaId),
}));

function getNearbyAreas(areaId) {
  const nearby = {
    "main-street": ["adventureland", "fantasyland", "tomorrowland"],
    adventureland: ["main-street", "frontierland"],
    frontierland: ["adventureland", "liberty-square"],
    "liberty-square": ["frontierland", "fantasyland"],
    fantasyland: ["liberty-square", "storybook-circus", "tomorrowland"],
    "storybook-circus": ["fantasyland", "tomorrowland"],
    tomorrowland: ["main-street", "fantasyland", "storybook-circus"],
  };

  return nearby[areaId] || [];
}

function enrichDiningItem(item) {
  const diningDefaults = {
    diningType: guessDiningType(item),
    mealUse: guessMealUse(item),
    foodStyle: guessFoodStyle(item),
    kidsFriendly: true,
    mobileOrder: guessMobileOrder(item),
    reservationNeeded: item.waitLevelSeptember === "reservation_based",
  };

  return {
    ...diningDefaults,
    ...item,
  };
}

function guessDiningType(item) {
  if (item.waitLevelSeptember === "reservation_based") return "table_service";
  if (item.name.includes("Tavern")) return "snack";
  if (item.name.includes("Aloha")) return "snack";
  return "quick_service";
}

function guessMealUse(item) {
  const snackNames = ["Gaston", "Aloha", "Sleepy Hollow", "Market"];
  if (snackNames.some((name) => item.name.includes(name))) return "snack";
  if (item.waitLevelSeptember === "reservation_based") return "sit_down";
  return "real_meal";
}

function guessFoodStyle(item) {
  if (item.name.includes("Columbia")) return "fresh_quick";
  if (item.name.includes("Pecos")) return "quick_varied";
  if (item.name.includes("Pinocchio")) return "kids_food";
  if (item.name.includes("Cosmic")) return "kids_food";
  if (item.name.includes("Casey")) return "emergency_kids_food";
  if (item.name.includes("Aloha")) return "dessert";
  if (item.name.includes("Gaston")) return "snack";
  return "quick_service";
}

function guessMobileOrder(item) {
  if (item.waitLevelSeptember === "reservation_based") return false;
  if (item.skipLine?.includes("Mobile Order")) return true;
  return item.category === "dining";
}

function writeJsFile(relativePath, exportName, value) {
  const fullPath = path.join(projectRoot, relativePath);
  fs.mkdirSync(path.dirname(fullPath), { recursive: true });

  const content = `export const ${exportName} = ${JSON.stringify(value, null, 2)};
`;

  fs.writeFileSync(fullPath, content, "utf8");
  console.log(`Wrote ${relativePath}`);
}

writeJsFile(
  path.join("src", "data", "disney", "magicKingdom", "areas.js"),
  "magicKingdomAreas",
  areas
);

writeJsFile(
  path.join("src", "data", "disney", "magicKingdom", "attractions.js"),
  "magicKingdomAttractions",
  attractionItems
);

writeJsFile(
  path.join("src", "data", "disney", "magicKingdom", "dining.js"),
  "magicKingdomDining",
  diningItems
);

writeTextFile(
  path.join("src", "data", "disney", "magicKingdom", "index.js"),
  `import { magicKingdomAreas } from "./areas";
import { magicKingdomAttractions } from "./attractions";
import { magicKingdomDining } from "./dining";

export { magicKingdomAreas, magicKingdomAttractions, magicKingdomDining };

export const magicKingdomItems = [
  ...magicKingdomAttractions,
  ...magicKingdomDining,
];

export const magicKingdomPark = {
  id: "magic-kingdom",
  name: "Magic Kingdom",
  resort: "Disney",
  areas: magicKingdomAreas,
  items: magicKingdomItems,
};
`
);

writeTextFile(
  path.join("src", "data", "disney", "index.js"),
  `import {
  magicKingdomAreas,
  magicKingdomAttractions,
  magicKingdomDining,
  magicKingdomItems,
  magicKingdomPark,
} from "./magicKingdom";

export {
  magicKingdomAreas,
  magicKingdomAttractions,
  magicKingdomDining,
  magicKingdomItems,
  magicKingdomPark,
};

export const disneyParks = [
  magicKingdomPark,
];

export const disneyItems = [
  ...magicKingdomItems,
];
`
);

writeTextFile(
  path.join("src", "data", "index.js"),
  `import { disneyItems, disneyParks } from "./disney";

export { disneyItems, disneyParks };

export const allItems = [
  ...disneyItems,
];
`
);

writeTextFile(
  path.join("src", "data", "attractions.js"),
  `import { allItems } from "./index";

export const attractions = allItems;
`
);

function writeTextFile(relativePath, content) {
  const fullPath = path.join(projectRoot, relativePath);
  fs.mkdirSync(path.dirname(fullPath), { recursive: true });
  fs.writeFileSync(fullPath, content, "utf8");
  console.log(`Wrote ${relativePath}`);
}

console.log("");
console.log("Done.");
console.log(`Magic Kingdom attractions: ${attractionItems.length}`);
console.log(`Magic Kingdom dining: ${diningItems.length}`);
console.log(`Magic Kingdom areas: ${areas.length}`);