// Petits composants réutilisables

export function Reveal({ as: Tag = 'div', className = '', style, children, delay = 0 }) {
  return (
    <Tag
      className={`reveal ${className}`}
      style={{ transitionDelay: delay ? `${delay}ms` : undefined, ...style }}
    >
      {children}
    </Tag>
  );
}

export function SectionHead({ eyebrow, title, lead, center }) {
  return (
    <div className="head" style={center ? { alignItems: 'center', textAlign: 'center' } : undefined}>
      {eyebrow && <span className="eyebrow">{eyebrow}</span>}
      {title && <h2 className="h-section">{title}</h2>}
      {lead && <p className="lead">{lead}</p>}
    </div>
  );
}

export function StarRating({ value = 5 }) {
  const full = Math.round(value);
  return (
    <div className="stars" aria-label={`${full} sur 5`}>
      {'★'.repeat(full)}
      {'☆'.repeat(5 - full)}
    </div>
  );
}

export function Weave({ muted }) {
  return <div className={`weave ${muted ? 'weave--muted' : ''}`} aria-hidden="true" />;
}
