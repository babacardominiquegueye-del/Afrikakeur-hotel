import axios from 'axios';

// VITE_API_URL peut être vide (proxy /api), une origine seule, ou déjà suffixée de /api
const raw = (import.meta.env.VITE_API_URL || '').trim().replace(/\/+$/, '');
const baseURL = !raw ? '/api' : /\/api$/.test(raw) ? raw : `${raw}/api`;

const api = axios.create({ baseURL });

// Ajoute le token JWT à chaque requête si présent
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('ak_token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Déconnexion automatique si le token est refusé
api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401 && localStorage.getItem('ak_token')) {
      localStorage.removeItem('ak_token');
      if (window.location.pathname.startsWith('/admin')) {
        window.location.href = '/admin/login';
      }
    }
    return Promise.reject(err);
  }
);

export default api;
