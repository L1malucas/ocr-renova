import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Table, TableBody, TableHeader, TableRow, TableCell } from "@/components/ui/table"
import { Edit, Trash2, PlayCircle } from "lucide-react"
import { useDeleteItemPlanoTrabalho } from "@/hooks/use-itens-trabalho"
import { ItemPlanoTrabalhoDto, ItemPlanoTrabalhoListSchema } from "@/models/item-plano-trabalho.model"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog"
import { generateTableColumns, generateTableCells } from "@/lib/table-generator"
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle } from "@/components/ui/drawer"
import { ExecucaoItemPlanoTrabalhoForm } from "./execucao-item-plano-trabalho-form"

interface ItensTrabalhoListProps {
  itens: ItemPlanoTrabalhoDto[]
  onEdit: (item: ItemPlanoTrabalhoDto) => void
}

export function ItensTrabalhoList({ itens, onEdit }: ItensTrabalhoListProps) {
  const [deletingId, setDeletingId] = useState<string | null>(null)
  const [isExecucaoDrawerOpen, setIsExecucaoDrawerOpen] = useState(false)
  const [selectedItemForExecucao, setSelectedItemForExecucao] = useState<string | null>(null)
  const deleteMutation = useDeleteItemPlanoTrabalho()

  const handleDelete = () => {
    if (deletingId) {
      deleteMutation.mutate(deletingId, { onSuccess: () => setDeletingId(null) })
    }
  }

  const handleOpenExecucaoForm = (itemId: string) => {
    setSelectedItemForExecucao(itemId)
    setIsExecucaoDrawerOpen(true)
  }

  const handleExecucaoFormSuccess = () => {
    setIsExecucaoDrawerOpen(false)
    setSelectedItemForExecucao(null)
  }

  return (
    <Card>
      <CardContent className="p-0">
        <Table>
          <TableHeader>
            {generateTableColumns(ItemPlanoTrabalhoListSchema)}
            <TableHead className="text-right">Execução</TableHead>
          </TableHeader>
          <TableBody>
            {itens.length === 0 && (
              <TableRow><TableCell colSpan={5} className="text-center py-8">Nenhum item encontrado.</TableCell></TableRow>
            )}
            {generateTableCells(ItemPlanoTrabalhoListSchema, itens, onEdit, (id) => setDeletingId(id))}
            {itens.map((item) => (
              <TableRow key={item.id}>
                <TableCell className="text-right">
                  <Button variant="ghost" size="sm" onClick={() => handleOpenExecucaoForm(item.id)}>
                    <PlayCircle className="h-4 w-4" />
                  </Button>
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

      <Drawer open={isExecucaoDrawerOpen} onOpenChange={setIsExecucaoDrawerOpen}>
        <DrawerContent className="max-h-[90vh]">
          <DrawerHeader>
            <DrawerTitle>Registrar Execução</DrawerTitle>
          </DrawerHeader>
          <div className="overflow-auto p-4">
            {selectedItemForExecucao && (
              <ExecucaoItemPlanoTrabalhoForm
                itemPlanoTrabalhoId={selectedItemForExecucao}
                onSuccess={handleExecucaoFormSuccess}
              />
            )}
          </div>
        </DrawerContent>
      </Drawer>
    </Card>
  )
}
