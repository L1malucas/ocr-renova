import apiClient from '@/lib/api-client';
import type { ApiResponse } from '@/lib/types';
import type { LinhaOrcamentariaDto, CriarLinhaOrcamentariaDto, AtualizarLinhaOrcamentariaDto, } from '@/models/linha-orcamentaria.model';

// -----------------
// Service Functions
// -----------------

/**
 * Cria uma nova linha orçamentária associada a um orçamento específico.
 */
export const createLinhaOrcamentaria = (orcamentoId: string, data: CriarLinhaOrcamentariaDto

): Promise<ApiResponse<LinhaOrcamentariaDto>> => { return apiClient.post(`/orcamentos/${orcamentoId}/linhas`, data, { successMessage: 'Linha Orçamentária criada com sucesso.', }); };

/*** Atualiza uma linha orçamentária existente.*/
export const updateLinhaOrcamentaria = (linhaId: string, data: AtualizarLinhaOrcamentariaDto

): Promise<ApiResponse<void>> => { return apiClient.put(`/linhas-orcamentarias/${linhaId}`, data, { successMessage: 'Linha Orçamentária atualizada com sucesso.', }); };

/*** Exclui uma linha orçamentária pelo seu ID.*/
export const deleteLinhaOrcamentaria = (linhaId: string): Promise<ApiResponse<void>> => { return apiClient.delete(`/linhas-orcamentarias/${linhaId}`, { successMessage: 'Linha Orçamentária excluída com sucesso.', }); }; 
