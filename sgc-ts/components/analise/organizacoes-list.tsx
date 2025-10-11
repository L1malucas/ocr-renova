"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Plus, Edit, Trash2 } from "lucide-react"
import { useGetOrganizacoesSociais, useDeleteOrganizacaoSocial } from "@/hooks/use-organizacoes-sociais"
import { OrganizacaoSocialDto } from "@/models/organizacao-social.model"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog"

interface OrganizacoesListProps {
  onCreateNew: () => void
  onEdit: (org: OrganizacaoSocialDto) => void
}

export function OrganizacoesList({ onCreateNew, onEdit }: OrganizacoesListProps) {
  const [page, setPage] = useState(1)
  const [deletingId, setDeletingId] = useState<string | null>(null)

  const { data, isLoading, isError } = useGetOrganizacoesSociais({ pageNumber: page, pageSize: 10 })
  const deleteMutation = useDeleteOrganizacaoSocial()

  const organizacoes = data?.data ?? []
  const meta = data?.meta

  const handleDelete = () => {
    if (deletingId) {
      deleteMutation.mutate(deletingId, { onSuccess: () => setDeletingId(null) })
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Organizações Sociais</h2>
        <Button onClick={onCreateNew} className="gap-2">
          <Plus className="h-4 w-4" />
          Nova Organização
        </Button>
      </div>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nome</TableHead>
                <TableHead>CNPJ</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading && <TableRow><TableCell colSpan={3} className="text-center py-8">Carregando...</TableCell></TableRow>}
              {isError && <TableRow><TableCell colSpan={3} className="text-center py-8 text-red-500">Erro ao carregar dados.</TableCell></TableRow>}
              {organizacoes.map((org) => (
                <TableRow key={org.id}>
                  <TableCell>{org.nome}</TableCell>
                  <TableCell>{org.cnpj}</TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm" onClick={() => onEdit(org)}><Edit className="h-4 w-4" /></Button>
                    <Button variant="ghost" size="sm" onClick={() => setDeletingId(org.id)} disabled={deleteMutation.isLoading}><Trash2 className="h-4 w-4" /></Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Paginação e Dialogo de Exclusão aqui */}
    </div>
  )
}
