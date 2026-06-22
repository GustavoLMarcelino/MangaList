import { useState } from 'react';
import { useMangaCollectionContext } from './useMangaCollectionContext';

export function useDeleteConfirmation(onDeleted) {
  const { deleteEntry } = useMangaCollectionContext();
  const [deleteTarget, setDeleteTarget] = useState(null);

  function requestDelete(entry) {
    setDeleteTarget(entry);
  }

  function cancelDelete() {
    setDeleteTarget(null);
  }

  function confirmDelete(entry) {
    deleteEntry(entry.id);
    setDeleteTarget(null);
    onDeleted?.(entry);
  }

  return { deleteTarget, requestDelete, cancelDelete, confirmDelete };
}
