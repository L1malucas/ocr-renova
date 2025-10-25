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
    if (fieldSchema.isEmail) {
      return "email";
    }
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

function renderField(key: string, type: string, field: any, form: any) {
  if (type === "file") {
    return (
      <FileUpload
        onFileChange={(file) => field.onChange(file)}
        accept=".doc,.docx,.xls,.xlsx,.pdf"
      />
    );
  }

  return <Input type={type} {...field} />;
}
