import axios from 'axios';

const api = axios.create({
  baseURL: '/api',
});

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
