import * as z from "zod"

export interface ReceitaDto {
  id: string
  nome: string
  // Adicione outros campos conforme necessário
}

export interface CriarReceitaDto {
  nome: string
}

export type AtualizarReceitaDto = Partial<CriarReceitaDto>

export const CriarReceitaSchema = z.object({
  nome: z.string().min(3, "O nome é obrigatório."),
})

export interface ReceitaListDto {
  id: string
  nome: string
}

export const ReceitaListSchema = z.object({
  nome: z.string(),
})
