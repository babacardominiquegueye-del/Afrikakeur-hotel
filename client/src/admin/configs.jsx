import { fcfa } from '../lib/format';

const slugify = (s) =>
  (s || '')
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');

export const roomsConfig = {
  endpoint: '/rooms',
  title: 'Chambres',
  singular: 'chambre',
  columns: [
    { key: 'name', label: 'Nom' },
    { key: 'price', label: 'Prix', render: (r) => fcfa(r.price) },
    { key: 'capacity', label: 'Capacité', render: (r) => `${r.capacity} pers.` },
    { key: 'featured', label: 'En avant', render: (r) => (r.featured ? '★' : '—') },
  ],
  fields: [
    { key: 'name', label: 'Nom', type: 'text' },
    { key: 'slug', label: 'Slug (URL)', type: 'text' },
    { key: 'description', label: 'Description', type: 'textarea', full: true },
    { key: 'price', label: 'Prix / nuit (FCFA)', type: 'number' },
    { key: 'capacity', label: 'Capacité (personnes)', type: 'number' },
    { key: 'size', label: 'Surface (m²)', type: 'number' },
    { key: 'amenities', label: 'Équipements', type: 'tags', full: true },
    { key: 'images', label: 'Photos', type: 'images', full: true },
    { key: 'order', label: 'Ordre d\'affichage', type: 'number' },
    { key: 'featured', label: 'Mise en avant', type: 'checkbox', checkboxLabel: 'Afficher en page d\'accueil' },
  ],
  makeEmpty: () => ({
    name: '',
    slug: '',
    description: '',
    price: 0,
    capacity: 2,
    size: 0,
    amenities: [],
    images: [],
    order: 0,
    featured: false,
  }),
};

export const servicesConfig = {
  endpoint: '/services',
  title: 'Services',
  singular: 'service',
  columns: [
    { key: 'title', label: 'Titre' },
    { key: 'order', label: 'Ordre' },
  ],
  fields: [
    { key: 'title', label: 'Titre', type: 'text' },
    { key: 'description', label: 'Description', type: 'textarea', full: true },
    { key: 'image', label: 'Image', type: 'image', full: true },
    { key: 'order', label: 'Ordre d\'affichage', type: 'number' },
  ],
  makeEmpty: () => ({ title: '', description: '', image: null, order: 0 }),
};

export const reviewsConfig = {
  endpoint: '/reviews',
  title: 'Avis',
  singular: 'avis',
  columns: [
    { key: 'author', label: 'Auteur' },
    { key: 'country', label: 'Pays' },
    { key: 'rating', label: 'Note', render: (r) => '★'.repeat(r.rating) },
    { key: 'published', label: 'Publié', render: (r) => (r.published ? 'Oui' : 'Non') },
  ],
  fields: [
    { key: 'author', label: 'Auteur', type: 'text' },
    { key: 'country', label: 'Pays', type: 'text' },
    { key: 'rating', label: 'Note (1-5)', type: 'number' },
    { key: 'text', label: 'Témoignage', type: 'textarea', full: true },
    { key: 'published', label: 'Publication', type: 'checkbox', checkboxLabel: 'Visible sur le site' },
  ],
  makeEmpty: () => ({ author: '', country: '', rating: 5, text: '', published: true }),
};

export { slugify };
