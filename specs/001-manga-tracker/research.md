# Phase 0 — Research: Rastreador Pessoal de Mangás (MangaList)

Todas as escolhas técnicas foram fixadas pela entrada do usuário e pela Constituição v1.0.0.
Não restam marcadores NEEDS CLARIFICATION. Abaixo, as decisões consolidadas.

## D1 — Persistência local

- **Decision**: Usar `localStorage` como única fonte de verdade, com uma camada de acesso
  dedicada (`src/lib/storage.js`) expondo `loadEntries()`/`saveEntries()`. Chave versionada
  `mangavault.entries.v1`.
- **Rationale**: Atende ao requisito 100% offline/sem backend (FR-009/010/011) e ao Princípio
  II. A leitura é resiliente: JSON inválido ou ausente retorna `[]` em vez de quebrar.
- **Alternatives considered**: IndexedDB (mais robusto para blobs, porém complexidade
  desnecessária para a escala atual); cookies/sessionStorage (inadequados para persistência).

## D2 — Armazenamento de capas

- **Decision**: Converter a imagem da capa para string base64 (`src/lib/image.js`) e embuti-la
  no JSON da entrada.
- **Rationale**: Mantém tudo autocontido no `localStorage`, sem servidor de arquivos. Simples
  de exibir (`<img src=base64>`).
- **Alternatives considered**: Object URLs (não persistem entre sessões); upload externo
  (viola "sem APIs externas"). **Risco R1**: base64 incha o tamanho e pode estourar a cota →
  mitigado por tratamento de erro na escrita e, opcionalmente, redimensionamento/compressão.

## D3 — Roteamento

- **Decision**: React Router 7 com `HashRouter`.
- **Rationale**: Deep links (`/manga/:id`) funcionam em hospedagem estática sem regras de
  reescrita no servidor. 5 rotas mapeadas no `App.jsx`.
- **Alternatives considered**: `BrowserRouter` (exigiria fallback de servidor — incompatível
  com host estático puro).

## D4 — Tema e estilo

- **Decision**: Tailwind CSS v4 via `@tailwindcss/vite`, com tema galaxy definido por tokens
  em `src/index.css` (pretos do espaço, roxos cósmicos, acentos neon violeta/ciano).
- **Rationale**: Princípio I exige tokens de tema (sem cores hardcoded). Mapas de estilo por
  país/status centralizados em `constants.js`.
- **Alternatives considered**: CSS Modules / styled-components (mais verboso; perde o sistema
  de design utilitário consistente).

## D5 — Animações

- **Decision**: Framer Motion para transições de página (`PageTransition.jsx`) e entrada
  escalonada de cards.
- **Rationale**: Reforça a navegação (Princípio I) com pouca complexidade declarativa. MUST
  respeitar `prefers-reduced-motion` (Princípio IV).
- **Alternatives considered**: CSS transitions puras (menos controle sobre orquestração de
  listas e transições de rota).

## D6 — Visualização de dados

- **Decision**: Recharts para o gráfico de distribuição de notas na home.
- **Rationale**: Componente de gráfico pronto, responsivo, integra-se ao React. Cobre a parte
  de "análise" do produto.
- **Alternatives considered**: Chart.js (imperativo, menos idiomático em React); SVG manual
  (esforço desproporcional).

## D7 — Ícones

- **Decision**: Lucide React.
- **Rationale**: Conjunto leve, tree-shakeable e consistente com o visual moderno.
- **Alternatives considered**: Font icon sets (custo de fonte e menos controle de acessibilidade).

## D8 — Estado da coleção

- **Decision**: Hook `useMangaCollection` (CRUD + stats derivadas) exposto globalmente via
  Context Provider; diálogo de exclusão controlado por `useDeleteConfirmation`.
- **Rationale**: Isola a lógica de domínio dos componentes (Princípio III); `stats` e
  ordenação são derivados com `useMemo`. Migração de status padrão "Completo" aplicada na
  carga (`withDefaultStatus`) — atende FR-022.
- **Alternatives considered**: Redux/Zustand (overhead desnecessário para a escala); prop
  drilling (pioraria a legibilidade).

## D9 — Estratégia de testes

- **Decision**: Validação manual guiada por `quickstart.md` + `npm run lint`/`npm run build`
  como portões. Sem suíte automatizada nesta versão.
- **Rationale**: Escopo pessoal, sem lógica de backend; a constituição não exige TDD. Portões
  de build/lint capturam regressões estruturais.
- **Alternatives considered**: Vitest + Testing Library (valioso no futuro; fora do escopo
  desta versão para manter simplicidade — YAGNI, Princípio III).
