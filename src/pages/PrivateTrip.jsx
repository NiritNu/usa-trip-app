import { useEffect, useMemo, useState } from "react";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../firebase.js";

const PRIVATE_SCHEDULE_REF = ["tripData", "privateSchedule"];

const COUNTDOWN_ICONS = {
  trip: "✈️",
  dining: "🍽️",
  "lightning-lane": "⚡",
  hotel: "🏨",
  general: "⏳",
};

const DAY_TYPES = {
  all: {
    label: "הכול",
    icon: "✨",
  },
  newYork: {
    label: "ניו יורק",
    icon: "🗽",
  },
  disney: {
    label: "דיסני",
    icon: "🏰",
  },
  universal: {
    label: "יוניברסל",
    icon: "🎢",
  },
  travel: {
    label: "טיסות / מעברים",
    icon: "✈️",
  },
  rest: {
    label: "מנוחה / גמיש",
    icon: "😴",
  },
  other: {
    label: "אחר",
    icon: "📌",
  },
};

const FILTER_ORDER = ["all", "newYork", "disney", "universal", "travel", "rest", "other"];

export default function PrivateTrip() {
  const [data, setData] = useState(null);
  const [jsonText, setJsonText] = useState("");
  const [status, setStatus] = useState("loading");
  const [error, setError] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [activeFilter, setActiveFilter] = useState("all");

  const days = useMemo(() => {
    if (!data?.days || !Array.isArray(data.days)) return [];

    return data.days.map((day) => ({
      ...day,
      computedType: getDayType(day),
    }));
  }, [data]);

  const filteredDays = useMemo(() => {
    if (activeFilter === "all") return days;
    return days.filter((day) => day.computedType === activeFilter);
  }, [days, activeFilter]);

  const daySummary = useMemo(() => {
    const summary = {
      total: days.length,
      newYork: 0,
      disney: 0,
      universal: 0,
      travel: 0,
      rest: 0,
      other: 0,
    };

    for (const day of days) {
      if (summary[day.computedType] != null) {
        summary[day.computedType] += 1;
      } else {
        summary.other += 1;
      }
    }

    return summary;
  }, [days]);

  const countdowns = useMemo(() => {
    if (!data?.countdowns || !Array.isArray(data.countdowns)) return [];

    return data.countdowns
      .map((item) => {
        const targetDate = getCountdownTargetDate(item);
        return {
          ...item,
          targetDate,
          daysLeft: targetDate ? getDaysLeft(targetDate) : null,
        };
      })
      .filter((item) => item.targetDate)
      .sort((a, b) => a.targetDate.getTime() - b.targetDate.getTime());
  }, [data]);

  useEffect(() => {
    loadPrivateData();
  }, []);

  async function loadPrivateData() {
    setStatus("loading");
    setError("");

    try {
      const ref = doc(db, ...PRIVATE_SCHEDULE_REF);
      const snapshot = await getDoc(ref);

      if (!snapshot.exists()) {
        setData(null);
        setJsonText("");
        setStatus("missing");
        return;
      }

      const loadedData = snapshot.data();
      setData(loadedData);
      setJsonText(JSON.stringify(loadedData, null, 2));
      setStatus("ready");
    } catch (err) {
      console.error(err);
      setError("לא הצלחתי לקרוא את המידע הפרטי מ-Firestore");
      setStatus("error");
    }
  }

  async function saveJson() {
    setIsSaving(true);
    setError("");

    try {
      const parsed = JSON.parse(jsonText);

      if (!parsed || typeof parsed !== "object") {
        throw new Error("JSON must be an object");
      }

      const ref = doc(db, ...PRIVATE_SCHEDULE_REF);
      await setDoc(ref, parsed, { merge: false });

      setData(parsed);
      setJsonText(JSON.stringify(parsed, null, 2));
      setStatus("ready");
    } catch (err) {
      console.error(err);
      setError("ה־JSON לא תקין או שלא הצלחתי לשמור ל-Firestore");
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <main className="page">
      <style>{privateTripStyles}</style>

      <h1 className="page-title">🔐 לו״ז פרטי</h1>

      <p className="page-description">
        המידע בעמוד הזה נטען מ־Firestore אחרי התחברות, ולא נשמר בקוד של האתר.
      </p>

      {status === "loading" && (
        <section className="card playful-panel">
          <p>טוען לו״ז פרטי...</p>
        </section>
      )}

      {status === "error" && (
        <section className="card playful-panel">
          <h2>שגיאה</h2>
          <p>{error}</p>
          <button type="button" className="private-action-button" onClick={loadPrivateData}>
            נסי שוב
          </button>
        </section>
      )}

      {status === "missing" && (
        <section className="card playful-panel">
          <h2>עוד אין לו״ז פרטי</h2>
          <p>
            הדביקי JSON באזור העריכה למטה ולחצי שמירה. הוא יישמר ב־Firestore.
          </p>
        </section>
      )}

      {status === "ready" && (
        <>
          <section className="card private-summary-card">
            <div>
              <h2>{data?.title || "לו״ז הטיול"}</h2>
              {data?.subtitle && <p>{data.subtitle}</p>}
            </div>

            <span className="tag">{days.length} ימים</span>
          </section>

          {countdowns.length > 0 && (
            <section className="card private-countdowns-card">
              <div className="card-header">
                <div>
                  <h2>⏳ ספירות חשובות</h2>
                  <p className="meta">
                    הספירות מחושבות לפי המידע הפרטי ששמור ב־Firestore.
                  </p>
                </div>
              </div>

              <div className="countdown-grid">
                {countdowns.map((item) => (
                  <CountdownCard key={item.id || item.title} item={item} />
                ))}
              </div>
            </section>
          )}

          {days.length > 0 && (
            <section className="card trip-overview-card">
              <div className="card-header">
                <div>
                  <h2>📊 סיכום ימים</h2>
                  <p className="meta">חלוקה כללית של הטיול לפי סוג יום.</p>
                </div>
              </div>

              <div className="trip-summary-grid">
                <SummaryTile label="סה״כ" icon="🗓️" count={daySummary.total} type="all" />
                <SummaryTile label={DAY_TYPES.newYork.label} icon={DAY_TYPES.newYork.icon} count={daySummary.newYork} type="newYork" />
                <SummaryTile label={DAY_TYPES.disney.label} icon={DAY_TYPES.disney.icon} count={daySummary.disney} type="disney" />
                <SummaryTile label={DAY_TYPES.universal.label} icon={DAY_TYPES.universal.icon} count={daySummary.universal} type="universal" />
                <SummaryTile label={DAY_TYPES.travel.label} icon={DAY_TYPES.travel.icon} count={daySummary.travel} type="travel" />
                <SummaryTile label={DAY_TYPES.rest.label} icon={DAY_TYPES.rest.icon} count={daySummary.rest} type="rest" />
              </div>
            </section>
          )}

          {days.length > 0 && (
            <section className="card trip-filter-card">
              <div className="card-header">
                <div>
                  <h2>🔎 סינון לו״ז</h2>
                  <p className="meta">
                    מוצגים כרגע {filteredDays.length} מתוך {days.length} ימים.
                  </p>
                </div>
              </div>

              <div className="private-filter-buttons">
                {FILTER_ORDER.map((filterKey) => {
                  const filter = DAY_TYPES[filterKey];
                  const isActive = activeFilter === filterKey;

                  return (
                    <button
                      key={filterKey}
                      type="button"
                      className={`private-filter-button ${isActive ? "active" : ""}`}
                      onClick={() => setActiveFilter(filterKey)}
                    >
                      <span>{filter.icon}</span>
                      {filter.label}
                    </button>
                  );
                })}
              </div>
            </section>
          )}

          <div className="private-days-list">
            {filteredDays.map((day) => (
              <section
                key={day.id || day.label}
                className={`card private-day-card day-type-${day.computedType}`}
              >
                <div className="card-header">
                  <div>
                    <div className="private-day-type">
                      <span>{DAY_TYPES[day.computedType]?.icon || DAY_TYPES.other.icon}</span>
                      {DAY_TYPES[day.computedType]?.label || DAY_TYPES.other.label}
                    </div>

                    <h2>
                      {day.label} — {day.title}
                    </h2>

                    <p className="meta">{day.location}</p>
                  </div>

                  {day.status && <span className="tag">{day.status}</span>}
                </div>

                {day.notes && <p className="private-day-notes">{day.notes}</p>}

                {Array.isArray(day.blocks) && day.blocks.length > 0 && (
                  <div className="private-blocks">
                    {day.blocks.map((block, index) => (
                      <div key={`${day.id}-${index}`} className="private-block">
                        <span className="private-time">{block.time || "כללי"}</span>
                        <div>
                          <strong>{block.title}</strong>
                          {block.note && <p>{block.note}</p>}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </section>
            ))}
          </div>
        </>
      )}

      <section className="card private-editor-card">
        <div className="card-header">
          <div>
            <h2>✏️ עריכת לו״ז פרטי</h2>
            <p className="meta">
              מדביקים כאן JSON ושומרים. התוכן נשמר ב־Firestore בלבד.
            </p>
          </div>
        </div>

        <textarea
          value={jsonText}
          onChange={(event) => setJsonText(event.target.value)}
          className="private-json-editor"
          placeholder='{"title": "לו״ז הטיול", "days": [], "countdowns": []}'
          dir="ltr"
        />

        {error && <div className="password-error">{error}</div>}

        <div className="private-actions">
          <button
            type="button"
            className="private-action-button"
            onClick={saveJson}
            disabled={isSaving}
          >
            {isSaving ? "שומר..." : "שמירה ל-Firestore"}
          </button>

          <button
            type="button"
            className="private-secondary-button"
            onClick={loadPrivateData}
          >
            טעינה מחדש
          </button>
        </div>

        <p className="meta">
          לא להדביק כאן מספרי דרכונים, כרטיסי אשראי או מסמכים סרוקים.
        </p>
      </section>
    </main>
  );
}

function CountdownCard({ item }) {
  const icon = COUNTDOWN_ICONS[item.type] || COUNTDOWN_ICONS.general;
  const status = getCountdownStatus(item.daysLeft);
  const targetDateText = formatDate(item.targetDate);

  return (
    <article className={`countdown-card countdown-${status.kind}`}>
      <div className="countdown-icon">{icon}</div>

      <div className="countdown-content">
        <h3>{item.title || "ספירה"}</h3>

        {item.subtitle && <p className="countdown-subtitle">{item.subtitle}</p>}

        <div className="countdown-main">{status.text}</div>

        <div className="countdown-date">
          תאריך יעד: <strong>{targetDateText}</strong>
        </div>

        {item.baseDate && item.daysBefore != null && (
          <div className="countdown-rule">
            מחושב לפי {item.daysBefore} ימים לפני תאריך הבסיס
          </div>
        )}
      </div>
    </article>
  );
}

function SummaryTile({ label, icon, count, type }) {
  return (
    <div className={`summary-tile summary-${type}`}>
      <div className="summary-icon">{icon}</div>
      <div>
        <strong>{count}</strong>
        <span>{label}</span>
      </div>
    </div>
  );
}

function getDayType(day) {
  if (day.type && DAY_TYPES[day.type]) return day.type;

  const text = [
    day.location,
    day.title,
    day.status,
    day.notes,
    ...(Array.isArray(day.blocks)
      ? day.blocks.flatMap((block) => [block.title, block.note, block.time])
      : []),
  ]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();

  if (text.includes("new york") || text.includes("ניו יורק")) return "newYork";
  if (text.includes("disney") || text.includes("דיסני") || text.includes("epcot") || text.includes("magic kingdom")) return "disney";
  if (text.includes("universal") || text.includes("יוניברסל") || text.includes("epic")) return "universal";
  if (text.includes("טיסה") || text.includes("flight") || text.includes("מעבר") || text.includes("צ׳ק אין") || text.includes("check in")) return "travel";
  if (text.includes("מנוחה") || text.includes("גמיש") || text.includes("rest")) return "rest";

  return "other";
}

function getCountdownTargetDate(item) {
  if (item.targetDate) {
    return parseLocalDate(item.targetDate);
  }

  if (item.baseDate && item.daysBefore != null) {
    const baseDate = parseLocalDate(item.baseDate);
    if (!baseDate) return null;

    const target = new Date(baseDate);
    target.setDate(target.getDate() - Number(item.daysBefore));
    return target;
  }

  return null;
}

function parseLocalDate(value) {
  if (!value || typeof value !== "string") return null;

  const parts = value.split("-").map(Number);
  if (parts.length !== 3) return null;

  const [year, month, day] = parts;
  if (!year || !month || !day) return null;

  return new Date(year, month - 1, day);
}

function getTodayLocal() {
  const now = new Date();
  return new Date(now.getFullYear(), now.getMonth(), now.getDate());
}

function getDaysLeft(targetDate) {
  const today = getTodayLocal();
  const cleanTarget = new Date(
    targetDate.getFullYear(),
    targetDate.getMonth(),
    targetDate.getDate()
  );

  const diffMs = cleanTarget.getTime() - today.getTime();
  return Math.round(diffMs / (1000 * 60 * 60 * 24));
}

function getCountdownStatus(daysLeft) {
  if (daysLeft == null) {
    return { kind: "unknown", text: "אין תאריך תקין" };
  }

  if (daysLeft > 1) {
    return { kind: "future", text: `עוד ${daysLeft} ימים` };
  }

  if (daysLeft === 1) {
    return { kind: "soon", text: "מחר" };
  }

  if (daysLeft === 0) {
    return { kind: "today", text: "היום!" };
  }

  return { kind: "past", text: "כבר פתוח / עבר" };
}

function formatDate(date) {
  return new Intl.DateTimeFormat("he-IL", {
    day: "numeric",
    month: "numeric",
    year: "numeric",
  }).format(date);
}

const privateTripStyles = `
.private-summary-card {
  display: flex;
  justify-content: space-between;
  gap: 16px;
  align-items: center;
  background:
    radial-gradient(circle at top right, rgba(59, 130, 246, 0.24), transparent 30%),
    rgba(255, 255, 255, 0.97);
}

.private-summary-card h2 {
  margin: 0 0 6px;
}

.private-summary-card p {
  margin: 0;
  color: #64748b;
}

.private-countdowns-card {
  border-color: #fde68a;
  background:
    radial-gradient(circle at top left, rgba(250, 204, 21, 0.2), transparent 28%),
    rgba(255, 255, 255, 0.98);
}

.countdown-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(230px, 1fr));
  gap: 12px;
  margin-top: 14px;
}

.countdown-card {
  display: grid;
  grid-template-columns: 44px 1fr;
  gap: 12px;
  padding: 14px;
  border-radius: 18px;
  border: 1px solid #e2e8f0;
  background: #ffffff;
}

.countdown-icon {
  width: 44px;
  height: 44px;
  display: grid;
  place-items: center;
  border-radius: 16px;
  background: #f8fafc;
  font-size: 1.35rem;
}

.countdown-content h3 {
  margin: 0 0 4px;
  color: #0f172a;
  font-size: 1rem;
}

.countdown-subtitle {
  margin: 0 0 8px;
  color: #64748b;
  font-size: 0.9rem;
}

.countdown-main {
  margin: 8px 0;
  font-size: 1.35rem;
  font-weight: 900;
  color: #2563eb;
}

.countdown-date,
.countdown-rule {
  color: #64748b;
  font-size: 0.85rem;
  line-height: 1.4;
}

.countdown-today {
  border-color: #22c55e;
  background: #f0fdf4;
}

.countdown-today .countdown-main {
  color: #15803d;
}

.countdown-soon {
  border-color: #f97316;
  background: #fff7ed;
}

.countdown-soon .countdown-main {
  color: #c2410c;
}

.countdown-past {
  opacity: 0.72;
}

.trip-overview-card {
  border-color: #bfdbfe;
  background:
    radial-gradient(circle at bottom right, rgba(59, 130, 246, 0.16), transparent 28%),
    rgba(255, 255, 255, 0.98);
}

.trip-summary-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(135px, 1fr));
  gap: 10px;
  margin-top: 14px;
}

.summary-tile {
  display: flex;
  gap: 10px;
  align-items: center;
  padding: 12px;
  border-radius: 18px;
  border: 1px solid #e2e8f0;
  background: white;
}

.summary-icon {
  width: 40px;
  height: 40px;
  display: grid;
  place-items: center;
  border-radius: 14px;
  background: #f8fafc;
  font-size: 1.25rem;
}

.summary-tile strong {
  display: block;
  font-size: 1.45rem;
  line-height: 1;
  color: #0f172a;
}

.summary-tile span {
  display: block;
  margin-top: 4px;
  color: #64748b;
  font-size: 0.85rem;
}

.trip-filter-card {
  border-color: #e2e8f0;
}

.private-filter-buttons {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 14px;
}

.private-filter-button {
  border: 1px solid #cbd5e1;
  background: white;
  color: #475569;
  border-radius: 999px;
  padding: 9px 13px;
  font-family: inherit;
  font-weight: 800;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 7px;
}

.private-filter-button.active {
  background: #0f172a;
  color: white;
  border-color: #0f172a;
}

.private-days-list {
  display: grid;
  gap: 16px;
}

.private-day-card {
  overflow: hidden;
  border-right-width: 8px;
}

.private-day-card h2 {
  margin: 0 0 6px;
}

.private-day-type {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  width: fit-content;
  margin-bottom: 8px;
  padding: 5px 10px;
  border-radius: 999px;
  background: #f8fafc;
  color: #475569;
  font-weight: 800;
  font-size: 0.82rem;
}

.day-type-newYork {
  border-right-color: #38bdf8;
  background:
    radial-gradient(circle at top left, rgba(56, 189, 248, 0.18), transparent 25%),
    rgba(255, 255, 255, 0.98);
}

.day-type-disney {
  border-right-color: #a855f7;
  background:
    radial-gradient(circle at top left, rgba(168, 85, 247, 0.18), transparent 25%),
    rgba(255, 255, 255, 0.98);
}

.day-type-universal {
  border-right-color: #f97316;
  background:
    radial-gradient(circle at top left, rgba(249, 115, 22, 0.18), transparent 25%),
    rgba(255, 255, 255, 0.98);
}

.day-type-travel {
  border-right-color: #2563eb;
  background:
    radial-gradient(circle at top left, rgba(37, 99, 235, 0.16), transparent 25%),
    rgba(255, 255, 255, 0.98);
}

.day-type-rest {
  border-right-color: #22c55e;
  background:
    radial-gradient(circle at top left, rgba(34, 197, 94, 0.15), transparent 25%),
    rgba(255, 255, 255, 0.98);
}

.day-type-other {
  border-right-color: #94a3b8;
}

.private-day-notes {
  margin: 12px 0;
  color: #475569;
  line-height: 1.55;
}

.private-blocks {
  display: grid;
  gap: 10px;
  margin-top: 12px;
}

.private-block {
  display: grid;
  grid-template-columns: 110px 1fr;
  gap: 12px;
  padding: 12px;
  border-radius: 16px;
  background: rgba(248, 250, 252, 0.88);
  border: 1px solid #e2e8f0;
}

.private-time {
  color: #2563eb;
  font-weight: 800;
  direction: ltr;
  text-align: left;
}

.private-block strong {
  color: #0f172a;
}

.private-block p {
  margin: 4px 0 0;
  color: #64748b;
  line-height: 1.45;
}

.private-editor-card {
  border-color: #c4b5fd;
  background:
    radial-gradient(circle at bottom left, rgba(196, 181, 253, 0.32), transparent 32%),
    rgba(255, 255, 255, 0.97);
}

.private-json-editor {
  width: 100%;
  min-height: 320px;
  margin-top: 12px;
  border: 1px solid #cbd5e1;
  border-radius: 18px;
  padding: 14px;
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", monospace;
  font-size: 0.9rem;
  line-height: 1.5;
  resize: vertical;
  outline: none;
  background: #0f172a;
  color: #e5e7eb;
}

.private-json-editor:focus {
  border-color: #7c3aed;
  box-shadow: 0 0 0 3px rgba(124, 58, 237, 0.16);
}

.private-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 12px;
}

.private-action-button,
.private-secondary-button {
  border: 0;
  border-radius: 999px;
  padding: 10px 14px;
  font-family: inherit;
  font-weight: 800;
  cursor: pointer;
}

.private-action-button {
  color: white;
  background: linear-gradient(135deg, #2563eb 0%, #7c3aed 100%);
}

.private-action-button:disabled {
  opacity: 0.65;
  cursor: not-allowed;
}

.private-secondary-button {
  color: #475569;
  background: white;
  border: 1px solid #cbd5e1;
}

@media (max-width: 640px) {
  .private-summary-card {
    display: grid;
  }

  .trip-summary-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .private-filter-buttons {
    overflow-x: auto;
    flex-wrap: nowrap;
    padding-bottom: 4px;
  }

  .private-filter-button {
    white-space: nowrap;
  }

  .private-block {
    grid-template-columns: 1fr;
  }

  .private-time {
    text-align: right;
  }
}
`;
