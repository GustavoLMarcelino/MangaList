import { COUNTRY_STYLES, countryLabel } from '../lib/constants';

export default function CountryBadge({ country, className = '' }) {
  const style = COUNTRY_STYLES[country] ?? 'bg-violet/20 text-violet-soft border-violet/40';
  return (
    <span
      className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium tracking-wide ${style} ${className}`}
    >
      {countryLabel(country)}
    </span>
  );
}
