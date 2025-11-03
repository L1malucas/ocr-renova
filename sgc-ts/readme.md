# SGC-TS - Sistema de Gestão e Prestação de Contas para o Terceiro Setor

Sistema web desenvolvido com Next.js 14 e TypeScript para gestão financeira e prestação de contas de organizações sociais.

---

## Índice

- [Visão Geral](#visão-geral)
- [Arquitetura do Sistema](#arquitetura-do-sistema)
- [Padrões de Código](#padrões-de-código)
- [Design Patterns](#design-patterns)
- [Tecnologias](#tecnologias)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [Funcionalidades](#funcionalidades)
- [Como Desenvolver](#como-desenvolver)
- [Convenções](#convenções)

---

## Visão Geral

O **SGC-TS** é um sistema completo para gestão financeira e prestação de contas voltado para organizações do terceiro setor. O projeto utiliza as melhores práticas do ecossistema React/Next.js com TypeScript, seguindo padrões consistentes e arquitetura escalável.

### Características Principais

- ✅ **Type-safe** com TypeScript strict mode
- ✅ **Componentes reutilizáveis** com shadcn/ui
- ✅ **Validação automática** com Zod
- ✅ **Cache inteligente** com React Query
- ✅ **Formulários auto-gerados** a partir de DTOs
- ✅ **Autenticação** com JWT
- ✅ **Toasts automáticos** em requisições HTTP
- ✅ **Responsivo** e acessível

---

## Arquitetura do Sistema

### Arquitetura em Camadas

O projeto segue uma arquitetura híbrida: **Feature-Based + Layered Architecture**

```
┌─────────────────────────────────────────┐
│         APRESENTAÇÃO (UI)               │
│  app/ + components/ (páginas e views)  │
└─────────────────────────────────────────┘
              ↓
┌─────────────────────────────────────────┐
│      CAMADA DE ESTADO (Hooks)           │
│  hooks/use-*.ts (React Query + Zustand) │
└─────────────────────────────────────────┘
              ↓
┌─────────────────────────────────────────┐
│    CAMADA DE SERVIÇOS (API)             │
│        services/*.service.ts            │
└─────────────────────────────────────────┘
              ↓
┌─────────────────────────────────────────┐
│    CAMADA DE COMUNICAÇÃO HTTP           │
│    lib/http-client.ts + api-client.ts   │
└─────────────────────────────────────────┘
              ↓
┌─────────────────────────────────────────┐
│         BACKEND API REST                │
│  (process.env.NEXT_PUBLIC_API_URL)     │
└─────────────────────────────────────────┘
```

### Fluxo de Dados

Exemplo: Criação de um fornecedor

```
Usuário clica em "Novo Fornecedor"
    ↓
View Component abre Drawer
    ↓
Form Component valida com Zod Schema
    ↓
Custom Hook (useCreateFornecedor) dispara mutation
    ↓
Service Layer (createFornecedor)
    ↓
HTTP Client (apiClient.post)
    ↓
Interceptor adiciona token JWT
    ↓
Backend API processa
    ↓
Interceptor exibe toast de sucesso
    ↓
React Query invalida cache
    ↓
Lista é automaticamente recarregada
```

### Gerenciamento de Estado

O projeto usa **três estratégias de estado**:

#### 1. React Query - Estado do Servidor
```typescript
// Caching, sincronização e invalidação de dados da API
export const useGetFornecedores = (params: ListParams) => {
  return useQuery({
    queryKey: [FORNECEDORES_QUERY_KEY, params],
    queryFn: () => getFornecedores(params),
    keepPreviousData: true,
  })
}
```

#### 2. Zustand - Estado Global Persistente
```typescript
// Cache local com criptografia
export const useCacheStore = create<CacheState>()(
  persist(
    (set, get) => ({
      cache: {},
      setItem: (key, value) => { /* ... */ },
      getItem: <T>(key: string): T | null => { /* ... */ }
    }),
    { name: "cpg-caduceu-cache" }
  )
)
```

#### 3. Context API - Autenticação
```typescript
// Gerenciamento de usuário autenticado
export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) throw new Error("useAuth must be used within AuthProvider")
  return context
}
```

---

## Padrões de Código

### 1. DTOs (Data Transfer Objects)

Cada entidade possui um modelo com estrutura consistente:

```typescript
// models/fornecedor.model.ts

// 1. DTO Principal - representa a entidade completa
export interface FornecedorDto {
  id: string
  nome: string
  cnpj: string
}

// 2. DTO de Criação - dados necessários para criar
export interface CriarFornecedorDto {
  nome: string
  cnpj: string
}

// 3. DTO de Atualização - Partial do CriarDto
export type AtualizarFornecedorDto = Partial<CriarFornecedorDto>

// 4. Schema Zod - validação de formulários
export const CriarFornecedorSchema = z.object({
  nome: z.string().min(3, "O nome é obrigatório."),
  cnpj: z.string().min(14, "O CNPJ é obrigatório."),
})

// 5. DTO de Listagem - versão simplificada
export interface FornecedorListDto {
  id: string
  nome: string
  cnpj: string
}
```

### 2. Formulários Gerados a partir de DTOs

#### Abordagem 1: Geração Automática

```typescript
// lib/form-generator.tsx
export function generateFormFields<T extends z.ZodObject<any, any, any>>(
  schema: T,
  form: any
) {
  const shape = schema.shape;

  return Object.keys(shape).map((key) => (
    <FormField
      key={key}
      control={form.control}
      name={key}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{getFieldLabel(key)}</FormLabel>
          <FormControl>
            {renderField(key, getFieldType(fieldSchema), field, form)}
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  ));
}
```

**Uso:**
```typescript
// components/fornecedores/fornecedor-form.tsx
return (
  <Form {...form}>
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
      {generateFormFields(CriarFornecedorSchema, form)}
      <Button type="submit">Salvar</Button>
    </form>
  </Form>
)
```

#### Abordagem 2: Forms Manuais para Casos Complexos

```typescript
// components/despesas/despesa-form-avancado.tsx
<Form {...form}>
  <form onSubmit={form.handleSubmit(onSubmit)}>
    <Card>
      <CardHeader>
        <CardTitle>Informações da Despesa</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <FormField
          control={form.control}
          name="descricao"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Descrição</FormLabel>
              <FormControl>
                <Input placeholder="Ex: Compra de material" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* Mais campos... */}
      </CardContent>
    </Card>
  </form>
</Form>
```

### 3. Service Layer Pattern

Cada entidade possui um service dedicado com CRUD completo:

```typescript
// services/fornecedores.service.ts
import apiClient from "@/lib/api-client"
import type { ApiResponse, PaginatedApiResponse } from "@/lib/types"
import type { FornecedorDto, CriarFornecedorDto } from "@/models/fornecedor.model"

export interface ListParams {
  pageNumber?: number
  pageSize?: number
}

// GET lista paginada
export const getFornecedores = (params: ListParams):
  Promise<PaginatedApiResponse<FornecedorDto[]>> => {
  return apiClient.getPaginated("/fornecedores", { params })
}

// GET por ID
export const getFornecedorById = (id: string):
  Promise<ApiResponse<FornecedorDto>> => {
  return apiClient.get(`/fornecedores/${id}`)
}

// POST criar
export const createFornecedor = (data: CriarFornecedorDto):
  Promise<ApiResponse<FornecedorDto>> => {
  return apiClient.post("/fornecedores", data, {
    successMessage: "Fornecedor criado com sucesso."
  })
}

// PUT atualizar
export const updateFornecedor = (id: string, data: AtualizarFornecedorDto) => {
  return apiClient.put(`/fornecedores/${id}`, data)
}

// DELETE
export const deleteFornecedor = (id: string) => {
  return apiClient.delete(`/fornecedores/${id}`)
}
```

### 4. Custom Hooks Pattern

Cada service tem um hook correspondente que encapsula React Query:

```typescript
// hooks/use-fornecedores.ts
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import * as service from "@/services/fornecedores.service"

const QUERY_KEY = "fornecedores"

// Hook de listagem
export const useGetFornecedores = (params: ListParams) => {
  return useQuery({
    queryKey: [QUERY_KEY, params],
    queryFn: () => service.getFornecedores(params),
    keepPreviousData: true,
  })
}

// Hook de criação
export const useCreateFornecedor = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: CriarFornecedorDto) => service.createFornecedor(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY] })
    },
  })
}

// Hook de atualização
export const useUpdateFornecedor = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: AtualizarFornecedorDto }) =>
      service.updateFornecedor(id, data),
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY] })
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY, variables.id] })
    },
  })
}

// Hook de exclusão
export const useDeleteFornecedor = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: string) => service.deleteFornecedor(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY] })
    },
  })
}
```

### 5. View-List-Form Component Pattern

Cada feature segue esta organização:

```
components/[feature]/
├── [feature]-view.tsx       # Container principal
├── [feature]-list.tsx       # Tabela/lista com paginação
└── [feature]-form.tsx       # Formulário de criação/edição
```

#### View Component (Container)
```typescript
// components/fornecedores/fornecedores-view.tsx
export function FornecedoresView() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const [editingFornecedor, setEditingFornecedor] = useState<FornecedorDto | null>(null)

  const handleCreateNew = () => {
    setEditingFornecedor(null)
    setIsDrawerOpen(true)
  }

  const handleEdit = (fornecedor: FornecedorDto) => {
    setEditingFornecedor(fornecedor)
    setIsDrawerOpen(true)
  }

  const handleFormSuccess = () => {
    setIsDrawerOpen(false)
    setEditingFornecedor(null)
  }

  return (
    <div className="space-y-6">
      <FornecedoresList onCreateNew={handleCreateNew} onEdit={handleEdit} />

      <Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
        <DrawerContent className="max-h-[90vh]">
          <DrawerHeader>
            <DrawerTitle>
              {editingFornecedor ? "Editar" : "Criar"} Fornecedor
            </DrawerTitle>
          </DrawerHeader>
          <div className="overflow-auto p-4">
            <FornecedorForm
              fornecedorToEdit={editingFornecedor}
              onSuccess={handleFormSuccess}
            />
          </div>
        </DrawerContent>
      </Drawer>
    </div>
  )
}
```

#### List Component (Presentational)
```typescript
// components/fornecedores/fornecedores-list.tsx
interface Props {
  onCreateNew: () => void
  onEdit: (fornecedor: FornecedorDto) => void
}

export function FornecedoresList({ onCreateNew, onEdit }: Props) {
  const [page, setPage] = useState(1)
  const { data, isLoading, isError } = useGetFornecedores({
    pageNumber: page,
    pageSize: 10
  })
  const deleteMutation = useDeleteFornecedor()

  const fornecedores = data?.data ?? []

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Gestão de Fornecedores</h1>
          <p className="text-muted-foreground">
            Cadastre e gerencie seus fornecedores.
          </p>
        </div>
        <Button onClick={onCreateNew} className="gap-2">
          <Plus className="h-4 w-4" />
          Novo Fornecedor
        </Button>
      </div>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              {generateTableColumns(FornecedorListSchema)}
            </TableHeader>
            <TableBody>
              {isLoading && <TableRow><TableCell>Carregando...</TableCell></TableRow>}
              {isError && <TableRow><TableCell>Erro ao carregar</TableCell></TableRow>}
              {generateTableCells(FornecedorListSchema, fornecedores, onEdit, handleDelete)}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Paginação */}
      {data?.meta && (
        <div className="flex justify-end gap-4">
          <Button
            onClick={() => setPage(p => p - 1)}
            disabled={!data.meta.hasPreviousPage}
          >
            Anterior
          </Button>
          <Button
            onClick={() => setPage(p => p + 1)}
            disabled={!data.meta.hasNextPage}
          >
            Próxima
          </Button>
        </div>
      )}
    </div>
  )
}
```

#### Form Component
```typescript
// components/fornecedores/fornecedor-form.tsx
interface Props {
  fornecedorToEdit?: FornecedorDto | null
  onSuccess: () => void
}

export function FornecedorForm({ fornecedorToEdit, onSuccess }: Props) {
  const { toast } = useToast()
  const createMutation = useCreateFornecedor()
  const updateMutation = useUpdateFornecedor()

  const form = useForm<FormValues>({
    resolver: zodResolver(CriarFornecedorSchema),
    defaultValues: fornecedorToEdit || {},
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
          toast({
            title: `Fornecedor ${action === 'update' ? 'atualizado' : 'criado'}!`
          })
          onSuccess()
          form.reset()
        },
        onError: (error: any) => {
          toast({
            title: "Erro ao salvar",
            description: error.message,
            variant: "destructive"
          })
        },
      }
    )
  }

  const isLoading = createMutation.isPending || updateMutation.isPending

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        {generateFormFields(CriarFornecedorSchema, form)}
        <div className="flex justify-end gap-4">
          <Button variant="outline" onClick={onSuccess}>Cancelar</Button>
          <Button type="submit" disabled={isLoading}>
            {isLoading ? "Salvando..." : "Salvar"}
          </Button>
        </div>
      </form>
    </Form>
  )
}
```

---

## Design Patterns

### Patterns Estruturais

#### 1. Repository Pattern
- **Onde:** Services layer (`services/*.service.ts`)
- **Descrição:** Encapsula toda a lógica de acesso a dados da API

#### 2. Singleton Pattern
- **Onde:** `lib/api-client.ts`
- **Descrição:** Uma única instância do HttpClient compartilhada

```typescript
const apiClient = new HttpClient({
  baseURL: process.env.NEXT_PUBLIC_API_URL!,
  getToken,
  onUnauthorized: () => {
    removeToken();
    window.location.href = '/login';
  },
});

export default apiClient; // Singleton exportado
```

#### 3. Factory Pattern
- **Onde:** `lib/form-generator.tsx` e `lib/table-generator.tsx`
- **Descrição:** Gera componentes de formulário e tabela baseado em schemas Zod

#### 4. Strategy Pattern
- **Onde:** `lib/http-client.ts` com `AttachmentService`
- **Descrição:** Estratégia diferente para upload de arquivos

```typescript
public async post<T>(url: string, data?: any, config?: CustomRequestConfig) {
  if (config?.attachments) {
    return this.attachmentService.post<T>(url, data, config); // Strategy para upload
  }
  const response = await this.instance.post<ApiResponse<T>>(url, data, config);
  return response.data;
}
```

#### 5. Decorator Pattern
- **Onde:** `lib/http-client.ts` interceptors
- **Descrição:** Adiciona comportamentos (autenticação, toasts) às requisições

```typescript
// Request interceptor - adiciona token
this.instance.interceptors.request.use((config) => {
  const token = getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response interceptor - exibe toasts
this.instance.interceptors.response.use(
  (response) => {
    if (response.data.success) {
      toast({ title: "Sucesso!", description: response.data.messages?.[0] });
    }
    return response;
  },
  (error) => {
    toast({ title: "Erro!", description: error.message, variant: "destructive" });
    return Promise.reject(error);
  }
);
```

### React Patterns

#### 1. Compound Components Pattern
- **Onde:** Componentes shadcn/ui (Form, Card, Table, Dialog, etc.)

```typescript
<Card>
  <CardHeader>
    <CardTitle>Título</CardTitle>
  </CardHeader>
  <CardContent>Conteúdo</CardContent>
</Card>
```

#### 2. Render Props Pattern
- **Onde:** FormField do react-hook-form

```typescript
<FormField
  control={form.control}
  name="nome"
  render={({ field }) => (
    <FormItem>
      <FormControl>
        <Input {...field} />
      </FormControl>
    </FormItem>
  )}
/>
```

#### 3. Custom Hooks Pattern
- **Onde:** Todos os hooks em `hooks/`
- **Descrição:** Encapsula lógica reutilizável

#### 4. Container/Presentational Pattern
- **Onde:** View components (container) e List/Form components (presentational)

---

## Tecnologias

### Stack Principal

```json
{
  "framework": "Next.js 14.2.16",
  "language": "TypeScript 5",
  "runtime": "React 18",
  "styling": "Tailwind CSS 4.1.9"
}
```

### UI Components

- **shadcn/ui** - 50+ componentes baseados em Radix UI
- **Lucide React** - Ícones
- **Tailwind CSS** - Estilização
- **CVA** - Variantes de componentes

### Formulários e Validação

- **React Hook Form** - Gerenciamento de formulários
- **Zod** - Validação de schemas e type inference

### Estado e Cache

- **@tanstack/react-query** - Estado do servidor, cache e sincronização
- **Zustand** - Estado global da aplicação
- **Context API** - Autenticação

### HTTP e API

- **Axios** - Cliente HTTP
- **Custom HttpClient** - Wrapper com interceptors

### Utilitários

- **date-fns** - Manipulação de datas
- **clsx + tailwind-merge** - Utility para classes CSS
- **sonner** - Sistema de toasts

### Desenvolvimento

```bash
npm run dev    # Desenvolvimento (porta 3007)
npm run build  # Build de produção
npm run start  # Servidor de produção
npm run lint   # Linter
```

---

## Estrutura do Projeto

```
sgc-ts/
├── app/                        # Next.js 14 App Router (20 rotas)
│   ├── page.tsx               # Home/Dashboard
│   ├── layout.tsx             # Layout raiz com providers
│   ├── globals.css            # Estilos globais
│   ├── fornecedores/
│   │   └── page.tsx
│   ├── despesas/
│   │   └── page.tsx
│   ├── receitas/
│   │   └── page.tsx
│   └── [outros módulos...]
│
├── components/                 # Componentes React
│   ├── ui/                    # 50+ componentes primitivos (shadcn/ui)
│   │   ├── button.tsx
│   │   ├── input.tsx
│   │   ├── form.tsx
│   │   ├── table.tsx
│   │   ├── card.tsx
│   │   └── [outros...]
│   ├── layout/                # Layout components
│   │   ├── app-layout.tsx
│   │   └── sidebar.tsx
│   ├── dashboard/             # Dashboard components
│   ├── fornecedores/          # Feature: Fornecedores
│   │   ├── fornecedores-view.tsx
│   │   ├── fornecedores-list.tsx
│   │   └── fornecedor-form.tsx
│   ├── despesas/              # Feature: Despesas
│   ├── receitas/              # Feature: Receitas
│   └── [outras features...]
│
├── services/                   # API Services (16 services)
│   ├── fornecedores.service.ts
│   ├── despesas.service.ts
│   ├── receitas.service.ts
│   └── [outros...]
│
├── hooks/                      # Custom Hooks (22 hooks)
│   ├── use-fornecedores.ts
│   ├── use-despesas.ts
│   ├── use-auth.ts
│   ├── use-toast.ts
│   ├── use-cache.ts
│   └── [outros...]
│
├── models/                     # DTOs e Schemas (17 models)
│   ├── fornecedor.model.ts
│   ├── despesa.model.ts
│   ├── receita.model.ts
│   └── [outros...]
│
├── lib/                        # Utilitários e Configurações
│   ├── utils.ts               # cn() e outros utils
│   ├── api-client.ts          # Singleton do HttpClient
│   ├── http-client.ts         # Classe HttpClient com interceptors
│   ├── attachment-service.ts  # Serviço de upload de arquivos
│   ├── cache-store.ts         # Zustand store com criptografia
│   ├── form-generator.tsx     # Gerador automático de forms
│   ├── table-generator.tsx    # Gerador automático de tables
│   └── types.ts               # Tipos compartilhados
│
├── styles/                     # Estilos adicionais
├── public/                     # Assets estáticos
├── node_modules/              # Dependências
│
├── package.json               # Dependências e scripts
├── tsconfig.json              # Configuração TypeScript
├── next.config.mjs            # Configuração Next.js
├── tailwind.config.ts         # Configuração Tailwind
├── components.json            # Configuração shadcn/ui
└── readme.md                  # Este arquivo
```

---

## Funcionalidades

### Módulos Principais (20 módulos)

#### MÓDULOS FINANCEIROS
1. **Receitas** (`/receitas`) - Gestão de receitas
2. **Despesas** (`/despesas`) - Gestão de despesas com workflow de aprovação
3. **Fornecedores** (`/fornecedores`) - Cadastro de fornecedores
4. **Pagamentos** (`/pagamentos`) - Controle de pagamentos
5. **Conciliação** (`/conciliacao`) - Conciliação bancária
6. **Orçamento** (`/orcamento`) - Planejamento orçamentário

#### MÓDULOS DE PRESTAÇÃO DE CONTAS
7. **Projetos** (`/projetos`)
8. **Plano de Trabalho** (`/plano-de-trabalho`)
9. **Objeto** (`/objeto`)
10. **Contrapartida** (`/contrapartida`)
11. **Execução** (`/execucao`)
12. **Análise** (`/analise`)
13. **Prestação** (`/prestacao`)
14. **Sanções** (`/sancoes`)

#### MÓDULOS ADMINISTRATIVOS
15. **Relatórios** (`/relatorios`)
16. **Integrações** (`/integracoes`)
17. **Organizações Sociais** (`/organizacoes-sociais`)
18. **Usuários** (`/usuarios`)
19. **Unidades** (`/unidades`)
20. **Configurações** (`/configuracoes`)

### Dashboard

- 4 KPI Cards (Saldo, Receitas, Despesas, Execução Orçamentária)
- Gráfico de fluxo de caixa (Recharts)
- Progresso orçamentário
- Distribuição de receitas
- Tarefas pendentes
- Resumo de contas

### Recursos Especiais

#### 1. Data Prefetching Strategy
Componente que faz pré-carregamento de dados essenciais ao iniciar a aplicação:

```typescript
// components/data-prefetcher.tsx
export function DataPrefetcher() {
  const { setCacheItem, getCacheItem } = useCache()

  // Busca e cacheia dados essenciais
  const { data: fornecedores } = useGetFornecedores({ pageNumber: 1, pageSize: 10 })
  const { data: receitas } = useGetReceitas({ pageNumber: 1, pageSize: 10 })
  // ... outros dados

  useEffect(() => {
    if (fornecedores) {
      setCacheItem("fornecedores", fornecedores.data)
    }
  }, [fornecedores])

  return null // Não renderiza nada
}
```

#### 2. Cache com Criptografia
Sistema de cache local com criptografia XOR + Base64:

```typescript
// lib/cache-store.ts
const encode = (str: string): string => {
  const base64Encoded = btoa(unescape(encodeURIComponent(str)))
  return base64Encoded
    .split("")
    .map((char, i) =>
      String.fromCharCode(
        char.charCodeAt(0) ^ secretKey.charCodeAt(i % secretKey.length)
      )
    )
    .join("")
}
```

#### 3. Upload de Arquivos
Suporte a multipart/form-data:

```typescript
// lib/attachment-service.ts
export class AttachmentService {
  public async post<T>(url: string, data?: any, config?: CustomRequestConfig) {
    const formData = this.createFormData(data, config?.attachments);
    return this.client.post<ApiResponse<T>>(url, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  }
}
```

**Uso:**
```typescript
apiClient.post("/despesas", data, {
  attachments: [file1, file2],
  successMessage: "Despesa criada com anexos!"
})
```

#### 4. Sidebar Responsivo
Sidebar colapsável com accordion para grupos de menu, destaque de rota ativa e informações do usuário.

---

## Como Desenvolver

### 1. Adicionar um Novo Módulo

Siga o pattern View-List-Form:

#### Passo 1: Criar o Model
```typescript
// models/produto.model.ts
import * as z from "zod"

export interface ProdutoDto {
  id: string
  nome: string
  preco: number
}

export interface CriarProdutoDto {
  nome: string
  preco: number
}

export type AtualizarProdutoDto = Partial<CriarProdutoDto>

export const CriarProdutoSchema = z.object({
  nome: z.string().min(3, "O nome é obrigatório."),
  preco: z.number().positive("O preço deve ser positivo."),
})

export interface ProdutoListDto {
  id: string
  nome: string
  preco: number
}

export const ProdutoListSchema = z.object({
  nome: z.string(),
  preco: z.number(),
})
```

#### Passo 2: Criar o Service
```typescript
// services/produtos.service.ts
import apiClient from "@/lib/api-client"
import type { ApiResponse, PaginatedApiResponse } from "@/lib/types"
import type { ProdutoDto, CriarProdutoDto, AtualizarProdutoDto } from "@/models/produto.model"

export interface ListParams {
  pageNumber?: number
  pageSize?: number
}

export const getProdutos = (params: ListParams):
  Promise<PaginatedApiResponse<ProdutoDto[]>> => {
  return apiClient.getPaginated("/produtos", { params })
}

export const getProdutoById = (id: string):
  Promise<ApiResponse<ProdutoDto>> => {
  return apiClient.get(`/produtos/${id}`)
}

export const createProduto = (data: CriarProdutoDto):
  Promise<ApiResponse<ProdutoDto>> => {
  return apiClient.post("/produtos", data, {
    successMessage: "Produto criado com sucesso."
  })
}

export const updateProduto = (id: string, data: AtualizarProdutoDto) => {
  return apiClient.put(`/produtos/${id}`, data)
}

export const deleteProduto = (id: string) => {
  return apiClient.delete(`/produtos/${id}`)
}
```

#### Passo 3: Criar o Hook
```typescript
// hooks/use-produtos.ts
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import * as service from "@/services/produtos.service"

const QUERY_KEY = "produtos"

export const useGetProdutos = (params: service.ListParams) => {
  return useQuery({
    queryKey: [QUERY_KEY, params],
    queryFn: () => service.getProdutos(params),
    keepPreviousData: true,
  })
}

export const useCreateProduto = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: service.createProduto,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY] })
    },
  })
}

export const useUpdateProduto = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ id, data }) => service.updateProduto(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY] })
    },
  })
}

export const useDeleteProduto = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: service.deleteProduto,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY] })
    },
  })
}
```

#### Passo 4: Criar os Componentes
```typescript
// components/produtos/produtos-view.tsx
// components/produtos/produtos-list.tsx
// components/produtos/produto-form.tsx
// (Seguir exemplos da seção "Padrões de Código")
```

#### Passo 5: Criar a Página
```typescript
// app/produtos/page.tsx
"use client"

import { ProdutosView } from "@/components/produtos/produtos-view"

export default function ProdutosPage() {
  return <ProdutosView />
}
```

#### Passo 6: Adicionar ao Menu
```typescript
// components/layout/sidebar.tsx
const menuGroups = [
  {
    title: "Cadastros",
    items: [
      // ... outros itens
      {
        label: "Produtos",
        icon: Package,
        href: "/produtos",
      },
    ],
  },
]
```

### 2. Boas Práticas

✅ **Sempre validar com Zod** antes de enviar dados
✅ **Usar hooks do React Query** para todas as operações de API
✅ **Invalidar cache** após mutations (create, update, delete)
✅ **Exibir loading states** durante operações assíncronas
✅ **Tratar erros** com try-catch e callbacks onError
✅ **Usar TypeScript strict** - aproveitar type safety
✅ **Seguir nomenclatura consistente** - ver seção Convenções

❌ **Não fazer fetch direto** - sempre usar hooks
❌ **Não manipular DOM diretamente** - usar React state
❌ **Não fazer mutações sem invalidar cache**
❌ **Não ignorar erros de TypeScript**

---

## Convenções

### Nomenclatura de Arquivos

```
components/[feature]/[feature]-view.tsx      # PascalCase + sufixo
models/[entidade].model.ts                   # kebab-case + .model.ts
services/[entidade].service.ts               # kebab-case + .service.ts
hooks/use-[nome].ts                          # kebab-case prefixo use-
```

### Nomenclatura de Código

```typescript
// Interfaces e Types - PascalCase
interface FornecedorDto { }
type AtualizarFornecedorDto = Partial<CriarFornecedorDto>

// Funções - camelCase
export const getFornecedores = () => { }

// Constantes - camelCase ou SCREAMING_SNAKE_CASE
const FORNECEDORES_QUERY_KEY = "fornecedores"
const apiClient = new HttpClient()

// Componentes - PascalCase
export function FornecedoresView() { }

// Props Interfaces - PascalCase com sufixo Props
interface FornecedoresListProps { }

// Hooks - camelCase com prefixo use
export const useGetFornecedores = () => { }
```

### Ordem de Imports

```typescript
// 1. React e hooks do React
import { useState, useEffect } from "react"

// 2. Bibliotecas externas
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

// 3. Componentes UI
import { Button } from "@/components/ui/button"

// 4. Hooks customizados
import { useGetFornecedores } from "@/hooks/use-fornecedores"

// 5. Models e tipos
import { FornecedorDto, CriarFornecedorSchema } from "@/models/fornecedor.model"

// 6. Utilitários
import { cn } from "@/lib/utils"
```

### Tratamento de Erros

**Pattern 1: Try-Catch**
```typescript
try {
  await someAsyncOperation()
} catch (error) {
  console.error("Erro:", error)
  toast({ title: "Erro", description: error.message, variant: "destructive" })
} finally {
  setLoading(false)
}
```

**Pattern 2: onError callback**
```typescript
mutation.mutate(data, {
  onSuccess: () => { /* ... */ },
  onError: (error) => {
    toast({ title: "Erro", description: error.message, variant: "destructive" })
  },
})
```

**Pattern 3: Interceptors globais**
Já configurado no `lib/http-client.ts` - toasts automáticos

---

## Configuração de Ambiente

### Variáveis de Ambiente

Crie um arquivo `.env.local` na raiz do projeto:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

### Instalação

```bash
# Instalar dependências
npm install

# Rodar em desenvolvimento (porta 3007)
npm run dev

# Build de produção
npm run build

# Rodar build de produção
npm start
```

---

## Referências Rápidas

### Caminhos Importantes

```
Diretório principal:        /sgc-ts/
Models:                     /sgc-ts/models/
Services:                   /sgc-ts/services/
Components:                 /sgc-ts/components/
Hooks:                      /sgc-ts/hooks/
Lib (utilitários):          /sgc-ts/lib/
App (rotas):                /sgc-ts/app/
UI Components:              /sgc-ts/components/ui/
```

### Componentes UI Disponíveis (shadcn/ui)

- Accordion, Alert Dialog, Avatar, Badge, Button
- Calendar, Card, Checkbox, Collapsible, Command
- Context Menu, Dialog, Drawer, Dropdown Menu
- Form, Input, Label, Menubar, Navigation Menu
- Pagination, Popover, Progress, Radio Group
- Resizable, Scroll Area, Select, Separator, Sheet
- Sidebar, Skeleton, Slider, Sonner, Switch
- Table, Tabs, Textarea, Toast, Toggle, Tooltip
- E mais...

### Utilitários Disponíveis

```typescript
import { cn } from "@/lib/utils"                    // Merge de classes CSS
import { formatarData } from "@/lib/index"          // Formatação de datas
import { generateFormFields } from "@/lib/form-generator"       // Gerar forms
import { generateTableColumns } from "@/lib/table-generator"    // Gerar tables
import { useToast } from "@/hooks/use-toast"                    // Sistema de toasts
import { useCache } from "@/hooks/use-cache"                    // Cache local
```

---

## Contribuindo

Ao adicionar novas funcionalidades:

1. Siga os padrões estabelecidos (View-List-Form)
2. Crie models com DTOs e schemas Zod
3. Implemente services com CRUD completo
4. Crie hooks do React Query
5. Use componentes UI do shadcn
6. Adicione tratamento de erros
7. Teste todas as operações (CRUD)
8. Documente mudanças significativas

---

## Suporte

Para dúvidas ou problemas:

1. Consulte este README
2. Verifique exemplos em módulos existentes (ex: `fornecedores/`)
3. Revise a documentação das bibliotecas utilizadas

---

## Licença

[Adicionar informações de licença]

---

**Desenvolvido com ❤️ usando Next.js, TypeScript e as melhores práticas de desenvolvimento React**
