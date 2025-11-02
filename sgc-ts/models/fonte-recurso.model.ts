import * as z from "zod"

export interface FonteRecursoDto {
  id: string
  nome: string
  // Adicione outros campos conforme necessário
}

export interface CriarFonteRecursoDto {
  nome: string
}

export type AtualizarFonteRecursoDto = Partial<CriarFonteRecursoDto>

export const CriarFonteRecursoSchema = z.object({
  nome: z.string().min(3, "O nome é obrigatório."),
})

export interface FonteRecursoListDto {
  id: string
  nome: string
}

export const FonteRecursoListSchema = z.object({
  nome: z.string(),
})