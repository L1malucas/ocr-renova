    export interface CriarReceitaDto {
  /** @minLength 1 */
  descricao: string;
  /**
   * @format double
   * @min 0.01
   */
  valor: number;
  /** @format date-time */
  dataRecebimento: string;
  /** @format uuid */
  repasseId?: string | null;
  /** @format uuid */
  centroCustoId?: string | null;
  /** @format uuid */
  categoriaId: string;
  observacoes?: string | null;
}

export interface ReceitaDto {
  /** @format uuid */
  id?: string;
  descricao?: string | null;
  /** @format double */
  valor?: number;
  /** @format date-time */
  dataRecebimento?: string;
  /** @format uuid */
  repasseId?: string | null;
  nomeRepasse?: string | null;
  /** @format uuid */
  centroCustoId?: string | null;
  nomeCentroCusto?: string | null;
  /** @format uuid */
  categoriaId?: string;
  nomeCategoria?: string | null;
  observacoes?: string | null;
}

export interface ReceitaDtoApiResponse {
  success?: boolean;
  data?: ReceitaDto;
  messages?: string[] | null;
}

export interface ReceitaDtoListPagedApiResponse {
  success?: boolean;
  data?: ReceitaDto[][] | null;
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

export interface AtualizarReceitaDto {
  /** @minLength 1 */
  descricao: string;
  /**
   * @format double
   * @min 0.01
   */
  valor: number;
  /** @format date-time */
  dataRecebimento: string;
  /** @format uuid */
  repasseId?: string | null;
  /** @format uuid */
  centroCustoId?: string | null;
  /** @format uuid */
  categoriaId: string;
  observacoes?: string | null;
}/**
     * No description
     *
     * @tags Receitas
     * @name ReceitasList
     * @request GET:/api/receitas
     */
    receitasList: (
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
      this.request<ReceitaDtoListPagedApiResponse, any>({
        path: `/api/receitas`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Receitas
     * @name ReceitasCreate
     * @request POST:/api/receitas
     */
    receitasCreate: (data: CriarReceitaDto, params: RequestParams = {}) =>
      this.request<ReceitaDtoApiResponse, ObjectApiResponse>({
        path: `/api/receitas`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Receitas
     * @name ReceitasDetail
     * @request GET:/api/receitas/{id}
     */
    receitasDetail: (id: string, params: RequestParams = {}) =>
      this.request<ReceitaDtoApiResponse, ObjectApiResponse>({
        path: `/api/receitas/${id}`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Receitas
     * @name ReceitasUpdate
     * @request PUT:/api/receitas/{id}
     */
    receitasUpdate: (
      id: string,
      data: AtualizarReceitaDto,
      params: RequestParams = {},
    ) =>
      this.request<void, ObjectApiResponse>({
        path: `/api/receitas/${id}`,
        method: "PUT",
        body: data,
        type: ContentType.Json,
        ...params,
      }),