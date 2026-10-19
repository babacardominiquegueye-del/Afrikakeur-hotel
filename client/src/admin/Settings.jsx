import { useEffect, useState } from 'react';
import api from '../api/axios';
import ImageUploader from './ImageUploader';
import { defaultSettings, defaultGallery } from '../data/defaultData';

export default function Settings() {
  const [s, setS] = useState(null);
  const [msg, setMsg] = useState(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    api
      .get('/settings')
      .then((res) => {
        const d = defaultSettings.home;
        const home = res.data.home || {};
        setS({
          ...res.data,
          gallery: res.data.gallery?.length ? res.data.gallery : defaultGallery,
          home: {
            hero: { ...d.hero, ...(home.hero || {}) },
            services: { ...d.services, ...(home.services || {}) },
            gallery: { ...d.gallery, ...(home.gallery || {}) },
            rooms: { ...d.rooms, ...(home.rooms || {}) },
            reviews: { ...d.reviews, ...(home.reviews || {}) },
            cta: { ...d.cta, ...(home.cta || {}) },
            aboutStats: home.aboutStats?.length ? home.aboutStats : d.aboutStats,
          },
        });
      })
      .catch(() => setMsg({ t: 'err', m: 'Chargement impossible.' }));
  }, []);

  if (!s) return <div className="admin__head"><h1>Paramètres</h1></div>;

  const sub = (group, key, val) => setS({ ...s, [group]: { ...s[group], [key]: val } });
  const homeSub = (group, key, val) =>
    setS({ ...s, home: { ...s.home, [group]: { ...s.home[group], [key]: val } } });
  const setStat = (i, key, val) =>
    setS({
      ...s,
      home: {
        ...s.home,
        aboutStats: s.home.aboutStats.map((st, idx) =>
          idx === i ? { ...st, [key]: val } : st
        ),
      },
    });

  async function save(e) {
    e.preventDefault();
    setSaving(true);
    setMsg(null);
    try {
      const res = await api.put('/settings', {
        promoBanner: s.promoBanner,
        hero: s.hero,
        about: s.about,
        cta: s.cta,
        dining: s.dining,
        gallery: s.gallery,
        home: s.home,
        contact: s.contact,
        social: s.social,
      });
      setS(res.data);
      setMsg({ t: 'ok', m: 'Paramètres enregistrés.' });
    } catch (err) {
      setMsg({ t: 'err', m: err.response?.data?.message || 'Enregistrement impossible.' });
    } finally {
      setSaving(false);
    }
  }

  return (
    <form onSubmit={save}>
      <div className="admin__head">
        <h1>Paramètres du site</h1>
        <button className="btn-sm btn-sm--primary" type="submit" disabled={saving}>
          {saving ? 'Enregistrement…' : 'Enregistrer'}
        </button>
      </div>

      {msg && <div className={`alert alert--${msg.t === 'ok' ? 'ok' : 'err'}`}>{msg.m}</div>}

      <div className="panel">
        <h3 style={{ marginBottom: '1rem' }}>Bandeau promotionnel</h3>
        <div className="field">
          <label>Texte du bandeau</label>
          <input value={s.promoBanner?.text || ''} onChange={(e) => sub('promoBanner', 'text', e.target.value)} />
        </div>
        <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <input type="checkbox" style={{ width: 'auto' }} checked={!!s.promoBanner?.active} onChange={(e) => sub('promoBanner', 'active', e.target.checked)} />
          <span>Afficher le bandeau</span>
        </label>
      </div>

      <div className="panel">
        <h3 style={{ marginBottom: '1rem' }}>Contenu de la page d'accueil</h3>

        <h4 className="panel-sub">Section services</h4>
        <div className="admin-grid-2">
          <div className="field">
            <label>Sur-titre</label>
            <input value={s.home.services.eyebrow || ''} onChange={(e) => homeSub('services', 'eyebrow', e.target.value)} />
          </div>
          <div className="field">
            <label>Titre</label>
            <input value={s.home.services.title || ''} onChange={(e) => homeSub('services', 'title', e.target.value)} />
          </div>
        </div>
        <div className="field">
          <label>Texte d'introduction</label>
          <textarea value={s.home.services.lead || ''} onChange={(e) => homeSub('services', 'lead', e.target.value)} />
        </div>

        <h4 className="panel-sub">Section galerie</h4>
        <div className="admin-grid-2">
          <div className="field">
            <label>Sur-titre</label>
            <input value={s.home.gallery.eyebrow || ''} onChange={(e) => homeSub('gallery', 'eyebrow', e.target.value)} />
          </div>
          <div className="field">
            <label>Titre</label>
            <input value={s.home.gallery.title || ''} onChange={(e) => homeSub('gallery', 'title', e.target.value)} />
          </div>
        </div>

        <h4 className="panel-sub">Section chambres</h4>
        <div className="admin-grid-2">
          <div className="field">
            <label>Sur-titre</label>
            <input value={s.home.rooms.eyebrow || ''} onChange={(e) => homeSub('rooms', 'eyebrow', e.target.value)} />
          </div>
          <div className="field">
            <label>Titre</label>
            <input value={s.home.rooms.title || ''} onChange={(e) => homeSub('rooms', 'title', e.target.value)} />
          </div>
        </div>
        <div className="field">
          <label>Lien « voir toutes les chambres »</label>
          <input value={s.home.rooms.link || ''} onChange={(e) => homeSub('rooms', 'link', e.target.value)} />
        </div>

        <h4 className="panel-sub">Section avis</h4>
        <div className="admin-grid-2">
          <div className="field">
            <label>Sur-titre</label>
            <input value={s.home.reviews.eyebrow || ''} onChange={(e) => homeSub('reviews', 'eyebrow', e.target.value)} />
          </div>
          <div className="field">
            <label>Titre</label>
            <input value={s.home.reviews.title || ''} onChange={(e) => homeSub('reviews', 'title', e.target.value)} />
          </div>
        </div>

        <h4 className="panel-sub">Section finale (appel à l'action)</h4>
        <div className="admin-grid-2">
          <div className="field">
            <label>Sur-titre</label>
            <input value={s.home.cta.eyebrow || ''} onChange={(e) => homeSub('cta', 'eyebrow', e.target.value)} />
          </div>
          <div className="field">
            <label>Bouton</label>
            <input value={s.home.cta.btn || ''} onChange={(e) => homeSub('cta', 'btn', e.target.value)} />
          </div>
        </div>
        <div className="field">
          <label>Titre</label>
          <input value={s.home.cta.title || ''} onChange={(e) => homeSub('cta', 'title', e.target.value)} />
        </div>

        <h4 className="panel-sub">Statistiques « À propos »</h4>
        <div className="admin-grid-2">
          {s.home.aboutStats.map((st, i) => (
            <div key={i} className="stat-inline">
              <div className="field">
                <label>Statistique {i + 1} — valeur</label>
                <input value={st.value || ''} onChange={(e) => setStat(i, 'value', e.target.value)} />
              </div>
              <div className="field">
                <label>Statistique {i + 1} — libellé</label>
                <input value={st.label || ''} onChange={(e) => setStat(i, 'label', e.target.value)} />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="panel">
        <h3 style={{ marginBottom: '1rem' }}>À propos</h3>
        <div className="field">
          <label>Titre</label>
          <input value={s.about?.title || ''} onChange={(e) => sub('about', 'title', e.target.value)} />
        </div>
        <div className="field">
          <label>Texte</label>
          <textarea value={s.about?.text || ''} onChange={(e) => sub('about', 'text', e.target.value)} />
        </div>
        <div className="field">
          <label>Photo de la section « À propos »</label>
          <ImageUploader multiple={false} value={s.about?.image ? [s.about.image] : []} onChange={(arr) => sub('about', 'image', arr[0] || null)} />
        </div>
      </div>

      <div className="panel">
        <h3 style={{ marginBottom: '1rem' }}>Galerie photos (page d'accueil)</h3>
        <p style={{ color: '#8990a3', fontSize: '0.85rem', marginBottom: '1rem' }}>
          Ces photos sont celles affichées dans la section « En images » de la page d'accueil.
          Ajoutez ou retirez des photos, puis choisissez une légende et un format pour chacune.
        </p>
        <div className="field">
          <label>Photos</label>
          <GalleryEditor items={s.gallery || []} onChange={(arr) => setS({ ...s, gallery: arr })} />
        </div>
      </div>

      <div className="panel">
        <h3 style={{ marginBottom: '1rem' }}>Fond de la section finale (appel à l'action)</h3>
        <div className="field">
          <label>Image de fond</label>
          <ImageUploader multiple={false} value={s.cta?.image ? [s.cta.image] : []} onChange={(arr) => sub('cta', 'image', arr[0] || null)} />
        </div>
      </div>

      <div className="panel">
        <h3 style={{ marginBottom: '1rem' }}>Restauration (page « Boire & Manger »)</h3>
        <div className="admin-grid-2">
          <div className="field">
            <label>Photo du bar (Le Comptoir d'Afrika)</label>
            <ImageUploader multiple={false} value={s.dining?.bar ? [s.dining.bar] : []} onChange={(arr) => sub('dining', 'bar', arr[0] || null)} />
          </div>
          <div className="field">
            <label>Photo du restaurant</label>
            <ImageUploader multiple={false} value={s.dining?.resto ? [s.dining.resto] : []} onChange={(arr) => sub('dining', 'resto', arr[0] || null)} />
          </div>
        </div>
      </div>

      <div className="panel">
        <h3 style={{ marginBottom: '1rem' }}>Coordonnées</h3>
        <div className="admin-grid-2">
          <div className="field">
            <label>Email</label>
            <input value={s.contact?.email || ''} onChange={(e) => sub('contact', 'email', e.target.value)} />
          </div>
          <div className="field">
            <label>Téléphone</label>
            <input value={s.contact?.phone || ''} onChange={(e) => sub('contact', 'phone', e.target.value)} />
          </div>
          <div className="field" style={{ gridColumn: '1 / -1' }}>
            <label>Adresse</label>
            <input value={s.contact?.address || ''} onChange={(e) => sub('contact', 'address', e.target.value)} />
          </div>
          <div className="field" style={{ gridColumn: '1 / -1' }}>
            <label>URL d'intégration Google Maps (iframe src)</label>
            <input value={s.contact?.mapEmbed || ''} onChange={(e) => sub('contact', 'mapEmbed', e.target.value)} />
          </div>
        </div>
      </div>

      <div className="panel">
        <h3 style={{ marginBottom: '1rem' }}>Réseaux sociaux</h3>
        <p style={{ color: '#8990a3', fontSize: '0.85rem', marginBottom: '1rem' }}>
          Laissez un champ vide pour masquer le réseau correspondant sur le site.
        </p>
        <div className="admin-grid-2">
          {['facebook', 'instagram', 'tiktok', 'twitter'].map((net) => (
            <div className="field" key={net}>
              <label style={{ textTransform: 'capitalize' }}>{net}</label>
              <input
                placeholder="https://…"
                value={s.social?.[net] || ''}
                onChange={(e) => sub('social', net, e.target.value)}
              />
            </div>
          ))}
        </div>
      </div>
    </form>
  );
}

function GalleryEditor({ items = [], onChange }) {
  const update = (i, patch) =>
    onChange(items.map((it, idx) => (idx === i ? { ...it, ...patch } : it)));

  return (
    <div>
      <ImageUploader multiple value={items} onChange={onChange} />
      {items.length > 0 && (
        <div className="gallery-editor">
          {items.map((it, i) => (
            <div className="gallery-editor__item" key={it.public_id || it.url || i}>
              <img src={it.url} alt="" />
              <div className="gallery-editor__fields">
                <input
                  placeholder="Légende"
                  value={it.alt || ''}
                  onChange={(e) => update(i, { alt: e.target.value })}
                />
                <select value={it.span || 'g-box'} onChange={(e) => update(i, { span: e.target.value })}>
                  <option value="g-box">Carré</option>
                  <option value="g-wide">Large</option>
                  <option value="g-tall">Haute</option>
                </select>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
