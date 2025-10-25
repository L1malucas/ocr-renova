"use client"

import { useEffect } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Form } from "@/components/ui/form"
import { useCreateCentroCusto, useUpdateCentroCusto } from "@/hooks/use-centro-custo"
import { CentroCustoDto, CriarCentroCustoSchema } from "@/models/centro-custo.model"
import { useToast } from "@/components/ui/use-toast"
import { generateFormFields } from "@/lib/form-generator"

type FormValues = z.infer<typeof CriarCentroCustoSchema>

interface CentroCustoFormProps {
  centroCustoToEdit?: CentroCustoDto | null
  onSuccess: () => void
}

export function CentroCustoForm({ centroCustoToEdit, onSuccess }: CentroCustoFormProps) {
  const { toast } = useToast()
  const createMutation = useCreateCentroCusto()
  const updateMutation = useUpdateCentroCusto()

  const form = useForm<FormValues>({
    resolver: zodResolver(CriarCentroCustoSchema),
    defaultValues: centroCustoToEdit || {},
  })

  useEffect(() => {
    if (centroCustoToEdit) {
      form.reset(centroCustoToEdit)
    }
  }, [centroCustoToEdit, form])

  const onSubmit = (values: FormValues) => {
    const mutation = centroCustoToEdit ? updateMutation : createMutation
    const action = centroCustoToEdit ? "update" : "create"

    mutation.mutate(
      action === "update"
        ? { id: centroCustoToEdit!.id, data: values }
        : values,
      {
        onSuccess: () => {
          toast({ title: `Centro de Custo ${action === 'update' ? 'atualizado' : 'criado'} com sucesso!` })
          onSuccess()
          form.reset()
        },
        onError: (error: any) => {
          toast({ title: "Erro ao salvar Centro de Custo", description: error.message, variant: "destructive" })
        },
      }
    )
  }

  const isLoading = createMutation.isLoading || updateMutation.isLoading

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 p-4">
        {generateFormFields(CriarCentroCustoSchema, form)}
        <div className="flex justify-end gap-4">
          <Button type="button" variant="outline" onClick={onSuccess}>Cancelar</Button>
          <Button type="submit" disabled={isLoading}>{isLoading ? "Salvando..." : "Salvar"}</Button>
        </div>
      </form>
    </Form>
  )
}
