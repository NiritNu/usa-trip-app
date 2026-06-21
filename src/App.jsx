import React from 'react';
import { HashRouter, Routes, Route, NavLink } from 'react-router-dom';
import Schedule from './pages/Schedule.jsx';
import NewYork from './pages/NewYork.jsx';
import Disney from './pages/Disney.jsx';
import Universal from './pages/Universal.jsx';
import LightningLane from './pages/LightningLane.jsx';
import Checklist from './pages/Checklist.jsx';
import Links from './pages/Links.jsx';

const tabs = [
  { path: '/', label: 'לו״ז', element: <Schedule /> },
  { path: '/new-york', label: 'ניו יורק', element: <NewYork /> },
  { path: '/disney', label: 'דיסני', element: <Disney /> },
  { path: '/universal', label: 'יוניברסל', element: <Universal /> },
  { path: '/lightning-lane', label: 'Lightning Lane', element: <LightningLane /> },
  { path: '/checklist', label: 'צ׳ק ליסט', element: <Checklist /> },
  { path: '/links', label: 'קישורים', element: <Links /> }
];

export default function App() {
  return (
    <HashRouter>
      <header className="app-header">
        <h1>USA Trip App</h1>
        <p>טיול משפחתי — ניו יורק, דיסני ויוניברסל</p>
      </header>
      <nav className="tabs">
        {tabs.map(tab => (
          <NavLink key={tab.path} to={tab.path} end={tab.path === '/'} className={({ isActive }) => isActive ? 'tab active' : 'tab'}>
            {tab.label}
          </NavLink>
        ))}
      </nav>
      <main className="page">
        <Routes>
          {tabs.map(tab => <Route key={tab.path} path={tab.path} element={tab.element} />)}
        </Routes>
      </main>
    </HashRouter>
  );
}
