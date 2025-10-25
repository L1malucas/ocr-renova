import * as z from 'zod';

/**
 * DTO principal para representar uma Despesa.
 */
export interface DespesaDto {
  id: string;
  descricao: string | null;
  valor: number;
  dataDespesa: string; // ISO date-time string
  estaPaga: boolean;
  foraDoOrcamento: boolean;
  linhaOrcamentariaId: string;
  centroCustoId: string | null;
  nomeCentroCusto: string | null;
  fornecedorId: string | null;
  nomeFornecedor: string | null;
  categoriaId: string;
  nomeCategoria: string | null;
}

/**
 * DTO para a criação de uma nova Despesa.
 * OBS: Este DTO não estava definido no arquivo de serviço original e foi criado com base na estrutura de DespesaDto.
 */
export interface CriarDespesaDto {
  descricao: string;
  valor: number;
  dataDespesa: string; // ISO date-time string
  estaPaga?: boolean;
  foraDoOrcamento?: boolean;
  linhaOrcamentariaId: string;
  centroCustoId?: string | null;
  fornecedorId?: string | null;
  categoriaId: string;
}

/**
 * DTO para a atualização de uma Despesa.
 */
export type AtualizarDespesaDto = Partial<CriarDespesaDto>;

export const CriarDespesaSchema = z.object({
  descricao: z.string().min(3, "A descrição é obrigatória."),
  valor: z.number().positive("O valor deve ser positivo."),
  dataDespesa: z.string().min(1, "A data da despesa é obrigatória."),
  estaPaga: z.boolean().optional(),
  foraDoOrcamento: z.boolean().optional(),
  linhaOrcamentariaId: z.string().min(1, "A linha orçamentária é obrigatória."),
  centroCustoId: z.string().optional(),
  fornecedorId: z.string().optional(),
  categoriaId: z.string().min(1, "A categoria é obrigatória."),
});

export interface DespesaListDto {
  id: string;
  descricao: string | null;
  valor: number;
  dataDespesa: string;
  nomeFornecedor: string | null;
  nomeCategoria: string | null;
}

export const DespesaListSchema = z.object({
  descricao: z.string(),
  valor: z.number(),
  dataDespesa: z.string(),
  nomeFornecedor: z.string(),
  nomeCategoria: z.string(),
});
