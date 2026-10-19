import { useEffect, useState } from 'react';
import { NavLink, Link } from 'react-router-dom';

const links = [
  { to: '/', label: 'Accueil', end: true },
  { to: '/chambres', label: 'Chambres' },
  { to: '/restauration', label: 'Restauration' },
  { to: '/services', label: 'Services' },
  { to: '/avis', label: 'Avis' },
  { to: '/localisation', label: 'Localisation' },
];

export default function Navbar({ promoActive }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav
      className={`nav ${scrolled ? 'nav--scrolled' : ''} ${promoActive ? 'nav--promo' : ''}`}
    >
      <div className="container nav__inner">
        <Link to="/" className="brand" onClick={() => setOpen(false)}>
          Afrika<span>Keur</span>
        </Link>

        <ul className={`nav__links ${open ? 'open' : ''}`}>
          {links.map((l) => (
            <li key={l.to}>
              <NavLink to={l.to} end={l.end} onClick={() => setOpen(false)}>
                {l.label}
              </NavLink>
            </li>
          ))}
          <li>
            <Link to="/reservation" className="btn nav__cta" onClick={() => setOpen(false)}>
              Réserver
            </Link>
          </li>
        </ul>

        <button
          className={`nav__burger ${open ? 'open' : ''}`}
          onClick={() => setOpen((v) => !v)}
          aria-label="Menu"
          aria-expanded={open}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </nav>
  );
}
