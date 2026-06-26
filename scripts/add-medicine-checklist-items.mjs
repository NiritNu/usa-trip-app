import fs from "fs";

const filePath = "src/pages/Checklist.jsx";
let content = fs.readFileSync(filePath, "utf8");

const marker = `  {
    id: "packing",
    title: "🧳 אריזה",`;

const medicinesGroup = `  {
    id: "medicines",
    title: "💊 תרופות",
    description: "תרופות וציוד רפואי שכדאי שיהיו בתיק יד ונגישים.",
    items: [
      {
        id: "regular-meds",
        title: "תרופות קבועות",
        note: "לארוז כמות מספיקה לכל הטיול ועוד כמה ימים ספייר.",
        priority: "high",
      },
      {
        id: "normlax",
        title: "נורמלקס",
        note: "לארוז באריזה נוחה ולוודא שיש כמות מספיקה.",
        priority: "high",
      },
      {
        id: "epipen",
        title: "אפיפן",
        note: "לשמור בתיק יד ונגיש, לא רק במזוודה.",
        priority: "high",
      },
      {
        id: "inhalers",
        title: "משאפים",
        note: "לשמור בתיק יד. לבדוק שיש מספיק ושלא פג תוקף.",
        priority: "high",
      },
      {
        id: "kids-pain-fever",
        title: "אקמול / נורופן לילדים",
        note: "כולל מזרק/כוסית מדידה אם צריך.",
        priority: "high",
      },
      {
        id: "adult-pain-fever",
        title: "משכך כאבים / מוריד חום למבוגרים",
        note: "לימים של כאב ראש, חום או עייפות.",
        priority: "medium",
      },
      {
        id: "stomach-meds",
        title: "תרופות לבטן",
        note: "לפי מה שאתם רגילים להשתמש בו בבית.",
        priority: "medium",
      },
      {
        id: "bandages-disinfectant",
        title: "פלסטרים וחיטוי",
        note: "לחתכים קטנים, שפשופים ושלפוחיות.",
        priority: "medium",
      },
      {
        id: "prescriptions-docs",
        title: "מרשמים / אישורים רפואיים אם צריך",
        note: "בעיקר לתרופות חשובות או ציוד רפואי מיוחד.",
        priority: "medium",
      },
      {
        id: "medicine-in-hand-luggage",
        title: "תרופות חשובות בתיק יד",
        note: "לא לשים תרופות קריטיות רק במזוודה שנשלחת לבטן המטוס.",
        priority: "high",
      },
    ],
  },

`;

if (!content.includes('id: "medicines"')) {
  content = content.replace(marker, medicinesGroup + marker);
}

fs.writeFileSync(filePath, content, "utf8");

console.log("Added medicines checklist group.");
