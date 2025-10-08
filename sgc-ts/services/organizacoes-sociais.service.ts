    
export interface AtualizarOrganizacaoSocialDto {
  /** @minLength 1 */
  razaoSocial: string;
  nomeFantasia?: string | null;
  /** @minLength 1 */
  cnpj: string;
  inscricaoEstadual?: string | null;
  inscricaoMunicipal?: string | null;
  telefonePrincipal?: string | null;
  /** @format email */
  emailPrincipal?: string | null;
}
export interface CriarOrganizacaoSocialDto {
  /** @minLength 1 */
  razaoSocial: string;
  nomeFantasia?: string | null;
  /** @minLength 1 */
  cnpj: string;
  inscricaoEstadual?: string | null;
  inscricaoMunicipal?: string | null;
  telefonePrincipal?: string | null;
  /** @format email */
  emailPrincipal?: string | null;
}


export interface OrganizacaoSocialDto {
  /** @format uuid */
  id?: string;
  razaoSocial?: string | null;
  nomeFantasia?: string | null;
  cnpj?: string | null;
  emailPrincipal?: string | null;
  unidades?: UnidadeDto[] | null;
}

export interface OrganizacaoSocialDtoApiResponse {
  success?: boolean;
  data?: OrganizacaoSocialDto;
  messages?: string[] | null;
}

export interface OrganizacaoSocialDtoListPagedApiResponse {
  success?: boolean;
  data?: OrganizacaoSocialDto[][] | null;
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
     * @tags OrganizacoesSociais
     * @name OrganizacoesSociaisList
     * @request GET:/api/organizacoes-sociais
     */
    organizacoesSociaisList: (
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
      this.request<OrganizacaoSocialDtoListPagedApiResponse, any>({
        path: `/api/organizacoes-sociais`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags OrganizacoesSociais
     * @name OrganizacoesSociaisCreate
     * @request POST:/api/organizacoes-sociais
     */
    organizacoesSociaisCreate: (
      data: CriarOrganizacaoSocialDto,
      params: RequestParams = {},
    ) =>
      this.request<OrganizacaoSocialDtoApiResponse, ObjectApiResponse>({
        path: `/api/organizacoes-sociais`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags OrganizacoesSociais
     * @name OrganizacoesSociaisDetail
     * @request GET:/api/organizacoes-sociais/{id}
     */
    organizacoesSociaisDetail: (id: string, params: RequestParams = {}) =>
      this.request<OrganizacaoSocialDtoApiResponse, ObjectApiResponse>({
        path: `/api/organizacoes-sociais/${id}`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags OrganizacoesSociais
     * @name OrganizacoesSociaisUpdate
     * @request PUT:/api/organizacoes-sociais/{id}
     */
    organizacoesSociaisUpdate: (
      id: string,
      data: AtualizarOrganizacaoSocialDto,
      params: RequestParams = {},
    ) =>
      this.request<void, ObjectApiResponse>({
        path: `/api/organizacoes-sociais/${id}`,
        method: "PUT",
        body: data,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags OrganizacoesSociais
     * @name OrganizacoesSociaisUnitsCreate
     * @request POST:/api/organizacoes-sociais/{orgId}/units
     */
    organizacoesSociaisUnitsCreate: (
      orgId: string,
      data: CriarUnidadeDto,
      params: RequestParams = {},
    ) =>
      this.request<UnidadeDtoApiResponse, ObjectApiResponse>({
        path: `/api/organizacoes-sociais/${orgId}/units`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),