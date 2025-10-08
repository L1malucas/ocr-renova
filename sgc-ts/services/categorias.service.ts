
    export interface CategoryDto {
  /** @format uuid */
  id?: string;
  name?: string | null;
  code?: string | null;
  description?: string | null;
  /** @format uuid */
  parentCategoryId?: string | null;
  subcategories?: CategoryDto[] | null;
}

export interface CategoryDtoApiResponse {
  success?: boolean;
  data?: CategoryDto;
  messages?: string[] | null;
}

export interface CategoryDtoListPagedApiResponse {
  success?: boolean;
  data?: CategoryDto[][] | null;
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

export interface CreateCategoryDto {
  /** @minLength 1 */
  name: string;
  code?: string | null;
  description?: string | null;
  /** @format uuid */
  parentCategoryId?: string | null;
}
export interface UpdateCategoryDto {
  /** @minLength 1 */
  name: string;
  code?: string | null;
  description?: string | null;
  /** @format uuid */
  parentCategoryId?: string | null;
}

export interface CategoryDtoPagedApiResponse {
  success?: boolean;
  data?: CategoryDto[] | null;
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
     * @tags Categories
     * @name CategoriesLinhasOrcamentariasList
     * @request GET:/api/categories/linhas-orcamentarias
     */
    categoriesLinhasOrcamentariasList: (
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
      this.request<CategoryDtoListPagedApiResponse, any>({
        path: `/api/categories/linhas-orcamentarias`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Categories
     * @name CategoriesLinhasOrcamentariasCreate
     * @request POST:/api/categories/linhas-orcamentarias
     */
    categoriesLinhasOrcamentariasCreate: (
      data: CreateCategoryDto,
      params: RequestParams = {},
    ) =>
      this.request<CategoryDtoApiResponse, any>({
        path: `/api/categories/linhas-orcamentarias`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Categories
     * @name CategoriesCentroCustoList
     * @request GET:/api/categories/centro-custo
     */
    categoriesCentroCustoList: (
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
      this.request<CategoryDtoPagedApiResponse, ProblemDetails>({
        path: `/api/categories/centro-custo`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Categories
     * @name CategoriesCentroCustoCreate
     * @request POST:/api/categories/centro-custo
     */
    categoriesCentroCustoCreate: (
      data: CreateCategoryDto,
      params: RequestParams = {},
    ) =>
      this.request<CategoryDtoApiResponse, any>({
        path: `/api/categories/centro-custo`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Categories
     * @name CategoriesDespesasList
     * @request GET:/api/categories/despesas
     */
    categoriesDespesasList: (
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
      this.request<CategoryDtoListPagedApiResponse, any>({
        path: `/api/categories/despesas`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Categories
     * @name CategoriesDespesasCreate
     * @request POST:/api/categories/despesas
     */
    categoriesDespesasCreate: (
      data: CreateCategoryDto,
      params: RequestParams = {},
    ) =>
      this.request<CategoryDtoApiResponse, any>({
        path: `/api/categories/despesas`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Categories
     * @name CategoriesUpdate
     * @request PUT:/api/categories/{type}/{id}
     */
    categoriesUpdate: (
      type: string,
      id: string,
      data: UpdateCategoryDto,
      params: RequestParams = {},
    ) =>
      this.request<void, any>({
        path: `/api/categories/${type}/${id}`,
        method: "PUT",
        body: data,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Categories
     * @name CategoriesDelete
     * @request DELETE:/api/categories/{type}/{id}
     */
    categoriesDelete: (type: string, id: string, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/api/categories/${type}/${id}`,
        method: "DELETE",
        ...params,
      }),
