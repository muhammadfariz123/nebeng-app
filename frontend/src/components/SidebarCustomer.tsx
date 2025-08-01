// components/SidebarCustomer.tsx
"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { cn } from "@/lib/utils"
import { Home, PackageSearch, CreditCard, Bell, User, LogOut, History, Send, Star } from "lucide-react"

const menu = [
  { href: "/customer", icon: Home, label: "Beranda" },
  { href: "/customer/book-ride", icon: PackageSearch, label: "Pesan Kursi" },
  { href: "/customer/send-package", icon: Send, label: "Kirim Barang" },
  { href: "/customer/bookings", icon: History, label: "Riwayat Pemesanan" },
  { href: "/customer/transactions", icon: CreditCard, label: "Transaksi" },
  { href: "/customer/wallet", icon: CreditCard, label: "Dompet Kredit" },
  { href: "/customer/ratings", icon: Star, label: "Rating & Ulasan" },
  { href: "/customer/notifications", icon: Bell, label: "Notifikasi" },
  { href: "/customer/profile", icon: User, label: "Profil Saya" },
]

export default function SidebarCustomer() {
  const pathname = usePathname()
  const router = useRouter()

  const handleLogout = () => {
    // Hapus status login dari localStorage atau cookie
    localStorage.removeItem("nebeng_token")
    localStorage.removeItem("nebeng_user")
    // Arahkan ke login
    router.push("/login")
  }

  return (
    <aside className="w-64 min-h-screen bg-white border-r p-4">
      <h2 className="text-xl font-bold mb-6">Customer</h2>
      <nav className="space-y-2">
        {menu.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex items-center px-4 py-2 rounded hover:bg-gray-100 transition",
              pathname === item.href ? "bg-gray-200 font-semibold" : "text-gray-700"
            )}
          >
            <item.icon className="w-5 h-5 mr-3" />
            {item.label}
          </Link>
        ))}

        <button
          onClick={handleLogout}
          className="w-full text-left flex items-center px-4 py-2 mt-6 rounded hover:bg-red-100 text-red-600 font-medium"
        >
          <LogOut className="w-5 h-5 mr-3" />
          Keluar
        </button>
      </nav>
    </aside>
  )
}
