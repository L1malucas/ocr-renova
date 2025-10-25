import * as z from 'zod';

/**
 * DTO principal para representar um Centro de Custo.
 */
export interface CentroCustoDto {
  id: string;
  codigo: string | null;
  nome: string | null;
  descricao: string | null;
  paiId: string | null;
  filhos: CentroCustoDto[] | null;
  categoriaId: string;
  nomeCategoria: string | null;
}

/**
 * DTO para a criação de um novo Centro de Custo.
 */
export interface CriarCentroCustoDto {
  codigo: string;
  nome: string;
  descricao?: string | null;
  paiId?: string | null;
  categoriaId: string;
}

/**
 * DTO para a atualização de um Centro de Custo.
 */
export interface AtualizarCentroCustoDto {
  codigo: string;
  nome: string;
  descricao?: string | null;
  paiId?: string | null;
  categoriaId: string;
}

export const CriarCentroCustoSchema = z.object({
  codigo: z.string().min(1, "O código é obrigatório."),
  nome: z.string().min(3, "O nome é obrigatório."),
  descricao: z.string().optional(),
  paiId: z.string().optional(),
  categoriaId: z.string().min(1, "A categoria é obrigatória."),
});

export interface CentroCustoListDto {
  id: string;
  codigo: string | null;
  nome: string | null;
  nomeCategoria: string | null;
}

export const CentroCustoListSchema = z.object({
  codigo: z.string(),
  nome: z.string(),
  nomeCategoria: z.string(),
});
