import apiClient from '@/lib/api-client';
import type { ApiResponse } from '@/lib/types';
import type { ItemPlanoTrabalhoDto, CriarItemPlanoTrabalhoDto, AtualizarItemPlanoTrabalhoDto } from '@/models/item-plano-trabalho.model';

// -----------------
// Service Functions
// -----------------

/**
 * Cria um novo item no plano de trabalho associado a um plano de trabalho específico.
 */
export const createItemPlanoTrabalho = (planoTrabalhoId: string, data: CriarItemPlanoTrabalhoDto

): Promise<ApiResponse<ItemPlanoTrabalhoDto>> => {
    return apiClient.post(`/planos-trabalho/${planoTrabalhoId}/itens`, data, { successMessage: 'Item do Plano de Trabalho criado com sucesso.', });
};

/*** Atualiza um item do plano de trabalho existente.*/
export const updateItemPlanoTrabalho = (itemId: string, data: AtualizarItemPlanoTrabalhoDto

): Promise<ApiResponse<void>> => {
    return apiClient.put(`/itens-plano-trabalho/${itemId}`, data, { successMessage: 'Item do Plano de Trabalho atualizado com sucesso.', });
};

/*** Exclui um item do plano de trabalho pelo seu ID.*/
export const deleteItemPlanoTrabalho = (itemId: string): Promise<ApiResponse<void>> => {
    return apiClient.delete(`/itens-plano-trabalho/${itemId}`, { successMessage: 'Item do Plano de Trabalho excluído com sucesso.', });
};
