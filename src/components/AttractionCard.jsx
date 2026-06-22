export default function AttractionCard({ attraction }) {
  const heightText =
    attraction.minHeightCm == null
      ? "ללא מגבלת גובה"
      : `${attraction.minHeightCm} ס״מ`;

  return (
    <article className="card">
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

        {attraction.category && (
          <span className="tag">{labelCategory(attraction.category)}</span>
        )}
      </div>

      {attraction.shortDescription && (
        <p>{attraction.shortDescription}</p>
      )}

      <div className="info-grid">
        <div>
          <strong>גובה:</strong> {heightText}
        </div>

        {attraction.avgWaitSeptemberMin != null && (
          <div>
            <strong>המתנה בספטמבר:</strong>{" "}
            כ־{attraction.avgWaitSeptemberMin} דק׳
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
            <strong>אינטנסיביות:</strong>{" "}
            {labelIntensity(attraction.intensity)}
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
            <strong>תכנון:</strong>{" "}
            {labelPlanning(attraction.planningNeeded)}
          </div>
        )}

        {attraction.familyMode && (
          <div>
            <strong>משפחתי:</strong>{" "}
            {labelFamilyMode(attraction.familyMode)}
          </div>
        )}

        {attraction.indoor != null && (
          <div>
            <strong>מקורה/ממוזג:</strong>{" "}
            {attraction.indoor ? "כן" : "לא"}
          </div>
        )}

        {attraction.rainFriendly != null && (
          <div>
            <strong>מתאים לגשם:</strong>{" "}
            {attraction.rainFriendly ? "כן" : "לא"}
          </div>
        )}

        {attraction.rainyDay != null && (
          <div>
            <strong>יום גשום:</strong>{" "}
            {attraction.rainyDay ? "מתאים" : "פחות מתאים"}
          </div>
        )}

        {attraction.bookingNeeded != null && (
          <div>
            <strong>הזמנה מראש:</strong>{" "}
            {attraction.bookingNeeded ? "מומלץ/נדרש" : "לא נדרש"}
          </div>
        )}

        {attraction.energyLevel && (
          <div>
            <strong>מאמץ:</strong> {labelEnergy(attraction.energyLevel)}
          </div>
        )}
      </div>

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
          <strong>זמן מומלץ:</strong>
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

function labelCategory(value) {
  const labels = {
    ride: "מתקן",
    show: "הופעה",
    character: "דמויות",
    dining: "אוכל",
    museum: "מוזיאון",
    park: "פארק",
    store: "חנות",
    view: "תצפית",
    experience: "חוויה",
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
    must_do: "חובה",
    good_if_time: "אם יש זמן",
    skip_if_busy: "לדלג אם עמוס",
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

function labelEnergy(value) {
  const labels = {
    low: "קליל",
    medium: "בינוני",
    high: "גבוה",
  };

  return labels[value] || value;
}