"use client"

import { useState } from "react"
import { FornecedoresList } from "./fornecedores-list"
import { FornecedorForm } from "./fornecedor-form"
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle } from "@/components/ui/drawer"
import { FornecedorDto } from "@/models/fornecedor.model"

export function FornecedoresView() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const [editingFornecedor, setEditingFornecedor] = useState<FornecedorDto | null>(null)

  const handleCreateNew = () => {
    setEditingFornecedor(null)
    setIsDrawerOpen(true)
  }

  const handleEdit = (fornecedor: FornecedorDto) => {
    setEditingFornecedor(fornecedor)
    setIsDrawerOpen(true)
  }

  const handleFormSuccess = () => {
    setIsDrawerOpen(false)
    setEditingFornecedor(null)
  }

  return (
    <div className="space-y-6">
      <FornecedoresList onCreateNew={handleCreateNew} onEdit={handleEdit} />

      <Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
        <DrawerContent className="max-h-[90vh]">
          <DrawerHeader>
            <DrawerTitle>
              {editingFornecedor ? "Editar Fornecedor" : "Criar Novo Fornecedor"}
            </DrawerTitle>
          </DrawerHeader>
          <div className="overflow-auto p-4">
            <FornecedorForm
              fornecedorToEdit={editingFornecedor}
              onSuccess={handleFormSuccess}
            />
          </div>
        </DrawerContent>
      </Drawer>
    </div>
  )
}
