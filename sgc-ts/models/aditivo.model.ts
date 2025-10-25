import * as z from 'zod';

/**
 * Enum para os tipos de aditivo.
 * OBS: Os nomes dos membros (Value0, Value1) foram gerados automaticamente.
 * Recomenda-se renomeá-los para algo significativo (ex: Prazo, Valor, Objeto).
 */
export enum AditivoType {
  Value0 = 0,
  Value1 = 1,
  Value2 = 2,
  Value3 = 3,
}

/**
 * DTO principal para representar um Aditivo.
 */
export interface AditivoDto {
  id: string;
  numeroTermo: string | null;
  objeto: string | null;
  tipo: string | null; // Padronizado como string para consistência.
  valorAlteracao: number;
  dataAssinatura: string; // ISO date-time string
  novoFimVigencia: string | null; // ISO date-time string
  status: string | null;
  contratoId: string;
}

/**
 * DTO para a criação de um novo Aditivo.
 */
export interface CriarAditivoDto {
  numeroTermo: string;
  objeto: string;
  tipo: AditivoType; // O endpoint de criação espera o enum numérico.
  valorAlteracao?: number;
  dataAssinatura?: string;
  novoFimVigencia?: string | null;
  contratoId: string;
}

/**
 * DTO para a atualização de um Aditivo.
 * OBS: O campo 'subject' foi interpretado como 'objeto' para manter consistência.
 */
export interface UpdateAmendmentDto {
  objeto: string;
  newEndTerm?: string | null;
}

export const CriarAditivoSchema = z.object({
  numeroTermo: z.string().min(1, "O número do termo é obrigatório."),
  objeto: z.string().min(3, "O objeto é obrigatório."),
  tipo: z.nativeEnum(AditivoType),
  valorAlteracao: z.number().optional(),
  dataAssinatura: z.string().optional(),
  novoFimVigencia: z.string().optional(),
  contratoId: z.string(),
});

export interface AditivoListDto {
  id: string;
  numeroTermo: string | null;
  tipo: string | null;
  valorAlteracao: number;
  status: string | null;
}

export const AditivoListSchema = z.object({
  numeroTermo: z.string(),
  tipo: z.string(),
  valorAlteracao: z.number(),
  status: z.string(),
});
