const mongoose = require('mongoose');

const imageSchema = new mongoose.Schema(
  { url: String, public_id: String },
  { _id: false }
);

const roomSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
    description: { type: String, default: '' },
    price: { type: Number, default: 0 }, // en FCFA, par nuit
    capacity: { type: Number, default: 2 },
    size: { type: Number, default: 0 }, // m²
    amenities: [{ type: String }],
    images: [imageSchema],
    featured: { type: Boolean, default: false },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Room', roomSchema);
