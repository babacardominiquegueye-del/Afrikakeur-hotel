import { useCollection } from '../lib/useCollection';
import { useReveal } from '../lib/useReveal';
import { usePageMeta } from '../lib/usePageMeta';
import { defaultReviews } from '../data/defaultData';
import { Reveal } from '../components/Bits';
import ReviewCard from '../components/ReviewCard';

export default function Reviews() {
  const { data: reviews } = useCollection('/reviews', defaultReviews);
  usePageMeta(
    'Avis clients — Afrika Keur, Saly',
    'Ce que nos hôtes pensent de leur séjour à Afrika Keur, boutique hôtel à Saly.'
  );
  useReveal([reviews]);

  return (
    <>
      <section className="container pagehead">
        <span className="eyebrow">Ils ont séjourné</span>
        <h1>Avis de nos hôtes</h1>
        <p className="lead" style={{ margin: '1rem auto 0' }}>
          La teranga se raconte mieux à travers celles et ceux qui l'ont vécue.
        </p>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <div className="grid grid--3">
            {reviews.map((rv, i) => (
              <Reveal key={rv._id || i} delay={(i % 3) * 80}>
                <ReviewCard review={rv} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
