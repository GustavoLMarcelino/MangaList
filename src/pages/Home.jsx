import { Link, useNavigate } from 'react-router-dom';
import { Plus, Telescope, Library as LibraryIcon } from 'lucide-react';
import { useMangaCollectionContext } from '../hooks/useMangaCollectionContext';
import StatsBar from '../components/StatsBar';
import TopRatedList from '../components/TopRatedList';
import ScoreDistributionChart from '../components/ScoreDistributionChart';
import EmptyState from '../components/EmptyState';

export default function Home() {
  const navigate = useNavigate();
  const { entries, stats } = useMangaCollectionContext();
  const topEntries = entries.slice(0, 5);

  return (
    <div className="flex flex-col gap-8">
      <section className="glass-panel glow-violet flex flex-col items-center gap-4 rounded-2xl px-6 py-12 text-center">
        <span className="rounded-xl bg-gradient-to-br from-violet to-cyan p-3 glow-violet">
          <Telescope size={28} className="text-void" aria-hidden="true" />
        </span>
        <h1 className="text-3xl font-bold text-star text-glow sm:text-4xl">MangaVault</h1>
        <p className="max-w-md text-sm text-star-dim sm:text-base">
          Seu catálogo pessoal de mangás, manhwas e manhuas — avalie, comente e acompanhe tudo o
          que você já leu, em um cantinho só seu da galáxia.
        </p>
        <div className="mt-2 flex flex-wrap items-center justify-center gap-3">
          <Link
            to="/biblioteca"
            className="inline-flex items-center gap-2 rounded-full border border-violet/40 px-5 py-2.5 font-medium text-star transition hover:bg-violet/20 focus-visible:outline-2 focus-visible:outline-cyan focus-visible:outline-offset-2"
          >
            <LibraryIcon size={18} aria-hidden="true" />
            Ver biblioteca
          </Link>
          <Link
            to="/adicionar"
            className="inline-flex items-center gap-2 rounded-full bg-violet px-5 py-2.5 font-medium text-star shadow-lg transition hover:bg-violet-soft focus-visible:outline-2 focus-visible:outline-cyan focus-visible:outline-offset-2"
          >
            <Plus size={18} aria-hidden="true" />
            Adicionar mangá
          </Link>
        </div>
      </section>

      <StatsBar stats={stats} />

      {entries.length === 0 ? (
        <EmptyState onAdd={() => navigate('/adicionar')} />
      ) : (
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <section className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-star">Mais bem avaliados</h2>
              <Link
                to="/biblioteca"
                className="text-sm font-medium text-cyan transition hover:text-violet-soft focus-visible:outline-2 focus-visible:outline-cyan"
              >
                Ver biblioteca completa
              </Link>
            </div>
            <TopRatedList entries={topEntries} />
          </section>

          <section className="flex flex-col gap-4">
            <h2 className="text-xl font-semibold text-star">Distribuição de notas</h2>
            <div className="glass-panel rounded-2xl p-4">
              <ScoreDistributionChart entries={entries} />
            </div>
          </section>
        </div>
      )}
    </div>
  );
}
