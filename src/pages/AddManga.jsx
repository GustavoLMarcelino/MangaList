import { useNavigate } from 'react-router-dom';
import { useMangaCollectionContext } from '../hooks/useMangaCollectionContext';
import MangaForm from '../components/MangaForm';

export default function AddManga() {
  const navigate = useNavigate();
  const { addEntry } = useMangaCollectionContext();

  function handleSubmit(data) {
    addEntry(data);
    navigate('/biblioteca');
  }

  return (
    <div className="mx-auto flex max-w-xl flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold text-star text-glow sm:text-3xl">Adicionar mangá</h1>
        <p className="text-sm text-star-dim">Registre um novo título na sua coleção.</p>
      </div>
      <div className="glass-panel glow-violet rounded-2xl p-6">
        <MangaForm onSubmit={handleSubmit} onCancel={() => navigate(-1)} />
      </div>
    </div>
  );
}
