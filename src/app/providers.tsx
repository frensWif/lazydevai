
'use client'

import { ThemeProvider } from '@/components/theme-provider'
import { AuthProvider } from '@/context/AuthContext'
import { Toaster } from "sonner"
import { ReactNode } from 'react'

export function Providers({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <AuthProvider>
        {children}
        <Toaster />
      </AuthProvider>
    </ThemeProvider>
  )
}
