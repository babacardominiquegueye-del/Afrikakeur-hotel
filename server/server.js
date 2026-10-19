require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const connectDB = require('./config/db');

const app = express();

// Nombre de proxys de confiance (2 derrière le proxy Vercel → Render, 1 sinon)
app.set('trust proxy', Number(process.env.TRUST_PROXY_HOPS || 1));

// --- Middlewares globaux ---
app.use(helmet({ crossOriginResourcePolicy: { policy: 'cross-origin' } }));

const allowedOrigins = (process.env.CLIENT_URL || '')
  .split(',')
  .map((s) => s.trim())
  .filter(Boolean);

app.use(
  cors({
    origin: allowedOrigins.length ? allowedOrigins : false,
    credentials: true,
  })
);
app.use(express.json({ limit: '2mb' }));

// --- Rate limiting ---
app.use(
  '/api/auth/login',
  rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 10,
    standardHeaders: 'draft-7',
    legacyHeaders: false,
    message: { message: 'Trop de tentatives de connexion, réessayez dans 15 minutes.' },
  })
);

app.use(
  '/api',
  rateLimit({
    windowMs: 60 * 1000,
    limit: 120,
    standardHeaders: 'draft-7',
    legacyHeaders: false,
    message: { message: 'Trop de requêtes, réessayez dans une minute.' },
  })
);

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
  if (err.name === 'MulterError') {
    err.status = 400;
    err.message =
      err.code === 'LIMIT_FILE_SIZE' ? 'Fichier trop volumineux (8 Mo max).' : 'Fichier invalide.';
  }
  console.error(err);
  const status = err.status || 500;
  const message =
    status < 500
      ? err.message
      : process.env.NODE_ENV === 'production'
        ? 'Erreur serveur.'
        : err.message;
  res.status(status).json({ message });
});

const PORT = process.env.PORT || 5000;

connectDB().then(() => {
  app.listen(PORT, () => console.log(`🚀 API en écoute sur http://localhost:${PORT}`));
});
