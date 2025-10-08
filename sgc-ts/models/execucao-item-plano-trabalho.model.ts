/**
 * DTO principal para representar a Execução de um Item do Plano de Trabalho.
 */
export interface ExecucaoItemPlanoTrabalhoDto {
  id: string;
  itemPlanoTrabalhoId: string;
  valor: number | null;
  dataExecucao: string; // ISO date-time string
  usuarioExecutorId: string | null;
  observacao: string | null;
}

/**
 * DTO para a criação de uma nova Execução de Item do Plano de Trabalho.
 */
export interface CriarExecucaoItemPlanoTrabalhoDto {
  itemPlanoTrabalhoId: string;
  valor?: number | null;
  dataExecucao: string; // ISO date-time string
  observacao?: string | null;
}

/**
 * DTO para a atualização de uma Execução de Item do Plano de Trabalho.
 */
export interface AtualizarExecucaoItemPlanoTrabalhoDto {
  valor?: number | null;
  dataExecucao: string; // ISO date-time string
  observacao?: string | null;
}
