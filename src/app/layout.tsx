// src/app/layout.tsx
import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Nebeng App',
  description: 'Aplikasi manajemen transportasi bersama',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id">
      <body className="bg-[#F5F7FA] font-sans">{children}</body>
    </html>
  )
}
