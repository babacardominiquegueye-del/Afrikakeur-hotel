import { useEffect, useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import api from '../api/axios';
import { defaultSettings } from '../data/defaultData';
import Navbar from './Navbar';
import Footer from './Footer';

export default function Layout() {
  const [settings, setSettings] = useState(defaultSettings);
  const location = useLocation();

  useEffect(() => {
    api
      .get('/settings')
      .then((res) => res.data && setSettings(res.data))
      .catch(() => {}); // on garde le contenu de secours
  }, []);

  // Remonte en haut à chaque changement de page
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' in window ? 'instant' : 'auto' });
  }, [location.pathname]);

  return (
    <>
      <Navbar promoActive={false} />
      <main>
        <Outlet context={{ settings }} />
      </main>
      <Footer settings={settings} />
    </>
  );
}
