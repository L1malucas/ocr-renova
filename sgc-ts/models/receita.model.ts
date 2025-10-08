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
  descricao: string;
  valor: number;
  dataRecebimento: string; // ISO date-time string
  repasseId?: string | null;
  centroCustoId?: string | null;
  categoriaId: string;
  observacoes?: string | null;
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
