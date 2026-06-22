# MangaList

Um rastreador pessoal de mangás, manhwas e manhuas com interface inspirada em galáxias. Totalmente offline, sem login, sem backend — cada entrada fica no `localStorage` do seu navegador.

## Funcionalidades

- Adicione entradas com título, país de origem (Japonês / Coreano / Chinês), status de leitura (lendo / completo / pausado / abandonado), nota (0–10, decimais permitidos, via slider animado), review pessoal, capítulos lidos e imagem de capa
- Edite ou exclua qualquer entrada
- Dashboard com total de mangás cadastrados, total de capítulos lidos e nota média
- Galeria da biblioteca com busca por título, filtros por país e status de leitura, e ordenação (maior/menor nota, A-Z, Z-A, mais recente), grid responsivo de 2/3/4 colunas
- Página inicial com destaque para os 5 títulos mais bem avaliados e gráfico de distribuição de notas (Recharts)
- Página de detalhes com badges de status, país e nota, e review completa
- Imagens de capa armazenadas em base64 diretamente no `localStorage`
- Transições de página animadas e entradas escalonadas dos cards (Framer Motion)
- Interface toda em português brasileiro (pt-BR)
- Entradas salvas antes do campo status existir assumem "Completo" como padrão

## Rotas

| Rota | Página |
| --- | --- |
| `/` | Home — hero, stats, prévia dos mais bem avaliados |
| `/biblioteca` | Biblioteca — galeria completa |
| `/adicionar` | Formulário de adição |
| `/editar/:id` | Formulário de edição |
| `/manga/:id` | Página de detalhes |

Uma navbar fixa (Início / Biblioteca) está presente em todas as rotas. O roteamento usa `HashRouter` para que links diretos funcionem em hosts estáticos sem regras de reescrita no servidor.

## Stack

- React + Vite
- React Router (`HashRouter`)
- Tailwind CSS v4 (tema galaxy customizado: pretos do espaço profundo, roxos cósmicos, acentos neon violeta/ciano)
- Framer Motion para animações
- Recharts para o gráfico de distribuição de notas
- Lucide React para ícones

## Como rodar

```bash
npm install
npm run dev
```

Abra a URL local exibida no terminal.

## Scripts

- `npm run dev` — inicia o servidor de desenvolvimento
- `npm run build` — build de produção
- `npm run preview` — prévia do build de produção
- `npm run lint` — executa o ESLint

## Dados e privacidade

Todos os dados — incluindo imagens de capa — ficam no `localStorage` do seu navegador. Nada é enviado a lugar nenhum. Limpar o armazenamento do navegador para este site apagará sua coleção.