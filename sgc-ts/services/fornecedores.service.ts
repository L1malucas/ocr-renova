    export interface AtualizarFornecedorDto {
      /** @minLength 1 */
      nome: string;
      nomeFantasia?: string | null;
      /** @minLength 1 */
      cnpj: string;
      inscricaoEstadual?: string | null;
      /** @format email */
      email?: string | null;
      telefone?: string | null;
      pessoaContato?: string | null;
      rua?: string | null;
      numero?: string | null;
      complemento?: string | null;
      bairro?: string | null;
      cidade?: string | null;
      estado?: string | null;
      cep?: string | null;
    }export interface CriarFornecedorDto {
      /** @minLength 1 */
      nome: string;
      nomeFantasia?: string | null;
      /** @minLength 1 */
      cnpj: string;
      inscricaoEstadual?: string | null;
      /** @format email */
      email?: string | null;
      telefone?: string | null;
      pessoaContato?: string | null;
      rua?: string | null;
      numero?: string | null;
      complemento?: string | null;
      bairro?: string | null;
      cidade?: string | null;
      estado?: string | null;
      cep?: string | null;
    }
export interface FornecedorDto {
  /** @format uuid */
  id?: string;
  nome?: string | null;
  nomeFantasia?: string | null;
  cnpj?: string | null;
  inscricaoEstadual?: string | null;
  email?: string | null;
  telefone?: string | null;
  pessoaContato?: string | null;
  rua?: string | null;
  numero?: string | null;
  complemento?: string | null;
  bairro?: string | null;
  cidade?: string | null;
  estado?: string | null;
  cep?: string | null;
}

export interface FornecedorDtoApiResponse {
  success?: boolean;
  data?: FornecedorDto;
  messages?: string[] | null;
}

export interface FornecedorDtoListPagedApiResponse {
  success?: boolean;
  data?: FornecedorDto[][] | null;
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
     * @tags Fornecedores
     * @name FornecedoresList
     * @request GET:/api/fornecedores
     */
    fornecedoresList: (
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
      this.request<FornecedorDtoListPagedApiResponse, any>({
        path: `/api/fornecedores`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Fornecedores
     * @name FornecedoresCreate
     * @request POST:/api/fornecedores
     */
    fornecedoresCreate: (
      data: CriarFornecedorDto,
      params: RequestParams = {},
    ) =>
      this.request<FornecedorDtoApiResponse, ObjectApiResponse>({
        path: `/api/fornecedores`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Fornecedores
     * @name FornecedoresDetail
     * @request GET:/api/fornecedores/{id}
     */
    fornecedoresDetail: (id: string, params: RequestParams = {}) =>
      this.request<FornecedorDtoApiResponse, ObjectApiResponse>({
        path: `/api/fornecedores/${id}`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Fornecedores
     * @name FornecedoresUpdate
     * @request PUT:/api/fornecedores/{id}
     */
    fornecedoresUpdate: (
      id: string,
      data: AtualizarFornecedorDto,
      params: RequestParams = {},
    ) =>
      this.request<void, ObjectApiResponse>({
        path: `/api/fornecedores/${id}`,
        method: "PUT",
        body: data,
        type: ContentType.Json,
        ...params,
      }),