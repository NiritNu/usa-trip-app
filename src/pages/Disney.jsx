import { useMemo, useState } from "react";
import { disneyParks } from "../data";
import AttractionCard from "../components/AttractionCard";

const categoryFilters = [
  { id: "all", label: "הכול" },
  { id: "ride", label: "מתקנים" },
  { id: "show", label: "הופעות" },
  { id: "character", label: "דמויות" },
  { id: "dining", label: "אוכל" },
  { id: "experience", label: "חוויות" },
];

const needFilters = [
  { id: "all", label: "הכול" },
  { id: "must_do", label: "חובה" },
  { id: "indoor", label: "צריך מזגן" },
  { id: "no_height", label: "ללא מגבלת גובה" },
  { id: "low_wait", label: "תור קצר יחסית" },
  { id: "all_together", label: "מתאים לכולם" },
  { id: "older_kids", label: "רק הגדולים" },
  { id: "rain", label: "גשם" },
];

export default function Disney() {
  const [selectedParkId, setSelectedParkId] = useState(
    disneyParks[0]?.id || "magic-kingdom"
  );
  const [selectedAreaId, setSelectedAreaId] = useState("all");
  const [activeCategory, setActiveCategory] = useState("all");
  const [activeNeed, setActiveNeed] = useState("all");

  const selectedPark =
    disneyParks.find((park) => park.id === selectedParkId) || disneyParks[0];

  const areas = selectedPark?.areas || [];
  const items = selectedPark?.items || [];

  const filteredItems = useMemo(() => {
    return items
      .filter((item) => {
        if (selectedAreaId === "all") return true;
        return item.areaId === selectedAreaId;
      })
      .filter((item) => {
        if (activeCategory === "all") return true;
        return item.category === activeCategory;
      })
      .filter((item) => matchesNeed(item, activeNeed))
      .sort(sortItems);
  }, [items, selectedAreaId, activeCategory, activeNeed]);

  const selectedArea =
    selectedAreaId === "all"
      ? null
      : areas.find((area) => area.id === selectedAreaId);

  const hasParkContent = items.length > 0;

  const diningItems = filteredItems.filter((item) => item.category === "dining");
  const nonDiningItems = filteredItems.filter(
    (item) => item.category !== "dining"
  );

  return (
    <main className="page">
      <h1 className="page-title">Disney</h1>

      <p className="page-description">
        בחרי פארק, אזור וסוג פעילות. כרגע Magic Kingdom מלא; שאר הפארקים מוכנים
        במבנה ונמלא אותם בהמשך.
      </p>

      <section className="card">
        <h3>פארק</h3>

        <div className="tabs-row">
          {disneyParks.map((park) => (
            <button
              key={park.id}
              type="button"
              className={selectedParkId === park.id ? "active" : ""}
              onClick={() => {
                setSelectedParkId(park.id);
                setSelectedAreaId("all");
                setActiveCategory("all");
                setActiveNeed("all");
              }}
            >
              {park.name}
            </button>
          ))}
        </div>
      </section>

      <section className="card">
        <h3>איפה אתם עכשיו?</h3>

        <div className="tabs-row">
          <button
            type="button"
            className={selectedAreaId === "all" ? "active" : ""}
            onClick={() => setSelectedAreaId("all")}
          >
            כל הפארק
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
            {selectedArea.hebrewName ? ` · ${selectedArea.hebrewName}` : ""}
          </p>
        )}
      </section>

      <section className="card">
        <h3>מה לראות באזור?</h3>

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

      <section className="card">
        <h3>מה צריך עכשיו?</h3>

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

      <section className="card">
        <div className="card-header">
          <div>
            <h3>תוצאות</h3>
            <p className="meta">
              {selectedPark?.name}
              {" · "}
              {selectedArea ? selectedArea.name : "כל הפארק"}
              {" · "}
              {labelCategory(activeCategory)}
              {" · "}
              {labelNeed(activeNeed)}
            </p>
          </div>

          <span className="tag">{filteredItems.length} פריטים</span>
        </div>

        {!hasParkContent && (
          <div className="empty-state">
            הפארק הזה כבר קיים במבנה האפליקציה, אבל עוד לא הכנסנו אליו תוכן.
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
          <h2 className="page-title small-title">אוכל קרוב</h2>

          <div className="cards-list">
            {diningItems.map((item) => (
              <AttractionCard key={item.id} attraction={item} />
            ))}
          </div>
        </>
      )}

      {nonDiningItems.length > 0 && (
        <>
          <h2 className="page-title small-title">דברים לעשות</h2>

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

  if (need === "must_do") {
    return item.priority === "must_do";
  }

  if (need === "indoor") {
    return item.indoor === true;
  }

  if (need === "no_height") {
    return item.minHeightCm == null;
  }

  if (need === "low_wait") {
    return item.avgWaitSeptemberMin != null && item.avgWaitSeptemberMin <= 25;
  }

  if (need === "all_together") {
    return item.familyMode === "all_together";
  }

  if (need === "older_kids") {
    return item.suitableFor?.includes("olderKid");
  }

  if (need === "rain") {
    return item.rainFriendly === true;
  }

  return true;
}

function sortItems(a, b) {
  const categoryOrder = {
    ride: 0,
    show: 1,
    character: 2,
    experience: 3,
    dining: 4,
  };

  const priorityOrder = {
    must_do: 0,
    good_if_time: 1,
    skip_if_busy: 2,
  };

  const priorityA = priorityOrder[a.priority] ?? 99;
  const priorityB = priorityOrder[b.priority] ?? 99;

  if (priorityA !== priorityB) return priorityA - priorityB;

  const categoryA = categoryOrder[a.category] ?? 99;
  const categoryB = categoryOrder[b.category] ?? 99;

  if (categoryA !== categoryB) return categoryA - categoryB;

  const waitA = a.avgWaitSeptemberMin ?? 999;
  const waitB = b.avgWaitSeptemberMin ?? 999;

  if (waitA !== waitB) return waitA - waitB;

  return a.name.localeCompare(b.name);
}

function labelCategory(category) {
  const labels = {
    all: "הכול",
    ride: "מתקנים",
    show: "הופעות",
    character: "דמויות",
    dining: "אוכל",
    experience: "חוויות",
  };

  return labels[category] || category;
}

function labelNeed(need) {
  const labels = {
    all: "הכול",
    must_do: "חובה",
    indoor: "צריך מזגן",
    no_height: "ללא מגבלת גובה",
    low_wait: "תור קצר יחסית",
    all_together: "מתאים לכולם",
    older_kids: "רק הגדולים",
    rain: "גשם",
  };

  return labels[need] || need;
}