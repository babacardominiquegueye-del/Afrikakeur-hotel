const nodemailer = require('nodemailer');

let transporter = null;

function getTransporter() {
  if (transporter) return transporter;
  if (!process.env.SMTP_HOST) return null; // email non configuré → on ignore proprement
  transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT || 465),
    secure: String(process.env.SMTP_SECURE || 'true') === 'true',
    auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
  });
  return transporter;
}

const fmt = (d) =>
  new Date(d).toLocaleDateString('fr-FR', { day: '2-digit', month: 'long', year: 'numeric' });

// Échappement HTML des saisies utilisateur (évite l'injection dans l'email)
const esc = (v) =>
  String(v ?? '').replace(/[&<>"']/g, (c) =>
    ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c])
  );

// Supprime les retours à la ligne (injection d'en-têtes dans le sujet)
const flat = (v) => String(v ?? '').replace(/[\r\n]+/g, ' ').trim();

async function sendReservationEmail(r) {
  const t = getTransporter();
  if (!t) {
    console.warn('⚠️  SMTP non configuré : email de réservation non envoyé.');
    return false;
  }

  const html = `
    <div style="font-family:Arial,sans-serif;max-width:560px;margin:auto">
      <h2 style="color:#1A2238">Nouvelle demande de réservation — Afrika Keur</h2>
      <table style="width:100%;border-collapse:collapse">
        <tr><td style="padding:6px 0"><b>Client</b></td><td>${esc(r.firstName)} ${esc(r.lastName)}</td></tr>
        <tr><td style="padding:6px 0"><b>Email</b></td><td>${esc(r.email)}</td></tr>
        <tr><td style="padding:6px 0"><b>Téléphone</b></td><td>${esc(r.phone)}</td></tr>
        <tr><td style="padding:6px 0"><b>Arrivée</b></td><td>${fmt(r.checkIn)}</td></tr>
        <tr><td style="padding:6px 0"><b>Départ</b></td><td>${fmt(r.checkOut)}</td></tr>
        <tr><td style="padding:6px 0"><b>Chambre</b></td><td>${esc(r.roomType) || '—'}</td></tr>
        <tr><td style="padding:6px 0"><b>Personnes</b></td><td>${esc(r.guests)}</td></tr>
        <tr><td style="padding:6px 0;vertical-align:top"><b>Message</b></td><td>${esc(r.message) || '—'}</td></tr>
      </table>
    </div>`;

  await t.sendMail({
    from: `"Afrika Keur — Réservations" <${process.env.SMTP_USER}>`,
    to: process.env.RESERVATION_TO || process.env.SMTP_USER,
    replyTo: r.email,
    subject: `Réservation — ${flat(r.firstName)} ${flat(r.lastName)} (${fmt(r.checkIn)})`,
    html,
  });
  return true;
}

module.exports = { sendReservationEmail };
