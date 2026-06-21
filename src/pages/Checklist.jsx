import { useEffect, useState } from 'react';
import data from '../data/trip.json';
export default function Checklist() { const [checked,setChecked]=useState(()=>JSON.parse(localStorage.getItem('trip-checklist')||'{}')); useEffect(()=>localStorage.setItem('trip-checklist',JSON.stringify(checked)),[checked]); return <><h2>צ׳ק ליסט</h2><section className="card">{data.checklist.map(item=><label key={item} style={{display:'block', margin:'12px 0'}}><input type="checkbox" checked={!!checked[item]} onChange={e=>setChecked({...checked,[item]:e.target.checked})}/>{item}</label>)}</section></>; }
