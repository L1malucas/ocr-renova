import * as z from "zod"

export interface UnidadeDto {
  id: string
  nome: string
  // Adicione outros campos conforme necessário
}

export interface CriarUnidadeDto {
  nome: string
}

export type AtualizarUnidadeDto = Partial<CriarUnidadeDto>

export const CriarUnidadeSchema = z.object({
  nome: z.string().min(3, "O nome é obrigatório."),
})

export interface UnidadeListDto {
  id: string
  nome: string
}

export const UnidadeListSchema = z.object({
  nome: z.string(),
})
