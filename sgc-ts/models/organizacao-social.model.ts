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
