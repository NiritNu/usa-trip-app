import { NavLink, Route, Routes } from "react-router-dom";
import Schedule from "./pages/Schedule.jsx";
import NewYork from "./pages/NewYork.jsx";
import Disney from "./pages/Disney.jsx";
import Universal from "./pages/Universal.jsx";
import LightningLane from "./pages/LightningLane.jsx";
import Checklist from "./pages/Checklist.jsx";
import Links from "./pages/Links.jsx";
import PrivateTrip from "./pages/PrivateTrip.jsx";

export default function App() {
  return (
    <div className="app-shell">
      <header className="app-header">
        <div>
          <div className="eyebrow">✈️ טיול ניו יורק ופלורידה</div>
          <h1>אפליקציית הטיול המשפחתית</h1>
          <p>לו״ז, פארקים, רעיונות, צ׳ק ליסט ומידע פרטי במקום אחד.</p>
        </div>
      </header>

      <nav className="top-nav">
        <NavLink to="/">🗓️ לו״ז</NavLink>
        <NavLink to="/new-york">🗽 ניו יורק</NavLink>
        <NavLink to="/disney">🏰 דיסני</NavLink>
        <NavLink to="/universal">🎢 יוניברסל</NavLink>
        <NavLink to="/lightning-lane">⚡ Lightning Lane</NavLink>
        <NavLink to="/checklist">🧳 צ׳ק ליסט</NavLink>
        <NavLink to="/links">🔗 קישורים</NavLink>
        <NavLink to="/private">🔐 פרטי</NavLink>
      </nav>

      <Routes>
        <Route path="/" element={<Schedule />} />
        <Route path="/new-york" element={<NewYork />} />
        <Route path="/disney" element={<Disney />} />
        <Route path="/universal" element={<Universal />} />
        <Route path="/lightning-lane" element={<LightningLane />} />
        <Route path="/checklist" element={<Checklist />} />
        <Route path="/links" element={<Links />} />
        <Route path="/private" element={<PrivateTrip />} />
      </Routes>
    </div>
  );
}
