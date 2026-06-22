import data from "../data/trip.json";

export default function Schedule() {
  return (
    <main className="page">
      <h1 className="page-title">לו״ז יומי</h1>

      <p className="page-description">
        תכנון כללי לפי ימי טיול. בגרסה הציבורית אין כאן תאריכים, טיסות או פרטים מזהים.
      </p>

      <div className="cards-list">
        {data.schedule.map((day, i) => (
          <section className="card" key={i}>
            <div className="card-header">
              <h3>
                {day.date} — {day.title}
              </h3>

              {day.area && <span className="tag">{day.area}</span>}
            </div>

            <p>{day.notes}</p>
          </section>
        ))}
      </div>

      {data.schedule.length === 0 && (
        <div className="empty-state">
          עדיין אין ימי טיול להצגה.
        </div>
      )}
    </main>
  );
}