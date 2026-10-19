import { Link } from 'react-router-dom';
import { useOutletContext } from 'react-router-dom';
import { useReveal } from '../lib/useReveal';
import { usePageMeta } from '../lib/usePageMeta';
import { optimizedUrl } from '../lib/images';
import { defaultGallery } from '../data/defaultData';
import { Reveal, SectionHead, Weave } from '../components/Bits';

export default function Dining() {
  const { settings } = useOutletContext();
  const gallery = settings?.gallery?.length ? settings.gallery : defaultGallery;
  const bar = optimizedUrl(
    settings?.dining?.bar?.url ||
      gallery.find((g) => g.alt?.includes('Comptoir'))?.url ||
      gallery[3]?.url,
    { width: 1600 }
  );
  const resto = optimizedUrl(
    settings?.dining?.resto?.url ||
      gallery.find((g) => g.alt?.includes('Cascade'))?.url ||
      gallery[1]?.url,
    { width: 1600 }
  );

  usePageMeta(
    'Restauration — Le Comptoir d\'Afrika · Afrika Keur',
    'Le Comptoir d\'Afrika et le restaurant d\'Afrika Keur : cocktails signatures, cuisine sénégalaise et saveurs du monde à Saly.'
  );
  useReveal([]);

  return (
    <>
      <section className="container pagehead">
        <span className="eyebrow">Boire & Manger</span>
        <h1>Restauration</h1>
        <p className="lead" style={{ margin: '1rem auto 0' }}>
          Une table généreuse et un bar plein de vie, au cœur de l'hôtel.
        </p>
      </section>

      <section className="section on-dark" style={{ paddingTop: 0 }}>
        <div className="container about">
          <Reveal className="about__img">
            <img src={bar} alt="Le Comptoir d'Afrika, le bar de l'hôtel" />
          </Reveal>
          <Reveal className="about__body" delay={100}>
            <span className="eyebrow">Le bar</span>
            <h2 className="h-section" style={{ marginTop: '1rem' }}>
              Le Comptoir d'Afrika
            </h2>
            <p className="lead" style={{ marginTop: '1.2rem' }}>
              Cocktails signatures, jus de bissap et de gingembre, sélection de vins : Le
              Comptoir d'Afrika est le point de rendez-vous convivial de l'hôtel. On s'y attarde
              au coucher du soleil, dans une ambiance chaleureuse et authentique.
            </p>
          </Reveal>
        </div>
      </section>

      <Weave />

      <section className="section section--light">
        <div className="container about">
          <Reveal className="about__body">
            <span className="eyebrow">La table</span>
            <h2 className="h-section" style={{ marginTop: '1rem' }}>
              Le restaurant
            </h2>
            <p className="lead" style={{ marginTop: '1.2rem' }}>
              Notre cuisine marie les saveurs sénégalaises — thiéboudienne, yassa, mafé — aux
              classiques du monde, préparées avec des produits frais et locaux. Petit-déjeuner
              servi chaque matin sur la terrasse, face aux jardins.
            </p>
            <div style={{ marginTop: '1.8rem' }}>
              <Link to="/reservation" className="btn">
                Réserver une table
              </Link>
            </div>
          </Reveal>
          <Reveal className="about__img" delay={100}>
            <img src={resto} alt="Le restaurant d'Afrika Keur" />
          </Reveal>
        </div>
      </section>
    </>
  );
}
