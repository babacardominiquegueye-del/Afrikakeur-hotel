require('dotenv').config();
const mongoose = require('mongoose');
const connectDB = require('../config/db');
const User = require('../models/User');
const Room = require('../models/Room');
const Service = require('../models/Service');
const Review = require('../models/Review');
const SiteSettings = require('../models/SiteSettings');

// Photos officielles HD de l'hôtel, servies par le CDN Zyrosite (source haute résolution)
const ZY = 'https://assets.zyrosite.com/cdn-cgi/image/format=auto';
const ACC = 'nwIChs7HMox7Hz0s';
const zy = (file, w = 1920) => ({
  url: `${ZY},w=${w},fit=crop/${ACC}/${file}`,
  public_id: null,
});
const F = {
  chambre: 'chambre-double-OjdHWfOx8QZXrp0e.jpg',
  chambre2: 'chambre-double-angle-droit2-qe9DDZGU4pkB5Z60.jpg',
  balcon: 'balcon-1-JlPNJdCn0sChrZP5.jpg',
  vuePiscine: 'vue-piscine-de-laterrasse-oXYBPhqg9ZCfLYLe.jpg',
  pool: 'pool-ak-2-RaUrdBxrXIdB0D8d.jpg',
  bar: 'bar-ak-facing-F7esSIOngkgNma4N.jpg',
  cascade: 'cascade-piscine-ak-A48BoroRUxR4Mmc7.jpg',
  devanture: 'devanture-ak1-qrNqIRHeUwxfQkVq.jpg',
};

async function run() {
  await connectDB();
  console.log('🌱 Seed en cours...');

  // --- Admin ---
  const email = (process.env.ADMIN_EMAIL || 'admin@hotelafrikakeur.sn').toLowerCase();
  const password = process.env.ADMIN_PASSWORD || 'change-moi';
  let admin = await User.findOne({ email }).select('+password');
  if (!admin) {
    admin = await User.create({ name: 'Administrateur', email, password, role: 'admin' });
    console.log(`   👤 Admin créé : ${email}`);
  } else {
    if (!(await admin.matchPassword(password))) {
      admin.password = password;
      await admin.save();
      console.log(`   🔑 Mot de passe admin resynchronisé depuis .env`);
    }
    console.log(`   👤 Admin déjà présent : ${email}`);
  }

  // --- Settings (singleton) ---
  await SiteSettings.findOneAndUpdate(
    { key: 'main' },
    {
      key: 'main',
      promoBanner: { text: 'Offres spéciales jusqu\'à -20 % sur vos séjours', active: true },
      hero: {
        title: 'Afrika Keur',
        subtitle:
          'Boutique hôtel 3★ à Saly — l\'authenticité africaine, le confort chaleureux, face à la Petite Côte.',
        image: zy(F.devanture),
      },
      about: {
        title: 'La teranga, élevée en art de recevoir',
        text: 'Afrika Keur est un refuge afro-chic au cœur de Saly. Entre indigo, bois et lumière dorée, chaque détail cultive l\'hospitalité sénégalaise — la teranga — dans le confort feutré d\'un boutique hôtel.',
      },
      contact: {
        email: 'reservations@hotelafrikakeur.sn',
        phone: '+221 78 435 42 74',
        address: 'Zone des Anacardiers, face Neptune, Saly, Sénégal',
        mapEmbed:
          'https://www.google.com/maps?q=Afrika%20Keur%2C%20Zone%20des%20Anacardiers%2C%20Saly%2C%20Senegal&output=embed',
      },
      social: { facebook: '', instagram: '', tiktok: '', twitter: '' },
      home: {
        hero: {
          eyebrow: 'Saly · Petite Côte · Sénégal',
          btnPrimary: 'Réserver un séjour',
          btnSecondary: 'Voir les chambres',
          scroll: 'Découvrir',
          meta: ['Boutique hôtel 3★', 'Piscine à cascade', 'Bar Le Comptoir d\'Afrika'],
        },
        services: {
          eyebrow: 'L\'expérience',
          title: 'Tout pour un séjour chaleureux',
          lead: 'De la piscine à cascade au bar Le Comptoir d\'Afrika, chaque service prolonge l\'art de recevoir.',
        },
        gallery: { eyebrow: 'En images', title: 'Un écrin afro-chic' },
        rooms: { eyebrow: 'Nos chambres', title: 'Confort et caractère', link: 'Toutes les chambres' },
        reviews: { eyebrow: 'Ils ont séjourné', title: 'La parole à nos hôtes' },
        cta: {
          eyebrow: 'Votre séjour vous attend',
          title: 'Réservez votre parenthèse à Saly',
          btn: 'Demander une réservation',
        },
        aboutStats: [
          { value: '3★', label: 'Boutique hôtel' },
          { value: 'Saly', label: 'Cœur de la Petite Côte' },
        ],
      },
    },
    { upsert: true, new: true, setDefaultsOnInsert: true }
  );
  console.log('   ⚙️  Paramètres du site enregistrés');

  // --- Rooms ---
  await Room.deleteMany({});
  await Room.insertMany([
    {
      name: 'Chambre Double Confort',
      slug: 'chambre-double-confort',
      description:
        'Une chambre chaleureuse aux tons sable et indigo, pensée pour un séjour reposant. Literie premium, lumière douce et salle de bain privée.',
      price: 35000,
      capacity: 2,
      size: 22,
      amenities: ['Climatisation', 'Wifi gratuit', 'Salle de bain privée', 'TV écran plat', 'Petit-déjeuner inclus'],
      images: [zy(F.chambre), zy(F.chambre2)],
      featured: true,
      order: 1,
    },
    {
      name: 'Suite Balcon Vue Piscine',
      slug: 'suite-balcon-vue-piscine',
      description:
        'Notre suite avec balcon privatif ouvert sur la piscine à cascade. Espace généreux, coin salon et vue apaisante sur les jardins.',
      price: 55000,
      capacity: 3,
      size: 32,
      amenities: ['Climatisation', 'Wifi gratuit', 'Balcon privatif', 'Vue piscine', 'Coffre-fort', 'Petit-déjeuner inclus'],
      images: [zy(F.balcon), zy(F.vuePiscine)],
      featured: true,
      order: 2,
    },
    {
      name: 'Chambre Familiale',
      slug: 'chambre-familiale',
      description:
        'Idéale pour les familles : un espace modulable et confortable, à quelques pas de la piscine et du restaurant.',
      price: 65000,
      capacity: 4,
      size: 40,
      amenities: ['Climatisation', 'Wifi gratuit', 'Salle de bain privée', 'TV écran plat', 'Coffre-fort', 'Petit-déjeuner inclus'],
      images: [zy(F.chambre2), zy(F.balcon)],
      featured: false,
      order: 3,
    },
  ]);
  console.log('   🛏️  Chambres insérées');

  // --- Services ---
  await Service.deleteMany({});
  await Service.insertMany([
    {
      title: 'Piscine à cascade',
      description: 'Détendez-vous dans notre piscine à débordement, rythmée par une cascade apaisante.',
      image: zy(F.pool),
      order: 1,
    },
    {
      title: 'Le Comptoir d\'Afrika',
      description: 'Un bar vibrant pour savourer cocktails signatures et jus frais dans une ambiance authentique.',
      image: zy(F.bar),
      order: 2,
    },
    {
      title: 'Restaurant',
      description: 'Une cuisine qui marie saveurs sénégalaises et classiques du monde, préparée avec des produits locaux.',
      image: zy(F.cascade),
      order: 3,
    },
    {
      title: 'Terrasse & vue',
      description: 'Une terrasse baignée de lumière, parfaite pour un petit-déjeuner ou un verre au coucher du soleil.',
      image: zy(F.vuePiscine),
      order: 4,
    },
  ]);
  console.log('   ✨ Services insérés');

  // --- Reviews ---
  await Review.deleteMany({});
  await Review.insertMany([
    {
      author: 'Aminata D.',
      country: 'Sénégal',
      rating: 5,
      text: 'Un accueil chaleureux et une décoration magnifique. La piscine est un vrai bonheur. On reviendra !',
    },
    {
      author: 'Julien & Claire',
      country: 'France',
      rating: 5,
      text: 'Boutique hôtel plein de charme, à taille humaine. Le personnel est aux petits soins, le bar excellent.',
    },
    {
      author: 'Mariama S.',
      country: 'Sénégal',
      rating: 4,
      text: 'Très bon séjour, chambre confortable et calme. Emplacement idéal pour découvrir Saly.',
    },
    {
      author: 'Thomas B.',
      country: 'Belgique',
      rating: 5,
      text: 'La teranga dans toute sa splendeur. Cadre reposant, cuisine savoureuse. Coup de cœur.',
    },
  ]);
  console.log('   ⭐ Avis insérés');

  console.log('✅ Seed terminé.');
  await mongoose.connection.close();
  process.exit(0);
}

run().catch((e) => {
  console.error('❌ Seed échoué :', e);
  process.exit(1);
});
