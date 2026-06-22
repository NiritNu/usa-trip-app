import { useEffect, useState } from "react";

const DONE_STORAGE_KEY = "trip-done-items";

export default function AttractionCard({ attraction }) {
  const [doneItems, setDoneItems] = useState({});

  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(DONE_STORAGE_KEY) || "{}");
      setDoneItems(saved);
    } catch {
      setDoneItems({});
    }
  }, []);

  const isDone = !!doneItems[attraction.id];
  const isDining = attraction.category === "dining";

  function toggleDone() {
    const next = {
      ...doneItems,
      [attraction.id]: !isDone,
    };

    setDoneItems(next);
    localStorage.setItem(DONE_STORAGE_KEY, JSON.stringify(next));
  }

  return (
    <article className={`card ${isDone ? "done-card" : ""}`}>
      <div className="card-header">
        <div>
          <h3>{attraction.name}</h3>

          {attraction.park && (
            <p className="meta">
              {attraction.park}
              {attraction.area ? ` · ${attraction.area}` : ""}
            </p>
          )}

          {attraction.area && !attraction.park && (
            <p className="meta">{attraction.area}</p>
          )}
        </div>

        <div className="card-actions">
          {attraction.category && (
            <span className="tag">{labelCategory(attraction.category)}</span>
          )}

          <button
            type="button"
            className={`done-button ${isDone ? "active" : ""}`}
            onClick={toggleDone}
            aria-pressed={isDone}
          >
            {isDone ? "✓ בוצע" : "סמן בוצע"}
          </button>
        </div>
      </div>

      {attraction.shortDescription && <p>{attraction.shortDescription}</p>}

      {isDining ? (
        <DiningInfo attraction={attraction} />
      ) : (
        <AttractionInfo attraction={attraction} />
      )}

      {attraction.express && <ExpressInfo attraction={attraction} />}

      {attraction.suitableFor?.length > 0 && (
        <div className="nearby-box">
          <strong>מתאים בעיקר ל:</strong>
          <div className="nearby-list">
            {attraction.suitableFor.map((group) => (
              <span key={group}>{labelSuitableFor(group)}</span>
            ))}
          </div>
        </div>
      )}

      {attraction.bestTimeToRide?.length > 0 && (
        <div className="nearby-box">
          <strong>{isDining ? "זמן מתאים:" : "זמן מומלץ:"}</strong>
          <div className="nearby-list">
            {attraction.bestTimeToRide.map((time) => (
              <span key={time}>{labelBestTime(time)}</span>
            ))}
          </div>
        </div>
      )}

      {attraction.nearby?.length > 0 && (
        <div className="nearby-box">
          <strong>קרוב גם ל:</strong>
          <div className="nearby-list">
            {attraction.nearby.map((place) => (
              <span key={place}>{place}</span>
            ))}
          </div>
        </div>
      )}

      {attraction.tip && <p className="tip">טיפ: {attraction.tip}</p>}
    </article>
  );
}

function AttractionInfo({ attraction }) {
  const heightText =
    attraction.minHeightCm == null
      ? "ללא מגבלת גובה"
      : `${attraction.minHeightCm} ס״מ`;

  return (
    <div className="info-grid">
      <div>
        <strong>גובה:</strong> {heightText}
      </div>

      {attraction.avgWaitSeptemberMin != null && (
        <div>
          <strong>המתנה בספטמבר:</strong> כ־{attraction.avgWaitSeptemberMin} דק׳
        </div>
      )}

      {attraction.durationMin != null && (
        <div>
          <strong>משך:</strong> כ־{attraction.durationMin} דק׳
        </div>
      )}

      {attraction.duration && (
        <div>
          <strong>משך:</strong> {attraction.duration}
        </div>
      )}

      {attraction.intensity && (
        <div>
          <strong>אינטנסיביות:</strong> {labelIntensity(attraction.intensity)}
        </div>
      )}

      {attraction.scareFactor && (
        <div>
          <strong>מפחיד:</strong> {labelScare(attraction.scareFactor)}
        </div>
      )}

      {attraction.motionSicknessRisk && (
        <div>
          <strong>בחילה/סחרחורת:</strong>{" "}
          {labelRisk(attraction.motionSicknessRisk)}
        </div>
      )}

      {attraction.priority && (
        <div>
          <strong>עדיפות:</strong> {labelPriority(attraction.priority)}
        </div>
      )}

      {attraction.skipLine && (
        <div>
          <strong>קיצור תור:</strong> {attraction.skipLine}
        </div>
      )}

      {attraction.planningNeeded && (
        <div>
          <strong>תכנון:</strong> {labelPlanning(attraction.planningNeeded)}
        </div>
      )}

      {attraction.familyMode && (
        <div>
          <strong>משפחתי:</strong> {labelFamilyMode(attraction.familyMode)}
        </div>
      )}

      {attraction.indoor != null && (
        <div>
          <strong>מקורה/ממוזג:</strong> {attraction.indoor ? "כן" : "לא"}
        </div>
      )}

      {attraction.rainFriendly != null && (
        <div>
          <strong>מתאים לגשם:</strong>{" "}
          {attraction.rainFriendly ? "כן" : "לא"}
        </div>
      )}
    </div>
  );
}

function DiningInfo({ attraction }) {
  return (
    <div className="info-grid">
      {attraction.diningType && (
        <div>
          <strong>סוג:</strong> {labelDiningType(attraction.diningType)}
        </div>
      )}

      {attraction.mealUse && (
        <div>
          <strong>שימוש:</strong> {labelMealUse(attraction.mealUse)}
        </div>
      )}

      {attraction.foodStyle && (
        <div>
          <strong>סגנון:</strong> {labelFoodStyle(attraction.foodStyle)}
        </div>
      )}

      {attraction.kidsFriendly != null && (
        <div>
          <strong>מתאים לילדים:</strong>{" "}
          {attraction.kidsFriendly ? "כן" : "פחות"}
        </div>
      )}

      {attraction.mobileOrder != null && (
        <div>
          <strong>Mobile Order:</strong>{" "}
          {attraction.mobileOrder ? "כן" : "לא"}
        </div>
      )}

      {attraction.reservationNeeded != null && (
        <div>
          <strong>הזמנה מראש:</strong>{" "}
          {attraction.reservationNeeded ? "מומלץ/נדרש" : "לא נדרש"}
        </div>
      )}

      {attraction.durationMin != null && (
        <div>
          <strong>זמן משוער:</strong> כ־{attraction.durationMin} דק׳
        </div>
      )}

      {attraction.priority && (
        <div>
          <strong>עדיפות:</strong> {labelPriority(attraction.priority)}
        </div>
      )}

      {attraction.indoor != null && (
        <div>
          <strong>מקורה/ממוזג:</strong> {attraction.indoor ? "כן" : "לא"}
        </div>
      )}

      {attraction.rainFriendly != null && (
        <div>
          <strong>מתאים לגשם:</strong>{" "}
          {attraction.rainFriendly ? "כן" : "לא"}
        </div>
      )}
    </div>
  );
}

function ExpressInfo({ attraction }) {
  const express = attraction.express;
  const priority = attraction.expressPriority || "check_same_day";

  const classes = [
    "nearby-box",
    "express-box",
    priority === "use" ? "express-use" : "",
    priority === "not_needed" ? "express-not-needed" : "",
    priority === "not_available" ? "express-not-available" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={classes}>
      <strong>Express:</strong>

      <div className="nearby-list">
        {express.includedWithHotel != null && (
          <span>
            {express.includedWithHotel ? "כלול לכם" : "לא כלול לכם"}
          </span>
        )}

        {express.type && <span>{labelExpressType(express.type)}</span>}

        <span>{labelExpressPriority(priority)}</span>
      </div>

      <p className="mini-note">{buildExpressSummary(express, priority)}</p>
    </div>
  );
}

function buildExpressSummary(express, priority) {
  if (priority === "use") {
    return "כאן כן כדאי להשתמש ב-Express, במיוחד אם התור רגיל/ארוך.";
  }

  if (priority === "not_needed") {
    return "יש לכם Express, אבל לא חייבים לבזבז אותו אם התור קצר.";
  }

  if (priority === "not_available") {
    return "Express לא רלוונטי כאן — בדרך כלל זו חוויה, דמות, אזור פתוח או אוכל.";
  }

  if (express.type === "once_per_ride") {
    return "ב-Epic זה כנראה מוגבל יותר — לבדוק תנאים באפליקציה/כרטיס.";
  }

  return "לבדוק באותו יום לפי התור בפועל.";
}

function labelCategory(value) {
  const labels = {
    ride: "מתקן",
    show: "הופעה",
    character: "דמויות",
    dining: "אוכל",
    experience: "חוויה",
    museum: "מוזיאון",
    park: "פארק",
    store: "חנות",
    view: "תצפית",
    outdoors: "חוץ",
  };

  return labels[value] || value;
}

function labelIntensity(value) {
  const labels = {
    calm: "רגוע",
    mild: "קל",
    medium: "בינוני",
    thrill: "אקסטרים",
    scary: "מפחיד",
  };

  return labels[value] || value;
}

function labelScare(value) {
  const labels = {
    none: "לא",
    low: "מעט",
    medium: "בינוני",
    high: "גבוה",
  };

  return labels[value] || value;
}

function labelRisk(value) {
  const labels = {
    none: "לא",
    low: "נמוך",
    medium: "בינוני",
    high: "גבוה",
  };

  return labels[value] || value;
}

function labelPriority(value) {
  const labels = {
    must_do: "מומלץ מאוד",
    good_if_time: "אם מסתדר",
    skip_if_busy: "לא חובה",
  };

  return labels[value] || value;
}

function labelPlanning(value) {
  const labels = {
    no_reservation: "לא דורש הזמנה",
    high_priority: "עדיפות גבוהה",
    lightning_lane_recommended: "מומלץ Lightning Lane",
    advance_dining_reservation_recommended: "מומלץ להזמין מראש",
    arrive_early_for_spot: "להגיע מוקדם למקום טוב",
    check_same_day_hours: "לבדוק שעות באותו יום",
  };

  return labels[value] || value;
}

function labelFamilyMode(value) {
  const labels = {
    all_together: "כולם יחד",
    some_together: "חלק מהמשפחה",
    split_parent_child: "פיצול הורה + ילד",
    adults_only: "בעיקר למבוגרים/גדולים",
  };

  return labels[value] || value;
}

function labelSuitableFor(value) {
  const labels = {
    preschooler: "קטנים",
    youngKid: "ילדים צעירים",
    olderKid: "ילדים גדולים",
    adults: "מבוגרים",
  };

  return labels[value] || value;
}

function labelBestTime(value) {
  const labels = {
    morning: "בוקר",
    midday: "צהריים",
    afternoon: "אחר הצהריים",
    evening: "ערב",
    late_evening: "סוף היום",
    night: "לילה",
    scheduled_time: "לפי שעה באפליקציה",
    breakfast: "ארוחת בוקר",
    lunch: "צהריים",
    dinner: "ערב",
  };

  return labels[value] || value;
}

function labelDiningType(value) {
  const labels = {
    quick_service: "Quick Service",
    table_service: "Table Service",
    snack: "נשנוש",
  };

  return labels[value] || value;
}

function labelMealUse(value) {
  const labels = {
    real_meal: "ארוחה",
    snack: "נשנוש",
    dessert: "קינוח",
    sit_down: "ארוחה בישיבה",
    emergency_kids_food: "פתרון מהיר לילדים",
  };

  return labels[value] || value;
}

function labelFoodStyle(value) {
  const labels = {
    fresh_quick: "יחסית טרי ומהיר",
    quick_varied: "מהיר ומגוון",
    kids_food: "אוכל ילדים",
    emergency_kids_food: "פתרון ילדים מהיר",
    quick_service: "Quick Service",
    mexican_quick: "מקסיקני מהיר",
    asian_quick: "אסייתי מהיר",
    bbq: "BBQ",
    bakery: "מאפייה",
    dessert: "קינוח",
    snack: "נשנוש",
    fish_and_chips: "פיש אנד צ׳יפס",
  };

  return labels[value] || value;
}

function labelExpressType(value) {
  const labels = {
    unlimited: "Unlimited",
    once_per_ride: "פעם אחת לכל מתקן",
    not_available: "לא זמין",
    unknown: "לא ברור",
  };

  return labels[value] || value;
}

function labelExpressPriority(value) {
  const labels = {
    use: "כדאי להשתמש",
    not_needed: "לא קריטי אם התור קצר",
    not_available: "לא רלוונטי",
    check_same_day: "לבדוק באותו יום",
  };

  return labels[value] || value;
}