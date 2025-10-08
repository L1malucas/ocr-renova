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
