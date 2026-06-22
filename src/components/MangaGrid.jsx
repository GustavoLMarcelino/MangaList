import { AnimatePresence, motion } from 'framer-motion';
import MangaCard from './MangaCard';
import EmptyState from './EmptyState';

const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06 } },
};

export default function MangaGrid({ entries, onEdit, onDelete, onAdd }) {
  if (entries.length === 0) {
    return <EmptyState onAdd={onAdd} />;
  }

  return (
    <motion.ul
      initial="hidden"
      animate="show"
      variants={containerVariants}
      className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4"
    >
      <AnimatePresence mode="popLayout">
        {entries.map((entry) => (
          <MangaCard key={entry.id} entry={entry} onEdit={onEdit} onDelete={onDelete} />
        ))}
      </AnimatePresence>
    </motion.ul>
  );
}
