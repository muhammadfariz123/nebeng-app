'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { ChevronDownIcon, UserIcon, BellIcon, LogOutIcon } from 'lucide-react'
import Image from 'next/image'

export default function NavbarCustomer() {
  const [customerName] = useState('Putri Ayu') // Ganti dengan data dari auth session
  const router = useRouter()

  const handleLogout = () => {
    // TODO: Tambahkan fungsi logout
    router.push('/login')
  }

  return (
    <div className="w-full bg-white shadow-sm px-6 py-3 flex justify-between items-center">
      {/* Logo atau Judul */}
      <div className="text-xl font-bold text-primary">Nebeng</div>

      {/* Right: Notification dan Dropdown */}
      <div className="flex items-center gap-4">
        {/* Notifikasi */}
        <button className="relative">
          <BellIcon className="w-6 h-6 text-gray-600" />
          <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>

        {/* Dropdown Profile */}
        <Menu as="div" className="relative">
          <MenuButton className="flex items-center gap-2 focus:outline-none">
            <Image
              src="/user-placeholder.png"
              alt="Avatar"
              width={32}
              height={32}
              className="rounded-full object-cover"
            />
            <span className="text-sm font-medium text-gray-700">{customerName}</span>
            <ChevronDownIcon className="w-4 h-4 text-gray-500" />
          </MenuButton>
          <MenuItems className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-md z-50 py-1 ring-1 ring-black ring-opacity-5 focus:outline-none">
            <MenuItem>
              {({ active }) => (
                <button
                  onClick={() => router.push('/customer/profile')}
                  className={`w-full text-left px-4 py-2 text-sm ${
                    active ? 'bg-gray-100' : ''
                  } flex items-center gap-2`}
                >
                  <UserIcon className="w-4 h-4" />
                  Profil Saya
                </button>
              )}
            </MenuItem>
            <MenuItem>
              {({ active }) => (
                <button
                  onClick={handleLogout}
                  className={`w-full text-left px-4 py-2 text-sm text-red-600 ${
                    active ? 'bg-gray-100' : ''
                  } flex items-center gap-2`}
                >
                  <LogOutIcon className="w-4 h-4" />
                  Keluar
                </button>
              )}
            </MenuItem>
          </MenuItems>
        </Menu>
      </div>
    </div>
  )
}
