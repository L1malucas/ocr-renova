export interface DespesaDto {
  /** @format uuid */
  id?: string;
  descricao?: string | null;
  /** @format double */
  valor?: number;
  /** @format date-time */
  dataDespesa?: string;
  estaPaga?: boolean;
  foraDoOrcamento?: boolean;
  /** @format uuid */
  linhaOrcamentariaId?: string;
  /** @format uuid */
  centroCustoId?: string | null;
  nomeCentroCusto?: string | null;
  /** @format uuid */
  fornecedorId?: string | null;
  nomeFornecedor?: string | null;
  /** @format uuid */
  categoriaId?: string;
  nomeCategoria?: string | null;
}
export interface DespesaDtoApiResponse {
  success?: boolean;
  data?: DespesaDto;
  messages?: string[] | null;
}

export interface DespesaDtoPagedApiResponse {
  success?: boolean;
  data?: DespesaDto[] | null;
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
     * @tags Despesas
     * @name DespesasList
     * @request GET:/api/despesas
     */
    despesasList: (
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
      this.request<DespesaDtoPagedApiResponse, ProblemDetails>({
        path: `/api/despesas`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Despesas
     * @name DespesasCreate
     * @request POST:/api/despesas
     */
    despesasCreate: (data: CriarDespesaDto, params: RequestParams = {}) =>
      this.request<DespesaDtoApiResponse, ObjectApiResponse>({
        path: `/api/despesas`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Despesas
     * @name DespesasDetail
     * @request GET:/api/despesas/{id}
     */
    despesasDetail: (id: string, params: RequestParams = {}) =>
      this.request<DespesaDtoApiResponse, ObjectApiResponse>({
        path: `/api/despesas/${id}`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Despesas
     * @name DespesasDelete
     * @request DELETE:/api/despesas/{id}
     */
    despesasDelete: (id: string, params: RequestParams = {}) =>
      this.request<void, ObjectApiResponse>({
        path: `/api/despesas/${id}`,
        method: "DELETE",
        ...params,
      }),
