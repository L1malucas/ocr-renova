import * as z from 'zod';

/**
 * DTO principal para representar um Anexo.
 */
export interface AnexoDto {
  id: string;
  nomeArquivo: string;
  descricao: string;
  mimeType: string;
  tamanhoBytes: number;
}

/**
 * Parâmetros para a criação de um novo anexo.
 */
export interface CriarAnexoDto {
  /** O arquivo a ser enviado. */
  arquivo: File;
  /** O tipo do recurso proprietário do anexo (ex: 'contrato', 'despesa'). */
  tipoRecurso: string;
  /** O ID do recurso proprietário. */
  recursoId: string;
  /** Descrição opcional para o anexo. */
  descricao?: string;
}

export const CriarAnexoSchema = z.object({
  arquivo: z.any(),
  tipoRecurso: z.string().min(1, "O tipo de recurso é obrigatório."),
  recursoId: z.string().min(1, "O ID do recurso é obrigatório."),
  descricao: z.string().optional(),
});

export interface AnexoListDto {
  id: string;
  nomeArquivo: string;
  descricao: string;
  mimeType: string;
  tamanhoBytes: number;
}

export const AnexoListSchema = z.object({
  nomeArquivo: z.string(),
  descricao: z.string(),
  mimeType: z.string(),
  tamanhoBytes: z.number(),
});
