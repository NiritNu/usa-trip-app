import fs from "fs";
import path from "path";
import { fileURLToPath, pathToFileURL } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, "..");

const attractionsPath = path.join(
  projectRoot,
  "src",
  "data",
  "disney",
  "magicKingdom",
  "attractions.js"
);

const module = await import(pathToFileURL(attractionsPath).href);
const currentItems = module.magicKingdomAttractions || [];

const updates = [
  {
    id: "meet-mickey-town-square",
    name: "Mickey Mouse and Minnie Mouse at Town Square Theater",
    resort: "Disney",
    park: "Magic Kingdom",
    area: "Main Street, U.S.A.",
    areaId: "main-street",
    category: "character",
    shortDescription:
      "מפגש דמויות קלאסי וממוזג עם מיקי ומיני ליד הכניסה לפארק.",
    minHeightCm: null,
    intensity: "calm",
    scareFactor: "none",
    motionSicknessRisk: "low",
    priority: "must_do",
    avgWaitSeptemberMin: 30,
    waitLevelSeptember: "medium",
    bestTimeToRide: ["morning", "evening"],
    planningNeeded: "check_same_day_hours",
    skipLine: "Disney Lightning Lane / check availability",
    suitableFor: ["preschooler", "youngKid", "olderKid"],
    familyMode: "all_together",
    indoor: true,
    rainFriendly: true,
    durationMin: 15,
    nearby: [
      "Walt Disney World Railroad - Main Street Station",
      "Main Street Vehicles / Horse-Drawn Streetcar",
      "The Dapper Dans",
      "Casey's Corner"
    ],
    tip: "מעולה לתחילת היום או לסוף היום כי זה קרוב לכניסה וליציאה."
  },
  {
    id: "dapper-dans",
    name: "The Dapper Dans",
    resort: "Disney",
    park: "Magic Kingdom",
    area: "Main Street, U.S.A.",
    areaId: "main-street",
    category: "show",
    shortDescription:
      "רביעיית זמרים בסגנון ברברשופ עם הופעות קצרות ברחוב הראשי.",
    minHeightCm: null,
    intensity: "calm",
    scareFactor: "none",
    motionSicknessRisk: "low",
    priority: "good_if_time",
    avgWaitSeptemberMin: null,
    waitLevelSeptember: "schedule_based",
    bestTimeToRide: ["morning", "afternoon"],
    planningNeeded: "check_same_day_hours",
    skipLine: "None",
    suitableFor: ["preschooler", "youngKid", "olderKid", "adults"],
    familyMode: "all_together",
    indoor: false,
    rainFriendly: false,
    durationMin: 20,
    nearby: [
      "Mickey Mouse and Minnie Mouse at Town Square Theater",
      "Walt Disney World Railroad - Main Street Station",
      "Main Street Vehicles / Horse-Drawn Streetcar",
      "Casey's Corner"
    ],
    tip: "לא צריך לתכנן סביב זה, אבל אם אתם עוברים ב־Main Street ויש הופעה — נחמד לעצור."
  },
  {
    id: "disney-adventure-friends-cavalcade",
    name: "Disney Adventure Friends Cavalcade",
    resort: "Disney",
    park: "Magic Kingdom",
    area: "Parade Route",
    areaId: "main-street",
    category: "show",
    shortDescription:
      "מיני־מצעד קצר עם הרבה דמויות דיסני ופיקסאר. פחות מחייב ממצעד מלא.",
    minHeightCm: null,
    intensity: "calm",
    scareFactor: "none",
    motionSicknessRisk: "low",
    priority: "good_if_time",
    avgWaitSeptemberMin: null,
    waitLevelSeptember: "schedule_based",
    bestTimeToRide: ["scheduled_time"],
    planningNeeded: "check_same_day_hours",
    skipLine: "None",
    suitableFor: ["preschooler", "youngKid", "olderKid"],
    familyMode: "all_together",
    indoor: false,
    rainFriendly: false,
    durationMin: 10,
    nearby: [
      "Cinderella Castle",
      "Casey's Corner",
      "The Crystal Palace",
      "Main Street Vehicles / Horse-Drawn Streetcar"
    ],
    tip: "טוב אם רוצים לראות הרבה דמויות בלי לעמוד בתורי מפגש."
  },
  {
    id: "mickeys-magical-friendship-faire",
    name: "Mickey's Magical Friendship Faire",
    resort: "Disney",
    park: "Magic Kingdom",
    area: "Cinderella Castle / Hub",
    areaId: "main-street",
    category: "show",
    shortDescription:
      "מופע במה ליד הטירה עם מיקי, חברים, נסיכות ודמויות מסרטים כמו Frozen, Tangled ו־Princess and the Frog.",
    minHeightCm: null,
    intensity: "calm",
    scareFactor: "none",
    motionSicknessRisk: "low",
    priority: "must_do",
    avgWaitSeptemberMin: null,
    waitLevelSeptember: "schedule_based",
    bestTimeToRide: ["scheduled_time"],
    planningNeeded: "check_same_day_hours",
    skipLine: "None",
    suitableFor: ["preschooler", "youngKid", "olderKid"],
    familyMode: "all_together",
    indoor: false,
    rainFriendly: false,
    durationMin: 20,
    nearby: [
      "Cinderella Castle",
      "Prince Charming Regal Carrousel",
      "Mickey's PhilharMagic",
      "Casey's Corner"
    ],
    tip: "שווה לבדוק שעות באפליקציה באותו יום. אם אתם באזור הטירה — מאוד קל לשלב."
  },
  {
    id: "disney-starlight-dream-the-night-away",
    name: "Disney Starlight: Dream the Night Away",
    resort: "Disney",
    park: "Magic Kingdom",
    area: "Parade Route",
    areaId: "main-street",
    category: "show",
    shortDescription:
      "מצעד לילה חדש עם תאורה, דמויות ומוזיקה. מתאים כעוגן ערב אם הילדים מחזיקים מעמד.",
    minHeightCm: null,
    intensity: "calm",
    scareFactor: "low",
    motionSicknessRisk: "low",
    priority: "must_do",
    avgWaitSeptemberMin: null,
    waitLevelSeptember: "schedule_based",
    bestTimeToRide: ["night"],
    planningNeeded: "arrive_early_for_spot",
    skipLine: "None",
    suitableFor: ["preschooler", "youngKid", "olderKid"],
    familyMode: "all_together",
    indoor: false,
    rainFriendly: false,
    durationMin: 20,
    nearby: [
      "Cinderella Castle",
      "Casey's Corner",
      "The Crystal Palace",
      "Happily Ever After"
    ],
    tip: "אם יש באותו ערב גם זיקוקים וגם מצעד, לבדוק שעות ולבחור נקודת צפייה חכמה שלא מחייבת ריצה."
  },
  {
    id: "meet-mirabel-fairytale-garden",
    name: "Meet Mirabel at Fairytale Garden",
    resort: "Disney",
    park: "Magic Kingdom",
    area: "Fantasyland",
    areaId: "fantasyland",
    category: "character",
    shortDescription:
      "מפגש עם מיראבל מ־Encanto באזור Fairytale Garden ליד Fantasyland.",
    minHeightCm: null,
    intensity: "calm",
    scareFactor: "none",
    motionSicknessRisk: "low",
    priority: "good_if_time",
    avgWaitSeptemberMin: 25,
    waitLevelSeptember: "medium",
    bestTimeToRide: ["morning", "afternoon"],
    planningNeeded: "check_same_day_hours",
    skipLine: "None",
    suitableFor: ["preschooler", "youngKid", "olderKid"],
    familyMode: "all_together",
    indoor: false,
    rainFriendly: false,
    durationMin: 10,
    nearby: [
      "Cinderella Castle",
      "Mickey's PhilharMagic",
      "Prince Charming Regal Carrousel",
      "Princess Fairytale Hall"
    ],
    tip: "שווה אם אוהבים Encanto. לבדוק שעות באותו יום כי מפגשי דמויות משתנים."
  },
  {
    id: "meet-peter-pan-fantasyland",
    name: "Meet Peter Pan in Fantasyland",
    resort: "Disney",
    park: "Magic Kingdom",
    area: "Fantasyland",
    areaId: "fantasyland",
    category: "character",
    shortDescription:
      "מפגש דמות עם פיטר פן באזור Fantasyland, לרוב בשעות מוגדרות.",
    minHeightCm: null,
    intensity: "calm",
    scareFactor: "none",
    motionSicknessRisk: "low",
    priority: "good_if_time",
    avgWaitSeptemberMin: 20,
    waitLevelSeptember: "medium",
    bestTimeToRide: ["afternoon"],
    planningNeeded: "check_same_day_hours",
    skipLine: "None",
    suitableFor: ["preschooler", "youngKid", "olderKid"],
    familyMode: "all_together",
    indoor: false,
    rainFriendly: false,
    durationMin: 10,
    nearby: [
      "Peter Pan's Flight",
      "it's a small world",
      "Mickey's PhilharMagic",
      "Prince Charming Regal Carrousel"
    ],
    tip: "נחמד לשלב אם אתם כבר ליד Peter Pan’s Flight."
  },
  {
    id: "meet-winnie-pooh-tigger-thotful-spot",
    name: "Meet Winnie the Pooh and Tigger at The Thotful Spot",
    resort: "Disney",
    park: "Magic Kingdom",
    area: "Fantasyland",
    areaId: "fantasyland",
    category: "character",
    shortDescription:
      "מפגש דמויות עם פו הדב וטיגר ליד האזור של Winnie the Pooh.",
    minHeightCm: null,
    intensity: "calm",
    scareFactor: "none",
    motionSicknessRisk: "low",
    priority: "good_if_time",
    avgWaitSeptemberMin: 25,
    waitLevelSeptember: "medium",
    bestTimeToRide: ["morning", "afternoon"],
    planningNeeded: "check_same_day_hours",
    skipLine: "None",
    suitableFor: ["preschooler", "youngKid"],
    familyMode: "all_together",
    indoor: false,
    rainFriendly: false,
    durationMin: 10,
    nearby: [
      "The Many Adventures of Winnie the Pooh",
      "Mad Tea Party",
      "Seven Dwarfs Mine Train",
      "Princess Fairytale Hall"
    ],
    tip: "טוב במיוחד לילדים קטנים שאוהבים את פו הדב."
  },
  {
    id: "meet-ariel-grotto",
    name: "Meet Ariel at Her Grotto",
    resort: "Disney",
    park: "Magic Kingdom",
    area: "Fantasyland",
    areaId: "fantasyland",
    category: "character",
    shortDescription:
      "מפגש ממוזג עם אריאל ליד Under the Sea באזור Fantasyland.",
    minHeightCm: null,
    intensity: "calm",
    scareFactor: "none",
    motionSicknessRisk: "low",
    priority: "good_if_time",
    avgWaitSeptemberMin: 25,
    waitLevelSeptember: "medium",
    bestTimeToRide: ["midday", "afternoon"],
    planningNeeded: "check_same_day_hours",
    skipLine: "Disney Lightning Lane / check availability",
    suitableFor: ["preschooler", "youngKid", "olderKid"],
    familyMode: "all_together",
    indoor: true,
    rainFriendly: true,
    durationMin: 10,
    nearby: [
      "Under the Sea - Journey of The Little Mermaid",
      "Dumbo the Flying Elephant",
      "Enchanted Tales with Belle",
      "Gaston’s Tavern"
    ],
    tip: "טוב לשלב עם Under the Sea, במיוחד כשחם כי זה מקורה."
  },
  {
    id: "meet-characters-aladdin-adventureland",
    name: "Meet Characters from Aladdin in Adventureland",
    resort: "Disney",
    park: "Magic Kingdom",
    area: "Adventureland",
    areaId: "adventureland",
    category: "character",
    shortDescription:
      "מפגש עם דמויות מאלדין באזור Adventureland, לפי שעות באותו יום.",
    minHeightCm: null,
    intensity: "calm",
    scareFactor: "none",
    motionSicknessRisk: "low",
    priority: "good_if_time",
    avgWaitSeptemberMin: 20,
    waitLevelSeptember: "medium",
    bestTimeToRide: ["morning", "afternoon"],
    planningNeeded: "check_same_day_hours",
    skipLine: "None",
    suitableFor: ["preschooler", "youngKid", "olderKid"],
    familyMode: "all_together",
    indoor: false,
    rainFriendly: false,
    durationMin: 10,
    nearby: [
      "The Magic Carpets of Aladdin",
      "Jungle Cruise",
      "Walt Disney's Enchanted Tiki Room",
      "Aloha Isle"
    ],
    tip: "נחמד אם אתם כבר ב־Adventureland, לא הייתי הולכת במיוחד מקצה הפארק."
  }
];

const replaceIds = new Set([
  ...updates.map((item) => item.id),
  "liberty-square-riverboat",
  "tom-sawyer-island"
]);

const closedNames = new Set(["Liberty Square Riverboat", "Tom Sawyer Island"]);

function cleanNearby(item) {
  if (!Array.isArray(item.nearby)) return item;

  return {
    ...item,
    nearby: item.nearby.filter((name) => !closedNames.has(name)),
  };
}

function sortItems(a, b) {
  const areaOrder = [
    "main-street",
    "adventureland",
    "frontierland",
    "liberty-square",
    "fantasyland",
    "storybook-circus",
    "tomorrowland"
  ];

  const categoryOrder = {
    ride: 0,
    show: 1,
    character: 2,
    experience: 3,
    dining: 4
  };

  const priorityOrder = {
    must_do: 0,
    good_if_time: 1,
    skip_if_busy: 2
  };

  const areaA = areaOrder.indexOf(a.areaId);
  const areaB = areaOrder.indexOf(b.areaId);

  if (areaA !== areaB) return areaA - areaB;

  const priorityA = priorityOrder[a.priority] ?? 99;
  const priorityB = priorityOrder[b.priority] ?? 99;

  if (priorityA !== priorityB) return priorityA - priorityB;

  const categoryA = categoryOrder[a.category] ?? 99;
  const categoryB = categoryOrder[b.category] ?? 99;

  if (categoryA !== categoryB) return categoryA - categoryB;

  return a.name.localeCompare(b.name);
}

const updatedItems = [
  ...currentItems.filter((item) => !replaceIds.has(item.id)).map(cleanNearby),
  ...updates
].sort(sortItems);

const content = `export const magicKingdomAttractions = ${JSON.stringify(
  updatedItems,
  null,
  2
)};
`;

fs.writeFileSync(attractionsPath, content, "utf8");

console.log("Updated Magic Kingdom entertainment.");
console.log(`Total attraction/entertainment items: ${updatedItems.length}`);