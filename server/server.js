require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

const app = express();

// --- Middlewares globaux ---
app.use(
  cors({
    origin: process.env.CLIENT_URL || 'http://localhost:5173',
    credentials: true,
  })
);
app.use(express.json({ limit: '2mb' }));

// --- Routes ---
app.use('/api/auth', require('./routes/auth'));
app.use('/api/rooms', require('./routes/rooms'));
app.use('/api/services', require('./routes/services'));
app.use('/api/reviews', require('./routes/reviews'));
app.use('/api/reservations', require('./routes/reservations'));
app.use('/api/settings', require('./routes/settings'));
app.use('/api/upload', require('./routes/upload'));

app.get('/api/health', (req, res) => res.json({ ok: true }));

// --- 404 & erreurs ---
app.use((req, res) => res.status(404).json({ message: 'Route introuvable.' }));
app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.status || 500).json({ message: err.message || 'Erreur serveur.' });
});

const PORT = process.env.PORT || 5000;

connectDB().then(() => {
  app.listen(PORT, () => console.log(`🚀 API en écoute sur http://localhost:${PORT}`));
});
