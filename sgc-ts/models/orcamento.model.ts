import type { LinhaOrcamentariaDto } from './linha-orcamentaria.model';

/**
 * DTO principal para representar um Orçamento.
 */
export interface OrcamentoDto {
  id: string;
  nome: string | null;
  descricao: string | null;
  versao: number;
  status: string | null;
  contratoId: string;
  linhasOrcamentarias: LinhaOrcamentariaDto[] | null;
}

/**
 * DTO para a criação de um novo Orçamento.
 */
export interface CriarOrcamentoDto {
  nome: string;
  descricao?: string | null;
  contratoId: string;
}

/**
 * DTO para a atualização de um Orçamento.
 * OBS: Este DTO não estava definido no arquivo de serviço original e foi criado com base na estrutura de CriarOrcamentoDto.
 */
export type AtualizarOrcamentoDto = Partial<CriarOrcamentoDto>;
