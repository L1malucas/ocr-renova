import * as z from 'zod';

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
export interface FornecedorListDto {
  id: string;
  nome: string | null;
  cnpj: string | null;
  inscricaoEstadual: string | null;
  email?: string | null;
}

export const FornecedorListSchema = z.object({
  nome: z.string(),
  cnpj: z.string(),
  inscricaoEstadual: z.string(),
  email: z.string().email()
});

export const CriarFornecedorSchema = z.object({
  nome: z.string().min(3, "O nome é obrigatório."),
  nomeFantasia: z.string().optional(),
  cnpj: z.string().min(14, "O CNPJ deve ter 14 caracteres.").max(18, "O CNPJ deve ter no máximo 18 caracteres."),
  inscricaoEstadual: z.string().optional(),
  email: z.string().email("E-mail inválido.").optional(),
  telefone: z.string().optional(),
  pessoaContato: z.string().optional(),
  rua: z.string().optional(),
  numero: z.string().optional(),
  complemento: z.string().optional(),
  bairro: z.string().optional(),
  cidade: z.string().optional(),
  estado: z.string().optional(),
  cep: z.string().optional(),
  attachment: z.any().optional(),
});
