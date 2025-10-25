"use client"

import { useEffect } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { useCreateFornecedor, useUpdateFornecedor } from "@/hooks/use-fornecedores"
import { FornecedorDto } from "@/models/fornecedor.model"
import { useToast } from "@/components/ui/use-toast"
import { FileUpload } from "@/components/ui/file-upload"

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ALLOWED_FILE_TYPES = [
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "application/vnd.ms-excel",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  "application/pdf",
];

const formSchema = z.object({
  nome: z.string().min(3, "O nome é obrigatório."),
  documento: z.string().min(11, "O documento (CNPJ/CPF) é obrigatório."),
  contato: z.string().optional(),
  attachment: z.any()
    .refine((file) => file, "O anexo é obrigatório.")
    .refine((file) => file?.size <= MAX_FILE_SIZE, `O tamanho máximo do arquivo é 5MB.`)
    .refine(
      (file) => ALLOWED_FILE_TYPES.includes(file?.type),
      "Tipos de arquivo permitidos: .doc, .docx, .xls, .xlsx, .pdf"
    ),
});

type FormValues = z.infer<typeof formSchema>

interface FornecedorFormProps {
  fornecedorToEdit?: FornecedorDto | null
  onSuccess: () => void
}

export function FornecedorForm({ fornecedorToEdit, onSuccess }: FornecedorFormProps) {
  const { toast } = useToast()
  const createMutation = useCreateFornecedor()
  const updateMutation = useUpdateFornecedor()

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: { nome: "", documento: "", contato: "" },
  })

  useEffect(() => {
    if (fornecedorToEdit) {
      form.reset(fornecedorToEdit)
    }
  }, [fornecedorToEdit, form])

  const onSubmit = (values: FormValues) => {
    const mutation = fornecedorToEdit ? updateMutation : createMutation
    const action = fornecedorToEdit ? "update" : "create"

    mutation.mutate(
      action === "update"
        ? { id: fornecedorToEdit!.id, data: values }
        : values,
      {
        onSuccess: () => {
          toast({ title: `Fornecedor ${action === 'update' ? 'atualizado' : 'criado'} com sucesso!` })
          onSuccess()
          form.reset()
        },
        onError: (error: any) => {
          toast({ title: "Erro ao salvar fornecedor", description: error.message, variant: "destructive" })
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
            <FormLabel>Nome / Razão Social</FormLabel>
            <FormControl><Input placeholder="Nome do fornecedor" {...field} /></FormControl>
            <FormMessage />
          </FormItem>
        )} />
        <FormField control={form.control} name="documento" render={({ field }) => (
          <FormItem>
            <FormLabel>CNPJ / CPF</FormLabel>
            <FormControl><Input placeholder="00.000.000/0000-00" {...field} /></FormControl>
            <FormMessage />
          </FormItem>
        )} />
        <FormField control={form.control} name="contato" render={({ field }) => (
          <FormItem>
            <FormLabel>Contato (Telefone ou E-mail)</FormLabel>
            <FormControl><Input placeholder="(00) 00000-0000" {...field} /></FormControl>
            <FormMessage />
          </FormItem>
        )} />
        <FormField
          control={form.control}
          name="attachment"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <FileUpload
                  onFileChange={(file) => field.onChange(file)}
                  accept=".doc,.docx,.xls,.xlsx,.pdf"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-end gap-4">
          <Button type="button" variant="outline" onClick={onSuccess}>Cancelar</Button>
          <Button type="submit" disabled={isLoading}>{isLoading ? "Salvando..." : "Salvar"}</Button>
        </div>
      </form>
    </Form>
  )
}
