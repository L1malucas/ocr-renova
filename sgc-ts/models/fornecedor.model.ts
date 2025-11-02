import * as z from "zod"

export interface FornecedorDto {
  id: string
  nome: string
  cnpj: string
  // Adicione outros campos conforme necessário
}

export interface CriarFornecedorDto {
  nome: string
  cnpj: string
}

export type AtualizarFornecedorDto = Partial<CriarFornecedorDto>

export const CriarFornecedorSchema = z.object({
  nome: z.string().min(3, "O nome é obrigatório."),
  cnpj: z.string().min(14, "O CNPJ é obrigatório."),
})

export interface FornecedorListDto {
  id: string
  nome: string
  cnpj: string
}

export const FornecedorListSchema = z.object({
  nome: z.string(),
  cnpj: z.string(),
})