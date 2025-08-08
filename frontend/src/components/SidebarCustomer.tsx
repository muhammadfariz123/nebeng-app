"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { cn } from "@/lib/utils"
import { LogOut } from "lucide-react"

// Import SVG icons as React components
import BerandaIcon from "@/components/icons/beranda.svg"
import RiwayatIcon from "@/components/icons/riwayat.svg"
import ChatIcon from "@/components/icons/chat.svg"
import ProfileIcon from "@/components/icons/profile.svg"

const menu = [
  {
    href: "/customer",
    label: "Beranda",
    icon: <BerandaIcon className="w-5 h-5 mr-3" />,
  },
  {
    href: "/customer/riwayat",
    label: "Riwayat",
    icon: <RiwayatIcon className="w-5 h-5 mr-3" />,
  },
  {
    href: "/customer/chat",
    label: "Chat",
    icon: <ChatIcon className="w-5 h-5 mr-3" />,
  },
  {
    href: "/customer/profile",
    label: "Profile",
    icon: <ProfileIcon className="w-5 h-5 mr-3" />,
  },
]

export default function SidebarCustomer() {
  const pathname = usePathname()
  const router = useRouter()

  const handleLogout = () => {
    localStorage.removeItem("nebeng_token")
    localStorage.removeItem("nebeng_user")
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
              pathname === item.href
                ? "bg-gray-200 font-semibold"
                : "text-gray-700"
            )}
          >
            {item.icon}
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
