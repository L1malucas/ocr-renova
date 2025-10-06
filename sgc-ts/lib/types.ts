// TypeScript interfaces for the SGC-TS system
export interface User {
  id: string
  email: string
  name: string
  role: "admin" | "gestor_projeto" | "analista_financeiro" | "aprovador" | "auditor"
  permissions: string[]
  created_at: Date
  updated_at: Date
}

export interface FonteRecurso {
  id: string
  nome: string
  tipo: "Doação PF" | "Doação PJ" | "Convênio" | "Contrato" | "Outros"
  documento: string
  responsavel: string
  vigencia_inicio?: Date
  vigencia_fim?: Date
  valor_total?: number
  created_at: Date
  updated_at: Date
}

export interface Projeto {
  id: string
  nome: string
  descricao: string
  data_inicio: Date
  data_fim?: Date
  orcamento_total: number
  status: "Ativo" | "Inativo" | "Concluído"
  responsavel_id: string
  created_at: Date
  updated_at: Date
}

export interface CentroCusto {
  id: string
  nome: string
  descricao: string
  codigo: string
  ativo: boolean
  created_at: Date
  updated_at: Date
}

export interface Categoria {
  id: string
  nome: string
  tipo: "Receita" | "Despesa"
  codigo_contabil: string
  descricao: string
  ativo: boolean
  created_at: Date
  updated_at: Date
}

export interface Recebimento {
  id: string
  data: Date
  valor_bruto: number
  valor_liquido: number
  fonte_id: string
  conta_bancaria_id: string
  categoria_id: string
  referencia: string
  observacoes?: string
  status: "Pendente" | "Confirmado" | "Conciliado" | "Estornado"
  conciliado_em?: Date
  created_by: string
  created_at: Date
  updated_at: Date
}

export interface RateioRecebimento {
  id: string
  recebimento_id: string
  projeto_id: string
  centro_custo_id: string
  percentual: number
  valor: number
}

export interface Fornecedor {
  id: string
  razao_social: string
  nome_fantasia?: string
  cnpj: string
  info_contato: {
    email?: string
    telefone?: string
    endereco?: string
  }
  dados_bancarios?: {
    banco: string
    agencia: string
    conta: string
    tipo_conta: string
  }
  created_at: Date
  updated_at: Date
}

export interface Despesa {
  id: string
  tipo: "NF-e" | "Reembolso" | "Adiantamento" | "Outros"
  numero_documento: string
  data_emissao: Date
  data_vencimento: Date
  fornecedor_id: string
  valor_bruto: number
  valor_liquido: number
  centro_custo_id: string
  projeto_id: string
  categoria_id: string
  descricao: string
  observacoes?: string
  status_aprovacao: "Rascunho" | "Em Aprovação" | "Aprovado" | "Rejeitado" | "Pago"
  status_pagamento: "Pendente" | "Agendado" | "Pago" | "Cancelado"
  workflow_id?: string
  aprovado_por?: string
  aprovado_em?: Date
  pago_em?: Date
  created_by: string
  created_at: Date
  updated_at: Date
}

export interface WorkflowAprovacao {
  id: string
  nome: string
  descricao: string
  ativo: boolean
  regras: {
    nivel: number
    tipo_aprovador: "Gestor do Projeto" | "Gestor do Centro de Custo" | "Diretoria"
    valor_acima_de: number
    usuarios_aprovadores?: string[]
  }[]
  created_at: Date
  updated_at: Date
}

export interface Orcamento {
  id: string
  nome: string
  ano_fiscal: number
  projeto_id: string
  centro_custo_id: string
  status: "Planejamento" | "Aprovado" | "Revisão" | "Fechado"
  versao: number
  total_previsto: number
  created_by: string
  created_at: Date
  updated_at: Date
}

export interface LinhaOrcamentaria {
  id: string
  orcamento_id: string
  categoria_id: string
  mes_1_previsto: number
  mes_2_previsto: number
  mes_3_previsto: number
  mes_4_previsto: number
  mes_5_previsto: number
  mes_6_previsto: number
  mes_7_previsto: number
  mes_8_previsto: number
  mes_9_previsto: number
  mes_10_previsto: number
  mes_11_previsto: number
  mes_12_previsto: number
  total_previsto: number
}

export interface Anexo {
  id: string
  reference_id: string // ID do recebimento ou despesa
  reference_type: "recebimento" | "despesa"
  tipo_doc: string
  nome_arquivo: string
  url: string
  hash_sha256: string
  tamanho: number
  enviado_por: string
  enviado_em: Date
}

export interface AuditLog {
  id: string
  user_id: string
  action: string
  entity_type: string
  entity_id: string
  old_values?: any
  new_values?: any
  ip_address: string
  user_agent: string
  timestamp: Date
}

export interface ContaBancaria {
  id: string
  nome: string
  banco: string
  agencia: string
  conta: string
  tipo: "Corrente" | "Poupança"
  saldo_atual: number
  ativo: boolean
  created_at: Date
  updated_at: Date
}

export interface TransacaoBancaria {
  id: string
  conta_bancaria_id: string
  data: Date
  valor: number
  tipo: "Crédito" | "Débito"
  descricao: string
  documento?: string
  conciliado: boolean
  recebimento_id?: string
  despesa_id?: string
  created_at: Date
}

export interface ConciliacaoBancaria {
  id: string
  contaId: string
  dataImportacao: Date
  totalMovimentos: number
  valorTotal: number
  status: "importado" | "processado" | "concluido"
  usuarioId: string
}

export interface MovimentoBancario {
  id?: string
  data: Date
  descricao: string
  valor: number
  tipo: "entrada" | "saida"
  contaId: string
  numeroDocumento: string
  status: "pendente" | "conciliado" | "divergente"
  dataImportacao: Date
  movimentoFinanceiroId?: string
  dataConciliacao?: Date
}

export interface MovimentoFinanceiro {
  id?: string
  data: Date
  descricao: string
  valor: number
  tipo: "entrada" | "saida"
  contaId: string
  referenciaId: string
  tipoReferencia: "recebimento" | "despesa"
  status: "pendente" | "conciliado"
  movimentoBancarioId?: string
  dataConciliacao?: Date
}

export interface Usuario {
  id: string
  nome: string
  email: string
  papel: string
  permissoes: string[]
  status: "ativo" | "inativo"
  dataCriacao: Date
  ultimoLogin: Date | null
}

export interface LogAuditoria {
  id: string
  acao: string
  entidade: string
  entidadeId: string
  usuarioId: string
  timestamp: Date
  detalhes: string
  ip: string
}
