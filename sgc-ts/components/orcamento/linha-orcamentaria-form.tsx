"use client"

import { useEffect } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Form } from "@/components/ui/form"
import { useCreateLinhaOrcamentaria, useUpdateLinhaOrcamentaria } from "@/hooks/use-linhas-orcamentarias"
import { LinhaOrcamentariaDto, CriarLinhaOrcamentariaSchema } from "@/models/linha-orcamentaria.model"
import { useToast } from "@/components/ui/use-toast"
import { generateFormFields } from "@/lib/form-generator"

type FormValues = z.infer<typeof CriarLinhaOrcamentariaSchema>

interface LinhaOrcamentariaFormProps {
  orcamentoId: string
  linhaToEdit?: LinhaOrcamentariaDto | null
  onSuccess: () => void
}

export function LinhaOrcamentariaForm({ orcamentoId, linhaToEdit, onSuccess }: LinhaOrcamentariaFormProps) {
  const { toast } = useToast()
  const createMutation = useCreateLinhaOrcamentaria()
  const updateMutation = useUpdateLinhaOrcamentaria()

  const form = useForm<FormValues>({
    resolver: zodResolver(CriarLinhaOrcamentariaSchema),
    defaultValues: linhaToEdit || { orcamentoId, quantidade: 0, valorUnitario: 0 },
  })

  useEffect(() => {
    if (linhaToEdit) {
      form.reset(linhaToEdit)
    }
  }, [linhaToEdit, form])

  const onSubmit = (values: FormValues) => {
    const mutation = linhaToEdit ? updateMutation : createMutation
    const action = linhaToEdit ? "update" : "create"

    const dataToSubmit = { ...values }

    mutation.mutate(
      action === "update"
        ? { linhaId: linhaToEdit!.id, data: dataToSubmit }
        : { orcamentoId: orcamentoId, data: dataToSubmit },
      {
        onSuccess: () => {
          toast({ title: `Linha orçamentária ${action === 'update' ? 'atualizada' : 'criada'} com sucesso!` })
          onSuccess()
          form.reset()
        },
        onError: (error: any) => {
          toast({ title: "Erro ao salvar linha", description: error.message, variant: "destructive" })
        },
      }
    )
  }

  const isLoading = createMutation.isLoading || updateMutation.isLoading

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 p-4">
        {generateFormFields(CriarLinhaOrcamentariaSchema, form)}
        <div className="flex justify-end gap-4">
          <Button type="button" variant="outline" onClick={onSuccess}>Cancelar</Button>
          <Button type="submit" disabled={isLoading}>{isLoading ? "Salvando..." : "Salvar Linha"}</Button>
        </div>
      </form>
    </Form>
  )
}
