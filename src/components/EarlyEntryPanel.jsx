import { earlyEntryParks } from "../data/disney/earlyEntry.js";

export default function EarlyEntryPanel() {
  return (
    <section className="card early-entry-panel">
      <div className="card-header">
        <div>
          <h2>⏰ Early Theme Park Entry</h2>
          <p className="meta">
            מה מתוכנן להיות פתוח ב־30 הדקות המוקדמות לאורחי מלונות זכאים.
            הרשימה יכולה להשתנות, לכן לבדוק שוב באפליקציית Disney סמוך לתאריך.
          </p>
        </div>
      </div>

      <div className="early-entry-grid">
        {earlyEntryParks.map((park) => (
          <article key={park.id} className="early-entry-card">
            <h3>
              <span>{park.icon}</span>
              {park.name}
            </h3>

            <p>{park.note}</p>

            <ul>
              {park.attractions.map((attraction) => (
                <li key={attraction}>{attraction}</li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </section>
  );
}
