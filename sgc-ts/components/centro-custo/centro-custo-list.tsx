"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Plus, Edit } from "lucide-react"
import { useGetCentrosCusto } from "@/hooks/use-centro-custo"
import { CentroCustoDto } from "@/models/centro-custo.model"

interface CentroCustoListProps {
  onCreateNew: () => void
  onEdit: (centroCusto: CentroCustoDto) => void
}

export function CentroCustoList({ onCreateNew, onEdit }: CentroCustoListProps) {
  const [page, setPage] = useState(1)

  const { data, isLoading, isError, error } = useGetCentrosCusto({ pageNumber: page, pageSize: 10 })

  const centrosCusto = data?.data ?? []
  const meta = data?.meta

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Centros de Custo</h2>
        <Button onClick={onCreateNew} className="gap-2">
          <Plus className="h-4 w-4" />
          Novo Centro de Custo
        </Button>
      </div>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nome</TableHead>
                <TableHead>Código</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading && (
                <TableRow><TableCell colSpan={3} className="text-center py-8">Carregando...</TableCell></TableRow>
              )}
              {isError && (
                <TableRow><TableCell colSpan={3} className="text-center py-8 text-red-600">Erro: {error.message}</TableCell></TableRow>
              )}
              {centrosCusto.map((centro) => (
                <TableRow key={centro.id}>
                  <TableCell className="font-medium">{centro.nome}</TableCell>
                  <TableCell>{centro.codigo}</TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm" onClick={() => onEdit(centro)}><Edit className="h-4 w-4" /></Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {meta && (
        <div className="flex justify-end items-center gap-4">
          <span className="text-sm text-muted-foreground">Página {meta.currentPage} de {meta.totalPages}</span>
          <Button onClick={() => setPage(p => p - 1)} disabled={!meta.hasPreviousPage}>Anterior</Button>
          <Button onClick={() => setPage(p => p + 1)} disabled={!meta.hasNextPage}>Próxima</Button>
        </div>
      )}
    </div>
  )
}
