import { optimizedUrl } from '../lib/images';

export default function Gallery({ images }) {
  return (
    <div className="gallery">
      {images.map((im, i) => (
        <figure key={i} className={im.span || 'g-box'}>
          <img src={optimizedUrl(im.url, { width: 1400 })} alt={im.alt || 'Afrika Keur'} loading="lazy" />
        </figure>
      ))}
    </div>
  );
}
