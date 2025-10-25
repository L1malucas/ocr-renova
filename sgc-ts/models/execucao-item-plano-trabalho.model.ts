import * as z from 'zod';

/**
 * DTO principal para representar a Execução de um Item do Plano de Trabalho.
 */
export interface ExecucaoItemPlanoTrabalhoDto {
  id: string;
  itemPlanoTrabalhoId: string;
  valor: number | null;
  dataExecucao: string; // ISO date-time string
  usuarioExecutorId: string | null;
  observacao: string | null;
}

/**
 * DTO para a criação de uma nova Execução de Item do Plano de Trabalho.
 */
export interface CriarExecucaoItemPlanoTrabalhoDto {
  itemPlanoTrabalhoId: string;
  valor?: number | null;
  dataExecucao: string; // ISO date-time string
  observacao?: string | null;
}

/**
 * DTO para a atualização de uma Execução de Item do Plano de Trabalho.
 */
export interface AtualizarExecucaoItemPlanoTrabalhoDto {
  valor?: number | null;
  dataExecucao: string; // ISO date-time string
  observacao?: string | null;
}

export const CriarExecucaoItemPlanoTrabalhoSchema = z.object({
  itemPlanoTrabalhoId: z.string().min(1, "O ID do item do plano de trabalho é obrigatório."),
  valor: z.number().optional(),
  dataExecucao: z.string().min(1, "A data de execução é obrigatória."),
  observacao: z.string().optional(),
});

export interface ExecucaoItemPlanoTrabalhoListDto {
  id: string;
  valor: number | null;
  dataExecucao: string;
  observacao: string | null;
}

export const ExecucaoItemPlanoTrabalhoListSchema = z.object({
  valor: z.number(),
  dataExecucao: z.string(),
  observacao: z.string(),
});
