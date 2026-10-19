const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { protect } = require('../middleware/auth');

const router = express.Router();

const signToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES || '7d' });

// POST /api/auth/login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password)
    return res.status(400).json({ message: 'Email et mot de passe requis.' });

  const user = await User.findOne({ email: email.toLowerCase() }).select('+password');
  if (!user || !(await user.matchPassword(password)))
    return res.status(401).json({ message: 'Identifiants incorrects.' });

  res.json({
    token: signToken(user._id),
    user: { id: user._id, name: user.name, email: user.email, role: user.role },
  });
});

// GET /api/auth/me
router.get('/me', protect, (req, res) => {
  const u = req.user;
  res.json({ id: u._id, name: u.name, email: u.email, role: u.role });
});

module.exports = router;
