"use client"

import { useState } from "react"
import { CentroCustoList } from "./centro-custo-list"
import { CentroCustoForm } from "./centro-custo-form"
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle } from "@/components/ui/drawer"
import { CentroCustoDto } from "@/models/centro-custo.model"

export function CentroCustoManager() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const [editingCentroCusto, setEditingCentroCusto] = useState<CentroCustoDto | null>(null)

  const handleCreateNew = () => {
    setEditingCentroCusto(null)
    setIsDrawerOpen(true)
  }

  const handleEdit = (centroCusto: CentroCustoDto) => {
    setEditingCentroCusto(centroCusto)
    setIsDrawerOpen(true)
  }

  const handleFormSuccess = () => {
    setIsDrawerOpen(false)
    setEditingCentroCusto(null)
  }

  return (
    <div className="space-y-6">
      <CentroCustoList onCreateNew={handleCreateNew} onEdit={handleEdit} />

      <Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
        <DrawerContent className="max-h-[90vh]">
          <DrawerHeader>
            <DrawerTitle>
              {editingCentroCusto ? "Editar Centro de Custo" : "Criar Novo Centro de Custo"}
            </DrawerTitle>
          </DrawerHeader>
          <div className="overflow-auto p-4">
            <CentroCustoForm
              centroCustoToEdit={editingCentroCusto}
              onSuccess={handleFormSuccess}
            />
          </div>
        </DrawerContent>
      </Drawer>
    </div>
  )
}
