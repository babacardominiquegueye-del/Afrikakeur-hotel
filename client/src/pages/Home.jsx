import { useOutletContext, Link } from 'react-router-dom';
import { useCollection } from '../lib/useCollection';
import { useReveal } from '../lib/useReveal';
import { usePageMeta } from '../lib/usePageMeta';
import {
  defaultSettings,
  defaultServices,
  defaultRooms,
  defaultReviews,
  defaultGallery,
} from '../data/defaultData';
import { Reveal, SectionHead, Weave } from '../components/Bits';
import { optimizedUrl } from '../lib/images';
import ServiceCard from '../components/ServiceCard';
import RoomCard from '../components/RoomCard';
import ReviewCard from '../components/ReviewCard';
import Gallery from '../components/Gallery';
import { IconArrow } from '../components/Icons';

export default function Home() {
  const { settings } = useOutletContext();
  const { data: services } = useCollection('/services', defaultServices);
  const { data: rooms } = useCollection('/rooms', defaultRooms);
  const { data: reviews } = useCollection('/reviews', defaultReviews);

  usePageMeta(
    'Afrika Keur — Boutique Hôtel 3★ à Saly, Sénégal',
    'Boutique hôtel afro-chic à Saly : chambres confortables, piscine à cascade, bar Le Comptoir d\'Afrika. Réservez votre séjour sur la Petite Côte.'
  );
  useReveal([services, rooms, reviews]);

  const section = (name) => ({
    ...defaultSettings.home[name],
    ...(settings?.home?.[name] || {}),
  });
  const servicesHead = section('services');
  const galleryHead = section('gallery');
  const roomsHead = section('rooms');
  const reviewsHead = section('reviews');
  const cta = section('cta');
  const stats =
    settings?.home?.aboutStats?.length
      ? settings.home.aboutStats
      : defaultSettings.home.aboutStats;

  const gallery = settings?.gallery?.length ? settings.gallery : defaultGallery;
  const aboutImg =
    optimizedUrl(settings?.about?.image?.url, { width: 1920 }) ||
    'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1920&q=80';
  const ctaImg =
    optimizedUrl(settings?.cta?.image?.url, { width: 1920 }) ||
    'https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=1920,fit=crop/nwIChs7HMox7Hz0s/cascade-piscine-ak-A48BoroRUxR4Mmc7.jpg';

  const featured = rooms.filter((r) => r.featured).slice(0, 3);
  const roomsToShow = (featured.length ? featured : rooms).slice(0, 3);

  return (
    <>
      {/* À PROPOS */}
      <section className="section section--light section--home-top">
        <div className="container about">
          <Reveal className="about__body">
            <span className="eyebrow">Bienvenue</span>
            <h2 className="h-section" style={{ marginTop: '1rem' }}>
              {settings?.about?.title}
            </h2>
            <p className="lead" style={{ marginTop: '1.3rem' }}>
              {settings?.about?.text}
            </p>
            <div className="about__stats">
              {stats.map((st, i) => (
                <div className="about__stat" key={i}>
                  <b>{st.value}</b>
                  <span>{st.label}</span>
                </div>
              ))}
            </div>
          </Reveal>
          <Reveal className="about__img" delay={120}>
            <img src={aboutImg} alt="Piscine et jardins d'Afrika Keur" />
          </Reveal>
        </div>
      </section>

      <Weave />

      {/* SERVICES */}
      <section className="section on-dark">
        <div className="container">
          <SectionHead
            eyebrow={servicesHead.eyebrow}
            title={servicesHead.title}
            lead={servicesHead.lead}
          />
          <div className="grid grid--3">
            {services.slice(0, 6).map((s, i) => (
              <Reveal key={s._id || i} delay={(i % 3) * 90}>
                <ServiceCard service={s} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* GALERIE */}
      <section className="section section--paper">
        <div className="container">
          <SectionHead eyebrow={galleryHead.eyebrow} title={galleryHead.title} center />
          <Reveal>
            <Gallery images={gallery} />
          </Reveal>
        </div>
      </section>

      {/* CHAMBRES */}
      <section className="section on-dark">
        <div className="container">
          <div className="head head--split">
            <div>
              <span className="eyebrow">{roomsHead.eyebrow}</span>
              <h2 className="h-section" style={{ marginTop: '1rem' }}>
                {roomsHead.title}
              </h2>
            </div>
            <Link to="/chambres" className="link-arrow" style={{ paddingBottom: '0.6rem' }}>
              {roomsHead.link} <IconArrow width="16" height="16" />
            </Link>
          </div>
          <div className="grid grid--3">
            {roomsToShow.map((r, i) => (
              <Reveal key={r._id || i} delay={(i % 3) * 90}>
                <RoomCard room={r} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* AVIS */}
      <section className="section section--light">
        <div className="container">
          <SectionHead eyebrow={reviewsHead.eyebrow} title={reviewsHead.title} center />
          <div className="grid grid--3">
            {reviews.slice(0, 3).map((rv, i) => (
              <Reveal key={rv._id || i} delay={(i % 3) * 90}>
                <ReviewCard review={rv} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section cta">
        <div className="cta__bg" style={{ backgroundImage: `url(${ctaImg})` }} />
        <div className="container cta__inner">
          {cta.eyebrow && <span className="eyebrow">{cta.eyebrow}</span>}
          <h2>{cta.title}</h2>
          <Link to="/reservation" className="btn">
            {cta.btn}
          </Link>
        </div>
      </section>
    </>
  );
}
