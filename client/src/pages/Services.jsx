import { useCollection } from '../lib/useCollection';
import { useReveal } from '../lib/useReveal';
import { usePageMeta } from '../lib/usePageMeta';
import { defaultServices } from '../data/defaultData';
import { Reveal } from '../components/Bits';
import ServiceCard from '../components/ServiceCard';

export default function Services() {
  const { data: services } = useCollection('/services', defaultServices);
  usePageMeta(
    'Services & Équipements — Afrika Keur, Saly',
    'Piscine à cascade, bar, restaurant, wifi, navette et excursions : tous les services d\'Afrika Keur à Saly.'
  );
  useReveal([services]);

  return (
    <>
      <section className="container pagehead">
        <span className="eyebrow">À votre service</span>
        <h1>Services & Équipements</h1>
        <p className="lead" style={{ margin: '1rem auto 0' }}>
          Tout ce qu'il faut pour un séjour serein, du matin au soir.
        </p>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <div className="grid grid--3">
            {services.map((s, i) => (
              <Reveal key={s._id || i} delay={(i % 3) * 80}>
                <ServiceCard service={s} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
