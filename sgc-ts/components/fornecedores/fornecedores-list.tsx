"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Plus, Edit, Trash2 } from "lucide-react"
import { useGetFornecedores, useDeleteFornecedor } from "@/hooks/use-fornecedores"
import { FornecedorDto } from "@/models/fornecedor.model"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog"

interface FornecedoresListProps {
  onCreateNew: () => void
  onEdit: (fornecedor: FornecedorDto) => void
}

export function FornecedoresList({ onCreateNew, onEdit }: FornecedoresListProps) {
  const [page, setPage] = useState(1)
  const [deletingId, setDeletingId] = useState<string | null>(null)

  const { data, isLoading, isError, error } = useGetFornecedores({ pageNumber: page, pageSize: 10 })
  const deleteMutation = useDeleteFornecedor()

  const fornecedores = data?.data ?? []
  const meta = data?.meta

  const handleDelete = () => {
    if (deletingId) {
      deleteMutation.mutate(deletingId, { onSuccess: () => setDeletingId(null) })
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Gestão de Fornecedores</h1>
          <p className="text-muted-foreground">Cadastre e gerencie seus fornecedores.</p>
        </div>
        <Button onClick={onCreateNew} className="gap-2">
          <Plus className="h-4 w-4" />
          Novo Fornecedor
        </Button>
      </div>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nome</TableHead>
                <TableHead>CNPJ/CPF</TableHead>
                <TableHead>Contato</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading && (
                <TableRow><TableCell colSpan={4} className="text-center py-8">Carregando...</TableCell></TableRow>
              )}
              {isError && (
                <TableRow><TableCell colSpan={4} className="text-center py-8 text-red-600">Erro: {error.message}</TableCell></TableRow>
              )}
              {fornecedores.map((fornecedor) => (
                <TableRow key={fornecedor.id}>
                  <TableCell className="font-medium">{fornecedor.nome}</TableCell>
                  <TableCell>{fornecedor.documento}</TableCell>
                  <TableCell>{fornecedor.contato}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Button variant="ghost" size="sm" onClick={() => onEdit(fornecedor)}><Edit className="h-4 w-4" /></Button>
                      <Button variant="ghost" size="sm" onClick={() => setDeletingId(fornecedor.id)} disabled={deleteMutation.isLoading}><Trash2 className="h-4 w-4" /></Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {meta && (
        <div className="flex justify-end items-center gap-4">
          <span className="text-sm text-muted-foreground">Página {meta.currentPage} de {meta.totalPages}</span>
          <Button onClick={() => setPage(p => p - 1)} disabled={!meta.hasPreviousPage}>Anterior</Button>
          <Button onClick={() => setPage(p => p + 1)} disabled={!meta.hasNextPage}>Próxima</Button>
        </div>
      )}

      <AlertDialog open={!!deletingId} onOpenChange={() => setDeletingId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirmar Exclusão</AlertDialogTitle>
            <AlertDialogDescription>Tem certeza que deseja excluir este fornecedor?</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} disabled={deleteMutation.isLoading}>
              {deleteMutation.isLoading ? "Excluindo..." : "Excluir"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
