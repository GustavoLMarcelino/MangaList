# GitHub Issues — Rastreador Pessoal de Mangás (MangaList)

Gerado a partir de [tasks.md](./tasks.md). **45 issues** (T001–T045).

> **Como importar**: depois de autenticar (`gh auth login`), rode `/speckit-taskstoissues`
> novamente para criação automática com deduplicação — OU use o bloco de script no fim deste
> arquivo para criar tudo de uma vez via `gh`.

Convenção de título: `T<id>: <descrição>`. Labels sugeridas: fase + user story.

---

## Phase 1 — Setup

### T001: Inicializar projeto Vite + React 19 com dependências
**Labels**: `setup`
Inicializar projeto Vite + React 19 com `package.json` e dependências (react, react-dom, react-router-dom, framer-motion, recharts, lucide-react) na raiz do repositório.

### T002: Configurar Tailwind CSS v4 via @tailwindcss/vite
**Labels**: `setup`
Configurar Tailwind CSS v4 via `@tailwindcss/vite` em `vite.config.js`.

### T003: Configurar ESLint e validar npm run lint
**Labels**: `setup`
Configurar ESLint em `eslint.config.js` (react-hooks, react-refresh) e validar `npm run lint`.

### T004: Definir tokens do tema galaxy em src/index.css
**Labels**: `setup`
Definir tokens do tema galaxy (pretos do espaço, roxos cósmicos, acentos neon violeta/ciano) em `src/index.css`.

### T005: Criar index.html e bootstrap React com HashRouter
**Labels**: `setup`
Criar `index.html` e o bootstrap React com `HashRouter` em `src/main.jsx`.

---

## Phase 2 — Foundational

### T006: Implementar camada de acesso a localStorage
**Labels**: `foundational`
Implementar camada de acesso a `localStorage` (`loadEntries`/`saveEntries`, chave `mangavault.entries.v1`, carga resiliente a JSON corrompido) em `src/lib/storage.js`.

### T007: Definir constantes de domínio COUNTRIES e STATUSES
**Labels**: `foundational`
Definir constantes de domínio `COUNTRIES`, `STATUSES`, estilos e labels (`countryLabel`/`statusLabel`) em `src/lib/constants.js`.

### T008: Implementar utilitário de conversão de capa para base64
**Labels**: `foundational`
Implementar utilitário de conversão de capa para base64 em `src/lib/image.js`.

### T009: Implementar hook useMangaCollection (CRUD + stats)
**Labels**: `foundational`
Implementar hook `useMangaCollection` (CRUD `addEntry`/`updateEntry`/`deleteEntry`, geração de `id`, migração de status padrão "Completo", `stats` e ordenação derivados via `useMemo`) em `src/hooks/useMangaCollection.js`.

### T010: Criar Context da coleção e provider
**Labels**: `foundational`
Criar o Context da coleção e seu provider em `src/context/manga-collection-context.js` e `src/context/MangaCollectionContext.jsx`, com hook de consumo em `src/hooks/useMangaCollectionContext.js`.

### T011: Criar componente de navegação fixa (Navbar)
**Labels**: `foundational`
Criar componente de navegação fixa (Início / Biblioteca) em `src/components/Navbar.jsx`.

### T012: Criar wrapper de transição de página (prefers-reduced-motion)
**Labels**: `foundational`
Criar wrapper de transição de página respeitando `prefers-reduced-motion` em `src/components/PageTransition.jsx`.

### T013: Criar fundo animado de estrelas (StarField)
**Labels**: `foundational`
Criar fundo animado de estrelas em `src/components/StarField.jsx`.

### T014: Criar componente reutilizável de estado vazio
**Labels**: `foundational`
Criar componente reutilizável de estado vazio em `src/components/EmptyState.jsx`.

### T015: Definir rotas e layout em src/App.jsx
**Labels**: `foundational`
Definir rotas (`/`, `/biblioteca`, `/adicionar`, `/editar/:id`, `/manga/:id`, `*`) e layout em `src/App.jsx`, envolvendo a árvore no provider da coleção.

### T016: Criar página de fallback de rota inválida (NotFound)
**Labels**: `foundational`
Criar página de fallback de rota inválida em `src/pages/NotFound.jsx`.

---

## Phase 3 — User Story 1: Registrar e visualizar (P1, MVP)

### T017: Criar badge de país (CountryBadge)
**Labels**: `US1`
Criar badge de país em `src/components/CountryBadge.jsx`.

### T018: Criar badge de status (StatusBadge)
**Labels**: `US1`
Criar badge de status em `src/components/StatusBadge.jsx`.

### T019: Criar badge de nota (ScoreBadge)
**Labels**: `US1`
Criar badge de nota em `src/components/ScoreBadge.jsx`.

### T020: Implementar formulário compartilhado MangaForm
**Labels**: `US1`
Implementar formulário compartilhado `MangaForm` (campos título/país/status/nota via slider 0–10/review/capítulos/capa→base64; validação bloqueante de título não vazio e nota 0–10) em `src/components/MangaForm.jsx`.

### T021: Implementar página de adicionar obra (AddManga)
**Labels**: `US1`
Implementar página de adicionar obra (consome `addEntry`, redireciona após salvar) em `src/pages/AddManga.jsx`.

### T022: Criar card de obra (MangaCard)
**Labels**: `US1`
Criar card de obra (capa, título, badges) em `src/components/MangaCard.jsx`.

### T023: Criar grid responsivo com entrada escalonada (MangaGrid)
**Labels**: `US1`
Criar grid responsivo (2/3/4 colunas) com entrada escalonada via Framer Motion em `src/components/MangaGrid.jsx`.

### T024: Implementar página de biblioteca mínima (Library)
**Labels**: `US1`
Implementar página de biblioteca mínima exibindo todas as obras via `MangaGrid` e `EmptyState` em `src/pages/Library.jsx`.

---

## Phase 4 — User Story 2: Editar e excluir (P2)

### T025: Implementar página de editar obra (EditManga)
**Labels**: `US2`
Implementar página de editar obra (carrega obra por `:id`, reaproveita `MangaForm`, consome `updateEntry`) em `src/pages/EditManga.jsx`.

### T026: Criar componente genérico de modal (Modal)
**Labels**: `US2`
Criar componente genérico de modal em `src/components/Modal.jsx`.

### T027: Criar diálogo de confirmação de exclusão
**Labels**: `US2`
Criar diálogo de confirmação de exclusão em `src/components/ConfirmDeleteDialog.jsx`.

### T028: Criar hook de estado do diálogo de exclusão
**Labels**: `US2`
Criar hook de estado do diálogo de exclusão em `src/hooks/useDeleteConfirmation.js`.

### T029: Integrar ações de editar/excluir com confirmação
**Labels**: `US2`
Integrar ações de editar/excluir (com confirmação via diálogo) nos pontos de entrada da biblioteca/card, consumindo `deleteEntry`.

---

## Phase 5 — User Story 3: Explorar biblioteca (P2)

### T030: Adicionar busca por título tolerante a maiúsculas/minúsculas
**Labels**: `US3`
Adicionar busca por título tolerante a maiúsculas/minúsculas em `src/pages/Library.jsx`.

### T031: Adicionar filtros por país e por status
**Labels**: `US3`
Adicionar filtros por país e por status em `src/pages/Library.jsx`.

### T032: Adicionar ordenação (nota, A–Z, Z–A, mais recente)
**Labels**: `US3`
Adicionar ordenação (maior nota, menor nota, A–Z, Z–A, mais recente) em `src/pages/Library.jsx`.

### T033: Tratar estado vazio de busca/filtros sem resultados
**Labels**: `US3`
Tratar estado vazio de busca/filtros sem resultados via `EmptyState` em `src/pages/Library.jsx`.

---

## Phase 6 — User Story 4: Página de detalhes (P3)

### T034: Implementar página de detalhes (MangaDetails)
**Labels**: `US4`
Implementar página de detalhes (todos os campos, badges status/país/nota, review completa, ações editar/excluir; tratamento de ID inexistente) em `src/pages/MangaDetails.jsx`.

### T035: Ligar navegação do card/grid para o detalhe
**Labels**: `US4`
Ligar navegação do card/grid para o detalhe da obra (`/manga/:id`) em `src/components/MangaCard.jsx`.

---

## Phase 7 — User Story 5: Home / análise (P3)

### T036: Criar barra de estatísticas (StatsBar)
**Labels**: `US5`
Criar barra de estatísticas (total de obras, total de capítulos, nota média) em `src/components/StatsBar.jsx`.

### T037: Criar lista de top 5 obras por nota (TopRatedList)
**Labels**: `US5`
Criar lista de top 5 obras por nota em `src/components/TopRatedList.jsx`.

### T038: Criar gráfico de distribuição de notas (Recharts)
**Labels**: `US5`
Criar gráfico de distribuição de notas com Recharts em `src/components/ScoreDistributionChart.jsx`.

### T039: Implementar página home (Home)
**Labels**: `US5`
Implementar página home compondo `StatsBar`, `TopRatedList`, `ScoreDistributionChart` e estado vazio (consome `stats`) em `src/pages/Home.jsx`.

---

## Phase 8 — Polish & Cross-Cutting

### T040: Tratar cota excedida na escrita de localStorage
**Labels**: `polish`
Tratar cota excedida na escrita de `localStorage` (capas base64 grandes) sem corromper a coleção nem travar, em `src/lib/storage.js`.

### T041: Validar migração de dados legados sem status → "Completo"
**Labels**: `polish`
Validar migração de dados legados sem `status` → "Completo".

### T042: Auditar acessibilidade WCAG 2.1 AA
**Labels**: `polish`, `a11y`
Auditar acessibilidade WCAG 2.1 AA: contraste ≥4.5:1, foco visível, navegação por teclado, `alt` em capas, rótulos de formulário, `prefers-reduced-motion`.

### T043: Verificar responsividade dos grids em ≤375px
**Labels**: `polish`
Verificar responsividade dos grids (2/3/4 colunas) e ausência de rolagem horizontal em ≤375px.

### T044: Atualizar README com uso e privacidade
**Labels**: `polish`, `docs`
Atualizar `README.md` com instruções de uso e privacidade (offline, dados locais).

### T045: Rodar portões de qualidade (lint, build, quickstart)
**Labels**: `polish`
Rodar portões de qualidade `npm run lint` (sem warnings) e `npm run build` (sucesso); executar `quickstart.md` ponta a ponta.

---

## Script de criação em lote (após `gh auth login`)

```powershell
# Cria as 45 issues no repositório GustavoLMarcelino/MangaList.
# Requer: gh autenticado com escopo 'repo'.
$repo = "GustavoLMarcelino/MangaList"
$issues = @(
  @{ t="T001: Inicializar projeto Vite + React 19 com dependências"; l="setup" }
  @{ t="T002: Configurar Tailwind CSS v4 via @tailwindcss/vite"; l="setup" }
  @{ t="T003: Configurar ESLint e validar npm run lint"; l="setup" }
  @{ t="T004: Definir tokens do tema galaxy em src/index.css"; l="setup" }
  @{ t="T005: Criar index.html e bootstrap React com HashRouter"; l="setup" }
  @{ t="T006: Implementar camada de acesso a localStorage"; l="foundational" }
  @{ t="T007: Definir constantes de domínio COUNTRIES e STATUSES"; l="foundational" }
  @{ t="T008: Implementar utilitário de conversão de capa para base64"; l="foundational" }
  @{ t="T009: Implementar hook useMangaCollection (CRUD + stats)"; l="foundational" }
  @{ t="T010: Criar Context da coleção e provider"; l="foundational" }
  @{ t="T011: Criar componente de navegação fixa (Navbar)"; l="foundational" }
  @{ t="T012: Criar wrapper de transição de página (prefers-reduced-motion)"; l="foundational" }
  @{ t="T013: Criar fundo animado de estrelas (StarField)"; l="foundational" }
  @{ t="T014: Criar componente reutilizável de estado vazio"; l="foundational" }
  @{ t="T015: Definir rotas e layout em src/App.jsx"; l="foundational" }
  @{ t="T016: Criar página de fallback de rota inválida (NotFound)"; l="foundational" }
  @{ t="T017: Criar badge de país (CountryBadge)"; l="US1" }
  @{ t="T018: Criar badge de status (StatusBadge)"; l="US1" }
  @{ t="T019: Criar badge de nota (ScoreBadge)"; l="US1" }
  @{ t="T020: Implementar formulário compartilhado MangaForm"; l="US1" }
  @{ t="T021: Implementar página de adicionar obra (AddManga)"; l="US1" }
  @{ t="T022: Criar card de obra (MangaCard)"; l="US1" }
  @{ t="T023: Criar grid responsivo com entrada escalonada (MangaGrid)"; l="US1" }
  @{ t="T024: Implementar página de biblioteca mínima (Library)"; l="US1" }
  @{ t="T025: Implementar página de editar obra (EditManga)"; l="US2" }
  @{ t="T026: Criar componente genérico de modal (Modal)"; l="US2" }
  @{ t="T027: Criar diálogo de confirmação de exclusão"; l="US2" }
  @{ t="T028: Criar hook de estado do diálogo de exclusão"; l="US2" }
  @{ t="T029: Integrar ações de editar/excluir com confirmação"; l="US2" }
  @{ t="T030: Adicionar busca por título tolerante a maiúsculas/minúsculas"; l="US3" }
  @{ t="T031: Adicionar filtros por país e por status"; l="US3" }
  @{ t="T032: Adicionar ordenação (nota, A–Z, Z–A, mais recente)"; l="US3" }
  @{ t="T033: Tratar estado vazio de busca/filtros sem resultados"; l="US3" }
  @{ t="T034: Implementar página de detalhes (MangaDetails)"; l="US4" }
  @{ t="T035: Ligar navegação do card/grid para o detalhe"; l="US4" }
  @{ t="T036: Criar barra de estatísticas (StatsBar)"; l="US5" }
  @{ t="T037: Criar lista de top 5 obras por nota (TopRatedList)"; l="US5" }
  @{ t="T038: Criar gráfico de distribuição de notas (Recharts)"; l="US5" }
  @{ t="T039: Implementar página home (Home)"; l="US5" }
  @{ t="T040: Tratar cota excedida na escrita de localStorage"; l="polish" }
  @{ t="T041: Validar migração de dados legados sem status para Completo"; l="polish" }
  @{ t="T042: Auditar acessibilidade WCAG 2.1 AA"; l="polish" }
  @{ t="T043: Verificar responsividade dos grids em <=375px"; l="polish" }
  @{ t="T044: Atualizar README com uso e privacidade"; l="polish" }
  @{ t="T045: Rodar portões de qualidade (lint, build, quickstart)"; l="polish" }
)
foreach ($i in $issues) {
  gh issue create --repo $repo --title $i.t --body "Gerado de specs/001-manga-tracker/tasks.md" --label $i.l
}
```

> Nota: o script não deduplica. Para criação idempotente com checagem de issues existentes,
> use `/speckit-taskstoissues` (autenticado).
