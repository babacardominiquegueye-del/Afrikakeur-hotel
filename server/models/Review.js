const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema(
  {
    author: { type: String, required: true, trim: true },
    country: { type: String, default: '' },
    rating: { type: Number, min: 1, max: 5, default: 5 },
    text: { type: String, required: true },
    date: { type: Date, default: Date.now },
    published: { type: Boolean, default: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Review', reviewSchema);
