import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase.js";

export default function PrivateTrip() {
  const [data, setData] = useState(null);
  const [status, setStatus] = useState("loading");
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadPrivateData() {
      try {
        const ref = doc(db, "tripData", "privateSchedule");
        const snapshot = await getDoc(ref);

        if (!snapshot.exists()) {
          setStatus("missing");
          return;
        }

        setData(snapshot.data());
        setStatus("ready");
      } catch (err) {
        console.error(err);
        setError("לא הצלחתי לקרוא את המידע הפרטי מ-Firestore");
        setStatus("error");
      }
    }

    loadPrivateData();
  }, []);

  return (
    <main className="page">
      <h1 className="page-title">🔐 מידע פרטי</h1>

      <p className="page-description">
        זה עמוד בדיקה שמוודא שהאפליקציה קוראת מידע פרטי מ־Firestore אחרי התחברות.
      </p>

      <section className="card playful-panel">
        {status === "loading" && <p>טוען מידע פרטי...</p>}

        {status === "missing" && (
          <>
            <h2>לא נמצא מסמך</h2>
            <p>
              לא נמצא המסמך <code>tripData/privateSchedule</code> ב־Firestore.
            </p>
          </>
        )}

        {status === "error" && (
          <>
            <h2>שגיאה</h2>
            <p>{error}</p>
            <p className="meta">
              אם זה קורה, צריך לבדוק שה־Rules מאפשרים למשתמש המחובר לקרוא מתוך
              tripData.
            </p>
          </>
        )}

        {status === "ready" && (
          <>
            <h2>{data.title || "מידע פרטי"}</h2>
            <p>{data.note || "המסמך נטען בהצלחה."}</p>

            <div className="private-debug-box">
              <strong>Firestore path:</strong>
              <code>tripData/privateSchedule</code>
            </div>
          </>
        )}
      </section>
    </main>
  );
}
