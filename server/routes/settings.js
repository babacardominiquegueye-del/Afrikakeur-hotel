const express = require('express');
const SiteSettings = require('../models/SiteSettings');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

async function getOrCreate() {
  let settings = await SiteSettings.findOne({ key: 'main' });
  if (!settings) settings = await SiteSettings.create({ key: 'main' });
  return settings;
}

// GET /api/settings  (public)
router.get('/', async (req, res) => {
  const settings = await getOrCreate();
  res.json(settings);
});

// PUT /api/settings  (admin/editor)
router.put('/', protect, authorize('admin', 'editor'), async (req, res) => {
  try {
    const settings = await getOrCreate();
    // merge profond léger sur les sous-objets connus
    const fields = ['promoBanner', 'hero', 'about', 'cta', 'dining', 'contact', 'social', 'home'];
    for (const f of fields) {
      if (req.body[f]) settings[f] = { ...settings[f]?.toObject?.(), ...req.body[f] };
    }
    if (req.body.gallery) settings.gallery = req.body.gallery;
    await settings.save();
    res.json(settings);
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
});

module.exports = router;
