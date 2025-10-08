import { ApiResponse, PaginatedApiResponse } from "@/lib/types";

export interface AtualizarUnidadeDto {
  /** @minLength 1 */
  nome: string;
  /** @minLength 1 */
  cnpj: string;
  codigoCnes?: string | null;
  telefonePrincipal?: string | null;
  /** @format email */
  emailPrincipal?: string | null;
}

export interface CriarUnidadeDto {
  /** @minLength 1 */
  nome: string;
  /** @minLength 1 */
  cnpj: string;
  codigoCnes?: string | null;
  telefonePrincipal?: string | null;
  /** @format email */
  emailPrincipal?: string | null;
  /** @format uuid */
  organizacaoSocialId: string;
}

export interface UnidadeDto {
  /** @format uuid */
  id?: string;
  nome?: string | null;
  cnpj?: string | null;
  codigoCnes?: string | null;
  telefonePrincipal?: string | null;
  emailPrincipal?: string | null;
  /** @format uuid */
  organizacaoSocialId?: string;
}

export interface UnidadeDtoApiResponse extends ApiResponse<UnidadeDto> {}

export interface UnidadeDtoPagedApiResponse extends PaginatedApiResponse<UnidadeDto[]> {}