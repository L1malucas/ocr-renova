import * as z from 'zod';

/**
 * DTO principal para representar uma Despesa.
 */
export interface DespesaDto {
  id: string;
  descricao: string;
  valor: number;
  dataDespesa: string; // ISO date-time string
  linhaOrcamentariaId: string;
  fornecedorId: string;
  categoriaId: string;
  estaPaga: boolean;
  foraDoOrcamento: boolean;
  justificativa: string;
}

/**
 * DTO para a criação de uma nova Despesa.
 */
export interface CriarDespesaDto {
  descricao: string;
  valor: number;
  dataDespesa: string; // ISO date-time string
  estaPaga: boolean;
  linhaOrcamentariaId: string;
  fornecedorId: string;
  nomeFornecedor: string;
}

export const CriarDespesaSchema = z.object({
  descricao: z.string().min(3, "A descrição é obrigatória."),
  valor: z.number().min(0, "O valor deve ser maior ou igual a zero."),
  dataDespesa: z.string().min(1, "A data da despesa é obrigatória."),
  estaPaga: z.boolean(),
  linhaOrcamentariaId: z.string().min(1, "A linha orçamentária é obrigatória."),
  fornecedorId: z.string().min(1, "O fornecedor é obrigatório."),
  nomeFornecedor: z.string().min(1, "O nome do fornecedor é obrigatório."),
});

export interface DespesaListDto {
  id: string;
  descricao: string;
  valor: number;
  dataDespesa: string;
  estaPaga: boolean;
}

export const DespesaListSchema = z.object({
  descricao: z.string(),
  valor: z.number(),
  dataDespesa: z.string(),
  estaPaga: z.boolean(),
});
