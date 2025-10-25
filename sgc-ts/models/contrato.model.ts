import * as z from 'zod';

/**
 * DTO principal para representar um Contrato.
 */
export interface ContratoDto {
  id: string;
  nome: string | null;
  numeroInstrumento: string | null;
  status: string | null;
  inicioVigencia: string; // ISO date-time string
  fimVigencia: string; // ISO date-time string
  valorAtualizado: number;
  valorExecutado: number;
  unidadeId: string;
  nomeUnidade: string | null;
}

/**
 * DTO para a criação de um novo Contrato.
 */
export interface CriarContratoDto {
  nome: string;
  numeroInstrumento: string;
  objeto?: string | null;
  dataAssinatura?: string; // ISO date-time string
  inicioVigencia?: string; // ISO date-time string
  fimVigencia?: string; // ISO date-time string
  valorOriginal?: number;
  unidadeId: string;
}

/**
 * DTO para a atualização de um Contrato.
 */
export interface AtualizarContratoDto {
  nome: string;
  objeto?: string | null;
  fimVigencia?: string; // ISO date-time string
}

export const CriarContratoSchema = z.object({
  nome: z.string().min(3, "O nome é obrigatório."),
  numeroInstrumento: z.string().min(1, "O número do instrumento é obrigatório."),
  objeto: z.string().optional(),
  dataAssinatura: z.string().optional(),
  inicioVigencia: z.string().optional(),
  fimVigencia: z.string().optional(),
  valorOriginal: z.number().optional(),
  unidadeId: z.string().min(1, "A unidade é obrigatória."),
});

export interface ContratoListDto {
  id: string;
  nome: string | null;
  numeroInstrumento: string | null;
  status: string | null;
  nomeUnidade: string | null;
}

export const ContratoListSchema = z.object({
  nome: z.string(),
  numeroInstrumento: z.string(),
  status: z.string(),
  nomeUnidade: z.string(),
});
