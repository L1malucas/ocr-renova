    /**
     * No description
     *
     * @tags Unidades
     * @name UnidadesUpdate
     * @request PUT:/api/unidades/{id}
     */{

  /**
* No description
*
* @tags Unidades
* @name UnidadesList
* @request GET:/api/unidades
*/
  unidadesList: (
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
    this.request<UnidadeDtoPagedApiResponse, ProblemDetails>({
      path: `/api/unidades`,
      method: "GET",
      query: query,
      format: "json",
      ...params,
    }),

    /**
     * No description
     *
     * @tags Unidades
     * @name UnidadesDetail
     * @request GET:/api/unidades/{id}
     */
    unidadesDetail: (id: string, params: RequestParams = {}) =>
      this.request<UnidadeDtoApiResponse, ObjectApiResponse>({
        path: `/api/unidades/${id}`,
        method: "GET",
        format: "json",
        ...params,
      }),
      unidadesUpdate: (
        id: string,
        data: AtualizarUnidadeDto,
        params: RequestParams = {},
      ) =>
        this.request<void, ObjectApiResponse>({
          path: `/api/unidades/${id}`,
          method: "PUT",
          body: data,
          type: ContentType.Json,
          ...params,
        })
}
export interface AtualizarUnidadeDto {
  /** @minLength 1 */
  nome: string;
  /** @minLength 1 */
  cnpj: string;
  codigoCnes?: string | null;
  telefonePrincipal?: string | null;
  /** @format email */
  emailPrincipal?: string | null;
}
export interface CriarDespesaDto {
  /** @minLength 1 */
  descricao: string;
  /**
   * @format double
   * @min 0.01
   */
  valor: number;
  /** @format date-time */
  dataDespesa: string;
  /** @format uuid */
  linhaOrcamentariaId: string;
  /** @format uuid */
  centroCustoId?: string | null;
  /** @format uuid */
  fornecedorId?: string | null;
  /** @format uuid */
  categoriaId: string;
  estaPaga?: boolean;
  foraDoOrcamento?: boolean;
  justificativa?: string | null;
}export interface CriarUnidadeDto {
  /** @minLength 1 */
  nome: string;
  /** @minLength 1 */
  cnpj: string;
  codigoCnes?: string | null;
  telefonePrincipal?: string | null;
  /** @format email */
  emailPrincipal?: string | null;
  /** @format uuid */
  organizacaoSocialId: string;
}
export interface UnidadeDto {
  /** @format uuid */
  id?: string;
  nome?: string | null;
  cnpj?: string | null;
  codigoCnes?: string | null;
  telefonePrincipal?: string | null;
  emailPrincipal?: string | null;
  /** @format uuid */
  organizacaoSocialId?: string;
}

export interface UnidadeDtoApiResponse {
  success?: boolean;
  data?: UnidadeDto;
  messages?: string[] | null;
}

export interface UnidadeDtoPagedApiResponse {
  success?: boolean;
  data?: UnidadeDto[] | null;
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