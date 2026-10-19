import { StarRating } from './Bits';

export default function ReviewCard({ review }) {
  return (
    <article className="qcard">
      <StarRating value={review.rating} />
      <p className="qcard__text">“{review.text}”</p>
      <div className="qcard__by">
        <b>{review.author}</b>
        {review.country ? ` · ${review.country}` : ''}
      </div>
    </article>
  );
}
