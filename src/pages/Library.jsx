import { useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Plus, Search } from 'lucide-react';
import { useMangaCollectionContext } from '../hooks/useMangaCollectionContext';
import { useDeleteConfirmation } from '../hooks/useDeleteConfirmation';
import { COUNTRIES, STATUSES } from '../lib/constants';
import StatsBar from '../components/StatsBar';
import MangaGrid from '../components/MangaGrid';
import ConfirmDeleteDialog from '../components/ConfirmDeleteDialog';

const SORT_OPTIONS = [
  { value: 'score-desc', label: 'Maior nota' },
  { value: 'score-asc', label: 'Menor nota' },
  { value: 'title-asc', label: 'A-Z' },
  { value: 'title-desc', label: 'Z-A' },
  { value: 'recent', label: 'Mais recente' },
];

function sortEntries(entries, sortBy) {
  const sorted = [...entries];
  switch (sortBy) {
    case 'score-asc':
      return sorted.sort((a, b) => a.score - b.score);
    case 'title-asc':
      return sorted.sort((a, b) => a.title.localeCompare(b.title, 'pt-BR'));
    case 'title-desc':
      return sorted.sort((a, b) => b.title.localeCompare(a.title, 'pt-BR'));
    case 'recent':
      return sorted.sort((a, b) => b.createdAt - a.createdAt);
    case 'score-desc':
    default:
      return sorted.sort((a, b) => b.score - a.score);
  }
}

export default function Library() {
  const navigate = useNavigate();
  const { entries, stats } = useMangaCollectionContext();
  const { deleteTarget, requestDelete, cancelDelete, confirmDelete } = useDeleteConfirmation();
  const [search, setSearch] = useState('');
  const [country, setCountry] = useState('todos');
  const [status, setStatus] = useState('todos');
  const [sortBy, setSortBy] = useState('score-desc');

  const filteredEntries = useMemo(() => {
    const term = search.trim().toLowerCase();
    const filtered = entries.filter((entry) => {
      const matchesSearch = !term || entry.title.toLowerCase().includes(term);
      const matchesCountry = country === 'todos' || entry.country === country;
      const matchesStatus = status === 'todos' || entry.status === status;
      return matchesSearch && matchesCountry && matchesStatus;
    });
    return sortEntries(filtered, sortBy);
  }, [entries, search, country, status, sortBy]);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-star text-glow sm:text-3xl">Biblioteca</h1>
          <p className="text-sm text-star-dim">Toda a sua coleção, ordenada pela melhor nota.</p>
        </div>
        <Link
          to="/adicionar"
          className="inline-flex items-center justify-center gap-2 rounded-full bg-violet px-5 py-2.5 font-medium text-star shadow-lg transition hover:bg-violet-soft focus-visible:outline-2 focus-visible:outline-cyan focus-visible:outline-offset-2"
        >
          <Plus size={18} aria-hidden="true" />
          Adicionar mangá
        </Link>
      </div>

      <StatsBar stats={stats} />

      <div className="glass-panel flex flex-col gap-3 rounded-2xl p-4 sm:flex-row sm:flex-wrap sm:items-center">
        <div className="relative flex-1 sm:min-w-[200px]">
          <Search
            size={16}
            className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-star-dim"
            aria-hidden="true"
          />
          <input
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Buscar por título..."
            aria-label="Buscar por título"
            className="w-full rounded-lg border border-violet/30 bg-void-deep py-2 pl-9 pr-3 text-star placeholder:text-star-dim/60 focus-visible:outline-2 focus-visible:outline-cyan"
          />
        </div>

        <label className="flex items-center gap-2 text-sm text-star-dim">
          País
          <select
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            className="rounded-lg border border-violet/30 bg-void-deep px-3 py-2 text-star focus-visible:outline-2 focus-visible:outline-cyan"
          >
            <option value="todos">Todos</option>
            {COUNTRIES.map((c) => (
              <option key={c.value} value={c.value}>
                {c.label}
              </option>
            ))}
          </select>
        </label>

        <label className="flex items-center gap-2 text-sm text-star-dim">
          Status
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="rounded-lg border border-violet/30 bg-void-deep px-3 py-2 text-star focus-visible:outline-2 focus-visible:outline-cyan"
          >
            <option value="todos">Todos</option>
            {STATUSES.map((s) => (
              <option key={s.value} value={s.value}>
                {s.label}
              </option>
            ))}
          </select>
        </label>

        <label className="flex items-center gap-2 text-sm text-star-dim">
          Ordenar por
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="rounded-lg border border-violet/30 bg-void-deep px-3 py-2 text-star focus-visible:outline-2 focus-visible:outline-cyan"
          >
            {SORT_OPTIONS.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
        </label>
      </div>

      {entries.length > 0 && filteredEntries.length === 0 ? (
        <div className="flex flex-col items-center justify-center gap-2 rounded-2xl border border-dashed border-violet/30 bg-nebula/20 px-6 py-16 text-center">
          <p className="text-sm text-star-dim">Nenhum mangá encontrado com esses filtros.</p>
        </div>
      ) : (
        <MangaGrid
          entries={filteredEntries}
          onEdit={(entry) => navigate(`/editar/${entry.id}`)}
          onDelete={requestDelete}
          onAdd={() => navigate('/adicionar')}
        />
      )}

      <ConfirmDeleteDialog entry={deleteTarget} onCancel={cancelDelete} onConfirm={confirmDelete} />
    </div>
  );
}
