import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { BookOpen, ImageOff } from 'lucide-react';
import CountryBadge from './CountryBadge';
import ScoreBadge from './ScoreBadge';
import StatusBadge from './StatusBadge';

const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.25, ease: 'easeOut' } },
};

export default function TopRatedList({ entries }) {
  return (
    <motion.ol initial="hidden" animate="show" variants={containerVariants} className="flex flex-col gap-3">
      {entries.map((entry, index) => (
        <motion.li key={entry.id} variants={itemVariants} whileHover={{ scale: 1.02 }}>
          <Link
            to={`/manga/${entry.id}`}
            className="glass-panel flex items-center gap-4 rounded-2xl p-3 transition hover:glow-cyan focus-visible:outline-2 focus-visible:outline-cyan"
          >
            <span className="w-6 shrink-0 text-center text-lg font-bold text-violet-soft">
              {index + 1}
            </span>
            <div className="h-20 w-14 shrink-0 overflow-hidden rounded-lg bg-void-deep">
              {entry.cover ? (
                <img src={entry.cover} alt="" className="h-full w-full object-cover" />
              ) : (
                <div className="flex h-full w-full items-center justify-center text-star-dim">
                  <ImageOff size={18} aria-hidden="true" />
                </div>
              )}
            </div>
            <div className="flex min-w-0 flex-1 flex-col gap-1.5">
              <h3 className="truncate font-semibold text-star" title={entry.title}>
                {entry.title}
              </h3>
              <div className="flex flex-wrap items-center gap-2">
                <CountryBadge country={entry.country} />
                <StatusBadge status={entry.status} />
                <span className="inline-flex items-center gap-1 text-xs text-star-dim">
                  <BookOpen size={12} aria-hidden="true" />
                  {entry.chaptersRead}
                </span>
              </div>
            </div>
            <ScoreBadge score={entry.score} className="shrink-0" />
          </Link>
        </motion.li>
      ))}
    </motion.ol>
  );
}
