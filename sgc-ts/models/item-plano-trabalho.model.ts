import * as z from 'zod';

/**
 * Enum para o Tipo de Métrica de um item do plano de trabalho.
 */
export enum TipoMetrica {
  Valor = 0,
  Percentual = 1,
  Unidade = 2,
}

/**
 * Enum para a Frequência de execução de um item do plano de trabalho.
 */
export enum Frequencia {
  Diaria = 0,
  Semanal = 1,
  Quinzenal = 2,
  Mensal = 3,
  Bimestral = 4,
  Trimestral = 5,
}

/**
 * DTO principal para representar um Item do Plano de Trabalho.
 */
export interface ItemPlanoTrabalhoDto {
  id: string;
  objetivo: string | null;
  acao: string | null;
  descricao: string | null;
  status: string | null;
  valorMeta: number | null;
  tipoMetrica: string | null;
  unidadeMedida: string | null;
  frequencia: string | null;
  obrigatorio: boolean;
  dataInicio: string; // ISO date-time string
  dataFim: string; // ISO date-time string
  itemPaiId: string | null;
  subItens: ItemPlanoTrabalhoDto[] | null;
  categoriaId: string;
  nomeCategoria: string | null;
}

/**
 * DTO para a criação de um novo Item do Plano de Trabalho.
 */
export interface CriarItemPlanoTrabalhoDto {
  planoTrabalhoId: string;
  itemPaiId?: string | null;
  objetivo: string;
  acao: string;
  descricao?: string | null;
  valorMeta?: number | null;
  tipoMetrica: TipoMetrica;
  unidadeMedida?: string | null;
  frequencia?: Frequencia;
  obrigatorio?: boolean;
  dataInicio: string; // ISO date-time string
  dataFim: string; // ISO date-time string
  categoriaId: string;
}

/**
 * DTO para a atualização de um Item do Plano de Trabalho.
 */
export interface AtualizarItemPlanoTrabalhoDto {
  objetivo: string;
  acao: string;
  descricao?: string | null;
  valorMeta?: number | null;
  tipoMetrica: TipoMetrica;
  unidadeMedida?: string | null;
  frequencia?: Frequencia;
  obrigatorio?: boolean;
  dataInicio: string; // ISO date-time string
  dataFim: string; // ISO date-time string
  categoriaId: string;
}

export const CriarItemPlanoTrabalhoSchema = z.object({
  planoTrabalhoId: z.string().min(1, "O ID do plano de trabalho é obrigatório."),
  itemPaiId: z.string().optional(),
  objetivo: z.string().min(3, "O objetivo é obrigatório."),
  acao: z.string().min(3, "A ação é obrigatória."),
  descricao: z.string().optional(),
  valorMeta: z.number().optional(),
  tipoMetrica: z.nativeEnum(TipoMetrica),
  unidadeMedida: z.string().optional(),
  frequencia: z.nativeEnum(Frequencia).optional(),
  obrigatorio: z.boolean().optional(),
  dataInicio: z.string().min(1, "A data de início é obrigatória."),
  dataFim: z.string().min(1, "A data de fim é obrigatória."),
  categoriaId: z.string().min(1, "A categoria é obrigatória."),
});

export interface ItemPlanoTrabalhoListDto {
  id: string;
  objetivo: string | null;
  acao: string | null;
  status: string | null;
  valorMeta: number | null;
}

export const ItemPlanoTrabalhoListSchema = z.object({
  objetivo: z.string(),
  acao: z.string(),
  status: z.string(),
  valorMeta: z.number(),
});
