const express = require('express');
const { protect, authorize } = require('../middleware/auth');
const { upload, streamToCloudinary } = require('../middleware/upload');

const router = express.Router();

// POST /api/upload  (une image, champ "image")
router.post(
  '/',
  protect,
  authorize('admin', 'editor'),
  upload.single('image'),
  async (req, res) => {
    try {
      if (!req.file) return res.status(400).json({ message: 'Aucune image fournie.' });
      const result = await streamToCloudinary(req.file.buffer, req.body.folder || 'afrika-keur');
      res.status(201).json(result);
    } catch (e) {
      res.status(500).json({ message: e.message });
    }
  }
);

// POST /api/upload/multiple  (plusieurs images, champ "images")
router.post(
  '/multiple',
  protect,
  authorize('admin', 'editor'),
  upload.array('images', 12),
  async (req, res) => {
    try {
      if (!req.files?.length) return res.status(400).json({ message: 'Aucune image fournie.' });
      const results = await Promise.all(
        req.files.map((f) => streamToCloudinary(f.buffer, req.body.folder || 'afrika-keur'))
      );
      res.status(201).json(results);
    } catch (e) {
      res.status(500).json({ message: e.message });
    }
  }
);

module.exports = router;
