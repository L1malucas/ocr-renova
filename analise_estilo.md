# Documentação de Estilo e Design: sgc-ts vs. siga-pc

Este documento detalha a arquitetura de estilo, a identidade visual e os sistemas de design dos projetos `sgc-ts` e `siga-pc`.

## 1. Arquitetura e Tecnologias Comuns

Ambos os projetos compartilham uma base tecnológica moderna para estilização, garantindo consistência e manutenibilidade.

- **Framework de UI**: Ambos utilizam **Next.js** com o App Router.
- **Motor de Estilização**: **Tailwind CSS** é o motor principal, permitindo um desenvolvimento rápido e baseado em utilitários.
- **Sistema de Componentes**: Ambos adotam **shadcn/ui**, utilizando o estilo pré-definido **"New York"**. Isso significa que eles usam uma coleção de componentes React (construídos sobre Radix UI) que são estilizados com Tailwind CSS.
- **Gerenciamento de Estilos**: A configuração do `tailwind` em `components.json` aponta para `app/globals.css` e ativa o uso de **variáveis CSS** para o tema. Isso permite uma fácil customização e suporte a múltiplos temas (como light e dark mode).
- **Fontes**: Ambos os projetos padronizaram o uso da família de fontes **Geist** (`GeistSans` para corpo de texto e `GeistMono` para código), carregadas localmente através do `next/font`.
- **Ícones**: A biblioteca **Lucide Icons** (`lucide-react`) é a fonte padrão de ícones para ambos, oferecendo um conjunto vasto e consistente de ícones SVG.

---

## 2. Análise de Estilo: `sgc-ts`

### 2.1. Conceito de Design: Sistema Financeiro

O design do `sgc-ts` é orientado para um **sistema financeiro**. A paleta de cores, centrada em tons de **verde**, evoca temas de crescimento, prosperidade e segurança financeira. A interface é limpa e profissional, com um toque moderno.

### 2.2. Paleta de Cores

As cores são definidas como variáveis CSS em `:root` (light mode) e `.dark` (dark mode) no arquivo `app/globals.css`.

| Variável CSS | Cor (Light) | Cor (Dark) | Utilização |
| :--- | :--- | :--- | :--- |
| `--primary` | `#059669` (Verde) | `#10b981` (Verde Claro) | Cor principal para botões, links e elementos interativos. |
| `--secondary` | `#f1f5f9` (Cinza Claro) | `#334155` (Cinza Azulado) | Cor para elementos secundários. |
| `--accent` | `#10b981` (Verde Claro) | `#059669` (Verde) | Cor de destaque, usada para ênfase. |
| `--destructive` | `#dc2626` (Vermelho) | `#ef4444` (Vermelho Claro) | Ações destrutivas e estados de erro. |
| `--background` | `#ffffff` (Branco) | `#0f172a` (Azul Escuro) | Cor de fundo principal da aplicação. |
| `--card` | `#f1f5f9` (Cinza Claro) | `#1e293b` (Azul Ardósia) | Cor de fundo para componentes como cards. |
| `--border` | `#d1d5db` (Cinza) | `#334155` (Cinza Azulado) | Bordas de componentes e separadores. |
| `--radius` | `0.5rem` | `0.5rem` | Raio de borda principal (cantos arredondados). |

**Cores para Gráficos (`--chart-*`):**
- Uma paleta de 5 cores distintas é definida para visualização de dados: verde-limão, verde, ciano, âmbar e vermelho.

### 2.3. Tipografia e Espaçamento

- **Fonte Principal**: `GeistSans` (variável `--font-sans`).
- **Fonte Monoespaçada**: `GeistMono` (variável `--font-mono`).
- **Raio de Borda**: O `border-radius` padrão de `0.5rem` confere aos componentes cantos suavemente arredondados, resultando em um visual amigável e moderno.

---

## 3. Análise de Estilo: `siga-pc`

### 3.1. Conceito de Design: Sistema Governamental

O `siga-pc` é projetado como um **sistema governamental**. A identidade visual é mais **formal e corporativa**. A paleta de cores, baseada em **cinza escuro e índigo**, transmite seriedade, confiança e autoridade.

### 3.2. Paleta de Cores

As cores são definidas de forma similar ao `sgc-ts`, mas com uma paleta distinta para refletir sua identidade.

| Variável CSS | Cor (Light) | Cor (Dark) | Utilização |
| :--- | :--- | :--- | :--- |
| `--primary` | `#374151` (Cinza Escuro) | `#f1f5f9` (Cinza Claro) | Cor principal, usada para cabeçalhos e elementos primários. |
| `--secondary` | `#6366f1` (Índigo) | `#4f46e5` (Índigo Escuro) | Cor para ações secundárias e destaque. |
| `--accent` | `#6366f1` (Índigo) | `#4f46e5` (Índigo Escuro) | Cor de destaque, idêntica à secundária. |
| `--destructive` | `#be123c` (Vinho) | `#dc2626` (Vermelho) | Ações destrutivas e alertas críticos. |
| `--background` | `#f8fafc` (Cinza Bem Claro) | `#0f172a` (Azul Escuro) | Cor de fundo principal da aplicação. |
| `--card` | `#ffffff` (Branco) | `#1e293b` (Azul Ardósia) | Cor de fundo para componentes como cards. |
| `--border` | `#e5e7eb` (Cinza Claro) | `#334155` (Cinza Azulado) | Bordas de componentes e separadores. |
| `--radius` | `0.25rem` | `0.25rem` | Raio de borda principal (cantos mais retos). |

**Cores para Gráficos (`--chart-*`):**
- A paleta para gráficos inclui índigo, rosa, vinho, ciano escuro e cinza, alinhada à identidade visual do sistema.

### 3.3. Tipografia e Espaçamento

- **Fonte Principal**: `GeistSans` (variável `--font-sans`).
- **Fonte Monoespaçada**: `GeistMono` (variável `--font-mono`).
- **Raio de Borda**: O `border-radius` padrão de `0.25rem` cria componentes com cantos mais agudos, reforçando a estética formal e estruturada do sistema.

---

## 4. Conclusão Comparativa

| Atributo | `sgc-ts` (Financeiro) | `siga-pc` (Governamental) |
| :--- | :--- | :--- |
| **Identidade** | Moderna, positiva, crescimento | Formal, corporativa, autoridade |
| **Cor Primária** | Verde (`#059669`) | Cinza Escuro (`#374151`) |
| **Cor de Destaque** | Verde Claro (`#10b981`) | Índigo (`#6366f1`) |
| **`border-radius`** | `0.5rem` (mais arredondado) | `0.25rem` (mais reto) |

Embora ambos os projetos partam da mesma base tecnológica (`shadcn/ui` com estilo "New York"), eles demonstram como a customização de cores e o ajuste fino de propriedades como o `border-radius` podem criar duas identidades visuais completamente distintas e alinhadas aos seus respectivos domínios de aplicação.
