'use client'

import { usePathname, useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'
import {
  FaHome,
  FaUserFriends,
  FaUsers,
  FaFileAlt,
  FaMoneyBill,
  FaChartBar,
  FaSignOutAlt,
  FaAngleDown,
  FaAngleUp,
} from 'react-icons/fa'

export default function Sidebar() {
  const router = useRouter()
  const pathname = usePathname()
  const [mitraOpen, setMitraOpen] = useState(false)

  useEffect(() => {
    if (pathname?.startsWith('/admin/mitra')) {
      setMitraOpen(true)
    }
  }, [pathname])

  const handleClick = (path: string) => {
    router.push(path)
  }

  const handleLogout = () => {
    localStorage.removeItem('user') // atau key lain yang kamu gunakan
    // bisa tambahkan localStorage.clear() jika semua perlu dihapus
    router.push('/login')
  }

  const isActive = (path: string) => pathname === path
  const isMitraActive = pathname?.startsWith('/admin/mitra')

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 bg-white shadow border-r border-gray-100 flex flex-col justify-between z-50">
      {/* Logo dan Menu */}
      <div className="flex-1 overflow-y-auto">
        {/* Logo */}
        <div className="p-6 text-xl font-extrabold text-blue-600 tracking-tight">
          nebeng
        </div>

        {/* Menu Navigasi */}
        <nav className="px-4 space-y-1 text-[15px] font-medium">
          <button
            onClick={() => handleClick('/admin')}
            className={`cursor-pointer flex items-center gap-3 w-full text-left px-4 py-2 rounded-lg transition ${
              isActive('/admin') ? 'text-blue-600 bg-blue-50 font-semibold' : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <FaHome className="text-[16px]" /> Beranda
          </button>

          {/* Mitra */}
          <div>
            <button
              onClick={() => setMitraOpen(!mitraOpen)}
              className={`cursor-pointer flex items-center gap-3 w-full text-left px-4 py-2 rounded-lg transition ${
                isMitraActive ? 'text-blue-600 bg-blue-50 font-semibold' : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <FaUserFriends className="text-[16px]" /> Mitra
              {mitraOpen ? <FaAngleUp className="ml-auto text-gray-400" /> : <FaAngleDown className="ml-auto text-gray-400" />}
            </button>
            {mitraOpen && (
              <div className="ml-8 mt-2 space-y-1 text-sm">
                {[
                  { label: 'Semua', path: '/admin/mitra/semua' },
                  { label: 'Pendaftar', path: '/admin/mitra/pendaftar' },
                  { label: 'Kendaraan', path: '/admin/mitra/kendaraan' },
                  { label: 'Dokumen', path: '/admin/mitra/dokumen' },
                ].map(({ label, path }) => (
                  <button
                    key={path}
                    onClick={() => handleClick(path)}
                    className={`cursor-pointer block w-full text-left px-2 py-1 rounded ${
                      isActive(path) ? 'text-blue-600 font-semibold' : 'text-gray-500 hover:text-blue-500'
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>
            )}
          </div>

          <button
            onClick={() => handleClick('/admin/customer')}
            className={`cursor-pointer flex items-center gap-3 w-full text-left px-4 py-2 rounded-lg transition ${
              isActive('/admin/customer') ? 'text-blue-600 bg-blue-50 font-semibold' : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <FaUsers className="text-[16px]" /> Customer
          </button>

          <button
            onClick={() => handleClick('/admin/pesanan')}
            className={`cursor-pointer flex items-center gap-3 w-full text-left px-4 py-2 rounded-lg transition ${
              isActive('/admin/pesanan') ? 'text-blue-600 bg-blue-50 font-semibold' : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <FaFileAlt className="text-[16px]" /> Pesanan
          </button>

          <button
            onClick={() => handleClick('/admin/refund')}
            className={`cursor-pointer flex items-center gap-3 w-full text-left px-4 py-2 rounded-lg transition ${
              isActive('/admin/refund') ? 'text-blue-600 bg-blue-50 font-semibold' : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <FaMoneyBill className="text-[16px]" /> Refund
          </button>

          <button
            onClick={() => handleClick('/admin/laporan')}
            className={`cursor-pointer flex items-center gap-3 w-full text-left px-4 py-2 rounded-lg transition ${
              isActive('/admin/laporan') ? 'text-blue-600 bg-blue-50 font-semibold' : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <FaChartBar className="text-[16px]" /> Laporan
          </button>
        </nav>
      </div>

      {/* Footer / Logout */}
      <div className="px-4 pb-4 space-y-2 text-sm">
        <button
        
          onClick={handleLogout}
          className="cursor-pointer flex items-center gap-3 w-full text-left px-4 py-2 rounded-lg text-gray-500 hover:bg-gray-100"
        >
          <FaSignOutAlt className="text-[16px]" /> Keluar
        </button>
      </div>
    </aside>
  )
}
