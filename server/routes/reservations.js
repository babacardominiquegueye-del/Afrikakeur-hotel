const express = require('express');
const Reservation = require('../models/Reservation');
const { protect, authorize } = require('../middleware/auth');
const { sendReservationEmail } = require('../utils/mailer');

const router = express.Router();

// POST /api/reservations  (public) — crée la demande + envoie un email
router.post('/', async (req, res) => {
  try {
    const { firstName, lastName, email, phone, checkIn, checkOut, roomType, guests, message } =
      req.body;
    if (!firstName || !lastName || !email || !phone || !checkIn || !checkOut)
      return res.status(400).json({ message: 'Merci de remplir tous les champs obligatoires.' });

    if (!/^\S+@\S+\.\S+$/.test(email))
      return res.status(400).json({ message: 'Adresse email invalide.' });

    if (new Date(checkOut) <= new Date(checkIn))
      return res.status(400).json({ message: 'La date de départ doit être après la date d\'arrivée.' });

    const reservation = await Reservation.create({
      firstName: String(firstName).slice(0, 80),
      lastName: String(lastName).slice(0, 80),
      email: String(email).slice(0, 120),
      phone: String(phone).slice(0, 40),
      checkIn,
      checkOut,
      roomType: String(roomType || '').slice(0, 120),
      guests: Number(guests) || 1,
      message: String(message || '').slice(0, 2000),
    });

    // Envoi email non bloquant : on ne fait pas échouer la demande si le SMTP tombe
    sendReservationEmail(reservation).catch((e) =>
      console.error('Email réservation KO :', e.message)
    );

    res.status(201).json({
      message: 'Votre demande a bien été envoyée. Nous vous recontactons rapidement.',
      id: reservation._id,
    });
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
});

// GET /api/reservations  (admin/editor)
router.get('/', protect, authorize('admin', 'editor'), async (req, res) => {
  const reservations = await Reservation.find().sort({ createdAt: -1 });
  res.json(reservations);
});

// PATCH /api/reservations/:id/status  (admin/editor)
router.patch('/:id/status', protect, authorize('admin', 'editor'), async (req, res) => {
  const { status } = req.body;
  if (!['nouvelle', 'confirmee', 'annulee'].includes(status))
    return res.status(400).json({ message: 'Statut invalide.' });

  const reservation = await Reservation.findByIdAndUpdate(
    req.params.id,
    { status },
    { new: true }
  );
  if (!reservation) return res.status(404).json({ message: 'Réservation introuvable.' });
  res.json(reservation);
});

// DELETE /api/reservations/:id  (admin)
router.delete('/:id', protect, authorize('admin'), async (req, res) => {
  const r = await Reservation.findByIdAndDelete(req.params.id);
  if (!r) return res.status(404).json({ message: 'Réservation introuvable.' });
  res.json({ message: 'Réservation supprimée.' });
});

module.exports = router;
