const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Vérifie le token et charge l'utilisateur
async function protect(req, res, next) {
  let token;
  const header = req.headers.authorization;
  if (header && header.startsWith('Bearer ')) token = header.split(' ')[1];

  if (!token) return res.status(401).json({ message: 'Non autorisé, token manquant.' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);
    if (!user) return res.status(401).json({ message: 'Utilisateur introuvable.' });
    req.user = user;
    next();
  } catch {
    return res.status(401).json({ message: 'Token invalide ou expiré.' });
  }
}

// Restreint l'accès à certains rôles (RBAC)
function authorize(...roles) {
  return (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return res.status(403).json({ message: 'Accès refusé pour ce rôle.' });
    }
    next();
  };
}

module.exports = { protect, authorize };
