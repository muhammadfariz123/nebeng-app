import React from 'react'
import Sidebar from '@/components/SidebarSuperadmin'

export default function SuperAdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex">
      <Sidebar />
      <main className="pl-64 min-h-screen bg-gray-50 p-6 overflow-y-auto flex-1">
        {children}
      </main>
    </div>
  )
}
