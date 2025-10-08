import apiClient from '@/lib/api-client';
import type { ApiResponse } from '@/lib/types';
import type { OrcamentoDto, CriarOrcamentoDto, AtualizarOrcamentoDto } from '@/models/orcamento.model';

// -----------------
// Service Functions
// -----------------

/**
 * Busca o orçamento associado a um contrato específico.
 */
export const getOrcamentoByContratoId = (contratoId: string): Promise<ApiResponse<OrcamentoDto>> => {
  return apiClient.get(`/contratos/${contratoId}/orcamento`);
};

/**
 * Busca um Orçamento pelo seu ID.
 */
export const getOrcamentoById = (id: string): Promise<ApiResponse<OrcamentoDto>> => {
  return apiClient.get(`/orcamentos/${id}`);
};

/**
 * Cria um novo Orçamento.
 */
export const createOrcamento = (data: CriarOrcamentoDto): Promise<ApiResponse<OrcamentoDto>> => {
  return apiClient.post('/orcamentos', data, { successMessage: 'Orçamento criado com sucesso.' });
};

/**
 * Atualiza um Orçamento existente.
 */
export const updateOrcamento = (id: string, data: AtualizarOrcamentoDto): Promise<ApiResponse<void>> => {
  return apiClient.put(`/orcamentos/${id}`, data, { successMessage: 'Orçamento atualizado com sucesso.' });
};

/**
 * Exclui um Orçamento pelo seu ID.
 */
export const deleteOrcamento = (id: string): Promise<ApiResponse<void>> => {
  return apiClient.delete(`/orcamentos/${id}`, { successMessage: 'Orçamento excluído com sucesso.' });
};