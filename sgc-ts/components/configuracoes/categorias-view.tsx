"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Este será um componente reutilizável para listar, criar, editar e excluir categorias.
// Por enquanto, é um placeholder.
function CategoriaManager({ tipo }: { tipo: string }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Gerenciar Categorias de {tipo}</CardTitle>
        <CardDescription>Adicione, edite ou remova categorias para este módulo.</CardDescription>
      </CardHeader>
      <CardContent>
        <p>Gerenciador de categorias para {tipo} aparecerá aqui.</p>
        {/* Aqui entrará a tabela de dados e os botões de ação */}
      </CardContent>
    </Card>
  )
}

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
          <CategoriaManager tipo="Despesas" />
        </TabsContent>

        <TabsContent value="linhas-orcamentarias">
          <CategoriaManager tipo="Linhas Orçamentárias" />
        </TabsContent>

        <TabsContent value="centro-custo">
          <CategoriaManager tipo="Centros de Custo" />
        </TabsContent>
      </Tabs>
    </div>
  )
}
