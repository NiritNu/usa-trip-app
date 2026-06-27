import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const PARK_MAPS = {
  "magic-kingdom": {
    center: [28.4199, -81.5812],
    zoom: 16,
    entrances: [
      {
        id: "main-entrance",
        label: "כניסה ראשית",
        type: "main",
        note: "Main Street / כניסה ראשית",
        position: [28.4174, -81.5812],
      },
    ],
    areas: {
      "main-street": [28.4184, -81.5812],
      adventureland: [28.4189, -81.5842],
      frontierland: [28.4205, -81.5848],
      "liberty-square": [28.4203, -81.5829],
      fantasyland: [28.4219, -81.5805],
      "storybook-circus": [28.4232, -81.5781],
      tomorrowland: [28.4197, -81.5782],
    },
  },

  epcot: {
    center: [28.3726, -81.5494],
    zoom: 15,
    entrances: [
      {
        id: "main-entrance",
        label: "כניסה ראשית",
        type: "main",
        note: "Front Entrance / Spaceship Earth",
        position: [28.3753, -81.5494],
      },
      {
        id: "international-gateway",
        label: "International Gateway",
        type: "secondary",
        note: "כניסה לא ראשית מאזור BoardWalk / International Gateway",
        position: [28.3707, -81.5584],
      },
    ],
    areas: {
      "world-celebration": [28.3739, -81.5495],
      "world-discovery": [28.3741, -81.5464],
      "world-nature": [28.3732, -81.5530],
      "world-showcase": [28.3699, -81.5497],
    },
  },

  "hollywood-studios": {
    center: [28.3562, -81.5586],
    zoom: 16,
    entrances: [
      {
        id: "main-entrance",
        label: "כניסה ראשית",
        type: "main",
        note: "Hollywood Boulevard",
        position: [28.3566, -81.5573],
      },
    ],
    areas: {
      "hollywood-boulevard": [28.3563, -81.5583],
      "echo-lake": [28.3578, -81.5574],
      "grand-avenue": [28.3548, -81.5585],
      "star-wars-galaxys-edge": [28.3537, -81.5615],
      "galaxys-edge": [28.3537, -81.5615],
      "toy-story-land": [28.3559, -81.5618],
      "animation-courtyard": [28.3586, -81.5588],
      "sunset-boulevard": [28.3584, -81.5607],
    },
  },

  "animal-kingdom": {
    center: [28.3578, -81.5907],
    zoom: 15,
    entrances: [
      {
        id: "main-entrance",
        label: "כניסה ראשית",
        type: "main",
        note: "Oasis",
        position: [28.3550, -81.5907],
      },
    ],
    areas: {
      oasis: [28.3558, -81.5907],
      "discovery-island": [28.3575, -81.5905],
      pandora: [28.3587, -81.5941],
      africa: [28.3600, -81.5916],
      asia: [28.3586, -81.5878],
      "rafikis-planet-watch": [28.3634, -81.5914],
    },
  },

  "universal-studios-florida": {
    center: [28.4772, -81.4686],
    zoom: 16,
    entrances: [
      {
        id: "main-entrance",
        label: "כניסה ראשית",
        type: "main",
        note: "מ־CityWalk",
        position: [28.4750, -81.4675],
      },
    ],
    areas: {
      "production-central": [28.4758, -81.4666],
      "new-york": [28.4771, -81.4664],
      "san-francisco": [28.4785, -81.4681],
      "the-wizarding-world-diagon-alley": [28.4790, -81.4698],
      "diagon-alley": [28.4790, -81.4698],
      "world-expo": [28.4778, -81.4716],
      springfield: [28.4772, -81.4708],
      "dreamworks-land": [28.4752, -81.4701],
      hollywood: [28.4753, -81.4684],
    },
  },

  "islands-of-adventure": {
    center: [28.4724, -81.4700],
    zoom: 16,
    entrances: [
      {
        id: "main-entrance",
        label: "כניסה ראשית",
        type: "main",
        note: "Port of Entry / CityWalk",
        position: [28.4698, -81.4707],
      },
    ],
    areas: {
      "port-of-entry": [28.4704, -81.4705],
      "marvel-super-hero-island": [28.4719, -81.4727],
      "toon-lagoon": [28.4732, -81.4723],
      "skull-island": [28.4746, -81.4706],
      "jurassic-park": [28.4740, -81.4686],
      hogsmeade: [28.4727, -81.4670],
      "lost-continent": [28.4715, -81.4678],
      "seuss-landing": [28.4704, -81.4686],
    },
  },

  "epic-universe": {
    center: [28.4415, -81.4482],
    zoom: 15,
    entrances: [
      {
        id: "main-entrance",
        label: "כניסה ראשית",
        type: "main",
        note: "Parking & Transportation",
        position: [28.4380, -81.4484],
      },
      {
        id: "helios-hotel",
        label: "Helios Hotel",
        type: "secondary",
        note: "כניסה לא ראשית לאורחי המלון",
        position: [28.4448, -81.4479],
      },
    ],
    areas: {
      "celestial-park": [28.4414, -81.4481],
      "super-nintendo-world": [28.4398, -81.4514],
      "dark-universe": [28.4431, -81.4510],
      "ministry-of-magic": [28.4430, -81.4454],
      "isle-of-berk": [28.4398, -81.4446],
    },
  },
};

export default function RealParkMap({
  park,
  areas = [],
  selectedAreaId = "all",
  onSelectArea,
}) {
  if (!park || areas.length === 0) return null;

  const config = PARK_MAPS[park.id] || createFallbackMapConfig(park, areas);
  const selectedArea = areas.find((area) => area.id === selectedAreaId);

  return (
    <section className="card real-map-card">
      <style>{mapStyles}</style>

      <div className="card-header">
        <div>
          <h3>🗺️ מפה אמיתית</h3>
          <p className="meta">
            מבוסס OpenStreetMap. צפון למעלה, דרום למטה, מזרח ימינה, מערב שמאלה.
          </p>
        </div>

        <button
          type="button"
          className={selectedAreaId === "all" ? "map-reset active" : "map-reset"}
          onClick={() => onSelectArea?.("all")}
        >
          כל הפארק
        </button>
      </div>

      <div className="real-map-wrap">
        <MapContainer
          key={park.id}
          center={selectedArea ? getAreaPosition(config, selectedArea) : config.center}
          zoom={selectedArea ? config.zoom + 1 : config.zoom}
          scrollWheelZoom={false}
          className="real-map"
        >
          <TileLayer
            attribution='&copy; OpenStreetMap contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {config.entrances.map((entrance) => (
            <Marker
              key={entrance.id}
              position={entrance.position}
              icon={createEntranceIcon(entrance.type)}
            >
              <Popup>
                <strong>{entrance.label}</strong>
                <br />
                {entrance.note}
              </Popup>
            </Marker>
          ))}

          {areas.map((area, index) => {
            const isActive = selectedAreaId === area.id;
            const position = getAreaPosition(config, area, index, areas.length);

            return (
              <Marker
                key={area.id}
                position={position}
                icon={createAreaIcon(area, isActive)}
                eventHandlers={{
                  click: () => onSelectArea?.(area.id),
                }}
              >
                <Popup>
                  <strong>{areaIcon(area)} {area.name}</strong>
                  {area.hebrewName && (
                    <>
                      <br />
                      {area.hebrewName}
                    </>
                  )}
                  <br />
                  <button
                    type="button"
                    className="popup-select-button"
                    onClick={() => onSelectArea?.(area.id)}
                  >
                    הצג רק את האזור הזה
                  </button>
                </Popup>
              </Marker>
            );
          })}
        </MapContainer>
      </div>

      <div className="map-legend">
        <span>
          <b className="legend-dot main" /> כניסה ראשית
        </span>
        <span>
          <b className="legend-dot secondary" /> כניסה לא ראשית
        </span>
        <span>
          <b className="legend-dot area" /> אזור בפארק
        </span>
      </div>

      <p className="map-hint">
        לחיצה על אזור במפה תסנן את הכרטיסים לאותו אזור. המיקומים הם בסיס טוב,
        ואפשר לדייק אותם בהמשך נקודה־נקודה.
      </p>
    </section>
  );
}

function getAreaPosition(config, area, index = 0, total = 1) {
  const knownPosition = config.areas?.[area.id];

  if (knownPosition) return knownPosition;

  const angle = (index / Math.max(total, 1)) * Math.PI * 2;
  const latOffset = Math.sin(angle) * 0.0015;
  const lngOffset = Math.cos(angle) * 0.0015;

  return [config.center[0] + latOffset, config.center[1] + lngOffset];
}

function createFallbackMapConfig(park, areas) {
  const center = [28.4, -81.55];

  return {
    center,
    zoom: 15,
    entrances: [],
    areas: Object.fromEntries(
      areas.map((area, index) => [
        area.id,
        getFallbackPosition(center, index, areas.length),
      ])
    ),
  };
}

function getFallbackPosition(center, index, total) {
  const angle = (index / Math.max(total, 1)) * Math.PI * 2;
  const latOffset = Math.sin(angle) * 0.0015;
  const lngOffset = Math.cos(angle) * 0.0015;

  return [center[0] + latOffset, center[1] + lngOffset];
}

function createAreaIcon(area, isActive) {
  return L.divIcon({
    className: "",
    html: `
      <div class="real-map-marker ${isActive ? "active" : ""}">
        <span>${areaIcon(area)}</span>
      </div>
    `,
    iconSize: [34, 34],
    iconAnchor: [17, 17],
    popupAnchor: [0, -16],
  });
}

function createEntranceIcon(type) {
  const emoji = type === "main" ? "🚪" : "🚶";
  const className = type === "main" ? "main" : "secondary";

  return L.divIcon({
    className: "",
    html: `
      <div class="real-map-entrance ${className}">
        <span>${emoji}</span>
      </div>
    `,
    iconSize: [38, 38],
    iconAnchor: [19, 19],
    popupAnchor: [0, -18],
  });
}

function areaIcon(area) {
  const id = area.id || "";
  const name = area.name || "";

  if (id.includes("main-street")) return "🏘️";
  if (id.includes("adventure")) return "🌴";
  if (id.includes("frontier")) return "🤠";
  if (id.includes("liberty")) return "🛶";
  if (id.includes("fantasy")) return "👑";
  if (id.includes("tomorrow")) return "🚀";
  if (id.includes("storybook")) return "🎪";

  if (id.includes("world-showcase")) return "🌍";
  if (id.includes("world-nature")) return "🌿";
  if (id.includes("world-discovery")) return "🚀";
  if (id.includes("world-celebration")) return "✨";

  if (id.includes("star-wars") || id.includes("galaxy")) return "🌌";
  if (id.includes("toy-story")) return "🧸";
  if (id.includes("sunset")) return "🌅";
  if (id.includes("animation")) return "🎨";
  if (id.includes("echo")) return "💧";
  if (id.includes("grand")) return "🎭";

  if (id.includes("oasis")) return "🌴";
  if (id.includes("discovery-island")) return "🌳";
  if (id.includes("pandora")) return "🌌";
  if (id.includes("africa")) return "🦒";
  if (id.includes("asia")) return "🐅";
  if (id.includes("rafiki")) return "🚂";

  if (id.includes("production")) return "🎬";
  if (id.includes("new-york")) return "🗽";
  if (id.includes("san-francisco")) return "🌉";
  if (id.includes("diagon")) return "🧙";
  if (id.includes("springfield")) return "🍩";
  if (id.includes("dreamworks")) return "🐼";
  if (id.includes("hollywood")) return "🎥";

  if (id.includes("port")) return "🌎";
  if (id.includes("seuss")) return "🐱";
  if (id.includes("marvel")) return "🦸";
  if (id.includes("toon")) return "💦";
  if (id.includes("skull")) return "🦍";
  if (id.includes("jurassic")) return "🦖";
  if (id.includes("hogsmeade")) return "🏰";
  if (id.includes("lost")) return "🏛️";

  if (id.includes("celestial")) return "✨";
  if (id.includes("nintendo")) return "🍄";
  if (id.includes("dark")) return "🧛";
  if (id.includes("berk")) return "🐉";
  if (id.includes("ministry")) return "🪄";

  if (name.includes("Harry")) return "🧙";

  return "📍";
}

const mapStyles = `
.real-map-card {
  border-color: #bfdbfe;
  background:
    radial-gradient(circle at top right, rgba(191, 219, 254, 0.45), transparent 32%),
    rgba(255, 255, 255, 0.97);
}

.real-map-wrap {
  height: 380px;
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

.real-map-marker,
.real-map-entrance {
  width: 34px;
  height: 34px;
  border-radius: 999px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: white;
  border: 2px solid #2563eb;
  box-shadow: 0 8px 18px rgba(15, 23, 42, 0.22);
  font-size: 1.15rem;
}

.real-map-marker.active {
  background: linear-gradient(135deg, #2563eb 0%, #7c3aed 100%);
  border-color: white;
  color: white;
  transform: scale(1.14);
}

.real-map-entrance {
  width: 38px;
  height: 38px;
  border-color: #22c55e;
  background: #dcfce7;
}

.real-map-entrance.secondary {
  border-color: #f59e0b;
  background: #fffbeb;
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

.map-reset {
  border: 1px solid #cbd5e1;
  background: white;
  color: #334155;
  border-radius: 999px;
  padding: 8px 12px;
  cursor: pointer;
  font-size: 0.84rem;
  font-weight: 800;
  white-space: nowrap;
}

.map-reset.active {
  background: #0f172a;
  color: white;
  border-color: #0f172a;
}

.map-legend {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 10px;
  color: #475569;
  font-size: 0.84rem;
}

.map-legend span {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  padding: 5px 9px;
  border-radius: 999px;
  background: #f8fafc;
  border: 1px solid #e2e8f0;
}

.legend-dot {
  width: 10px;
  height: 10px;
  border-radius: 999px;
  display: inline-block;
}

.legend-dot.main {
  background: #22c55e;
}

.legend-dot.secondary {
  background: #f59e0b;
}

.legend-dot.area {
  background: #2563eb;
}

.map-hint {
  margin: 10px 0 0;
  color: #64748b;
  font-size: 0.9rem;
}

@media (max-width: 640px) {
  .real-map-wrap {
    height: 420px;
  }
}
`;