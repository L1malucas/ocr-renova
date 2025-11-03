import * as z from 'zod';

/**
 * DTO principal para representar um Contrato.
 */
export interface ContratoDto {
  id: string;
  nome: string;
  numeroInstrumento: string;
  financiador: string;
  objeto: string;
  dataAssinatura: string; // ISO date-time string
  inicioVigencia: string; // ISO date-time string
  fimVigencia: string; // ISO date-time string
  valorOriginal: number;
  valorAtualizado: number;
  valorExecutado: number;
  unidadeId: string;
}

/**
 * DTO para a criação de um novo Contrato.
 */
export interface CriarContratoDto {
  id: string;
  nome: string;
  numeroInstrumento: string;
  financiador: string;
  objeto: string;
  dataAssinatura: string; // ISO date-time string
  inicioVigencia: string; // ISO date-time string
  fimVigencia: string; // ISO date-time string
  valorOriginal: number;
  valorAtualizado: number;
  valorExecutado: number;
  unidadeId: string;
}

/**
 * DTO para a atualização de um Contrato.
 */
export interface AtualizarContratoDto {
  id: string;
  nome: string;
  numeroInstrumento: string;
  financiador: string;
  objeto: string;
  dataAssinatura: string; // ISO date-time string
  inicioVigencia: string; // ISO date-time string
  fimVigencia: string; // ISO date-time string
  valorOriginal: number;
  valorAtualizado: number;
  valorExecutado: number;
  unidadeId: string;
}

export const CriarContratoSchema = z.object({
  id: z.string(),
  nome: z.string().min(3, "O nome é obrigatório."),
  numeroInstrumento: z.string().min(1, "O número do instrumento é obrigatório."),
  financiador: z.string().min(1, "O financiador é obrigatório."),
  objeto: z.string().min(1, "O objeto é obrigatório."),
  dataAssinatura: z.string().min(1, "A data de assinatura é obrigatória."),
  inicioVigencia: z.string().min(1, "O início da vigência é obrigatório."),
  fimVigencia: z.string().min(1, "O fim da vigência é obrigatório."),
  valorOriginal: z.number().min(0, "O valor original deve ser maior ou igual a zero."),
  valorAtualizado: z.number().min(0, "O valor atualizado deve ser maior ou igual a zero."),
  valorExecutado: z.number().min(0, "O valor executado deve ser maior ou igual a zero."),
  unidadeId: z.string().min(1, "A unidade é obrigatória."),
});

export interface ContratoListDto {
  id: string;
  nome: string;
  numeroInstrumento: string;
  financiador: string;
  objeto: string;
}

export const ContratoListSchema = z.object({
  nome: z.string(),
  numeroInstrumento: z.string(),
  financiador: z.string(),
  objeto: z.string(),
});
