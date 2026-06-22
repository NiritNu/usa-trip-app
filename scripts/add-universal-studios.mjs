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
  "universalStudios"
);

fs.mkdirSync(parkDir, { recursive: true });

const oldParksExpress = {
  includedWithHotel: true,
  type: "unlimited",
  note: "כלול לכם דרך מלון Premier בפארקים הוותיקים: Universal Studios Florida ו-Islands of Adventure. לא תקף ל-Epic Universe."
};

const areas = [
  {
    id: "production-central",
    name: "Production Central",
    hebrewName: "פרודקשן סנטרל",
    park: "Universal Studios Florida",
    resort: "Universal",
    nearbyAreas: ["new-york", "dreamworks-land", "hollywood"]
  },
  {
    id: "new-york",
    name: "New York",
    hebrewName: "ניו יורק",
    park: "Universal Studios Florida",
    resort: "Universal",
    nearbyAreas: ["production-central", "san-francisco", "hollywood"]
  },
  {
    id: "san-francisco",
    name: "San Francisco",
    hebrewName: "סן פרנסיסקו",
    park: "Universal Studios Florida",
    resort: "Universal",
    nearbyAreas: ["new-york", "the-wizarding-world-diagon-alley"]
  },
  {
    id: "the-wizarding-world-diagon-alley",
    name: "The Wizarding World of Harry Potter - Diagon Alley",
    hebrewName: "הארי פוטר - דיאגון אלי",
    park: "Universal Studios Florida",
    resort: "Universal",
    nearbyAreas: ["san-francisco", "world-expo"]
  },
  {
    id: "world-expo",
    name: "World Expo",
    hebrewName: "וורלד אקספו",
    park: "Universal Studios Florida",
    resort: "Universal",
    nearbyAreas: ["the-wizarding-world-diagon-alley", "springfield"]
  },
  {
    id: "springfield",
    name: "Springfield: Home of the Simpsons",
    hebrewName: "ספרינגפילד",
    park: "Universal Studios Florida",
    resort: "Universal",
    nearbyAreas: ["world-expo", "woody-woodpecker"]
  },
  {
    id: "dreamworks-land",
    name: "DreamWorks Land",
    hebrewName: "דרימוורקס",
    park: "Universal Studios Florida",
    resort: "Universal",
    nearbyAreas: ["production-central", "hollywood"]
  },
  {
    id: "hollywood",
    name: "Hollywood",
    hebrewName: "הוליווד",
    park: "Universal Studios Florida",
    resort: "Universal",
    nearbyAreas: ["production-central", "new-york", "dreamworks-land"]
  }
];

const attractions = [
  {
    id: "escape-from-gringotts",
    name: "Harry Potter and the Escape from Gringotts",
    resort: "Universal",
    park: "Universal Studios Florida",
    area: "Diagon Alley",
    areaId: "the-wizarding-world-diagon-alley",
    category: "ride",
    shortDescription:
      "מתקן הארי פוטר מרכזי בתוך גרינגוטס. שילוב של רכבת, מסכים וסיפור. חובה לחובבי הארי פוטר.",
    minHeightCm: 107,
    intensity: "medium",
    scareFactor: "medium",
    motionSicknessRisk: "medium",
    priority: "must_do",
    avgWaitSeptemberMin: 55,
    waitLevelSeptember: "high",
    bestTimeToRide: ["morning", "late_evening"],
    planningNeeded: "high_priority",
    skipLine: "Universal Express",
    express: oldParksExpress,
    expressPriority: "use",
    suitableFor: ["olderKid", "adults"],
    familyMode: "some_together",
    indoor: true,
    rainFriendly: true,
    durationMin: 5,
    nearby: ["Diagon Alley", "Leaky Cauldron", "Hogwarts Express - King's Cross Station"],
    tip: "עוגן של הפארק. עם Express Unlimited שלכם — להשתמש."
  },
  {
    id: "hogwarts-express-kings-cross",
    name: "Hogwarts Express - King’s Cross Station",
    resort: "Universal",
    park: "Universal Studios Florida",
    area: "Diagon Alley",
    areaId: "the-wizarding-world-diagon-alley",
    category: "ride",
    shortDescription:
      "רכבת בין Universal Studios ל-Islands of Adventure. צריך כרטיס Park-to-Park. החוויה שונה בכל כיוון.",
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
    nearby: ["Diagon Alley", "Leaky Cauldron", "Knight Bus"],
    tip: "רלוונטי רק אם באותו יום עוברים גם ל-Islands of Adventure."
  },
  {
    id: "revenge-of-the-mummy",
    name: "Revenge of the Mummy",
    resort: "Universal",
    park: "Universal Studios Florida",
    area: "New York",
    areaId: "new-york",
    category: "ride",
    shortDescription:
      "רכבת הרים פנימית, חשוכה ומהירה. מצוינת, אבל מפחידה יחסית.",
    minHeightCm: 122,
    intensity: "thrill",
    scareFactor: "high",
    motionSicknessRisk: "medium",
    priority: "must_do",
    avgWaitSeptemberMin: 35,
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
    durationMin: 4,
    nearby: ["The Blues Brothers Show", "Race Through New York Starring Jimmy Fallon", "Louie's Italian Restaurant"],
    tip: "לילד שאוהב אקסטרים — חובה. לילד רגיש לפחד/חושך — לא."
  },
  {
    id: "transformers-the-ride-3d",
    name: "TRANSFORMERS: The Ride-3D",
    resort: "Universal",
    park: "Universal Studios Florida",
    area: "Production Central",
    areaId: "production-central",
    category: "ride",
    shortDescription:
      "סימולטור אקשן תלת־ממדי עם הרבה תנועה, רעש ומסכים.",
    minHeightCm: 102,
    intensity: "medium",
    scareFactor: "medium",
    motionSicknessRisk: "medium",
    priority: "good_if_time",
    avgWaitSeptemberMin: 30,
    waitLevelSeptember: "medium",
    bestTimeToRide: ["morning", "evening"],
    planningNeeded: "no_reservation",
    skipLine: "Universal Express",
    express: oldParksExpress,
    expressPriority: "use",
    suitableFor: ["olderKid", "adults"],
    familyMode: "some_together",
    indoor: true,
    rainFriendly: true,
    durationMin: 5,
    nearby: ["Despicable Me Minion Mayhem", "Hollywood Rip Ride Rockit area", "Production Central"],
    tip: "כיף אם אוהבים אקשן. רגישים לבחילה/מסכים יכולים לדלג."
  },
  {
    id: "despicable-me-minion-mayhem",
    name: "Despicable Me Minion Mayhem",
    resort: "Universal",
    park: "Universal Studios Florida",
    area: "Production Central",
    areaId: "production-central",
    category: "ride",
    shortDescription:
      "סימולטור Minions משפחתי. חמוד לילדים, אבל יכול לגרום בחילה לרגישים.",
    minHeightCm: 102,
    intensity: "mild",
    scareFactor: "none",
    motionSicknessRisk: "medium",
    priority: "good_if_time",
    avgWaitSeptemberMin: 30,
    waitLevelSeptember: "medium",
    bestTimeToRide: ["morning", "afternoon"],
    planningNeeded: "no_reservation",
    skipLine: "Universal Express",
    express: oldParksExpress,
    expressPriority: "not_needed",
    suitableFor: ["youngKid", "olderKid", "adults"],
    familyMode: "some_together",
    indoor: true,
    rainFriendly: true,
    durationMin: 8,
    nearby: ["Minion Land", "TRANSFORMERS", "Production Central"],
    tip: "לעשות אם התור קצר או עם Express, אבל לא עוגן יום."
  },
  {
    id: "villain-con-minion-blast",
    name: "Illumination’s Villain-Con Minion Blast",
    resort: "Universal",
    park: "Universal Studios Florida",
    area: "Production Central",
    areaId: "production-central",
    category: "ride",
    shortDescription:
      "מתקן יריות/הליכה על מסוע בעולם המיניונים. ללא רכבת, אבל עומדים וזזים לאורך המסלול.",
    minHeightCm: null,
    intensity: "mild",
    scareFactor: "none",
    motionSicknessRisk: "low",
    priority: "good_if_time",
    avgWaitSeptemberMin: 25,
    waitLevelSeptember: "medium",
    bestTimeToRide: ["morning", "afternoon"],
    planningNeeded: "no_reservation",
    skipLine: "Universal Express",
    express: oldParksExpress,
    expressPriority: "not_needed",
    suitableFor: ["youngKid", "olderKid", "adults"],
    familyMode: "all_together",
    indoor: true,
    rainFriendly: true,
    durationMin: 8,
    nearby: ["Despicable Me Minion Mayhem", "Minion Café", "Production Central"],
    tip: "טוב לילדים שאוהבים משחקי יריות. לא חובה אם היום עמוס."
  },
  {
    id: "et-adventure",
    name: "E.T. Adventure",
    resort: "Universal",
    park: "Universal Studios Florida",
    area: "DreamWorks Land",
    areaId: "dreamworks-land",
    category: "ride",
    shortDescription:
      "מתקן קלאסי ורגוע יחסית, קצת נוסטלגי. מתאים מאוד לילדים שלא אוהבים אקסטרים.",
    minHeightCm: 87,
    intensity: "calm",
    scareFactor: "low",
    motionSicknessRisk: "low",
    priority: "must_do",
    avgWaitSeptemberMin: 20,
    waitLevelSeptember: "low",
    bestTimeToRide: ["midday", "afternoon"],
    planningNeeded: "no_reservation",
    skipLine: "Universal Express",
    express: oldParksExpress,
    expressPriority: "not_needed",
    suitableFor: ["preschooler", "youngKid", "olderKid", "adults"],
    familyMode: "all_together",
    indoor: true,
    rainFriendly: true,
    durationMin: 5,
    nearby: ["DreamWorks Land", "Animal Actors", "SpongeBob StorePants"],
    tip: "בחירה טובה לילד שלא אוהב חזק/מפחיד."
  },
  {
    id: "men-in-black-alien-attack",
    name: "MEN IN BLACK Alien Attack",
    resort: "Universal",
    park: "Universal Studios Florida",
    area: "World Expo",
    areaId: "world-expo",
    category: "ride",
    shortDescription:
      "מתקן יריות תחרותי עם סיבובים. כיפי למשפחה, אבל קצת מסובב.",
    minHeightCm: 107,
    intensity: "mild",
    scareFactor: "low",
    motionSicknessRisk: "medium",
    priority: "must_do",
    avgWaitSeptemberMin: 25,
    waitLevelSeptember: "medium",
    bestTimeToRide: ["morning", "evening"],
    planningNeeded: "no_reservation",
    skipLine: "Universal Express",
    express: oldParksExpress,
    expressPriority: "use",
    suitableFor: ["youngKid", "olderKid", "adults"],
    familyMode: "some_together",
    indoor: true,
    rainFriendly: true,
    durationMin: 5,
    nearby: ["The Simpsons Ride", "Springfield", "Diagon Alley"],
    tip: "מצוין אם אוהבים תחרות ומשחקי יריות. אפשר לעשות יותר מפעם אחת עם Unlimited."
  },
  {
    id: "the-simpsons-ride",
    name: "The Simpsons Ride",
    resort: "Universal",
    park: "Universal Studios Florida",
    area: "Springfield",
    areaId: "springfield",
    category: "ride",
    shortDescription:
      "סימולטור חזק ומשוגע של הסימפסונים. מצחיק, אבל מאוד בעייתי לרגישים לבחילה.",
    minHeightCm: 102,
    intensity: "medium",
    scareFactor: "low",
    motionSicknessRisk: "high",
    priority: "good_if_time",
    avgWaitSeptemberMin: 25,
    waitLevelSeptember: "medium",
    bestTimeToRide: ["afternoon", "evening"],
    planningNeeded: "no_reservation",
    skipLine: "Universal Express",
    express: oldParksExpress,
    expressPriority: "not_needed",
    suitableFor: ["olderKid", "adults"],
    familyMode: "some_together",
    indoor: true,
    rainFriendly: true,
    durationMin: 6,
    nearby: ["Kang & Kodos' Twirl 'n' Hurl", "Bumblebee Man's Taco Truck", "MEN IN BLACK"],
    tip: "אם יש נטייה לבחילה — לדלג בלי רגשות אשם."
  },
  {
    id: "kang-kodos",
    name: "Kang & Kodos’ Twirl ’n’ Hurl",
    resort: "Universal",
    park: "Universal Studios Florida",
    area: "Springfield",
    areaId: "springfield",
    category: "ride",
    shortDescription:
      "מתקן סיבוב קליל לילדים באזור הסימפסונים.",
    minHeightCm: null,
    intensity: "mild",
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
    nearby: ["The Simpsons Ride", "Bumblebee Man's Taco Truck", "Springfield"],
    tip: "רק אם הילדים רוצים והתור קצר."
  },
  {
    id: "race-through-new-york",
    name: "Race Through New York Starring Jimmy Fallon",
    resort: "Universal",
    park: "Universal Studios Florida",
    area: "New York",
    areaId: "new-york",
    category: "ride",
    shortDescription:
      "סימולטור קליל יחסית עם Jimmy Fallon. לא חובה, אבל ממוזג ונוח.",
    minHeightCm: 102,
    intensity: "mild",
    scareFactor: "none",
    motionSicknessRisk: "medium",
    priority: "skip_if_busy",
    avgWaitSeptemberMin: 20,
    waitLevelSeptember: "low",
    bestTimeToRide: ["midday", "afternoon"],
    planningNeeded: "no_reservation",
    skipLine: "Universal Express",
    express: oldParksExpress,
    expressPriority: "not_needed",
    suitableFor: ["youngKid", "olderKid", "adults"],
    familyMode: "some_together",
    indoor: true,
    rainFriendly: true,
    durationMin: 5,
    nearby: ["Revenge of the Mummy", "Louie's Italian Restaurant", "New York"],
    tip: "לשמור למזגן/זמן פנוי. לא עוגן."
  },
  {
    id: "fast-furious-supercharged",
    name: "Fast & Furious - Supercharged",
    resort: "Universal",
    park: "Universal Studios Florida",
    area: "San Francisco",
    areaId: "san-francisco",
    category: "ride",
    shortDescription:
      "אטרקציה מבוססת מסכים ורכב גדול. בדרך כלל פחות אהובה, אבל אפשרית אם התור קצר מאוד.",
    minHeightCm: 102,
    intensity: "mild",
    scareFactor: "low",
    motionSicknessRisk: "medium",
    priority: "skip_if_busy",
    avgWaitSeptemberMin: 15,
    waitLevelSeptember: "low",
    bestTimeToRide: ["afternoon"],
    planningNeeded: "no_reservation",
    skipLine: "Universal Express",
    express: oldParksExpress,
    expressPriority: "not_needed",
    suitableFor: ["olderKid", "adults"],
    familyMode: "some_together",
    indoor: true,
    rainFriendly: true,
    durationMin: 5,
    nearby: ["San Francisco", "Diagon Alley", "Richter's Burger Co."],
    tip: "רק אם ממש יש זמן או רוצים מזגן. לא לבנות עליו."
  },
  {
    id: "bourne-stuntacular",
    name: "The Bourne Stuntacular",
    resort: "Universal",
    park: "Universal Studios Florida",
    area: "Hollywood",
    areaId: "hollywood",
    category: "show",
    shortDescription:
      "מופע פעלולים וטכנולוגיה מאוד מרשים. טוב במיוחד לילדים גדולים ומבוגרים.",
    minHeightCm: null,
    intensity: "medium",
    scareFactor: "medium",
    motionSicknessRisk: "low",
    priority: "must_do",
    avgWaitSeptemberMin: null,
    waitLevelSeptember: "schedule_based",
    bestTimeToRide: ["scheduled_time"],
    planningNeeded: "check_same_day_hours",
    skipLine: "Universal Express",
    express: oldParksExpress,
    expressPriority: "use",
    suitableFor: ["olderKid", "adults"],
    familyMode: "some_together",
    indoor: true,
    rainFriendly: true,
    durationMin: 25,
    nearby: ["Hollywood", "Universal Orlando Horror Make-Up Show", "Schwab's Pharmacy"],
    tip: "אחד המופעים הטובים בפארק. לבדוק שעות ולשבץ."
  },
  {
    id: "horror-make-up-show",
    name: "Universal Orlando Horror Make-Up Show",
    resort: "Universal",
    park: "Universal Studios Florida",
    area: "Hollywood",
    areaId: "hollywood",
    category: "show",
    shortDescription:
      "מופע מצחיק על אפקטים ואיפור אימה. יכול להיות קצת מפחיד/גס לילדים קטנים.",
    minHeightCm: null,
    intensity: "medium",
    scareFactor: "medium",
    motionSicknessRisk: "low",
    priority: "good_if_time",
    avgWaitSeptemberMin: null,
    waitLevelSeptember: "schedule_based",
    bestTimeToRide: ["scheduled_time"],
    planningNeeded: "check_same_day_hours",
    skipLine: "Universal Express",
    express: oldParksExpress,
    expressPriority: "not_needed",
    suitableFor: ["olderKid", "adults"],
    familyMode: "some_together",
    indoor: true,
    rainFriendly: true,
    durationMin: 25,
    nearby: ["The Bourne Stuntacular", "Hollywood", "Schwab's Pharmacy"],
    tip: "לא לילדים רגישים. טוב אם הגדולים אוהבים מאחורי הקלעים."
  },
  {
    id: "animal-actors",
    name: "Animal Actors on Location!",
    resort: "Universal",
    park: "Universal Studios Florida",
    area: "DreamWorks Land",
    areaId: "dreamworks-land",
    category: "show",
    shortDescription:
      "מופע בעלי חיים קליל ומשפחתי. טוב לילדים קטנים.",
    minHeightCm: null,
    intensity: "calm",
    scareFactor: "none",
    motionSicknessRisk: "low",
    priority: "good_if_time",
    avgWaitSeptemberMin: null,
    waitLevelSeptember: "schedule_based",
    bestTimeToRide: ["midday", "afternoon"],
    planningNeeded: "check_same_day_hours",
    skipLine: "Universal Express",
    express: oldParksExpress,
    expressPriority: "not_needed",
    suitableFor: ["preschooler", "youngKid", "olderKid"],
    familyMode: "all_together",
    indoor: false,
    rainFriendly: false,
    durationMin: 20,
    nearby: ["E.T. Adventure", "DreamWorks Land", "SpongeBob StorePants"],
    tip: "טוב להפסקה אם מזג האוויר נעים."
  },
  {
    id: "dreamworks-land-experiences",
    name: "DreamWorks Land Experiences",
    resort: "Universal",
    park: "Universal Studios Florida",
    area: "DreamWorks Land",
    areaId: "dreamworks-land",
    category: "experience",
    shortDescription:
      "אזור לילדים קטנים עם חוויות, משחקים ודמויות מעולמות DreamWorks.",
    minHeightCm: null,
    intensity: "calm",
    scareFactor: "none",
    motionSicknessRisk: "low",
    priority: "must_do",
    avgWaitSeptemberMin: 10,
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
    durationMin: 35,
    nearby: ["E.T. Adventure", "Animal Actors", "SpongeBob StorePants"],
    tip: "חשוב במיוחד לילדה/ילדים קטנים כשצריך משהו רגוע יותר."
  },
  {
    id: "universal-characters",
    name: "Universal Characters",
    resort: "Universal",
    park: "Universal Studios Florida",
    area: "Various Areas",
    areaId: "production-central",
    category: "character",
    shortDescription:
      "מפגשי דמויות משתנים: Minions, Transformers, SpongeBob, DreamWorks ועוד.",
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
    suitableFor: ["preschooler", "youngKid", "olderKid"],
    familyMode: "all_together",
    indoor: false,
    rainFriendly: false,
    durationMin: 15,
    nearby: ["Production Central", "DreamWorks Land", "Hollywood"],
    tip: "לעצור אם רואים דמות עם תור קצר. לא לרדוף אחרי כולן."
  },
  {
    id: "knight-bus",
    name: "Knight Bus",
    resort: "Universal",
    park: "Universal Studios Florida",
    area: "London / Diagon Alley",
    areaId: "the-wizarding-world-diagon-alley",
    category: "experience",
    shortDescription:
      "חוויה/צילום עם אוטונוס הלילה מחוץ ל-Diagon Alley.",
    minHeightCm: null,
    intensity: "calm",
    scareFactor: "none",
    motionSicknessRisk: "low",
    priority: "good_if_time",
    avgWaitSeptemberMin: 10,
    waitLevelSeptember: "low",
    bestTimeToRide: ["morning", "afternoon", "evening"],
    planningNeeded: "no_reservation",
    skipLine: "None",
    express: oldParksExpress,
    expressPriority: "not_available",
    suitableFor: ["youngKid", "olderKid", "adults"],
    familyMode: "all_together",
    indoor: false,
    rainFriendly: false,
    durationMin: 10,
    nearby: ["Diagon Alley", "Hogwarts Express - King’s Cross Station", "Leaky Cauldron"],
    tip: "מעולה לתמונה/אווירה אם אתם באזור הארי פוטר."
  }
];

const dining = [
  {
    id: "leaky-cauldron",
    name: "Leaky Cauldron",
    resort: "Universal",
    park: "Universal Studios Florida",
    area: "Diagon Alley",
    areaId: "the-wizarding-world-diagon-alley",
    category: "dining",
    diningType: "quick_service",
    mealUse: "real_meal",
    foodStyle: "quick_varied",
    kidsFriendly: true,
    mobileOrder: false,
    reservationNeeded: false,
    shortDescription:
      "מסעדת הארי פוטר בדיאגון אלי. לא הכי fresh, אבל חוויה חזקה ומאוד מתאימה לאווירה.",
    minHeightCm: null,
    priority: "must_do",
    waitLevelSeptember: "quick_service",
    bestTimeToRide: ["lunch", "dinner"],
    planningNeeded: "no_reservation",
    skipLine: "Counter Service",
    suitableFor: ["preschooler", "youngKid", "olderKid", "adults"],
    familyMode: "all_together",
    indoor: true,
    rainFriendly: true,
    durationMin: 40,
    nearby: ["Harry Potter and the Escape from Gringotts", "Diagon Alley", "Hogwarts Express"],
    tip: "בחירה טובה אם רוצים חוויית הארי פוטר. לא בהכרח הבחירה הכי קלילה."
  },
  {
    id: "today-cafe",
    name: "TODAY Cafe",
    resort: "Universal",
    park: "Universal Studios Florida",
    area: "Production Central",
    areaId: "production-central",
    category: "dining",
    diningType: "quick_service",
    mealUse: "real_meal",
    foodStyle: "fresh_quick",
    kidsFriendly: true,
    mobileOrder: false,
    reservationNeeded: false,
    shortDescription:
      "אחת הבחירות היותר טובות לישראלים: כריכים, סלטים, קפה וקינוחים. קליל יותר מהמבורגר/צ׳יפס.",
    minHeightCm: null,
    priority: "must_do",
    waitLevelSeptember: "quick_service",
    bestTimeToRide: ["breakfast", "lunch", "afternoon"],
    planningNeeded: "no_reservation",
    skipLine: "Counter Service",
    suitableFor: ["preschooler", "youngKid", "olderKid", "adults"],
    familyMode: "all_together",
    indoor: true,
    rainFriendly: true,
    durationMin: 30,
    nearby: ["Despicable Me Minion Mayhem", "TRANSFORMERS", "Production Central"],
    tip: "כנראה אחת הבחירות הכי פרשיות ומהירות בפארק."
  },
  {
    id: "louies-italian-restaurant",
    name: "Louie’s Italian Restaurant",
    resort: "Universal",
    park: "Universal Studios Florida",
    area: "New York",
    areaId: "new-york",
    category: "dining",
    diningType: "quick_service",
    mealUse: "real_meal",
    foodStyle: "kids_food",
    kidsFriendly: true,
    mobileOrder: false,
    reservationNeeded: false,
    shortDescription:
      "פיצה, פסטה, סאב וסלטים. לא גורמה, אבל מאוד נוח עם ילדים.",
    minHeightCm: null,
    priority: "good_if_time",
    waitLevelSeptember: "quick_service",
    bestTimeToRide: ["lunch", "dinner"],
    planningNeeded: "no_reservation",
    skipLine: "Counter Service",
    suitableFor: ["preschooler", "youngKid", "olderKid"],
    familyMode: "all_together",
    indoor: true,
    rainFriendly: true,
    durationMin: 30,
    nearby: ["Revenge of the Mummy", "Race Through New York", "New York"],
    tip: "פתרון טוב אם הילדים רוצים אוכל פשוט. Universal מתארת את המקום כפיצה, פסטה, סאב וסלטים."
  },
  {
    id: "central-park-crepes",
    name: "Central Park Crepes",
    resort: "Universal",
    park: "Universal Studios Florida",
    area: "New York",
    areaId: "new-york",
    category: "dining",
    diningType: "quick_service",
    mealUse: "snack",
    foodStyle: "fresh_quick",
    kidsFriendly: true,
    mobileOrder: false,
    reservationNeeded: false,
    shortDescription:
      "קרפים מלוחים ומתוקים. טוב לארוחה קלה/נשנוש יותר מעניין.",
    minHeightCm: null,
    priority: "good_if_time",
    waitLevelSeptember: "quick_service",
    bestTimeToRide: ["lunch", "afternoon"],
    planningNeeded: "no_reservation",
    skipLine: "Counter Service",
    suitableFor: ["youngKid", "olderKid", "adults"],
    familyMode: "all_together",
    indoor: false,
    rainFriendly: false,
    durationMin: 20,
    nearby: ["New York", "Race Through New York", "Revenge of the Mummy"],
    tip: "שווה אם התור קצר ורוצים משהו קצת פחות כבד."
  },
  {
    id: "bumblebee-mans-taco-truck",
    name: "Bumblebee Man’s Taco Truck",
    resort: "Universal",
    park: "Universal Studios Florida",
    area: "Springfield",
    areaId: "springfield",
    category: "dining",
    diningType: "quick_service",
    mealUse: "real_meal",
    foodStyle: "mexican_quick",
    kidsFriendly: true,
    mobileOrder: false,
    reservationNeeded: false,
    shortDescription:
      "טאקו/מקסיקני מהיר באזור סימפסונים. שימושי אם רוצים משהו מהיר ולא המבורגר.",
    minHeightCm: null,
    priority: "good_if_time",
    waitLevelSeptember: "quick_service",
    bestTimeToRide: ["lunch", "dinner"],
    planningNeeded: "no_reservation",
    skipLine: "Counter Service",
    suitableFor: ["youngKid", "olderKid", "adults"],
    familyMode: "all_together",
    indoor: false,
    rainFriendly: false,
    durationMin: 25,
    nearby: ["The Simpsons Ride", "MEN IN BLACK", "Kang & Kodos"],
    tip: "אופציה טובה למשפחה ישראלית אם בא לכם מקסיקני מהיר."
  },
  {
    id: "mels-drive-in",
    name: "Mel’s Drive-In",
    resort: "Universal",
    park: "Universal Studios Florida",
    area: "Hollywood",
    areaId: "hollywood",
    category: "dining",
    diningType: "quick_service",
    mealUse: "emergency_kids_food",
    foodStyle: "kids_food",
    kidsFriendly: true,
    mobileOrder: false,
    reservationNeeded: false,
    shortDescription:
      "המבורגרים/צ׳יפס בסגנון דיינר. לא fresh, אבל פתרון ילדים פשוט.",
    minHeightCm: null,
    priority: "skip_if_busy",
    waitLevelSeptember: "quick_service",
    bestTimeToRide: ["lunch", "dinner"],
    planningNeeded: "no_reservation",
    skipLine: "Counter Service",
    suitableFor: ["preschooler", "youngKid", "olderKid"],
    familyMode: "all_together",
    indoor: true,
    rainFriendly: true,
    durationMin: 30,
    nearby: ["Hollywood", "The Bourne Stuntacular", "Horror Make-Up Show"],
    tip: "רק אם צריך משהו מוכר ומהיר לילדים."
  },
  {
    id: "minion-cafe",
    name: "Illumination’s Minion Cafe",
    resort: "Universal",
    park: "Universal Studios Florida",
    area: "Production Central",
    areaId: "production-central",
    category: "dining",
    diningType: "quick_service",
    mealUse: "real_meal",
    foodStyle: "quick_varied",
    kidsFriendly: true,
    mobileOrder: false,
    reservationNeeded: false,
    shortDescription:
      "מסעדת מיניונים מעוצבת וכיפית לילדים. אוכל מגוון יחסית, בעיקר חוויה.",
    minHeightCm: null,
    priority: "good_if_time",
    waitLevelSeptember: "quick_service",
    bestTimeToRide: ["lunch", "dinner"],
    planningNeeded: "no_reservation",
    skipLine: "Counter Service",
    suitableFor: ["preschooler", "youngKid", "olderKid"],
    familyMode: "all_together",
    indoor: true,
    rainFriendly: true,
    durationMin: 35,
    nearby: ["Despicable Me Minion Mayhem", "Villain-Con Minion Blast", "Production Central"],
    tip: "טוב אם הילדים אוהבים מיניונים. מבחינת אוכל — לא חובה אם Today Cafe מתאים יותר."
  }
];

function writeJs(fileName, exportName, value) {
  const filePath = path.join(parkDir, fileName);
  const content = `export const ${exportName} = ${JSON.stringify(value, null, 2)};
`;
  fs.writeFileSync(filePath, content, "utf8");
}

writeJs("areas.js", "universalStudiosAreas", areas);
writeJs("attractions.js", "universalStudiosAttractions", attractions);
writeJs("dining.js", "universalStudiosDining", dining);

fs.writeFileSync(
  path.join(parkDir, "index.js"),
  `import { universalStudiosAreas } from "./areas.js";
import { universalStudiosAttractions } from "./attractions.js";
import { universalStudiosDining } from "./dining.js";

export {
  universalStudiosAreas,
  universalStudiosAttractions,
  universalStudiosDining,
};

export const universalStudiosItems = [
  ...universalStudiosAttractions,
  ...universalStudiosDining,
];

export const universalStudiosPark = {
  id: "universal-studios-florida",
  name: "Universal Studios Florida",
  resort: "Universal",
  areas: universalStudiosAreas,
  items: universalStudiosItems,
};
`,
  "utf8"
);

const universalIndexDir = path.join(projectRoot, "src", "data", "universal");
fs.mkdirSync(universalIndexDir, { recursive: true });

fs.writeFileSync(
  path.join(universalIndexDir, "index.js"),
  `import {
  universalStudiosAreas,
  universalStudiosAttractions,
  universalStudiosDining,
  universalStudiosItems,
  universalStudiosPark,
} from "./universalStudios/index.js";

export {
  universalStudiosAreas,
  universalStudiosAttractions,
  universalStudiosDining,
  universalStudiosItems,
  universalStudiosPark,
};

const islandsOfAdventurePark = {
  id: "islands-of-adventure",
  name: "Islands of Adventure",
  resort: "Universal",
  areas: [],
  items: [],
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

const universalPagePath = path.join(projectRoot, "src", "pages", "Universal.jsx");

fs.writeFileSync(
  universalPagePath,
  `import { useMemo, useState } from "react";
import AttractionCard from "../components/AttractionCard.jsx";
import { universalParks } from "../data/universal/index.js";

const categoryFilters = [
  { id: "all", label: "הכל" },
  { id: "ride", label: "מתקנים" },
  { id: "show", label: "הופעות" },
  { id: "character", label: "דמויות" },
  { id: "experience", label: "חוויות" },
  { id: "dining", label: "אוכל" },
];

const needFilters = [
  { id: "all", label: "הכל" },
  { id: "must_do", label: "מומלץ מאוד" },
  { id: "express_use", label: "להשתמש ב-Express" },
  { id: "indoor", label: "מקורה/ממוזג" },
  { id: "no_height", label: "בלי מגבלת גובה" },
  { id: "all_together", label: "כולם יחד" },
  { id: "older_kids", label: "לגדולים" },
  { id: "rain", label: "טוב לגשם" },
];

export default function Universal() {
  const [selectedParkId, setSelectedParkId] = useState(
    universalParks[0]?.id || ""
  );
  const [selectedAreaId, setSelectedAreaId] = useState("all");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedNeed, setSelectedNeed] = useState("all");

  const selectedPark =
    universalParks.find((park) => park.id === selectedParkId) ||
    universalParks[0];

  const filteredItems = useMemo(() => {
    if (!selectedPark) return [];

    return selectedPark.items
      .filter((item) => {
        if (selectedAreaId !== "all" && item.areaId !== selectedAreaId) {
          return false;
        }

        if (selectedCategory !== "all" && item.category !== selectedCategory) {
          return false;
        }

        if (selectedNeed === "must_do") return item.priority === "must_do";
        if (selectedNeed === "express_use") return item.expressPriority === "use";
        if (selectedNeed === "indoor") return item.indoor === true;
        if (selectedNeed === "no_height") return item.minHeightCm == null;
        if (selectedNeed === "all_together") {
          return item.familyMode === "all_together";
        }
        if (selectedNeed === "older_kids") {
          return item.suitableFor?.includes("olderKid");
        }
        if (selectedNeed === "rain") return item.rainFriendly === true;

        return true;
      })
      .sort(sortItems);
  }, [selectedPark, selectedAreaId, selectedCategory, selectedNeed]);

  const diningItems = filteredItems.filter((item) => item.category === "dining");
  const nonDiningItems = filteredItems.filter((item) => item.category !== "dining");

  return (
    <section>
      <div className="section-header">
        <div>
          <p className="eyebrow">Universal</p>
          <h1>יוניברסל</h1>
          <p>
            מתקנים, הופעות, דמויות, אוכל ו-Express לפי פארק ואזור.
          </p>
        </div>
      </div>

      <div className="filter-group">
        {universalParks.map((park) => (
          <button
            key={park.id}
            type="button"
            className={park.id === selectedParkId ? "active" : ""}
            onClick={() => {
              setSelectedParkId(park.id);
              setSelectedAreaId("all");
              setSelectedCategory("all");
              setSelectedNeed("all");
            }}
          >
            {park.name}
          </button>
        ))}
      </div>

      {selectedPark?.areas?.length > 0 && (
        <div className="filter-group">
          <button
            type="button"
            className={selectedAreaId === "all" ? "active" : ""}
            onClick={() => setSelectedAreaId("all")}
          >
            כל האזורים
          </button>

          {selectedPark.areas.map((area) => (
            <button
              key={area.id}
              type="button"
              className={selectedAreaId === area.id ? "active" : ""}
              onClick={() => setSelectedAreaId(area.id)}
            >
              {area.name}
            </button>
          ))}
        </div>
      )}

      <div className="filter-group">
        {categoryFilters.map((filter) => (
          <button
            key={filter.id}
            type="button"
            className={selectedCategory === filter.id ? "active" : ""}
            onClick={() => setSelectedCategory(filter.id)}
          >
            {filter.label}
          </button>
        ))}
      </div>

      <div className="filter-group">
        {needFilters.map((filter) => (
          <button
            key={filter.id}
            type="button"
            className={selectedNeed === filter.id ? "active" : ""}
            onClick={() => setSelectedNeed(filter.id)}
          >
            {filter.label}
          </button>
        ))}
      </div>

      {selectedPark?.items?.length === 0 ? (
        <div className="card">
          <h3>{selectedPark.name}</h3>
          <p>
            הפארק הזה עדיין לא מולא. נוסיף אותו בשלב הבא.
          </p>
        </div>
      ) : (
        <>
          {nonDiningItems.length > 0 && (
            <>
              <h2 className="small-title">מתקנים, הופעות ודמויות</h2>
              <div className="card-grid">
                {nonDiningItems.map((item) => (
                  <AttractionCard key={item.id} attraction={item} />
                ))}
              </div>
            </>
          )}

          {diningItems.length > 0 && (
            <>
              <h2 className="small-title">אוכל</h2>
              <div className="card-grid">
                {diningItems.map((item) => (
                  <AttractionCard key={item.id} attraction={item} />
                ))}
              </div>
            </>
          )}

          {filteredItems.length === 0 && (
            <div className="card">
              <h3>אין תוצאות</h3>
              <p>נסי לשנות אזור או פילטר.</p>
            </div>
          )}
        </>
      )}
    </section>
  );
}

function sortItems(a, b) {
  const priorityOrder = {
    must_do: 0,
    good_if_time: 1,
    skip_if_busy: 2,
  };

  const categoryOrder = {
    ride: 0,
    show: 1,
    character: 2,
    experience: 3,
    dining: 4,
  };

  const priorityA = priorityOrder[a.priority] ?? 99;
  const priorityB = priorityOrder[b.priority] ?? 99;

  if (priorityA !== priorityB) return priorityA - priorityB;

  const categoryA = categoryOrder[a.category] ?? 99;
  const categoryB = categoryOrder[b.category] ?? 99;

  if (categoryA !== categoryB) return categoryA - categoryB;

  const waitA = a.avgWaitSeptemberMin ?? 0;
  const waitB = b.avgWaitSeptemberMin ?? 0;

  if (waitA !== waitB) return waitB - waitA;

  return a.name.localeCompare(b.name);
}
`,
  "utf8"
);

console.log("Universal Studios Florida data added.");
console.log("Updated Universal page.");