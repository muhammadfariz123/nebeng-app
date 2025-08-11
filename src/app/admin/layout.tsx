import Sidebar from "@/components/Sidebar"
import Navbar from "@/components/Navbar"

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar kiri */}
      <Sidebar />

      {/* Konten kanan */}
      <div className="flex flex-col flex-1 ml-64">
        {/* Navbar atas */}
        <Navbar />

        {/* Konten halaman (diberi padding-top agar tidak tertimpa navbar) */}
        <main className="flex-1 p-6 pt-24 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  )
}
