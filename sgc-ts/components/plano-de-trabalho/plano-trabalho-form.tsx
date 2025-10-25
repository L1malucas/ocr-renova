"use client"

import { useEffect } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Form } from "@/components/ui/form"
import { useCreatePlanoDeTrabalho, useUpdatePlanoDeTrabalho } from "@/hooks/use-plano-de-trabalho"
import { PlanoTrabalhoDto, CriarPlanoTrabalhoSchema } from "@/models/plano-trabalho.model"
import { useToast } from "@/components/ui/use-toast"
import { generateFormFields } from "@/lib/form-generator"

type FormValues = z.infer<typeof CriarPlanoTrabalhoSchema>

interface PlanoTrabalhoFormProps {
  planoTrabalhoToEdit?: PlanoTrabalhoDto | null
  onSuccess: () => void
}

export function PlanoTrabalhoForm({ planoTrabalhoToEdit, onSuccess }: PlanoTrabalhoFormProps) {
  const { toast } = useToast()
  const createMutation = useCreatePlanoDeTrabalho()
  const updateMutation = useUpdatePlanoDeTrabalho()

  const form = useForm<FormValues>({
    resolver: zodResolver(CriarPlanoTrabalhoSchema),
    defaultValues: planoTrabalhoToEdit || {},
  })

  useEffect(() => {
    if (planoTrabalhoToEdit) {
      form.reset(planoTrabalhoToEdit)
    }
  }, [planoTrabalhoToEdit, form])

  const onSubmit = (values: FormValues) => {
    const mutation = planoTrabalhoToEdit ? updateMutation : createMutation
    const action = planoTrabalhoToEdit ? "update" : "create"

    mutation.mutate(
      action === "update"
        ? { id: planoTrabalhoToEdit!.id, data: values }
        : values,
      {
        onSuccess: () => {
          toast({ title: `Plano de Trabalho ${action === 'update' ? 'atualizado' : 'criado'} com sucesso!` })
          onSuccess()
          form.reset()
        },
        onError: (error: any) => {
          toast({ title: "Erro ao salvar plano de trabalho", description: error.message, variant: "destructive" })
        },
      }
    )
  }

  const isLoading = createMutation.isLoading || updateMutation.isLoading

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 p-4">
        {generateFormFields(CriarPlanoTrabalhoSchema, form)}
        <div className="flex justify-end gap-4">
          <Button type="button" variant="outline" onClick={onSuccess}>Cancelar</Button>
          <Button type="submit" disabled={isLoading}>{isLoading ? "Salvando..." : "Salvar Plano de Trabalho"}</Button>
        </div>
      </form>
    </Form>
  )
}
