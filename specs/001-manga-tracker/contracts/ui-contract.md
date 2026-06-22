# Phase 1 — UI Contract: Rastreador Pessoal de Mangás (MangaList)

Aplicação puramente client-side: não há API HTTP. O "contrato" exposto ao usuário é o conjunto
de **rotas**, suas **responsabilidades** e os **eventos de dados** que disparam. Roteamento via
`HashRouter` (URLs com `#`).

## Rotas

| Rota            | Página           | Responsabilidade | Requisitos cobertos |
|-----------------|------------------|------------------|---------------------|
| `/`             | `Home`           | Estatísticas gerais (total de obras, total de capítulos, nota média), top 5 e gráfico de distribuição de notas. Estado vazio convida a registrar a 1ª obra. | FR-019, FR-020, FR-017 |
| `/biblioteca`   | `Library`        | Lista toda a coleção; busca por título; filtros por país e status; ordenação; estados vazios. | FR-012..FR-017 |
| `/adicionar`    | `AddManga`       | Formulário de criação de obra com validação. | FR-001..FR-006 |
| `/editar/:id`   | `EditManga`      | Formulário de edição da obra `:id`. | FR-007 |
| `/manga/:id`    | `MangaDetails`   | Exibe todos os campos da obra; ações editar/excluir. | FR-018, FR-008 |
| `*`             | `NotFound`       | Fallback para rota/ID inválido com mensagem clara. | Edge case (link inválido) |

A `Navbar` (Início / Biblioteca) está presente em todas as rotas — FR (navegação acessível).

## Contrato de operações de dados (camada `useMangaCollection`)

| Operação | Entrada | Efeito | Pós-condição |
|----------|---------|--------|--------------|
| `addEntry(data)` | `{ title, country, status, score, review, chaptersRead, cover }` | Cria entrada com `id`/`createdAt`/`updatedAt`; persiste | Obra aparece na coleção e nas stats |
| `updateEntry(id, data)` | `id` + campos editáveis | Atualiza campos e `updatedAt`; persiste | Novos valores refletidos em lista e detalhe |
| `deleteEntry(id)` | `id` | Remove entrada; persiste | Obra some da coleção, detalhe e stats |
| `stats` (derivado) | — | — | `{ totalManga, totalChapters, averageScore }` consistentes com a coleção |

## Contrato de formulário (`MangaForm`)

- **Campos**: título (texto), país (seleção entre 3), status (seleção entre 4), nota (slider
  0–10, decimais), review (texto longo), capítulos lidos (número ≥0), capa (upload → base64).
- **Validação bloqueante**: título não vazio; nota dentro de 0–10. Demais campos têm padrões
  razoáveis.
- **Resultado**: em sucesso, redireciona para a coleção/detalhe; em erro de validação, sinaliza
  o campo sem perder o que já foi preenchido.

## Contrato de busca/filtros/ordenação (`Library`)

- **Busca**: por substring do título, tolerante a maiúsculas/minúsculas (FR-013).
- **Filtro país**: `Japanese` | `Korean` | `Chinese` (ou todos).
- **Filtro status**: `lendo` | `completo` | `pausado` | `abandonado` (ou todos).
- **Ordenação**: maior nota, menor nota, A–Z, Z–A, mais recente (FR-016).
- **Estado vazio**: quando o conjunto filtrado é vazio, exibe `EmptyState` orientando o próximo
  passo (FR-017).

## Contrato de acessibilidade (transversal)

- Contraste mínimo 4.5:1 (3:1 texto grande); foco visível e navegação por teclado em todos os
  controles; `alt` em capas; rótulos associados em campos; animações respeitam
  `prefers-reduced-motion` (Constituição, Princípio IV).
