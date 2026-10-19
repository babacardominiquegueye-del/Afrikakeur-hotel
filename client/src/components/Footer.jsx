import { Link } from 'react-router-dom';
import { IconFacebook, IconInstagram, IconTiktok, IconTwitter } from './Icons';

export default function Footer({ settings }) {
  const contact = settings?.contact || {};
  const social = settings?.social || {};
  const year = new Date().getFullYear();

  const socialItems = [
    { key: 'facebook', url: social.facebook, Icon: IconFacebook, label: 'Facebook' },
    { key: 'instagram', url: social.instagram, Icon: IconInstagram, label: 'Instagram' },
    { key: 'tiktok', url: social.tiktok, Icon: IconTiktok, label: 'TikTok' },
    { key: 'twitter', url: social.twitter, Icon: IconTwitter, label: 'X' },
  ].filter((s) => s.url); // on masque les réseaux non renseignés

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__grid">
          <div className="footer__brand">
            <div className="brand">
              Afrika<span>Keur</span>
            </div>
            <p>
              Boutique hôtel 3★ à Saly, sur la Petite Côte. L'hospitalité sénégalaise dans un
              écrin afro-chic.
            </p>
            {socialItems.length > 0 && (
              <div className="socials">
                {socialItems.map(({ key, url, Icon, label }) => (
                  <a key={key} href={url} target="_blank" rel="noreferrer" aria-label={label}>
                    <Icon />
                  </a>
                ))}
              </div>
            )}
          </div>

          <div>
            <h4>Navigation</h4>
            <ul>
              <li><Link to="/chambres">Chambres</Link></li>
              <li><Link to="/restauration">Restauration</Link></li>
              <li><Link to="/services">Services</Link></li>
              <li><Link to="/avis">Avis</Link></li>
              <li><Link to="/reservation">Réserver</Link></li>
            </ul>
          </div>

          <div>
            <h4>Contact</h4>
            {contact.address && (
              <span className="footer__contact-line">{contact.address}</span>
            )}
            {contact.phone && (
              <span className="footer__contact-line">
                <b>Tél.</b>{' '}
                <a href={`tel:${contact.phone.replace(/\s/g, '')}`}>{contact.phone}</a>
              </span>
            )}
            {contact.email && (
              <span className="footer__contact-line">
                <b>Email</b> <a href={`mailto:${contact.email}`}>{contact.email}</a>
              </span>
            )}
          </div>
        </div>

        <div className="footer__bottom">
          <span>© {year} Afrika Keur — Tous droits réservés.</span>
          <span>Saly · Sénégal</span>
        </div>
      </div>
    </footer>
  );
}
