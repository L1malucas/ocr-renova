import * as z from 'zod';
import type { LinhaOrcamentariaDto } from './linha-orcamentaria.model';

/**
 * DTO principal para representar um Orçamento.
 */
export interface OrcamentoDto {
  id: string;
  nome: string | null;
  descricao: string | null;
  versao: number;
  status: string | null;
  contratoId: string;
  linhasOrcamentarias: LinhaOrcamentariaDto[] | null;
}

/**
 * DTO para a criação de um novo Orçamento.
 */
export interface CriarOrcamentoDto {
  nome: string;
  descricao?: string | null;
  contratoId: string;
}

/**
 * DTO para a atualização de um Orçamento.
 * OBS: Este DTO não estava definido no arquivo de serviço original e foi criado com base na estrutura de CriarOrcamentoDto.
 */
export type AtualizarOrcamentoDto = Partial<CriarOrcamentoDto>;

export const CriarOrcamentoSchema = z.object({
  nome: z.string().min(3, "O nome é obrigatório."),
  descricao: z.string().optional(),
  contratoId: z.string().min(1, "O ID do contrato é obrigatório."),
});

export interface OrcamentoListDto {
  id: string;
  nome: string | null;
  versao: number;
  status: string | null;
  contratoId: string;
}

export const OrcamentoListSchema = z.object({
  nome: z.string(),
  versao: z.number(),
  status: z.string(),
  contratoId: z.string(),
});
