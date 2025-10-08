export interface AtualizarExecucaoItemPlanoTrabalhoDto {
  /** @format double */
  valor?: number | null;
  /** @format date-time */
  dataExecucao: string;
  observacao?: string | null;
}
export interface CriarExecucaoItemPlanoTrabalhoDto {
  /** @format uuid */
  itemPlanoTrabalhoId: string;
  /** @format double */
  valor?: number | null;
  /** @format date-time */
  dataExecucao: string;
  observacao?: string | null;
}

export interface ExecucaoItemPlanoTrabalhoDto {
  /** @format uuid */
  id?: string;
  /** @format uuid */
  itemPlanoTrabalhoId?: string;
  /** @format double */
  valor?: number | null;
  /** @format date-time */
  dataExecucao?: string;
  /** @format uuid */
  usuarioExecutorId?: string | null;
  observacao?: string | null;
}

export interface ExecucaoItemPlanoTrabalhoDtoApiResponse {
  success?: boolean;
  data?: ExecucaoItemPlanoTrabalhoDto;
  messages?: string[] | null;
}

export interface ExecucaoItemPlanoTrabalhoDtoListPagedApiResponse {
  success?: boolean;
  data?: ExecucaoItemPlanoTrabalhoDto[][] | null;
  messages?: string[] | null;
  /** @format int32 */
  pageNumber?: number;
  /** @format int32 */
  pageSize?: number;
  /** @format int32 */
  totalPages?: number;
  /** @format int32 */
  totalItems?: number;
}

    /**
     * No description
     *
     * @tags ExecucoesItemPlanoTrabalho
     * @name ItensPlanoTrabalhoExecucoesList
     * @request GET:/api/itens-plano-trabalho/{itemId}/execucoes
     */
    itensPlanoTrabalhoExecucoesList: (
      itemId: string,
      query?: {
        /**
         * @format int32
         * @default 1
         */
        pageNumber?: number;
        /**
         * @format int32
         * @default 10
         */
        pageSize?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<ExecucaoItemPlanoTrabalhoDtoListPagedApiResponse, any>({
        path: `/api/itens-plano-trabalho/${itemId}/execucoes`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags ExecucoesItemPlanoTrabalho
     * @name ItensPlanoTrabalhoExecucoesCreate
     * @request POST:/api/itens-plano-trabalho/{itemId}/execucoes
     */
    itensPlanoTrabalhoExecucoesCreate: (
      itemId: string,
      data: CriarExecucaoItemPlanoTrabalhoDto,
      params: RequestParams = {},
    ) =>
      this.request<ExecucaoItemPlanoTrabalhoDtoApiResponse, ObjectApiResponse>({
        path: `/api/itens-plano-trabalho/${itemId}/execucoes`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags ExecucoesItemPlanoTrabalho
     * @name ExecucoesItemPlanoTrabalhoUpdate
     * @request PUT:/api/execucoes-item-plano-trabalho/{execucaoId}
     */
    execucoesItemPlanoTrabalhoUpdate: (
      execucaoId: string,
      data: AtualizarExecucaoItemPlanoTrabalhoDto,
      params: RequestParams = {},
    ) =>
      this.request<void, ObjectApiResponse>({
        path: `/api/execucoes-item-plano-trabalho/${execucaoId}`,
        method: "PUT",
        body: data,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags ExecucoesItemPlanoTrabalho
     * @name ExecucoesItemPlanoTrabalhoDelete
     * @request DELETE:/api/execucoes-item-plano-trabalho/{execucaoId}
     */
    execucoesItemPlanoTrabalhoDelete: (
      execucaoId: string,
      params: RequestParams = {},
    ) =>
      this.request<void, ObjectApiResponse>({
        path: `/api/execucoes-item-plano-trabalho/${execucaoId}`,
        method: "DELETE",
        ...params,
      }),