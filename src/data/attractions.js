export const attractions = [
  {
    id: "seven-dwarfs-mine-train",
    name: "Seven Dwarfs Mine Train",
    resort: "Disney",
    park: "Magic Kingdom",
    area: "Fantasyland",
    category: "ride", // ride / show / character / dining
    shortDescription: "רכבת הרים משפחתית קצרה ופופולרית.",
    minHeightCm: 97,
    intensity: "medium", // calm / mild / medium / thrill / scary
    scareFactor: "low",
    motionSicknessRisk: "low",
    priority: "must_do", // must_do / good_if_time / skip_if_busy
    avgWaitSeptemberMin: 55,
    waitLevelSeptember: "high", // low / medium / high / very_high
    bestTimeToRide: ["morning", "late_evening"],
    planningNeeded: "lightning_lane_recommended",
    skipLine: "Disney Lightning Lane",
    suitableFor: ["youngKid", "olderKid"],
    familyMode: "some_together",
    indoor: false,
    rainFriendly: false,
    durationMin: 5,
    tip: "אם לא לוקחים Lightning Lane, עדיף בתחילת היום או ממש בסוף."
  },

  {
    id: "pirates-of-the-caribbean",
    name: "Pirates of the Caribbean",
    resort: "Disney",
    park: "Magic Kingdom",
    area: "Adventureland",
    category: "ride",
    shortDescription: "שייט קלאסי באווירת פיראטים, רגוע יחסית אבל חשוך.",
    minHeightCm: null,
    intensity: "mild",
    scareFactor: "low",
    motionSicknessRisk: "low",
    priority: "must_do",
    avgWaitSeptemberMin: 30,
    waitLevelSeptember: "medium",
    bestTimeToRide: ["midday", "evening"],
    planningNeeded: "no_reservation",
    skipLine: "Disney Lightning Lane",
    suitableFor: ["preschooler", "youngKid", "olderKid"],
    familyMode: "all_together",
    indoor: true,
    rainFriendly: true,
    durationMin: 9,
    tip: "טוב להפסקה ממוזגת באמצע היום."
  },

  {
    id: "rise-of-the-resistance",
    name: "Star Wars: Rise of the Resistance",
    resort: "Disney",
    park: "Hollywood Studios",
    area: "Star Wars: Galaxy's Edge",
    category: "ride",
    shortDescription: "אחת האטרקציות המרשימות בדיסני, חוויה ארוכה ומשולבת.",
    minHeightCm: 102,
    intensity: "medium",
    scareFactor: "medium",
    motionSicknessRisk: "medium",
    priority: "must_do",
    avgWaitSeptemberMin: 80,
    waitLevelSeptember: "very_high",
    bestTimeToRide: ["morning", "late_evening"],
    planningNeeded: "high_priority",
    skipLine: "Check current Lightning Lane rules",
    suitableFor: ["youngKid", "olderKid"],
    familyMode: "some_together",
    indoor: true,
    rainFriendly: true,
    durationMin: 18,
    tip: "אם התור גבוה מאוד, לבדוק אם יש אפשרות Lightning Lane או להגיע מוקדם."
  }
];