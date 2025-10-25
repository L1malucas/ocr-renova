"use client"

import { useEffect } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Form } from "@/components/ui/form"
import { useCreateItemPlanoTrabalho, useUpdateItemPlanoTrabalho } from "@/hooks/use-itens-trabalho"
import { ItemPlanoTrabalhoDto, CriarItemPlanoTrabalhoSchema } from "@/models/item-plano-trabalho.model"
import { useToast } from "@/components/ui/use-toast"
import { generateFormFields } from "@/lib/form-generator"

type FormValues = z.infer<typeof CriarItemPlanoTrabalhoSchema>

interface ItemTrabalhoFormProps {
  planoTrabalhoId: string
  itemToEdit?: ItemPlanoTrabalhoDto | null
  onSuccess: () => void
}

export function ItemTrabalhoForm({ planoTrabalhoId, itemToEdit, onSuccess }: ItemTrabalhoFormProps) {
  const { toast } = useToast()
  const createMutation = useCreateItemPlanoTrabalho()
  const updateMutation = useUpdateItemPlanoTrabalho()

  const form = useForm<FormValues>({
    resolver: zodResolver(CriarItemPlanoTrabalhoSchema),
    defaultValues: itemToEdit || { planoTrabalhoId, dataInicio: new Date().toISOString().split("T")[0], dataFim: new Date().toISOString().split("T")[0] },
  })

  useEffect(() => {
    if (itemToEdit) {
      form.reset({
        ...itemToEdit,
        dataInicio: new Date(itemToEdit.dataInicio).toISOString().split("T")[0],
        dataFim: new Date(itemToEdit.dataFim).toISOString().split("T")[0],
      })
    }
  }, [itemToEdit, form])

  const onSubmit = (values: FormValues) => {
    const mutation = itemToEdit ? updateMutation : createMutation
    const action = itemToEdit ? "update" : "create"

    mutation.mutate(
      action === "update"
        ? { itemId: itemToEdit!.id, data: values }
        : { planoTrabalhoId: planoTrabalhoId, data: values },
      {
        onSuccess: () => {
          toast({ title: `Item ${action === 'update' ? 'atualizado' : 'criado'} com sucesso!` })
          onSuccess()
          form.reset()
        },
        onError: (error: any) => {
          toast({ title: "Erro ao salvar item", description: error.message, variant: "destructive" })
        },
      }
    )
  }

  const isLoading = createMutation.isLoading || updateMutation.isLoading

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 p-4">
        {generateFormFields(CriarItemPlanoTrabalhoSchema, form)}
        <div className="flex justify-end gap-4">
          <Button type="button" variant="outline" onClick={onSuccess}>Cancelar</Button>
          <Button type="submit" disabled={isLoading}>{isLoading ? "Salvando..." : "Salvar Item"}</Button>
        </div>
      </form>
    </Form>
  )
}
