import { useEffect, useState } from "react";
import data from "../data/trip.json";

export default function Checklist() {
  const [checked, setChecked] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("trip-checklist") || "{}");
    } catch {
      return {};
    }
  });

  useEffect(() => {
    localStorage.setItem("trip-checklist", JSON.stringify(checked));
  }, [checked]);

  function toggleItem(item, isChecked) {
    setChecked((prev) => ({
      ...prev,
      [item]: isChecked,
    }));
  }

  const completedCount = data.checklist.filter((item) => checked[item]).length;
  const totalCount = data.checklist.length;

  return (
    <main className="page">
      <h1 className="page-title">צ׳ק ליסט</h1>

      <p className="page-description">
        רשימת דברים כללית לטיול. הסימונים נשמרים רק במכשיר הזה.
      </p>

      <section className="card">
        <div className="card-header">
          <h3>רשימת הכנה</h3>
          <span className="tag">
            {completedCount}/{totalCount}
          </span>
        </div>

        <div className="checklist">
          {data.checklist.map((item) => (
            <label
              key={item}
              className={`checklist-item ${checked[item] ? "checked" : ""}`}
            >
              <input
                type="checkbox"
                checked={!!checked[item]}
                onChange={(event) => toggleItem(item, event.target.checked)}
              />

              <span>{item}</span>
            </label>
          ))}
        </div>
      </section>
    </main>
  );
}