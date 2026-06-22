import { useMemo } from 'react';
import { useMangaCollection } from '../hooks/useMangaCollection';
import { MangaCollectionContext } from './manga-collection-context';

export function MangaCollectionProvider({ children }) {
  const collection = useMangaCollection();

  const getEntry = useMemo(() => {
    return (id) => collection.entries.find((entry) => entry.id === id) ?? null;
  }, [collection.entries]);

  const value = useMemo(() => ({ ...collection, getEntry }), [collection, getEntry]);

  return <MangaCollectionContext.Provider value={value}>{children}</MangaCollectionContext.Provider>;
}
