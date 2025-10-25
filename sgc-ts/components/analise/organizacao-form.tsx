"use client"

import { useEffect } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Form } from "@/components/ui/form"
import { useCreateOrganizacaoSocial, useUpdateOrganizacaoSocial } from "@/hooks/use-organizacoes-sociais"
import { OrganizacaoSocialDto, CriarOrganizacaoSocialSchema } from "@/models/organizacao-social.model"
import { useToast } from "@/components/ui/use-toast"
import { generateFormFields } from "@/lib/form-generator"

type FormValues = z.infer<typeof CriarOrganizacaoSocialSchema>

interface OrganizacaoFormProps {
  orgToEdit?: OrganizacaoSocialDto | null
  onSuccess: () => void
}

export function OrganizacaoForm({ orgToEdit, onSuccess }: OrganizacaoFormProps) {
  const { toast } = useToast()
  const createMutation = useCreateOrganizacaoSocial()
  const updateMutation = useUpdateOrganizacaoSocial()

  const form = useForm<FormValues>({
    resolver: zodResolver(CriarOrganizacaoSocialSchema),
    defaultValues: orgToEdit || {},
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
        {generateFormFields(CriarOrganizacaoSocialSchema, form)}
        <div className="flex justify-end gap-4">
          <Button type="button" variant="outline" onClick={onSuccess}>Cancelar</Button>
          <Button type="submit" disabled={isLoading}>{isLoading ? "Salvando..." : "Salvar"}</Button>
        </div>
      </form>
    </Form>
  )
}
