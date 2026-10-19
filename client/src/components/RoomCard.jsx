import { Link } from 'react-router-dom';
import { fcfa } from '../lib/format';
import { optimizedUrl } from '../lib/images';
import { IconArrow } from './Icons';

export default function RoomCard({ room }) {
  const img = optimizedUrl(room.images?.[0]?.url, { width: 900 });
  return (
    <article className="rcard">
      <div className="rcard__media">
        {img && <img src={img} alt={room.name} loading="lazy" />}
        {room.price > 0 && (
          <span className="rcard__price">
            à partir de <b>{fcfa(room.price)}</b> / nuit
          </span>
        )}
      </div>
      <div className="rcard__body">
        <h3>{room.name}</h3>
        <div className="rcard__meta">
          {room.capacity ? <span>{room.capacity} pers.</span> : null}
          {room.size ? <span>{room.size} m²</span> : null}
        </div>
        <p className="rcard__desc">{room.description}</p>
        {room.amenities?.length > 0 && (
          <div className="chips">
            {room.amenities.slice(0, 4).map((a) => (
              <span className="chip" key={a}>
                {a}
              </span>
            ))}
          </div>
        )}
        <div className="rcard__foot">
          <Link to="/reservation" className="link-arrow">
            Réserver cette chambre <IconArrow width="16" height="16" />
          </Link>
        </div>
      </div>
    </article>
  );
}
