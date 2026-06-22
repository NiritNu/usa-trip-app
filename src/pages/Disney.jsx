import { useState } from "react";
import { attractions } from "../data/attractions";
import AttractionCard from "../components/AttractionCard";
import FilterBar from "../components/FilterBar";

const disneyParks = [
  "Magic Kingdom",
  "EPCOT",
  "Hollywood Studios",
  "Animal Kingdom",
];

export default function Disney() {
  const [selectedPark, setSelectedPark] = useState("Magic Kingdom");
  const [activeFilter, setActiveFilter] = useState("all");

  const filteredAttractions = attractions
    .filter((item) => item.resort === "Disney")
    .filter((item) => item.park === selectedPark)
    .filter((item) => matchesFilter(item, activeFilter));

  return (
    <main className="page">
      <h1 className="page-title">Disney</h1>

      <p className="page-description">
        מאגר אטרקציות לפי פארק, כולל מתקנים, הופעות, דמויות, חוויות, אוכל,
        גובה מינימלי בס״מ, זמן המתנה ממוצע בספטמבר וטיפים לתכנון.
      </p>

      <div className="tabs-row">
        {disneyParks.map((park) => (
          <button
            key={park}
            type="button"
            className={selectedPark === park ? "active" : ""}
            onClick={() => setSelectedPark(park)}
          >
            {park}
          </button>
        ))}
      </div>

      <FilterBar
        activeFilter={activeFilter}
        setActiveFilter={setActiveFilter}
      />

      <div className="cards-list">
        {filteredAttractions.map((attraction) => (
          <AttractionCard key={attraction.id} attraction={attraction} />
        ))}
      </div>

      {filteredAttractions.length === 0 && (
        <div className="empty-state">
          אין עדיין פריטים בקטגוריה הזאת.
        </div>
      )}
    </main>
  );
}

function matchesFilter(item, filter) {
  if (filter === "all") return true;

  if (["ride", "show", "character", "dining", "experience"].includes(filter)) {
    return item.category === filter;
  }

  if (filter === "must_do") return item.priority === "must_do";
  if (filter === "no_height") return item.minHeightCm == null;
  if (filter === "rain") return item.rainFriendly === true;
  if (filter === "low_wait") return item.avgWaitSeptemberMin != null && item.avgWaitSeptemberMin <= 25;

  return true;
}