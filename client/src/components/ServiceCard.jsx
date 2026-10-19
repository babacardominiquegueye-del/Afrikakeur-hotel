import { optimizedUrl } from '../lib/images';

export default function ServiceCard({ service }) {
  const img = optimizedUrl(service.image?.url, { width: 900 });
  return (
    <article className="scard">
      {img ? (
        <div className="scard__media">
          <img src={img} alt={service.title} loading="lazy" />
        </div>
      ) : (
        <div className="scard__noimg" aria-hidden="true">
          {service.title?.charAt(0)}
        </div>
      )}
      <div className="scard__body">
        <h3>{service.title}</h3>
        <p>{service.description}</p>
      </div>
    </article>
  );
}
