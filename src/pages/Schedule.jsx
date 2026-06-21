import data from '../data/trip.json';
export default function Schedule() { return <><h2>לו״ז יומי</h2>{data.schedule.map((day, i)=><section className="card" key={i}><span className="badge">{day.area}</span><h3>{day.date} — {day.title}</h3><p>{day.notes}</p></section>)}</>; }
