"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Table, TableBody, TableHeader, TableRow, TableCell } from "@/components/ui/table"
import { Plus } from "lucide-react"
import { useGetOrganizacoesSociais, useDeleteOrganizacaoSocial } from "@/hooks/use-organizacoes-sociais"
import { OrganizacaoSocialDto, OrganizacaoSocialListSchema } from "@/models/organizacao-social.model"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog"
import { generateTableColumns, generateTableCells } from "@/lib/table-generator"

interface OrganizacoesListProps {
  onCreateNew: () => void
  onEdit: (org: OrganizacaoSocialDto) => void
}

export function OrganizacoesList({ onCreateNew, onEdit }: OrganizacoesListProps) {
  const [page, setPage] = useState(1)
  const [deletingId, setDeletingId] = useState<string | null>(null)

  const { data, isLoading, isError } = useGetOrganizacoesSociais({ pageNumber: page, pageSize: 10 })
  const deleteMutation = useDeleteOrganizacaoSocial()

  const organizacoes = data?.data ?? []
  const meta = data?.meta

  const handleDelete = () => {
    if (deletingId) {
      deleteMutation.mutate(deletingId, { onSuccess: () => setDeletingId(null) })
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Organizações Sociais</h2>
        <Button onClick={onCreateNew} className="gap-2">
          <Plus className="h-4 w-4" />
          Nova Organização
        </Button>
      </div>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              {generateTableColumns(OrganizacaoSocialListSchema)}
            </TableHeader>
            <TableBody>
              {isLoading && <TableRow><TableCell colSpan={4} className="text-center py-8">Carregando...</TableCell></TableRow>}
              {isError && <TableRow><TableCell colSpan={4} className="text-center py-8 text-red-500">Erro ao carregar dados.</TableCell></TableRow>}
              {generateTableCells(OrganizacaoSocialListSchema, organizacoes, onEdit, (id) => setDeletingId(id))}
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
            <AlertDialogDescription>Tem certeza que deseja excluir esta organização?</AlertDialogDescription>
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
