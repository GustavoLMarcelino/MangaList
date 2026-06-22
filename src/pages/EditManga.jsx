import { Link, useNavigate, useParams } from 'react-router-dom';
import { useMangaCollectionContext } from '../hooks/useMangaCollectionContext';
import MangaForm from '../components/MangaForm';

export default function EditManga() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getEntry, updateEntry } = useMangaCollectionContext();
  const entry = getEntry(id);

  if (!entry) {
    return (
      <div className="glass-panel mx-auto flex max-w-xl flex-col items-center gap-4 rounded-2xl px-6 py-16 text-center">
        <h1 className="text-xl font-semibold text-star">Mangá não encontrado</h1>
        <p className="text-sm text-star-dim">Esta entrada pode ter sido excluída.</p>
        <Link
          to="/biblioteca"
          className="rounded-full bg-violet px-5 py-2 font-medium text-star transition hover:bg-violet-soft focus-visible:outline-2 focus-visible:outline-cyan focus-visible:outline-offset-2"
        >
          Voltar para a biblioteca
        </Link>
      </div>
    );
  }

  function handleSubmit(data) {
    updateEntry(entry.id, data);
    navigate(`/manga/${entry.id}`);
  }

  return (
    <div className="mx-auto flex max-w-xl flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold text-star text-glow sm:text-3xl">Editar mangá</h1>
        <p className="text-sm text-star-dim">Atualize os detalhes de "{entry.title}".</p>
      </div>
      <div className="glass-panel glow-violet rounded-2xl p-6">
        <MangaForm key={entry.id} entry={entry} onSubmit={handleSubmit} onCancel={() => navigate(-1)} />
      </div>
    </div>
  );
}
