import { useMemo, useState } from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import AttractionCard from "../components/AttractionCard.jsx";
import {
  newYorkAreas,
  newYorkCenter,
  newYorkItems,
} from "../data/newYork/index.js";

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

const ideaCards = [
  {
    id: "all",
    title: "🗺️ הכול",
    subtitle: "כל האפשרויות בניו יורק",
    itemIds: [],
  },
  {
    id: "midtown-kids",
    title: "🏙️ Midtown Kids Loop",
    subtitle: "חנויות, תצפית, Times Square ועצירות קלות",
    itemIds: [
      "bryant-park",
      "ny-public-library",
      "grand-central",
      "summit-one-vanderbilt",
      "rockefeller-center",
      "fao-schwarz",
      "nintendo-ny",
      "lego-store-fifth-avenue",
      "mms-world",
      "disney-store-times-square",
      "times-square",
    ],
  },
  {
    id: "central-park-museum",
    title: "🌳 Central Park + Museum",
    subtitle: "המוזיאון להיסטוריה של הטבע, פארק, טירה וגני משחקים",
    itemIds: [
      "american-museum-natural-history",
      "central-park-main",
      "belvedere-castle",
      "heckscher-playground",
      "ancient-playground",
      "central-park-zoo",
    ],
  },
  {
    id: "west-side",
    title: "🌉 West Side",
    subtitle: "High Line, Chelsea Market, Little Island ו-Intrepid",
    itemIds: [
      "high-line",
      "chelsea-market",
      "little-island",
      "intrepid-museum",
      "pier-25",
    ],
  },
  {
    id: "flatiron-soho",
    title: "🧙 Flatiron / SoHo",
    subtitle: "Harry Potter, גלידה, פארקים קצרים ואווירה עירונית",
    itemIds: [
      "harry-potter-new-york",
      "madison-square-park",
      "museum-of-ice-cream",
      "washington-square-park",
    ],
  },
  {
    id: "brooklyn-downtown",
    title: "🌁 Brooklyn + Downtown",
    subtitle: "DUMBO, פארק ברוקלין, קרוסלות, מעבורת ונוף",
    itemIds: [
      "dumbo",
      "brooklyn-bridge",
      "brooklyn-bridge-park",
      "janes-carousel",
      "battery-park",
      "seaglass-carousel",
      "staten-island-ferry",
      "governors-island",
    ],
  },
  {
    id: "rainy-day",
    title: "☔ יום גשם",
    subtitle: "מקומות מקורים שלא מרגישים כמו פשרה",
    itemIds: [
      "summit-one-vanderbilt",
      "american-museum-natural-history",
      "fao-schwarz",
      "nintendo-ny",
      "lego-store-fifth-avenue",
      "mms-world",
      "harry-potter-new-york",
      "museum-of-ice-cream",
      "chelsea-market",
      "intrepid-museum",
      "ny-transit-museum",
    ],
  },
  {
    id: "low-energy",
    title: "😴 יום רגוע",
    subtitle: "בלי יותר מדי נסיעות ובלי עומס מוגזם",
    itemIds: [
      "bryant-park",
      "ny-public-library",
      "grand-central",
      "rockefeller-center",
      "fao-schwarz",
      "central-park-main",
      "madison-square-park",
      "chelsea-market",
      "little-island",
      "dumbo",
      "brooklyn-bridge-park",
    ],
  },
];

export default function NewYork() {
  const [selectedAreaId, setSelectedAreaId] = useState("all");
  const [activeCategory, setActiveCategory] = useState("all");
  const [activeMood, setActiveMood] = useState("all");
  const [activeIdeaId, setActiveIdeaId] = useState("all");

  const activeIdea = ideaCards.find((idea) => idea.id === activeIdeaId) || ideaCards[0];

  const filteredItems = useMemo(() => {
    const activeIdeaItemIds = new Set(activeIdea.itemIds);

    return newYorkItems
      .filter((item) => {
        if (activeIdea.id === "all") return true;
        return activeIdeaItemIds.has(item.id);
      })
      .filter((item) => selectedAreaId === "all" || item.areaId === selectedAreaId)
      .filter((item) => activeCategory === "all" || item.category === activeCategory)
      .filter((item) => matchesMood(item, activeMood))
      .sort(sortItems);
  }, [selectedAreaId, activeCategory, activeMood, activeIdea]);

  const selectedArea = newYorkAreas.find((area) => area.id === selectedAreaId);
  const mapCenter = getMapCenter(activeIdea, selectedArea);

  const diningItems = filteredItems.filter((item) => item.category === "dining");
  const nonDiningItems = filteredItems.filter((item) => item.category !== "dining");

  function chooseIdea(ideaId) {
    setActiveIdeaId(ideaId);
    setSelectedAreaId("all");
    setActiveCategory("all");
    setActiveMood("all");
  }

  function chooseArea(areaId) {
    setSelectedAreaId(areaId);
    setActiveIdeaId("all");
  }

  return (
    <main className="page">
      <style>{cityMapStyles}</style>

      <h1 className="page-title">🗽 New York</h1>

      <p className="page-description">
        מאגר אפשרויות משפחתי לניו יורק — לפי אזור, מצב רוח ורעיונות ליום.
      </p>

      <section className="card playful-panel">
        <h3>💡 רעיונות ליום</h3>
        <p className="meta">
          אלו לא מסלולים מחייבים — רק דרך מהירה לראות קבוצות של דברים שמתאימים יחד.
        </p>

        <div className="idea-grid">
          {ideaCards.map((idea) => (
            <button
              key={idea.id}
              type="button"
              className={`idea-card ${activeIdeaId === idea.id ? "active" : ""}`}
              onClick={() => chooseIdea(idea.id)}
            >
              <strong>{idea.title}</strong>
              <span>{idea.subtitle}</span>
            </button>
          ))}
        </div>
      </section>

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
              onClick={() => chooseArea(area.id)}
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
              מוצגים כרגע {filteredItems.length} פריטים. לחיצה על נקודה פותחת פרטים.
            </p>
          </div>

          <span className="tag">{activeIdea.title}</span>
        </div>

        <div className="real-map-wrap">
          <MapContainer
            key={`${selectedAreaId}-${activeIdeaId}`}
            center={mapCenter}
            zoom={selectedArea || activeIdea.id !== "all" ? 13 : 12}
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
                  click: () => chooseArea(area.id),
                }}
              >
                <Popup>
                  <strong>
                    {areaIcon(area.id)} {area.name}
                  </strong>
                  <br />
                  {area.hebrewName}
                  <br />
                  <button
                    type="button"
                    className="popup-select-button"
                    onClick={() => chooseArea(area.id)}
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
                  <strong>
                    {categoryIcon(item.category)} {item.name}
                  </strong>
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

function getMapCenter(activeIdea, selectedArea) {
  if (selectedArea) return selectedArea.center;

  const ideaCenters = {
    "midtown-kids": [40.7565, -73.9818],
    "central-park-museum": [40.7794, -73.9705],
    "west-side": [40.7475, -74.0048],
    "flatiron-soho": [40.7338, -73.994],
    "brooklyn-downtown": [40.702, -74.0005],
    "rainy-day": [40.7485, -73.9875],
    "low-energy": [40.753, -73.985],
  };

  return ideaCenters[activeIdea.id] || newYorkCenter;
}

function matchesMood(item, mood) {
  if (mood === "all") return true;
  if (mood === "must_do") return item.priority === "must_do";

  if (mood === "tired") {
    return (
      item.indoor === true ||
      item.intensity === "calm" ||
      item.category === "dining"
    );
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
    html: `
      <div class="real-map-marker ${isActive ? "active" : ""}">
        <span>${emoji}</span>
      </div>
    `,
    iconSize: [34, 34],
    iconAnchor: [17, 17],
    popupAnchor: [0, -16],
  });
}

function createItemIcon(emoji) {
  return L.divIcon({
    className: "",
    html: `
      <div class="real-map-marker city-marker">
        <span>${emoji}</span>
      </div>
    `,
    iconSize: [30, 30],
    iconAnchor: [15, 15],
    popupAnchor: [0, -14],
  });
}

const cityMapStyles = `
.idea-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(210px, 1fr));
  gap: 12px;
  margin-top: 12px;
}

.idea-card {
  border: 1px solid #e2e8f0;
  background: rgba(255, 255, 255, 0.92);
  border-radius: 20px;
  padding: 14px;
  text-align: right;
  cursor: pointer;
  font-family: inherit;
  box-shadow: 0 8px 18px rgba(15, 23, 42, 0.06);
  transition: transform 0.15s ease, border-color 0.15s ease, box-shadow 0.15s ease;
}

.idea-card:hover {
  transform: translateY(-2px);
  border-color: #93c5fd;
  box-shadow: 0 12px 24px rgba(15, 23, 42, 0.1);
}

.idea-card.active {
  border-color: #2563eb;
  background: linear-gradient(135deg, #eff6ff 0%, #f5f3ff 100%);
  box-shadow: 0 14px 28px rgba(37, 99, 235, 0.15);
}

.idea-card strong {
  display: block;
  margin-bottom: 6px;
  color: #0f172a;
  font-size: 1rem;
}

.idea-card span {
  display: block;
  color: #64748b;
  font-size: 0.88rem;
  line-height: 1.45;
}

.real-map-card {
  border-color: #bfdbfe;
  background:
    radial-gradient(circle at top right, rgba(191, 219, 254, 0.45), transparent 32%),
    rgba(255, 255, 255, 0.97);
}

.real-map-wrap {
  height: 420px;
  margin-top: 12px;
  overflow: hidden;
  border-radius: 24px;
  border: 1px solid #dbeafe;
  box-shadow: 0 10px 24px rgba(15, 23, 42, 0.08);
}

.real-map {
  height: 100%;
  width: 100%;
  direction: ltr;
}

.real-map-marker {
  width: 34px;
  height: 34px;
  border-radius: 999px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: white;
  border: 2px solid #2563eb;
  box-shadow: 0 8px 18px rgba(15, 23, 42, 0.22);
  font-size: 1.12rem;
}

.real-map-marker.city-marker {
  width: 30px;
  height: 30px;
  border-color: #7c3aed;
  background: #f5f3ff;
  font-size: 1rem;
}

.real-map-marker.active {
  background: linear-gradient(135deg, #2563eb 0%, #7c3aed 100%);
  border-color: white;
  color: white;
  transform: scale(1.14);
}

.popup-select-button {
  margin-top: 8px;
  border: 1px solid #cbd5e1;
  background: #0f172a;
  color: white;
  border-radius: 999px;
  padding: 6px 10px;
  cursor: pointer;
  font-family: inherit;
  font-size: 0.82rem;
}

@media (max-width: 640px) {
  .real-map-wrap {
    height: 430px;
  }
}
`;
