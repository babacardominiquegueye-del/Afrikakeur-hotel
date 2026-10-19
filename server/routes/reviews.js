const express = require('express');
const Review = require('../models/Review');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

// GET /api/reviews  (public : uniquement les avis publiés)
router.get('/', async (req, res) => {
  const all = req.query.all === '1';
  const filter = all ? {} : { published: true };
  const reviews = await Review.find(filter).sort({ date: -1 });
  res.json(reviews);
});

router.post('/', protect, authorize('admin', 'editor'), async (req, res) => {
  try {
    const review = await Review.create(req.body);
    res.status(201).json(review);
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
});

router.put('/:id', protect, authorize('admin', 'editor'), async (req, res) => {
  try {
    const review = await Review.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!review) return res.status(404).json({ message: 'Avis introuvable.' });
    res.json(review);
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
});

router.delete('/:id', protect, authorize('admin', 'editor'), async (req, res) => {
  const review = await Review.findByIdAndDelete(req.params.id);
  if (!review) return res.status(404).json({ message: 'Avis introuvable.' });
  res.json({ message: 'Avis supprimé.' });
});

module.exports = router;
