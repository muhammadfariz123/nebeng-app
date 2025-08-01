// app/customer/layout.tsx
import React from 'react'
import Sidebar from '@/components/SidebarCustomer'
import Navbar from '@/components/NavbarCustomer'

export default function CustomerLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Navbar />
        <main className="flex-1 overflow-y-auto bg-gray-50 p-6">
          {children}
        </main>
      </div>
    </div>
  )
}
