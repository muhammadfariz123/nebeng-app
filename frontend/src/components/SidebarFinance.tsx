'use client'

import { usePathname, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import {
  FaHome, FaExchangeAlt, FaMoneyBillWave,
  FaDollarSign, FaUserTie, FaFileInvoice, FaCog, FaSignOutAlt
} from 'react-icons/fa'

export default function FinanceSidebar() {
  const router = useRouter()
  const pathname = usePathname()

  const handleClick = (path: string) => router.push(path)
  const isActive = (path: string) => pathname === path

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 bg-white border-r border-gray-100 flex flex-col justify-between z-50 shadow-sm">
      {/* Logo */}
      <div className="p-6 text-xl font-extrabold text-blue-600 tracking-tight">nebeng</div>

      {/* Menu Navigasi */}
      <nav className="flex-1 px-4 space-y-1 text-[15px] font-medium">
        <button onClick={() => handleClick('/finance')} className={navStyle(isActive('/finance'))}>
          <FaHome className="text-[16px]" /> Beranda
        </button>

        <button onClick={() => handleClick('/finance/transaksi')} className={navStyle(isActive('/finance/transaksi'))}>
          <FaExchangeAlt className="text-[16px]" /> Transaksi
        </button>

        <button onClick={() => handleClick('/finance/pendapatan')} className={navStyle(isActive('/finance/pendapatan'))}>
          <FaMoneyBillWave className="text-[16px]" /> Pendapatan
        </button>

        <button onClick={() => handleClick('/finance/tarif')} className={navStyle(isActive('/finance/tarif'))}>
          <FaDollarSign className="text-[16px]" /> Tarif
        </button>

        <button onClick={() => handleClick('/finance/mitra')} className={navStyle(isActive('/finance/mitra'))}>
          <FaUserTie className="text-[16px]" /> Mitra
        </button>

        <button onClick={() => handleClick('/finance/refund')} className={navStyle(isActive('/finance/refund'))}>
          <FaFileInvoice className="text-[16px]" /> Refund
        </button>
      </nav>

      {/* Footer */}
      <div className="px-4 pb-4 space-y-2 text-sm">
        <button onClick={() => handleClick('/finance/pengaturan')} className="flex items-center gap-3 w-full px-4 py-2 rounded-lg text-gray-500 hover:bg-gray-100">
          <FaCog className="text-[16px]" /> Pengaturan
        </button>
        <button onClick={() => handleClick('/login')} className="flex items-center gap-3 w-full px-4 py-2 rounded-lg text-gray-500 hover:bg-gray-100">
          <FaSignOutAlt className="text-[16px]" /> Keluar
        </button>
      </div>
    </aside>
  )
}

function navStyle(active: boolean) {
  return `cursor-pointer flex items-center gap-3 w-full text-left px-4 py-2 rounded-lg transition ${
    active ? 'text-blue-600 bg-blue-50 font-semibold' : 'text-gray-600 hover:bg-gray-100'
  }`
}
