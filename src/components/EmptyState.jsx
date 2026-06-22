import { Sparkles } from 'lucide-react';

export default function EmptyState({ onAdd }) {
  return (
    <div className="flex flex-col items-center justify-center gap-4 rounded-2xl border border-dashed border-violet/30 bg-nebula/20 px-6 py-20 text-center">
      <Sparkles size={40} className="text-violet-soft animate-float" aria-hidden="true" />
      <div>
        <h2 className="text-lg font-semibold text-star">Seu cofre está vazio</h2>
        <p className="mt-1 max-w-sm text-sm text-star-dim">
          Comece a registrar os mangás, manhwas e manhuas que você leu — adicione sua primeira
          entrada para vê-la aqui.
        </p>
      </div>
      <button
        type="button"
        onClick={onAdd}
        className="rounded-full bg-violet px-5 py-2 font-medium text-star transition hover:bg-violet-soft focus-visible:outline-2 focus-visible:outline-cyan focus-visible:outline-offset-2"
      >
        Adicionar seu primeiro mangá
      </button>
    </div>
  );
}
