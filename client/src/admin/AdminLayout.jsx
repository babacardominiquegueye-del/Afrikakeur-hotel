import { NavLink, Outlet, useNavigate, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const nav = [
  { to: '/admin', label: 'Tableau de bord', end: true },
  { to: '/admin/reservations', label: 'Réservations' },
  { to: '/admin/chambres', label: 'Chambres' },
  { to: '/admin/services', label: 'Services' },
  { to: '/admin/avis', label: 'Avis' },
  { to: '/admin/parametres', label: 'Paramètres' },
];

export default function AdminLayout() {
  const { user, loading, logout } = useAuth();
  const navigate = useNavigate();

  if (loading) {
    return (
      <div style={{ minHeight: '100vh', display: 'grid', placeItems: 'center', background: '#16203b', color: '#f3ead8' }}>
        Chargement…
      </div>
    );
  }
  if (!user) return <Navigate to="/admin/login" replace />;

  function handleLogout() {
    logout();
    navigate('/admin/login');
  }

  return (
    <div className="admin">
      <aside className="admin__side">
        <div className="brand">
          Afrika<span style={{ color: 'var(--amber)' }}>Keur</span>
        </div>
        <nav className="admin__nav">
          {nav.map((n) => (
            <NavLink key={n.to} to={n.to} end={n.end}>
              {n.label}
            </NavLink>
          ))}
        </nav>
        <button className="admin__logout" onClick={handleLogout}>
          Déconnexion ({user.name})
        </button>
      </aside>
      <main className="admin__main">
        <Outlet />
      </main>
    </div>
  );
}
