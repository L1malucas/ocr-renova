"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableHeader } from "@/components/ui/table"
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle } from "@/components/ui/drawer"
import { PlusCircle } from "lucide-react"
import { useGetAditivosByContrato, useDeleteAditivo } from "@/hooks/use-aditivos"
import { AditivoDto, AditivoListSchema } from "@/models/aditivo.model"
import { AditivoForm } from "./aditivo-form"
import { generateTableColumns, generateTableCells } from "@/lib/table-generator"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog"

export function AditivosManager({ contratoId }: { contratoId: string }) {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const [editingAditivo, setEditingAditivo] = useState<AditivoDto | null>(null)
  const [deletingId, setDeletingId] = useState<string | null>(null)

  const { data, isLoading } = useGetAditivosByContrato(contratoId, { pageNumber: 1, pageSize: 10 })
  const deleteMutation = useDeleteAditivo()
  const aditivos = data?.data ?? []

  const handleCreateNew = () => {
    setEditingAditivo(null)
    setIsDrawerOpen(true)
  }

  const handleEdit = (aditivo: AditivoDto) => {
    setEditingAditivo(aditivo)
    setIsDrawerOpen(true)
  }

  const handleDelete = () => {
    if (deletingId) {
      deleteMutation.mutate(deletingId, { onSuccess: () => setDeletingId(null) })
    }
  }

  const handleFormSuccess = () => {
    setIsDrawerOpen(false)
    setEditingAditivo(null)
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Aditivos do Contrato</CardTitle>
          <CardDescription>Gerencie os aditivos de prazo e valor.</CardDescription>
        </div>
        <Button size="sm" onClick={handleCreateNew}>
          <PlusCircle className="mr-2 h-4 w-4" />
          Novo Aditivo
        </Button>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <p>Carregando aditivos...</p>
        ) : (
          <Table>
            <TableHeader>{generateTableColumns(AditivoListSchema)}</TableHeader>
            <TableBody>
              {generateTableCells(AditivoListSchema, aditivos, handleEdit, (id) => setDeletingId(id))}
            </TableBody>
          </Table>
        )}
      </CardContent>

      <Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
        <DrawerContent>
          <DrawerHeader><DrawerTitle>{editingAditivo ? "Editar Aditivo" : "Novo Aditivo"}</DrawerTitle></DrawerHeader>
          <AditivoForm contratoId={contratoId} aditivoToEdit={editingAditivo} onSuccess={handleFormSuccess} />
        </DrawerContent>
      </Drawer>

      <AlertDialog open={!!deletingId} onOpenChange={() => setDeletingId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirmar Exclusão</AlertDialogTitle>
            <AlertDialogDescription>Tem certeza que deseja excluir este aditivo?</AlertDialogDescription>
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
