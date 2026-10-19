const mongoose = require('mongoose');

const reservationSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true, trim: true },
    lastName: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, lowercase: true },
    phone: { type: String, required: true, trim: true },
    checkIn: { type: Date, required: true },
    checkOut: { type: Date, required: true },
    roomType: { type: String, default: '' },
    guests: { type: Number, default: 1 },
    message: { type: String, default: '' },
    status: {
      type: String,
      enum: ['nouvelle', 'confirmee', 'annulee'],
      default: 'nouvelle',
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Reservation', reservationSchema);
