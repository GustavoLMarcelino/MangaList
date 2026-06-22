<!--
Sync Impact Report
==================
Version change: TEMPLATE (unversioned) → 1.0.0
Bump rationale: Initial ratification — placeholders replaced with concrete principles
  for the MangaVault project. First adopted version.

Modified principles:
  - [PRINCIPLE_1_NAME] → I. Identidade Visual Galaxy (UI/UX Moderna)
  - [PRINCIPLE_2_NAME] → II. Persistência Local Confiável (localStorage)
  - [PRINCIPLE_3_NAME] → III. Código React Limpo e Componentizado
  - [PRINCIPLE_4_NAME] → IV. Acessibilidade WCAG 2.1 AA
  - [PRINCIPLE_5_NAME] → V. Experiência Intuitiva sem Tutorial (pt-BR)

Added sections:
  - Restrições Tecnológicas (Additional Constraints)
  - Fluxo de Desenvolvimento e Portões de Qualidade (Development Workflow)

Removed sections: none

Templates requiring updates:
  - ✅ .specify/templates/plan-template.md (Constitution Check gates align — no edit needed)
  - ✅ .specify/templates/spec-template.md (mandatory sections compatible — no edit needed)
  - ✅ .specify/templates/tasks-template.md (task categories compatible — no edit needed)
  - ✅ README.md (consistent with principles — no edit needed)

Follow-up TODOs: none
-->

# Constituição do MangaVault

## Princípios Fundamentais

### I. Identidade Visual Galaxy (UI/UX Moderna)

Toda interface MUST seguir o tema galaxy estabelecido — pretos do espaço profundo, roxos
cósmicos e acentos neon (violeta/ciano) — usando exclusivamente os tokens de tema do
Tailwind v4; valores de cor hardcoded fora do tema são PROIBIDOS. Transições de página e
entrada de elementos MUST usar Framer Motion com animações sutis que reforçam a navegação
sem distrair. Componentes interativos MUST ter estados visuais distintos (hover, foco,
ativo, desabilitado). O layout MUST ser responsivo nos grids definidos (2/3/4 colunas)
sem quebra ou rolagem horizontal em telas de 320px ou mais.

**Razão**: A identidade visual é o principal diferencial do produto; consistência via
tokens garante coesão e permite evoluir a paleta sem caçar cores espalhadas pelo código.

### II. Persistência Local Confiável (localStorage)

`localStorage` é a ÚNICA fonte de verdade — não há backend, login ou rede. Toda leitura e
escrita MUST passar por uma camada de acesso dedicada (não acessar `localStorage`
diretamente nos componentes). Operações de escrita MUST ser envolvidas em tratamento de
erro que lida com cota excedida (imagens base64 são grandes) e JSON corrompido, sem quebrar
a aplicação. Mudanças de formato de dado MUST preservar entradas existentes via migração ou
valores-padrão (ex.: entradas sem `status` assumem "Completo"). Nenhum dado do usuário
MUST ser enviado para fora do navegador.

**Razão**: Sem servidor, a integridade dos dados do usuário depende inteiramente do
tratamento correto do armazenamento local; falhas silenciosas resultam em perda de coleção.

### III. Código React Limpo e Componentizado

Componentes MUST ter responsabilidade única e ser pequenos o suficiente para serem lidos
de uma vez. Lógica reutilizável MUST ser extraída em hooks customizados ou utilitários; a
duplicação de lógica de domínio (acesso a dados, formatação, validação) é PROIBIDA.
Componentes de apresentação MUST ser separados da lógica de acesso/manipulação de dados.
Nomes MUST ser descritivos e o código MUST passar no `npm run lint` sem warnings antes de
ser considerado completo. A complexidade adicionada (nova dependência, abstração,
padrão) MUST ser justificada — na dúvida, aplique YAGNI.

**Razão**: Um código pequeno, sem duplicação e bem nomeado mantém um projeto solo
sustentável e reduz a superfície de bugs à medida que novas funcionalidades chegam.

### IV. Acessibilidade WCAG 2.1 AA

Toda interface MUST atingir o nível WCAG 2.1 AA. Contraste de texto MUST ser de no mínimo
4.5:1 (3:1 para texto grande) — crítico dado o tema escuro de alto contraste. Todo elemento
interativo MUST ser operável por teclado, com foco visível e ordem de tabulação lógica.
Imagens MUST ter texto alternativo, controles de formulário MUST ter rótulos associados, e
elementos não-semânticos interativos MUST receber papéis/ARIA apropriados. Animações MUST
respeitar `prefers-reduced-motion`. Informação MUST NOT ser transmitida apenas por cor.

**Razão**: Acessibilidade é um requisito não-negociável de qualidade e inclusão; o tema
visual marcante torna o contraste e o respeito a preferências de movimento ainda mais
críticos.

### V. Experiência Intuitiva sem Tutorial (pt-BR)

Todo fluxo MUST ser autoexplicativo: um usuário brasileiro novo MUST conseguir adicionar,
editar, buscar e visualizar uma entrada sem instruções externas. Todo texto de interface
MUST estar em português brasileiro (pt-BR) natural — rótulos, mensagens de erro, estados
vazios e confirmações. Estados vazios, de carregamento e de erro MUST ser tratados com
mensagens claras que orientam o próximo passo. Ações destrutivas (excluir) MUST pedir
confirmação. A navegação principal MUST estar acessível em todas as rotas.

**Razão**: O produto não tem onboarding nem suporte; a clareza da própria interface, em
linguagem nativa do público-alvo, é o que determina se o usuário consegue usá-lo.

## Restrições Tecnológicas

A stack MUST permanecer: React + Vite, React Router em `HashRouter` (para suportar deep
links em hospedagem estática sem regras de reescrita), Tailwind CSS v4 com o tema galaxy
customizado, Framer Motion para animações, Recharts para gráficos e Lucide React para
ícones. Adicionar uma dependência que duplique uma capacidade já coberta por essas
bibliotecas é PROIBIDO. A aplicação MUST permanecer 100% client-side e funcionar offline
após o carregamento inicial. Imagens de capa MUST ser armazenadas como base64 no
`localStorage`, respeitando o tratamento de cota do Princípio II.

## Fluxo de Desenvolvimento e Portões de Qualidade

Antes de uma mudança ser considerada concluída, ela MUST: (1) passar no `npm run lint` sem
warnings; (2) construir com sucesso via `npm run build`; (3) ser verificada manualmente nas
rotas afetadas em pelo menos uma viewport móvel (≤375px) e uma desktop. Mudanças que tocam
UI MUST ser checadas contra os Princípios I e IV (tema e acessibilidade). Mudanças que
tocam armazenamento MUST ser checadas contra o Princípio II (migração e tratamento de
erro). Texto de interface novo MUST estar em pt-BR (Princípio V).

## Governança

Esta constituição supersede outras práticas de desenvolvimento do projeto. Emendas MUST ser
documentadas neste arquivo com versão atualizada, data e justificativa. O versionamento
segue SemVer: MAJOR para remoção/redefinição incompatível de princípios; MINOR para adição
ou expansão material de orientação; PATCH para esclarecimentos e correções não-semânticas.
Toda revisão de mudança MUST verificar conformidade com os princípios aplicáveis;
complexidade não justificada MUST ser rejeitada ou registrada em "Complexity Tracking" no
plano. Para orientação de desenvolvimento em tempo de execução, consulte o plano atual e o
`README.md`.

**Version**: 1.0.0 | **Ratified**: 2026-06-22 | **Last Amended**: 2026-06-22
