import apiClient from '@/lib/api-client';
import type { ApiResponse, PaginatedApiResponse } from '@/lib/types';
import type { ReceitaDto, CriarReceitaDto, AtualizarReceitaDto } from '@/models/receita.model';

// -----------------
// Service Functions
// -----------------

/** Parâmetros de paginação para listagens. */
export interface ListParams {
  pageNumber?: number;
  pageSize?: number;
}

/**
 * Busca uma lista paginada de Receitas.
 */
export const getReceitas = (params: ListParams): Promise<PaginatedApiResponse<ReceitaDto[]>> => {
  return apiClient.getPaginated('/receitas', { params });
};

/**
 * Busca uma Receita pelo seu ID.
 */
export const getReceitaById = (id: string): Promise<ApiResponse<ReceitaDto>> => {
  return apiClient.get(`/receitas/${id}`);
};

/**
 * Cria uma nova Receita.
 */
export const createReceita = (data: CriarReceitaDto): Promise<ApiResponse<ReceitaDto>> => {
  return apiClient.post('/receitas', data, { successMessage: 'Receita criada com sucesso.' });
};

/**
 * Atualiza uma Receita existente.
 */
export const updateReceita = (id: string, data: AtualizarReceitaDto): Promise<ApiResponse<void>> => {
  return apiClient.put(`/receitas/${id}`, data, { successMessage: 'Receita atualizada com sucesso.' });
};

/**
 * Exclui uma Receita pelo seu ID.
 */
export const deleteReceita = (id: string): Promise<ApiResponse<void>> => {
  return apiClient.delete(`/receitas/${id}`, { successMessage: 'Receita excluída com sucesso.' });
};