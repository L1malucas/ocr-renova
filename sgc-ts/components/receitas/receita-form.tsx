"use client"

import { useEffect } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Form } from "@/components/ui/form"
import { useCreateReceita, useUpdateReceita } from "@/hooks/use-receitas"
import { ReceitaDto, CriarReceitaSchema } from "@/models/receita.model"
import { useToast } from "@/components/ui/use-toast"
import { generateFormFields } from "@/lib/form-generator"

type FormValues = z.infer<typeof CriarReceitaSchema>

interface ReceitaFormProps {
  receitaToEdit?: ReceitaDto | null
  onSuccess: () => void
}

export function ReceitaForm({ receitaToEdit, onSuccess }: ReceitaFormProps) {
  const { toast } = useToast()
  const createMutation = useCreateReceita()
  const updateMutation = useUpdateReceita()

  const form = useForm<FormValues>({
    resolver: zodResolver(CriarReceitaSchema),
    defaultValues: {
      descricao: "",
      valor: 0,
      dataRecebimento: new Date().toISOString().split("T")[0],
      categoriaId: "",
      observacoes: "",
      repasseId: "",
      centroCustoId: "",
    },
  })

  useEffect(() => {
    if (receitaToEdit) {
      form.reset({
        ...receitaToEdit,
        dataRecebimento: new Date(receitaToEdit.dataRecebimento)
          .toISOString()
          .split("T")[0],
      })
    } else {
      form.reset({
        descricao: "",
        valor: 0,
        dataRecebimento: new Date().toISOString().split("T")[0],
        categoriaId: "",
        observacoes: "",
        repasseId: "",
        centroCustoId: "",
      })
    }
  }, [receitaToEdit, form])

  const onSubmit = (values: FormValues) => {
    const mutation = receitaToEdit ? updateMutation : createMutation
    const action = receitaToEdit ? "update" : "create"

    const dataToSubmit = {
      ...values,
      valor: Number(values.valor),
      dataRecebimento: new Date(values.dataRecebimento).toISOString(),
    }

    mutation.mutate(
      action === "update"
        ? { id: receitaToEdit!.id, data: dataToSubmit }
        : dataToSubmit,
      {
        onSuccess: () => {
          toast({
            title: `Receita ${
              action === "update" ? "atualizada" : "criada"
            } com sucesso!`,
          })
          onSuccess()
          form.reset()
        },
        onError: (error: any) => {
          toast({
            title: "Erro ao salvar receita",
            description: error.message,
            variant: "destructive",
          })
        },
      },
    )
  }

  const isLoading = createMutation.isLoading || updateMutation.isLoading

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 p-4">
        {generateFormFields(CriarReceitaSchema, form)}
        <div className="flex justify-end gap-4">
          <Button type="button" variant="outline" onClick={onSuccess}>
            Cancelar
          </Button>          
          <Button type="submit" disabled={isLoading}>
            {isLoading ? "Salvando..." : "Salvar"}
          </Button>
        </div>
      </form>
    </Form>
  )
}