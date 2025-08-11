"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import {
  Home, Bus, Truck, History, CreditCard, Wallet, Star, Bell, User, LogOut
} from "lucide-react"

const menu = [
  { href: "/driver", icon: Home, label: "Beranda" },
  { href: "/driver/rides/passenger", icon: Bus, label: "Perjalanan Penumpang" },
  { href: "/driver/rides/goods", icon: Truck, label: "Perjalanan Barang" },
  { href: "/driver/bookings/passenger", icon: History, label: "Booking Penumpang" },
  { href: "/driver/bookings/goods", icon: History, label: "Booking Barang" },
  { href: "/driver/transactions", icon: CreditCard, label: "Transaksi" },
  { href: "/driver/commissions", icon: Wallet, label: "Komisi" },
  { href: "/driver/withdrawals", icon: Wallet, label: "Penarikan" },
  { href: "/driver/ratings", icon: Star, label: "Ulasan & Rating" },
  { href: "/driver/notifications", icon: Bell, label: "Notifikasi" },
  { href: "/driver/profile", icon: User, label: "Profil Saya" },
]

export default function SidebarDriver() {
  const pathname = usePathname()

  return (
    <aside className="w-64 min-h-screen bg-white border-r p-4">
      <h2 className="text-xl font-bold mb-6">Driver</h2>
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
        <Link
          href="/logout"
          className="flex items-center px-4 py-2 mt-6 rounded hover:bg-red-100 text-red-600 font-medium"
        >
          <LogOut className="w-5 h-5 mr-3" />
          Keluar
        </Link>
      </nav>
    </aside>
  )
}
