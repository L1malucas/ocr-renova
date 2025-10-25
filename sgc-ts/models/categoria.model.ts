import * as z from 'zod';

/**
 * DTO principal para representar uma Categoria.
 */
export interface CategoriaDto {
  id: string;
  name: string | null;
  code: string | null;
  description: string | null;
  parentCategoryId: string | null;
  subcategories: CategoriaDto[] | null;
}

/**
 * DTO para a criação de uma nova Categoria.
 */
export interface CriarCategoriaDto {
  name: string;
  code?: string | null;
  description?: string | null;
  parentCategoryId?: string | null;
}

/**
 * DTO para a atualização de uma Categoria.
 */
export interface AtualizarCategoriaDto {
  name: string;
  code?: string | null;
  description?: string | null;
  parentCategoryId?: string | null;
}

export const CriarCategoriaSchema = z.object({
  name: z.string().min(3, "O nome é obrigatório."),
  code: z.string().optional(),
  description: z.string().optional(),
  parentCategoryId: z.string().optional(),
});

export interface CategoriaListDto {
  id: string;
  name: string | null;
  code: string | null;
  description: string | null;
}

export const CategoriaListSchema = z.object({
  name: z.string(),
  code: z.string(),
  description: z.string(),
});
