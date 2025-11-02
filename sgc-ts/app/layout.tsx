import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import { AuthProvider } from "@/components/auth-provider"
import { Toaster } from "@/components/ui/toaster"
import { Suspense } from "react"
import { QueryProvider } from "@/components/query-provider"
import { AppLayout } from "@/components/layout/app-layout"
import { DataPrefetcher } from "@/components/data-prefetcher"
import "./globals.css"

export const metadata: Metadata = {
  title: "SGC-TS - Sistema de Gestão e Prestação de Contas",
  description: "Sistema completo para gestão financeira do terceiro setor",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR">
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable}`}>
        <Suspense fallback={null}>
          <AuthProvider>
            <QueryProvider>
              <DataPrefetcher />
              <AppLayout>{children}</AppLayout>
              <Toaster />
            </QueryProvider>
          </AuthProvider>
        </Suspense>
        <Analytics />
      </body>
    </html>
  )
}
