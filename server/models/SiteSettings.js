const mongoose = require('mongoose');

const settingsSchema = new mongoose.Schema(
  {
    key: { type: String, default: 'main', unique: true }, // singleton
    promoBanner: {
      text: { type: String, default: 'Offres spéciales jusqu\'à -20 %' },
      active: { type: Boolean, default: true },
    },
    hero: {
      title: { type: String, default: 'Afrika Keur' },
      subtitle: {
        type: String,
        default: 'Boutique hôtel 3★ — l\'authenticité africaine, le confort chaleureux, au cœur de Saly.',
      },
      image: { url: String, public_id: String },
    },
    about: {
      title: { type: String, default: 'Bienvenue à Afrika Keur' },
      text: {
        type: String,
        default:
          'Un refuge afro-chic au cœur de Saly, où l\'authenticité africaine rencontre le confort d\'un boutique hôtel chaleureux.',
      },
      image: { url: String, public_id: String },
    },
    cta: {
      image: { url: String, public_id: String },
    },
    dining: {
      bar: { url: String, public_id: String },
      resto: { url: String, public_id: String },
    },
    gallery: [
      {
        url: { type: String, required: true },
        public_id: String,
        alt: String,
        span: { type: String, default: 'g-box' },
      },
    ],
    contact: {
      email: { type: String, default: 'reservations@hotelafrikakeur.sn' },
      phone: { type: String, default: '+221 78 435 42 74' },
      address: { type: String, default: 'Zone des Anacardiers, face Neptune, Saly, Sénégal' },
      mapEmbed: { type: String, default: '' }, // URL d'iframe Google Maps
    },
    social: {
      facebook: { type: String, default: '' },
      instagram: { type: String, default: '' },
      tiktok: { type: String, default: '' },
      twitter: { type: String, default: '' },
    },
    home: {
      hero: {
        eyebrow: { type: String, default: 'Saly · Petite Côte · Sénégal' },
        btnPrimary: { type: String, default: 'Réserver un séjour' },
        btnSecondary: { type: String, default: 'Voir les chambres' },
        scroll: { type: String, default: 'Découvrir' },
        meta: [{ type: String }],
      },
      services: {
        eyebrow: { type: String, default: 'L\'expérience' },
        title: { type: String, default: 'Tout pour un séjour chaleureux' },
        lead: {
          type: String,
          default:
            'De la piscine à cascade au bar Le Comptoir d\'Afrika, chaque service prolonge l\'art de recevoir.',
        },
      },
      gallery: {
        eyebrow: { type: String, default: 'En images' },
        title: { type: String, default: 'Un écrin afro-chic' },
      },
      rooms: {
        eyebrow: { type: String, default: 'Nos chambres' },
        title: { type: String, default: 'Confort et caractère' },
        link: { type: String, default: 'Toutes les chambres' },
      },
      reviews: {
        eyebrow: { type: String, default: 'Ils ont séjourné' },
        title: { type: String, default: 'La parole à nos hôtes' },
      },
      cta: {
        eyebrow: { type: String, default: 'Votre séjour vous attend' },
        title: { type: String, default: 'Réservez votre parenthèse à Saly' },
        btn: { type: String, default: 'Demander une réservation' },
      },
      aboutStats: [
        {
          value: { type: String, default: '' },
          label: { type: String, default: '' },
        },
      ],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('SiteSettings', settingsSchema);
