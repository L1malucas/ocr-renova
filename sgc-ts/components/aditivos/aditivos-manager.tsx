"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { PlusCircle } from "lucide-react"

// Este componente será usado dentro da página de detalhes de um contrato.
export function AditivosManager({ contratoId }: { contratoId: string }) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Aditivos do Contrato</CardTitle>
          <CardDescription>Gerencie os aditivos de prazo e valor do contrato.</CardDescription>
        </div>
        <Button size="sm">
          <PlusCircle className="mr-2 h-4 w-4" />
          Novo Aditivo
        </Button>
      </CardHeader>
      <CardContent>
        <p>A lista de aditivos para o contrato {contratoId} aparecerá aqui.</p>
        {/* DataTable para listar, editar e excluir aditivos */}
      </CardContent>
    </Card>
  )
}
