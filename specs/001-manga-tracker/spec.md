# Especificação de Funcionalidade: Rastreador Pessoal de Mangás (MangaList)

**Feature Branch**: `001-manga-tracker`

**Created**: 2026-06-22

**Status**: Draft

**Input**: Descrição do usuário: "MangaList é uma plataforma pessoal de rastreamento e análise de mangás. O usuário adiciona manualmente títulos japoneses, coreanos e chineses com: título, país de origem, nota de 0 a 10, review pessoal, capítulos lidos, status de leitura e capa. Pode editar e excluir entradas. A home exibe stats gerais e top 5. A biblioteca tem busca, filtros por país e status, e ordenação. Cada manga tem página de detalhes. Sem login, 100% offline."

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Registrar e visualizar um mangá (Priority: P1)

O usuário registra manualmente uma obra que está acompanhando, informando título, país de
origem, nota, review pessoal, capítulos lidos, status de leitura e uma capa. Após salvar, a
obra passa a aparecer na sua coleção e fica disponível para consulta posterior.

**Why this priority**: É a razão de existir do produto. Sem a capacidade de registrar e ver
uma obra, nenhuma outra funcionalidade entrega valor. Sozinha, já constitui um MVP utilizável.

**Independent Test**: Pode ser totalmente testada adicionando uma obra com todos os campos e
confirmando que ela aparece persistida na coleção, inclusive após recarregar a aplicação.

**Acceptance Scenarios**:

1. **Given** a coleção está vazia, **When** o usuário preenche título, país, nota, review,
   capítulos lidos, status e capa e confirma, **Then** a obra é salva e passa a aparecer na
   coleção.
2. **Given** uma obra foi salva, **When** o usuário fecha e reabre a aplicação, **Then** a
   obra continua presente com todos os seus dados.
3. **Given** o usuário está preenchendo uma nova obra, **When** ele informa um título vazio,
   **Then** o sistema impede o salvamento e indica que o título é obrigatório.
4. **Given** o usuário está preenchendo a nota, **When** informa um valor fora da faixa de 0
   a 10, **Then** o sistema impede o salvamento e sinaliza a faixa válida.

---

### User Story 2 - Editar e excluir entradas (Priority: P2)

O usuário corrige ou atualiza os dados de uma obra já registrada (por exemplo, avança os
capítulos lidos, muda o status ou ajusta a nota) e pode remover obras que não deseja mais
acompanhar.

**Why this priority**: O acompanhamento de leitura é contínuo; sem edição os dados ficam
obsoletos rapidamente. É essencial, mas depende de já existir o registro (US1).

**Independent Test**: Pode ser testada editando uma obra existente, confirmando a persistência
da alteração, e excluindo outra obra, confirmando que ela desaparece da coleção.

**Acceptance Scenarios**:

1. **Given** uma obra existe, **When** o usuário altera um ou mais campos e confirma, **Then**
   os novos valores são persistidos e refletidos na coleção e no detalhe.
2. **Given** uma obra existe, **When** o usuário solicita excluí-la, **Then** o sistema pede
   confirmação antes de remover.
3. **Given** o usuário confirmou a exclusão, **When** a operação conclui, **Then** a obra
   deixa de aparecer na coleção e nas estatísticas.

---

### User Story 3 - Explorar a biblioteca (busca, filtros e ordenação) (Priority: P2)

O usuário navega por toda a sua coleção, busca por título, filtra por país de origem e por
status de leitura, e ordena os resultados para encontrar rapidamente o que procura.

**Why this priority**: À medida que a coleção cresce, encontrar uma obra específica torna-se
inviável sem busca e filtros. Agrega muito valor, mas pressupõe obras já registradas (US1).

**Independent Test**: Pode ser testada com uma coleção de várias obras, aplicando busca,
cada filtro e cada critério de ordenação, e verificando que o conjunto exibido corresponde
ao esperado.

**Acceptance Scenarios**:

1. **Given** a coleção tem várias obras, **When** o usuário digita parte de um título na
   busca, **Then** apenas as obras cujo título corresponde são exibidas.
2. **Given** a coleção tem obras de países diferentes, **When** o usuário filtra por um país,
   **Then** apenas as obras daquele país são exibidas.
3. **Given** a coleção tem obras em status diferentes, **When** o usuário filtra por um
   status, **Then** apenas as obras naquele status são exibidas.
4. **Given** resultados estão sendo exibidos, **When** o usuário escolhe um critério de
   ordenação (maior nota, menor nota, A–Z, Z–A, mais recente), **Then** a lista é reordenada
   de acordo.
5. **Given** filtros e busca ativos não retornam nenhuma obra, **When** a lista é renderizada,
   **Then** o sistema exibe um estado vazio claro orientando o próximo passo.

---

### User Story 4 - Consultar a página de detalhes de uma obra (Priority: P3)

O usuário abre uma obra específica e vê todas as suas informações de forma completa, incluindo
a capa, os indicadores de status/país/nota e o texto integral da review pessoal.

**Why this priority**: Enriquece a experiência de consulta, mas o valor central já é entregue
pela listagem (US1/US3). É um aprimoramento sobre a base existente.

**Independent Test**: Pode ser testada abrindo o detalhe de uma obra e verificando que todos
os campos registrados são exibidos integralmente.

**Acceptance Scenarios**:

1. **Given** uma obra existe, **When** o usuário abre seu detalhe, **Then** título, país,
   status, nota, capítulos lidos, capa e a review completa são exibidos.
2. **Given** o usuário está no detalhe de uma obra, **When** escolhe editar ou excluir, **Then**
   é levado para a respectiva ação sobre aquela obra.

---

### User Story 5 - Acompanhar visão geral na home (Priority: P3)

Ao abrir a aplicação, o usuário vê um panorama da sua coleção — estatísticas gerais e um
destaque das obras mais bem avaliadas — que serve de ponto de partida para a navegação.

**Why this priority**: Oferece síntese e motivação, mas depende de já haver obras registradas
e não é necessária para registrar ou consultar dados.

**Independent Test**: Pode ser testada com uma coleção conhecida, verificando que os números
agregados e a lista de destaque correspondem aos dados registrados.

**Acceptance Scenarios**:

1. **Given** a coleção tem obras, **When** o usuário abre a home, **Then** são exibidos o total
   de obras registradas, o total de capítulos lidos e a nota média.
2. **Given** a coleção tem ao menos cinco obras, **When** o usuário abre a home, **Then** as
   cinco obras de maior nota são destacadas.
3. **Given** a coleção está vazia, **When** o usuário abre a home, **Then** um estado vazio
   convida o usuário a registrar a primeira obra.

---

### Edge Cases

- O que acontece quando a capa enviada é muito grande e ultrapassa o limite de armazenamento
  local? O sistema MUST informar a falha sem corromper a coleção existente nem travar.
- Como o sistema se comporta com uma obra registrada antes de o campo de status existir? Ela
  MUST assumir um status padrão ("Completo") em vez de ficar sem valor.
- Como a nota média é calculada quando ainda não há obras? O sistema MUST exibir um valor
  neutro (zero ou indicador de "sem dados") sem erro.
- O que acontece ao tentar abrir o detalhe de uma obra inexistente (link inválido)? O sistema
  MUST exibir uma mensagem clara em vez de uma tela quebrada.
- Como a busca trata acentuação e diferenças de maiúsculas/minúsculas? A busca MUST ser
  tolerante a caixa para corresponder de forma intuitiva.
- O que acontece se o armazenamento local contiver dados corrompidos? O sistema MUST iniciar
  de forma resiliente sem impedir o uso da aplicação.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: O sistema MUST permitir registrar uma obra com os campos: título, país de origem,
  nota, review pessoal, capítulos lidos, status de leitura e capa.
- **FR-002**: O sistema MUST restringir o país de origem a Japonês, Coreano ou Chinês.
- **FR-003**: O sistema MUST aceitar nota apenas na faixa de 0 a 10, permitindo casas decimais.
- **FR-004**: O sistema MUST restringir o status de leitura aos valores: Lendo, Completo,
  Pausado e Abandonado.
- **FR-005**: O sistema MUST exigir um título não vazio para salvar uma obra; demais campos
  MAY ter valores-padrão razoáveis quando não informados.
- **FR-006**: O sistema MUST permitir registrar uma imagem de capa associada à obra e exibi-la
  na coleção e no detalhe.
- **FR-007**: O sistema MUST permitir editar qualquer campo de uma obra já registrada e
  persistir a alteração.
- **FR-008**: O sistema MUST permitir excluir uma obra, solicitando confirmação antes da
  remoção definitiva.
- **FR-009**: O sistema MUST persistir todas as obras localmente, de modo que permaneçam
  disponíveis após fechar e reabrir a aplicação.
- **FR-010**: O sistema MUST funcionar 100% offline e MUST NOT exigir login, conta ou conexão
  com servidor.
- **FR-011**: O sistema MUST NOT transmitir os dados do usuário para fora do dispositivo.
- **FR-012**: O sistema MUST oferecer uma biblioteca que liste todas as obras registradas.
- **FR-013**: O sistema MUST permitir buscar obras por título, de forma tolerante a
  maiúsculas/minúsculas.
- **FR-014**: O sistema MUST permitir filtrar a biblioteca por país de origem.
- **FR-015**: O sistema MUST permitir filtrar a biblioteca por status de leitura.
- **FR-016**: O sistema MUST permitir ordenar a biblioteca por maior nota, menor nota, A–Z,
  Z–A e mais recente.
- **FR-017**: O sistema MUST exibir um estado vazio claro quando a busca/filtros não retornarem
  resultados e quando a coleção estiver vazia.
- **FR-018**: O sistema MUST oferecer uma página de detalhes por obra exibindo todos os seus
  campos, incluindo a review completa e indicadores de status, país e nota.
- **FR-019**: O sistema MUST oferecer uma home com estatísticas gerais: total de obras, total
  de capítulos lidos e nota média.
- **FR-020**: O sistema MUST destacar na home as cinco obras de maior nota.
- **FR-021**: O sistema MUST tratar falhas de armazenamento (cota excedida, dados corrompidos)
  sem perda da coleção existente nem travamento da aplicação.
- **FR-022**: O sistema MUST atribuir status "Completo" como padrão a obras que não possuam
  status registrado.
- **FR-023**: Toda a interface MUST estar em português brasileiro (pt-BR).

### Key Entities *(include if feature involves data)*

- **Obra (Mangá)**: Representa um título acompanhado pelo usuário. Atributos: identificador
  único, título, país de origem (Japonês/Coreano/Chinês), nota (0–10), review pessoal,
  capítulos lidos, status de leitura (Lendo/Completo/Pausado/Abandonado), capa (imagem) e data
  de criação (para ordenação por mais recente).
- **Coleção**: Conjunto de todas as Obras registradas pelo usuário, mantido localmente no
  dispositivo. É a base para as estatísticas, a listagem da biblioteca e os destaques da home.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Um usuário novo consegue registrar sua primeira obra completa em menos de 2
  minutos, sem consultar instruções externas.
- **SC-002**: 100% das obras registradas permanecem disponíveis com todos os seus dados após
  fechar e reabrir a aplicação.
- **SC-003**: Em uma coleção com pelo menos 50 obras, o usuário localiza uma obra específica
  por busca ou filtros em menos de 10 segundos.
- **SC-004**: 100% das ações principais (registrar, editar, excluir, buscar, filtrar, ordenar,
  ver detalhe) são concluídas sem necessidade de login ou conexão de rede.
- **SC-005**: As estatísticas da home (total de obras, total de capítulos, nota média) e o
  top 5 correspondem exatamente aos dados registrados em 100% dos casos.
- **SC-006**: 90% dos usuários concluem o registro de uma obra na primeira tentativa, sem erro
  bloqueante não compreendido.
- **SC-007**: Nenhum dado do usuário sai do dispositivo em qualquer fluxo da aplicação.

## Assumptions

- A aplicação é de uso pessoal e single-user por dispositivo; não há compartilhamento,
  sincronização entre dispositivos nem múltiplas contas.
- Os dados são mantidos no armazenamento local do navegador; limpar esse armazenamento apaga a
  coleção, e esse comportamento é aceitável para o escopo pessoal/offline.
- A nota admite uma casa decimal (ex.: 8,5), considerada granularidade suficiente para
  avaliação pessoal.
- As capas são fornecidas pelo próprio usuário (upload/colagem) e armazenadas localmente; não
  há busca automática de capas em serviços externos.
- "Mais recente" na ordenação refere-se à data de criação/registro da obra na coleção.
- O público-alvo é brasileiro e toda a interface é em pt-BR; internacionalização está fora do
  escopo desta versão.
- A análise de mangás se restringe às estatísticas agregadas descritas (totais, média, top 5)
  e à distribuição por nota/status; relatórios avançados estão fora de escopo nesta versão.
