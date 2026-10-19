import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';

import Layout from './components/Layout';
import Home from './pages/Home';
import Rooms from './pages/Rooms';
import Dining from './pages/Dining';
import Services from './pages/Services';
import Reviews from './pages/Reviews';
import Location from './pages/Location';
import Reservation from './pages/Reservation';

import AdminLayout from './admin/AdminLayout';
import Login from './admin/Login';
import Dashboard from './admin/Dashboard';
import AdminReservations from './admin/Reservations';
import Settings from './admin/Settings';
import ResourceManager from './admin/ResourceManager';
import { roomsConfig, servicesConfig, reviewsConfig } from './admin/configs';

export default function App() {
  return (
    <AuthProvider>
      <Routes>
        {/* Site public */}
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="chambres" element={<Rooms />} />
          <Route path="restauration" element={<Dining />} />
          <Route path="services" element={<Services />} />
          <Route path="avis" element={<Reviews />} />
          <Route path="localisation" element={<Location />} />
          <Route path="reservation" element={<Reservation />} />
        </Route>

        {/* Administration */}
        <Route path="/admin/login" element={<Login />} />
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="reservations" element={<AdminReservations />} />
          <Route path="chambres" element={<ResourceManager config={roomsConfig} />} />
          <Route path="services" element={<ResourceManager config={servicesConfig} />} />
          <Route path="avis" element={<ResourceManager config={reviewsConfig} />} />
          <Route path="parametres" element={<Settings />} />
        </Route>

        {/* 404 simple */}
        <Route
          path="*"
          element={
            <div style={{ minHeight: '60vh', display: 'grid', placeItems: 'center', paddingTop: '6rem' }}>
              <div style={{ textAlign: 'center' }}>
                <h1 style={{ fontSize: '3rem' }}>404</h1>
                <p style={{ color: 'var(--muted)' }}>Page introuvable.</p>
                <a href="/" className="btn" style={{ marginTop: '1.5rem' }}>Retour à l'accueil</a>
              </div>
            </div>
          }
        />
      </Routes>
    </AuthProvider>
  );
}
