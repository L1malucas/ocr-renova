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
 * Busca uma lista paginada de Categorias.
 */
export const getCategorias = (
  params: ListParams
): Promise<PaginatedApiResponse<CategoriaDto[]>> => {
  return apiClient.getPaginated("/categorias", { params })
}

/**
 * Busca todas as Categorias (sem paginação).
 */
export const getAllCategorias = (): Promise<ApiResponse<CategoriaDto[]>> => {
  return apiClient.get("/categorias")
}

/**
 * Busca uma Categoria pelo seu ID.
 */
export const getCategoriaById = (id: string): Promise<ApiResponse<CategoriaDto>> => {
  return apiClient.get(`/categorias/${id}`)
}

/**
 * Cria uma nova Categoria.
 */
export const createCategoria = (
  data: CriarCategoriaDto
): Promise<ApiResponse<CategoriaDto>> => {
  return apiClient.post("/categorias", data, {
    successMessage: "Categoria criada com sucesso.",
  })
}

/**
 * Atualiza uma Categoria existente.
 */
export const updateCategoria = (
  id: string,
  data: AtualizarCategoriaDto
): Promise<ApiResponse<CategoriaDto>> => {
  return apiClient.put(`/categorias/${id}`, data, {
    successMessage: "Categoria atualizada com sucesso.",
  })
}

/**
 * Exclui uma Categoria pelo seu ID.
 */
export const deleteCategoria = (id: string): Promise<ApiResponse<void>> => {
  return apiClient.delete(`/categorias/${id}`, {
    successMessage: "Categoria excluída com sucesso.",
  })
}