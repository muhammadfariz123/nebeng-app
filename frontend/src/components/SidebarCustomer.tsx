"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { cn } from "@/lib/utils"
import { LogOut, X } from "lucide-react"
import { useState, useEffect } from "react"

// Import SVG icons (normal & active versions)
import BerandaIcon from "@/components/icons/beranda.svg"
import BerandaIconActive from "@/components/icons/beranda2.svg"
import RiwayatIcon from "@/components/icons/riwayat.svg"
import RiwayatIconActive from "@/components/icons/riwayat2.svg"
import ChatIcon from "@/components/icons/chat.svg"
import ChatIconActive from "@/components/icons/chat2.svg"
import ProfileIcon from "@/components/icons/profile.svg"
import ProfileIconActive from "@/components/icons/profile2.svg"

const menu = [
  { href: "/customer", label: "Beranda", icon: BerandaIcon, iconActive: BerandaIconActive },
  { href: "/customer/riwayat", label: "Riwayat", icon: RiwayatIcon, iconActive: RiwayatIconActive },
  { href: "/customer/chat", label: "Chat", icon: ChatIcon, iconActive: ChatIconActive },
  { href: "/customer/profile", label: "Profile", icon: ProfileIcon, iconActive: ProfileIconActive },
]

export default function SidebarCustomer({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean
  setIsOpen: (open: boolean) => void
}) {
  const pathname = usePathname()
  const router = useRouter()
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024) // breakpoint < lg
    }
    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  const handleLogout = () => {
    localStorage.removeItem("nebeng_token")
    localStorage.removeItem("nebeng_user")
    router.push("/login")
  }

  return (
    <aside
      className={cn(
        "fixed lg:static top-0 left-0 h-full w-64 bg-white border-r p-4 z-50 transform transition-transform duration-300 ease-in-out shadow-lg lg:shadow-none",
        isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
      )}
    >
      {/* Tombol close di mobile */}
      {isMobile && (
        <button
          onClick={() => setIsOpen(false)}
          className="absolute top-4 right-4 text-gray-500 hover:text-black"
        >
          <X className="w-5 h-5" />
        </button>
      )}

      <h2 className="text-xl font-bold mb-6">Customer</h2>
      <nav className="space-y-2">
        {menu.map((item) => {
          const isActive = pathname === item.href
          const IconComponent = isActive ? item.iconActive : item.icon
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => isMobile && setIsOpen(false)}
              className={cn(
                "flex items-center px-4 py-2 rounded transition cursor-pointer",
                isActive
                  ? "bg-blue-500 text-white font-semibold"
                  : "text-gray-700 hover:bg-gray-100"
              )}
            >
              <IconComponent
                className={cn(
                  "w-5 h-5 mr-3 transition-colors",
                  isActive ? "text-black" : "text-gray-500"
                )}
              />
              {item.label}
            </Link>
          )
        })}

        <button
          onClick={handleLogout}
          className="w-full text-left flex items-center px-4 py-2 mt-6 rounded hover:bg-red-100 text-red-600 font-medium cursor-pointer"
        >
          <LogOut className="w-5 h-5 mr-3 transition-colors text-gray-500 hover:text-black" />
          Keluar
        </button>
      </nav>
    </aside>
  )
}
