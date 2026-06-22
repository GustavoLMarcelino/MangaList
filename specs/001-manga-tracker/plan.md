# Implementation Plan: Rastreador Pessoal de Mangás (MangaList)

**Branch**: `001-manga-tracker` | **Date**: 2026-06-22 | **Spec**: [spec.md](./spec.md)

**Input**: Feature specification from `/specs/001-manga-tracker/spec.md`

## Summary

Aplicação web pessoal, 100% client-side e offline, para registrar e analisar mangás
(japoneses, coreanos e chineses). O usuário registra obras com título, país, nota (0–10),
review, capítulos lidos, status e capa; edita e exclui; explora a biblioteca com busca,
filtros e ordenação; consulta o detalhe de cada obra; e vê estatísticas e top 5 na home.
A persistência é feita inteiramente em `localStorage` (capas em base64), sem login, sem
backend e sem APIs externas. A abordagem técnica usa React + Vite, React Router em
`HashRouter`, Tailwind CSS v4 com tema galaxy, Framer Motion para animações, Recharts para o
gráfico de distribuição de notas e Lucide React para ícones.

## Technical Context

**Language/Version**: JavaScript (ES2022+), React 19

**Primary Dependencies**: React 19, React Router 7 (`HashRouter`), Tailwind CSS v4
(`@tailwindcss/vite`), Framer Motion 12, Recharts 3, Lucide React 1

**Storage**: `localStorage` do navegador (chave `mangavault.entries.v1`); capas como strings
base64 embutidas no JSON

**Testing**: Validação manual via `quickstart.md` (sem suíte automatizada nesta versão);
`npm run lint` como portão de qualidade

**Target Platform**: Navegadores modernos (desktop e mobile), hospedagem estática; funciona
offline após o carregamento inicial

**Project Type**: Single project — aplicação web front-end (SPA)

**Performance Goals**: Interações de UI percebidas como instantâneas (<100ms); animações a
60 fps; busca/filtros sobre a coleção sem lag perceptível em ~centenas de obras

**Constraints**: 100% offline; sem backend/login/rede; nenhum dado sai do dispositivo;
respeitar limite de cota do `localStorage` (capas base64 são grandes); WCAG 2.1 AA;
interface em pt-BR; deep links funcionando em host estático (`HashRouter`)

**Scale/Scope**: Single-user por dispositivo; ordem de dezenas a poucas centenas de obras;
5 rotas (`/`, `/biblioteca`, `/adicionar`, `/editar/:id`, `/manga/:id`)

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

Avaliação contra a Constituição v1.0.0:

| Princípio | Conformidade | Observação |
|-----------|--------------|------------|
| I. Identidade Visual Galaxy | ✅ PASS | Tailwind v4 com tema galaxy via tokens; Framer Motion para transições; grids responsivos 2/3/4 colunas. |
| II. Persistência Local Confiável | ✅ PASS | Camada dedicada `src/lib/storage.js`; `loadEntries` resiliente a JSON corrompido; migração de status padrão "Completo". Ver Risco R1 sobre cota. |
| III. Código React Limpo e Componentizado | ✅ PASS | Componentes pequenos com responsabilidade única; lógica em hooks (`useMangaCollection`) e `lib/`; acesso a dados isolado dos componentes. |
| IV. Acessibilidade WCAG 2.1 AA | ✅ PASS (a verificar) | Tema escuro de alto contraste; requer verificação de contraste/foco/`prefers-reduced-motion` no portão de qualidade. |
| V. Experiência Intuitiva sem Tutorial (pt-BR) | ✅ PASS | Interface integralmente em pt-BR; estados vazios e confirmação de exclusão presentes. |

**Restrições Tecnológicas**: ✅ A stack escolhida é exatamente a mandatada pela constituição.
Nenhuma dependência nova duplica capacidades existentes.

**Resultado do Gate**: PASS — nenhuma violação. Sem entradas em Complexity Tracking.

## Project Structure

### Documentation (this feature)

```text
specs/001-manga-tracker/
├── plan.md              # Este arquivo (/speckit-plan)
├── research.md          # Phase 0 — decisões técnicas
├── data-model.md        # Phase 1 — entidades e validações
├── quickstart.md        # Phase 1 — guia de validação manual
├── contracts/           # Phase 1 — contratos de UI (rotas/componentes)
│   └── ui-contract.md
└── tasks.md             # Phase 2 — gerado por /speckit-tasks (NÃO criado aqui)
```

### Source Code (repository root)

```text
src/
├── main.jsx                       # Bootstrap React + HashRouter
├── App.jsx                        # Definição de rotas e layout
├── index.css                      # Tema galaxy (tokens Tailwind v4)
├── lib/
│   ├── storage.js                 # Acesso a localStorage (fonte de verdade)
│   ├── constants.js               # COUNTRIES, STATUSES e estilos/labels
│   └── image.js                   # Conversão de capa para base64
├── hooks/
│   ├── useMangaCollection.js      # CRUD + stats sobre a coleção
│   ├── useMangaCollectionContext.js
│   └── useDeleteConfirmation.js   # Estado do diálogo de exclusão
├── context/
│   ├── MangaCollectionContext.jsx # Provider da coleção
│   └── manga-collection-context.js
├── components/
│   ├── Navbar.jsx                 # Navegação fixa (Início / Biblioteca)
│   ├── MangaForm.jsx              # Formulário compartilhado add/editar
│   ├── MangaGrid.jsx, MangaCard.jsx
│   ├── CountryBadge.jsx, StatusBadge.jsx, ScoreBadge.jsx
│   ├── StatsBar.jsx, TopRatedList.jsx, ScoreDistributionChart.jsx
│   ├── EmptyState.jsx, Modal.jsx, ConfirmDeleteDialog.jsx
│   ├── PageTransition.jsx, StarField.jsx
└── pages/
    ├── Home.jsx                   # Rota /
    ├── Library.jsx                # Rota /biblioteca
    ├── AddManga.jsx               # Rota /adicionar
    ├── EditManga.jsx              # Rota /editar/:id
    ├── MangaDetails.jsx           # Rota /manga/:id
    └── NotFound.jsx               # Fallback de rota inválida
```

**Structure Decision**: Single project (SPA front-end). A separação adotada — `lib/`
(acesso a dados e utilitários puros), `hooks/` (lógica de estado/domínio), `context/`
(provisão global da coleção), `components/` (apresentação reutilizável) e `pages/` (composição
por rota) — concretiza o Princípio III (componentização e isolamento do acesso a dados).

## Complexity Tracking

> Nenhuma violação de princípio a justificar. Seção intencionalmente vazia.
