import Modal from './Modal';

export default function ConfirmDeleteDialog({ entry, onCancel, onConfirm }) {
  return (
    <Modal isOpen={Boolean(entry)} onClose={onCancel} title="Excluir entrada?" maxWidthClass="max-w-sm">
      {entry && (
        <div className="flex flex-col gap-5">
          <p className="text-sm text-star-dim">
            Tem certeza de que deseja excluir{' '}
            <span className="font-medium text-star">{entry.title}</span>? Esta ação não pode ser
            desfeita.
          </p>
          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={onCancel}
              className="rounded-full px-4 py-2 text-sm font-medium text-star-dim transition hover:bg-violet/15 hover:text-star focus-visible:outline-2 focus-visible:outline-cyan"
            >
              Cancelar
            </button>
            <button
              type="button"
              onClick={() => onConfirm(entry)}
              className="rounded-full bg-red-500/90 px-4 py-2 text-sm font-medium text-star transition hover:bg-red-500 focus-visible:outline-2 focus-visible:outline-cyan"
            >
              Excluir
            </button>
          </div>
        </div>
      )}
    </Modal>
  );
}
