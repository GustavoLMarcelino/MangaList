import { Link, useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, BookOpen, ImageOff, Pencil, Trash2 } from 'lucide-react';
import { useMangaCollectionContext } from '../hooks/useMangaCollectionContext';
import { useDeleteConfirmation } from '../hooks/useDeleteConfirmation';
import CountryBadge from '../components/CountryBadge';
import ScoreBadge from '../components/ScoreBadge';
import StatusBadge from '../components/StatusBadge';
import ConfirmDeleteDialog from '../components/ConfirmDeleteDialog';

export default function MangaDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getEntry } = useMangaCollectionContext();
  const entry = getEntry(id);
  const { deleteTarget, requestDelete, cancelDelete, confirmDelete } = useDeleteConfirmation(() =>
    navigate('/biblioteca'),
  );

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

  return (
    <div className="mx-auto flex max-w-3xl flex-col gap-6">
      <Link
        to="/biblioteca"
        className="inline-flex w-fit items-center gap-1.5 text-sm font-medium text-star-dim transition hover:text-star focus-visible:outline-2 focus-visible:outline-cyan"
      >
        <ArrowLeft size={16} aria-hidden="true" />
        Voltar para a biblioteca
      </Link>

      <div className="glass-panel glow-violet rounded-2xl p-6">
        <div className="flex flex-col gap-5 sm:flex-row">
          <div className="mx-auto w-48 shrink-0 overflow-hidden rounded-xl bg-void-deep sm:mx-0">
            {entry.cover ? (
              <img src={entry.cover} alt="" className="aspect-[2/3] w-full object-cover" />
            ) : (
              <div className="flex aspect-[2/3] w-full flex-col items-center justify-center gap-2 text-star-dim">
                <ImageOff size={28} aria-hidden="true" />
                <span className="text-xs">Sem capa</span>
              </div>
            )}
          </div>

          <div className="flex min-w-0 flex-1 flex-col gap-4">
            <h1 className="text-2xl font-bold text-star text-glow">{entry.title}</h1>
            <div className="flex flex-wrap items-center gap-2">
              <CountryBadge country={entry.country} />
              <StatusBadge status={entry.status} />
              <ScoreBadge score={entry.score} size={18} />
              <span className="inline-flex items-center gap-1 text-sm text-star-dim">
                <BookOpen size={15} aria-hidden="true" />
                {entry.chaptersRead} capítulos lidos
              </span>
            </div>

            <div>
              <h2 className="mb-1 text-sm font-semibold uppercase tracking-wide text-star-dim">
                Minha resenha
              </h2>
              {entry.review ? (
                <p className="whitespace-pre-wrap text-sm leading-relaxed text-star">
                  {entry.review}
                </p>
              ) : (
                <p className="text-sm italic text-star-dim">Nenhuma resenha escrita ainda.</p>
              )}
            </div>

            <div className="mt-auto flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => navigate(`/editar/${entry.id}`)}
                className="inline-flex items-center gap-1.5 rounded-full border border-violet/40 px-4 py-2 text-sm font-medium text-star transition hover:bg-violet/20 focus-visible:outline-2 focus-visible:outline-cyan"
              >
                <Pencil size={15} aria-hidden="true" />
                Editar
              </button>
              <button
                type="button"
                onClick={() => requestDelete(entry)}
                className="inline-flex items-center gap-1.5 rounded-full border border-red-500/40 px-4 py-2 text-sm font-medium text-red-400 transition hover:bg-red-500/20 focus-visible:outline-2 focus-visible:outline-cyan"
              >
                <Trash2 size={15} aria-hidden="true" />
                Excluir
              </button>
            </div>
          </div>
        </div>
      </div>

      <ConfirmDeleteDialog entry={deleteTarget} onCancel={cancelDelete} onConfirm={confirmDelete} />
    </div>
  );
}
