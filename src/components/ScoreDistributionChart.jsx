import { useMemo } from 'react';
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

const BUCKETS = ['0-2', '3-4', '5-6', '7-8', '9-10'];

function bucketFor(score) {
  if (score < 3) return '0-2';
  if (score < 5) return '3-4';
  if (score < 7) return '5-6';
  if (score < 9) return '7-8';
  return '9-10';
}

function CustomTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null;
  return (
    <div className="glass-panel rounded-lg px-3 py-2 text-xs text-star">
      <p className="font-semibold">{label}</p>
      <p className="text-star-dim">{payload[0].value} mangá(s)</p>
    </div>
  );
}

export default function ScoreDistributionChart({ entries }) {
  const data = useMemo(() => {
    const counts = Object.fromEntries(BUCKETS.map((b) => [b, 0]));
    entries.forEach((entry) => {
      const bucket = bucketFor(Number(entry.score) || 0);
      counts[bucket] += 1;
    });
    return BUCKETS.map((range) => ({ range, count: counts[range] }));
  }, [entries]);

  return (
    <div className="h-64 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 8, right: 8, left: -16, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="color-mix(in srgb, var(--color-violet-soft) 20%, transparent)" />
          <XAxis dataKey="range" stroke="var(--color-star-dim)" fontSize={12} tickLine={false} />
          <YAxis allowDecimals={false} stroke="var(--color-star-dim)" fontSize={12} tickLine={false} />
          <Tooltip content={<CustomTooltip />} cursor={{ fill: 'color-mix(in srgb, var(--color-violet) 15%, transparent)' }} />
          <Bar dataKey="count" fill="var(--color-violet-soft)" radius={[6, 6, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
