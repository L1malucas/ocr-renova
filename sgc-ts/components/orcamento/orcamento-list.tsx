"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Edit, Trash2 } from "lucide-react"
import { useDeleteLinhaOrcamentaria } from "@/hooks/use-linhas-orcamentarias"
import { LinhaOrcamentariaDto } from "@/models/linha-orcamentaria.model"
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
            <TableRow>
              <TableHead>Nome da Linha</TableHead>
              <TableHead>Valor Orçado</TableHead>
              <TableHead className="text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {linhas.length === 0 && (
              <TableRow><TableCell colSpan={3} className="text-center py-8">Nenhuma linha orçamentária encontrada.</TableCell></TableRow>
            )}
            {linhas.map((linha) => (
              <TableRow key={linha.id}>
                <TableCell className="font-medium">{linha.nome}</TableCell>
                <TableCell>{linha.valor.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}</TableCell>
                <TableCell className="text-right">
                  <div className="flex items-center justify-end gap-2">
                    <Button variant="ghost" size="sm" onClick={() => onEdit(linha)}>
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => setDeletingId(linha.id)} disabled={deleteMutation.isLoading}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
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