import { Library, BookOpen, Star } from 'lucide-react';

function StatCard({ icon: Icon, label, value }) {
  return (
    <div className="glass-panel flex items-center gap-3 rounded-xl px-4 py-3">
      <div className="rounded-lg bg-violet/20 p-2 text-cyan">
        <Icon size={20} aria-hidden="true" />
      </div>
      <div>
        <p className="text-xs uppercase tracking-wide text-star-dim">{label}</p>
        <p className="text-xl font-semibold text-star">{value}</p>
      </div>
    </div>
  );
}

export default function StatsBar({ stats }) {
  return (
    <div
      className="grid grid-cols-1 gap-3 sm:grid-cols-3"
      role="group"
      aria-label="Estatísticas da coleção"
    >
      <StatCard icon={Library} label="Mangás registrados" value={stats.totalManga} />
      <StatCard icon={BookOpen} label="Capítulos lidos" value={stats.totalChapters} />
      <StatCard icon={Star} label="Nota média" value={stats.averageScore.toFixed(1)} />
    </div>
  );
}
