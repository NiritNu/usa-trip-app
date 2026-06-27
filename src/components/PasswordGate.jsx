import { useState } from "react";

const STORAGE_KEY = "usa-trip-app-auth-v1";
const APP_PASSWORD = "140914";

export default function PasswordGate({ children }) {
  const [isUnlocked, setIsUnlocked] = useState(() => {
    return localStorage.getItem(STORAGE_KEY) === "yes";
  });

  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  function handleSubmit(event) {
    event.preventDefault();

    if (password === APP_PASSWORD) {
      localStorage.setItem(STORAGE_KEY, "yes");
      setIsUnlocked(true);
      setError("");
      return;
    }

    setError("סיסמה לא נכונה");
    setPassword("");
  }

  function logout() {
    localStorage.removeItem(STORAGE_KEY);
    setIsUnlocked(false);
    setPassword("");
    setError("");
  }

  if (isUnlocked) {
    return (
      <>
        <button type="button" className="app-lock-button" onClick={logout}>
          🔒 נעילה
        </button>
        {children}
      </>
    );
  }

  return (
    <main className="password-page">
      <section className="password-card">
        <div className="password-emoji">✈️🗽🏰🎢</div>

        <h1>טיול ניו יורק ופלורידה</h1>

        <p>
          האפליקציה המשפחתית לתכנון הטיול.
          <br />
          יש להכניס סיסמה כדי להמשיך.
        </p>

        <form onSubmit={handleSubmit} className="password-form">
          <input
            type="password"
            value={password}
            placeholder="סיסמה"
            onChange={(event) => setPassword(event.target.value)}
            autoFocus
          />

          <button type="submit">כניסה</button>
        </form>

        {error && <div className="password-error">{error}</div>}

        <small>
          שימי לב: זו הסתרה בסיסית לאתר סטטי ציבורי, לא אבטחה מלאה.
        </small>
      </section>
    </main>
  );
}
