// Contenu de secours : affiché tant que l'API/la base ne renvoie rien,
// pour que le site soit beau dès `npm run dev`, avant même le seed.
// Les images pointent vers l'ancien CDN — une fois la migration + le seed faits,
// le site utilise automatiquement TES images Cloudinary via l'API.

const ZY = 'https://assets.zyrosite.com/cdn-cgi/image/format=auto';
const ACC = 'nwIChs7HMox7Hz0s';
const z = (file, w = 1024) => `${ZY},w=${w},fit=crop/${ACC}/${file}`;

const F = {
  chambre: 'chambre-double-OjdHWfOx8QZXrp0e.jpg',
  chambre2: 'chambre-double-angle-droit2-qe9DDZGU4pkB5Z60.jpg',
  pool: 'pool-ak-2-RaUrdBxrXIdB0D8d.jpg',
  bar: 'bar-ak-facing-F7esSIOngkgNma4N.jpg',
  balcon: 'balcon-1-JlPNJdCn0sChrZP5.jpg',
  vuePiscine: 'vue-piscine-de-laterrasse-oXYBPhqg9ZCfLYLe.jpg',
  cascade: 'cascade-piscine-ak-A48BoroRUxR4Mmc7.jpg',
  exterieur: 'img_20260401_123640_800-FuAD4ju3qLFv9VW4.jpg',
  devanture: 'devanture-ak1-qrNqIRHeUwxfQkVq.jpg',
};

export const defaultSettings = {
  promoBanner: { text: 'Offres spéciales jusqu\'à -20 % sur vos séjours', active: true },
  hero: {
    title: 'Afrika Keur',
    subtitle:
      'Boutique hôtel 3★ à Saly — l\'authenticité africaine, le confort chaleureux, face à la Petite Côte.',
    image: { url: z(F.vuePiscine, 1920) },
  },
  about: {
    title: 'La teranga, élevée en art de recevoir',
    text: 'Afrika Keur est un refuge afro-chic au cœur de Saly. Entre indigo, bois et lumière dorée, chaque détail cultive l\'hospitalité sénégalaise — la teranga — dans le confort feutré d\'un boutique hôtel.',
    image: { url: z(F.vuePiscine, 900) },
  },
  cta: {
    image: { url: z(F.cascade, 1200) },
  },
  dining: {
    bar: { url: z(F.bar, 900) },
    resto: { url: z(F.cascade, 900) },
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
      meta: ['Boutique hôtel 3★', 'Piscine à cascade', "Bar Le Comptoir d'Afrika"],
    },
    services: {
      eyebrow: "L'expérience",
      title: 'Tout pour un séjour chaleureux',
      lead:
        "De la piscine à cascade au bar Le Comptoir d'Afrika, chaque service prolonge l'art de recevoir.",
    },
    gallery: {
      eyebrow: 'En images',
      title: 'Un écrin afro-chic',
    },
    rooms: {
      eyebrow: 'Nos chambres',
      title: 'Confort et caractère',
      link: 'Toutes les chambres',
    },
    reviews: {
      eyebrow: 'Ils ont séjourné',
      title: 'La parole à nos hôtes',
    },
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
};

export const defaultServices = [
  { _id: 's1', title: 'Piscine à cascade', description: 'Détendez-vous dans notre piscine à débordement, rythmée par une cascade apaisante.', image: { url: z(F.pool, 768) } },
  { _id: 's2', title: 'Le Comptoir d\'Afrika', description: 'Un bar vibrant pour savourer cocktails signatures et jus frais dans une ambiance authentique.', image: { url: z(F.bar, 768) } },
  { _id: 's3', title: 'Restaurant', description: 'Une cuisine qui marie saveurs sénégalaises et classiques du monde, préparée avec des produits locaux.', image: { url: z(F.cascade, 768) } },
  { _id: 's4', title: 'Terrasse & vue', description: 'Une terrasse baignée de lumière, parfaite pour un petit-déjeuner ou un verre au coucher du soleil.', image: { url: z(F.vuePiscine, 768) } },
];

export const defaultRooms = [
  {
    _id: 'r1', name: 'Chambre Double Confort', slug: 'chambre-double-confort',
    description: 'Une chambre chaleureuse aux tons sable et indigo, pensée pour un séjour reposant. Literie premium, lumière douce et salle de bain privée.',
    price: 35000, capacity: 2, size: 22,
    amenities: ['Climatisation', 'Wifi gratuit', 'Salle de bain privée', 'TV écran plat', 'Petit-déjeuner inclus'],
    images: [{ url: z(F.chambre, 900) }, { url: z(F.chambre2, 900) }], featured: true,
  },
  {
    _id: 'r2', name: 'Suite Balcon Vue Piscine', slug: 'suite-balcon-vue-piscine',
    description: 'Notre suite avec balcon privatif ouvert sur la piscine à cascade. Espace généreux, coin salon et vue apaisante sur les jardins.',
    price: 55000, capacity: 3, size: 32,
    amenities: ['Climatisation', 'Wifi gratuit', 'Balcon privatif', 'Vue piscine', 'Coffre-fort', 'Petit-déjeuner inclus'],
    images: [{ url: z(F.balcon, 900) }, { url: z(F.vuePiscine, 900) }], featured: true,
  },
  {
    _id: 'r3', name: 'Chambre Familiale', slug: 'chambre-familiale',
    description: 'Idéale pour les familles : un espace modulable et confortable, à quelques pas de la piscine et du restaurant.',
    price: 65000, capacity: 4, size: 40,
    amenities: ['Climatisation', 'Wifi gratuit', 'Salle de bain privée', 'TV écran plat', 'Coffre-fort', 'Petit-déjeuner inclus'],
    images: [{ url: z(F.chambre2, 900) }, { url: z(F.balcon, 900) }], featured: false,
  },
];

export const defaultReviews = [
  { _id: 'a1', author: 'Aminata D.', country: 'Sénégal', rating: 5, text: 'Un accueil chaleureux et une décoration magnifique. La piscine est un vrai bonheur. On reviendra !' },
  { _id: 'a2', author: 'Julien & Claire', country: 'France', rating: 5, text: 'Boutique hôtel plein de charme, à taille humaine. Le personnel est aux petits soins, le bar excellent.' },
  { _id: 'a3', author: 'Mariama S.', country: 'Sénégal', rating: 4, text: 'Très bon séjour, chambre confortable et calme. Emplacement idéal pour découvrir Saly.' },
  { _id: 'a4', author: 'Thomas B.', country: 'Belgique', rating: 5, text: 'La teranga dans toute sa splendeur. Cadre reposant, cuisine savoureuse. Coup de cœur.' },
];

// Galerie (mix des photos de l'hôtel)
export const defaultGallery = [
  { url: z(F.vuePiscine, 1400), alt: 'Vue sur la piscine depuis la terrasse', span: 'g-tall' },
  { url: z(F.cascade, 1400), alt: 'Cascade de la piscine', span: 'g-wide' },
  { url: z(F.chambre, 900), alt: 'Chambre double', span: 'g-box' },
  { url: z(F.bar, 900), alt: 'Le Comptoir d\'Afrika', span: 'g-box' },
  { url: z(F.balcon, 1000), alt: 'Balcon avec vue', span: 'g-wide' },
  { url: z(F.devanture, 900), alt: 'Devanture de l\'hôtel', span: 'g-box' },
  { url: z(F.exterieur, 900), alt: 'Extérieur de l\'hôtel', span: 'g-box' },
];

export const galleryImages = defaultGallery;
