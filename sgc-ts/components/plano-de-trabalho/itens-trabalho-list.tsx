"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Edit, Trash2 } from "lucide-react"
import { useDeleteItemPlanoTrabalho } from "@/hooks/use-itens-trabalho"
import { ItemPlanoTrabalhoDto } from "@/models/item-plano-trabalho.model"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog"

interface ItensTrabalhoListProps {
  itens: ItemPlanoTrabalhoDto[]
  onEdit: (item: ItemPlanoTrabalhoDto) => void
}

export function ItensTrabalhoList({ itens, onEdit }: ItensTrabalhoListProps) {
  const [deletingId, setDeletingId] = useState<string | null>(null)
  const deleteMutation = useDeleteItemPlanoTrabalho()

  const handleDelete = () => {
    if (deletingId) {
      deleteMutation.mutate(deletingId, { onSuccess: () => setDeletingId(null) })
    }
  }

  return (
    <Card>
      <CardContent className="p-0">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Meta</TableHead>
              <TableHead>Indicador</TableHead>
              <TableHead>Responsável</TableHead>
              <TableHead className="text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {itens.length === 0 && (
              <TableRow><TableCell colSpan={4} className="text-center py-8">Nenhum item encontrado.</TableCell></TableRow>
            )}
            {itens.map((item) => (
              <TableRow key={item.id}>
                <TableCell className="font-medium">{item.meta}</TableCell>
                <TableCell>{item.indicador}</TableCell>
                <TableCell>{item.responsavel}</TableCell>
                <TableCell className="text-right">
                  <div className="flex items-center justify-end gap-2">
                    <Button variant="ghost" size="sm" onClick={() => onEdit(item)}><Edit className="h-4 w-4" /></Button>
                    <Button variant="ghost" size="sm" onClick={() => setDeletingId(item.id)} disabled={deleteMutation.isLoading}><Trash2 className="h-4 w-4" /></Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
      <AlertDialog open={!!deletingId} onOpenChange={() => setDeletingId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirmar Exclusão</AlertDialogTitle>
            <AlertDialogDescription>Tem certeza que deseja excluir este item?</AlertDialogDescription>
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
