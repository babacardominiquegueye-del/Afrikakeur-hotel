const multer = require('multer');
const streamifier = require('streamifier');
const cloudinary = require('../config/cloudinary');

// On garde le fichier en mémoire puis on le pousse vers Cloudinary en streaming
const storage = multer.memoryStorage();

const upload = multer({
  storage,
  limits: { fileSize: 8 * 1024 * 1024 }, // 8 Mo max
  fileFilter: (req, file, cb) => {
    if (/^image\/(jpe?g|png|webp|gif|avif)$/.test(file.mimetype)) cb(null, true);
    else {
      const err = new Error('Format d\'image non supporté.');
      err.status = 400;
      cb(err);
    }
  },
});

// Envoie un buffer vers Cloudinary et renvoie { url, public_id }
function streamToCloudinary(buffer, folder = 'afrika-keur') {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder, resource_type: 'image' },
      (err, result) => {
        if (err) return reject(err);
        resolve({ url: result.secure_url, public_id: result.public_id });
      }
    );
    streamifier.createReadStream(buffer).pipe(stream);
  });
}

module.exports = { upload, streamToCloudinary };
