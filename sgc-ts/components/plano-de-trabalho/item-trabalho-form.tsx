"use client"

import { useEffect } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { useCreateItemPlanoTrabalho, useUpdateItemPlanoTrabalho } from "@/hooks/use-itens-trabalho"
import { ItemPlanoTrabalhoDto } from "@/models/item-plano-trabalho.model"
import { useToast } from "@/components/ui/use-toast"

const formSchema = z.object({
  meta: z.string().min(3, "A meta é obrigatória."),
  indicador: z.string().min(3, "O indicador é obrigatório."),
  responsavel: z.string().min(3, "O responsável é obrigatório."),
})

type FormValues = z.infer<typeof formSchema>

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
    resolver: zodResolver(formSchema),
    defaultValues: { meta: "", indicador: "", responsavel: "" },
  })

  useEffect(() => {
    if (itemToEdit) {
      form.reset(itemToEdit)
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
        <FormField control={form.control} name="meta" render={({ field }) => (
          <FormItem>
            <FormLabel>Meta</FormLabel>
            <FormControl><Textarea placeholder="Descrição da meta" {...field} /></FormControl>
            <FormMessage />
          </FormItem>
        )} />
        <FormField control={form.control} name="indicador" render={({ field }) => (
          <FormItem>
            <FormLabel>Indicador</FormLabel>
            <FormControl><Input placeholder="Ex: Relatório final entregue" {...field} /></FormControl>
            <FormMessage />
          </FormItem>
        )} />
        <FormField control={form.control} name="responsavel" render={({ field }) => (
          <FormItem>
            <FormLabel>Responsável</FormLabel>
            <FormControl><Input placeholder="Nome do responsável" {...field} /></FormControl>
            <FormMessage />
          </FormItem>
        )} />
        <div className="flex justify-end gap-4">
          <Button type="button" variant="outline" onClick={onSuccess}>Cancelar</Button>
          <Button type="submit" disabled={isLoading}>{isLoading ? "Salvando..." : "Salvar Item"}</Button>
        </div>
      </form>
    </Form>
  )
}
