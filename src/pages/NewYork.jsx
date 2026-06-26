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
      <style>{cityMapStyles}</style>

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
              לחיצה על אזור או נקודה במפה תסנן/תפתח פרטים. צפון למעלה.
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
                  <strong>
                    {areaIcon(area.id)} {area.name}
                  </strong>
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
        <div className="empty-state">אין כרגע פריטים שמתאימים לסינון הזה.</div>
      )}
    </main>
  );
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
