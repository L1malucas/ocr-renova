"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Table, TableBody, TableHeader, TableRow, TableCell } from "@/components/ui/table"
import { useDeleteLinhaOrcamentaria } from "@/hooks/use-linhas-orcamentarias"
import { LinhaOrcamentariaDto, LinhaOrcamentariaListSchema } from "@/models/linha-orcamentaria.model"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { generateTableColumns, generateTableCells } from "@/lib/table-generator"

interface OrcamentoListProps {
  linhas: LinhaOrcamentariaDto[]
  onEdit: (linha: LinhaOrcamentariaDto) => void
}

export function OrcamentoList({ linhas, onEdit }: OrcamentoListProps) {
  const [deletingId, setDeletingId] = useState<string | null>(null)
  const deleteMutation = useDeleteLinhaOrcamentaria()

  const handleDelete = () => {
    if (deletingId) {
      deleteMutation.mutate(deletingId, {
        onSuccess: () => setDeletingId(null),
      })
    }
  }

  return (
    <Card>
      <CardContent className="p-0">
        <Table>
          <TableHeader>
            {generateTableColumns(LinhaOrcamentariaListSchema)}
          </TableHeader>
          <TableBody>
            {linhas.length === 0 && (
              <TableRow><TableCell colSpan={6} className="text-center py-8">Nenhuma linha orçamentária encontrada.</TableCell></TableRow>
            )}
            {generateTableCells(LinhaOrcamentariaListSchema, linhas, onEdit, (id) => setDeletingId(id))}
          </TableBody>
        </Table>
      </CardContent>

      <AlertDialog open={!!deletingId} onOpenChange={() => setDeletingId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirmar Exclusão</AlertDialogTitle>
            <AlertDialogDescription>Tem certeza que deseja excluir esta linha orçamentária?</AlertDialogDescription>
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