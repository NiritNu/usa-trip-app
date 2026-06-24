import fs from "fs";
import path from "path";

const projectRoot = process.cwd();

/*
  Coordinate convention for our app maps:
  x = 0   west / מערב
  x = 100 east / מזרח
  y = 0   north / צפון
  y = 100 south / דרום
*/

const correctedAreaPositions = {
  // EPCOT — true north up
  "world-celebration": { x: 50, y: 25 },
  "world-discovery": { x: 72, y: 35 },
  "world-nature": { x: 28, y: 35 },
  "world-showcase": { x: 50, y: 68 },

  // Hollywood Studios — corrected to north up
  // Main entrance is north / top in our map.
  "hollywood-boulevard": { x: 50, y: 18 },
  "echo-lake": { x: 39, y: 39 },
  "commissary-lane": { x: 39, y: 52 },
  "animation-courtyard": { x: 62, y: 45 },
  "sunset-boulevard": { x: 74, y: 34 },
  "grand-avenue": { x: 30, y: 58 },
  "pixar-plaza": { x: 45, y: 60 },
  "toy-story-land": { x: 58, y: 70 },
  "star-wars-galaxys-edge": { x: 26, y: 78 },
  "galaxys-edge": { x: 26, y: 78 },

  // Magic Kingdom — already mostly correct, kept north up
  "main-street": { x: 50, y: 78 },
  adventureland: { x: 27, y: 58 },
  frontierland: { x: 27, y: 40 },
  "liberty-square": { x: 43, y: 40 },
  fantasyland: { x: 56, y: 28 },
  "storybook-circus": { x: 73, y: 24 },
  tomorrowland: { x: 75, y: 54 },

  // Animal Kingdom — north up
  oasis: { x: 50, y: 82 },
  "discovery-island": { x: 50, y: 58 },
  pandora: { x: 26, y: 43 },
  africa: { x: 43, y: 28 },
  asia: { x: 73, y: 43 },
  "rafikis-planet-watch": { x: 42, y: 13 },
};

const parkMapComponent = `const parkEntrances = {
  "magic-kingdom": [
    {
      id: "main-entrance",
      label: "כניסה ראשית",
      note: "Main Street / TTC",
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
      y: 58,
    },
  ],

  "hollywood-studios": [
    {
      id: "main-entrance",
      label: "כניסה ראשית",
      note: "Hollywood Boulevard",
      type: "main",
      x: 50,
      y: 6,
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
      note: "מ־CityWalk",
      type: "main",
      x: 16,
      y: 83,
    },
  ],

  "islands-of-adventure": [
    {
      id: "main-entrance",
      label: "כניסה ראשית",
      note: "Port of Entry / CityWalk",
      type: "main",
      x: 50,
      y: 95,
    },
  ],

  "epic-universe": [
    {
      id: "main-entrance",
      label: "כניסה ראשית",
      note: "Parking & Transportation",
      type: "main",
      x: 50,
      y: 94,
    },
    {
      id: "helios-hotel",
      label: "Helios Hotel",
      note: "כניסה לא ראשית לאורחי המלון",
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
          <h3>🗺️ מפת אזורים מוצפנת</h3>
          <p className="meta">
            במפה הזו: צפון למעלה, דרום למטה, מזרח ימינה, מערב שמאלה.
            זו עדיין מפה סכמטית ולא Google Maps.
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

      <div className="park-map cardinal-map">
        <div className="map-cardinal map-cardinal-north">↑ צפון</div>
        <div className="map-cardinal map-cardinal-south">דרום ↓</div>
        <div className="map-cardinal map-cardinal-east">מזרח →</div>
        <div className="map-cardinal map-cardinal-west">← מערב</div>

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
              {entrance.type === "main" ? "🚪" : "🚶"}
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
        <span><b className="legend-dot area" /> אזור בפארק</span>
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
  if (id.includes("commissary")) return "🍽️";
  if (id.includes("pixar")) return "💡";

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
/* Cardinal map correction */
.cardinal-map {
  border: 2px solid #bfdbfe;
}

.map-cardinal {
  position: absolute;
  z-index: 8;
  padding: 5px 9px;
  border-radius: 999px;
  background: rgba(15, 23, 42, 0.88);
  color: white;
  font-size: 0.78rem;
  font-weight: 900;
  box-shadow: 0 7px 16px rgba(15, 23, 42, 0.18);
  pointer-events: none;
}

.map-cardinal-north {
  top: 10px;
  left: 50%;
  transform: translateX(-50%);
}

.map-cardinal-south {
  bottom: 10px;
  left: 50%;
  transform: translateX(-50%);
}

.map-cardinal-east {
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
}

.map-cardinal-west {
  left: 10px;
  top: 50%;
  transform: translateY(-50%);
}

.map-legend .legend-dot.area {
  background: #2563eb;
}

@media (max-width: 640px) {
  .map-cardinal {
    font-size: 0.68rem;
    padding: 4px 7px;
  }

  .map-cardinal-east {
    right: 5px;
  }

  .map-cardinal-west {
    left: 5px;
  }
}
`;

function writeParkMapComponent() {
  const filePath = path.join(projectRoot, "src", "components", "ParkMap.jsx");
  fs.writeFileSync(filePath, parkMapComponent, "utf8");
  console.log("Updated src/components/ParkMap.jsx");
}

function appendCssFix() {
  const cssPath = path.join(projectRoot, "src", "style.css");
  let css = fs.readFileSync(cssPath, "utf8");

  if (!css.includes("/* Cardinal map correction */")) {
    css += "\n" + cssToAdd;
    fs.writeFileSync(cssPath, css, "utf8");
    console.log("Updated src/style.css");
  } else {
    console.log("CSS cardinal correction already exists");
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
    const corrected = correctedAreaPositions[area.id];

    if (!corrected) return area;

    return {
      ...area,
      mapPosition: corrected,
    };
  });

  const nextContent = `export const ${exportName} = ${JSON.stringify(updated, null, 2)};
`;

  fs.writeFileSync(filePath, nextContent, "utf8");
  console.log("Updated:", relativePath);
}

function ensurePagesUseParkMap(relativePath) {
  const filePath = path.join(projectRoot, relativePath);

  if (!fs.existsSync(filePath)) return;

  let content = fs.readFileSync(filePath, "utf8");

  if (!content.includes("../components/ParkMap.jsx")) {
    content = content.replace(
      'import AttractionCard from "../components/AttractionCard.jsx";',
      'import AttractionCard from "../components/AttractionCard.jsx";\nimport ParkMap from "../components/ParkMap.jsx";'
    );
  }

  if (!content.includes("<ParkMap")) {
    content = content.replace(
      "      {areas.length > 0 && (",
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
}

writeParkMapComponent();
appendCssFix();

[
  "src/data/disney/epcot/areas.js",
  "src/data/disney/hollywoodStudios/areas.js",
  "src/data/disney/magicKingdom/areas.js",
  "src/data/disney/animalKingdom/areas.js",
].forEach(updateAreaFile);

ensurePagesUseParkMap("src/pages/Disney.jsx");
ensurePagesUseParkMap("src/pages/Universal.jsx");

console.log("");
console.log("Done.");
console.log("Maps now use a true cardinal convention:");
console.log("north = top, south = bottom, east = right, west = left.");
console.log("EPCOT and Hollywood Studios positions were corrected.");