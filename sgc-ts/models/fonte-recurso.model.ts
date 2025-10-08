/**
 * DTO principal para representar uma Fonte de Recurso.
 */
export interface FonteRecursoDto {
  id: string;
  nome: string | null;
  descricao: string | null;
}

/**
 * DTO para a criação de uma nova Fonte de Recurso.
 */
export interface CriarFonteRecursoDto {
  nome: string;
  descricao?: string | null;
}

/**
 * DTO para a atualização de uma Fonte de Recurso.
 */
export interface AtualizarFonteRecursoDto {
  nome: string;
  descricao?: string | null;
}
