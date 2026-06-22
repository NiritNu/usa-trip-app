import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, "..");

const parkDir = path.join(
  projectRoot,
  "src",
  "data",
  "universal",
  "islandsOfAdventure"
);

fs.mkdirSync(parkDir, { recursive: true });

const oldParksExpress = {
  includedWithHotel: true,
  type: "unlimited",
  note: "כלול לכם דרך מלון Premier בפארקים הוותיקים, באטרקציות שמשתתפות ב-Universal Express."
};

const checkExpress = {
  includedWithHotel: true,
  type: "unlimited",
  note: "אמור להיות חלק מהפארקים הוותיקים, אבל כדאי לוודא באפליקציה הרשמית אם האטרקציה משתתפת ב-Express באותו יום."
};

const areas = [
  {
    id: "port-of-entry",
    name: "Port of Entry",
    hebrewName: "כניסה",
    park: "Islands of Adventure",
    resort: "Universal",
    nearbyAreas: ["seuss-landing", "marvel-super-hero-island"]
  },
  {
    id: "seuss-landing",
    name: "Seuss Landing",
    hebrewName: "סוס לנדינג",
    park: "Islands of Adventure",
    resort: "Universal",
    nearbyAreas: ["port-of-entry", "lost-continent"]
  },
  {
    id: "marvel-super-hero-island",
    name: "Marvel Super Hero Island",
    hebrewName: "מארוול",
    park: "Islands of Adventure",
    resort: "Universal",
    nearbyAreas: ["port-of-entry", "toon-lagoon"]
  },
  {
    id: "toon-lagoon",
    name: "Toon Lagoon",
    hebrewName: "טון לגון",
    park: "Islands of Adventure",
    resort: "Universal",
    nearbyAreas: ["marvel-super-hero-island", "skull-island"]
  },
  {
    id: "skull-island",
    name: "Skull Island",
    hebrewName: "אי הגולגולת",
    park: "Islands of Adventure",
    resort: "Universal",
    nearbyAreas: ["toon-lagoon", "jurassic-park"]
  },
  {
    id: "jurassic-park",
    name: "Jurassic Park",
    hebrewName: "פארק היורה",
    park: "Islands of Adventure",
    resort: "Universal",
    nearbyAreas: ["skull-island", "hogsmeade"]
  },
  {
    id: "hogsmeade",
    name: "The Wizarding World of Harry Potter - Hogsmeade",
    hebrewName: "הארי פוטר - הוגסמיד",
    park: "Islands of Adventure",
    resort: "Universal",
    nearbyAreas: ["jurassic-park", "lost-continent"]
  },
  {
    id: "lost-continent",
    name: "The Lost Continent",
    hebrewName: "הלוסט קונטיננט",
    park: "Islands of Adventure",
    resort: "Universal",
    nearbyAreas: ["hogsmeade", "seuss-landing"]
  }
];

const attractions = [
  {
    id: "hagrids-magical-creatures",
    name: "Hagrid’s Magical Creatures Motorbike Adventure",
    resort: "Universal",
    park: "Islands of Adventure",
    area: "Hogsmeade",
    areaId: "hogsmeade",
    category: "ride",
    shortDescription:
      "רכבת הרים סיפורית ומאוד מושקעת של הארי פוטר. מהמתקנים הכי חזקים בפארק, אבל גם יחסית אינטנסיבי.",
    minHeightCm: 122,
    intensity: "thrill",
    scareFactor: "medium",
    motionSicknessRisk: "medium",
    priority: "must_do",
    avgWaitSeptemberMin: 75,
    waitLevelSeptember: "high",
    bestTimeToRide: ["morning", "late_evening"],
    planningNeeded: "high_priority",
    skipLine: "Universal Express / check official app",
    express: checkExpress,
    expressPriority: "use",
    suitableFor: ["olderKid", "adults"],
    familyMode: "some_together",
    indoor: false,
    rainFriendly: false,
    durationMin: 4,
    nearby: [
      "Harry Potter and the Forbidden Journey",
      "Flight of the Hippogriff",
      "Three Broomsticks",
      "Hogwarts Express - Hogsmeade Station"
    ],
    tip: "עוגן מרכזי. אם ה-Express פעיל אליו ביום שלכם — להשתמש."
  },
  {
    id: "forbidden-journey",
    name: "Harry Potter and the Forbidden Journey",
    resort: "Universal",
    park: "Islands of Adventure",
    area: "Hogsmeade",
    areaId: "hogsmeade",
    category: "ride",
    shortDescription:
      "מתקן הארי פוטר בתוך הוגוורטס. מאוד מרשים, אבל מסובב ועלול לגרום בחילה.",
    minHeightCm: 122,
    intensity: "medium",
    scareFactor: "medium",
    motionSicknessRisk: "high",
    priority: "must_do",
    avgWaitSeptemberMin: 45,
    waitLevelSeptember: "medium",
    bestTimeToRide: ["morning", "evening"],
    planningNeeded: "high_priority",
    skipLine: "Universal Express",
    express: oldParksExpress,
    expressPriority: "use",
    suitableFor: ["olderKid", "adults"],
    familyMode: "some_together",
    indoor: true,
    rainFriendly: true,
    durationMin: 5,
    nearby: [
      "Hagrid’s Magical Creatures Motorbike Adventure",
      "Flight of the Hippogriff",
      "Three Broomsticks"
    ],
    tip: "חובה לחובבי הארי פוטר, אבל מי שרגיש לבחילה צריך לשקול לדלג."
  },
  {
    id: "flight-of-the-hippogriff",
    name: "Flight of the Hippogriff",
    resort: "Universal",
    park: "Islands of Adventure",
    area: "Hogsmeade",
    areaId: "hogsmeade",
    category: "ride",
    shortDescription:
      "רכבת הרים קטנה וקצרה של הארי פוטר. טובה לילדים צעירים שרוצים רכבת ראשונה.",
    minHeightCm: 92,
    intensity: "mild",
    scareFactor: "low",
    motionSicknessRisk: "low",
    priority: "good_if_time",
    avgWaitSeptemberMin: 25,
    waitLevelSeptember: "medium",
    bestTimeToRide: ["morning", "evening"],
    planningNeeded: "no_reservation",
    skipLine: "Universal Express",
    express: oldParksExpress,
    expressPriority: "not_needed",
    suitableFor: ["youngKid", "olderKid"],
    familyMode: "all_together",
    indoor: false,
    rainFriendly: false,
    durationMin: 2,
    nearby: [
      "Hagrid’s Magical Creatures Motorbike Adventure",
      "Forbidden Journey",
      "Three Broomsticks"
    ],
    tip: "לעשות אם התור קצר או אם הילד הצעיר רוצה רכבת לא מפחידה מדי."
  },
  {
    id: "hogwarts-express-hogsmeade",
    name: "Hogwarts Express - Hogsmeade Station",
    resort: "Universal",
    park: "Islands of Adventure",
    area: "Hogsmeade",
    areaId: "hogsmeade",
    category: "ride",
    shortDescription:
      "הרכבת בין Islands of Adventure ל-Universal Studios. צריך כרטיס Park-to-Park. החוויה שונה בכל כיוון.",
    minHeightCm: null,
    intensity: "calm",
    scareFactor: "none",
    motionSicknessRisk: "low",
    priority: "must_do",
    avgWaitSeptemberMin: 30,
    waitLevelSeptember: "medium",
    bestTimeToRide: ["midday", "afternoon", "evening"],
    planningNeeded: "check_same_day_hours",
    skipLine: "Universal Express",
    express: oldParksExpress,
    expressPriority: "use",
    suitableFor: ["preschooler", "youngKid", "olderKid", "adults"],
    familyMode: "all_together",
    indoor: true,
    rainFriendly: true,
    durationMin: 10,
    nearby: [
      "Hogsmeade",
      "Three Broomsticks",
      "Forbidden Journey"
    ],
    tip: "רלוונטי רק ביום Park-to-Park. שווה לעשות לשני הכיוונים אם יש זמן."
  },
  {
    id: "velocicoaster",
    name: "Jurassic World VelociCoaster",
    resort: "Universal",
    park: "Islands of Adventure",
    area: "Jurassic Park",
    areaId: "jurassic-park",
    category: "ride",
    shortDescription:
      "רכבת אקסטרים חזקה מאוד, מהירה וגבוהה. לא למשפחה כולה — רק למי שאוהב אקסטרים אמיתי.",
    minHeightCm: 130,
    intensity: "thrill",
    scareFactor: "high",
    motionSicknessRisk: "high",
    priority: "must_do",
    avgWaitSeptemberMin: 65,
    waitLevelSeptember: "high",
    bestTimeToRide: ["morning", "late_evening"],
    planningNeeded: "high_priority",
    skipLine: "Universal Express / check official app",
    express: checkExpress,
    expressPriority: "use",
    suitableFor: ["olderKid", "adults"],
    familyMode: "some_together",
    indoor: false,
    rainFriendly: false,
    durationMin: 3,
    nearby: [
      "Jurassic Park Discovery Center",
      "Raptor Encounter",
      "Thunder Falls Terrace",
      "Hogsmeade"
    ],
    tip: "רק לילד/מבוגר שאוהב אקסטרים. אם משתמשים ב-Express — כאן זה מקום טוב."
  },
  {
    id: "raptor-encounter",
    name: "Raptor Encounter",
    resort: "Universal",
    park: "Islands of Adventure",
    area: "Jurassic Park",
    areaId: "jurassic-park",
    category: "character",
    shortDescription:
      "מפגש/צילום עם רפטור. חוויה מצחיקה, קצת מפחידה, ומאוד טובה לתמונות.",
    minHeightCm: null,
    intensity: "mild",
    scareFactor: "medium",
    motionSicknessRisk: "low",
    priority: "good_if_time",
    avgWaitSeptemberMin: 20,
    waitLevelSeptember: "medium",
    bestTimeToRide: ["morning", "afternoon"],
    planningNeeded: "check_same_day_hours",
    skipLine: "None",
    express: oldParksExpress,
    expressPriority: "not_available",
    suitableFor: ["youngKid", "olderKid", "adults"],
    familyMode: "all_together",
    indoor: false,
    rainFriendly: false,
    durationMin: 10,
    nearby: [
      "Jurassic World VelociCoaster",
      "Jurassic Park Discovery Center",
      "Thunder Falls Terrace"
    ],
    tip: "טוב אם הילדים בעניין של דינוזאורים ולא נבהלים מדי."
  },
  {
    id: "jurassic-park-discovery-center",
    name: "Jurassic Park Discovery Center",
    resort: "Universal",
    park: "Islands of Adventure",
    area: "Jurassic Park",
    areaId: "jurassic-park",
    category: "experience",
    shortDescription:
      "אזור מקורה ורגוע עם דינוזאורים ותצוגות. טוב למזגן ולילדים שאוהבים דינוזאורים.",
    minHeightCm: null,
    intensity: "calm",
    scareFactor: "low",
    motionSicknessRisk: "low",
    priority: "good_if_time",
    avgWaitSeptemberMin: 0,
    waitLevelSeptember: "low",
    bestTimeToRide: ["midday", "afternoon"],
    planningNeeded: "no_reservation",
    skipLine: "None",
    express: oldParksExpress,
    expressPriority: "not_available",
    suitableFor: ["preschooler", "youngKid", "olderKid"],
    familyMode: "all_together",
    indoor: true,
    rainFriendly: true,
    durationMin: 20,
    nearby: [
      "Jurassic World VelociCoaster",
      "Raptor Encounter",
      "Thunder Falls Terrace"
    ],
    tip: "שימושי מאוד אם צריך הפסקת מזגן."
  },
  {
    id: "pteranodon-flyers",
    name: "Pteranodon Flyers",
    resort: "Universal",
    park: "Islands of Adventure",
    area: "Jurassic Park",
    areaId: "jurassic-park",
    category: "ride",
    shortDescription:
      "מתקן תלוי מעל Camp Jurassic לילדים בגובה מתאים. יש מגבלת גובה עליונה לילדים.",
    minHeightCm: 92,
    maxHeightCm: 143,
    intensity: "mild",
    scareFactor: "low",
    motionSicknessRisk: "low",
    priority: "good_if_time",
    avgWaitSeptemberMin: 35,
    waitLevelSeptember: "medium",
    bestTimeToRide: ["morning", "afternoon"],
    planningNeeded: "check_same_day_hours",
    skipLine: "Usually no Express",
    express: oldParksExpress,
    expressPriority: "not_available",
    suitableFor: ["youngKid"],
    familyMode: "split_parent_child",
    indoor: false,
    rainFriendly: false,
    durationMin: 2,
    nearby: [
      "Camp Jurassic",
      "Jurassic Park Discovery Center",
      "Thunder Falls Terrace"
    ],
    tip: "רלוונטי בעיקר לילדה/ילד בגובה מתאים. לבדוק תנאים באותו יום."
  },
  {
    id: "camp-jurassic",
    name: "Camp Jurassic",
    resort: "Universal",
    park: "Islands of Adventure",
    area: "Jurassic Park",
    areaId: "jurassic-park",
    category: "experience",
    shortDescription:
      "אזור משחקים גדול של דינוזאורים. טוב לפריקת אנרגיה לילדים.",
    minHeightCm: null,
    intensity: "mild",
    scareFactor: "low",
    motionSicknessRisk: "low",
    priority: "good_if_time",
    avgWaitSeptemberMin: 0,
    waitLevelSeptember: "low",
    bestTimeToRide: ["midday", "afternoon"],
    planningNeeded: "no_reservation",
    skipLine: "None",
    express: oldParksExpress,
    expressPriority: "not_available",
    suitableFor: ["preschooler", "youngKid"],
    familyMode: "all_together",
    indoor: false,
    rainFriendly: false,
    durationMin: 25,
    nearby: [
      "Pteranodon Flyers",
      "Jurassic Park Discovery Center",
      "Raptor Encounter"
    ],
    tip: "מעולה לילדים קטנים, אבל לשים לב שלא מתעכבים שם יותר מדי אם היום קצר."
  },
  {
    id: "skull-island-reign-of-kong",
    name: "Skull Island: Reign of Kong",
    resort: "Universal",
    park: "Islands of Adventure",
    area: "Skull Island",
    areaId: "skull-island",
    category: "ride",
    shortDescription:
      "נסיעה חשוכה עם קינג קונג, מסכים ואווירה מפחידה. לא לילדים רגישים.",
    minHeightCm: 92,
    intensity: "medium",
    scareFactor: "high",
    motionSicknessRisk: "medium",
    priority: "good_if_time",
    avgWaitSeptemberMin: 30,
    waitLevelSeptember: "medium",
    bestTimeToRide: ["afternoon", "evening"],
    planningNeeded: "no_reservation",
    skipLine: "Universal Express",
    express: oldParksExpress,
    expressPriority: "use",
    suitableFor: ["olderKid", "adults"],
    familyMode: "some_together",
    indoor: true,
    rainFriendly: true,
    durationMin: 6,
    nearby: [
      "Jurassic Park",
      "Toon Lagoon",
      "Thunder Falls Terrace"
    ],
    tip: "אם הילד רגיש לפחד/מפלצות — לדלג. אם אוהבים קונג — להשתמש ב-Express."
  },
  {
    id: "incredible-hulk-coaster",
    name: "The Incredible Hulk Coaster",
    resort: "Universal",
    park: "Islands of Adventure",
    area: "Marvel Super Hero Island",
    areaId: "marvel-super-hero-island",
    category: "ride",
    shortDescription:
      "רכבת הרים חזקה מאוד עם שיגור ולופים. אקסטרים אמיתי.",
    minHeightCm: 138,
    intensity: "thrill",
    scareFactor: "high",
    motionSicknessRisk: "high",
    priority: "must_do",
    avgWaitSeptemberMin: 45,
    waitLevelSeptember: "medium",
    bestTimeToRide: ["morning", "late_evening"],
    planningNeeded: "high_priority",
    skipLine: "Universal Express",
    express: oldParksExpress,
    expressPriority: "use",
    suitableFor: ["olderKid", "adults"],
    familyMode: "some_together",
    indoor: false,
    rainFriendly: false,
    durationMin: 3,
    nearby: [
      "The Amazing Adventures of Spider-Man",
      "Doctor Doom's Fearfall",
      "Cafe 4"
    ],
    tip: "רק לחובבי אקסטרים. לשקול פיצול."
  },
  {
    id: "spider-man",
    name: "The Amazing Adventures of Spider-Man",
    resort: "Universal",
    park: "Islands of Adventure",
    area: "Marvel Super Hero Island",
    areaId: "marvel-super-hero-island",
    category: "ride",
    shortDescription:
      "סימולטור/נסיעה תלת־ממדית מצוין של ספיידרמן. אקשן, מסכים ותנועה.",
    minHeightCm: 102,
    intensity: "medium",
    scareFactor: "medium",
    motionSicknessRisk: "medium",
    priority: "must_do",
    avgWaitSeptemberMin: 30,
    waitLevelSeptember: "medium",
    bestTimeToRide: ["morning", "evening"],
    planningNeeded: "high_priority",
    skipLine: "Universal Express",
    express: oldParksExpress,
    expressPriority: "use",
    suitableFor: ["youngKid", "olderKid", "adults"],
    familyMode: "some_together",
    indoor: true,
    rainFriendly: true,
    durationMin: 5,
    nearby: [
      "The Incredible Hulk Coaster",
      "Doctor Doom's Fearfall",
      "Marvel Character Dinner area"
    ],
    tip: "אחד המתקנים הכי טובים למשפחה שאוהבת אקשן. רגישים לבחילה — לשקול."
  },
  {
    id: "doctor-doom-fearfall",
    name: "Doctor Doom’s Fearfall",
    resort: "Universal",
    park: "Islands of Adventure",
    area: "Marvel Super Hero Island",
    areaId: "marvel-super-hero-island",
    category: "ride",
    shortDescription:
      "מתקן נפילה/שיגור לגובה. קצר, חזק, ולא מתאים למי שפוחד מגובה.",
    minHeightCm: 132,
    intensity: "thrill",
    scareFactor: "high",
    motionSicknessRisk: "medium",
    priority: "good_if_time",
    avgWaitSeptemberMin: 20,
    waitLevelSeptember: "medium",
    bestTimeToRide: ["morning", "evening"],
    planningNeeded: "no_reservation",
    skipLine: "Universal Express",
    express: oldParksExpress,
    expressPriority: "not_needed",
    suitableFor: ["olderKid", "adults"],
    familyMode: "some_together",
    indoor: false,
    rainFriendly: false,
    durationMin: 2,
    nearby: [
      "The Incredible Hulk Coaster",
      "The Amazing Adventures of Spider-Man",
      "Cafe 4"
    ],
    tip: "אם יש תור קצר — אפשר. לא עוגן."
  },
  {
    id: "storm-force-accelatron",
    name: "Storm Force Accelatron",
    resort: "Universal",
    park: "Islands of Adventure",
    area: "Marvel Super Hero Island",
    areaId: "marvel-super-hero-island",
    category: "ride",
    shortDescription:
      "מתקן כוסות מסתובבות בסגנון מארוול. מתאים לילדים, אבל מסובב.",
    minHeightCm: null,
    intensity: "mild",
    scareFactor: "none",
    motionSicknessRisk: "high",
    priority: "skip_if_busy",
    avgWaitSeptemberMin: 10,
    waitLevelSeptember: "low",
    bestTimeToRide: ["afternoon"],
    planningNeeded: "no_reservation",
    skipLine: "Universal Express",
    express: oldParksExpress,
    expressPriority: "not_needed",
    suitableFor: ["preschooler", "youngKid"],
    familyMode: "all_together",
    indoor: false,
    rainFriendly: false,
    durationMin: 2,
    nearby: [
      "The Incredible Hulk Coaster",
      "The Amazing Adventures of Spider-Man"
    ],
    tip: "רק אם הילדים רוצים והתור קצר. רגישים לסחרחורת — לדלג."
  },
  {
    id: "marvel-characters",
    name: "Marvel Characters",
    resort: "Universal",
    park: "Islands of Adventure",
    area: "Marvel Super Hero Island",
    areaId: "marvel-super-hero-island",
    category: "character",
    shortDescription:
      "מפגשי דמויות מארוול משתנים באזור Marvel.",
    minHeightCm: null,
    intensity: "calm",
    scareFactor: "none",
    motionSicknessRisk: "low",
    priority: "good_if_time",
    avgWaitSeptemberMin: 15,
    waitLevelSeptember: "low",
    bestTimeToRide: ["morning", "afternoon"],
    planningNeeded: "check_same_day_hours",
    skipLine: "None",
    express: oldParksExpress,
    expressPriority: "not_available",
    suitableFor: ["youngKid", "olderKid"],
    familyMode: "all_together",
    indoor: false,
    rainFriendly: false,
    durationMin: 15,
    nearby: [
      "The Amazing Adventures of Spider-Man",
      "The Incredible Hulk Coaster",
      "Cafe 4"
    ],
    tip: "לעצור אם רואים תור קצר. לא לרדוף אחרי כולם."
  },
  {
    id: "popeye-bilge-rat-barges",
    name: "Popeye & Bluto’s Bilge-Rat Barges",
    resort: "Universal",
    park: "Islands of Adventure",
    area: "Toon Lagoon",
    areaId: "toon-lagoon",
    category: "ride",
    shortDescription:
      "רפטינג מים רטוב מאוד. כיף בחום, אבל אפשר לצאת ספוגים לגמרי.",
    minHeightCm: 107,
    intensity: "medium",
    scareFactor: "low",
    motionSicknessRisk: "low",
    priority: "good_if_time",
    avgWaitSeptemberMin: 25,
    waitLevelSeptember: "medium",
    bestTimeToRide: ["midday", "afternoon"],
    planningNeeded: "no_reservation",
    skipLine: "Universal Express",
    express: oldParksExpress,
    expressPriority: "not_needed",
    suitableFor: ["youngKid", "olderKid", "adults"],
    familyMode: "some_together",
    indoor: false,
    rainFriendly: false,
    durationMin: 7,
    nearby: [
      "Dudley Do-Right’s Ripsaw Falls",
      "Me Ship, The Olive",
      "Comic Strip Cafe"
    ],
    tip: "לעשות רק אם מוכנים להירטב מאוד. להביא שקית לטלפונים."
  },
  {
    id: "dudley-ripsaw-falls",
    name: "Dudley Do-Right’s Ripsaw Falls",
    resort: "Universal",
    park: "Islands of Adventure",
    area: "Toon Lagoon",
    areaId: "toon-lagoon",
    category: "ride",
    shortDescription:
      "מתקן מים עם נפילה גדולה. מצחיק וכיפי, אבל גם רטוב וגם יחסית מפחיד.",
    minHeightCm: 112,
    intensity: "medium",
    scareFactor: "medium",
    motionSicknessRisk: "low",
    priority: "good_if_time",
    avgWaitSeptemberMin: 30,
    waitLevelSeptember: "medium",
    bestTimeToRide: ["midday", "afternoon"],
    planningNeeded: "no_reservation",
    skipLine: "Universal Express",
    express: oldParksExpress,
    expressPriority: "not_needed",
    suitableFor: ["olderKid", "adults"],
    familyMode: "some_together",
    indoor: false,
    rainFriendly: false,
    durationMin: 5,
    nearby: [
      "Popeye & Bluto’s Bilge-Rat Barges",
      "Me Ship, The Olive",
      "Comic Strip Cafe"
    ],
    tip: "רק אם חם ומוכנים להירטב. לא חובה."
  },
  {
    id: "me-ship-the-olive",
    name: "Me Ship, The Olive",
    resort: "Universal",
    park: "Islands of Adventure",
    area: "Toon Lagoon",
    areaId: "toon-lagoon",
    category: "experience",
    shortDescription:
      "אזור משחקים/טיפוס קטן לילדים בעולם פופאי.",
    minHeightCm: null,
    intensity: "mild",
    scareFactor: "none",
    motionSicknessRisk: "low",
    priority: "skip_if_busy",
    avgWaitSeptemberMin: 0,
    waitLevelSeptember: "low",
    bestTimeToRide: ["afternoon"],
    planningNeeded: "no_reservation",
    skipLine: "None",
    express: oldParksExpress,
    expressPriority: "not_available",
    suitableFor: ["preschooler", "youngKid"],
    familyMode: "all_together",
    indoor: false,
    rainFriendly: false,
    durationMin: 15,
    nearby: [
      "Popeye & Bluto’s Bilge-Rat Barges",
      "Dudley Do-Right’s Ripsaw Falls"
    ],
    tip: "רק אם הילדים צריכים לפרוק אנרגיה ואתם באזור."
  },
  {
    id: "cat-in-the-hat",
    name: "The Cat in the Hat",
    resort: "Universal",
    park: "Islands of Adventure",
    area: "Seuss Landing",
    areaId: "seuss-landing",
    category: "ride",
    shortDescription:
      "מתקן חשוך ורגוע יחסית של דוקטור סוס. טוב לילדים קטנים.",
    minHeightCm: 92,
    intensity: "mild",
    scareFactor: "low",
    motionSicknessRisk: "low",
    priority: "good_if_time",
    avgWaitSeptemberMin: 15,
    waitLevelSeptember: "low",
    bestTimeToRide: ["midday", "afternoon"],
    planningNeeded: "no_reservation",
    skipLine: "Universal Express",
    express: oldParksExpress,
    expressPriority: "not_needed",
    suitableFor: ["preschooler", "youngKid"],
    familyMode: "all_together",
    indoor: true,
    rainFriendly: true,
    durationMin: 5,
    nearby: [
      "Caro-Seuss-el",
      "One Fish, Two Fish",
      "Circus McGurkus Cafe Stoo-pendous"
    ],
    tip: "טוב לילדים קטנים ולמזגן. לא עוגן לגדולים."
  },
  {
    id: "seuss-trolley",
    name: "The High in the Sky Seuss Trolley Train Ride!",
    resort: "Universal",
    park: "Islands of Adventure",
    area: "Seuss Landing",
    areaId: "seuss-landing",
    category: "ride",
    shortDescription:
      "רכבת קטנה מעל Seuss Landing. חמודה לילדים ומספקת תצפית נחמדה.",
    minHeightCm: 92,
    intensity: "calm",
    scareFactor: "low",
    motionSicknessRisk: "low",
    priority: "good_if_time",
    avgWaitSeptemberMin: 20,
    waitLevelSeptember: "medium",
    bestTimeToRide: ["morning", "afternoon"],
    planningNeeded: "no_reservation",
    skipLine: "Universal Express",
    express: oldParksExpress,
    expressPriority: "not_needed",
    suitableFor: ["preschooler", "youngKid"],
    familyMode: "all_together",
    indoor: false,
    rainFriendly: false,
    durationMin: 4,
    nearby: [
      "The Cat in the Hat",
      "Caro-Seuss-el",
      "Circus McGurkus Cafe Stoo-pendous"
    ],
    tip: "לעשות אם התור סביר. נחמד לילדים קטנים."
  },
  {
    id: "one-fish-two-fish",
    name: "One Fish, Two Fish, Red Fish, Blue Fish",
    resort: "Universal",
    park: "Islands of Adventure",
    area: "Seuss Landing",
    areaId: "seuss-landing",
    category: "ride",
    shortDescription:
      "מתקן סיבוב מים קליל לילדים קטנים.",
    minHeightCm: null,
    intensity: "calm",
    scareFactor: "none",
    motionSicknessRisk: "medium",
    priority: "skip_if_busy",
    avgWaitSeptemberMin: 10,
    waitLevelSeptember: "low",
    bestTimeToRide: ["afternoon"],
    planningNeeded: "no_reservation",
    skipLine: "Universal Express",
    express: oldParksExpress,
    expressPriority: "not_needed",
    suitableFor: ["preschooler", "youngKid"],
    familyMode: "all_together",
    indoor: false,
    rainFriendly: false,
    durationMin: 3,
    nearby: [
      "The Cat in the Hat",
      "Caro-Seuss-el",
      "Seuss Trolley"
    ],
    tip: "רק אם הילדה רוצה והתור קצר."
  },
  {
    id: "caro-seuss-el",
    name: "Caro-Seuss-el",
    resort: "Universal",
    park: "Islands of Adventure",
    area: "Seuss Landing",
    areaId: "seuss-landing",
    category: "ride",
    shortDescription:
      "קרוסלה צבעונית בעולם דוקטור סוס. רגוע לילדים קטנים.",
    minHeightCm: null,
    intensity: "calm",
    scareFactor: "none",
    motionSicknessRisk: "low",
    priority: "skip_if_busy",
    avgWaitSeptemberMin: 10,
    waitLevelSeptember: "low",
    bestTimeToRide: ["afternoon"],
    planningNeeded: "no_reservation",
    skipLine: "Universal Express",
    express: oldParksExpress,
    expressPriority: "not_needed",
    suitableFor: ["preschooler", "youngKid"],
    familyMode: "all_together",
    indoor: false,
    rainFriendly: false,
    durationMin: 3,
    nearby: [
      "The Cat in the Hat",
      "One Fish, Two Fish",
      "Seuss Trolley"
    ],
    tip: "רק אם הילדים הקטנים רוצים."
  },
  {
    id: "if-i-ran-the-zoo",
    name: "If I Ran the Zoo",
    resort: "Universal",
    park: "Islands of Adventure",
    area: "Seuss Landing",
    areaId: "seuss-landing",
    category: "experience",
    shortDescription:
      "אזור משחקים לילדים קטנים ב-Seuss Landing.",
    minHeightCm: null,
    intensity: "mild",
    scareFactor: "none",
    motionSicknessRisk: "low",
    priority: "good_if_time",
    avgWaitSeptemberMin: 0,
    waitLevelSeptember: "low",
    bestTimeToRide: ["midday", "afternoon"],
    planningNeeded: "no_reservation",
    skipLine: "None",
    express: oldParksExpress,
    expressPriority: "not_available",
    suitableFor: ["preschooler", "youngKid"],
    familyMode: "all_together",
    indoor: false,
    rainFriendly: false,
    durationMin: 20,
    nearby: [
      "The Cat in the Hat",
      "Caro-Seuss-el",
      "Circus McGurkus Cafe Stoo-pendous"
    ],
    tip: "מעולה לילדה קטנה אם צריך הפסקה מהמתקנים הגדולים."
  }
];

const dining = [
  {
    id: "three-broomsticks",
    name: "Three Broomsticks",
    resort: "Universal",
    park: "Islands of Adventure",
    area: "Hogsmeade",
    areaId: "hogsmeade",
    category: "dining",
    diningType: "quick_service",
    mealUse: "real_meal",
    foodStyle: "quick_varied",
    kidsFriendly: true,
    mobileOrder: true,
    reservationNeeded: false,
    shortDescription:
      "מסעדת הארי פוטר בהוגסמיד. אוכל בריטי, Butterbeer ואווירה חזקה מאוד.",
    minHeightCm: null,
    priority: "must_do",
    waitLevelSeptember: "quick_service",
    bestTimeToRide: ["lunch", "dinner"],
    planningNeeded: "no_reservation",
    skipLine: "Mobile Order / Counter Service",
    suitableFor: ["preschooler", "youngKid", "olderKid", "adults"],
    familyMode: "all_together",
    indoor: true,
    rainFriendly: true,
    durationMin: 40,
    nearby: [
      "Forbidden Journey",
      "Hagrid’s Magical Creatures Motorbike Adventure",
      "Flight of the Hippogriff"
    ],
    tip: "בחירה טובה אם אתם רוצים חוויית הארי פוטר מלאה. לא הכי fresh, אבל מאוד חווייתי."
  },
  {
    id: "thunder-falls-terrace",
    name: "Thunder Falls Terrace",
    resort: "Universal",
    park: "Islands of Adventure",
    area: "Jurassic Park",
    areaId: "jurassic-park",
    category: "dining",
    diningType: "quick_service",
    mealUse: "real_meal",
    foodStyle: "fresh_quick",
    kidsFriendly: true,
    mobileOrder: true,
    reservationNeeded: false,
    shortDescription:
      "אחת הבחירות הכי מתאימות לישראלים: עוף, צלעות, rice bowls, סלטים ותוספות. יחסית ארוחה אמיתית.",
    minHeightCm: null,
    priority: "must_do",
    waitLevelSeptember: "quick_service",
    bestTimeToRide: ["lunch", "dinner"],
    planningNeeded: "check_same_day_hours",
    skipLine: "Mobile Order",
    suitableFor: ["youngKid", "olderKid", "adults"],
    familyMode: "all_together",
    indoor: true,
    rainFriendly: true,
    durationMin: 35,
    nearby: [
      "Jurassic World VelociCoaster",
      "Jurassic Park Discovery Center",
      "Raptor Encounter"
    ],
    tip: "בחירה מצוינת אם פתוח. בגלל שינויים באזור Jurassic — לבדוק באפליקציה באותו יום."
  },
  {
    id: "circus-mcgurkus",
    name: "Circus McGurkus Cafe Stoo-pendous",
    resort: "Universal",
    park: "Islands of Adventure",
    area: "Seuss Landing",
    areaId: "seuss-landing",
    category: "dining",
    diningType: "quick_service",
    mealUse: "real_meal",
    foodStyle: "kids_food",
    kidsFriendly: true,
    mobileOrder: true,
    reservationNeeded: false,
    shortDescription:
      "Quick Service גדול וצבעוני באזור דוקטור סוס. טוב עם ילדים קטנים וצריך מזגן.",
    minHeightCm: null,
    priority: "good_if_time",
    waitLevelSeptember: "quick_service",
    bestTimeToRide: ["lunch", "dinner"],
    planningNeeded: "no_reservation",
    skipLine: "Mobile Order",
    suitableFor: ["preschooler", "youngKid"],
    familyMode: "all_together",
    indoor: true,
    rainFriendly: true,
    durationMin: 35,
    nearby: [
      "The Cat in the Hat",
      "Seuss Trolley",
      "Caro-Seuss-el"
    ],
    tip: "בחירה טובה אם אתם באזור Seuss Landing עם ילדים קטנים."
  },
  {
    id: "confisco-grille",
    name: "Confisco Grille",
    resort: "Universal",
    park: "Islands of Adventure",
    area: "Port of Entry",
    areaId: "port-of-entry",
    category: "dining",
    diningType: "table_service",
    mealUse: "sit_down",
    foodStyle: "quick_varied",
    kidsFriendly: true,
    mobileOrder: false,
    reservationNeeded: false,
    shortDescription:
      "מסעדת ישיבה בכניסה לפארק עם אוכל מגוון. לא הכי מהיר, אבל נוח אם רוצים עצירה מסודרת.",
    minHeightCm: null,
    priority: "good_if_time",
    waitLevelSeptember: "reservation",
    bestTimeToRide: ["lunch", "dinner"],
    planningNeeded: "check_same_day_hours",
    skipLine: "Walk-up / reservation if available",
    suitableFor: ["youngKid", "olderKid", "adults"],
    familyMode: "all_together",
    indoor: true,
    rainFriendly: true,
    durationMin: 60,
    nearby: [
      "Port of Entry",
      "Seuss Landing",
      "Marvel Super Hero Island"
    ],
    tip: "לא ליום יעיל מאוד, אבל טוב אם כולם צריכים לשבת במזגן."
  },
  {
    id: "croissant-moon-bakery",
    name: "Croissant Moon Bakery",
    resort: "Universal",
    park: "Islands of Adventure",
    area: "Port of Entry",
    areaId: "port-of-entry",
    category: "dining",
    diningType: "quick_service",
    mealUse: "snack",
    foodStyle: "bakery",
    kidsFriendly: true,
    mobileOrder: false,
    reservationNeeded: false,
    shortDescription:
      "קפה, מאפים וכריכים בכניסה לפארק. טוב לפתיחת יום או עצירה קלה.",
    minHeightCm: null,
    priority: "good_if_time",
    waitLevelSeptember: "quick_service",
    bestTimeToRide: ["breakfast", "afternoon"],
    planningNeeded: "no_reservation",
    skipLine: "Counter Service",
    suitableFor: ["preschooler", "youngKid", "olderKid", "adults"],
    familyMode: "all_together",
    indoor: true,
    rainFriendly: true,
    durationMin: 20,
    nearby: [
      "Port of Entry",
      "Seuss Landing",
      "Marvel Super Hero Island"
    ],
    tip: "טוב לקפה/מאפה בתחילת היום, לא לארוחה גדולה."
  },
  {
    id: "comic-strip-cafe",
    name: "Comic Strip Cafe",
    resort: "Universal",
    park: "Islands of Adventure",
    area: "Toon Lagoon",
    areaId: "toon-lagoon",
    category: "dining",
    diningType: "quick_service",
    mealUse: "emergency_kids_food",
    foodStyle: "kids_food",
    kidsFriendly: true,
    mobileOrder: true,
    reservationNeeded: false,
    shortDescription:
      "אוכל מהיר באזור Toon Lagoon. לא בחירה ראשונה, אבל שימושי אם הילדים רעבים באזור.",
    minHeightCm: null,
    priority: "skip_if_busy",
    waitLevelSeptember: "quick_service",
    bestTimeToRide: ["lunch", "dinner"],
    planningNeeded: "check_same_day_hours",
    skipLine: "Mobile Order",
    suitableFor: ["preschooler", "youngKid", "olderKid"],
    familyMode: "all_together",
    indoor: true,
    rainFriendly: true,
    durationMin: 30,
    nearby: [
      "Popeye & Bluto’s Bilge-Rat Barges",
      "Dudley Do-Right’s Ripsaw Falls",
      "Me Ship, The Olive"
    ],
    tip: "פתרון חירום באזור, לא יעד אוכל."
  },
  {
    id: "cafe-4",
    name: "Cafe 4",
    resort: "Universal",
    park: "Islands of Adventure",
    area: "Marvel Super Hero Island",
    areaId: "marvel-super-hero-island",
    category: "dining",
    diningType: "quick_service",
    mealUse: "emergency_kids_food",
    foodStyle: "kids_food",
    kidsFriendly: true,
    mobileOrder: true,
    reservationNeeded: false,
    shortDescription:
      "פיצה/פסטה/אוכל פשוט באזור Marvel. שימושי אם הילדים צריכים משהו מוכר.",
    minHeightCm: null,
    priority: "skip_if_busy",
    waitLevelSeptember: "quick_service",
    bestTimeToRide: ["lunch", "dinner"],
    planningNeeded: "check_same_day_hours",
    skipLine: "Mobile Order",
    suitableFor: ["preschooler", "youngKid", "olderKid"],
    familyMode: "all_together",
    indoor: true,
    rainFriendly: true,
    durationMin: 30,
    nearby: [
      "The Amazing Adventures of Spider-Man",
      "The Incredible Hulk Coaster",
      "Marvel Characters"
    ],
    tip: "לא בחירה קולינרית, אבל נוח אם אתם באזור Marvel."
  }
];

function writeJs(fileName, exportName, value) {
  const filePath = path.join(parkDir, fileName);
  const content = `export const ${exportName} = ${JSON.stringify(value, null, 2)};
`;
  fs.writeFileSync(filePath, content, "utf8");
}

writeJs("areas.js", "islandsOfAdventureAreas", areas);
writeJs("attractions.js", "islandsOfAdventureAttractions", attractions);
writeJs("dining.js", "islandsOfAdventureDining", dining);

fs.writeFileSync(
  path.join(parkDir, "index.js"),
  `import { islandsOfAdventureAreas } from "./areas.js";
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
`,
  "utf8"
);

const universalIndexPath = path.join(projectRoot, "src", "data", "universal", "index.js");

fs.writeFileSync(
  universalIndexPath,
  `import {
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
};

const epicUniversePark = {
  id: "epic-universe",
  name: "Epic Universe",
  resort: "Universal",
  areas: [],
  items: [],
};

export const universalParks = [
  universalStudiosPark,
  islandsOfAdventurePark,
  epicUniversePark,
];

export const universalItems = universalParks.flatMap((park) => park.items);
`,
  "utf8"
);

console.log("Islands of Adventure data added.");
console.log("Files created:");
console.log("src/data/universal/islandsOfAdventure/areas.js");
console.log("src/data/universal/islandsOfAdventure/attractions.js");
console.log("src/data/universal/islandsOfAdventure/dining.js");
console.log("src/data/universal/islandsOfAdventure/index.js");
console.log("Updated src/data/universal/index.js");