"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Plus, Edit, Trash2 } from "lucide-react"
import { useGetCategorias, useDeleteCategoria } from "@/hooks/use-categorias"
import { TipoCategoria } from "@/services/categorias.service"
import { CategoriaDto } from "@/models/categoria.model"
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle } from "@/components/ui/drawer"
import { CategoriaForm } from "./categoria-form"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog"

interface CategoriaManagerProps {
  tipo: TipoCategoria
}

export function CategoriaManager({ tipo }: CategoriaManagerProps) {
  const [page, setPage] = useState(1)
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const [editingCategoria, setEditingCategoria] = useState<CategoriaDto | null>(null)
  const [deletingId, setDeletingId] = useState<string | null>(null)

  const { data, isLoading, isError, error } = useGetCategorias(tipo, { pageNumber: page, pageSize: 10 })
  const deleteMutation = useDeleteCategoria()

  const categorias = data?.data ?? []
  const meta = data?.meta

  const handleCreateNew = () => {
    setEditingCategoria(null)
    setIsDrawerOpen(true)
  }

  const handleEdit = (categoria: CategoriaDto) => {
    setEditingCategoria(categoria)
    setIsDrawerOpen(true)
  }

  const handleDelete = () => {
    if (deletingId) {
      deleteMutation.mutate({ tipo, id: deletingId }, {
        onSuccess: () => setDeletingId(null),
      })
    }
  }

  const handleFormSuccess = () => {
    setIsDrawerOpen(false)
    setEditingCategoria(null)
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Gerenciar Categorias de {tipo}</CardTitle>
          <CardDescription>Adicione, edite ou remova categorias para este módulo.</CardDescription>
        </div>
        <Button size="sm" onClick={handleCreateNew}>
          <Plus className="mr-2 h-4 w-4" />
          Nova Categoria
        </Button>
      </CardHeader>
      <CardContent>
        {isLoading && <p>Carregando categorias...</p>}
        {isError && <p className="text-red-500">Erro ao carregar categorias: {error instanceof Error ? error.message : "Erro desconhecido"}</p>}
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nome</TableHead>
              <TableHead className="text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {categorias.map(categoria => (
              <TableRow key={categoria.id}>
                <TableCell>{categoria.nome}</TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="sm" onClick={() => handleEdit(categoria)}><Edit className="h-4 w-4" /></Button>
                  <Button variant="ghost" size="sm" onClick={() => setDeletingId(categoria.id)} disabled={deleteMutation.isLoading}><Trash2 className="h-4 w-4" /></Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>

      {meta && (
        <div className="flex justify-end items-center gap-4">
          <span className="text-sm text-muted-foreground">Página {meta.currentPage} de {meta.totalPages}</span>
          <Button onClick={() => setPage(p => p - 1)} disabled={!meta.hasPreviousPage}>Anterior</Button>
          <Button onClick={() => setPage(p => p + 1)} disabled={!meta.hasNextPage}>Próxima</Button>
        </div>
      )}

      <Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
        <DrawerContent className="max-h-[90vh]">
          <DrawerHeader>
            <DrawerTitle>{editingCategoria ? "Editar Categoria" : "Nova Categoria"}</DrawerTitle>
          </DrawerHeader>
          <div className="overflow-auto p-4">
            <CategoriaForm tipo={tipo} categoriaToEdit={editingCategoria} onSuccess={handleFormSuccess} />
          </div>
        </DrawerContent>
      </Drawer>

      <AlertDialog open={!!deletingId} onOpenChange={() => setDeletingId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirmar Exclusão</AlertDialogTitle>
            <AlertDialogDescription>Tem certeza que deseja excluir esta categoria?</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} disabled={deleteMutation.isLoading}>
              {deleteMutation.isLoading ? "Excluindo..." : "Excluir"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Card>
  )
}
