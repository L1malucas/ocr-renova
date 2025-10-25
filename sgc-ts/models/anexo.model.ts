import * as z from 'zod';

/**
 * DTO principal para representar um Anexo.
 */
export interface AnexoDto {
  id: string;
  nomeArquivo: string | null;
  caminhoArquivo: string | null;
  descricao: string | null;
  tipoMime: string | null;
  tamanhoBytes: number;
}

/**
 * Parâmetros para a criação de um novo anexo.
 */
export interface CreateAnexoParams {
  /** O arquivo a ser enviado. */
  arquivo: File;
  /** O tipo da entidade proprietária do anexo (ex: 'contrato', 'despesa'). */
  tipoProprietario: string;
  /** O ID da entidade proprietária. */
  proprietarioId: string;
  /** Descrição opcional para o anexo. */
  descricao?: string;
}

export const CriarAnexoSchema = z.object({
  arquivo: z.any(),
  tipoProprietario: z.string(),
  proprietarioId: z.string(),
  descricao: z.string().optional(),
});

export interface AnexoListDto {
  id: string;
  nomeArquivo: string | null;
  descricao: string | null;
  tipoMime: string | null;
  tamanhoBytes: number;
}

export const AnexoListSchema = z.object({
  nomeArquivo: z.string(),
  descricao: z.string(),
  tipoMime: z.string(),
  tamanhoBytes: z.number(),
});
