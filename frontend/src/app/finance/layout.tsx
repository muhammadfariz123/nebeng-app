import FinanceSidebar from '@/components/SidebarFinance'

export default function FinanceLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex">
      <FinanceSidebar />
      <main className="ml-64 w-full min-h-screen bg-gray-50 p-6">
        {children}
      </main>
    </div>
  )
}
