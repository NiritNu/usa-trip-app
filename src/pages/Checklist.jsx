import { useEffect, useMemo, useState } from "react";

const STORAGE_KEY = "usa-trip-checklist-v1";

const checklistGroups = [
  {
    id: "documents",
    title: "🛂 מסמכים",
    description: "דברים שחייבים להיות מוכנים לפני היציאה.",
    items: [
      {
        id: "passports",
        title: "דרכונים בתוקף",
        note: "לבדוק תוקף לכל בני המשפחה.",
        priority: "high",
      },
      {
        id: "esta",
        title: "ESTA / אישורי כניסה",
        note: "לשמור עותק דיגיטלי ונגיש.",
        priority: "high",
      },
      {
        id: "travel-insurance",
        title: "ביטוח נסיעות",
        note: "כולל כיסוי רפואי, ביטולים וכבודה.",
        priority: "high",
      },
      {
        id: "driving-license",
        title: "רישיון נהיגה / רישיון בינלאומי אם צריך",
        note: "רלוונטי אם מתכננים לשכור רכב.",
        priority: "medium",
      },
      {
        id: "copies",
        title: "עותקים דיגיטליים למסמכים",
        note: "דרכונים, ביטוח, אישורי כניסה, הזמנות כלליות.",
        priority: "high",
      },
    ],
  },
  {
    id: "money",
    title: "💳 כסף ותשלומים",
    description: "כרטיסים, מזומן וגיבוי.",
    items: [
      {
        id: "credit-cards",
        title: "כרטיסי אשראי פעילים לחו״ל",
        note: "לוודא מסגרת, קוד סודי והתראות באפליקציה.",
        priority: "high",
      },
      {
        id: "cash",
        title: "מעט מזומן בדולרים",
        note: "לא צריך הרבה, אבל נוח לטיפים/מקרי קצה.",
        priority: "medium",
      },
      {
        id: "apple-google-pay",
        title: "Apple Pay / Google Pay",
        note: "לוודא שעובד בטלפון של שני ההורים.",
        priority: "medium",
      },
      {
        id: "bank-notification",
        title: "בדיקת עמלות ושימוש בחו״ל",
        note: "לדעת איזה כרטיס עדיף לשימוש יומיומי.",
        priority: "low",
      },
    ],
  },
  {
    id: "phones",
    title: "📱 טלפונים ואינטרנט",
    description: "כדי שהאפליקציה, מפות והודעות יעבדו בזמן אמת.",
    items: [
      {
        id: "esim",
        title: "eSIM / חבילת גלישה",
        note: "לבדוק מראש איך מפעילים ביום הטיסה.",
        priority: "high",
      },
      {
        id: "chargers",
        title: "מטענים לכל המכשירים",
        note: "טלפונים, שעונים, טאבלטים, אוזניות.",
        priority: "high",
      },
      {
        id: "power-bank",
        title: "סוללת גיבוי",
        note: "חשוב במיוחד לימים בפארקים.",
        priority: "high",
      },
      {
        id: "adapters",
        title: "מתאמים לחשמל אמריקאי",
        note: "להביא כמה, לא אחד.",
        priority: "high",
      },
      {
        id: "offline-maps",
        title: "מפות / מידע חשוב זמין גם בלי קליטה",
        note: "לשמור דברים קריטיים בטלפון.",
        priority: "medium",
      },
    ],
  },
  {
    id: "flights",
    title: "✈️ טיסה ושדה",
    description: "דברים ליום הנסיעה.",
    items: [
      {
        id: "check-in",
        title: "צ׳ק אין לטיסות",
        note: "לוודא מושבים, כבודה ושעות.",
        priority: "high",
      },
      {
        id: "bags-weight",
        title: "משקל ומספר מזוודות",
        note: "לבדוק מגבלות כבודה לפני שיוצאים לשדה.",
        priority: "high",
      },
      {
        id: "kids-flight-bag",
        title: "תיק טיסה לילדים",
        note: "אוזניות, נשנושים, בגדים להחלפה, משחקים קטנים.",
        priority: "high",
      },
      {
        id: "meds-flight",
        title: "תרופות בתיק יד",
        note: "לא לשים תרופות חשובות רק במזוודה.",
        priority: "high",
      },
      {
        id: "empty-bottles",
        title: "בקבוקי מים ריקים לשדה",
        note: "למלא אחרי הביטחון.",
        priority: "medium",
      },
    ],
  },
  {
    id: "medicines",
    title: "💊 תרופות",
    description: "תרופות וציוד רפואי שכדאי שיהיו בתיק יד ונגישים.",
    items: [
      {
        id: "regular-meds",
        title: "תרופות קבועות",
        note: "לארוז כמות מספיקה לכל הטיול ועוד כמה ימים ספייר.",
        priority: "high",
      },
      {
        id: "normlax",
        title: "נורמלקס",
        note: "לארוז באריזה נוחה ולוודא שיש כמות מספיקה.",
        priority: "high",
      },
      {
        id: "epipen",
        title: "אפיפן",
        note: "לשמור בתיק יד ונגיש, לא רק במזוודה.",
        priority: "high",
      },
      {
        id: "inhalers",
        title: "משאפים",
        note: "לשמור בתיק יד. לבדוק שיש מספיק ושלא פג תוקף.",
        priority: "high",
      },
      {
        id: "vulvar-irritation-treatment",
        title: "טיפול נגד דלקת / גירוי בפות",
        note: "לארוז רק מה שמוכר לכם ומאושר לשימוש. לשמור באריזה המקורית.",
        priority: "high",
      },
      {
        id: "worms-treatment",
        title: "טיפול נגד תולעים",
        note: "לארוז לפי הצורך ולשמור באריזה המקורית עם הוראות שימוש.",
        priority: "medium",
      },
      {
        id: "kids-pain-fever",
        title: "אקמול / נורופן לילדים",
        note: "כולל מזרק/כוסית מדידה אם צריך.",
        priority: "high",
      },
      {
        id: "adult-pain-fever",
        title: "משכך כאבים / מוריד חום למבוגרים",
        note: "לימים של כאב ראש, חום או עייפות.",
        priority: "medium",
      },
      {
        id: "stomach-meds",
        title: "תרופות לבטן",
        note: "לפי מה שאתם רגילים להשתמש בו בבית.",
        priority: "medium",
      },
      {
        id: "bandages-disinfectant",
        title: "פלסטרים וחיטוי",
        note: "לחתכים קטנים, שפשופים ושלפוחיות.",
        priority: "medium",
      },
      {
        id: "prescriptions-docs",
        title: "מרשמים / אישורים רפואיים אם צריך",
        note: "בעיקר לתרופות חשובות או ציוד רפואי מיוחד.",
        priority: "medium",
      },
      {
        id: "medicine-in-hand-luggage",
        title: "תרופות חשובות בתיק יד",
        note: "לא לשים תרופות קריטיות רק במזוודה שנשלחת לבטן המטוס.",
        priority: "high",
      },
    ],
  },

  {
    id: "packing",
    title: "🧳 אריזה",
    description: "ציוד בסיסי לטיול עירוני + פארקים.",
    items: [
      {
        id: "comfortable-shoes",
        title: "נעליים נוחות להליכה",
        note: "עדיף זוג שכבר נבדק ולא חדש לגמרי.",
        priority: "high",
      },
      {
        id: "rain-gear",
        title: "מעילי גשם / פונצ׳ואים",
        note: "שימושי במיוחד באורלנדו.",
        priority: "medium",
      },
      {
        id: "hats",
        title: "כובעים",
        note: "לימים חמים וארוכים.",
        priority: "high",
      },
      {
        id: "sunscreen",
        title: "קרם הגנה",
        note: "גם בעיר וגם בפארקים.",
        priority: "high",
      },
      {
        id: "swimwear",
        title: "בגדי ים",
        note: "למלון, בריכה או פארקי מים.",
        priority: "medium",
      },
      {
        id: "laundry-bag",
        title: "שקיות לכביסה / בגדים רטובים",
        note: "מאוד שימושי בטיול משפחתי.",
        priority: "medium",
      },
    ],
  },
  {
    id: "parks",
    title: "🏰 פארקים",
    description: "דברים שיעזרו בדיסני ויוניברסל.",
    items: [
      {
        id: "park-tickets",
        title: "כרטיסי פארקים באפליקציות",
        note: "לוודא שהכרטיסים מופיעים אצל שני ההורים.",
        priority: "high",
      },
      {
        id: "apps-installed",
        title: "אפליקציות Disney / Universal מותקנות",
        note: "כולל התחברות מראש.",
        priority: "high",
      },
      {
        id: "magicbands",
        title: "MagicBand / אמצעי כניסה אם יש",
        note: "לטעון/לבדוק לפני הפארק.",
        priority: "medium",
      },
      {
        id: "express-lightning",
        title: "Express / Lightning Lane",
        note: "להבין מראש מה כלול ומה צריך לקנות/להזמין.",
        priority: "high",
      },
      {
        id: "print-epic-express-pass",
        title: "להדפיס את קיצור התורים של Universal Epic",
        note: "להביא עותק פיזי מודפס של ה-Epic Express Pass, בנוסף לעותק בטלפון.",
        priority: "high",
      },
      {
        id: "small-park-bag",
        title: "תיק קטן לפארקים",
        note: "מים, נשנושים, מטען, קרם הגנה, פונצ׳ו.",
        priority: "high",
      },
      {
        id: "stroller-plan",
        title: "תוכנית לעגלה / מנוחה לילדה",
        note: "גם אם לא תמיד משתמשים — כדאי לדעת מה עושים ביום ארוך.",
        priority: "medium",
      },
    ],
  },
  {
    id: "kids",
    title: "👧 ילדים",
    description: "דברים קטנים שמונעים קריסות גדולות.",
    items: [
      {
        id: "snacks",
        title: "נשנושים מוכרים",
        note: "לטיסה, תורים וימים ארוכים.",
        priority: "high",
      },
      {
        id: "headphones",
        title: "אוזניות לילדים",
        note: "לטיסה ולנסיעות.",
        priority: "high",
      },
      {
        id: "change-clothes",
        title: "בגדים להחלפה בתיק יד",
        note: "לפחות סט אחד לילדים.",
        priority: "high",
      },
      {
        id: "comfort-items",
        title: "חפץ מרגיע / בובה / שמיכה קטנה",
        note: "במיוחד לילדה הקטנה.",
        priority: "medium",
      },
      {
        id: "id-bracelets",
        title: "פתק/צמיד עם טלפון הורה",
        note: "לא חובה, אבל מאוד מרגיע במקומות עמוסים.",
        priority: "medium",
      },
    ],
  },
  {
    id: "home",
    title: "🏠 לפני שיוצאים מהבית",
    description: "דברים של הרגע האחרון.",
    items: [
      {
        id: "trash",
        title: "לזרוק זבל",
        note: "כולל מקרר אם צריך.",
        priority: "medium",
      },
      {
        id: "fridge",
        title: "לבדוק מקרר",
        note: "להוציא דברים שיתקלקלו.",
        priority: "medium",
      },
      {
        id: "electricity",
        title: "מטענים/מכשירים מיותרים מהחשמל",
        note: "בדיקה כללית לפני יציאה.",
        priority: "medium",
      },
      {
        id: "windows",
        title: "חלונות ודלתות",
        note: "בדיקה אחרונה.",
        priority: "high",
      },
      {
        id: "keys",
        title: "מפתחות / סידור למי שנכנס לבית",
        note: "לפי הצורך.",
        priority: "medium",
      },
    ],
  },
];

export default function Checklist() {
  const [checkedItems, setCheckedItems] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  const [activeGroupId, setActiveGroupId] = useState("all");

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(checkedItems));
  }, [checkedItems]);

  const allItems = checklistGroups.flatMap((group) =>
    group.items.map((item) => ({ ...item, groupId: group.id }))
  );

  const totalCount = allItems.length;
  const doneCount = allItems.filter((item) => checkedItems[item.id]).length;
  const percentDone = totalCount === 0 ? 0 : Math.round((doneCount / totalCount) * 100);

  const visibleGroups = useMemo(() => {
    if (activeGroupId === "all") return checklistGroups;
    return checklistGroups.filter((group) => group.id === activeGroupId);
  }, [activeGroupId]);

  function toggleItem(itemId) {
    setCheckedItems((current) => ({
      ...current,
      [itemId]: !current[itemId],
    }));
  }

  function clearChecklist() {
    const approved = window.confirm("לאפס את כל סימוני הצ׳ק ליסט?");
    if (!approved) return;
    setCheckedItems({});
  }

  return (
    <main className="page">
      <style>{checklistStyles}</style>

      <h1 className="page-title">🧳 צ׳ק ליסט</h1>

      <p className="page-description">
        רשימת בדיקה משפחתית לטיול. הסימונים נשמרים רק בדפדפן הזה.
      </p>

      <section className="card checklist-hero">
        <div>
          <h2>התקדמות</h2>
          <p>
            סומנו {doneCount} מתוך {totalCount} פריטים
          </p>
        </div>

        <div className="progress-circle">
          <strong>{percentDone}%</strong>
          <span>בוצע</span>
        </div>

        <div className="progress-bar">
          <div style={{ width: `${percentDone}%` }} />
        </div>

        <button type="button" className="reset-button" onClick={clearChecklist}>
          איפוס סימונים
        </button>
      </section>

      <section className="card playful-panel">
        <h3>📌 קטגוריות</h3>

        <div className="tabs-row">
          <button
            type="button"
            className={activeGroupId === "all" ? "active" : ""}
            onClick={() => setActiveGroupId("all")}
          >
            ✨ הכול
          </button>

          {checklistGroups.map((group) => (
            <button
              key={group.id}
              type="button"
              className={activeGroupId === group.id ? "active" : ""}
              onClick={() => setActiveGroupId(group.id)}
            >
              {group.title}
            </button>
          ))}
        </div>
      </section>

      <div className="checklist-groups">
        {visibleGroups.map((group) => {
          const groupDoneCount = group.items.filter((item) => checkedItems[item.id]).length;

          return (
            <section key={group.id} className="card checklist-group-card">
              <div className="card-header">
                <div>
                  <h2>{group.title}</h2>
                  <p className="meta">{group.description}</p>
                </div>

                <span className="tag">
                  {groupDoneCount}/{group.items.length}
                </span>
              </div>

              <div className="checklist-items">
                {group.items.map((item) => {
                  const isChecked = Boolean(checkedItems[item.id]);

                  return (
                    <button
                      key={item.id}
                      type="button"
                      className={`check-item ${isChecked ? "done" : ""}`}
                      onClick={() => toggleItem(item.id)}
                    >
                      <span className="check-box">
                        {isChecked ? "✅" : "⬜"}
                      </span>

                      <span className="check-content">
                        <strong>{item.title}</strong>
                        <small>{item.note}</small>
                      </span>

                      <span className={`priority-badge ${item.priority}`}>
                        {priorityLabel(item.priority)}
                      </span>
                    </button>
                  );
                })}
              </div>
            </section>
          );
        })}
      </div>
    </main>
  );
}

function priorityLabel(priority) {
  if (priority === "high") return "חשוב";
  if (priority === "medium") return "כדאי";
  return "נחמד";
}

const checklistStyles = `
.checklist-hero {
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 16px;
  align-items: center;
  background:
    radial-gradient(circle at top right, rgba(251, 191, 36, 0.35), transparent 32%),
    linear-gradient(135deg, rgba(255, 255, 255, 0.96), rgba(239, 246, 255, 0.96));
  border-color: #fde68a;
}

.checklist-hero h2 {
  margin: 0 0 6px;
}

.checklist-hero p {
  margin: 0;
  color: #64748b;
}

.progress-circle {
  width: 86px;
  height: 86px;
  border-radius: 999px;
  background: white;
  border: 2px solid #facc15;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  box-shadow: 0 12px 24px rgba(15, 23, 42, 0.08);
}

.progress-circle strong {
  font-size: 1.35rem;
  color: #0f172a;
}

.progress-circle span {
  font-size: 0.78rem;
  color: #64748b;
}

.progress-bar {
  grid-column: 1 / -1;
  height: 12px;
  border-radius: 999px;
  background: #e2e8f0;
  overflow: hidden;
}

.progress-bar div {
  height: 100%;
  border-radius: 999px;
  background: linear-gradient(90deg, #22c55e, #84cc16, #facc15);
  transition: width 0.2s ease;
}

.reset-button {
  grid-column: 1 / -1;
  justify-self: start;
  border: 1px solid #cbd5e1;
  background: white;
  border-radius: 999px;
  padding: 8px 14px;
  font-family: inherit;
  cursor: pointer;
  color: #475569;
}

.checklist-groups {
  display: grid;
  gap: 18px;
}

.checklist-group-card h2 {
  margin: 0 0 6px;
}

.checklist-items {
  display: grid;
  gap: 10px;
  margin-top: 14px;
}

.check-item {
  display: grid;
  grid-template-columns: auto 1fr auto;
  gap: 12px;
  align-items: center;
  width: 100%;
  text-align: right;
  border: 1px solid #e2e8f0;
  background: rgba(255, 255, 255, 0.96);
  border-radius: 18px;
  padding: 13px;
  cursor: pointer;
  font-family: inherit;
  box-shadow: 0 8px 18px rgba(15, 23, 42, 0.04);
  transition: transform 0.15s ease, border-color 0.15s ease, background 0.15s ease;
}

.check-item:hover {
  transform: translateY(-1px);
  border-color: #93c5fd;
}

.check-item.done {
  background: #f0fdf4;
  border-color: #86efac;
}

.check-box {
  font-size: 1.25rem;
}

.check-content {
  display: grid;
  gap: 4px;
}

.check-content strong {
  color: #0f172a;
  font-size: 0.98rem;
}

.check-content small {
  color: #64748b;
  line-height: 1.45;
}

.check-item.done .check-content strong {
  text-decoration: line-through;
  color: #64748b;
}

.priority-badge {
  border-radius: 999px;
  padding: 5px 9px;
  font-size: 0.78rem;
  white-space: nowrap;
  border: 1px solid #e2e8f0;
  background: #f8fafc;
  color: #475569;
}

.priority-badge.high {
  background: #fee2e2;
  border-color: #fecaca;
  color: #991b1b;
}

.priority-badge.medium {
  background: #fef3c7;
  border-color: #fde68a;
  color: #92400e;
}

.priority-badge.low {
  background: #dcfce7;
  border-color: #bbf7d0;
  color: #166534;
}

@media (max-width: 640px) {
  .checklist-hero {
    grid-template-columns: 1fr;
  }

  .progress-circle {
    justify-self: center;
  }

  .check-item {
    grid-template-columns: auto 1fr;
  }

  .priority-badge {
    grid-column: 2;
    justify-self: start;
  }
}
`;
