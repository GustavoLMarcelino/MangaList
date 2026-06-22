export const MAX_COVER_BYTES = 2 * 1024 * 1024; // 2MB

export function fileToBase64(file) {
  return new Promise((resolve, reject) => {
    if (!file.type.startsWith('image/')) {
      reject(new Error('Selecione um arquivo de imagem.'));
      return;
    }
    if (file.size > MAX_COVER_BYTES) {
      reject(new Error('Imagem muito grande. Escolha um arquivo com menos de 2MB.'));
      return;
    }
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = () => reject(new Error('Não foi possível ler a imagem selecionada.'));
    reader.readAsDataURL(file);
  });
}
