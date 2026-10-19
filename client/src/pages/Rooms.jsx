import { useCollection } from '../lib/useCollection';
import { useReveal } from '../lib/useReveal';
import { usePageMeta } from '../lib/usePageMeta';
import { defaultRooms } from '../data/defaultData';
import { Reveal } from '../components/Bits';
import RoomCard from '../components/RoomCard';

export default function Rooms() {
  const { data: rooms } = useCollection('/rooms', defaultRooms);
  usePageMeta(
    'Chambres & Suites — Afrika Keur, Saly',
    'Découvrez les chambres et suites d\'Afrika Keur à Saly : confort afro-chic, climatisation, wifi, vue piscine.'
  );
  useReveal([rooms]);

  return (
    <>
      <section className="container pagehead">
        <span className="eyebrow">Séjourner</span>
        <h1>Chambres & Suites</h1>
        <p className="lead" style={{ margin: '1rem auto 0' }}>
          Des espaces chaleureux aux tons sable et indigo, pensés pour le repos.
        </p>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <div className="grid grid--2">
            {rooms.map((r, i) => (
              <Reveal key={r._id || i} delay={(i % 2) * 90}>
                <RoomCard room={r} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
