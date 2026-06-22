import { Link } from 'react-router-dom';
import { Compass } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="glass-panel mx-auto flex max-w-xl flex-col items-center gap-4 rounded-2xl px-6 py-16 text-center">
      <Compass size={36} className="text-violet-soft animate-float" aria-hidden="true" />
      <h1 className="text-xl font-semibold text-star">Página não encontrada</h1>
      <p className="text-sm text-star-dim">O endereço que você acessou não existe.</p>
      <Link
        to="/"
        className="rounded-full bg-violet px-5 py-2 font-medium text-star transition hover:bg-violet-soft focus-visible:outline-2 focus-visible:outline-cyan focus-visible:outline-offset-2"
      >
        Voltar para o início
      </Link>
    </div>
  );
}
