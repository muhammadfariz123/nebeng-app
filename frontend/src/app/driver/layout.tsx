"use client"

import SidebarDriver from '@/components/SidebarDriver'

export default function DriverLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen">
      <SidebarDriver />
      <main className="flex-1 p-6 bg-gray-50 overflow-auto">
        {children}
      </main>
    </div>
  )
}
