
    import apiClient from '@/lib/api-client';
import type { ApiResponse, PaginatedApiResponse } from '@/lib/types';
import type { CategoriaDto, CriarCategoriaDto, AtualizarCategoriaDto } from '@/models/categoria.model';

// -----------------
// Service Functions
// -----------------

/** Parâmetros de paginação para listagens. */
export interface ListParams {
  pageNumber?: number;
  pageSize?: number;
}

// --- Linhas Orçamentárias ---

export const getCategoriasLinhasOrcamentarias = (params: ListParams): Promise<PaginatedApiResponse<CategoriaDto[]>> => {
  return apiClient.getPaginated('/categories/linhas-orcamentarias', { params });
};

export const createCategoriaLinhaOrcamentaria = (data: CriarCategoriaDto): Promise<ApiResponse<CategoriaDto>> => {
  return apiClient.post('/categories/linhas-orcamentarias', data, { successMessage: 'Categoria criada com sucesso.' });
};

// --- Centro de Custo ---

export const getCategoriasCentroCusto = (params: ListParams): Promise<PaginatedApiResponse<CategoriaDto[]>> => {
  return apiClient.getPaginated('/categories/centro-custo', { params });
};

export const createCategoriaCentroCusto = (data: CriarCategoriaDto): Promise<ApiResponse<CategoriaDto>> => {
  return apiClient.post('/categories/centro-custo', data, { successMessage: 'Categoria criada com sucesso.' });
};

// --- Despesas ---

export const getCategoriasDespesas = (params: ListParams): Promise<PaginatedApiResponse<CategoriaDto[]>> => {
  return apiClient.getPaginated('/categories/despesas', { params });
};

export const createCategoriaDespesa = (data: CriarCategoriaDto): Promise<ApiResponse<CategoriaDto>> => {
  return apiClient.post('/categories/despesas', data, { successMessage: 'Categoria criada com sucesso.' });
};

// --- Genéricas ---

/** O tipo de categoria a ser usado nos endpoints genéricos. */
export type TipoCategoria = 'linhas-orcamentarias' | 'centro-custo' | 'despesas';

/**
 * Atualiza uma categoria específica pelo seu tipo e ID.
 */
export const updateCategoria = (type: TipoCategoria, id: string, data: AtualizarCategoriaDto): Promise<ApiResponse<void>> => {
  return apiClient.put(`/categories/${type}/${id}`, data, { successMessage: 'Categoria atualizada com sucesso.' });
};

/**
 * Exclui uma categoria específica pelo seu tipo e ID.
 */
export const deleteCategoria = (type: TipoCategoria, id: string): Promise<ApiResponse<void>> => {
  return apiClient.delete(`/categories/${type}/${id}`, { successMessage: 'Categoria excluída com sucesso.' });
};

