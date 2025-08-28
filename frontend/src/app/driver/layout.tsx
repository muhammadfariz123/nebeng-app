"use client"

import SidebarDriver from '@/components/SidebarDriver'

export default function DriverLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <SidebarDriver />
      
      {/* Konten Utama */}
      <main className="flex-1 p-6 bg-gray-50 overflow-y-auto ml-64">
        {children}
      </main>
    </div>
  )
}
