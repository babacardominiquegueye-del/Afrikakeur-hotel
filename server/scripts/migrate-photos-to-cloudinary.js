// Récupère les photos de l'ancien site (Hostinger/Zyro) et les envoie
// dans TON Cloudinary. À lancer UNE SEULE FOIS : npm run migrate:photos
require('dotenv').config();
const { v2: cloudinary } = require('cloudinary');

if (!process.env.CLOUDINARY_URL) {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });
}
const cfg = cloudinary.config();
if (!cfg.cloud_name || !cfg.api_key || !cfg.api_secret) {
  console.error('❌ Config Cloudinary manquante. Vérifie ton .env.');
  process.exit(1);
}

const FOLDER = 'afrika-keur';
const ZYRO_BASE = 'https://assets.zyrosite.com';
const ACCOUNT = 'nwIChs7HMox7Hz0s';

const PHOTOS = [
  ['chambre-double', 'chambre-double-OjdHWfOx8QZXrp0e.jpg'],
  ['piscine-cascade', 'pool-ak-2-RaUrdBxrXIdB0D8d.jpg'],
  ['bar-comptoir-afrika', 'bar-ak-facing-F7esSIOngkgNma4N.jpg'],
  ['balcon', 'balcon-1-JlPNJdCn0sChrZP5.jpg'],
  ['vue-piscine-terrasse', 'vue-piscine-de-laterrasse-oXYBPhqg9ZCfLYLe.jpg'],
  ['cascade-piscine', 'cascade-piscine-ak-A48BoroRUxR4Mmc7.jpg'],
  ['exterieur-avril', 'img_20260401_123640_800-FuAD4ju3qLFv9VW4.jpg'],
  ['devanture', 'devanture-ak1-qrNqIRHeUwxfQkVq.jpg'],
  ['chambre-double-2', 'chambre-double-angle-droit2-qe9DDZGU4pkB5Z60.jpg'],
];

const originalUrl = (file) => `${ZYRO_BASE}/${ACCOUNT}/${file}`;
const fallbackUrl = (file) =>
  `${ZYRO_BASE}/cdn-cgi/image/format=auto,w=1920,fit=crop/${ACCOUNT}/${file}`;

async function uploadOne(publicId, file) {
  const opts = { folder: FOLDER, public_id: publicId, overwrite: true, resource_type: 'image' };
  try {
    return await cloudinary.uploader.upload(originalUrl(file), opts);
  } catch {
    return await cloudinary.uploader.upload(fallbackUrl(file), opts);
  }
}

(async () => {
  console.log(`📤 Migration de ${PHOTOS.length} photos vers Cloudinary (dossier "${FOLDER}")...\n`);
  const results = [];
  for (const [publicId, file] of PHOTOS) {
    try {
      const res = await uploadOne(publicId, file);
      results.push({ public_id: res.public_id, url: res.secure_url });
      console.log(`✅ ${res.public_id}\n   ${res.secure_url}`);
    } catch (e) {
      console.error(`❌ Échec ${publicId} (${file}) : ${e.message}`);
    }
  }
  console.log(`\n✨ Terminé : ${results.length}/${PHOTOS.length} photos importées.`);
})();
