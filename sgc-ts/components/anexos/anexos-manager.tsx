"use client"

import { useState } from "react"
import { useGetAnexosByRecurso, useCreateAnexo, useDeleteAnexo, useDownloadAnexo } from "@/hooks/use-anexos"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableHeader } from "@/components/ui/table"
import { useToast } from "@/components/ui/use-toast"
import { AnexoListSchema, CriarAnexoSchema } from "@/models/anexo.model"
import { generateTableColumns, generateTableCells } from "@/lib/table-generator"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form } from "@/components/ui/form"
import { generateFormFields } from "@/lib/form-generator"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog"

interface AnexosManagerProps {
  recurso: string
  recursoId: string
}

export function AnexosManager({ recurso, recursoId }: AnexosManagerProps) {
  const { toast } = useToast()
  const [deletingId, setDeletingId] = useState<string | null>(null)

  const { data, isLoading, isError } = useGetAnexosByRecurso(recurso, recursoId, { pageNumber: 1, pageSize: 100 })
  const createAnexoMutation = useCreateAnexo()
  const deleteAnexoMutation = useDeleteAnexo()
  const downloadAnexo = useDownloadAnexo()

  const anexos = data?.data ?? []

  const form = useForm({
    resolver: zodResolver(CriarAnexoSchema),
    defaultValues: {
      tipoProprietario: recurso,
      proprietarioId: recursoId,
      descricao: "",
      arquivo: null,
    },
  })

  const handleUpload = (values: any) => {
    createAnexoMutation.mutate(values,
      {
        onSuccess: () => {
          toast({ title: "Upload realizado com sucesso!" })
          form.reset()
        },
        onError: (error: any) => {
          toast({ title: "Erro no upload", description: error.message, variant: "destructive" })
        },
      }
    )
  }

  const handleDelete = () => {
    if (deletingId) {
      deleteAnexoMutation.mutate(deletingId, { onSuccess: () => setDeletingId(null) })
    }
  }

  return (
    <div className="space-y-6 p-4">
      <Card>
        <CardHeader>
          <CardTitle>Upload de Arquivo</CardTitle>
          <CardDescription>Selecione um arquivo para anexar a este item.</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleUpload)} className="space-y-4">
              {generateFormFields(CriarAnexoSchema, form)}
              <Button type="submit" disabled={createAnexoMutation.isLoading}>
                {createAnexoMutation.isLoading ? "Enviando..." : "Enviar"}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Arquivos Anexados</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading && <p>Carregando anexos...</p>}
          {isError && <p className="text-red-500">Erro ao carregar anexos.</p>}
          <Table>
            <TableHeader>{generateTableColumns(AnexoListSchema)}</TableHeader>
            <TableBody>
              {generateTableCells(AnexoListSchema, anexos, () => {}, (id) => setDeletingId(id))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <AlertDialog open={!!deletingId} onOpenChange={() => setDeletingId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirmar Exclusão</AlertDialogTitle>
            <AlertDialogDescription>Tem certeza que deseja excluir este anexo?</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} disabled={deleteAnexoMutation.isLoading}>
              {deleteAnexoMutation.isLoading ? "Excluindo..." : "Excluir"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}

