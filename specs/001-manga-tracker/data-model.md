# Phase 1 — Data Model: Rastreador Pessoal de Mangás (MangaList)

A persistência é local. A "fonte de verdade" é um array de **Entradas (Obras)** serializado
em JSON sob a chave `localStorage` `mangavault.entries.v1`.

## Entidade: Obra (Manga Entry)

| Campo         | Tipo            | Obrigatório | Regras / Validação |
|---------------|-----------------|-------------|--------------------|
| `id`          | string          | sim         | Único; gerado via `crypto.randomUUID()` (fallback timestamp+random). Imutável. |
| `title`       | string          | sim         | Não vazio após `trim()`. Bloqueia salvamento se vazio (FR-005). |
| `country`     | enum string     | sim         | Um de `Japanese` \| `Korean` \| `Chinese` (FR-002). |
| `status`      | enum string     | sim         | Um de `lendo` \| `completo` \| `pausado` \| `abandonado` (FR-004). Padrão `completo` quando ausente (FR-022). |
| `score`       | number          | sim         | Faixa 0–10, uma casa decimal permitida (FR-003). |
| `review`      | string          | não         | Texto livre; `trim()` aplicado. Pode ser vazio. |
| `chaptersRead`| number (int ≥0) | não         | Inteiro não negativo; entra no total de capítulos. |
| `cover`       | string \| null  | não         | Imagem em base64 (FR-006) ou `null`. |
| `createdAt`   | number (epoch)  | sim         | Definido na criação; base para ordenação "mais recente". Imutável. |
| `updatedAt`   | number (epoch)  | sim         | Atualizado a cada edição. |

### Enumerações

- **País de origem** (`COUNTRIES`): `Japanese` (Japonês/JP), `Korean` (Coreano/KR),
  `Chinese` (Chinês/CN).
- **Status de leitura** (`STATUSES`): `lendo` (Lendo), `completo` (Completo), `pausado`
  (Pausado), `abandonado` (Abandonado).

> Os valores são armazenados em chaves estáveis (en) e exibidos via labels pt-BR
> (`countryLabel`/`statusLabel`), mantendo a interface 100% em pt-BR (FR-023) sem acoplar os
> dados persistidos ao texto da UI.

## Entidade: Coleção (Collection)

- **Representação**: `Obra[]` — array de entradas no `localStorage`.
- **Operações** (via `useMangaCollection`):
  - `addEntry(data)` → cria com `id`, `createdAt`, `updatedAt`, prepende à coleção.
  - `updateEntry(id, data)` → substitui campos editáveis, atualiza `updatedAt`.
  - `deleteEntry(id)` → remove a entrada (após confirmação na UI — FR-008).
- **Derivações** (memoizadas):
  - `stats.totalManga` = nº de entradas (FR-019).
  - `stats.totalChapters` = soma de `chaptersRead` (FR-019).
  - `stats.averageScore` = média de `score`, ou `0` se coleção vazia (FR-019, edge case).
  - Ordenação padrão: por `score` desc, desempate por `createdAt` desc.
  - Top 5: as 5 maiores notas (FR-020).

## Migração / Resiliência

- **Carga resiliente**: `loadEntries()` retorna `[]` se a chave não existir ou o JSON estiver
  corrompido/inesperado (não-array) — FR-021.
- **Migração de status**: entradas sem `status` recebem `completo` na carga
  (`withDefaultStatus`) — FR-022.
- **Cota excedida**: `saveEntries()` captura exceção de escrita (capas base64 grandes) e
  registra o erro sem corromper a coleção em memória nem travar a aplicação — FR-021, Risco R1.

## Transições de estado (status de leitura)

Não há máquina de estados rígida: o usuário pode mover livremente uma obra entre `lendo`,
`completo`, `pausado` e `abandonado` via edição. Toda transição persiste e atualiza
`updatedAt`.
