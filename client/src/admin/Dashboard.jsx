import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../api/axios';

const fmt = (d) => new Date(d).toLocaleDateString('fr-FR', { day: '2-digit', month: 'short', year: 'numeric' });

export default function Dashboard() {
  const [stats, setStats] = useState({ rooms: 0, services: 0, reviews: 0, reservations: 0 });
  const [latest, setLatest] = useState([]);

  useEffect(() => {
    Promise.all([
      api.get('/rooms').catch(() => ({ data: [] })),
      api.get('/services').catch(() => ({ data: [] })),
      api.get('/reviews?all=1').catch(() => ({ data: [] })),
      api.get('/reservations').catch(() => ({ data: [] })),
    ]).then(([r, s, rv, res]) => {
      setStats({
        rooms: r.data.length,
        services: s.data.length,
        reviews: rv.data.length,
        reservations: res.data.length,
      });
      setLatest(res.data.slice(0, 6));
    });
  }, []);

  const cards = [
    { label: 'Réservations', value: stats.reservations },
    { label: 'Chambres', value: stats.rooms },
    { label: 'Services', value: stats.services },
    { label: 'Avis', value: stats.reviews },
  ];

  return (
    <div>
      <div className="admin__head">
        <h1>Tableau de bord</h1>
      </div>

      <div className="cards-row">
        {cards.map((c) => (
          <div className="stat" key={c.label}>
            <b>{c.value}</b>
            <span>{c.label}</span>
          </div>
        ))}
      </div>

      <div className="panel">
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.8rem' }}>
          <h3>Dernières demandes de réservation</h3>
          <Link to="/admin/reservations" className="btn-sm">Tout voir</Link>
        </div>
        <table className="table">
          <thead>
            <tr>
              <th>Client</th>
              <th>Dates</th>
              <th>Chambre</th>
              <th>Statut</th>
            </tr>
          </thead>
          <tbody>
            {latest.map((r) => (
              <tr key={r._id}>
                <td>{r.firstName} {r.lastName}</td>
                <td>{fmt(r.checkIn)} → {fmt(r.checkOut)}</td>
                <td>{r.roomType || '—'}</td>
                <td><span className={`badge badge--${r.status}`}>{r.status}</span></td>
              </tr>
            ))}
            {latest.length === 0 && (
              <tr><td colSpan={4} style={{ color: '#8990a3' }}>Aucune réservation pour l'instant.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
