import fs from "fs";
import path from "path";

const projectRoot = process.cwd();

const areaPositions = {
  // Disney — Magic Kingdom
  "main-street": { x: 50, y: 84 },
  adventureland: { x: 24, y: 64 },
  frontierland: { x: 20, y: 43 },
  "liberty-square": { x: 39, y: 45 },
  fantasyland: { x: 55, y: 34 },
  "storybook-circus": { x: 72, y: 28 },
  tomorrowland: { x: 76, y: 56 },

  // Disney — EPCOT
  "world-celebration": { x: 49, y: 76 },
  "world-discovery": { x: 73, y: 58 },
  "world-nature": { x: 29, y: 58 },
  "world-showcase": { x: 50, y: 29 },

  // Disney — Hollywood Studios
  "hollywood-boulevard": { x: 50, y: 84 },
  "echo-lake": { x: 56, y: 63 },
  "grand-avenue": { x: 66, y: 45 },
  "star-wars-galaxys-edge": { x: 77, y: 25 },
  "galaxys-edge": { x: 77, y: 25 },
  "toy-story-land": { x: 36, y: 35 },
  "animation-courtyard": { x: 28, y: 54 },
  "sunset-boulevard": { x: 24, y: 72 },

  // Disney — Animal Kingdom
  oasis: { x: 50, y: 86 },
  "discovery-island": { x: 50, y: 58 },
  pandora: { x: 26, y: 44 },
  africa: { x: 45, y: 30 },
  asia: { x: 73, y: 43 },
  "rafikis-planet-watch": { x: 48, y: 13 },

  // Universal Studios Florida
  "production-central": { x: 50, y: 83 },
  "new-york": { x: 38, y: 65 },
  "san-francisco": { x: 25, y: 48 },
  "the-wizarding-world-diagon-alley": { x: 25, y: 29 },
  "diagon-alley": { x: 25, y: 29 },
  "world-expo": { x: 50, y: 25 },
  springfield: { x: 66, y: 42 },
  "dreamworks-land": { x: 70, y: 68 },
  hollywood: { x: 52, y: 52 },

  // Islands of Adventure
  "port-of-entry": { x: 50, y: 86 },
  "seuss-landing": { x: 73, y: 72 },
  "marvel-super-hero-island": { x: 31, y: 77 },
  "toon-lagoon": { x: 27, y: 61 },
  "skull-island": { x: 29, y: 43 },
  "jurassic-park": { x: 43, y: 30 },
  hogsmeade: { x: 63, y: 29 },
  "lost-continent": { x: 74, y: 50 },

  // Epic Universe
  "celestial-park": { x: 50, y: 50 },
  "super-nintendo-world": { x: 24, y: 25 },
  "dark-universe": { x: 76, y: 27 },
  "isle-of-berk": { x: 76, y: 73 },
  "ministry-of-magic": { x: 24, y: 73 },
};

const parkMapComponent = `export default function ParkMap({
  park,
  areas = [],
  selectedAreaId = "all",
  onSelectArea,
}) {
  if (!park || areas.length === 0) return null;

  return (
    <section className="card park-map-card">
      <div className="card-header">
        <div>
          <h3>🗺️ מפת אזורים</h3>
          <p className="meta">
            מפה סכמטית להתמצאות מהירה — לא מפה מדויקת של Google Maps.
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
        <div className="map-path map-path-main" />
        <div className="map-path map-path-second" />
        <div className="map-center">
          {parkIcon(park)} {park.name}
        </div>

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
  if (id.includes("echo")) return "湖";
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
`;

const cssToAdd = `
/* Park schematic maps */
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
  height: 330px;
  margin-top: 12px;
  overflow: hidden;
  border-radius: 24px;
  border: 1px solid #dbeafe;
  background:
    radial-gradient(circle at 50% 50%, rgba(255, 255, 255, 0.95) 0 0),
    radial-gradient(circle at 25% 25%, rgba(254, 243, 199, 0.85), transparent 22%),
    radial-gradient(circle at 78% 28%, rgba(221, 214, 254, 0.8), transparent 24%),
    radial-gradient(circle at 70% 76%, rgba(187, 247, 208, 0.75), transparent 24%),
    linear-gradient(135deg, #eff6ff 0%, #fdf2f8 100%);
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
  background: rgba(255, 255, 255, 0.82);
  border: 1px solid rgba(226, 232, 240, 0.9);
  color: #0f172a;
  font-size: 0.9rem;
  font-weight: 900;
  text-align: center;
  box-shadow: 0 8px 18px rgba(15, 23, 42, 0.08);
  pointer-events: none;
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
  background: rgba(255, 255, 255, 0.92);
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

.map-hint {
  margin: 10px 0 0;
  color: #64748b;
  font-size: 0.9rem;
}

@media (max-width: 640px) {
  .park-map {
    height: 360px;
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
}
`;

function ensureDir(relativePath) {
  fs.mkdirSync(path.join(projectRoot, relativePath), { recursive: true });
}

function writeComponent() {
  ensureDir("src/components");
  fs.writeFileSync(
    path.join(projectRoot, "src/components/ParkMap.jsx"),
    parkMapComponent,
    "utf8"
  );
}

function updateCss() {
  const cssPath = path.join(projectRoot, "src/style.css");
  let css = fs.readFileSync(cssPath, "utf8");

  if (!css.includes("/* Park schematic maps */")) {
    css += "\n" + cssToAdd;
    fs.writeFileSync(cssPath, css, "utf8");
  }
}

function updateAreaFile(relativePath) {
  const filePath = path.join(projectRoot, relativePath);

  if (!fs.existsSync(filePath)) return;

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
  const areaFiles = [
    "src/data/disney/magicKingdom/areas.js",
    "src/data/disney/epcot/areas.js",
    "src/data/disney/hollywoodStudios/areas.js",
    "src/data/disney/animalKingdom/areas.js",

    "src/data/universal/universalStudios/areas.js",
    "src/data/universal/islandsOfAdventure/areas.js",
    "src/data/universal/epicUniverse/areas.js",
  ];

  areaFiles.forEach(updateAreaFile);
}

function updatePage(relativePath, titleEmoji) {
  const filePath = path.join(projectRoot, relativePath);

  if (!fs.existsSync(filePath)) {
    console.log("Page not found:", relativePath);
    return;
  }

  let content = fs.readFileSync(filePath, "utf8");

  if (!content.includes("../components/ParkMap.jsx")) {
    content = content.replace(
      `import AttractionCard from "../components/AttractionCard.jsx";`,
      `import AttractionCard from "../components/AttractionCard.jsx";
import ParkMap from "../components/ParkMap.jsx";`
    );
  }

  if (!content.includes("<ParkMap")) {
    content = content.replace(
      `      {areas.length > 0 && (`,
      `      <ParkMap
        park={selectedPark}
        areas={areas}
        selectedAreaId={selectedAreaId}
        onSelectArea={setSelectedAreaId}
      />

      {areas.length > 0 && (`
    );
  }

  fs.writeFileSync(filePath, content, "utf8");
  console.log("Updated page:", relativePath);
}

writeComponent();
updateCss();
updateKnownAreaFiles();
updatePage("src/pages/Disney.jsx", "🏰");
updatePage("src/pages/Universal.jsx", "🎢");

console.log("");
console.log("Done. Added ParkMap component and connected it to Disney + Universal.");