"use client"

import { useEffect } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Form } from "@/components/ui/form"
import { useCreateAditivo, useUpdateAditivo } from "@/hooks/use-aditivos"
import { AditivoDto, CriarAditivoSchema } from "@/models/aditivo.model"
import { useToast } from "@/components/ui/use-toast"
import { generateFormFields } from "@/lib/form-generator"

type FormValues = z.infer<typeof CriarAditivoSchema>

interface AditivoFormProps {
  contratoId: string
  aditivoToEdit?: AditivoDto | null
  onSuccess: () => void
}

export function AditivoForm({ contratoId, aditivoToEdit, onSuccess }: AditivoFormProps) {
  const { toast } = useToast()
  const createMutation = useCreateAditivo()
  const updateMutation = useUpdateAditivo()

  const form = useForm<FormValues>({
    resolver: zodResolver(CriarAditivoSchema),
    defaultValues: {
      ...aditivoToEdit,
      contratoId,
    },
  })

  useEffect(() => {
    if (aditivoToEdit) {
      form.reset({
        ...aditivoToEdit,
        contratoId,
      })
    }
  }, [aditivoToEdit, form, contratoId])

  const onSubmit = (values: FormValues) => {
    const mutation = aditivoToEdit ? updateMutation : createMutation
    const action = aditivoToEdit ? "update" : "create"

    mutation.mutate(
      action === "update"
        ? { id: aditivoToEdit!.id, data: values }
        : values,
      {
        onSuccess: () => {
          toast({ title: `Aditivo ${action === 'update' ? 'atualizado' : 'criado'} com sucesso!` })
          onSuccess()
          form.reset()
        },
        onError: (error: any) => {
          toast({ title: "Erro ao salvar aditivo", description: error.message, variant: "destructive" })
        },
      }
    )
  }

  const isLoading = createMutation.isLoading || updateMutation.isLoading

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 p-4">
        {generateFormFields(CriarAditivoSchema, form)}
        <div className="flex justify-end gap-4">
          <Button type="button" variant="outline" onClick={onSuccess}>Cancelar</Button>
          <Button type="submit" disabled={isLoading}>{isLoading ? "Salvando..." : "Salvar Aditivo"}</Button>
        </div>
      </form>
    </Form>
  )
}
