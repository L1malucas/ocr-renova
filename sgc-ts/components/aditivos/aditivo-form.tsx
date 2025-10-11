"use client"

import { useEffect } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { useCreateAditivo, useUpdateAditivo } from "@/hooks/use-aditivos"
import { AditivoDto } from "@/models/aditivo.model"
import { useToast } from "@/components/ui/use-toast"

const formSchema = z.object({
  tipo: z.string().min(1, "O tipo é obrigatório."),
  valor: z.number().optional(),
  dataInicio: z.string().optional(),
  dataFim: z.string().optional(),
  justificativa: z.string().min(3, "A justificativa é obrigatória."),
})

type FormValues = z.infer<typeof formSchema>

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
    resolver: zodResolver(formSchema),
    defaultValues: { tipo: "", justificativa: "" },
  })

  useEffect(() => {
    if (aditivoToEdit) {
      form.reset({
        ...aditivoToEdit,
        dataInicio: aditivoToEdit.dataInicio ? new Date(aditivoToEdit.dataInicio).toISOString().split("T")[0] : undefined,
        dataFim: aditivoToEdit.dataFim ? new Date(aditivoToEdit.dataFim).toISOString().split("T")[0] : undefined,
      })
    }
  }, [aditivoToEdit, form])

  const onSubmit = (values: FormValues) => {
    const mutation = aditivoToEdit ? updateMutation : createMutation
    const action = aditivoToEdit ? "update" : "create"

    const dataToSubmit = {
      ...values,
      contratoId: contratoId,
      dataInicio: values.dataInicio ? new Date(values.dataInicio).toISOString() : undefined,
      dataFim: values.dataFim ? new Date(values.dataFim).toISOString() : undefined,
    }

    mutation.mutate(
      action === "update"
        ? { id: aditivoToEdit!.id, data: dataToSubmit }
        : dataToSubmit,
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
        {/* Campos do formulário aqui */}
        <FormField control={form.control} name="tipo" render={({ field }) => <FormItem>...</FormItem>} />
        {/* ... outros campos ... */}
        <Button type="submit" disabled={isLoading}>{isLoading ? "Salvando..." : "Salvar Aditivo"}</Button>
      </form>
    </Form>
  )
}
