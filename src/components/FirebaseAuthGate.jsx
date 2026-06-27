import { useEffect, useState } from "react";
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth } from "../firebase.js";

export default function FirebaseAuthGate({ children }) {
  const [user, setUser] = useState(null);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setIsCheckingAuth(false);
    });

    return unsubscribe;
  }, []);

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");

    try {
      await signInWithEmailAndPassword(auth, email.trim(), password);
    } catch (err) {
      console.error(err);
      setError("האימייל או הסיסמה לא נכונים");
      setPassword("");
    }
  }

  async function handleLogout() {
    await signOut(auth);
  }

  if (isCheckingAuth) {
    return (
      <main className="password-page">
        <section className="password-card">
          <div className="password-emoji">✈️🗽🏰🎢</div>
          <h1>טיול ניו יורק ופלורידה</h1>
          <p>בודקת התחברות...</p>
        </section>
      </main>
    );
  }

  if (user) {
    return (
      <>
        <button type="button" className="app-lock-button" onClick={handleLogout}>
          🔒 יציאה
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
          יש להתחבר עם אימייל וסיסמה.
        </p>

        <form onSubmit={handleSubmit} className="password-form">
          <input
            type="email"
            value={email}
            placeholder="אימייל"
            onChange={(event) => setEmail(event.target.value)}
            autoFocus
          />

          <input
            type="password"
            value={password}
            placeholder="סיסמה"
            onChange={(event) => setPassword(event.target.value)}
          />

          <button type="submit">כניסה</button>
        </form>

        {error && <div className="password-error">{error}</div>}

        <small>
          הכניסה מנוהלת דרך Firebase Authentication.
        </small>
      </section>
    </main>
  );
}
