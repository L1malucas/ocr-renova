import type {
  User,
  FonteRecurso,
  Projeto,
  CentroCusto,
  Categoria,
  Recebimento,
  Fornecedor,
  Despesa,
  WorkflowAprovacao,
  Orcamento,
  LinhaOrcamentaria,
  ConciliacaoBancaria,
  MovimentoBancario,
  MovimentoFinanceiro,
  Usuario,
  LogAuditoria,
} from "./types"

// Mock user data
export const mockUser: User = {
  id: "user-1",
  email: "admin@ong.org.br",
  name: "João Silva",
  role: "admin",
  permissions: ["all"],
  created_at: new Date(),
  updated_at: new Date(),
}

// Mock fontes de recurso
export const mockFontesRecurso: FonteRecurso[] = [
  {
    id: "fonte-1",
    nome: "Instituto XYZ",
    tipo: "Doação PJ",
    documento: "12.345.678/0001-90",
    responsavel: "Maria Santos",
    vigencia_inicio: new Date("2024-01-01"),
    vigencia_fim: new Date("2024-12-31"),
    valor_total: 500000,
    created_at: new Date(),
    updated_at: new Date(),
  },
  {
    id: "fonte-2",
    nome: "Convênio Prefeitura",
    tipo: "Convênio",
    documento: "CV-2024-001",
    responsavel: "Carlos Lima",
    vigencia_inicio: new Date("2024-03-01"),
    vigencia_fim: new Date("2025-02-28"),
    valor_total: 300000,
    created_at: new Date(),
    updated_at: new Date(),
  },
]

// Mock projetos
export const mockProjetos: Projeto[] = [
  {
    id: "projeto-1",
    nome: "Educação Infantil",
    descricao: "Projeto de apoio à educação infantil",
    data_inicio: new Date("2024-01-01"),
    data_fim: new Date("2024-12-31"),
    orcamento_total: 200000,
    status: "Ativo",
    responsavel_id: "user-1",
    created_at: new Date(),
    updated_at: new Date(),
  },
  {
    id: "projeto-2",
    nome: "Capacitação Profissional",
    descricao: "Cursos de capacitação para jovens",
    data_inicio: new Date("2024-02-01"),
    orcamento_total: 150000,
    status: "Ativo",
    responsavel_id: "user-1",
    created_at: new Date(),
    updated_at: new Date(),
  },
]

// Mock centros de custo
export const mockCentrosCusto: CentroCusto[] = [
  {
    id: "cc-1",
    nome: "Administrativo",
    descricao: "Custos administrativos gerais",
    codigo: "ADM001",
    ativo: true,
    created_at: new Date(),
    updated_at: new Date(),
  },
  {
    id: "cc-2",
    nome: "Projetos Sociais",
    descricao: "Custos dos projetos sociais",
    codigo: "PRJ001",
    ativo: true,
    created_at: new Date(),
    updated_at: new Date(),
  },
]

// Mock categorias
export const mockCategorias: Categoria[] = [
  {
    id: "cat-1",
    nome: "Doações Recebidas",
    tipo: "Receita",
    codigo_contabil: "3.1.001",
    descricao: "Receitas de doações",
    ativo: true,
    created_at: new Date(),
    updated_at: new Date(),
  },
  {
    id: "cat-2",
    nome: "Material de Escritório",
    tipo: "Despesa",
    codigo_contabil: "4.1.001",
    descricao: "Despesas com material de escritório",
    ativo: true,
    created_at: new Date(),
    updated_at: new Date(),
  },
  {
    id: "cat-3",
    nome: "Salários",
    tipo: "Despesa",
    codigo_contabil: "4.2.001",
    descricao: "Despesas com pessoal",
    ativo: true,
    created_at: new Date(),
    updated_at: new Date(),
  },
]

// Mock recebimentos
export const mockRecebimentos: Recebimento[] = [
  {
    id: "rec-1",
    data: new Date("2024-01-15"),
    valor_bruto: 50000,
    valor_liquido: 50000,
    fonte_id: "fonte-1",
    conta_bancaria_id: "conta-1",
    categoria_id: "cat-1",
    referencia: "DOA-2024-001",
    observacoes: "Primeira parcela do convênio",
    status: "Confirmado",
    created_by: "user-1",
    created_at: new Date(),
    updated_at: new Date(),
  },
  {
    id: "rec-2",
    data: new Date("2024-02-10"),
    valor_bruto: 25000,
    valor_liquido: 25000,
    fonte_id: "fonte-2",
    conta_bancaria_id: "conta-1",
    categoria_id: "cat-1",
    referencia: "DOA-2024-002",
    status: "Pendente",
    created_by: "user-1",
    created_at: new Date(),
    updated_at: new Date(),
  },
]

// Mock fornecedores
export const mockFornecedores: Fornecedor[] = [
  {
    id: "forn-1",
    razao_social: "Papelaria Central Ltda",
    nome_fantasia: "Papelaria Central",
    cnpj: "11.222.333/0001-44",
    info_contato: {
      email: "contato@papelaria.com",
      telefone: "(11) 1234-5678",
      endereco: "Rua das Flores, 123",
    },
    dados_bancarios: {
      banco: "001 - Banco do Brasil",
      agencia: "1234-5",
      conta: "12345-6",
      tipo_conta: "Corrente",
    },
    created_at: new Date(),
    updated_at: new Date(),
  },
  {
    id: "forn-2",
    razao_social: "Tech Solutions S.A.",
    nome_fantasia: "TechSol",
    cnpj: "22.333.444/0001-55",
    info_contato: {
      email: "vendas@techsol.com",
      telefone: "(11) 9876-5432",
    },
    created_at: new Date(),
    updated_at: new Date(),
  },
]

// Mock despesas
export const mockDespesas: Despesa[] = [
  {
    id: "desp-1",
    tipo: "NF-e",
    numero_documento: "000123456",
    data_emissao: new Date("2024-01-20"),
    data_vencimento: new Date("2024-02-20"),
    fornecedor_id: "forn-1",
    valor_bruto: 1500,
    valor_liquido: 1350,
    centro_custo_id: "cc-1",
    projeto_id: "projeto-1",
    categoria_id: "cat-2",
    descricao: "Material de escritório",
    status_aprovacao: "Aprovado",
    status_pagamento: "Pago",
    aprovado_por: "user-1",
    aprovado_em: new Date("2024-01-21"),
    pago_em: new Date("2024-02-15"),
    created_by: "user-1",
    created_at: new Date(),
    updated_at: new Date(),
  },
  {
    id: "desp-2",
    tipo: "Reembolso",
    numero_documento: "RB-001",
    data_emissao: new Date("2024-02-01"),
    data_vencimento: new Date("2024-02-15"),
    fornecedor_id: "forn-2",
    valor_bruto: 800,
    valor_liquido: 800,
    centro_custo_id: "cc-2",
    projeto_id: "projeto-2",
    categoria_id: "cat-2",
    descricao: "Reembolso de combustível",
    status_aprovacao: "Em Aprovação",
    status_pagamento: "Pendente",
    created_by: "user-1",
    created_at: new Date(),
    updated_at: new Date(),
  },
]

// Mock workflows
export const mockWorkflows: WorkflowAprovacao[] = [
  {
    id: "wf-1",
    nome: "Aprovação Padrão",
    descricao: "Workflow padrão para despesas até R$ 5.000",
    ativo: true,
    regras: [
      {
        nivel: 1,
        tipo_aprovador: "Gestor do Projeto",
        valor_acima_de: 0,
        usuarios_aprovadores: ["user-1"],
      },
      {
        nivel: 2,
        tipo_aprovador: "Diretoria",
        valor_acima_de: 1000,
        usuarios_aprovadores: ["user-1"],
      },
    ],
    created_at: new Date(),
    updated_at: new Date(),
  },
]

// Mock orçamentos
export const mockOrcamentos: Orcamento[] = [
  {
    id: "orc-1",
    nome: "Orçamento 2024 - Educação Infantil",
    ano_fiscal: 2024,
    projeto_id: "projeto-1",
    centro_custo_id: "cc-2",
    status: "Aprovado",
    versao: 1,
    total_previsto: 200000,
    created_by: "user-1",
    created_at: new Date(),
    updated_at: new Date(),
  },
]

// Mock linhas orçamentárias
export const mockLinhasOrcamentarias: LinhaOrcamentaria[] = [
  {
    id: "linha-1",
    orcamento_id: "orc-1",
    categoria_id: "cat-2",
    mes_1_previsto: 5000,
    mes_2_previsto: 5000,
    mes_3_previsto: 5000,
    mes_4_previsto: 5000,
    mes_5_previsto: 5000,
    mes_6_previsto: 5000,
    mes_7_previsto: 5000,
    mes_8_previsto: 5000,
    mes_9_previsto: 5000,
    mes_10_previsto: 5000,
    mes_11_previsto: 5000,
    mes_12_previsto: 5000,
    total_previsto: 60000,
  },
  {
    id: "linha-2",
    orcamento_id: "orc-1",
    categoria_id: "cat-3",
    mes_1_previsto: 12000,
    mes_2_previsto: 12000,
    mes_3_previsto: 12000,
    mes_4_previsto: 12000,
    mes_5_previsto: 12000,
    mes_6_previsto: 12000,
    mes_7_previsto: 12000,
    mes_8_previsto: 12000,
    mes_9_previsto: 12000,
    mes_10_previsto: 12000,
    mes_11_previsto: 12000,
    mes_12_previsto: 12000,
    total_previsto: 144000,
  },
]

// Mock conciliações
export const mockConciliacoes: ConciliacaoBancaria[] = [
  {
    id: "conc-1",
    contaId: "conta-1",
    dataImportacao: new Date("2024-02-01"),
    totalMovimentos: 25,
    valorTotal: 45000,
    status: "processado",
    usuarioId: "user-1",
  },
]

// Mock movimentos bancários
export const mockMovimentosBancarios: MovimentoBancario[] = [
  {
    id: "mb-1",
    data: new Date("2024-01-15"),
    descricao: "TED RECEBIDA - INSTITUTO XYZ",
    valor: 50000,
    tipo: "entrada",
    contaId: "conta-1",
    numeroDocumento: "TED123456",
    status: "conciliado",
    dataImportacao: new Date("2024-02-01"),
    movimentoFinanceiroId: "mf-1",
    dataConciliacao: new Date("2024-02-01"),
  },
  {
    id: "mb-2",
    data: new Date("2024-01-20"),
    descricao: "DOC ENVIADO - PAPELARIA CENTRAL",
    valor: -1350,
    tipo: "saida",
    contaId: "conta-1",
    numeroDocumento: "DOC789012",
    status: "conciliado",
    dataImportacao: new Date("2024-02-01"),
    movimentoFinanceiroId: "mf-2",
    dataConciliacao: new Date("2024-02-01"),
  },
]

// Mock movimentos financeiros
export const mockMovimentosFinanceiros: MovimentoFinanceiro[] = [
  {
    id: "mf-1",
    data: new Date("2024-01-15"),
    descricao: "Recebimento - Instituto XYZ",
    valor: 50000,
    tipo: "entrada",
    contaId: "conta-1",
    referenciaId: "rec-1",
    tipoReferencia: "recebimento",
    status: "conciliado",
    movimentoBancarioId: "mb-1",
    dataConciliacao: new Date("2024-02-01"),
  },
  {
    id: "mf-2",
    data: new Date("2024-01-20"),
    descricao: "Pagamento - Material de escritório",
    valor: -1350,
    tipo: "saida",
    contaId: "conta-1",
    referenciaId: "desp-1",
    tipoReferencia: "despesa",
    status: "conciliado",
    movimentoBancarioId: "mb-2",
    dataConciliacao: new Date("2024-02-01"),
  },
]

// Mock usuários
export const mockUsuarios: Usuario[] = [
  {
    id: "user-1",
    nome: "João Silva",
    email: "joao@ong.org.br",
    papel: "Administrador",
    permissoes: ["criar_usuario", "editar_usuario", "visualizar_relatorios", "aprovar_despesas"],
    status: "ativo",
    dataCriacao: new Date("2023-01-01"),
    ultimoLogin: new Date("2024-02-15"),
  },
  {
    id: "user-2",
    nome: "Maria Santos",
    email: "maria@ong.org.br",
    papel: "Analista Financeiro",
    permissoes: ["criar_despesa", "editar_despesa", "visualizar_relatorios"],
    status: "ativo",
    dataCriacao: new Date("2023-06-15"),
    ultimoLogin: new Date("2024-02-14"),
  },
]

// Mock logs de auditoria
export const mockLogs: LogAuditoria[] = [
  {
    id: "log-1",
    acao: "criar_despesa",
    entidade: "despesa",
    entidadeId: "desp-1",
    usuarioId: "user-1",
    timestamp: new Date("2024-01-20T10:30:00"),
    detalhes: "Despesa criada: Material de escritório - R$ 1.500,00",
    ip: "192.168.1.100",
  },
  {
    id: "log-2",
    acao: "aprovar_despesa",
    entidade: "despesa",
    entidadeId: "desp-1",
    usuarioId: "user-1",
    timestamp: new Date("2024-01-21T14:15:00"),
    detalhes: "Despesa aprovada: Material de escritório",
    ip: "192.168.1.100",
  },
  {
    id: "log-3",
    acao: "criar_recebimento",
    entidade: "recebimento",
    entidadeId: "rec-1",
    usuarioId: "user-1",
    timestamp: new Date("2024-01-15T09:00:00"),
    detalhes: "Recebimento registrado: Instituto XYZ - R$ 50.000,00",
    ip: "192.168.1.100",
  },
]
