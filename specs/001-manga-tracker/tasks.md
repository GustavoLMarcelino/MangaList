---
description: "Task list for Rastreador Pessoal de Mangás (MangaList)"
---

# Tasks: Rastreador Pessoal de Mangás (MangaList)

**Input**: Design documents from `/specs/001-manga-tracker/`

**Prerequisites**: plan.md (required), spec.md (required), research.md, data-model.md, contracts/, quickstart.md

**Tests**: Esta feature usa **validação manual** (research D9) — sem suíte automatizada. Cada
fase termina com um checkpoint que referencia os cenários do `quickstart.md`. Nenhuma tarefa
de teste automatizado é gerada.

**Organization**: Tarefas agrupadas por user story para implementação e validação independentes.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Pode rodar em paralelo (arquivos diferentes, sem dependências pendentes)
- **[Story]**: A qual user story a tarefa pertence (US1–US5)
- Caminhos de arquivo exatos incluídos nas descrições

## Path Conventions

- Single project (SPA front-end): código em `src/` na raiz do repositório

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Inicialização do projeto e do ambiente de tema/animação

- [x] T001 Inicializar projeto Vite + React 19 com `package.json` e dependências (react, react-dom, react-router-dom, framer-motion, recharts, lucide-react) na raiz do repositório
- [x] T002 [P] Configurar Tailwind CSS v4 via `@tailwindcss/vite` em `vite.config.js`
- [x] T003 [P] Configurar ESLint em `eslint.config.js` (react-hooks, react-refresh) e validar `npm run lint`
- [x] T004 Definir tokens do tema galaxy (pretos do espaço, roxos cósmicos, acentos neon violeta/ciano) em `src/index.css`
- [x] T005 Criar `index.html` e o bootstrap React com `HashRouter` em `src/main.jsx`

**Checkpoint**: `npm run dev` sobe a aplicação com tema aplicado e roteador montado

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Infraestrutura central de dados, constantes e layout que TODAS as user stories usam

**⚠️ CRITICAL**: Nenhuma user story pode começar antes desta fase

- [x] T006 Implementar camada de acesso a `localStorage` (`loadEntries`/`saveEntries`, chave `mangavault.entries.v1`, carga resiliente a JSON corrompido) em `src/lib/storage.js`
- [x] T007 [P] Definir constantes de domínio `COUNTRIES`, `STATUSES`, estilos e labels (`countryLabel`/`statusLabel`) em `src/lib/constants.js`
- [x] T008 [P] Implementar utilitário de conversão de capa para base64 em `src/lib/image.js`
- [x] T009 Implementar hook `useMangaCollection` (CRUD `addEntry`/`updateEntry`/`deleteEntry`, geração de `id`, migração de status padrão "Completo", `stats` e ordenação derivados via `useMemo`) em `src/hooks/useMangaCollection.js`
- [x] T010 Criar o Context da coleção e seu provider em `src/context/manga-collection-context.js` e `src/context/MangaCollectionContext.jsx`, com hook de consumo em `src/hooks/useMangaCollectionContext.js`
- [x] T011 [P] Criar componente de navegação fixa (Início / Biblioteca) em `src/components/Navbar.jsx`
- [x] T012 [P] Criar wrapper de transição de página respeitando `prefers-reduced-motion` em `src/components/PageTransition.jsx`
- [x] T013 [P] Criar fundo animado de estrelas em `src/components/StarField.jsx`
- [x] T014 [P] Criar componente reutilizável de estado vazio em `src/components/EmptyState.jsx`
- [x] T015 Definir rotas (`/`, `/biblioteca`, `/adicionar`, `/editar/:id`, `/manga/:id`, `*`) e layout em `src/App.jsx`, envolvendo a árvore no provider da coleção
- [x] T016 [P] Criar página de fallback de rota inválida em `src/pages/NotFound.jsx`

**Checkpoint**: Fundação pronta — provider, navegação e rotas montados; user stories podem começar

---

## Phase 3: User Story 1 - Registrar e visualizar um mangá (Priority: P1) 🎯 MVP

**Goal**: O usuário registra uma obra com todos os campos e a vê persistida na coleção

**Independent Test**: Adicionar uma obra completa e confirmar que aparece e persiste após recarregar (quickstart V1)

### Implementation for User Story 1

- [x] T017 [P] [US1] Criar badge de país em `src/components/CountryBadge.jsx`
- [x] T018 [P] [US1] Criar badge de status em `src/components/StatusBadge.jsx`
- [x] T019 [P] [US1] Criar badge de nota em `src/components/ScoreBadge.jsx`
- [x] T020 [US1] Implementar formulário compartilhado `MangaForm` (campos título/país/status/nota via slider 0–10/review/capítulos/capa→base64; validação bloqueante de título não vazio e nota 0–10) em `src/components/MangaForm.jsx`
- [x] T021 [US1] Implementar página de adicionar obra (consome `addEntry`, redireciona após salvar) em `src/pages/AddManga.jsx`
- [x] T022 [P] [US1] Criar card de obra (capa, título, badges) em `src/components/MangaCard.jsx`
- [x] T023 [US1] Criar grid responsivo (2/3/4 colunas) com entrada escalonada via Framer Motion em `src/components/MangaGrid.jsx`
- [x] T024 [US1] Implementar página de biblioteca mínima exibindo todas as obras via `MangaGrid` e `EmptyState` em `src/pages/Library.jsx`

**Checkpoint**: É possível adicionar uma obra e vê-la persistida na biblioteca — MVP funcional (validar via quickstart V1)

---

## Phase 4: User Story 2 - Editar e excluir entradas (Priority: P2)

**Goal**: O usuário atualiza dados de uma obra e remove obras com confirmação

**Independent Test**: Editar uma obra e confirmar persistência; excluir outra e confirmar remoção (quickstart V2)

### Implementation for User Story 2

- [x] T025 [US2] Implementar página de editar obra (carrega obra por `:id`, reaproveita `MangaForm`, consome `updateEntry`) em `src/pages/EditManga.jsx`
- [x] T026 [P] [US2] Criar componente genérico de modal em `src/components/Modal.jsx`
- [x] T027 [US2] Criar diálogo de confirmação de exclusão em `src/components/ConfirmDeleteDialog.jsx`
- [x] T028 [P] [US2] Criar hook de estado do diálogo de exclusão em `src/hooks/useDeleteConfirmation.js`
- [x] T029 [US2] Integrar ações de editar/excluir (com confirmação via diálogo) nos pontos de entrada da biblioteca/card, consumindo `deleteEntry`

**Checkpoint**: Editar e excluir funcionam de ponta a ponta com confirmação (validar via quickstart V2)

---

## Phase 5: User Story 3 - Explorar a biblioteca (busca, filtros e ordenação) (Priority: P2)

**Goal**: O usuário busca por título, filtra por país e status e ordena os resultados

**Independent Test**: Aplicar busca, cada filtro e cada ordenação numa coleção variada e verificar o conjunto exibido (quickstart V3)

### Implementation for User Story 3

- [x] T030 [US3] Adicionar busca por título tolerante a maiúsculas/minúsculas em `src/pages/Library.jsx`
- [x] T031 [US3] Adicionar filtros por país e por status em `src/pages/Library.jsx`
- [x] T032 [US3] Adicionar ordenação (maior nota, menor nota, A–Z, Z–A, mais recente) em `src/pages/Library.jsx`
- [x] T033 [US3] Tratar estado vazio de busca/filtros sem resultados via `EmptyState` em `src/pages/Library.jsx`

**Checkpoint**: Biblioteca totalmente navegável com busca, filtros e ordenação (validar via quickstart V3)

---

## Phase 6: User Story 4 - Consultar a página de detalhes (Priority: P3)

**Goal**: O usuário vê todas as informações de uma obra e acessa editar/excluir a partir dela

**Independent Test**: Abrir o detalhe de uma obra e verificar todos os campos; acessar ID inválido e ver tela de não encontrado (quickstart V4)

### Implementation for User Story 4

- [x] T034 [US4] Implementar página de detalhes (todos os campos, badges status/país/nota, review completa, ações editar/excluir; tratamento de ID inexistente) em `src/pages/MangaDetails.jsx`
- [x] T035 [US4] Ligar navegação do card/grid para o detalhe da obra (`/manga/:id`) em `src/components/MangaCard.jsx`

**Checkpoint**: Detalhe exibe a obra integralmente e links inválidos caem no NotFound (validar via quickstart V4)

---

## Phase 7: User Story 5 - Acompanhar visão geral na home (Priority: P3)

**Goal**: A home exibe estatísticas gerais, top 5 e gráfico de distribuição de notas

**Independent Test**: Com coleção conhecida, verificar totais, média, top 5 e gráfico; com coleção vazia, ver estado vazio sem erro (quickstart V5)

### Implementation for User Story 5

- [x] T036 [P] [US5] Criar barra de estatísticas (total de obras, total de capítulos, nota média) em `src/components/StatsBar.jsx`
- [x] T037 [P] [US5] Criar lista de top 5 obras por nota em `src/components/TopRatedList.jsx`
- [x] T038 [P] [US5] Criar gráfico de distribuição de notas com Recharts em `src/components/ScoreDistributionChart.jsx`
- [x] T039 [US5] Implementar página home compondo `StatsBar`, `TopRatedList`, `ScoreDistributionChart` e estado vazio (consome `stats`) em `src/pages/Home.jsx`

**Checkpoint**: Home apresenta panorama correto e trata coleção vazia (validar via quickstart V5)

---

## Phase 8: Polish & Cross-Cutting Concerns

**Purpose**: Resiliência, acessibilidade e portões de qualidade que afetam todas as stories

- [x] T040 Tratar cota excedida na escrita de `localStorage` (capas base64 grandes) sem corromper a coleção nem travar, em `src/lib/storage.js` (quickstart V6, Risco R1)
- [x] T041 Validar migração de dados legados sem `status` → "Completo" (quickstart V6)
- [x] T042 [P] Auditar acessibilidade WCAG 2.1 AA: contraste ≥4.5:1, foco visível, navegação por teclado, `alt` em capas, rótulos de formulário, `prefers-reduced-motion` (quickstart V7)
- [x] T043 [P] Verificar responsividade dos grids (2/3/4 colunas) e ausência de rolagem horizontal em ≤375px
- [x] T044 [P] Atualizar `README.md` com instruções de uso e privacidade (offline, dados locais)
- [x] T045 Rodar portões de qualidade `npm run lint` (sem warnings) e `npm run build` (sucesso); executar `quickstart.md` ponta a ponta

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: Sem dependências — começa imediatamente
- **Foundational (Phase 2)**: Depende de Setup — BLOQUEIA todas as user stories
- **User Stories (Phase 3–7)**: Todas dependem da Foundational
  - US1 (P1) é o MVP e não depende de outras stories
  - US2 (P2) e US3 (P2) dependem da existência da biblioteca/coleção (US1)
  - US4 (P3) consome cards/coleção (US1) e integra-se a editar/excluir (US2)
  - US5 (P3) consome `stats` da Foundational; independente das demais stories
- **Polish (Phase 8)**: Depende das user stories desejadas estarem completas

### User Story Dependencies

- **US1 (P1)**: Após Foundational — sem dependência de outras stories
- **US2 (P2)**: Após Foundational — reaproveita `MangaForm` (US1) e a coleção
- **US3 (P2)**: Após Foundational — atua sobre a `Library` introduzida em US1
- **US4 (P3)**: Após Foundational — consome `MangaCard` (US1) e ações de US2
- **US5 (P3)**: Após Foundational — independente; só precisa de `stats`

### Within Each User Story

- Componentes de apresentação ([P]) antes das páginas que os compõem
- Páginas integram hooks/componentes existentes
- Story completa e validável antes de avançar à próxima prioridade

### Parallel Opportunities

- Setup: T002 e T003 em paralelo
- Foundational: T007, T008 em paralelo; T011–T014 e T016 em paralelo após a base de dados
- US1: T017, T018, T019 e T022 em paralelo (componentes independentes)
- US5: T036, T037, T038 em paralelo antes de T039
- Polish: T042, T043, T044 em paralelo

---

## Parallel Example: User Story 1

```bash
# Lançar os badges e o card juntos (arquivos independentes):
Task: "Criar badge de país em src/components/CountryBadge.jsx"
Task: "Criar badge de status em src/components/StatusBadge.jsx"
Task: "Criar badge de nota em src/components/ScoreBadge.jsx"
Task: "Criar card de obra em src/components/MangaCard.jsx"
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Completar Phase 1 (Setup)
2. Completar Phase 2 (Foundational) — CRÍTICO, bloqueia tudo
3. Completar Phase 3 (US1)
4. **PARAR e VALIDAR**: testar US1 de forma independente (quickstart V1)
5. Implantar/demonstrar se pronto

### Incremental Delivery

1. Setup + Foundational → fundação pronta
2. US1 → validar (quickstart V1) → MVP
3. US2 → validar (quickstart V2)
4. US3 → validar (quickstart V3)
5. US4 → validar (quickstart V4)
6. US5 → validar (quickstart V5)
7. Polish → resiliência, acessibilidade e portões (quickstart V6/V7)

---

## Notes

- [P] = arquivos diferentes, sem dependências pendentes
- [Story] mapeia a tarefa para a user story (rastreabilidade)
- Sem tarefas de teste automatizado (validação manual via quickstart, research D9)
- Commit após cada tarefa ou grupo lógico
- Parar em qualquer checkpoint para validar a story isoladamente
- Toda UI nova MUST estar em pt-BR e respeitar o tema galaxy e WCAG 2.1 AA
