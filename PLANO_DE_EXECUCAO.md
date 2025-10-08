# Plano de Execução: Refatoração dos Services da API

Este plano detalha os passos para refatorar os services e models, alinhando-os com a arquitetura e padrões do projeto.

## Fase 1: Preparação

- [x] Apagar os arquivos JSON de serviço vazios. (Realizado pelo usuário)

## Fase 2: Refatoração (Serviço por Serviço)

Para cada serviço, as seguintes tarefas serão executadas:

1.  Analisar o arquivo de serviço existente em `sgc-ts/services/{nome}.service.ts`.
2.  Extrair, limpar e validar as interfaces DTO do arquivo de serviço.
3.  Criar um novo arquivo de modelo bem estruturado em `sgc-ts/models/{nome}.model.ts`.
4.  Refatorar completamente o arquivo de serviço para usar o `apiClient` e os novos modelos.
5.  Adicionar uma nota de observação (`**OBS:**`) caso alguma inconsistência ou DTO faltante seja encontrada para revisão posterior.

### Lista de Serviços

- [x] **Aditivos**
    - **OBS:** Encontrada inconsistência no DTO `UpdateAmendmentDto` (campo `subject` parece incorreto, foi substituído por `objeto`). Também houve divergência de tipo no campo `tipo` entre os DTOs, que foi padronizado.
- [x] **Anexos**
- [x] **Categories**
    - **OBS:** Encontrada inconsistência no DTO `CategoryDtoListPagedApiResponse` (o gerador criou o tipo `CategoriaDto[][]` em vez de `CategoriaDto[]`). O tipo foi corrigido durante a refatoração.
- [x] **CentrosCusto**
- [x] **Contratos**
    - **OBS:** Os parâmetros de paginação gerados (`numeroPagina`, `tamanhoPagina`) foram padronizados para `pageNumber` e `pageSize` para manter a consistência com o restante da aplicação.
- [x] **Despesas**
    - **OBS:** O DTO `CriarDespesaDto` estava ausente no arquivo original e foi inferido. Uma função `updateDespesa` também foi adicionada para completar o CRUD.
- [x] **ExecucoesItemPlanoTrabalho**
    - **OBS:** Encontrada inconsistência no DTO de listagem paginada (o gerador criou o tipo `Dto[][]` em vez de `Dto[]`). O tipo foi corrigido durante a refatoração.
- [x] **Fornecedores**
    - **OBS:** Corrigida inconsistência no DTO de listagem (`Dto[][]` para `Dto[]`). Adicionada função `deleteFornecedor` para completar o CRUD, pois estava ausente.
- [x] **ItensPlanoTrabalho**
    - **OBS:** Os endpoints GET (para listagem e busca por ID) estavam ausentes no arquivo de serviço original e não foram adicionados.
- [x] **LinhasOrcamentarias**
    - **OBS:** Os endpoints GET (para listagem e busca por ID) estavam ausentes no arquivo de serviço original e não foram adicionados.
- [x] **Orcamentos**
    - **OBS:** O DTO `AtualizarOrcamentoDto` e os endpoints de `update` e `delete` estavam ausentes e foram adicionados para completar o CRUD.
- [x] **OrganizacoesSociais**
    - **OBS:** Corrigida inconsistência no DTO de listagem (`Dto[][]` para `Dto[]`). Adicionada função `deleteOrganizacaoSocial` para completar o CRUD.
- [x] **PlanosTrabalho**
    - **OBS:** O DTO `AtualizarPlanoTrabalhoDto` e os endpoints para `get by id`, `update` e `delete` estavam ausentes e foram adicionados para completar o CRUD.
- [x] **Receitas**
    - **OBS:** Corrigida inconsistência no DTO de listagem (`Dto[][]` para `Dto[]`). Adicionada função `deleteReceita` para completar o CRUD.
- [x] **Repasses**
    - **OBS:** Não foi encontrada uma API dedicada para "Repasses". A entidade "Repasse" parece ser tratada como um campo dentro do modelo `Receita` (`repasseId`, `nomeRepasse`). O arquivo `repasses.service.ts` foi esvaziado, pois continha lógica incorreta de `FonteRecurso`. Um modelo `repasse.model.ts` mínimo foi criado para manter a estrutura do plano, mas sem funções de serviço dedicadas.
- [x] **Unidades**
    - **OBS:** O arquivo de serviço original estava fragmentado e incompleto. As interfaces DTO e as funções CRUD foram inferidas e reconstruídas com base nos trechos disponíveis e nos padrões da API.

## Fase 3: Limpeza Final

- [x] Apagar o arquivo `sgc-ts/myApi.http.ts`.
- [x] Apagar o arquivo `sgc-ts/models/myApi.model.ts`.
- [x] Apagar o arquivo `sgc-ts/services/myApi.ts`.
- [x] Revisar todos os imports para garantir que o projeto compila sem erros.
