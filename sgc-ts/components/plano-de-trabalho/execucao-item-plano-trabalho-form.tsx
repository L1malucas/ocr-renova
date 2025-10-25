"use client"

import { useEffect } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Form } from "@/components/ui/form"
import { useCreateExecucao, useUpdateExecucao } from "@/hooks/use-execucoes-trabalho"
import { ExecucaoItemPlanoTrabalhoDto, CriarExecucaoItemPlanoTrabalhoSchema } from "@/models/execucao-item-plano-trabalho.model"
import { useToast } from "@/components/ui/use-toast"
import { generateFormFields } from "@/lib/form-generator"

type FormValues = z.infer<typeof CriarExecucaoItemPlanoTrabalhoSchema>

interface ExecucaoItemPlanoTrabalhoFormProps {
  itemPlanoTrabalhoId: string
  execucaoToEdit?: ExecucaoItemPlanoTrabalhoDto | null
  onSuccess: () => void
}

export function ExecucaoItemPlanoTrabalhoForm({
  itemPlanoTrabalhoId,
  execucaoToEdit,
  onSuccess,
}: ExecucaoItemPlanoTrabalhoFormProps) {
  const { toast } = useToast()
  const createMutation = useCreateExecucao()
  const updateMutation = useUpdateExecucao()

  const form = useForm<FormValues>({
    resolver: zodResolver(CriarExecucaoItemPlanoTrabalhoSchema),
    defaultValues: execucaoToEdit || { itemPlanoTrabalhoId, dataExecucao: new Date().toISOString().split("T")[0] },
  })

  useEffect(() => {
    if (execucaoToEdit) {
      form.reset({
        ...execucaoToEdit,
        dataExecucao: new Date(execucaoToEdit.dataExecucao).toISOString().split("T")[0],
      })
    }
  }, [execucaoToEdit, form])

  const onSubmit = (values: FormValues) => {
    const mutation = execucaoToEdit ? updateMutation : createMutation
    const action = execucaoToEdit ? "update" : "create"

    const dataToSubmit = {
      ...values,
      dataExecucao: new Date(values.dataExecucao).toISOString(),
    }

    mutation.mutate(
      action === "update"
        ? { execucaoId: execucaoToEdit!.id, data: dataToSubmit }
        : { itemId: itemPlanoTrabalhoId, data: dataToSubmit },
      {
        onSuccess: () => {
          toast({ title: `Execução ${action === 'update' ? 'atualizada' : 'criada'} com sucesso!` })
          onSuccess()
          form.reset()
        },
        onError: (error: any) => {
          toast({ title: "Erro ao salvar execução", description: error.message, variant: "destructive" })
        },
      }
    )
  }

  const isLoading = createMutation.isLoading || updateMutation.isLoading

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 p-4">
        {generateFormFields(CriarExecucaoItemPlanoTrabalhoSchema, form)}
        <div className="flex justify-end gap-4">
          <Button type="button" variant="outline" onClick={onSuccess}>Cancelar</Button>
          <Button type="submit" disabled={isLoading}>{isLoading ? "Salvando..." : "Salvar Execução"}</Button>
        </div>
      </form>
    </Form>
  )
}
