"use client"

import { useEffect } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { useCreateLinhaOrcamentaria, useUpdateLinhaOrcamentaria } from "@/hooks/use-linhas-orcamentarias"
import { LinhaOrcamentariaDto } from "@/models/linha-orcamentaria.model"
import { useToast } from "@/components/ui/use-toast"

const formSchema = z.object({
  nome: z.string().min(3, "O nome é obrigatório."),
  valor: z.number().positive("O valor deve ser positivo."),
  // Adicionar outros campos do DTO aqui
})

type FormValues = z.infer<typeof formSchema>

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
    resolver: zodResolver(formSchema),
    defaultValues: { nome: "", valor: 0 },
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
        <FormField control={form.control} name="nome" render={({ field }) => (
          <FormItem>
            <FormLabel>Nome da Linha</FormLabel>
            <FormControl><Input placeholder="Ex: Recursos Humanos" {...field} /></FormControl>
            <FormMessage />
          </FormItem>
        )} />
        <FormField control={form.control} name="valor" render={({ field }) => (
          <FormItem>
            <FormLabel>Valor Orçado</FormLabel>
            <FormControl><Input type="number" step="0.01" {...field} onChange={e => field.onChange(e.target.valueAsNumber)} /></FormControl>
            <FormMessage />
          </FormItem>
        )} />
        <div className="flex justify-end gap-4">
          <Button type="button" variant="outline" onClick={onSuccess}>Cancelar</Button>
          <Button type="submit" disabled={isLoading}>{isLoading ? "Salvando..." : "Salvar Linha"}</Button>
        </div>
      </form>
    </Form>
  )
}
