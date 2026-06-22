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
  "epicUniverse"
);

fs.mkdirSync(parkDir, { recursive: true });

const epicExpress = {
  includedWithHotel: false,
  type: "once_per_ride",
  note: "נרכש בנפרד ל-Epic Universe. בדרך כלל מאפשר כניסה מקוצרת פעם אחת בכל אטרקציה משתתפת, לא Unlimited."
};

const noExpress = {
  includedWithHotel: false,
  type: "not_available",
  note: "לא רלוונטי כאן — חוויה, אזור פתוח, אוכל או מופע."
};

const areas = [
  {
    id: "celestial-park",
    name: "Celestial Park",
    hebrewName: "סלסטיאל פארק",
    park: "Epic Universe",
    resort: "Universal",
    nearbyAreas: [
      "super-nintendo-world",
      "dark-universe",
      "isle-of-berk",
      "ministry-of-magic"
    ]
  },
  {
    id: "super-nintendo-world",
    name: "Super Nintendo World",
    hebrewName: "סופר נינטנדו",
    park: "Epic Universe",
    resort: "Universal",
    nearbyAreas: ["celestial-park"]
  },
  {
    id: "dark-universe",
    name: "Dark Universe",
    hebrewName: "דארק יוניברס",
    park: "Epic Universe",
    resort: "Universal",
    nearbyAreas: ["celestial-park"]
  },
  {
    id: "isle-of-berk",
    name: "How to Train Your Dragon - Isle of Berk",
    hebrewName: "הדרקון הראשון שלי",
    park: "Epic Universe",
    resort: "Universal",
    nearbyAreas: ["celestial-park"]
  },
  {
    id: "ministry-of-magic",
    name: "The Wizarding World of Harry Potter - Ministry of Magic",
    hebrewName: "הארי פוטר - משרד הקסמים",
    park: "Epic Universe",
    resort: "Universal",
    nearbyAreas: ["celestial-park"]
  }
];

const attractions = [
  {
    id: "stardust-racers",
    name: "Stardust Racers",
    resort: "Universal",
    park: "Epic Universe",
    area: "Celestial Park",
    areaId: "celestial-park",
    category: "ride",
    shortDescription:
      "רכבת הרים כפולה ומהירה מאוד באזור המרכזי של Epic. אקסטרים אמיתי, לא לכל המשפחה.",
    minHeightCm: 122,
    intensity: "thrill",
    scareFactor: "high",
    motionSicknessRisk: "high",
    priority: "must_do",
    avgWaitSeptemberMin: 60,
    waitLevelSeptember: "high",
    bestTimeToRide: ["morning", "late_evening"],
    planningNeeded: "high_priority",
    skipLine: "Epic Express",
    express: epicExpress,
    expressPriority: "use",
    suitableFor: ["olderKid", "adults"],
    familyMode: "some_together",
    indoor: false,
    rainFriendly: false,
    durationMin: 3,
    nearby: ["Constellation Carousel", "Pizza Moon", "Atlantic", "Super Nintendo World"],
    tip:
      "רק למי שאוהב אקסטרים. אם ה-Epic Express שלכם כולל את זה — זה מקום טוב להשתמש בו."
  },
  {
    id: "constellation-carousel",
    name: "Constellation Carousel",
    resort: "Universal",
    park: "Epic Universe",
    area: "Celestial Park",
    areaId: "celestial-park",
    category: "ride",
    shortDescription:
      "קרוסלה יפה ומרכזית ב-Celestial Park. רגועה ומתאימה למשפחה.",
    minHeightCm: null,
    intensity: "calm",
    scareFactor: "none",
    motionSicknessRisk: "low",
    priority: "good_if_time",
    avgWaitSeptemberMin: 15,
    waitLevelSeptember: "low",
    bestTimeToRide: ["afternoon", "evening"],
    planningNeeded: "no_reservation",
    skipLine: "Epic Express / check app",
    express: epicExpress,
    expressPriority: "not_needed",
    suitableFor: ["preschooler", "youngKid", "olderKid", "adults"],
    familyMode: "all_together",
    indoor: false,
    rainFriendly: false,
    durationMin: 4,
    nearby: ["Stardust Racers", "Astronomica", "Pizza Moon"],
    tip:
      "נחמד אם התור קצר או בערב. לא לבזבז עליו Express אם יש תור סביר."
  },
  {
    id: "astronomica",
    name: "Astronomica",
    resort: "Universal",
    park: "Epic Universe",
    area: "Celestial Park",
    areaId: "celestial-park",
    category: "experience",
    shortDescription:
      "אזור מים/משחק קליל ב-Celestial Park. טוב לילדים ולחום.",
    minHeightCm: null,
    intensity: "calm",
    scareFactor: "none",
    motionSicknessRisk: "low",
    priority: "good_if_time",
    avgWaitSeptemberMin: 0,
    waitLevelSeptember: "low",
    bestTimeToRide: ["midday", "afternoon"],
    planningNeeded: "no_reservation",
    skipLine: "None",
    express: noExpress,
    expressPriority: "not_available",
    suitableFor: ["preschooler", "youngKid"],
    familyMode: "all_together",
    indoor: false,
    rainFriendly: false,
    durationMin: 15,
    nearby: ["Constellation Carousel", "Pizza Moon", "Stardust Racers"],
    tip:
      "יכול להיות שימושי ביום חם, אבל לקחת בחשבון שהילדים עלולים להירטב."
  },
  {
    id: "mario-kart-bowsers-challenge",
    name: "Mario Kart: Bowser’s Challenge",
    resort: "Universal",
    park: "Epic Universe",
    area: "Super Nintendo World",
    areaId: "super-nintendo-world",
    category: "ride",
    shortDescription:
      "מתקן Mario Kart עם משקפי AR, משחק וניקוד. אחד העוגנים הגדולים של Super Nintendo World.",
    minHeightCm: 102,
    intensity: "mild",
    scareFactor: "none",
    motionSicknessRisk: "medium",
    priority: "must_do",
    avgWaitSeptemberMin: 70,
    waitLevelSeptember: "high",
    bestTimeToRide: ["morning", "late_evening"],
    planningNeeded: "high_priority",
    skipLine: "Epic Express",
    express: epicExpress,
    expressPriority: "use",
    suitableFor: ["youngKid", "olderKid", "adults"],
    familyMode: "some_together",
    indoor: true,
    rainFriendly: true,
    durationMin: 5,
    nearby: ["Mine-Cart Madness", "Yoshi’s Adventure", "Toadstool Cafe"],
    tip:
      "עוגן לילדים ולמבוגרים שאוהבים Nintendo. שווה להשתמש ב-Epic Express אם התור גבוה."
  },
  {
    id: "mine-cart-madness",
    name: "Mine-Cart Madness",
    resort: "Universal",
    park: "Epic Universe",
    area: "Super Nintendo World",
    areaId: "super-nintendo-world",
    category: "ride",
    shortDescription:
      "רכבת Donkey Kong קצרה ומיוחדת עם תחושה של קפיצות מעל המסילה. פופולרית מאוד.",
    minHeightCm: 102,
    intensity: "medium",
    scareFactor: "low",
    motionSicknessRisk: "medium",
    priority: "must_do",
    avgWaitSeptemberMin: 75,
    waitLevelSeptember: "high",
    bestTimeToRide: ["morning", "late_evening"],
    planningNeeded: "high_priority",
    skipLine: "Epic Express",
    express: epicExpress,
    expressPriority: "use",
    suitableFor: ["youngKid", "olderKid", "adults"],
    familyMode: "some_together",
    indoor: false,
    rainFriendly: false,
    durationMin: 3,
    nearby: ["Mario Kart: Bowser’s Challenge", "Yoshi’s Adventure", "Toadstool Cafe"],
    tip:
      "אחד המקומות הכי הגיוניים ל-Epic Express אם הילדים בגובה ורוצים לעשות."
  },
  {
    id: "yoshis-adventure",
    name: "Yoshi’s Adventure",
    resort: "Universal",
    park: "Epic Universe",
    area: "Super Nintendo World",
    areaId: "super-nintendo-world",
    category: "ride",
    shortDescription:
      "רכיבה איטית וחמודה על יושי. מתאימה מאוד לילדים קטנים ולתצפית על האזור.",
    minHeightCm: 87,
    intensity: "calm",
    scareFactor: "none",
    motionSicknessRisk: "low",
    priority: "must_do",
    avgWaitSeptemberMin: 40,
    waitLevelSeptember: "medium",
    bestTimeToRide: ["morning", "afternoon"],
    planningNeeded: "no_reservation",
    skipLine: "Epic Express",
    express: epicExpress,
    expressPriority: "not_needed",
    suitableFor: ["preschooler", "youngKid"],
    familyMode: "all_together",
    indoor: false,
    rainFriendly: false,
    durationMin: 5,
    nearby: ["Mario Kart: Bowser’s Challenge", "Mine-Cart Madness", "Toadstool Cafe"],
    tip:
      "מצוין לילדה/ילדים צעירים. להשתמש ב-Express רק אם התור ממש ארוך."
  },
  {
    id: "power-up-band-activities",
    name: "Power-Up Band Activities",
    resort: "Universal",
    park: "Epic Universe",
    area: "Super Nintendo World",
    areaId: "super-nintendo-world",
    category: "experience",
    shortDescription:
      "משחקים ואינטראקציות ברחבי Super Nintendo World עם Power-Up Band.",
    minHeightCm: null,
    intensity: "mild",
    scareFactor: "none",
    motionSicknessRisk: "low",
    priority: "good_if_time",
    avgWaitSeptemberMin: 0,
    waitLevelSeptember: "low",
    bestTimeToRide: ["morning", "afternoon"],
    planningNeeded: "no_reservation",
    skipLine: "None",
    express: noExpress,
    expressPriority: "not_available",
    suitableFor: ["youngKid", "olderKid"],
    familyMode: "all_together",
    indoor: false,
    rainFriendly: false,
    durationMin: 30,
    nearby: ["Mario Kart: Bowser’s Challenge", "Mine-Cart Madness", "Yoshi’s Adventure"],
    tip:
      "כיף אם קונים Power-Up Band, אבל לא חובה. זה יכול לגזול זמן אם מנסים לעשות הכול."
  },
  {
    id: "monsters-unchained",
    name: "Monsters Unchained: The Frankenstein Experiment",
    resort: "Universal",
    park: "Epic Universe",
    area: "Dark Universe",
    areaId: "dark-universe",
    category: "ride",
    shortDescription:
      "מתקן Dark Ride מתקדם, אפל ומפחיד יחסית עם המפלצות הקלאסיות של Universal.",
    minHeightCm: 122,
    intensity: "thrill",
    scareFactor: "high",
    motionSicknessRisk: "medium",
    priority: "must_do",
    avgWaitSeptemberMin: 65,
    waitLevelSeptember: "high",
    bestTimeToRide: ["morning", "late_evening"],
    planningNeeded: "high_priority",
    skipLine: "Epic Express",
    express: epicExpress,
    expressPriority: "use",
    suitableFor: ["olderKid", "adults"],
    familyMode: "some_together",
    indoor: true,
    rainFriendly: true,
    durationMin: 5,
    nearby: ["Curse of the Werewolf", "Das Stakehaus", "Darkmoor Monster Makeup Experience"],
    tip:
      "כנראה לא לילדים רגישים. לילד שאוהב מפחיד/אקשן — עוגן מרכזי."
  },
  {
    id: "curse-of-the-werewolf",
    name: "Curse of the Werewolf",
    resort: "Universal",
    park: "Epic Universe",
    area: "Dark Universe",
    areaId: "dark-universe",
    category: "ride",
    shortDescription:
      "רכבת מסתובבת/משפחתית יחסית באזור Dark Universe. פחות קיצונית מ-Monsters Unchained אבל עדיין אפלה.",
    minHeightCm: 102,
    intensity: "medium",
    scareFactor: "medium",
    motionSicknessRisk: "medium",
    priority: "good_if_time",
    avgWaitSeptemberMin: 40,
    waitLevelSeptember: "medium",
    bestTimeToRide: ["morning", "evening"],
    planningNeeded: "no_reservation",
    skipLine: "Epic Express",
    express: epicExpress,
    expressPriority: "not_needed",
    suitableFor: ["youngKid", "olderKid", "adults"],
    familyMode: "some_together",
    indoor: false,
    rainFriendly: false,
    durationMin: 3,
    nearby: ["Monsters Unchained", "Das Stakehaus"],
    tip:
      "לעשות אם התור סביר. רגישים לסיבובים או פחד יכולים לדלג."
  },
  {
    id: "darkmoor-monster-makeup",
    name: "Darkmoor Monster Makeup Experience",
    resort: "Universal",
    park: "Epic Universe",
    area: "Dark Universe",
    areaId: "dark-universe",
    category: "experience",
    shortDescription:
      "חוויה/איפור בתשלום או לפי זמינות באזור המפלצות. יותר נישתי, לא חובה.",
    minHeightCm: null,
    intensity: "calm",
    scareFactor: "medium",
    motionSicknessRisk: "low",
    priority: "skip_if_busy",
    avgWaitSeptemberMin: null,
    waitLevelSeptember: "schedule_based",
    bestTimeToRide: ["afternoon"],
    planningNeeded: "check_same_day_hours",
    skipLine: "None",
    express: noExpress,
    expressPriority: "not_available",
    suitableFor: ["olderKid", "adults"],
    familyMode: "some_together",
    indoor: true,
    rainFriendly: true,
    durationMin: 30,
    nearby: ["Monsters Unchained", "Curse of the Werewolf", "Das Stakehaus"],
    tip:
      "רק אם מישהו ממש בעניין של מפלצות/איפור. לא חובה ביום ראשון ב-Epic."
  },
  {
    id: "hiccups-wing-gliders",
    name: "Hiccup’s Wing Gliders",
    resort: "Universal",
    park: "Epic Universe",
    area: "Isle of Berk",
    areaId: "isle-of-berk",
    category: "ride",
    shortDescription:
      "רכבת/גלישה משפחתית בעולם הדרקון הראשון שלי. נראית כמו עוגן טוב למשפחה.",
    minHeightCm: 102,
    intensity: "medium",
    scareFactor: "low",
    motionSicknessRisk: "medium",
    priority: "must_do",
    avgWaitSeptemberMin: 55,
    waitLevelSeptember: "high",
    bestTimeToRide: ["morning", "evening"],
    planningNeeded: "high_priority",
    skipLine: "Epic Express",
    express: epicExpress,
    expressPriority: "use",
    suitableFor: ["youngKid", "olderKid", "adults"],
    familyMode: "some_together",
    indoor: false,
    rainFriendly: false,
    durationMin: 3,
    nearby: ["Dragon Racer’s Rally", "Fyre Drill", "The Untrainable Dragon", "Mead Hall"],
    tip:
      "אחד המתקנים המשפחתיים החשובים ב-Epic. אם התור גבוה — שווה Express."
  },
  {
    id: "dragon-racers-rally",
    name: "Dragon Racer’s Rally",
    resort: "Universal",
    park: "Epic Universe",
    area: "Isle of Berk",
    areaId: "isle-of-berk",
    category: "ride",
    shortDescription:
      "מתקן שבו שולטים בתנועה/סיבוב של הדרקון. יכול להיות חזק אם מסובבים הרבה.",
    minHeightCm: 122,
    intensity: "medium",
    scareFactor: "low",
    motionSicknessRisk: "high",
    priority: "good_if_time",
    avgWaitSeptemberMin: 35,
    waitLevelSeptember: "medium",
    bestTimeToRide: ["afternoon", "evening"],
    planningNeeded: "no_reservation",
    skipLine: "Epic Express",
    express: epicExpress,
    expressPriority: "not_needed",
    suitableFor: ["olderKid", "adults"],
    familyMode: "some_together",
    indoor: false,
    rainFriendly: false,
    durationMin: 3,
    nearby: ["Hiccup’s Wing Gliders", "Fyre Drill", "Mead Hall"],
    tip:
      "לא חובה אם יש רגישות לסחרחורת. לעשות אם התור קצר או אם הילדים ממש רוצים."
  },
  {
    id: "fyre-drill",
    name: "Fyre Drill",
    resort: "Universal",
    park: "Epic Universe",
    area: "Isle of Berk",
    areaId: "isle-of-berk",
    category: "ride",
    shortDescription:
      "מתקן מים אינטראקטיבי של הדרקון הראשון שלי. כולם עלולים להירטב.",
    minHeightCm: null,
    intensity: "mild",
    scareFactor: "none",
    motionSicknessRisk: "low",
    priority: "good_if_time",
    avgWaitSeptemberMin: 30,
    waitLevelSeptember: "medium",
    bestTimeToRide: ["midday", "afternoon"],
    planningNeeded: "no_reservation",
    skipLine: "Epic Express",
    express: epicExpress,
    expressPriority: "not_needed",
    suitableFor: ["preschooler", "youngKid", "olderKid"],
    familyMode: "all_together",
    indoor: false,
    rainFriendly: false,
    durationMin: 5,
    nearby: ["Hiccup’s Wing Gliders", "Dragon Racer’s Rally", "Mead Hall"],
    tip:
      "טוב ביום חם. לא לעשות אם אתם לא רוצים להירטב."
  },
  {
    id: "the-untrainable-dragon",
    name: "The Untrainable Dragon",
    resort: "Universal",
    park: "Epic Universe",
    area: "Isle of Berk",
    areaId: "isle-of-berk",
    category: "show",
    shortDescription:
      "מופע במה גדול של הדרקון הראשון שלי. מתאים מאוד למשפחה ולילדים.",
    minHeightCm: null,
    intensity: "mild",
    scareFactor: "low",
    motionSicknessRisk: "low",
    priority: "must_do",
    avgWaitSeptemberMin: null,
    waitLevelSeptember: "schedule_based",
    bestTimeToRide: ["scheduled_time"],
    planningNeeded: "check_same_day_hours",
    skipLine: "None",
    express: noExpress,
    expressPriority: "not_available",
    suitableFor: ["preschooler", "youngKid", "olderKid", "adults"],
    familyMode: "all_together",
    indoor: true,
    rainFriendly: true,
    durationMin: 25,
    nearby: ["Hiccup’s Wing Gliders", "Fyre Drill", "Mead Hall"],
    tip:
      "שווה לשבץ כמנוחה ומזגן. לבדוק שעות באפליקציה הרשמית."
  },
  {
    id: "viking-training-camp",
    name: "Viking Training Camp",
    resort: "Universal",
    park: "Epic Universe",
    area: "Isle of Berk",
    areaId: "isle-of-berk",
    category: "experience",
    shortDescription:
      "אזור משחקים לילדים בעולם הדרקון הראשון שלי.",
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
    express: noExpress,
    expressPriority: "not_available",
    suitableFor: ["preschooler", "youngKid"],
    familyMode: "all_together",
    indoor: false,
    rainFriendly: false,
    durationMin: 25,
    nearby: ["Fyre Drill", "The Untrainable Dragon", "Mead Hall"],
    tip:
      "מעולה לילדים קטנים אם צריך לפרוק אנרגיה, אבל לשים גבול זמן."
  },
  {
    id: "battle-at-the-ministry",
    name: "Harry Potter and the Battle at the Ministry",
    resort: "Universal",
    park: "Epic Universe",
    area: "Ministry of Magic",
    areaId: "ministry-of-magic",
    category: "ride",
    shortDescription:
      "המתקן המרכזי של עולם הארי פוטר החדש. עוגן גדול מאוד של Epic.",
    minHeightCm: 102,
    intensity: "medium",
    scareFactor: "medium",
    motionSicknessRisk: "medium",
    priority: "must_do",
    avgWaitSeptemberMin: 80,
    waitLevelSeptember: "high",
    bestTimeToRide: ["morning", "late_evening"],
    planningNeeded: "high_priority",
    skipLine: "Epic Express",
    express: epicExpress,
    expressPriority: "use",
    suitableFor: ["youngKid", "olderKid", "adults"],
    familyMode: "some_together",
    indoor: true,
    rainFriendly: true,
    durationMin: 6,
    nearby: ["Le Cirque Arcanus", "Café L’air De La Sirène", "Ministry of Magic"],
    tip:
      "עוגן עליון אם אוהבים הארי פוטר. אחד המקומות הכי הגיוניים לשימוש ב-Epic Express."
  },
  {
    id: "le-cirque-arcanus",
    name: "Le Cirque Arcanus",
    resort: "Universal",
    park: "Epic Universe",
    area: "Ministry of Magic",
    areaId: "ministry-of-magic",
    category: "show",
    shortDescription:
      "מופע קסום בעולם הארי פוטר / Fantastic Beasts. טוב להפסקה ולחוויה משפחתית.",
    minHeightCm: null,
    intensity: "calm",
    scareFactor: "low",
    motionSicknessRisk: "low",
    priority: "good_if_time",
    avgWaitSeptemberMin: null,
    waitLevelSeptember: "schedule_based",
    bestTimeToRide: ["scheduled_time"],
    planningNeeded: "check_same_day_hours",
    skipLine: "None",
    express: noExpress,
    expressPriority: "not_available",
    suitableFor: ["youngKid", "olderKid", "adults"],
    familyMode: "all_together",
    indoor: true,
    rainFriendly: true,
    durationMin: 25,
    nearby: ["Harry Potter and the Battle at the Ministry", "Café L’air De La Sirène"],
    tip:
      "לבדוק שעות באותו יום. טוב אם רוצים עוד תוכן הארי פוטר בלי תור מתקן."
  }
];

const dining = [
  {
    id: "pizza-moon",
    name: "Pizza Moon",
    resort: "Universal",
    park: "Epic Universe",
    area: "Celestial Park",
    areaId: "celestial-park",
    category: "dining",
    diningType: "quick_service",
    mealUse: "real_meal",
    foodStyle: "kids_food",
    kidsFriendly: true,
    mobileOrder: true,
    reservationNeeded: false,
    shortDescription:
      "פיצה ואוכל פשוט באזור המרכזי. נוח לילדים וקל יחסית.",
    minHeightCm: null,
    priority: "good_if_time",
    waitLevelSeptember: "quick_service",
    bestTimeToRide: ["lunch", "dinner"],
    planningNeeded: "check_same_day_hours",
    skipLine: "Mobile Order / check app",
    suitableFor: ["preschooler", "youngKid", "olderKid"],
    familyMode: "all_together",
    indoor: true,
    rainFriendly: true,
    durationMin: 30,
    nearby: ["Constellation Carousel", "Stardust Racers", "Astronomica"],
    tip:
      "טוב כפתרון ילדים פשוט. לא בטוח שזה האוכל הכי מעניין בפארק."
  },
  {
    id: "oak-and-star-tavern",
    name: "The Oak & Star Tavern",
    resort: "Universal",
    park: "Epic Universe",
    area: "Celestial Park",
    areaId: "celestial-park",
    category: "dining",
    diningType: "quick_service",
    mealUse: "real_meal",
    foodStyle: "bbq",
    kidsFriendly: true,
    mobileOrder: true,
    reservationNeeded: false,
    shortDescription:
      "BBQ / בשרים באזור Celestial Park. יכול להתאים למשפחה שרוצה ארוחה משביעה.",
    minHeightCm: null,
    priority: "good_if_time",
    waitLevelSeptember: "quick_service",
    bestTimeToRide: ["lunch", "dinner"],
    planningNeeded: "check_same_day_hours",
    skipLine: "Mobile Order / check app",
    suitableFor: ["youngKid", "olderKid", "adults"],
    familyMode: "all_together",
    indoor: true,
    rainFriendly: true,
    durationMin: 35,
    nearby: ["Stardust Racers", "Constellation Carousel", "Super Nintendo World"],
    tip:
      "אופציה טובה אם רוצים משהו משביע יותר מפיצה."
  },
  {
    id: "toadstool-cafe",
    name: "Toadstool Cafe",
    resort: "Universal",
    park: "Epic Universe",
    area: "Super Nintendo World",
    areaId: "super-nintendo-world",
    category: "dining",
    diningType: "quick_service",
    mealUse: "real_meal",
    foodStyle: "kids_food",
    kidsFriendly: true,
    mobileOrder: false,
    reservationNeeded: true,
    shortDescription:
      "מסעדת נינטנדו חווייתית מאוד. כנראה דורשת תכנון/זמינות, יותר חוויה מאשר ארוחה יעילה.",
    minHeightCm: null,
    priority: "must_do",
    waitLevelSeptember: "reservation",
    bestTimeToRide: ["lunch", "dinner"],
    planningNeeded: "check_same_day_hours",
    skipLine: "Reservation / check app",
    suitableFor: ["preschooler", "youngKid", "olderKid", "adults"],
    familyMode: "all_together",
    indoor: true,
    rainFriendly: true,
    durationMin: 60,
    nearby: ["Mario Kart: Bowser’s Challenge", "Mine-Cart Madness", "Yoshi’s Adventure"],
    tip:
      "אם הילדים בעניין של Mario — שווה לבדוק מוקדם איך מזמינים/נכנסים. לא להשאיר לרגע האחרון."
  },
  {
    id: "das-stakehaus",
    name: "Das Stakehaus",
    resort: "Universal",
    park: "Epic Universe",
    area: "Dark Universe",
    areaId: "dark-universe",
    category: "dining",
    diningType: "quick_service",
    mealUse: "real_meal",
    foodStyle: "quick_varied",
    kidsFriendly: false,
    mobileOrder: true,
    reservationNeeded: false,
    shortDescription:
      "מסעדת Quick Service אפלה בעולם המפלצות. יותר חוויה ועיצוב, פחות לילדים רגישים.",
    minHeightCm: null,
    priority: "good_if_time",
    waitLevelSeptember: "quick_service",
    bestTimeToRide: ["lunch", "dinner"],
    planningNeeded: "check_same_day_hours",
    skipLine: "Mobile Order / check app",
    suitableFor: ["olderKid", "adults"],
    familyMode: "some_together",
    indoor: true,
    rainFriendly: true,
    durationMin: 35,
    nearby: ["Monsters Unchained", "Curse of the Werewolf"],
    tip:
      "לעשות רק אם האווירה של Dark Universe מתאימה לילדים. זה לא האזור הכי רגוע."
  },
  {
    id: "mead-hall",
    name: "Mead Hall",
    resort: "Universal",
    park: "Epic Universe",
    area: "Isle of Berk",
    areaId: "isle-of-berk",
    category: "dining",
    diningType: "quick_service",
    mealUse: "real_meal",
    foodStyle: "quick_varied",
    kidsFriendly: true,
    mobileOrder: true,
    reservationNeeded: false,
    shortDescription:
      "מסעדה מרכזית בעולם הדרקון הראשון שלי. כנראה אחת הבחירות המשפחתיות הטובות בפארק.",
    minHeightCm: null,
    priority: "must_do",
    waitLevelSeptember: "quick_service",
    bestTimeToRide: ["lunch", "dinner"],
    planningNeeded: "check_same_day_hours",
    skipLine: "Mobile Order / check app",
    suitableFor: ["preschooler", "youngKid", "olderKid", "adults"],
    familyMode: "all_together",
    indoor: true,
    rainFriendly: true,
    durationMin: 40,
    nearby: ["Hiccup’s Wing Gliders", "Fyre Drill", "The Untrainable Dragon"],
    tip:
      "בחירה טובה למשפחה אם אתם באזור Berk. לבדוק תפריט באפליקציה באותו יום."
  },
  {
    id: "spit-fyre-grill",
    name: "Spit Fyre Grill",
    resort: "Universal",
    park: "Epic Universe",
    area: "Isle of Berk",
    areaId: "isle-of-berk",
    category: "dining",
    diningType: "quick_service",
    mealUse: "real_meal",
    foodStyle: "quick_varied",
    kidsFriendly: true,
    mobileOrder: true,
    reservationNeeded: false,
    shortDescription:
      "אוכל מהיר באזור Berk. טוב אם רוצים משהו פחות מחייב מ-Mead Hall.",
    minHeightCm: null,
    priority: "good_if_time",
    waitLevelSeptember: "quick_service",
    bestTimeToRide: ["lunch", "dinner"],
    planningNeeded: "check_same_day_hours",
    skipLine: "Mobile Order / check app",
    suitableFor: ["youngKid", "olderKid", "adults"],
    familyMode: "all_together",
    indoor: false,
    rainFriendly: false,
    durationMin: 25,
    nearby: ["Hiccup’s Wing Gliders", "Fyre Drill", "Viking Training Camp"],
    tip:
      "שימושי אם אתם ב-Berk ורוצים ארוחה מהירה."
  },
  {
    id: "cafe-lair-de-la-sirene",
    name: "Café L’air De La Sirène",
    resort: "Universal",
    park: "Epic Universe",
    area: "Ministry of Magic",
    areaId: "ministry-of-magic",
    category: "dining",
    diningType: "quick_service",
    mealUse: "real_meal",
    foodStyle: "bakery",
    kidsFriendly: true,
    mobileOrder: true,
    reservationNeeded: false,
    shortDescription:
      "אוכל/מאפים באווירת פריז הקסומה של Harry Potter. טוב לעצירה קלה באזור משרד הקסמים.",
    minHeightCm: null,
    priority: "good_if_time",
    waitLevelSeptember: "quick_service",
    bestTimeToRide: ["breakfast", "lunch", "afternoon"],
    planningNeeded: "check_same_day_hours",
    skipLine: "Mobile Order / check app",
    suitableFor: ["preschooler", "youngKid", "olderKid", "adults"],
    familyMode: "all_together",
    indoor: true,
    rainFriendly: true,
    durationMin: 30,
    nearby: ["Harry Potter and the Battle at the Ministry", "Le Cirque Arcanus"],
    tip:
      "טוב אם רוצים להישאר באווירת הארי פוטר בלי ארוחה כבדה."
  }
];

function writeJs(fileName, exportName, value) {
  const filePath = path.join(parkDir, fileName);
  const content = `export const ${exportName} = ${JSON.stringify(value, null, 2)};
`;
  fs.writeFileSync(filePath, content, "utf8");
}

writeJs("areas.js", "epicUniverseAreas", areas);
writeJs("attractions.js", "epicUniverseAttractions", attractions);
writeJs("dining.js", "epicUniverseDining", dining);

fs.writeFileSync(
  path.join(parkDir, "index.js"),
  `import { epicUniverseAreas } from "./areas.js";
import { epicUniverseAttractions } from "./attractions.js";
import { epicUniverseDining } from "./dining.js";

export {
  epicUniverseAreas,
  epicUniverseAttractions,
  epicUniverseDining,
};

export const epicUniverseItems = [
  ...epicUniverseAttractions,
  ...epicUniverseDining,
];

export const epicUniversePark = {
  id: "epic-universe",
  name: "Epic Universe",
  resort: "Universal",
  areas: epicUniverseAreas,
  items: epicUniverseItems,
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

import {
  epicUniverseAreas,
  epicUniverseAttractions,
  epicUniverseDining,
  epicUniverseItems,
  epicUniversePark,
} from "./epicUniverse/index.js";

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

  epicUniverseAreas,
  epicUniverseAttractions,
  epicUniverseDining,
  epicUniverseItems,
  epicUniversePark,
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

console.log("Epic Universe data added.");
console.log("Files created:");
console.log("src/data/universal/epicUniverse/areas.js");
console.log("src/data/universal/epicUniverse/attractions.js");
console.log("src/data/universal/epicUniverse/dining.js");
console.log("src/data/universal/epicUniverse/index.js");
console.log("Updated src/data/universal/index.js");