# Quickstart — Validação do Rastreador Pessoal de Mangás (MangaList)

Guia de validação manual end-to-end. Cobre os fluxos principais da [spec](./spec.md) usando o
[contrato de UI](./contracts/ui-contract.md) e o [modelo de dados](./data-model.md).

## Pré-requisitos

- Node.js instalado
- Dependências instaladas: `npm install`

## Subir a aplicação

```bash
npm run dev
```

Abra a URL local impressa. (Para validar o build de produção: `npm run build` e `npm run preview`.)

## Portões de qualidade (antes de considerar pronto)

```bash
npm run lint     # MUST passar sem warnings (Princípio III)
npm run build    # MUST concluir com sucesso
```

## Cenários de validação

### V1 — Registrar e persistir (US1 / FR-001..006, 009)

1. Vá em **Adicionar** (`/adicionar`).
2. Preencha título, país, status, nota, review, capítulos lidos e uma capa.
3. Salve. **Esperado**: a obra aparece na biblioteca.
4. Recarregue a página. **Esperado**: a obra continua presente com todos os dados.
5. Tente salvar com título vazio. **Esperado**: salvamento bloqueado, título sinalizado.
6. Tente nota fora de 0–10. **Esperado**: salvamento bloqueado, faixa sinalizada.

### V2 — Editar e excluir (US2 / FR-007, 008)

1. Abra o detalhe de uma obra e edite capítulos/status/nota; salve.
   **Esperado**: alterações refletidas no detalhe e na biblioteca.
2. Solicite excluir uma obra. **Esperado**: diálogo de confirmação aparece.
3. Confirme. **Esperado**: a obra some da biblioteca e das estatísticas.

### V3 — Explorar a biblioteca (US3 / FR-012..017)

1. Em `/biblioteca`, digite parte de um título. **Esperado**: só obras correspondentes
   (tolerante a maiúsculas/minúsculas).
2. Filtre por país e por status. **Esperado**: conjunto exibido respeita os filtros.
3. Aplique cada ordenação (maior/menor nota, A–Z, Z–A, mais recente).
   **Esperado**: ordem muda corretamente.
4. Combine filtros que não retornam nada. **Esperado**: estado vazio claro.

### V4 — Página de detalhes (US4 / FR-018)

1. Abra `/manga/:id` de uma obra. **Esperado**: título, país, status, nota, capítulos, capa e
   review completa exibidos; ações editar/excluir disponíveis.
2. Acesse um ID inválido. **Esperado**: tela de "não encontrado" clara (não quebra).

### V5 — Home / análise (US5 / FR-019, 020)

1. Com várias obras, abra `/`. **Esperado**: total de obras, total de capítulos e nota média
   corretos; top 5 por nota; gráfico de distribuição de notas.
2. Esvazie a coleção (exclua tudo). **Esperado**: estado vazio convida a registrar a 1ª obra;
   nota média não gera erro.

### V6 — Resiliência de armazenamento (FR-021, 022)

1. Simule dados legados sem `status` no `localStorage`. **Esperado**: obra assume "Completo".
2. Corrompa o valor da chave `mangavault.entries.v1`. **Esperado**: app inicia com coleção
   vazia, sem travar.

### V7 — Acessibilidade & offline (Constituição IV; FR-010)

1. Navegue toda a aplicação apenas pelo teclado. **Esperado**: foco visível e ordem lógica.
2. Ative `prefers-reduced-motion`. **Esperado**: animações reduzidas/suprimidas.
3. Desligue a rede após carregar. **Esperado**: todas as funções continuam operando.
