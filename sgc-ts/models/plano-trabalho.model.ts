import * as z from 'zod';
import type { ItemPlanoTrabalhoDto } from './item-plano-trabalho.model';

/**
 * DTO principal para representar um Plano de Trabalho.
 */
export interface PlanoTrabalhoDto {
  id: string;
  contratoId: string;
  itens: ItemPlanoTrabalhoDto[] | null;
}

/**
 * DTO para a criação de um novo Plano de Trabalho.
 */
export interface CriarPlanoTrabalhoDto {
  contratoId: string;
}

/**
 * DTO para a atualização de um Plano de Trabalho.
 * OBS: Este DTO não estava definido no arquivo de serviço original e foi criado.
 * Pode necessitar de ajustes dependendo da implementação da API.
 */
export type AtualizarPlanoTrabalhoDto = Partial<CriarPlanoTrabalhoDto>;

export const CriarPlanoTrabalhoSchema = z.object({
  contratoId: z.string().min(1, "O ID do contrato é obrigatório."),
});

export interface PlanoTrabalhoListDto {
  id: string;
  contratoId: string;
}

export const PlanoTrabalhoListSchema = z.object({
  contratoId: z.string(),
});
