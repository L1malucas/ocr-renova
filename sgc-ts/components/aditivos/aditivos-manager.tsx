"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle } from "@/components/ui/drawer"
import { PlusCircle, Edit } from "lucide-react"
import { useGetAditivosByContrato } from "@/hooks/use-aditivos"
import { AditivoDto } from "@/models/aditivo.model"
import { AditivoForm } from "./aditivo-form"

export function AditivosManager({ contratoId }: { contratoId: string }) {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const [editingAditivo, setEditingAditivo] = useState<AditivoDto | null>(null)

  const { data, isLoading } = useGetAditivosByContrato(contratoId, { pageNumber: 1, pageSize: 10 })
  const aditivos = data?.data ?? []

  const handleCreateNew = () => {
    setEditingAditivo(null)
    setIsDrawerOpen(true)
  }

  const handleEdit = (aditivo: AditivoDto) => {
    setEditingAditivo(aditivo)
    setIsDrawerOpen(true)
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
            <TableHeader><TableRow><TableHead>Tipo</TableHead><TableHead>Justificativa</TableHead><TableHead>Valor</TableHead><TableHead className="text-right">Ações</TableHead></TableRow></TableHeader>
            <TableBody>
              {aditivos.map(aditivo => (
                <TableRow key={aditivo.id}>
                  <TableCell>{aditivo.tipo}</TableCell>
                  <TableCell>{aditivo.justificativa}</TableCell>
                  <TableCell>{aditivo.valor?.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}</TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm" onClick={() => handleEdit(aditivo)}><Edit className="h-4 w-4" /></Button>
                  </TableCell>
                </TableRow>
              ))}
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
    </Card>
  )
}
