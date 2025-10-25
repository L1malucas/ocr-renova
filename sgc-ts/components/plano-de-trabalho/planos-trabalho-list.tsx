import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Table, TableBody, TableHeader, TableRow, TableCell } from "@/components/ui/table"
import { Plus, Eye } from "lucide-react"
import { useGetPlanoTrabalhoByContratoId, useDeletePlanoTrabalho } from "@/hooks/use-plano-de-trabalho"
import { PlanoTrabalhoDto, PlanoTrabalhoListSchema } from "@/models/plano-trabalho.model"
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

interface PlanosTrabalhoListProps {
  onCreateNew: () => void
  onEdit: (planoTrabalho: PlanoTrabalhoDto) => void
  contratoId: string
}

export function PlanosTrabalhoList({ onCreateNew, onEdit, contratoId }: PlanosTrabalhoListProps) {
  const [deletingId, setDeletingId] = useState<string | null>(null)

  const { data, isLoading, isError, error } = useGetPlanoTrabalhoByContratoId(contratoId)
  const deleteMutation = useDeletePlanoTrabalho()

  const planosTrabalho = data?.data ? [data.data] : [] // Assuming one plano de trabalho per contract

  const handleDelete = () => {
    if (deletingId) {
      deleteMutation.mutate(deletingId, {
        onSuccess: () => setDeletingId(null),
      })
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Gestão de Planos de Trabalho</h1>
          <p className="text-muted-foreground">Gerencie os planos de trabalho do contrato.</p>
        </div>
        <Button onClick={onCreateNew} className="gap-2">
          <Plus className="h-4 w-4" />
          Novo Plano de Trabalho
        </Button>
      </div>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              {generateTableColumns(PlanoTrabalhoListSchema)}
            </TableHeader>
            <TableBody>
              {isLoading && (
                <TableRow><TableCell colSpan={6} className="text-center py-8">Carregando...</TableCell></TableRow>
              )}
              {isError && (
                <TableRow><TableCell colSpan={6} className="text-center py-8 text-red-600">Erro: {error.message}</TableCell></TableRow>
              )}
              {generateTableCells(PlanoTrabalhoListSchema, planosTrabalho, onEdit, (id) => setDeletingId(id))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <AlertDialog open={!!deletingId} onOpenChange={() => setDeletingId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirmar Exclusão</AlertDialogTitle>
            <AlertDialogDescription>Tem certeza que deseja excluir este plano de trabalho? Esta ação não pode ser desfeita.</AlertDialogDescription>
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
