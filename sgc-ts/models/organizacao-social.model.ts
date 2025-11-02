import * as z from "zod"

export interface OrganizacaoSocialDto {
  id: string
  nome: string
  // Adicione outros campos conforme necessário
}

export interface CriarOrganizacaoSocialDto {
  nome: string
}

export type AtualizarOrganizacaoSocialDto = Partial<CriarOrganizacaoSocialDto>

export const CriarOrganizacaoSocialSchema = z.object({
  nome: z.string().min(3, "O nome é obrigatório."),
})

export interface OrganizacaoSocialListDto {
  id: string
  nome: string
}

export const OrganizacaoSocialListSchema = z.object({
  nome: z.string(),
})