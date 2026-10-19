const express = require('express');
const Service = require('../models/Service');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

router.get('/', async (req, res) => {
  const services = await Service.find().sort({ order: 1, createdAt: 1 });
  res.json(services);
});

router.post('/', protect, authorize('admin', 'editor'), async (req, res) => {
  try {
    const service = await Service.create(req.body);
    res.status(201).json(service);
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
});

router.put('/:id', protect, authorize('admin', 'editor'), async (req, res) => {
  try {
    const service = await Service.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!service) return res.status(404).json({ message: 'Service introuvable.' });
    res.json(service);
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
});

router.delete('/:id', protect, authorize('admin', 'editor'), async (req, res) => {
  const service = await Service.findByIdAndDelete(req.params.id);
  if (!service) return res.status(404).json({ message: 'Service introuvable.' });
  res.json({ message: 'Service supprimé.' });
});

module.exports = router;
