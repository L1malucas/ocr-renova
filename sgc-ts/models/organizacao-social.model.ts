import * as z from 'zod';
import type { UnidadeDto } from './unidade.model';

/**
 * DTO principal para representar uma Organização Social.
 */
export interface OrganizacaoSocialDto {
  id: string;
  razaoSocial: string | null;
  nomeFantasia: string | null;
  cnpj: string | null;
  emailPrincipal: string | null;
  unidades: UnidadeDto[] | null;
}

/**
 * DTO para a criação de uma nova Organização Social.
 */
export interface CriarOrganizacaoSocialDto {
  razaoSocial: string;
  nomeFantasia?: string | null;
  cnpj: string;
  inscricaoEstadual?: string | null;
  inscricaoMunicipal?: string | null;
  telefonePrincipal?: string | null;
  emailPrincipal?: string | null;
}

/**
 * DTO para a atualização de uma Organização Social.
 */
export interface AtualizarOrganizacaoSocialDto {
  razaoSocial: string;
  nomeFantasia?: string | null;
  cnpj: string;
  inscricaoEstadual?: string | null;
  inscricaoMunicipal?: string | null;
  telefonePrincipal?: string | null;
  emailPrincipal?: string | null;
}

export const CriarOrganizacaoSocialSchema = z.object({
  razaoSocial: z.string().min(3, "A razão social é obrigatória."),
  nomeFantasia: z.string().optional(),
  cnpj: z.string().min(14, "O CNPJ deve ter 14 caracteres.").max(18, "O CNPJ deve ter no máximo 18 caracteres."),
  inscricaoEstadual: z.string().optional(),
  inscricaoMunicipal: z.string().optional(),
  telefonePrincipal: z.string().optional(),
  emailPrincipal: z.string().email("E-mail inválido.").optional(),
});

export interface OrganizacaoSocialListDto {
  id: string;
  razaoSocial: string | null;
  nomeFantasia: string | null;
  cnpj: string | null;
}

export const OrganizacaoSocialListSchema = z.object({
  razaoSocial: z.string(),
  nomeFantasia: z.string(),
  cnpj: z.string(),
});
