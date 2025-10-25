/**
 * DTO principal para representar um Fornecedor.
 */
export interface FornecedorDto {
  id: string;
  nome: string | null;
  nomeFantasia: string | null;
  cnpj: string | null;
  inscricaoEstadual: string | null;
  email: string | null;
  telefone: string | null;
  pessoaContato: string | null;
  rua: string | null;
  numero: string | null;
  complemento: string | null;
  bairro: string | null;
  cidade: string | null;
  estado: string | null;
  cep: string | null;
}

/**
 * DTO para a criação de um novo Fornecedor.
 */
export interface CriarFornecedorDto {
  nome: string;
  nomeFantasia?: string | null;
  cnpj: string;
  inscricaoEstadual?: string | null;
  email?: string | null;
  telefone?: string | null;
  pessoaContato?: string | null;
  rua?: string | null;
  numero?: string | null;
  complemento?: string | null;
  bairro?: string | null;
  cidade?: string | null;
  estado?: string | null;
  cep?: string | null;
  attachment?: File;
}

/**
 * DTO para a atualização de um Fornecedor.
 */
export interface AtualizarFornecedorDto {
  nome: string;
  nomeFantasia?: string | null;
  cnpj: string;
  inscricaoEstadual?: string | null;
  email?: string | null;
  telefone?: string | null;
  pessoaContato?: string | null;
  rua?: string | null;
  numero?: string | null;
  complemento?: string | null;
  bairro?: string | null;
  cidade?: string | null;
  estado?: string | null;
  cep?: string | null;
}
