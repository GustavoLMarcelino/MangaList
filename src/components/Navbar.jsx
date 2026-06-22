import { NavLink } from 'react-router-dom';
import { Plus, Telescope } from 'lucide-react';

const navLinkClass = ({ isActive }) =>
  `rounded-full px-3 py-1.5 text-sm font-medium transition focus-visible:outline-2 focus-visible:outline-cyan ${
    isActive ? 'bg-violet/25 text-star' : 'text-star-dim hover:bg-violet/15 hover:text-star'
  }`;

export default function Navbar() {
  return (
    <header className="glass-panel fixed inset-x-0 top-0 z-40 border-x-0 border-t-0">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
        <NavLink to="/" className="flex items-center gap-2.5" aria-label="MangaVault — início">
          <span className="rounded-lg bg-gradient-to-br from-violet to-cyan p-1.5 glow-violet">
            <Telescope size={18} className="text-void" aria-hidden="true" />
          </span>
          <span className="text-lg font-bold text-star text-glow">MangaVault</span>
        </NavLink>

        <nav aria-label="Navegação principal" className="flex items-center gap-1">
          <NavLink to="/" end className={navLinkClass}>
            Início
          </NavLink>
          <NavLink to="/biblioteca" className={navLinkClass}>
            Biblioteca
          </NavLink>
        </nav>

        <NavLink
          to="/adicionar"
          className="inline-flex items-center justify-center gap-2 rounded-full bg-violet px-4 py-2 text-sm font-medium text-star shadow-lg transition hover:bg-violet-soft focus-visible:outline-2 focus-visible:outline-cyan focus-visible:outline-offset-2"
        >
          <Plus size={16} aria-hidden="true" />
          <span className="hidden sm:inline">Adicionar mangá</span>
        </NavLink>
      </div>
    </header>
  );
}
