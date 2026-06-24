const parkEntrances = {
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
