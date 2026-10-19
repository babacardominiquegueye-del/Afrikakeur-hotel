# Afrika Keur — Site + Back-office (MERN)

Site vitrine du boutique hôtel **Afrika Keur** (Saly, Sénégal) et son back-office d'administration.

**Stack :** React + Vite · Node.js + Express · MongoDB (Mongoose) · Cloudinary · JWT/RBAC · Nodemailer.

---

## 1. Prérequis

- Node.js 18+ (testé sur Node 22)
- Un cluster MongoDB (MongoDB Atlas gratuit convient)
- Un compte Cloudinary (gratuit)
- Un accès SMTP pour l'envoi des emails de réservation (Hostinger, Gmail app password, etc.) — optionnel

## 2. Installation

```bash
# à la racine du projet
npm run install:all
```

(équivaut à `npm install` dans `server/` puis dans `client/`)

## 3. Configuration

Copie le fichier d'exemple et remplis-le :

```bash
cp server/.env.example server/.env
```

Renseigne au minimum : `MONGODB_URI`, `JWT_SECRET`, `ADMIN_EMAIL`, `ADMIN_PASSWORD`, et les 3 clés `CLOUDINARY_*`.
Le SMTP est facultatif (sans lui, les réservations sont quand même enregistrées, seul l'email n'est pas envoyé).

## 4. Importer les photos vers Cloudinary (une seule fois)

Récupère les photos de l'ancien site et les envoie dans **ton** Cloudinary (dossier `afrika-keur/`) :

```bash
npm run migrate:photos
```

## 5. Remplir la base (contenu initial)

Crée le compte admin + insère chambres, services, avis et paramètres :

```bash
npm run seed
```

> Le seed construit les URLs d'images à partir de `CLOUDINARY_CLOUD_NAME` et des photos importées à l'étape 4. Lance donc la migration **avant** le seed.

## 6. Lancer en développement

```bash
npm run dev
```

- Front : http://localhost:5173
- API : http://localhost:5000
- Back-office : http://localhost:5173/admin (connexion avec `ADMIN_EMAIL` / `ADMIN_PASSWORD`)

Le proxy Vite redirige automatiquement `/api` vers le backend.

---

## Structure

```
afrika-keur/
├── server/            API Express
│   ├── config/        connexion Mongo + Cloudinary
│   ├── models/        User, Room, Service, Review, Reservation, SiteSettings
│   ├── middleware/    auth (JWT + RBAC), upload (multer → Cloudinary)
│   ├── routes/        auth, rooms, services, reviews, reservations, settings, upload
│   ├── utils/         mailer (nodemailer)
│   └── scripts/       migrate-photos-to-cloudinary.js, seed.js
└── client/            App React (Vite)
    └── src/
        ├── components/  Navbar, Footer, Layout, cartes, galerie…
        ├── pages/       Accueil, Chambres, Restauration, Services, Avis, Localisation, Réservation
        ├── admin/       back-office (login, dashboard, CRUD, paramètres)
        ├── styles/      design system (indigo + sable + safran)
        └── data/        contenu de secours (rendu avant le seed)
```

## Notes

- **Réservation** : vrai formulaire (`/reservation`) qui enregistre la demande en base et envoie un email — plus de Google Forms.
- **Réseaux sociaux** : configurables depuis l'admin (Paramètres). Un champ vide masque le réseau.
- **SEO** : `<title>` et meta description par page, balises Open Graph dans `client/index.html`.
- **Image de partage (og:image)** : dans `client/index.html`, remplace `res.cloudinary.com/demo/...` par ton `cloud_name` Cloudinary une fois la migration faite.
- **Déploiement** : front sur Vercel/Netlify, API sur Render, base sur MongoDB Atlas. Pense à définir `CLIENT_URL` (CORS) et à faire pointer le front vers l'URL de l'API en production.
