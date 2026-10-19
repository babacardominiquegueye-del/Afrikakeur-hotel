const express = require('express');
const Room = require('../models/Room');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

// GET /api/rooms  (public)
router.get('/', async (req, res) => {
  const rooms = await Room.find().sort({ order: 1, createdAt: 1 });
  res.json(rooms);
});

// GET /api/rooms/:slug  (public)
router.get('/:slug', async (req, res) => {
  const room = await Room.findOne({ slug: req.params.slug });
  if (!room) return res.status(404).json({ message: 'Chambre introuvable.' });
  res.json(room);
});

// POST /api/rooms  (admin/editor)
router.post('/', protect, authorize('admin', 'editor'), async (req, res) => {
  try {
    const room = await Room.create(req.body);
    res.status(201).json(room);
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
});

// PUT /api/rooms/:id
router.put('/:id', protect, authorize('admin', 'editor'), async (req, res) => {
  try {
    const room = await Room.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!room) return res.status(404).json({ message: 'Chambre introuvable.' });
    res.json(room);
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
});

// DELETE /api/rooms/:id
router.delete('/:id', protect, authorize('admin', 'editor'), async (req, res) => {
  const room = await Room.findByIdAndDelete(req.params.id);
  if (!room) return res.status(404).json({ message: 'Chambre introuvable.' });
  res.json({ message: 'Chambre supprimée.' });
});

module.exports = router;
