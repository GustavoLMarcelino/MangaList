import { HashRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import StarField from './components/StarField';
import Navbar from './components/Navbar';
import PageTransition from './components/PageTransition';
import { MangaCollectionProvider } from './context/MangaCollectionContext';
import Home from './pages/Home';
import Library from './pages/Library';
import AddManga from './pages/AddManga';
import EditManga from './pages/EditManga';
import MangaDetails from './pages/MangaDetails';
import NotFound from './pages/NotFound';

function AnimatedRoutes() {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<PageTransition><Home /></PageTransition>} />
        <Route path="/biblioteca" element={<PageTransition><Library /></PageTransition>} />
        <Route path="/adicionar" element={<PageTransition><AddManga /></PageTransition>} />
        <Route path="/editar/:id" element={<PageTransition><EditManga /></PageTransition>} />
        <Route path="/manga/:id" element={<PageTransition><MangaDetails /></PageTransition>} />
        <Route path="*" element={<PageTransition><NotFound /></PageTransition>} />
      </Routes>
    </AnimatePresence>
  );
}

function App() {
  return (
    <MangaCollectionProvider>
      <HashRouter>
        <div className="relative min-h-svh">
          <StarField />
          <a href="#main-content" className="sr-only-focusable">
            Pular para o conteúdo
          </a>
          <Navbar />

          <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 pb-10 pt-24 sm:px-6 sm:pt-28 lg:px-8">
            <main id="main-content">
              <AnimatedRoutes />
            </main>
          </div>
        </div>
      </HashRouter>
    </MangaCollectionProvider>
  );
}

export default App;
