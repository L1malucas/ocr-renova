import { z } from "zod";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { FileUpload } from "@/components/ui/file-upload";

export function generateFormFields<T extends z.ZodObject<any, any, any>>(
  schema: T,
  form: any
) {
  const shape = schema.shape;

  return Object.keys(shape).map((key) => {
    const fieldSchema = shape[key];
    const fieldType = getFieldType(fieldSchema);

    return (
      <FormField
        key={key}
        control={form.control}
        name={key}
        render={({ field }) => (
          <FormItem>
            <FormLabel>{getFieldLabel(key)}</FormLabel>
            <FormControl>
              {renderField(key, fieldType, field, form)}
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    );
  });
}

function getFieldType(fieldSchema: z.ZodType<any, any, any>): string {
  if (fieldSchema instanceof z.ZodString) {
    const def: any = (fieldSchema as any)._def;
    const checks: Array<{ kind: string }>|undefined = def?.checks;
    const isEmail = Array.isArray(checks) && checks.some((c) => c.kind === "email");
    if (isEmail) return "email";
    return "text";
  }
  if (fieldSchema instanceof z.ZodNumber) {
    return "number";
  }
  if (fieldSchema instanceof z.ZodAny) {
    return "file";
  }
  return "text";
}

function getFieldLabel(key: string): string {
  // Simple conversion from camelCase to Title Case
  const result = key.replace(/([A-Z])/g, " $1");
  return result.charAt(0).toUpperCase() + result.slice(1);
}

function maskCNPJ(value: string) {
  const digits = value.replace(/\D/g, "").slice(0, 14);
  const parts = [] as string[];
  if (digits.length > 0) parts.push(digits.slice(0, 2));
  if (digits.length >= 3) parts.push(digits.slice(2, 5));
  if (digits.length >= 6) parts.push(digits.slice(5, 8));
  const branch = digits.slice(8, 12);
  const sufix = digits.slice(12, 14);
  let masked = "";
  if (parts.length) masked = parts[0];
  if (parts.length >= 2) masked = `${parts[0]}.${parts[1]}`;
  if (parts.length >= 3) masked = `${masked}.${parts[2]}`;
  if (branch) masked = `${masked}/${branch}`;
  if (sufix) masked = `${masked}-${sufix}`;
  return masked;
}

function renderField(key: string, type: string, field: any, form: any) {
  // Arquivos
  if (type === "file") {
    return (
      <FileUpload
        onFileChange={(file) => field.onChange(file)}
        accept=".doc,.docx,.xls,.xlsx,.pdf"
      />
    );
  }

  // CNPJ com máscara visual; mantém apenas dígitos no form state
  if (key.toLowerCase() === "cnpj") {
    const raw = (field.value as string) || "";
    return (
      <Input
        inputMode="numeric"
        placeholder="00.000.000/0000-00"
        value={maskCNPJ(raw)}
        onChange={(e) => field.onChange(e.target.value.replace(/\D/g, ""))}
      />
    );
  }

  return <Input type={type} {...field} />;
}
