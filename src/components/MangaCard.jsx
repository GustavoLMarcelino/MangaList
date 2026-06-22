import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { BookOpen, Pencil, Trash2, ImageOff } from 'lucide-react';
import CountryBadge from './CountryBadge';
import ScoreBadge from './ScoreBadge';
import StatusBadge from './StatusBadge';

const cardVariants = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.25, ease: 'easeOut' } },
};

export default function MangaCard({ entry, onEdit, onDelete }) {
  return (
    <motion.li
      layout
      variants={cardVariants}
      exit={{ opacity: 0, scale: 0.92 }}
      whileHover={{ scale: 1.03 }}
      transition={{ duration: 0.25, ease: 'easeOut' }}
      className="group relative flex flex-col overflow-hidden rounded-2xl border border-violet/20 bg-nebula/40 transition-shadow duration-300 hover:glow-cyan focus-within:glow-cyan"
    >
      <Link
        to={`/manga/${entry.id}`}
        className="flex flex-1 flex-col text-left focus-visible:outline-2 focus-visible:outline-cyan focus-visible:-outline-offset-2"
        aria-label={`Ver detalhes de ${entry.title}`}
      >
        <div className="relative aspect-[2/3] w-full overflow-hidden bg-void-deep">
          {entry.cover ? (
            <img
              src={entry.cover}
              alt=""
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              loading="lazy"
            />
          ) : (
            <div className="flex h-full w-full flex-col items-center justify-center gap-2 text-star-dim">
              <ImageOff size={32} aria-hidden="true" />
              <span className="text-xs">Sem capa</span>
            </div>
          )}
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-void-deep/90 to-transparent" />
          <div className="absolute right-2 top-2 flex flex-col items-end gap-1">
            <CountryBadge country={entry.country} className="glass-panel" />
            <StatusBadge status={entry.status} className="glass-panel" />
          </div>
        </div>

        <div className="flex flex-1 flex-col gap-2 p-3">
          <h3 className="line-clamp-2 font-semibold text-star" title={entry.title}>
            {entry.title}
          </h3>
          <div className="mt-auto flex items-center justify-between text-sm">
            <ScoreBadge score={entry.score} />
            <span className="inline-flex items-center gap-1 text-star-dim">
              <BookOpen size={14} aria-hidden="true" />
              {entry.chaptersRead}
            </span>
          </div>
        </div>
      </Link>

      <div className="flex items-center justify-end gap-1 border-t border-violet/15 bg-void-deep/40 px-2 py-1.5">
        <button
          type="button"
          onClick={() => onEdit(entry)}
          className="rounded-md p-1.5 text-star-dim transition hover:bg-violet/20 hover:text-cyan focus-visible:outline-2 focus-visible:outline-cyan"
          aria-label={`Editar ${entry.title}`}
        >
          <Pencil size={16} aria-hidden="true" />
        </button>
        <button
          type="button"
          onClick={() => onDelete(entry)}
          className="rounded-md p-1.5 text-star-dim transition hover:bg-red-500/20 hover:text-red-400 focus-visible:outline-2 focus-visible:outline-cyan"
          aria-label={`Excluir ${entry.title}`}
        >
          <Trash2 size={16} aria-hidden="true" />
        </button>
      </div>
    </motion.li>
  );
}
