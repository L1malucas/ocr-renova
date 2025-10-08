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
