import { Star } from 'lucide-react';

function scoreColorClass(score) {
  if (score >= 8) return 'text-cyan';
  if (score >= 5) return 'text-violet-soft';
  return 'text-star-dim';
}

export default function ScoreBadge({ score, size = 16, className = '' }) {
  const formatted = Number.isFinite(score) ? score.toFixed(1) : '0.0';
  return (
    <span
      className={`inline-flex items-center gap-1 font-semibold ${scoreColorClass(score)} ${className}`}
    >
      <Star size={size} fill="currentColor" aria-hidden="true" />
      <span>{formatted}</span>
      <span className="sr-only"> de 10</span>
    </span>
  );
}
