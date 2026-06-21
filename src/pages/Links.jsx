import data from '../data/trip.json';
export default function Links() { return <><h2>קישורים חשובים</h2>{data.links.map(link=><section className="card" key={link.url}><h3>{link.label}</h3><a className="link-button" href={link.url} target="_blank" rel="noreferrer">פתחי קישור</a></section>)}</>; }
