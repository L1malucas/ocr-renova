import * as z from "zod"

/**
 * DTO principal para representar uma Categoria.
 */
export interface CategoriaDto {
  id: string
  name: string
  code: string
  description: string
  parentCategoryId: string | null
  subcategories: CategoriaDto[]
}

/**
 * DTO para criação de uma nova Categoria.
 */
export interface CriarCategoriaDto {
  id: string
  name: string
  code: string
  description: string
  parentCategoryId: string | null
  subcategories: CategoriaDto[]
}

/**
 * DTO para atualização de uma Categoria.
 */
export interface AtualizarCategoriaDto {
  id: string
  name: string
  code: string
  description: string
  parentCategoryId: string | null
  subcategories: CategoriaDto[]
}

export const CriarCategoriaSchema = z.object({
  id: z.string(),
  name: z.string().min(1, "O nome é obrigatório."),
  code: z.string().min(1, "O código é obrigatório."),
  description: z.string(),
  parentCategoryId: z.string().nullable(),
  subcategories: z.array(z.any()),
})

export interface CategoriaListDto {
  id: string
  name: string
  code: string
  description: string
}

export const CategoriaListSchema = z.object({
  name: z.string(),
  code: z.string(),
  description: z.string(),
})