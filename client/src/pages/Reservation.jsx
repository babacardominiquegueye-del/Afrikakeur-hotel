import { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import api from '../api/axios';
import { useCollection } from '../lib/useCollection';
import { usePageMeta } from '../lib/usePageMeta';
import { defaultRooms } from '../data/defaultData';

const empty = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  checkIn: '',
  checkOut: '',
  roomType: '',
  guests: 2,
  message: '',
};

export default function Reservation() {
  const { settings } = useOutletContext();
  const { data: rooms } = useCollection('/rooms', defaultRooms);
  const [form, setForm] = useState(empty);
  const [status, setStatus] = useState({ state: 'idle', msg: '' });

  usePageMeta(
    'Réservation — Afrika Keur, Saly',
    'Réservez votre séjour à Afrika Keur, boutique hôtel à Saly. Demande de réservation en ligne.'
  );

  const change = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  async function submit(e) {
    e.preventDefault();
    setStatus({ state: 'loading', msg: '' });
    try {
      const res = await api.post('/reservations', form);
      setStatus({ state: 'ok', msg: res.data.message });
      setForm(empty);
    } catch (err) {
      setStatus({
        state: 'err',
        msg: err.response?.data?.message || 'Une erreur est survenue. Réessayez.',
      });
    }
  }

  const c = settings?.contact || {};

  return (
    <>
      <section className="container pagehead">
        <span className="eyebrow">Votre séjour</span>
        <h1>Demande de réservation</h1>
        <p className="lead" style={{ margin: '1rem auto 0' }}>
          Remplissez le formulaire, nous vous recontactons rapidement pour confirmer votre
          séjour.
        </p>
      </section>

      <section className="section on-dark" style={{ paddingTop: 0 }}>
        <div className="container" style={{ maxWidth: 780 }}>
          {status.state === 'ok' && (
            <div className="alert alert--ok">{status.msg}</div>
          )}
          {status.state === 'err' && (
            <div className="alert alert--err">{status.msg}</div>
          )}

          <form onSubmit={submit}>
            <div className="form-grid">
              <div className="field">
                <label htmlFor="firstName">Prénom *</label>
                <input id="firstName" name="firstName" value={form.firstName} onChange={change} required />
              </div>
              <div className="field">
                <label htmlFor="lastName">Nom *</label>
                <input id="lastName" name="lastName" value={form.lastName} onChange={change} required />
              </div>
              <div className="field">
                <label htmlFor="email">Email *</label>
                <input id="email" name="email" type="email" value={form.email} onChange={change} required />
              </div>
              <div className="field">
                <label htmlFor="phone">Téléphone *</label>
                <input id="phone" name="phone" value={form.phone} onChange={change} required />
              </div>
              <div className="field">
                <label htmlFor="checkIn">Arrivée *</label>
                <input id="checkIn" name="checkIn" type="date" value={form.checkIn} onChange={change} required />
              </div>
              <div className="field">
                <label htmlFor="checkOut">Départ *</label>
                <input id="checkOut" name="checkOut" type="date" value={form.checkOut} onChange={change} required />
              </div>
              <div className="field">
                <label htmlFor="roomType">Type de chambre</label>
                <select id="roomType" name="roomType" value={form.roomType} onChange={change}>
                  <option value="">Sans préférence</option>
                  {rooms.map((r) => (
                    <option key={r._id || r.slug} value={r.name}>
                      {r.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="field">
                <label htmlFor="guests">Nombre de personnes</label>
                <input
                  id="guests"
                  name="guests"
                  type="number"
                  min="1"
                  max="10"
                  value={form.guests}
                  onChange={change}
                />
              </div>
              <div className="field span-2">
                <label htmlFor="message">Message (optionnel)</label>
                <textarea id="message" name="message" value={form.message} onChange={change} />
              </div>
            </div>

            <div style={{ marginTop: '1.6rem', display: 'flex', alignItems: 'center', gap: '1.2rem', flexWrap: 'wrap' }}>
              <button className="btn" type="submit" disabled={status.state === 'loading'}>
                {status.state === 'loading' ? 'Envoi…' : 'Envoyer ma demande'}
              </button>
              {c.phone && (
                <span style={{ color: 'var(--muted)', fontSize: '0.9rem' }}>
                  ou appelez-nous : <a href={`tel:${c.phone.replace(/\s/g, '')}`} style={{ color: 'var(--amber)', fontWeight: 600 }}>{c.phone}</a>
                </span>
              )}
            </div>
          </form>
        </div>
      </section>
    </>
  );
}
