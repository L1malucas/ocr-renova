"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { PlusCircle } from "lucide-react"

// Placeholder para a lista de unidades
function UnidadesList() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Unidades Cadastradas</CardTitle>
      </CardHeader>
      <CardContent>
        <p>A tabela de dados com as unidades aparecerá aqui.</p>
        {/* DataTable para listar, editar e excluir unidades */}
      </CardContent>
    </Card>
  )
}

export function UnidadesView() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Gerenciar Unidades</h1>
          <p className="text-muted-foreground">Administre as unidades das organizações sociais.</p>
        </div>
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" />
          Nova Unidade
        </Button>
      </div>

      <UnidadesList />
    </div>
  )
}
