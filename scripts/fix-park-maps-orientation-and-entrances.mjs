import fs from "fs";
import path from "path";

const projectRoot = process.cwd();

const areaPositions = {
  // Disney — Magic Kingdom, north up, entrance south
  "main-street": { x: 50, y: 78 },
  adventureland: { x: 25, y: 58 },
  frontierland: { x: 24, y: 38 },
  "liberty-square": { x: 43, y: 38 },
  fantasyland: { x: 56, y: 26 },
  "storybook-circus": { x: 73, y: 22 },
  tomorrowland: { x: 76, y: 52 },

  // Disney — EPCOT, north up, main entrance north, International Gateway west/southwest
  "world-celebration": { x: 50, y: 29 },
  "world-discovery": { x: 74, y: 39 },
  "world-nature": { x: 27, y: 39 },
  "world-showcase": { x: 50, y: 69 },

  // Disney — Hollywood Studios, entrance south
  "hollywood-boulevard": { x: 50, y: 82 },
  "sunset-boulevard": { x: 25, y: 63 },
  "animation-courtyard": { x: 39, y: 53 },
  "echo-lake": { x: 62, y: 58 },
  "grand-avenue": { x: 70, y: 43 },
  "toy-story-land": { x: 43, y: 31 },
  "star-wars-galaxys-edge": { x: 74, y: 24 },
  "galaxys-edge": { x: 74, y: 24 },

  // Disney — Animal Kingdom, entrance south, Discovery Island center
  oasis: { x: 50, y: 82 },
  "discovery-island": { x: 50, y: 56 },
  pandora: { x: 25, y: 43 },
  africa: { x: 43, y: 28 },
  asia: { x: 72, y: 43 },
  "rafikis-planet-watch": { x: 42, y: 13 },

  // Universal Studios Florida, north up, entrance southwest from CityWalk
  "production-central": { x: 29, y: 75 },
  "minion-land": { x: 25, y: 69 },
  "new-york": { x: 42, y: 45 },
  "san-francisco": { x: 61, y: 45 },
  "the-wizarding-world-diagon-alley": { x: 78, y: 40 },
  "diagon-alley": { x: 78, y: 40 },
  "world-expo": { x: 88, y: 58 },
  springfield: { x: 65, y: 68 },
  "dreamworks-land": { x: 53, y: 83 },
  hollywood: { x: 30, y: 88 },

  // Islands of Adventure, entrance south, lake center
  "port-of-entry": { x: 50, y: 84 },
  "marvel-super-hero-island": { x: 28, y: 68 },
  "toon-lagoon": { x: 25, y: 50 },
  "skull-island": { x: 29, y: 31 },
  "jurassic-park": { x: 47, y: 27 },
  hogsmeade: { x: 67, y: 29 },
  "lost-continent": { x: 72, y: 50 },
  "seuss-landing": { x: 67, y: 70 },

  // Epic Universe, north up, main entrance south, Helios hotel north
  "celestial-park": { x: 50, y: 50 },
  "dark-universe": { x: 24, y: 24 },
  "super-nintendo-world": { x: 20, y: 66 },
  "ministry-of-magic": { x: 75, y: 24 },
  "isle-of-berk": { x: 75, y: 70 },
};

const parkMapComponent = `const parkEntrances = {
  "magic-kingdom": [
    {
      id: "main-entrance",
      label: "כניסה ראשית",
      note: "Main Street / רכבת, מונורייל, מעבורת",
      type: "main",
      x: 50,
      y: 95,
    },
  ],

  epcot: [
    {
      id: "main-entrance",
      label: "כניסה ראשית",
      note: "Front Entrance / Spaceship Earth",
      type: "main",
      x: 50,
      y: 6,
    },
    {
      id: "international-gateway",
      label: "International Gateway",
      note: "כניסה לא ראשית מאזור BoardWalk / Beach Club",
      type: "secondary",
      x: 27,
      y: 73,
    },
  ],

  "hollywood-studios": [
    {
      id: "main-entrance",
      label: "כניסה ראשית",
      note: "Hollywood Boulevard",
      type: "main",
      x: 50,
      y: 95,
    },
  ],

  "animal-kingdom": [
    {
      id: "main-entrance",
      label: "כניסה ראשית",
      note: "Oasis",
      type: "main",
      x: 50,
      y: 95,
    },
  ],

  "universal-studios-florida": [
    {
      id: "main-entrance",
      label: "כניסה ראשית",
      note: "מ־CityWalk / Parking Garages",
      type: "main",
      x: 16,
      y: 83,
    },
    {
      id: "parade-start-end",
      label: "Parade Start/End",
      note: "לא כניסת אורחים",
      type: "service",
      x: 44,
      y: 77,
    },
  ],

  "islands-of-adventure": [
    {
      id: "main-entrance",
      label: "כניסה ראשית",
      note: "Port of Entry מ־CityWalk",
      type: "main",
      x: 50,
      y: 95,
    },
  ],

  "epic-universe": [
    {
      id: "main-entrance",
      label: "כניסה ראשית",
      note: "Parking & Bus Transportation",
      type: "main",
      x: 50,
      y: 94,
    },
    {
      id: "helios-hotel",
      label: "Helios Hotel",
      note: "כניסה/יציאה לא ראשית לאורחי המלון",
      type: "secondary",
      x: 50,
      y: 6,
    },
  ],
};

export default function ParkMap({
  park,
  areas = [],
  selectedAreaId = "all",
  onSelectArea,
}) {
  if (!park || areas.length === 0) return null;

  const entrances = parkEntrances[park.id] || [];

  return (
    <section className="card park-map-card">
      <div className="card-header">
        <div>
          <h3>🗺️ מפת אזורים</h3>
          <p className="meta">
            מפה סכמטית להתמצאות. צפון למעלה. לא GPS ולא מפה מדויקת של Google Maps.
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

      <div className="park-map">
        <div className="map-compass" aria-label="צפון">
          <span>↑</span>
          <strong>צפון</strong>
        </div>

        <div className="map-path map-path-main" />
        <div className="map-path map-path-second" />

        <div className="map-center">
          {parkIcon(park)} {park.name}
        </div>

        {entrances.map((entrance) => (
          <div
            key={entrance.id}
            className={"map-entrance map-entrance-" + entrance.type}
            style={{
              "--x": entrance.x + "%",
              "--y": entrance.y + "%",
            }}
          >
            <span className="entrance-icon">
              {entrance.type === "main" ? "🚪" : entrance.type === "secondary" ? "🚶" : "🚧"}
            </span>
            <span className="entrance-label">{entrance.label}</span>
            <span className="entrance-note">{entrance.note}</span>
          </div>
        ))}

        {areas.map((area, index) => {
          const position = getAreaPosition(area, index, areas.length);
          const isActive = selectedAreaId === area.id;

          return (
            <button
              key={area.id}
              type="button"
              className={isActive ? "map-area active" : "map-area"}
              style={{
                "--x": position.x + "%",
                "--y": position.y + "%",
              }}
              onClick={() => onSelectArea?.(area.id)}
              title={area.hebrewName || area.name}
            >
              <span className="map-dot">{areaIcon(area)}</span>
              <span className="map-label">{area.name}</span>
            </button>
          );
        })}
      </div>

      <div className="map-legend">
        <span><b className="legend-dot main" /> כניסה ראשית</span>
        <span><b className="legend-dot secondary" /> כניסה לא ראשית</span>
        <span><b className="legend-dot service" /> נקודת שירות / לא כניסת אורחים</span>
      </div>

      <p className="map-hint">
        לחיצה על אזור במפה תציג רק מתקנים ואוכל שנמצאים שם.
      </p>
    </section>
  );
}

function getAreaPosition(area, index, total) {
  if (area.mapPosition) return area.mapPosition;

  const angle = (index / Math.max(total, 1)) * Math.PI * 2 - Math.PI / 2;

  return {
    x: Math.round(50 + Math.cos(angle) * 32),
    y: Math.round(50 + Math.sin(angle) * 32),
  };
}

function parkIcon(park) {
  const id = park?.id || "";
  const name = park?.name || "";

  if (id.includes("magic") || name.includes("Magic")) return "🏰";
  if (id.includes("epcot") || name.includes("EPCOT")) return "🌐";
  if (id.includes("hollywood") || name.includes("Hollywood")) return "🎬";
  if (id.includes("animal") || name.includes("Animal")) return "🦁";
  if (id.includes("universal-studios") || name.includes("Universal Studios")) return "🎥";
  if (id.includes("islands") || name.includes("Islands")) return "🧙";
  if (id.includes("epic") || name.includes("Epic")) return "⭐";

  return "📍";
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
  if (id.includes("minion")) return "🍌";
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
`;

const cssToAdd = `
/* Park maps orientation and entrances */
.park-map-card {
  border-color: #bfdbfe;
  background:
    radial-gradient(circle at top right, rgba(191, 219, 254, 0.55), transparent 32%),
    rgba(255, 255, 255, 0.97);
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

.park-map {
  position: relative;
  height: 360px;
  margin-top: 12px;
  overflow: hidden;
  border-radius: 24px;
  border: 1px solid #dbeafe;
  background:
    radial-gradient(circle at 25% 24%, rgba(254, 243, 199, 0.85), transparent 22%),
    radial-gradient(circle at 78% 28%, rgba(221, 214, 254, 0.8), transparent 24%),
    radial-gradient(circle at 70% 76%, rgba(187, 247, 208, 0.75), transparent 24%),
    linear-gradient(135deg, #eff6ff 0%, #fdf2f8 100%);
}

.map-compass {
  position: absolute;
  inset-inline-start: 14px;
  top: 14px;
  z-index: 5;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 7px 10px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.92);
  border: 1px solid #dbeafe;
  color: #1e3a8a;
  font-size: 0.82rem;
  box-shadow: 0 6px 14px rgba(15, 23, 42, 0.08);
}

.map-compass span {
  font-size: 1.15rem;
  line-height: 1;
}

.map-path {
  position: absolute;
  inset: 18%;
  border: 2px dashed rgba(100, 116, 139, 0.28);
  border-radius: 999px;
  pointer-events: none;
}

.map-path-second {
  inset: 31% 22%;
  transform: rotate(-18deg);
  border-color: rgba(124, 58, 237, 0.22);
}

.map-center {
  position: absolute;
  inset-inline-start: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  max-width: 42%;
  padding: 10px 13px;
  border-radius: 18px;
  background: rgba(255, 255, 255, 0.84);
  border: 1px solid rgba(226, 232, 240, 0.9);
  color: #0f172a;
  font-size: 0.9rem;
  font-weight: 900;
  text-align: center;
  box-shadow: 0 8px 18px rgba(15, 23, 42, 0.08);
  pointer-events: none;
  z-index: 2;
}

.map-area {
  position: absolute;
  left: var(--x);
  top: var(--y);
  transform: translate(-50%, -50%);
  width: 118px;
  min-height: 58px;
  border: 1px solid #dbeafe;
  border-radius: 18px;
  background: rgba(255, 255, 255, 0.93);
  color: #334155;
  padding: 8px;
  cursor: pointer;
  box-shadow: 0 8px 18px rgba(15, 23, 42, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 3px;
  transition:
    transform 0.14s ease,
    box-shadow 0.14s ease,
    background 0.14s ease,
    border-color 0.14s ease;
  z-index: 3;
}

.map-area:hover {
  transform: translate(-50%, -52%);
  box-shadow: 0 12px 24px rgba(15, 23, 42, 0.13);
  border-color: #93c5fd;
}

.map-area.active {
  background: linear-gradient(135deg, #2563eb 0%, #7c3aed 100%);
  color: white;
  border-color: transparent;
  box-shadow: 0 14px 26px rgba(99, 102, 241, 0.26);
}

.map-dot {
  font-size: 1.25rem;
  line-height: 1;
}

.map-label {
  font-size: 0.73rem;
  line-height: 1.15;
  font-weight: 800;
  text-align: center;
}

.map-entrance {
  position: absolute;
  left: var(--x);
  top: var(--y);
  transform: translate(-50%, -50%);
  z-index: 4;
  max-width: 150px;
  padding: 7px 9px;
  border-radius: 16px;
  background: rgba(255, 255, 255, 0.96);
  border: 2px solid #22c55e;
  box-shadow: 0 10px 18px rgba(15, 23, 42, 0.12);
  text-align: center;
  color: #14532d;
}

.map-entrance-secondary {
  border-color: #f59e0b;
  color: #7c2d12;
}

.map-entrance-service {
  border-color: #94a3b8;
  color: #334155;
  opacity: 0.9;
}

.entrance-icon {
  display: block;
  font-size: 1.05rem;
  line-height: 1;
}

.entrance-label {
  display: block;
  font-size: 0.72rem;
  font-weight: 900;
  line-height: 1.1;
}

.entrance-note {
  display: block;
  margin-top: 2px;
  font-size: 0.62rem;
  line-height: 1.05;
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

.legend-dot.service {
  background: #94a3b8;
}

.map-hint {
  margin: 10px 0 0;
  color: #64748b;
  font-size: 0.9rem;
}

@media (max-width: 640px) {
  .park-map {
    height: 430px;
  }

  .map-area {
    width: 96px;
    min-height: 56px;
    padding: 7px;
  }

  .map-label {
    font-size: 0.66rem;
  }

  .map-center {
    max-width: 48%;
    font-size: 0.78rem;
    padding: 8px 10px;
  }

  .map-entrance {
    max-width: 118px;
    padding: 6px 7px;
  }

  .entrance-label {
    font-size: 0.65rem;
  }

  .entrance-note {
    font-size: 0.57rem;
  }
}
`;

function writeComponent() {
  const componentPath = path.join(projectRoot, "src", "components", "ParkMap.jsx");
  fs.mkdirSync(path.dirname(componentPath), { recursive: true });
  fs.writeFileSync(componentPath, parkMapComponent, "utf8");
  console.log("Updated src/components/ParkMap.jsx");
}

function updateCss() {
  const cssPath = path.join(projectRoot, "src", "style.css");
  let css = fs.readFileSync(cssPath, "utf8");

  const marker = "/* Park maps orientation and entrances */";

  if (!css.includes(marker)) {
    css += "\n" + cssToAdd;
    fs.writeFileSync(cssPath, css, "utf8");
    console.log("Updated src/style.css");
  } else {
    console.log("CSS already contains orientation update");
  }
}

function updateAreaFile(relativePath) {
  const filePath = path.join(projectRoot, relativePath);

  if (!fs.existsSync(filePath)) {
    console.log("Skipped missing:", relativePath);
    return;
  }

  const content = fs.readFileSync(filePath, "utf8");
  const match = content.match(/export const\s+(\w+)\s*=\s*(\[[\s\S]*?\]);?\s*$/);

  if (!match) {
    console.log("Skipped, could not parse:", relativePath);
    return;
  }

  const exportName = match[1];
  let areas;

  try {
    areas = JSON.parse(match[2]);
  } catch {
    console.log("Skipped, JSON parse failed:", relativePath);
    return;
  }

  const updated = areas.map((area) => {
    const position = areaPositions[area.id];

    if (!position) return area;

    return {
      ...area,
      mapPosition: position,
    };
  });

  const nextContent = `export const ${exportName} = ${JSON.stringify(updated, null, 2)};
`;

  fs.writeFileSync(filePath, nextContent, "utf8");
  console.log("Updated map positions:", relativePath);
}

function updateKnownAreaFiles() {
  [
    "src/data/disney/magicKingdom/areas.js",
    "src/data/disney/epcot/areas.js",
    "src/data/disney/hollywoodStudios/areas.js",
    "src/data/disney/animalKingdom/areas.js",
    "src/data/universal/universalStudios/areas.js",
    "src/data/universal/islandsOfAdventure/areas.js",
    "src/data/universal/epicUniverse/areas.js",
  ].forEach(updateAreaFile);
}

writeComponent();
updateCss();
updateKnownAreaFiles();

console.log("");
console.log("Done. Park maps now have north orientation and entrance markers.");