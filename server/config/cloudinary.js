const { v2: cloudinary } = require('cloudinary');

// Supporte CLOUDINARY_URL (auto) OU les 3 variables séparées
if (!process.env.CLOUDINARY_URL) {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });
}

const cfg = cloudinary.config();
if (!cfg.cloud_name || !cfg.api_key || !cfg.api_secret) {
  console.warn('⚠️  Config Cloudinary incomplète — les uploads échoueront tant que .env n\'est pas rempli.');
}

module.exports = cloudinary;
