"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CategoriaManager } from "./categoria-manager"

export function CategoriasView() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Configurações</h1>
        <p className="text-muted-foreground">Gerenciamento de dados mestre do sistema.</p>
      </div>

      <Tabs defaultValue="despesas" className="space-y-4">
        <TabsList>
          <TabsTrigger value="despesas">Categorias de Despesa</TabsTrigger>
          <TabsTrigger value="linhas-orcamentarias">Categorias de Linha Orçamentária</TabsTrigger>
          <TabsTrigger value="centro-custo">Categorias de Centro de Custo</TabsTrigger>
        </TabsList>

        <TabsContent value="despesas">
          <CategoriaManager tipo="despesas" />
        </TabsContent>

        <TabsContent value="linhas-orcamentarias">
          <CategoriaManager tipo="linhas-orcamentarias" />
        </TabsContent>

        <TabsContent value="centro-custo">
          <CategoriaManager tipo="centro-custo" />
        </TabsContent>
      </Tabs>
    </div>
  )
}