import { useMemo, useState } from "react";
import AttractionCard from "../components/AttractionCard.jsx";
import { universalParks } from "../data/universal/index.js";

const categoryFilters = [
  { id: "all", label: "✨ הכול" },
  { id: "ride", label: "🎢 מתקנים" },
  { id: "show", label: "🎭 הופעות" },
  { id: "character", label: "👋 דמויות" },
  { id: "dining", label: "🍔 אוכל" },
  { id: "experience", label: "🪄 חוויות" },
];

const needFilters = [
  { id: "all", label: "✨ הכול" },
  { id: "must_do", label: "⭐ חובה" },
  { id: "express_use", label: "⚡ כדאי Express" },
  { id: "indoor", label: "❄️ מזגן" },
  { id: "no_height", label: "📏 ללא גובה" },
  { id: "low_wait", label: "⏱️ תור קצר" },
  { id: "all_together", label: "👨‍👩‍👧‍👦 כולם יחד" },
  { id: "older_kids", label: "🧑 לגדולים" },
  { id: "rain", label: "🌧️ גשם" },
];

const moodFilters = [
  { id: "all", label: "😊 רגיל" },
  { id: "tired", label: "😴 עייפים" },
  { id: "hot", label: "🔥 חם" },
  { id: "rainy", label: "🌧️ גשם" },
  { id: "little_kids", label: "👧 ילדים קטנים" },
  { id: "thrill", label: "🎢 אקסטרים" },
];

export default function Universal() {
  const [selectedParkId, setSelectedParkId] = useState(
    universalParks[0]?.id || "universal-studios-florida"
  );
  const [selectedAreaId, setSelectedAreaId] = useState("all");
  const [activeCategory, setActiveCategory] = useState("all");
  const [activeNeed, setActiveNeed] = useState("all");
  const [activeMood, setActiveMood] = useState("all");

  const selectedPark =
    universalParks.find((park) => park.id === selectedParkId) ||
    universalParks[0];

  const areas = selectedPark?.areas || [];
  const items = selectedPark?.items || [];

  const filteredItems = useMemo(() => {
    return items
      .filter((item) => selectedAreaId === "all" || item.areaId === selectedAreaId)
      .filter((item) => activeCategory === "all" || item.category === activeCategory)
      .filter((item) => matchesNeed(item, activeNeed))
      .filter((item) => matchesMood(item, activeMood))
      .sort(sortItems);
  }, [items, selectedAreaId, activeCategory, activeNeed, activeMood]);

  const selectedArea =
    selectedAreaId === "all"
      ? null
      : areas.find((area) => area.id === selectedAreaId);

  const hasParkContent = items.length > 0;

  const diningItems = filteredItems.filter((item) => item.category === "dining");
  const nonDiningItems = filteredItems.filter((item) => item.category !== "dining");

  return (
    <main className="page">
      <h1 className="page-title">🎢 Universal</h1>

      <p className="page-description">
        בחרי פארק, אזור ומצב רוח. בפארקים הוותיקים יש Express Unlimited;
        ב־Epic Universe התנאים שונים ומסומנים בכרטיסים.
      </p>

      <section className="card playful-panel">
        <h3>🌎 איזה פארק?</h3>

        <div className="tabs-row park-tabs">
          {universalParks.map((park) => (
            <button
              key={park.id}
              type="button"
              className={selectedParkId === park.id ? "active" : ""}
              onClick={() => {
                setSelectedParkId(park.id);
                setSelectedAreaId("all");
                setActiveCategory("all");
                setActiveNeed("all");
                setActiveMood("all");
              }}
            >
              {parkIcon(park)} {park.name}
            </button>
          ))}
        </div>
      </section>

      {areas.length > 0 && (
        <section className="card playful-panel">
          <h3>📍 איפה אתם עכשיו?</h3>

          <div className="tabs-row">
            <button
              type="button"
              className={selectedAreaId === "all" ? "active" : ""}
              onClick={() => setSelectedAreaId("all")}
            >
              🗺️ כל הפארק
            </button>

            {areas.map((area) => (
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

          {selectedArea && (
            <p className="meta">
              אזור נבחר: {selectedArea.name}
              {selectedArea.hebrewName ? " · " + selectedArea.hebrewName : ""}
            </p>
          )}
        </section>
      )}

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

      <section className="card playful-panel">
        <h3>🧭 מה חשוב עכשיו?</h3>

        <div className="filter-bar">
          {needFilters.map((filter) => (
            <button
              key={filter.id}
              type="button"
              className={activeNeed === filter.id ? "active" : ""}
              onClick={() => setActiveNeed(filter.id)}
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

      <section className="card results-card">
        <div className="card-header">
          <div>
            <h3>✨ תוצאות</h3>
            <p className="meta">
              {parkIcon(selectedPark)} {selectedPark?.name || "Universal"}
              {" · "}
              {selectedArea ? selectedArea.name : "כל הפארק"}
              {" · "}
              {labelCategory(activeCategory)}
              {" · "}
              {labelMood(activeMood)}
            </p>
          </div>

          <span className="tag">{filteredItems.length} פריטים</span>
        </div>

        {!hasParkContent && (
          <div className="empty-state">
            הפארק הזה כבר קיים במבנה, אבל עוד לא הכנסנו אליו תוכן.
          </div>
        )}

        {hasParkContent && filteredItems.length === 0 && (
          <div className="empty-state">
            אין כרגע פריטים שמתאימים לסינון הזה.
          </div>
        )}
      </section>

      {diningItems.length > 0 && (
        <>
          <h2 className="page-title small-title">🍔 אוכל קרוב</h2>

          <div className="cards-list">
            {diningItems.map((item) => (
              <AttractionCard key={item.id} attraction={item} />
            ))}
          </div>
        </>
      )}

      {nonDiningItems.length > 0 && (
        <>
          <h2 className="page-title small-title">🎢 דברים לעשות</h2>

          <div className="cards-list">
            {nonDiningItems.map((item) => (
              <AttractionCard key={item.id} attraction={item} />
            ))}
          </div>
        </>
      )}
    </main>
  );
}

function matchesNeed(item, need) {
  if (need === "all") return true;
  if (need === "must_do") return item.priority === "must_do";
  if (need === "express_use") return item.expressPriority === "use";
  if (need === "indoor") return item.indoor === true;
  if (need === "no_height") return item.minHeightCm == null;

  if (need === "low_wait") {
    return item.avgWaitSeptemberMin != null && item.avgWaitSeptemberMin <= 25;
  }

  if (need === "all_together") return item.familyMode === "all_together";
  if (need === "older_kids") return item.suitableFor?.includes("olderKid");
  if (need === "rain") return item.rainFriendly === true;

  return true;
}

function matchesMood(item, mood) {
  if (mood === "all") return true;

  if (mood === "tired") {
    return (
      item.indoor === true ||
      item.intensity === "calm" ||
      item.category === "show" ||
      item.category === "dining"
    );
  }

  if (mood === "hot") {
    return item.indoor === true || item.category === "dining";
  }

  if (mood === "rainy") {
    return item.rainFriendly === true;
  }

  if (mood === "little_kids") {
    return (
      item.suitableFor?.includes("preschooler") ||
      item.suitableFor?.includes("youngKid")
    );
  }

  if (mood === "thrill") {
    return item.intensity === "thrill" || item.scareFactor === "high";
  }

  return true;
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

function parkIcon(park) {
  const id = park?.id || "";
  const name = park?.name || "";

  if (id.includes("universal-studios") || name.includes("Universal Studios")) return "🎥";
  if (id.includes("islands") || name.includes("Islands")) return "🧙";
  if (id.includes("epic") || name.includes("Epic")) return "⭐";

  return "🎢";
}

function labelCategory(value) {
  const labels = {
    all: "הכול",
    ride: "מתקנים",
    show: "הופעות",
    character: "דמויות",
    dining: "אוכל",
    experience: "חוויות",
  };

  return labels[value] || value;
}

function labelMood(value) {
  const labels = {
    all: "רגיל",
    tired: "עייפים",
    hot: "חם",
    rainy: "גשם",
    little_kids: "ילדים קטנים",
    thrill: "אקסטרים",
  };

  return labels[value] || value;
}
