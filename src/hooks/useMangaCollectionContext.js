import { useContext } from 'react';
import { MangaCollectionContext } from '../context/manga-collection-context';

export function useMangaCollectionContext() {
  const ctx = useContext(MangaCollectionContext);
  if (!ctx) {
    throw new Error('useMangaCollectionContext must be used within a MangaCollectionProvider');
  }
  return ctx;
}
