import apiClient from '@/lib/api-client';
import type { ApiResponse, PaginatedApiResponse } from '@/lib/types';
import type {
  UnidadeDto,
  CriarUnidadeDto,
  AtualizarUnidadeDto,
  UnidadeDtoApiResponse,
  UnidadeDtoPagedApiResponse,
} from '@/models/unidade.model';

// -----------------
// Service Functions
// -----------------

/** Parâmetros de paginação para listagens. */
export interface ListParams {
  pageNumber?: number;
  pageSize?: number;
}

/**
 * Busca uma lista paginada de Unidades.
 */
export const getUnidades = (params: ListParams): Promise<UnidadeDtoPagedApiResponse> => {
  return apiClient.getPaginated('/unidades', { params });
};

/**
 * Busca uma Unidade pelo seu ID.
 */
export const getUnidadeById = (id: string): Promise<UnidadeDtoApiResponse> => {
  return apiClient.get(`/unidades/${id}`);
};

/**
 * Cria uma nova Unidade.
 */
export const createUnidade = (data: CriarUnidadeDto): Promise<UnidadeDtoApiResponse> => {
  return apiClient.post('/unidades', data, { successMessage: 'Unidade criada com sucesso.' });
};

/**
 * Atualiza uma Unidade existente.
 */
export const updateUnidade = (id: string, data: AtualizarUnidadeDto): Promise<ApiResponse<void>> => {
  return apiClient.put(`/unidades/${id}`, data, { successMessage: 'Unidade atualizada com sucesso.' });
};

/**
 * Exclui uma Unidade pelo seu ID.
 */
export const deleteUnidade = (id: string): Promise<ApiResponse<void>> => {
  return apiClient.delete(`/unidades/${id}`, { successMessage: 'Unidade excluída com sucesso.' });
};