import apiClient from "@/lib/api-client"
import type { ApiResponse, PaginatedApiResponse } from "@/lib/types"
import type {
  CategoriaDto,
  CriarCategoriaDto,
  AtualizarCategoriaDto,
} from "@/models/categoria.model"

// -----------------
// Service Functions
// -----------------

/** Parâmetros de paginação para listagens. */
export interface ListParams {
  pageNumber?: number
  pageSize?: number
}

/**
 * Busca uma lista paginada de Categorias por tipo.
 * @param type - Tipo da categoria: "linhas-orcamentarias" ou "despesas"
 */
export const getCategorias = (
  type: 'linhas-orcamentarias' | 'despesas',
  params: ListParams
): Promise<PaginatedApiResponse<CategoriaDto[]>> => {
  return apiClient.getPaginated(`/categories/${type}`, { params })
}

/**
 * Cria uma nova Categoria.
 * @param type - Tipo da categoria: "linhas-orcamentarias" ou "despesas"
 */
export const createCategoria = (
  type: 'linhas-orcamentarias' | 'despesas',
  data: CriarCategoriaDto
): Promise<ApiResponse<CategoriaDto>> => {
  return apiClient.post(`/categories/${type}`, data, {
    successMessage: "Categoria criada com sucesso.",
  })
}

/**
 * Atualiza uma Categoria existente.
 * @param type - Tipo da categoria: "linhas-orcamentarias" ou "despesas"
 */
export const updateCategoria = (
  type: 'linhas-orcamentarias' | 'despesas',
  id: string,
  data: AtualizarCategoriaDto
): Promise<ApiResponse<void>> => {
  return apiClient.put(`/categories/${type}/${id}`, data, {
    successMessage: "Categoria atualizada com sucesso.",
  })
}

/**
 * Exclui uma Categoria pelo seu ID.
 * @param type - Tipo da categoria: "linhas-orcamentarias" ou "despesas"
 */
export const deleteCategoria = (
  type: 'linhas-orcamentarias' | 'despesas',
  id: string
): Promise<ApiResponse<void>> => {
  return apiClient.delete(`/categories/${type}/${id}`, {
    successMessage: "Categoria excluída com sucesso.",
  })
}