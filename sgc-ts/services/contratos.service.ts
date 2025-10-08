  export interface AtualizarContratoDto {
  /**
   * @minLength 0
   * @maxLength 200
   */
  nome: string;
  objeto?: string | null;
  /** @format date-time */
  fimVigencia?: string;
}/
export interface ContratoDto {
  /** @format uuid */
  id?: string;
  nome?: string | null;
  numeroInstrumento?: string | null;
  status?: string | null;
  /** @format date-time */
  inicioVigencia?: string;
  /** @format date-time */
  fimVigencia?: string;
  /** @format double */
  valorAtualizado?: number;
  /** @format double */
  valorExecutado?: number;
  /** @format uuid */
  unidadeId?: string;
  nomeUnidade?: string | null;
}

export interface ContratoDtoApiResponse {
  success?: boolean;
  data?: ContratoDto;
  messages?: string[] | null;
}export interface CriarContratoDto {
  /**
   * @minLength 0
   * @maxLength 200
   */
  nome: string;
  /** @minLength 1 */
  numeroInstrumento: string;
  objeto?: string | null;
  /** @format date-time */
  dataAssinatura?: string;
  /** @format date-time */
  inicioVigencia?: string;
  /** @format date-time */
  fimVigencia?: string;
  /**
   * @format double
   * @min 0
   */
  valorOriginal?: number;
  /** @format uuid */
  unidadeId: string;
}

export interface ContratoDtoPagedApiResponse {
  success?: boolean;
  data?: ContratoDto[] | null;
  messages?: string[] | null;
  /** @format int32 */
  pageNumber?: number;
  /** @format int32 */
  pageSize?: number;
  /** @format int32 */
  totalPages?: number;
  /** @format int32 */
  totalItems?: number;
}/**
     * No description
     *
     * @tags Contratos
     * @name ContratosList
     * @request GET:/api/contratos
     */
    contratosList: (
      query?: {
        /**
         * @format int32
         * @default 1
         */
        numeroPagina?: number;
        /**
         * @format int32
         * @default 10
         */
        tamanhoPagina?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<ContratoDtoPagedApiResponse, ProblemDetails>({
        path: `/api/contratos`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Contratos
     * @name ContratosCreate
     * @request POST:/api/contratos
     */
    contratosCreate: (data: CriarContratoDto, params: RequestParams = {}) =>
      this.request<ContratoDtoApiResponse, ObjectApiResponse>({
        path: `/api/contratos`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Contratos
     * @name ContratosDetail
     * @request GET:/api/contratos/{id}
     */
    contratosDetail: (id: string, params: RequestParams = {}) =>
      this.request<ContratoDtoApiResponse, ObjectApiResponse>({
        path: `/api/contratos/${id}`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Contratos
     * @name ContratosUpdate
     * @request PUT:/api/contratos/{id}
     */
    contratosUpdate: (
      id: string,
      data: AtualizarContratoDto,
      params: RequestParams = {},
    ) =>
      this.request<void, ObjectApiResponse>({
        path: `/api/contratos/${id}`,
        method: "PUT",
        body: data,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Contratos
     * @name ContratosDelete
     * @request DELETE:/api/contratos/{id}
     */
    contratosDelete: (id: string, params: RequestParams = {}) =>
      this.request<void, ObjectApiResponse>({
        path: `/api/contratos/${id}`,
        method: "DELETE",
        ...params,
      }),