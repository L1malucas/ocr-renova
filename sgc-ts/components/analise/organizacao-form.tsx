"use client"

import { useEffect } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { useCreateOrganizacaoSocial, useUpdateOrganizacaoSocial } from "@/hooks/use-organizacoes-sociais"
import { OrganizacaoSocialDto } from "@/models/organizacao-social.model"
import { useToast } from "@/components/ui/use-toast"

const formSchema = z.object({
  nome: z.string().min(3, "O nome é obrigatório."),
  cnpj: z.string().length(14, "O CNPJ deve ter 14 dígitos."),
})

type FormValues = z.infer<typeof formSchema>

interface OrganizacaoFormProps {
  orgToEdit?: OrganizacaoSocialDto | null
  onSuccess: () => void
}

export function OrganizacaoForm({ orgToEdit, onSuccess }: OrganizacaoFormProps) {
  const { toast } = useToast()
  const createMutation = useCreateOrganizacaoSocial()
  const updateMutation = useUpdateOrganizacaoSocial()

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: { nome: "", cnpj: "" },
  })

  useEffect(() => {
    if (orgToEdit) {
      form.reset(orgToEdit)
    }
  }, [orgToEdit, form])

  const onSubmit = (values: FormValues) => {
    const mutation = orgToEdit ? updateMutation : createMutation
    const action = orgToEdit ? "update" : "create"

    mutation.mutate(
      action === "update" ? { id: orgToEdit!.id, data: values } : values,
      {
        onSuccess: () => {
          toast({ title: `Organização ${action === 'update' ? 'atualizada' : 'criada'} com sucesso!` })
          onSuccess()
          form.reset()
        },
        onError: (error: any) => {
          toast({ title: "Erro ao salvar", description: error.message, variant: "destructive" })
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
            <FormLabel>Nome da Organização</FormLabel>
            <FormControl><Input {...field} /></FormControl>
            <FormMessage />
          </FormItem>
        )} />
        <FormField control={form.control} name="cnpj" render={({ field }) => (
          <FormItem>
            <FormLabel>CNPJ</FormLabel>
            <FormControl><Input {...field} /></FormControl>
            <FormMessage />
          </FormItem>
        )} />
        <div className="flex justify-end gap-4">
          <Button type="button" variant="outline" onClick={onSuccess}>Cancelar</Button>
          <Button type="submit" disabled={isLoading}>{isLoading ? "Salvando..." : "Salvar"}</Button>
        </div>
      </form>
    </Form>
  )
}
