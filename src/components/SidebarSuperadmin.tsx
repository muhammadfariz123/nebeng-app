'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import {
  Users,
  Car,
  Package,
  Banknote,
  Settings,
  MapPinned,
  House,
  Star,
  Bell,
  Layers3,
  LogOut,
} from 'lucide-react'

const menu = [
  { href: '/superadmin', icon: House, label: 'Beranda' },
  { href: '/superadmin/users', icon: Users, label: 'Kelola Pengguna' },
  { href: '/superadmin/terminals', icon: MapPinned, label: 'Terminal' },
  { href: '/superadmin/pricing/passenger', icon: Car, label: 'Tarif Penumpang' },
  { href: '/superadmin/goods-pricing', icon: Package, label: 'Tarif Barang' },
  { href: '/superadmin/transactions', icon: Banknote, label: 'Transaksi' },
  { href: '/superadmin/ratings', icon: Star, label: 'Rating' },
  { href: '/superadmin/sliders', icon: Layers3, label: 'Slider Beranda' },
  { href: '/superadmin/destinations', icon: MapPinned, label: 'Tujuan Populer' },
  { href: '/superadmin/notifications', icon: Bell, label: 'Notifikasi' },
  { href: '/superadmin/settings', icon: Settings, label: 'Pengaturan' },
]

export default function Sidebar() {
  const pathname = usePathname()
  const router = useRouter()

  const handleLogout = () => {
    localStorage.removeItem('token')
    router.push('/')
  }

  return (
    <aside className="fixed top-0 left-0 h-screen w-64 bg-white shadow-md border-r flex flex-col justify-between z-30">
      <div className="overflow-y-auto p-4 pb-2">
        <div className="text-xl font-bold mb-6">Superadmin</div>
        <ul className="space-y-2">
          {menu.map(({ href, icon: Icon, label }) => {
            const isActive =
              pathname === href || (href !== '/superadmin' && pathname.startsWith(href))
            return (
              <li key={href}>
                <Link
                  href={href}
                  className={`flex items-center gap-3 p-2 rounded transition-colors text-sm font-medium ${
                    isActive
                      ? 'bg-gray-200 text-black font-semibold'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  {label}
                </Link>
              </li>
            )
          })}
        </ul>
      </div>

      <div className="p-4 border-t">
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 p-2 w-full text-left rounded text-red-600 hover:bg-red-100 transition-colors text-sm"
        >
          <LogOut className="w-5 h-5" />
          Keluar
        </button>
      </div>
    </aside>
  )
}
