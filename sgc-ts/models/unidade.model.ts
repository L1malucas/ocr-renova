import * as z from 'zod';
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

export const CriarUnidadeSchema = z.object({
  nome: z.string().min(1, "O nome é obrigatório."),
  cnpj: z.string().min(1, "O CNPJ é obrigatório."),
  codigoCnes: z.string().optional(),
  telefonePrincipal: z.string().optional(),
  emailPrincipal: z.string().email("E-mail inválido.").optional(),
  organizacaoSocialId: z.string().min(1, "A organização social é obrigatória."),
});

export interface UnidadeListDto {
  id?: string;
  nome?: string | null;
  cnpj?: string | null;
  organizacaoSocialId?: string;
}

export const UnidadeListSchema = z.object({
  nome: z.string(),
  cnpj: z.string(),
  organizacaoSocialId: z.string(),
});