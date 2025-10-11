# Plano de Ação: Integração de Endpoints e Frontend (Revisado e Detalhado)

Este documento detalha o plano de integração entre os serviços da API e os componentes de frontend. As seções foram atualizadas para incluir todos os endpoints e as novas páginas criadas.

---

## 1. Receitas (`receitas.service.ts`)

*(Plano original mantido)*

---

## 2. Despesas (`despesas.service.ts`)

*(Plano original mantido)*

---

## 3. Contratos e Aditivos (`contratos.service.ts`, `aditivos.service.ts`)

-   **Serviços:** `contratos.service.ts`, `aditivos.service.ts`
-   **Telas Associadas:** `sgc-ts/app/projetos/page.tsx`
-   **Componentes:** `contratos-view.tsx`, `contratos-list.tsx`, `contrato-form.tsx`, `sgc-ts/components/aditivos/aditivos-manager.tsx`

### Mapeamento de Endpoints (Contratos)

| Endpoint/Função | Componente(s) | Descrição da Implementação |
| :--- | :--- | :--- |
| `getContratos` | `contratos-list.tsx` | Listar todos os contratos. |
| `getContratoById` | `contrato-form.tsx` | Buscar dados de um contrato para edição. |
| `createContrato` | `contrato-form.tsx` | Formulário para criar um novo contrato. |
| `updateContrato` | `contrato-form.tsx` | Formulário para editar um contrato. |
| `deleteContrato` | `contratos-list.tsx` | Botão para excluir um contrato. |

### Mapeamento de Endpoints (Aditivos)

| Endpoint/Função | Componente(s) | Descrição da Implementação |
| :--- | :--- | :--- |
| `getAditivosByContrato` | `aditivos-manager.tsx` | Listar aditivos na página de detalhe do contrato. |
| `getAditivoById` | `aditivo-form.tsx` | (Dentro de um Dialog) - Buscar dados para edição. |
| `createAditivo` | `aditivo-form.tsx` | (Dentro de um Dialog) - Formulário para novo aditivo. |
| `updateAditivo` | `aditivo-form.tsx` | (Dentro de um Dialog) - Formulário para editar aditivo. |

---

## 4. Orçamentos (`orcamentos.service.ts`, `linhas-orcamentarias.service.ts`)

-   **Telas Associadas:** `sgc-ts/app/orcamento/page.tsx`

### Mapeamento de Endpoints

| Endpoint/Função | Componente(s) | Descrição da Implementação |
| :--- | :--- | :--- |
| `getOrcamentoByContratoId` | `orcamento-view.tsx` | Função principal para carregar o orçamento do contrato. |
| `getOrcamentoById` | `orcamento-view.tsx` | Pode ser usado para buscar um orçamento específico se necessário. |
| `createOrcamento` | `orcamento-form.tsx` | Criar o orçamento inicial de um contrato. |
| `updateOrcamento` | `orcamento-form.tsx` | Editar dados gerais do orçamento. |
| `deleteOrcamento` | `orcamento-view.tsx` | Botão para excluir o orçamento (se aplicável). |
| `createLinhaOrcamentaria` | `linha-orcamentaria-form.tsx` | Adicionar nova linha ao orçamento. |
| `updateLinhaOrcamentaria` | `linha-orcamentaria-form.tsx` | Editar uma linha orçamentária. |
| `deleteLinhaOrcamentaria` | `orcamento-list.tsx` | Excluir uma linha orçamentária. |

---

## 5. Plano de Trabalho (NOVA PÁGINA)

-   **Telas Associadas:** `sgc-ts/app/plano-de-trabalho/page.tsx`

### Mapeamento de Endpoints

| Endpoint/Função | Componente(s) | Descrição da Implementação |
| :--- | :--- | :--- |
| `getPlanoTrabalhoByContratoId`| `plano-de-trabalho-view.tsx` | Carregar o plano de trabalho do contrato. |
| `getPlanoTrabalhoById` | `plano-de-trabalho-view.tsx` | Buscar um plano específico pelo seu ID. |
| `createPlanoTrabalho` | `plano-de-trabalho-view.tsx` | Criar o plano de trabalho inicial. |
| `updatePlanoTrabalho` | `plano-de-trabalho-view.tsx` | Editar dados gerais do plano. |
| `deletePlanoTrabalho` | `plano-de-trabalho-view.tsx` | Excluir um plano de trabalho. |
| `createItemPlanoTrabalho` | `item-trabalho-form.tsx` | Adicionar novo item ao plano. |
| `updateItemPlanoTrabalho` | `item-trabalho-form.tsx` | Editar um item. |
| `deleteItemPlanoTrabalho` | `itens-trabalho-list.tsx` | Excluir um item. |
| `getExecucoesByItemPlanoTrabalho`| `item-trabalho-detail.tsx` | Listar execuções de um item. |
| `createExecucaoItemPlanoTrabalho`| `execucao-form.tsx` | Registrar nova execução. |

---

## 6. Fornecedores (NOVA PÁGINA)

-   **Telas Associadas:** `sgc-ts/app/fornecedores/page.tsx`

### Mapeamento de Endpoints

| Endpoint/Função | Componente(s) | Descrição da Implementação |
| :--- | :--- | :--- |
| `getFornecedores` | `fornecedores-list.tsx` | Listar e paginar fornecedores. |
| `getFornecedorById` | `fornecedor-form.tsx` | Buscar dados para edição. |
| `createFornecedor` | `fornecedor-form.tsx` | Formulário para novo fornecedor. |
| `updateFornecedor` | `fornecedor-form.tsx` | Formulário para editar fornecedor. |
| `deleteFornecedor` | `fornecedores-list.tsx` | Botão para excluir fornecedor. |

---

## 7. Anexos e Cumprimento do Objeto

-   **Telas Associadas:** `sgc-ts/app/objeto/page.tsx`

*(Plano original mantido)*

---

## 8. Organizações Sociais e Unidades

-   **Telas Associadas:** `sgc-ts/app/analise/page.tsx` (Aba "Organizações") e `sgc-ts/app/unidades/page.tsx` (Página dedicada)

### Mapeamento (Aba em Análise)

| Endpoint/Função | Componente(s) | Descrição da Implementação |
| :--- | :--- | :--- |
| `getOrganizacoesSociais` | `organizacoes-list.tsx` | Listar organizações na aba. |
| `getOrganizacaoSocialById`| `organizacao-form.tsx` | Buscar dados para edição. |
| `createOrganizacaoSocial` | `organizacao-form.tsx` | Formulário para nova organização. |
| `updateOrganizacaoSocial` | `organizacao-form.tsx` | Formulário para editar organização. |
| `deleteOrganizacaoSocial` | `organizacoes-list.tsx` | Botão para excluir organização. |
| `createUnidadeForOrganizacaoSocial` | `unidades-list.tsx` | Criar unidade associada a uma organização. |

### Mapeamento (Página de Unidades)

| Endpoint/Função | Componente(s) | Descrição da Implementação |
| :--- | :--- | :--- |
| `getUnidades` | `unidades-list.tsx` | Listar todas as unidades cadastradas. |
| `getUnidadeById` | `unidade-form.tsx` | Buscar dados para edição. |
| `createUnidade` | `unidade-form.tsx` | Formulário para nova unidade. |
| `updateUnidade` | `unidade-form.tsx` | Formulário para editar unidade. |
| `deleteUnidade` | `unidades-list.tsx` | Botão para excluir unidade. |

---

## 9. Centro de Custo

-   **Telas Associadas:** `sgc-ts/app/execucao/page.tsx` (Aba "Contas Bancárias")

*(Plano original mantido)*

---

## 10. Configurações (NOVA PÁGINA)

-   **Serviço:** `categorias.service.ts`
-   **Telas Associadas:** `sgc-ts/app/configuracoes/page.tsx`

### Mapeamento de Endpoints

| Endpoint/Função | Componente(s) | Descrição da Implementação |
| :--- | :--- | :--- |
| `getCategorias...` | `CategoriaManager` | Listar categorias por tipo (Despesa, Linha, etc). |
| `createCategoria...` | `CategoriaManager` | Formulário para criar categoria. |
| `updateCategoria` | `CategoriaManager` | Formulário para editar categoria. |
| `deleteCategoria` | `CategoriaManager` | Botão para excluir categoria. |
