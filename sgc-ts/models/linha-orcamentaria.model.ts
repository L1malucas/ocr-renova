import * as z from "zod"

export interface LinhaOrcamentariaDto {
  id: string
  nome: string
  orcamentoId: string
  // Adicione outros campos conforme necessário
}

export interface CriarLinhaOrcamentariaDto {
  nome: string
  orcamentoId: string
}

export type AtualizarLinhaOrcamentariaDto = Partial<CriarLinhaOrcamentariaDto>

export const CriarLinhaOrcamentariaSchema = z.object({
  nome: z.string().min(3, "O nome é obrigatório."),
  orcamentoId: z.string().min(1, "O orçamento é obrigatório."),
})

export interface LinhaOrcamentariaListDto {
  id: string
  nome: string
}

export const LinhaOrcamentariaListSchema = z.object({
  nome: z.string(),
})