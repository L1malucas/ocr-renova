"use client"

import { useEffect } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Form } from "@/components/ui/form"
import { useCreateContrato, useUpdateContrato } from "@/hooks/use-contratos"
import { ContratoDto, CriarContratoSchema } from "@/models/contrato.model"
import { useToast } from "@/components/ui/use-toast"
import { generateFormFields } from "@/lib/form-generator"

type FormValues = z.infer<typeof CriarContratoSchema>

interface ContratoFormProps {
  contratoToEdit?: ContratoDto | null
  onSuccess: () => void
}

export function ContratoForm({ contratoToEdit, onSuccess }: ContratoFormProps) {
  const { toast } = useToast()
  const createMutation = useCreateContrato()
  const updateMutation = useUpdateContrato()

  const form = useForm<FormValues>({
    resolver: zodResolver(CriarContratoSchema),
    defaultValues: contratoToEdit || {},
  })

  useEffect(() => {
    if (contratoToEdit) {
      form.reset(contratoToEdit)
    }
  }, [contratoToEdit, form])

  const onSubmit = (values: FormValues) => {
    const mutation = contratoToEdit ? updateMutation : createMutation
    const action = contratoToEdit ? "update" : "create"

    mutation.mutate(
      action === "update"
        ? { id: contratoToEdit!.id, data: values }
        : values,
      {
        onSuccess: () => {
          toast({ title: `Contrato ${action === 'update' ? 'atualizado' : 'criado'} com sucesso!` })
          onSuccess()
          form.reset()
        },
        onError: (error: any) => {
          toast({ title: "Erro ao salvar contrato", description: error.message, variant: "destructive" })
        },
      }
    )
  }

  const isLoading = createMutation.isLoading || updateMutation.isLoading

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {generateFormFields(CriarContratoSchema, form)}
        <div className="flex justify-end gap-4">
          <Button type="button" variant="outline" onClick={onSuccess}>Cancelar</Button>
          <Button type="submit" disabled={isLoading}>{isLoading ? "Salvando..." : "Salvar Contrato"}</Button>
        </div>
      </form>
    </Form>
  )
}
