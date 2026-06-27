import { useEffect, useMemo, useState } from "react";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../firebase.js";

const PRIVATE_SCHEDULE_REF = ["tripData", "privateSchedule"];

export default function PrivateTrip() {
  const [data, setData] = useState(null);
  const [jsonText, setJsonText] = useState("");
  const [status, setStatus] = useState("loading");
  const [error, setError] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  const days = useMemo(() => {
    if (!data?.days || !Array.isArray(data.days)) return [];
    return data.days;
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

          <div className="private-days-list">
            {days.map((day) => (
              <section key={day.id || day.label} className="card private-day-card">
                <div className="card-header">
                  <div>
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
          placeholder='{"title": "לו״ז הטיול", "days": []}'
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

.private-days-list {
  display: grid;
  gap: 16px;
}

.private-day-card h2 {
  margin: 0 0 6px;
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
  background: #f8fafc;
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

  .private-block {
    grid-template-columns: 1fr;
  }

  .private-time {
    text-align: right;
  }
}
`;
