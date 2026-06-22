import { useId, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { ImagePlus, X } from 'lucide-react';
import { COUNTRIES, STATUSES } from '../lib/constants';
import { fileToBase64 } from '../lib/image';

const emptyForm = {
  title: '',
  country: COUNTRIES[0].value,
  status: STATUSES[0].value,
  score: '0',
  review: '',
  chaptersRead: '',
  cover: null,
};

function formFromEntry(entry) {
  if (!entry) return emptyForm;
  return {
    title: entry.title,
    country: entry.country,
    status: entry.status ?? 'completo',
    score: String(entry.score),
    review: entry.review,
    chaptersRead: String(entry.chaptersRead),
    cover: entry.cover ?? null,
  };
}

export default function MangaForm({ entry, onSubmit, onCancel }) {
  const [form, setForm] = useState(() => formFromEntry(entry));
  const [errors, setErrors] = useState({});
  const [imageError, setImageError] = useState('');
  const fileInputRef = useRef(null);
  const titleId = useId();
  const countryId = useId();
  const statusId = useId();
  const scoreId = useId();
  const chaptersId = useId();
  const reviewId = useId();

  function validate() {
    const nextErrors = {};
    if (!form.title.trim()) nextErrors.title = 'O título é obrigatório.';

    const scoreNum = Number(form.score);
    if (form.score === '' || Number.isNaN(scoreNum)) {
      nextErrors.score = 'Informe uma nota.';
    } else if (scoreNum < 0 || scoreNum > 10) {
      nextErrors.score = 'A nota deve estar entre 0 e 10.';
    }

    const chaptersNum = Number(form.chaptersRead);
    if (form.chaptersRead === '' || Number.isNaN(chaptersNum)) {
      nextErrors.chaptersRead = 'Informe os capítulos lidos.';
    } else if (chaptersNum < 0 || !Number.isInteger(chaptersNum)) {
      nextErrors.chaptersRead = 'Deve ser um número inteiro, 0 ou mais.';
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  }

  async function handleFileChange(event) {
    const file = event.target.files?.[0];
    if (!file) return;
    setImageError('');
    try {
      const base64 = await fileToBase64(file);
      setForm((prev) => ({ ...prev, cover: base64 }));
    } catch (err) {
      setImageError(err.message);
    } finally {
      event.target.value = '';
    }
  }

  function removeCover() {
    setForm((prev) => ({ ...prev, cover: null }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (!validate()) return;
    onSubmit({
      title: form.title,
      country: form.country,
      status: form.status,
      score: Math.round(Number(form.score) * 10) / 10,
      review: form.review,
      chaptersRead: Math.round(Number(form.chaptersRead)),
      cover: form.cover,
    });
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">
      <div className="flex flex-col gap-4 sm:flex-row">
        <div className="flex flex-col items-center gap-2">
          <span className="text-sm font-medium text-star-dim">Capa</span>
          <div className="relative h-40 w-28 overflow-hidden rounded-lg border border-violet/30 bg-void-deep">
            {form.cover ? (
              <img src={form.cover} alt="Pré-visualização da capa" className="h-full w-full object-cover" />
            ) : (
              <div className="flex h-full w-full items-center justify-center text-star-dim">
                <ImagePlus size={24} aria-hidden="true" />
              </div>
            )}
            {form.cover && (
              <button
                type="button"
                onClick={removeCover}
                aria-label="Remover imagem de capa"
                className="absolute right-1 top-1 rounded-full bg-void-deep/80 p-1 text-star transition hover:bg-red-500/80 focus-visible:outline-2 focus-visible:outline-cyan"
              >
                <X size={14} aria-hidden="true" />
              </button>
            )}
          </div>
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="rounded-full border border-violet/40 px-3 py-1.5 text-xs font-medium text-star transition hover:bg-violet/20 focus-visible:outline-2 focus-visible:outline-cyan"
          >
            {form.cover ? 'Trocar imagem' : 'Enviar imagem'}
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
            aria-describedby={imageError ? 'cover-error' : undefined}
          />
          {imageError && (
            <p id="cover-error" role="alert" className="text-center text-xs text-red-400">
              {imageError}
            </p>
          )}
        </div>

        <div className="flex flex-1 flex-col gap-3">
          <div>
            <label htmlFor={titleId} className="mb-1 block text-sm font-medium text-star-dim">
              Título
            </label>
            <input
              id={titleId}
              type="text"
              value={form.title}
              onChange={(e) => setForm((prev) => ({ ...prev, title: e.target.value }))}
              className="w-full rounded-lg border border-violet/30 bg-void-deep px-3 py-2 text-star placeholder:text-star-dim/60 focus-visible:outline-2 focus-visible:outline-cyan"
              aria-invalid={Boolean(errors.title)}
              aria-describedby={errors.title ? `${titleId}-error` : undefined}
              placeholder="ex: Vagabond"
            />
            {errors.title && (
              <p id={`${titleId}-error`} role="alert" className="mt-1 text-xs text-red-400">
                {errors.title}
              </p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label htmlFor={countryId} className="mb-1 block text-sm font-medium text-star-dim">
                País de origem
              </label>
              <select
                id={countryId}
                value={form.country}
                onChange={(e) => setForm((prev) => ({ ...prev, country: e.target.value }))}
                className="w-full rounded-lg border border-violet/30 bg-void-deep px-3 py-2 text-star focus-visible:outline-2 focus-visible:outline-cyan"
              >
                {COUNTRIES.map((c) => (
                  <option key={c.value} value={c.value}>
                    {c.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor={statusId} className="mb-1 block text-sm font-medium text-star-dim">
                Status de leitura
              </label>
              <select
                id={statusId}
                value={form.status}
                onChange={(e) => setForm((prev) => ({ ...prev, status: e.target.value }))}
                className="w-full rounded-lg border border-violet/30 bg-void-deep px-3 py-2 text-star focus-visible:outline-2 focus-visible:outline-cyan"
              >
                {STATUSES.map((s) => (
                  <option key={s.value} value={s.value}>
                    {s.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <div className="mb-1 flex items-center justify-between">
              <label htmlFor={scoreId} className="text-sm font-medium text-star-dim">
                Nota (0–10)
              </label>
              <motion.span
                key={form.score}
                initial={{ scale: 1.25, opacity: 0.5 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.2, ease: 'easeOut' }}
                className="text-sm font-semibold text-cyan"
              >
                {Number(form.score).toFixed(1)}
              </motion.span>
            </div>
            <input
              id={scoreId}
              type="range"
              min="0"
              max="10"
              step="0.1"
              value={form.score}
              onChange={(e) => setForm((prev) => ({ ...prev, score: e.target.value }))}
              className="w-full accent-violet transition-all"
              aria-invalid={Boolean(errors.score)}
              aria-describedby={errors.score ? `${scoreId}-error` : undefined}
            />
            {errors.score && (
              <p id={`${scoreId}-error`} role="alert" className="mt-1 text-xs text-red-400">
                {errors.score}
              </p>
            )}
          </div>

          <div>
            <label htmlFor={chaptersId} className="mb-1 block text-sm font-medium text-star-dim">
              Capítulos lidos
            </label>
            <input
              id={chaptersId}
              type="number"
              min="0"
              step="1"
              inputMode="numeric"
              value={form.chaptersRead}
              onChange={(e) => setForm((prev) => ({ ...prev, chaptersRead: e.target.value }))}
              className="w-full rounded-lg border border-violet/30 bg-void-deep px-3 py-2 text-star focus-visible:outline-2 focus-visible:outline-cyan"
              aria-invalid={Boolean(errors.chaptersRead)}
              aria-describedby={errors.chaptersRead ? `${chaptersId}-error` : undefined}
              placeholder="120"
            />
            {errors.chaptersRead && (
              <p id={`${chaptersId}-error`} role="alert" className="mt-1 text-xs text-red-400">
                {errors.chaptersRead}
              </p>
            )}
          </div>
        </div>
      </div>

      <div>
        <label htmlFor={reviewId} className="mb-1 block text-sm font-medium text-star-dim">
          Resenha / análise pessoal
        </label>
        <textarea
          id={reviewId}
          rows={4}
          value={form.review}
          onChange={(e) => setForm((prev) => ({ ...prev, review: e.target.value }))}
          className="w-full resize-y rounded-lg border border-violet/30 bg-void-deep px-3 py-2 text-star placeholder:text-star-dim/60 focus-visible:outline-2 focus-visible:outline-cyan"
          placeholder="O que você achou?"
        />
      </div>

      <div className="mt-2 flex justify-end gap-3">
        <button
          type="button"
          onClick={onCancel}
          className="rounded-full px-4 py-2 text-sm font-medium text-star-dim transition hover:bg-violet/15 hover:text-star focus-visible:outline-2 focus-visible:outline-cyan"
        >
          Cancelar
        </button>
        <button
          type="submit"
          className="rounded-full bg-violet px-5 py-2 text-sm font-medium text-star transition hover:bg-violet-soft focus-visible:outline-2 focus-visible:outline-cyan"
        >
          {entry ? 'Salvar alterações' : 'Adicionar mangá'}
        </button>
      </div>
    </form>
  );
}
