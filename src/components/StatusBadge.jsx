import { STATUS_STYLES, statusLabel } from '../lib/constants';

export default function StatusBadge({ status, className = '' }) {
  const style = STATUS_STYLES[status] ?? STATUS_STYLES.completo;
  return (
    <span
      className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium tracking-wide ${style} ${className}`}
    >
      {statusLabel(status)}
    </span>
  );
}
