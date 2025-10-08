import apiClient from '@/lib/api-client';
import type { ApiResponse, PaginatedApiResponse } from '@/lib/types';
import type { DespesaDto, CriarDespesaDto, AtualizarDespesaDto } from '@/models/despesa.model';

// -----------------
// Service Functions
// -----------------

/** Parâmetros de paginação para listagens. */
export interface ListParams {
  pageNumber?: number;
  pageSize?: number;
}

/**
 * Busca uma lista paginada de Despesas.
 */
export const getDespesas = (params: ListParams): Promise<PaginatedApiResponse<DespesaDto[]>> => {
  return apiClient.getPaginated('/despesas', { params });
};

/**
 * Busca uma Despesa pelo seu ID.
 */
export const getDespesaById = (id: string): Promise<ApiResponse<DespesaDto>> => {
  return apiClient.get(`/despesas/${id}`);
};

/**
 * Cria uma nova Despesa.
 */
export const createDespesa = (data: CriarDespesaDto): Promise<ApiResponse<DespesaDto>> => {
  return apiClient.post('/despesas', data, { successMessage: 'Despesa criada com sucesso.' });
};

/**
 * Atualiza uma Despesa existente.
 */
export const updateDespesa = (id: string, data: AtualizarDespesaDto): Promise<ApiResponse<DespesaDto>> => {
  return apiClient.put(`/despesas/${id}`, data, { successMessage: 'Despesa atualizada com sucesso.' });
};

/**
 * Exclui uma Despesa pelo seu ID.
 */
export const deleteDespesa = (id: string): Promise<ApiResponse<void>> => {
  return apiClient.delete(`/despesas/${id}`, { successMessage: 'Despesa excluída com sucesso.' });
};
