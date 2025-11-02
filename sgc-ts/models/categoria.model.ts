import * as z from "zod"

export interface CategoriaDto {
  id: string
  nome: string
  // Adicione outros campos conforme necessário
}

export interface CriarCategoriaDto {
  nome: string
}

export type AtualizarCategoriaDto = Partial<CriarCategoriaDto>

export const CriarCategoriaSchema = z.object({
  nome: z.string().min(3, "O nome é obrigatório."),
})

export interface CategoriaListDto {
  id: string
  nome: string
}

export const CategoriaListSchema = z.object({
  nome: z.string(),
})