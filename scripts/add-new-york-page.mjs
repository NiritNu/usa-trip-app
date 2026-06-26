import fs from "fs";
import path from "path";

const projectRoot = process.cwd();

function writeFile(relativePath, content) {
  const filePath = path.join(projectRoot, relativePath);
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, content, "utf8");
}

const dataFile = `export const newYorkAreas = [
  {
    id: "midtown",
    name: "Midtown",
    hebrewName: "מידטאון",
    center: [40.7549, -73.9840],
  },
  {
    id: "central-park",
    name: "Central Park",
    hebrewName: "סנטרל פארק",
    center: [40.7812, -73.9665],
  },
  {
    id: "uptown-museums",
    name: "Uptown Museums",
    hebrewName: "מוזיאונים באפטאון",
    center: [40.7794, -73.9632],
  },
  {
    id: "west-side",
    name: "West Side / Chelsea",
    hebrewName: "ווסט סייד / צ׳לסי",
    center: [40.7465, -74.0048],
  },
  {
    id: "downtown",
    name: "Downtown",
    hebrewName: "דאונטאון",
    center: [40.7115, -74.0134],
  },
  {
    id: "brooklyn",
    name: "Brooklyn / DUMBO",
    hebrewName: "ברוקלין / דאמבו",
    center: [40.7033, -73.9881],
  },
];

export const newYorkItems = [
  {
    id: "times-square",
    name: "Times Square",
    areaId: "midtown",
    area: "Midtown",
    category: "experience",
    shortDescription:
      "אזור אייקוני, עמוס ומואר. טוב לראות פעם אחת, עדיף לא לבנות עליו יותר מדי זמן.",
    position: [40.7580, -73.9855],
    priority: "good_if_time",
    indoor: false,
    rainFriendly: false,
    familyMode: "all_together",
    suitableFor: ["youngKid", "olderKid", "adults"],
    intensity: "medium",
    durationMin: 30,
    tip: "להגיע, לראות, לצלם, ולהמשיך. זה עמוס מאוד.",
  },
  {
    id: "bryant-park",
    name: "Bryant Park",
    areaId: "midtown",
    area: "Midtown",
    category: "park",
    shortDescription:
      "פארק קטן ונעים ליד הספרייה הציבורית. טוב להפסקה, קפה, שירותים וישיבה.",
    position: [40.7536, -73.9832],
    priority: "must_do",
    indoor: false,
    rainFriendly: false,
    familyMode: "all_together",
    suitableFor: ["preschooler", "youngKid", "olderKid", "adults"],
    intensity: "calm",
    durationMin: 30,
    tip: "אחד המקומות הכי נוחים לעצירה עם ילדים במידטאון.",
  },
  {
    id: "ny-public-library",
    name: "New York Public Library",
    areaId: "midtown",
    area: "Midtown",
    category: "experience",
    shortDescription:
      "הספרייה הציבורית היפה של ניו יורק. קרובה מאוד ל-Bryant Park.",
    position: [40.7532, -73.9822],
    priority: "good_if_time",
    indoor: true,
    rainFriendly: true,
    familyMode: "all_together",
    suitableFor: ["olderKid", "adults"],
    intensity: "calm",
    durationMin: 30,
    tip: "טוב במיוחד ביום גשם או כשצריך מקום רגוע וממוזג.",
  },
  {
    id: "grand-central",
    name: "Grand Central Terminal",
    areaId: "midtown",
    area: "Midtown",
    category: "experience",
    shortDescription:
      "תחנת רכבת יפה ומרשימה. עצירה קצרה שמתאימה גם אם לא נוסעים ברכבת.",
    position: [40.7527, -73.9772],
    priority: "good_if_time",
    indoor: true,
    rainFriendly: true,
    familyMode: "all_together",
    suitableFor: ["youngKid", "olderKid", "adults"],
    intensity: "calm",
    durationMin: 25,
    tip: "טוב לשלב עם Bryant Park / הספרייה / SUMMIT.",
  },
  {
    id: "rockefeller-center",
    name: "Rockefeller Center",
    areaId: "midtown",
    area: "Midtown",
    category: "experience",
    shortDescription:
      "אזור קלאסי במידטאון עם חנויות, רחבה, ותצפית Top of the Rock.",
    position: [40.7587, -73.9787],
    priority: "must_do",
    indoor: false,
    rainFriendly: false,
    familyMode: "all_together",
    suitableFor: ["youngKid", "olderKid", "adults"],
    intensity: "calm",
    durationMin: 45,
    tip: "אם עושים תצפית אחת, Top of the Rock נוחה כי רואים ממנה את האמפייר סטייט.",
  },
  {
    id: "summit-one-vanderbilt",
    name: "SUMMIT One Vanderbilt",
    areaId: "midtown",
    area: "Midtown",
    category: "view",
    shortDescription:
      "תצפית מודרנית וחווייתית עם מראות וחללים מצטלמים. יכולה להיות מאוד מרשימה לילדים.",
    position: [40.7528, -73.9787],
    priority: "must_do",
    indoor: true,
    rainFriendly: true,
    familyMode: "all_together",
    suitableFor: ["youngKid", "olderKid", "adults"],
    intensity: "medium",
    durationMin: 90,
    tip: "כדאי לשבץ כשכולם לא עייפים מדי, כי זו חוויה עמוסה בגירויים.",
  },
  {
    id: "central-park-main",
    name: "Central Park",
    areaId: "central-park",
    area: "Central Park",
    category: "park",
    shortDescription:
      "הפארק המרכזי של ניו יורק. מתאים להליכה, הפסקה, אגם, מתקני משחקים ותמונות.",
    position: [40.7812, -73.9665],
    priority: "must_do",
    indoor: false,
    rainFriendly: false,
    familyMode: "all_together",
    suitableFor: ["preschooler", "youngKid", "olderKid", "adults"],
    intensity: "calm",
    durationMin: 120,
    tip: "לא לנסות לראות את כולו. לבחור אזור קטן וברור.",
  },
  {
    id: "central-park-zoo",
    name: "Central Park Zoo",
    areaId: "central-park",
    area: "Central Park",
    category: "experience",
    shortDescription:
      "גן חיות קטן יחסית בתוך סנטרל פארק. מתאים במיוחד לילדים צעירים.",
    position: [40.7678, -73.9718],
    priority: "good_if_time",
    indoor: false,
    rainFriendly: false,
    familyMode: "all_together",
    suitableFor: ["preschooler", "youngKid"],
    intensity: "calm",
    durationMin: 90,
    tip: "לא חובה אם כבר יש הרבה אטרקציות, אבל טוב לילדים קטנים.",
  },
  {
    id: "american-museum-natural-history",
    name: "American Museum of Natural History",
    areaId: "uptown-museums",
    area: "Uptown Museums",
    category: "museum",
    shortDescription:
      "מוזיאון טבע ענק עם דינוזאורים, חלל, בעלי חיים ותצוגות שמתאימות לילדים.",
    position: [40.7813, -73.9739],
    priority: "must_do",
    indoor: true,
    rainFriendly: true,
    familyMode: "all_together",
    suitableFor: ["youngKid", "olderKid", "adults"],
    intensity: "calm",
    durationMin: 150,
    tip: "בחירה מצוינת ליום גשם או יום חם. לא לנסות לראות הכול.",
  },
  {
    id: "met-museum",
    name: "The Metropolitan Museum of Art",
    areaId: "uptown-museums",
    area: "Uptown Museums",
    category: "museum",
    shortDescription:
      "מוזיאון אמנות גדול מאוד ליד סנטרל פארק. מתאים יותר לילדים גדולים/מבוגרים.",
    position: [40.7794, -73.9632],
    priority: "good_if_time",
    indoor: true,
    rainFriendly: true,
    familyMode: "some_together",
    suitableFor: ["olderKid", "adults"],
    intensity: "calm",
    durationMin: 120,
    tip: "אם נכנסים עם ילדים — לבחור אגף אחד בלבד.",
  },
  {
    id: "high-line",
    name: "The High Line",
    areaId: "west-side",
    area: "West Side / Chelsea",
    category: "park",
    shortDescription:
      "טיילת מוגבהת יפה בצד המערבי של מנהטן. נחמד להליכה קצרה.",
    position: [40.7480, -74.0048],
    priority: "must_do",
    indoor: false,
    rainFriendly: false,
    familyMode: "all_together",
    suitableFor: ["youngKid", "olderKid", "adults"],
    intensity: "calm",
    durationMin: 60,
    tip: "לשלב עם Chelsea Market או Little Island.",
  },
  {
    id: "chelsea-market",
    name: "Chelsea Market",
    areaId: "west-side",
    area: "West Side / Chelsea",
    category: "dining",
    shortDescription:
      "מתחם אוכל מקורה בצ׳לסי. טוב להפסקת אוכל, במיוחד אם יש מזג אוויר לא נוח.",
    position: [40.7424, -74.0060],
    priority: "must_do",
    indoor: true,
    rainFriendly: true,
    familyMode: "all_together",
    suitableFor: ["youngKid", "olderKid", "adults"],
    intensity: "calm",
    durationMin: 60,
    tip: "מקום טוב כשכל אחד רוצה משהו אחר לאכול.",
  },
  {
    id: "little-island",
    name: "Little Island",
    areaId: "west-side",
    area: "West Side / Chelsea",
    category: "park",
    shortDescription:
      "פארק קטן ומיוחד על המים. יפה לצילום ולהפסקה קצרה.",
    position: [40.7420, -74.0103],
    priority: "good_if_time",
    indoor: false,
    rainFriendly: false,
    familyMode: "all_together",
    suitableFor: ["preschooler", "youngKid", "olderKid", "adults"],
    intensity: "calm",
    durationMin: 45,
    tip: "טוב לשלב עם High Line / Chelsea Market.",
  },
  {
    id: "911-memorial",
    name: "9/11 Memorial",
    areaId: "downtown",
    area: "Downtown",
    category: "experience",
    shortDescription:
      "אתר זיכרון מרכזי ומשמעותי. חשוב, אבל האווירה כבדה יותר.",
    position: [40.7115, -74.0134],
    priority: "must_do",
    indoor: false,
    rainFriendly: false,
    familyMode: "some_together",
    suitableFor: ["olderKid", "adults"],
    intensity: "calm",
    durationMin: 45,
    tip: "לשקול לפי גיל הילדים והרגישות שלהם.",
  },
  {
    id: "one-world-observatory",
    name: "One World Observatory",
    areaId: "downtown",
    area: "Downtown",
    category: "view",
    shortDescription:
      "תצפית גבוהה מאוד בדאונטאון מנהטן.",
    position: [40.7130, -74.0132],
    priority: "good_if_time",
    indoor: true,
    rainFriendly: true,
    familyMode: "all_together",
    suitableFor: ["youngKid", "olderKid", "adults"],
    intensity: "calm",
    durationMin: 90,
    tip: "אם כבר עושים תצפית במידטאון, לא חובה לעשות גם כאן.",
  },
  {
    id: "battery-park",
    name: "Battery Park",
    areaId: "downtown",
    area: "Downtown",
    category: "park",
    shortDescription:
      "פארק בקצה הדרומי של מנהטן, ליד נקודת היציאה לפסל החירות.",
    position: [40.7033, -74.0170],
    priority: "good_if_time",
    indoor: false,
    rainFriendly: false,
    familyMode: "all_together",
    suitableFor: ["youngKid", "olderKid", "adults"],
    intensity: "calm",
    durationMin: 45,
    tip: "טוב לשלב עם דאונטאון או שייט לפסל החירות.",
  },
  {
    id: "statue-liberty-ferry",
    name: "Statue of Liberty / Ellis Island",
    areaId: "downtown",
    area: "Downtown",
    category: "experience",
    shortDescription:
      "שייט לפסל החירות ו-Ellis Island. חוויה אייקונית, אבל דורשת זמן ותכנון.",
    position: [40.6892, -74.0445],
    priority: "good_if_time",
    indoor: false,
    rainFriendly: false,
    familyMode: "all_together",
    suitableFor: ["youngKid", "olderKid", "adults"],
    intensity: "medium",
    durationMin: 240,
    tip: "לא לדחוס ביום עמוס. זה יכול לקחת חצי יום.",
  },
  {
    id: "brooklyn-bridge",
    name: "Brooklyn Bridge",
    areaId: "brooklyn",
    area: "Brooklyn / DUMBO",
    category: "experience",
    shortDescription:
      "הליכה על הגשר או תצפית עליו מ-DUMBO. אחד המקומות היפים בעיר.",
    position: [40.7061, -73.9969],
    priority: "must_do",
    indoor: false,
    rainFriendly: false,
    familyMode: "all_together",
    suitableFor: ["youngKid", "olderKid", "adults"],
    intensity: "medium",
    durationMin: 90,
    tip: "אפשר ללכת רק חלק מהגשר, לא חייבים את כולו.",
  },
  {
    id: "dumbo",
    name: "DUMBO",
    areaId: "brooklyn",
    area: "Brooklyn / DUMBO",
    category: "experience",
    shortDescription:
      "אזור יפה בברוקלין עם נוף למנהטן, גשר ברוקלין וגשר מנהטן.",
    position: [40.7033, -73.9881],
    priority: "must_do",
    indoor: false,
    rainFriendly: false,
    familyMode: "all_together",
    suitableFor: ["youngKid", "olderKid", "adults"],
    intensity: "calm",
    durationMin: 90,
    tip: "מעולה לתמונות, גלידה/פיצה, וטיילת ליד המים.",
  },
];

export const newYorkCenter = [40.7549, -73.9840];
`;

const pageFile = `import { useMemo, useState } from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import AttractionCard from "../components/AttractionCard.jsx";
import { newYorkAreas, newYorkCenter, newYorkItems } from "../data/newYork/index.js";

const categoryFilters = [
  { id: "all", label: "✨ הכול" },
  { id: "experience", label: "✨ חוויות" },
  { id: "museum", label: "🏛️ מוזיאונים" },
  { id: "park", label: "🌳 פארקים" },
  { id: "view", label: "🌇 תצפיות" },
  { id: "dining", label: "🍔 אוכל" },
];

const moodFilters = [
  { id: "all", label: "😊 רגיל" },
  { id: "tired", label: "😴 עייפים" },
  { id: "hot", label: "🔥 חם / צריך מזגן" },
  { id: "rainy", label: "🌧️ גשם" },
  { id: "little_kids", label: "👧 ילדים קטנים" },
  { id: "must_do", label: "⭐ חובה" },
];

export default function NewYork() {
  const [selectedAreaId, setSelectedAreaId] = useState("all");
  const [activeCategory, setActiveCategory] = useState("all");
  const [activeMood, setActiveMood] = useState("all");

  const filteredItems = useMemo(() => {
    return newYorkItems
      .filter((item) => selectedAreaId === "all" || item.areaId === selectedAreaId)
      .filter((item) => activeCategory === "all" || item.category === activeCategory)
      .filter((item) => matchesMood(item, activeMood))
      .sort(sortItems);
  }, [selectedAreaId, activeCategory, activeMood]);

  const selectedArea = newYorkAreas.find((area) => area.id === selectedAreaId);
  const mapCenter = selectedArea?.center || newYorkCenter;

  const diningItems = filteredItems.filter((item) => item.category === "dining");
  const nonDiningItems = filteredItems.filter((item) => item.category !== "dining");

  return (
    <main className="page">
      <h1 className="page-title">🗽 New York</h1>

      <p className="page-description">
        אזורים, נקודות עניין ומפה אמיתית לניו יורק — בלי פרטים אישיים ובלי תאריכים.
      </p>

      <section className="card playful-panel">
        <h3>📍 איזה אזור?</h3>

        <div className="tabs-row">
          <button
            type="button"
            className={selectedAreaId === "all" ? "active" : ""}
            onClick={() => setSelectedAreaId("all")}
          >
            🗺️ כל ניו יורק
          </button>

          {newYorkAreas.map((area) => (
            <button
              key={area.id}
              type="button"
              className={selectedAreaId === area.id ? "active" : ""}
              onClick={() => setSelectedAreaId(area.id)}
            >
              {areaIcon(area.id)} {area.name}
            </button>
          ))}
        </div>
      </section>

      <section className="card real-map-card">
        <div className="card-header">
          <div>
            <h3>🗺️ מפת ניו יורק</h3>
            <p className="meta">
              לחיצה על נקודה במפה תפתח פרטים. לחיצה על אזור בכפתורים מסננת את הרשימה.
            </p>
          </div>

          <span className="tag">{filteredItems.length} פריטים</span>
        </div>

        <div className="real-map-wrap">
          <MapContainer
            key={selectedAreaId}
            center={mapCenter}
            zoom={selectedArea ? 14 : 12}
            scrollWheelZoom={false}
            className="real-map"
          >
            <TileLayer
              attribution="&copy; OpenStreetMap contributors"
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            {newYorkAreas.map((area) => (
              <Marker
                key={area.id}
                position={area.center}
                icon={createAreaIcon(areaIcon(area.id), selectedAreaId === area.id)}
                eventHandlers={{
                  click: () => setSelectedAreaId(area.id),
                }}
              >
                <Popup>
                  <strong>{areaIcon(area.id)} {area.name}</strong>
                  <br />
                  {area.hebrewName}
                  <br />
                  <button
                    type="button"
                    className="popup-select-button"
                    onClick={() => setSelectedAreaId(area.id)}
                  >
                    הצג את האזור הזה
                  </button>
                </Popup>
              </Marker>
            ))}

            {filteredItems.map((item) => (
              <Marker
                key={item.id}
                position={item.position}
                icon={createItemIcon(categoryIcon(item.category))}
              >
                <Popup>
                  <strong>{categoryIcon(item.category)} {item.name}</strong>
                  <br />
                  {item.area}
                  <br />
                  {item.shortDescription}
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>
      </section>

      <section className="card playful-panel">
        <h3>🎯 מה מחפשים?</h3>

        <div className="filter-bar">
          {categoryFilters.map((filter) => (
            <button
              key={filter.id}
              type="button"
              className={activeCategory === filter.id ? "active" : ""}
              onClick={() => setActiveCategory(filter.id)}
            >
              {filter.label}
            </button>
          ))}
        </div>
      </section>

      <section className="card playful-panel mood-card">
        <h3>🎈 מצב רוח משפחתי</h3>

        <div className="filter-bar mood-bar">
          {moodFilters.map((filter) => (
            <button
              key={filter.id}
              type="button"
              className={activeMood === filter.id ? "active" : ""}
              onClick={() => setActiveMood(filter.id)}
            >
              {filter.label}
            </button>
          ))}
        </div>
      </section>

      {diningItems.length > 0 && (
        <>
          <h2 className="page-title small-title">🍔 אוכל / עצירות</h2>
          <div className="cards-list">
            {diningItems.map((item) => (
              <AttractionCard key={item.id} attraction={item} />
            ))}
          </div>
        </>
      )}

      {nonDiningItems.length > 0 && (
        <>
          <h2 className="page-title small-title">🗽 דברים לעשות</h2>
          <div className="cards-list">
            {nonDiningItems.map((item) => (
              <AttractionCard key={item.id} attraction={item} />
            ))}
          </div>
        </>
      )}

      {filteredItems.length === 0 && (
        <div className="empty-state">
          אין כרגע פריטים שמתאימים לסינון הזה.
        </div>
      )}
    </main>
  );
}

function matchesMood(item, mood) {
  if (mood === "all") return true;
  if (mood === "must_do") return item.priority === "must_do";

  if (mood === "tired") {
    return item.indoor === true || item.intensity === "calm" || item.category === "dining";
  }

  if (mood === "hot") {
    return item.indoor === true || item.category === "dining";
  }

  if (mood === "rainy") {
    return item.rainFriendly === true || item.indoor === true;
  }

  if (mood === "little_kids") {
    return (
      item.suitableFor?.includes("preschooler") ||
      item.suitableFor?.includes("youngKid")
    );
  }

  return true;
}

function sortItems(a, b) {
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

function areaIcon(areaId) {
  const icons = {
    midtown: "🏙️",
    "central-park": "🌳",
    "uptown-museums": "🏛️",
    "west-side": "🌉",
    downtown: "🏦",
    brooklyn: "🌁",
  };

  return icons[areaId] || "📍";
}

function categoryIcon(category) {
  const icons = {
    experience: "✨",
    museum: "🏛️",
    park: "🌳",
    view: "🌇",
    dining: "🍔",
  };

  return icons[category] || "📍";
}

function createAreaIcon(emoji, isActive) {
  return L.divIcon({
    className: "",
    html: \`
      <div class="real-map-marker \${isActive ? "active" : ""}">
        <span>\${emoji}</span>
      </div>
    \`,
    iconSize: [34, 34],
    iconAnchor: [17, 17],
    popupAnchor: [0, -16],
  });
}

function createItemIcon(emoji) {
  return L.divIcon({
    className: "",
    html: \`
      <div class="real-map-marker city-marker">
        <span>\${emoji}</span>
      </div>
    \`,
    iconSize: [30, 30],
    iconAnchor: [15, 15],
    popupAnchor: [0, -14],
  });
}
`;

writeFile("src/data/newYork/index.js", dataFile);
writeFile("src/pages/NewYork.jsx", pageFile);

console.log("Added New York data and page.");
console.log("Updated:");
console.log("src/data/newYork/index.js");
console.log("src/pages/NewYork.jsx");
`;

writeFile("scripts/add-new-york-page.generated.txt", "This file is not used.");
`;

console.log(dataFile.length, pageFile.length);
`;

writeFile("src/data/newYork/index.js", dataFile);
writeFile("src/pages/NewYork.jsx", pageFile);

console.log("Added New York page and data.");