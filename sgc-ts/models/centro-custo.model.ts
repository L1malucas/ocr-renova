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
