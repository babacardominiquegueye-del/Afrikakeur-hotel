import { useEffect, useState } from 'react';
import api from '../api/axios';

const fmt = (d) => new Date(d).toLocaleDateString('fr-FR', { day: '2-digit', month: 'short', year: 'numeric' });

export default function Reservations() {
  const [items, setItems] = useState([]);
  const [error, setError] = useState('');

  const load = () => api.get('/reservations').then((r) => setItems(r.data)).catch(() => setError('Chargement impossible.'));
  useEffect(() => { load(); }, []);

  async function setStatus(id, status) {
    try {
      await api.patch(`/reservations/${id}/status`, { status });
      load();
    } catch {
      setError('Mise à jour impossible.');
    }
  }

  async function remove(id) {
    if (!window.confirm('Supprimer cette réservation ?')) return;
    try {
      await api.delete(`/reservations/${id}`);
      load();
    } catch {
      setError('Suppression impossible (réservé aux admins).');
    }
  }

  return (
    <div>
      <div className="admin__head">
        <h1>Réservations</h1>
      </div>
      {error && <div className="alert alert--err">{error}</div>}

      <div className="panel">
        <table className="table">
          <thead>
            <tr>
              <th>Client</th>
              <th>Contact</th>
              <th>Dates</th>
              <th>Chambre</th>
              <th>Pers.</th>
              <th>Statut</th>
              <th style={{ textAlign: 'right' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {items.map((r) => (
              <tr key={r._id}>
                <td>
                  {r.firstName} {r.lastName}
                  {r.message && (
                    <div style={{ color: '#8990a3', fontSize: '0.8rem', marginTop: 4 }}>{r.message}</div>
                  )}
                </td>
                <td style={{ fontSize: '0.82rem' }}>
                  <div>{r.email}</div>
                  <div>{r.phone}</div>
                </td>
                <td>{fmt(r.checkIn)} → {fmt(r.checkOut)}</td>
                <td>{r.roomType || '—'}</td>
                <td>{r.guests}</td>
                <td><span className={`badge badge--${r.status}`}>{r.status}</span></td>
                <td>
                  <div className="row-actions" style={{ justifyContent: 'flex-end' }}>
                    {r.status !== 'confirmee' && (
                      <button className="btn-sm btn-sm--primary" onClick={() => setStatus(r._id, 'confirmee')}>Confirmer</button>
                    )}
                    {r.status !== 'annulee' && (
                      <button className="btn-sm" onClick={() => setStatus(r._id, 'annulee')}>Annuler</button>
                    )}
                    <button className="btn-sm btn-sm--danger" onClick={() => remove(r._id)}>Suppr.</button>
                  </div>
                </td>
              </tr>
            ))}
            {items.length === 0 && (
              <tr><td colSpan={7} style={{ color: '#8990a3' }}>Aucune réservation pour l'instant.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
