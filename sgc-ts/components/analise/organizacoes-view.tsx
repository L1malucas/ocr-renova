"use client"

import { useState } from "react"
import { OrganizacoesList } from "./organizacoes-list"
import { OrganizacaoForm } from "./organizacao-form"
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle } from "@/components/ui/drawer"
import { OrganizacaoSocialDto } from "@/models/organizacao-social.model"

export function OrganizacoesView() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const [editingOrg, setEditingOrg] = useState<OrganizacaoSocialDto | null>(null)

  const handleCreateNew = () => {
    setEditingOrg(null)
    setIsDrawerOpen(true)
  }

  const handleEdit = (org: OrganizacaoSocialDto) => {
    setEditingOrg(org)
    setIsDrawerOpen(true)
  }

  const handleFormSuccess = () => {
    setIsDrawerOpen(false)
    setEditingOrg(null)
  }

  return (
    <div className="space-y-6">
      <OrganizacoesList onCreateNew={handleCreateNew} onEdit={handleEdit} />

      <Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
        <DrawerContent className="max-h-[90vh]">
          <DrawerHeader>
            <DrawerTitle>
              {editingOrg ? "Editar Organização Social" : "Nova Organização Social"}
            </DrawerTitle>
          </DrawerHeader>
          <div className="overflow-auto p-4">
            <OrganizacaoForm
              orgToEdit={editingOrg}
              onSuccess={handleFormSuccess}
            />
          </div>
        </DrawerContent>
      </Drawer>
    </div>
  )
}
