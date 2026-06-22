export const COUNTRIES = [
  { value: 'Japanese', label: 'Japonês', short: 'JP' },
  { value: 'Korean', label: 'Coreano', short: 'KR' },
  { value: 'Chinese', label: 'Chinês', short: 'CN' },
];

export function countryLabel(value) {
  return COUNTRIES.find((c) => c.value === value)?.label ?? value;
}

export const COUNTRY_STYLES = {
  Japanese: 'bg-violet/20 text-violet-soft border-violet/40',
  Korean: 'bg-cyan/15 text-cyan border-cyan/40',
  Chinese: 'bg-amber-400/15 text-amber-300 border-amber-400/40',
};

export const STATUSES = [
  { value: 'lendo', label: 'Lendo' },
  { value: 'completo', label: 'Completo' },
  { value: 'pausado', label: 'Pausado' },
  { value: 'abandonado', label: 'Abandonado' },
];

export function statusLabel(value) {
  return STATUSES.find((s) => s.value === value)?.label ?? value;
}

export const STATUS_STYLES = {
  lendo: 'bg-cyan/15 text-cyan border-cyan/40',
  completo: 'bg-emerald-400/15 text-emerald-300 border-emerald-400/40',
  pausado: 'bg-amber-400/15 text-amber-300 border-amber-400/40',
  abandonado: 'bg-red-500/15 text-red-400 border-red-500/40',
};
