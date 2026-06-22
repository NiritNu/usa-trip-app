import { attractions } from "../data/attractions";

export default function LightningLane() {
  const highPriority = attractions.filter(
    (item) =>
      item.resort === "Disney" &&
      item.category === "ride" &&
      (item.planningNeeded === "high_priority" ||
        item.planningNeeded === "lightning_lane_recommended")
  );

  return (
    <main>
      <h1>Lightning Lane</h1>

      <p>
        עמוד זה מרכז מתקנים שבהם כדאי לשקול Lightning Lane לפי פופולריות,
        זמן המתנה ממוצע בספטמבר ועדיפות משפחתית.
      </p>

      <h2>עדיפות גבוהה</h2>

      <div className="cards-list">
        {highPriority.map((item) => (
          <div className="card" key={item.id}>
            <h3>{item.name}</h3>
            <p>{item.park} · {item.area}</p>
            <p>
              המתנה ממוצעת בספטמבר: כ־{item.avgWaitSeptemberMin} דק׳
            </p>
            <p>{item.tip}</p>
          </div>
        ))}
      </div>

      {highPriority.length === 0 && <p>אין עדיין מתקנים בעדיפות גבוהה.</p>}
    </main>
  );
}