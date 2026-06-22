export default function AttractionCard({ attraction }) {
  const heightText =
    attraction.minHeightCm == null
      ? "ללא מגבלת גובה"
      : `${attraction.minHeightCm} ס״מ`;

  return (
    <div className="card">
      <div className="card-header">
        <h3>{attraction.name}</h3>
        <span className="tag">{labelCategory(attraction.category)}</span>
      </div>

      {attraction.park && (
        <p className="meta">
          {attraction.park}
          {attraction.area ? ` · ${attraction.area}` : ""}
        </p>
      )}

      <p>{attraction.shortDescription}</p>

      <div className="info-grid">
        <div>
          <strong>גובה:</strong> {heightText}
        </div>

        {attraction.avgWaitSeptemberMin != null && (
          <div>
            <strong>המתנה בספטמבר:</strong> כ־{attraction.avgWaitSeptemberMin} דק׳
          </div>
        )}

        {attraction.intensity && (
          <div>
            <strong>אינטנסיביות:</strong> {labelIntensity(attraction.intensity)}
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

        {attraction.rainFriendly != null && (
          <div>
            <strong>מתאים לגשם:</strong> {attraction.rainFriendly ? "כן" : "לא"}
          </div>
        )}

        {attraction.indoor != null && (
          <div>
            <strong>ממוזג/מקורה:</strong> {attraction.indoor ? "כן" : "לא"}
          </div>
        )}
      </div>

      {attraction.tip && <p className="tip">טיפ: {attraction.tip}</p>}
    </div>
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
    store: "חנות"
  };

  return labels[value] || value;
}

function labelIntensity(value) {
  const labels = {
    calm: "רגוע",
    mild: "קל",
    medium: "בינוני",
    thrill: "אקסטרים",
    scary: "מפחיד"
  };

  return labels[value] || value;
}

function labelPriority(value) {
  const labels = {
    must_do: "חובה",
    good_if_time: "אם יש זמן",
    skip_if_busy: "לדלג אם עמוס"
  };

  return labels[value] || value;
}