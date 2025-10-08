/**
 * DTO principal para representar um Contrato.
 */
export interface ContratoDto {
  id: string;
  nome: string | null;
  numeroInstrumento: string | null;
  status: string | null;
  inicioVigencia: string; // ISO date-time string
  fimVigencia: string; // ISO date-time string
  valorAtualizado: number;
  valorExecutado: number;
  unidadeId: string;
  nomeUnidade: string | null;
}

/**
 * DTO para a criação de um novo Contrato.
 */
export interface CriarContratoDto {
  nome: string;
  numeroInstrumento: string;
  objeto?: string | null;
  dataAssinatura?: string; // ISO date-time string
  inicioVigencia?: string; // ISO date-time string
  fimVigencia?: string; // ISO date-time string
  valorOriginal?: number;
  unidadeId: string;
}

/**
 * DTO para a atualização de um Contrato.
 */
export interface AtualizarContratoDto {
  nome: string;
  objeto?: string | null;
  fimVigencia?: string; // ISO date-time string
}
