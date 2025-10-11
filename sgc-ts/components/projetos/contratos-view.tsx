"use client"

import { useState } from "react"
import { ContratosList } from "./contratos-list"
import { ContratoForm } from "./contrato-form"
import { ContratoDetailView } from "./contrato-detail-view"
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle } from "@/components/ui/drawer"
import { ContratoDto } from "@/models/contrato.model"

export function ContratosView() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const [editingContrato, setEditingContrato] = useState<ContratoDto | null>(null)
  const [viewingContratoId, setViewingContratoId] = useState<string | null>(null)

  const handleCreateNew = () => {
    setEditingContrato(null)
    setIsDrawerOpen(true)
  }

  const handleEdit = (contrato: ContratoDto) => {
    setEditingContrato(contrato)
    setIsDrawerOpen(true)
  }

  const handleViewDetails = (contrato: ContratoDto) => {
    setViewingContratoId(contrato.id)
  }

  const handleBackToList = () => {
    setViewingContratoId(null)
  }

  const handleFormSuccess = () => {
    setIsDrawerOpen(false)
    setEditingContrato(null)
    // Se estava editando e voltou para a lista, ou se criou um novo
    if (viewingContratoId) {
      // Se estava na tela de detalhes, recarrega os detalhes
      setViewingContratoId(viewingContratoId) // Força re-render/refetch
    }
  }

  if (viewingContratoId) {
    return (
      <ContratoDetailView
        contratoId={viewingContratoId}
        onBack={handleBackToList}
        onEdit={(contrato) => {
          setEditingContrato(contrato)
          setIsDrawerOpen(true)
        }}
      />
    )
  }

  return (
    <div className="space-y-6">
      <ContratosList onCreateNew={handleCreateNew} onEdit={handleEdit} onViewDetails={handleViewDetails} />

      <Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
        <DrawerContent className="max-h-[90vh]">
          <DrawerHeader>
            <DrawerTitle>
              {editingContrato ? "Editar Contrato" : "Criar Novo Contrato"}
            </DrawerTitle>
          </DrawerHeader>
          <div className="overflow-auto p-4">
            <ContratoForm
              contratoToEdit={editingContrato}
              onSuccess={handleFormSuccess}
            />
          </div>
        </DrawerContent>
      </Drawer>
    </div>
  )
}
