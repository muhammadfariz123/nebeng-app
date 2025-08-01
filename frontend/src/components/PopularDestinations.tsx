'use client'

import Image from 'next/image'
import { FaFireAlt } from '@react-icons/all-files/fa/FaFireAlt'

type Route = {
  no: number
  name: string
  jumlah: number
  image?: string
}

const routes: Route[] = [
  { no: 1, name: 'Yogyakarta - Jakarta', jumlah: 1000, image: '/popular.jpg' },
  { no: 2, name: 'Yogyakarta - Solo', jumlah: 700 },
  { no: 3, name: 'Yogyakarta - Malang', jumlah: 500 },
  { no: 4, name: 'Yogyakarta - Semarang', jumlah: 200 },
  { no: 5, name: 'Yogyakarta - Purwokerto', jumlah: 100 },
  { no: 6, name: 'Yogyakarta - Surabaya', jumlah: 40 }
]

export function PopularDestinations() {
  const topRoute = routes[0]

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-sm font-semibold text-gray-900">Tujuan Populer</h3>
        <a href="#" className="text-xs text-blue-600 hover:underline">Lihat Semua</a>
      </div>

      {/* Top 1 destination card */}
      <div className="relative mb-6 overflow-hidden rounded-lg h-[110px]">
        <Image
          src={topRoute.image ?? '/fallback.jpg'}
          alt={topRoute.name}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 400px"
        />
        <div className="absolute top-2 left-2 flex items-center gap-1 bg-white text-orange-500 font-bold text-[11px] px-2 py-[2px] rounded-full shadow-sm">
          <FaFireAlt className="text-xs" />
          <span>1</span>
        </div>
        <div className="absolute bottom-2 left-2 text-white font-medium drop-shadow text-[11px]">
          <p>{topRoute.name}</p>
        </div>
        <div className="absolute bottom-2 right-2 text-white font-semibold drop-shadow text-[11px]">
          {topRoute.jumlah.toLocaleString()} Perjalanan
        </div>
      </div>

      {/* Rest of the list */}
      <ul className="text-xs space-y-2">
        {routes.slice(1).map((r, i) => (
          <li
            key={r.no}
            className={`flex justify-between ${
              i >= 3 ? 'text-gray-400' : 'text-gray-800'
            }`}
          >
            <span>{r.no}. {r.name}</span>
            <span>{r.jumlah.toLocaleString()} Perjalanan</span>
          </li>
        ))}
      </ul>
    </div>
  )
}
