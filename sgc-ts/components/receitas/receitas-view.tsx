"use client"

import { useState } from "react"
import { ReceitasList } from "./receitas-list"
import { ReceitaForm } from "./receita-form"

export function ReceitasView() {
  const [currentView, setCurrentView] = useState<"list" | "form">("list")

  const handleCreateNew = () => {
    setCurrentView("form")
  }

  const handleFormCancel = () => {
    setCurrentView("list")
  }

  const handleFormSuccess = () => {
    setCurrentView("list")
  }

  if (currentView === "form") {
    return <ReceitaForm onCancel={handleFormCancel} onSuccess={handleFormSuccess} />
  }

  return <ReceitasList onCreateNew={handleCreateNew} />
}
