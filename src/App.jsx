import { NavLink, Route, Routes } from "react-router-dom";
import Schedule from "./pages/Schedule";
import NewYork from "./pages/NewYork";
import Disney from "./pages/Disney";
import Universal from "./pages/Universal";
import LightningLane from "./pages/LightningLane";
import Checklist from "./pages/Checklist";
import Links from "./pages/Links";

export default function App() {
  return (
    <div className="app-shell">
      <header className="app-header">
        <div className="header-badge">✈️ טיול משפחתי בארה״ב</div>
        <h1>USA Trip App</h1>
        <p>🗽 ניו יורק · 🏰 דיסני · 🎢 יוניברסל</p>
      </header>

      <nav className="app-nav" aria-label="Main navigation">
        <NavLink to="/" end>
          🗓️ לו״ז
        </NavLink>
        <NavLink to="/new-york">🗽 ניו יורק</NavLink>
        <NavLink to="/disney">🏰 דיסני</NavLink>
        <NavLink to="/universal">🎢 יוניברסל</NavLink>
        <NavLink to="/lightning-lane">⚡ Lightning Lane</NavLink>
        <NavLink to="/checklist">🧳 צ׳ק ליסט</NavLink>
        <NavLink to="/links">🔗 קישורים</NavLink>
      </nav>

      <Routes>
        <Route path="/" element={<Schedule />} />
        <Route path="/new-york" element={<NewYork />} />
        <Route path="/disney" element={<Disney />} />
        <Route path="/universal" element={<Universal />} />
        <Route path="/lightning-lane" element={<LightningLane />} />
        <Route path="/checklist" element={<Checklist />} />
        <Route path="/links" element={<Links />} />
      </Routes>
    </div>
  );
}