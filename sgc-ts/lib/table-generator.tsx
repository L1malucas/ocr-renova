import { z } from "zod";
import { TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Edit, Trash2 } from "lucide-react";

export function generateTableColumns<T extends z.ZodObject<any, any, any>>(
  schema: T
) {
  const shape = schema.shape;

  return (
    <TableRow>
      {Object.keys(shape).map((key) => (
        <TableHead key={key}>{getFieldLabel(key)}</TableHead>
      ))}
      <TableHead className="text-right">Ações</TableHead>
    </TableRow>
  );
}

export function generateTableCells<T extends z.ZodObject<any, any, any>>(
  schema: T,
  data: any[],
  onEdit: (item: any) => void,
  onDelete: (id: string) => void
) {
  const shape = schema.shape;

  return data.map((row) => (
    <TableRow key={row.id}>
      {Object.keys(shape).map((key) => (
        <TableCell key={key}>{row[key]}</TableCell>
      ))}
      <TableCell className="text-right">
        <div className="flex items-center justify-end gap-2">
          <Button variant="ghost" size="sm" onClick={() => onEdit(row)}><Edit className="h-4 w-4" /></Button>
          <Button variant="ghost" size="sm" onClick={() => onDelete(row.id)}><Trash2 className="h-4 w-4" /></Button>
        </div>
      </TableCell>
    </TableRow>
  ));
}

function getFieldLabel(key: string): string {
  // Simple conversion from camelCase to Title Case
  const result = key.replace(/([A-Z])/g, " $1");
  return result.charAt(0).toUpperCase() + result.slice(1);
}
