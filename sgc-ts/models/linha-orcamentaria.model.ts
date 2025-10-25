import * as z from 'zod';

/**
 * DTO principal para representar uma Linha Orçamentária.
 */
export interface LinhaOrcamentariaDto {
  id: string;
  nomeItem: string | null;
  descricao: string | null;
  quantidade: number;
  valorUnitario: number;
  unidadeMedida: string | null;
  valorTotal: number;
  categoriaId: string;
  nomeCategoria: string | null;
  centroCustoId: string;
  nomeCentroCusto: string | null;
}

/**
 * DTO para a criação de uma nova Linha Orçamentária.
 */
export interface CriarLinhaOrcamentariaDto {
  orcamentoId: string;
  nomeItem: string;
  descricao?: string | null;
  quantidade: number;
  valorUnitario: number;
  unidadeMedida?: string | null;
  categoriaId: string;
  centroCustoId: string;
}

/**
 * DTO para a atualização de uma Linha Orçamentária.
 */
export interface AtualizarLinhaOrcamentariaDto {
  nomeItem: string;
  descricao?: string | null;
  quantidade: number;
  valorUnitario: number;
  unidadeMedida?: string | null;
  categoriaId: string;
  centroCustoId: string;
}

export const CriarLinhaOrcamentariaSchema = z.object({
  orcamentoId: z.string().min(1, "O ID do orçamento é obrigatório."),
  nomeItem: z.string().min(3, "O nome do item é obrigatório."),
  descricao: z.string().optional(),
  quantidade: z.number().positive("A quantidade deve ser positiva."),
  valorUnitario: z.number().positive("O valor unitário deve ser positivo."),
  unidadeMedida: z.string().optional(),
  categoriaId: z.string().min(1, "A categoria é obrigatória."),
  centroCustoId: z.string().min(1, "O centro de custo é obrigatório."),
});

export interface LinhaOrcamentariaListDto {
  id: string;
  nomeItem: string | null;
  quantidade: number;
  valorUnitario: number;
  valorTotal: number;
  nomeCategoria: string | null;
  nomeCentroCusto: string | null;
}

export const LinhaOrcamentariaListSchema = z.object({
  nomeItem: z.string(),
  quantidade: z.number(),
  valorUnitario: z.number(),
  valorTotal: z.number(),
  nomeCategoria: z.string(),
  nomeCentroCusto: z.string(),
});
