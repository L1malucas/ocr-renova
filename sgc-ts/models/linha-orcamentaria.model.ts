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
