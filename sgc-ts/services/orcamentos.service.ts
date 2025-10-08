    /**
     * No description
     *
     * @tags Orcamentos
     * @name ContratosOrcamentoList
     * @request GET:/api/contratos/{contratoId}/orcamento
     */export interface CriarOrcamentoDto {
  /** @minLength 1 */
  nome: string;
  descricao?: string | null;
  /** @format uuid */
  contratoId: string;
}

export interface OrcamentoDto {
  /** @format uuid */
  id?: string;
  nome?: string | null;
  descricao?: string | null;
  /** @format int32 */
  versao?: number;
  status?: string | null;
  /** @format uuid */
  contratoId?: string;
  linhasOrcamentarias?: LinhaOrcamentariaDto[] | null;
}

export interface OrcamentoDtoApiResponse {
  success?: boolean;
  data?: OrcamentoDto;
  messages?: string[] | null;
}

    contratosOrcamentoList: (contratoId: string, params: RequestParams = {}) =>
      this.request<OrcamentoDtoApiResponse, ObjectApiResponse>({
        path: `/api/contratos/${contratoId}/orcamento`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Orcamentos
     * @name OrcamentosDetail
     * @request GET:/api/orcamentos/{id}
     */
    orcamentosDetail: (id: string, params: RequestParams = {}) =>
      this.request<OrcamentoDtoApiResponse, ObjectApiResponse>({
        path: `/api/orcamentos/${id}`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Orcamentos
     * @name OrcamentosCreate
     * @request POST:/api/orcamentos
     */
    orcamentosCreate: (data: CriarOrcamentoDto, params: RequestParams = {}) =>
      this.request<OrcamentoDtoApiResponse, ObjectApiResponse>({
        path: `/api/orcamentos`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),