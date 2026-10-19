import { useOutletContext } from 'react-router-dom';
import { useReveal } from '../lib/useReveal';
import { usePageMeta } from '../lib/usePageMeta';
import { Reveal } from '../components/Bits';

export default function Location() {
  const { settings } = useOutletContext();
  const c = settings?.contact || {};
  usePageMeta(
    'Localisation & Contact — Afrika Keur, Saly',
    'Retrouvez Afrika Keur à Saly, sur la Petite Côte. Adresse, téléphone et email de l\'hôtel.'
  );
  useReveal([settings]);

  return (
    <>
      <section className="container pagehead">
        <span className="eyebrow">Nous trouver</span>
        <h1>Localisation & Contact</h1>
        <p className="lead" style={{ margin: '1rem auto 0' }}>
          Au cœur de Saly, à quelques minutes de la plage.
        </p>
      </section>

      <section className="section on-dark" style={{ paddingTop: 0 }}>
        <div className="container loc">
          <Reveal>
            <div style={{ marginBottom: '1.5rem' }}>
              {c.address && (
                <div className="info-line">
                  <span className="k">Adresse</span>
                  <span>{c.address}</span>
                </div>
              )}
              {c.phone && (
                <div className="info-line">
                  <span className="k">Téléphone</span>
                  <a href={`tel:${c.phone.replace(/\s/g, '')}`}>{c.phone}</a>
                </div>
              )}
              {c.email && (
                <div className="info-line">
                  <span className="k">Email</span>
                  <a href={`mailto:${c.email}`}>{c.email}</a>
                </div>
              )}
            </div>
          </Reveal>
          {c.mapEmbed && (
            <Reveal className="loc__map" delay={100}>
              <iframe
                src={c.mapEmbed}
                title="Carte — Afrika Keur"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            </Reveal>
          )}
        </div>
      </section>
    </>
  );
}
