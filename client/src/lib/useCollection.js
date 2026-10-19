import { useEffect, useState } from 'react';
import api from '../api/axios';

// Récupère une liste depuis l'API ; si vide ou en erreur, utilise les données de secours.
export function useCollection(endpoint, fallback = []) {
  const [data, setData] = useState(fallback);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let alive = true;
    api
      .get(endpoint)
      .then((res) => {
        if (!alive) return;
        if (Array.isArray(res.data) && res.data.length) setData(res.data);
      })
      .catch(() => {})
      .finally(() => alive && setLoading(false));
    return () => {
      alive = false;
    };
  }, [endpoint]);

  return { data, loading };
}
