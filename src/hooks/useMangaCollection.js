import { useCallback, useMemo, useState } from 'react';
import { loadEntries, saveEntries } from '../lib/storage';

function makeId() {
  return typeof crypto !== 'undefined' && crypto.randomUUID
    ? crypto.randomUUID()
    : `${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

function withDefaultStatus(entry) {
  return entry.status ? entry : { ...entry, status: 'completo' };
}

export function useMangaCollection() {
  const [entries, setEntries] = useState(() => loadEntries().map(withDefaultStatus));

  const persist = useCallback((next) => {
    setEntries(next);
    saveEntries(next);
  }, []);

  const addEntry = useCallback(
    (data) => {
      const entry = {
        id: makeId(),
        title: data.title.trim(),
        country: data.country,
        status: data.status || 'completo',
        score: data.score,
        review: data.review.trim(),
        chaptersRead: data.chaptersRead,
        cover: data.cover ?? null,
        createdAt: Date.now(),
        updatedAt: Date.now(),
      };
      persist([entry, ...entries]);
      return entry;
    },
    [entries, persist],
  );

  const updateEntry = useCallback(
    (id, data) => {
      persist(
        entries.map((entry) =>
          entry.id === id
            ? {
                ...entry,
                title: data.title.trim(),
                country: data.country,
                status: data.status || entry.status || 'completo',
                score: data.score,
                review: data.review.trim(),
                chaptersRead: data.chaptersRead,
                cover: data.cover ?? entry.cover ?? null,
                updatedAt: Date.now(),
              }
            : entry,
        ),
      );
    },
    [entries, persist],
  );

  const deleteEntry = useCallback(
    (id) => {
      persist(entries.filter((entry) => entry.id !== id));
    },
    [entries, persist],
  );

  const sortedEntries = useMemo(
    () => [...entries].sort((a, b) => b.score - a.score || b.createdAt - a.createdAt),
    [entries],
  );

  const stats = useMemo(
    () => ({
      totalManga: entries.length,
      totalChapters: entries.reduce((sum, entry) => sum + (Number(entry.chaptersRead) || 0), 0),
      averageScore: entries.length
        ? entries.reduce((sum, entry) => sum + (Number(entry.score) || 0), 0) / entries.length
        : 0,
    }),
    [entries],
  );

  return { entries: sortedEntries, stats, addEntry, updateEntry, deleteEntry };
}
