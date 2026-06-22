import { useState } from "react";
import { nycAttractions } from "../data/nycAttractions";
import AttractionCard from "../components/AttractionCard";

export default function NewYork() {
  const [activeFilter, setActiveFilter] = useState("all");

  const filtered = nycAttractions.filter((item) => {
    if (activeFilter === "all") return true;
    if (activeFilter === "rain") return item.rainyDay;
    if (activeFilter === "must_do") return item.priority === "must_do";
    if (activeFilter === "low_energy") return item.energyLevel === "low";
    return item.category === activeFilter;
  });

  return (
    <main>
      <h1>New York</h1>
      <p>
        אטרקציות מרכזיות שמתאימות למשפחה עם ילדים, מחולקות לפי סוג,
        התאמה ליום גשום, משך מומלץ ורמת מאמץ.
      </p>

      <div className="filter-bar">
        <button className={activeFilter === "all" ? "active" : ""} onClick={() => setActiveFilter("all")}>
          הכול
        </button>
        <button className={activeFilter === "museum" ? "active" : ""} onClick={() => setActiveFilter("museum")}>
          מוזיאונים
        </button>
        <button className={activeFilter === "park" ? "active" : ""} onClick={() => setActiveFilter("park")}>
          פארקים
        </button>
        <button className={activeFilter === "store" ? "active" : ""} onClick={() => setActiveFilter("store")}>
          חנויות לילדים
        </button>
        <button className={activeFilter === "rain" ? "active" : ""} onClick={() => setActiveFilter("rain")}>
          יום גשום
        </button>
        <button className={activeFilter === "must_do" ? "active" : ""} onClick={() => setActiveFilter("must_do")}>
          חובה
        </button>
        <button className={activeFilter === "low_energy" ? "active" : ""} onClick={() => setActiveFilter("low_energy")}>
          קליל
        </button>
      </div>

      <div className="cards-list">
        {filtered.map((item) => (
          <AttractionCard key={item.id} attraction={item} />
        ))}
      </div>
    </main>
  );
}