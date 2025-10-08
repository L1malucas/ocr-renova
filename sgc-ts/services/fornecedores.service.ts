import apiClient from '@/lib/api-client';
import type { ApiResponse, PaginatedApiResponse } from '@/lib/types';
import type { FornecedorDto, CriarFornecedorDto, AtualizarFornecedorDto } from '@/models/fornecedor.model';

// -----------------
// Service Functions
// -----------------

/** Parâmetros de paginação para listagens. */
export interface ListParams {
  pageNumber?: number;
  pageSize?: number;
}

/**
 * Busca uma lista paginada de Fornecedores.
 */
export const getFornecedores = (params: ListParams): Promise<PaginatedApiResponse<FornecedorDto[]>> => {
  return apiClient.getPaginated('/fornecedores', { params });
};

/**
 * Busca um Fornecedor pelo seu ID.
 */
export const getFornecedorById = (id: string): Promise<ApiResponse<FornecedorDto>> => {
  return apiClient.get(`/fornecedores/${id}`);
};

/**
 * Cria um novo Fornecedor.
 */
export const createFornecedor = (data: CriarFornecedorDto): Promise<ApiResponse<FornecedorDto>> => {
  return apiClient.post('/fornecedores', data, { successMessage: 'Fornecedor criado com sucesso.' });
};

/**
 * Atualiza um Fornecedor existente.
 */
export const updateFornecedor = (id: string, data: AtualizarFornecedorDto): Promise<ApiResponse<void>> => {
  return apiClient.put(`/fornecedores/${id}`, data, { successMessage: 'Fornecedor atualizado com sucesso.' });
};

/**
 * Exclui um Fornecedor pelo seu ID.
 */
export const deleteFornecedor = (id: string): Promise<ApiResponse<void>> => {
  return apiClient.delete(`/fornecedores/${id}`, { successMessage: 'Fornecedor excluído com sucesso.' });
};