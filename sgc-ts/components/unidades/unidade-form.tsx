"use client"

import { useEffect } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Form } from "@/components/ui/form"
import { useCreateUnidade, useUpdateUnidade } from "@/hooks/use-unidades"
import { UnidadeDto, CriarUnidadeSchema } from "@/models/unidade.model"
import { useToast } from "@/components/ui/use-toast"
import { generateFormFields } from "@/lib/form-generator"

type FormValues = z.infer<typeof CriarUnidadeSchema>

interface UnidadeFormProps {
  unidadeToEdit?: UnidadeDto | null
  onSuccess: () => void
}

export function UnidadeForm({ unidadeToEdit, onSuccess }: UnidadeFormProps) {
  const { toast } = useToast()
  const createMutation = useCreateUnidade()
  const updateMutation = useUpdateUnidade()

  const form = useForm<FormValues>({
    resolver: zodResolver(CriarUnidadeSchema),
    defaultValues: unidadeToEdit || {},
  })

  useEffect(() => {
    if (unidadeToEdit) {
      form.reset(unidadeToEdit)
    }
  }, [unidadeToEdit, form])

  const onSubmit = (values: FormValues) => {
    const mutation = unidadeToEdit ? updateMutation : createMutation
    const action = unidadeToEdit ? "update" : "create"

    mutation.mutate(
      action === "update"
        ? { id: unidadeToEdit!.id, data: values }
        : values,
      {
        onSuccess: () => {
          toast({ title: `Unidade ${action === 'update' ? 'atualizada' : 'criada'} com sucesso!` })
          onSuccess()
          form.reset()
        },
        onError: (error: any) => {
          toast({ title: "Erro ao salvar unidade", description: error.message, variant: "destructive" })
        },
      }
    )
  }

  const isLoading = createMutation.isLoading || updateMutation.isLoading

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 p-4">
        {generateFormFields(CriarUnidadeSchema, form)}
        <div className="flex justify-end gap-4">
          <Button type="button" variant="outline" onClick={onSuccess}>Cancelar</Button>
          <Button type="submit" disabled={isLoading}>{isLoading ? "Salvando..." : "Salvar"}</Button>
        </div>
      </form>
    </Form>
  )
}
