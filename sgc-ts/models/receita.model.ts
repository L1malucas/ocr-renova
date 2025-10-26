import { formatarData } from '@/lib';
import * as z from 'zod';

/**
 * DTO principal para representar uma Receita.
 */
export interface ReceitaDto {
  id: string;
  descricao: string | null;
  valor: number;
  dataRecebimento: string; // ISO date-time string
  repasseId: string | null;
  nomeRepasse: string | null;
  centroCustoId: string | null;
  nomeCentroCusto: string | null;
  categoriaId: string;
  nomeCategoria: string | null;
  observacoes: string | null;
}

/**
 * DTO para a criação de uma nova Receita.
 */
export interface CriarReceitaDto {
  id: string | null;
  valor: number ,
  dataRecebimento: string | null;
  fonteRecursoId: string | null;
  categoriaId: string | null;
  observacoes: string | null;
}

/**
 * DTO para a atualização de uma Receita.
 */
export interface AtualizarReceitaDto {
  descricao: string;
  valor: number;
  dataRecebimento: string; // ISO date-time string
  repasseId?: string | null;
  centroCustoId?: string | null;
  categoriaId: string;
  observacoes?: string | null;
}

export const CriarReceitaSchema = z.object({
  descricao: z.string().min(3, "A descrição é obrigatória."),
  valor: z.coerce.number().positive("O valor deve ser positivo."),
  dataRecebimento: z.string().min(1, "A data de recebimento é obrigatória."),
  repasseId: z.string().optional(),
  centroCustoId: z.string().optional(),
  categoriaId: z.string().min(1, "A categoria é obrigatória."),
  observacoes: z.string().optional(),
});

export interface ReceitaListDto {
  id: string;
  descricao: string | null;
  valor: number;
  dataRecebimento: string;
  nomeRepasse: string | null;
  nomeCentroCusto: string | null;
  nomeCategoria: string | null;
}

export const ReceitaListSchema = z.object({
  descricao: z.string(),
  valor: z.number(),
  dataRecebimento: z.string()
});