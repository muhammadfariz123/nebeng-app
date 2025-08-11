'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { ArrowLeft, Search } from 'lucide-react'

const dummyLocations = [
  'YOGYAKARTA POS 1',
  'YOGYAKARTA POS 2',
  'SOLO POS 1',
  'SEMARANG POS 1',
  'JAKARTA POS 5',
]

export default function PilihLokasiPage() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const tipe = searchParams.get('tipe') // 'dari' atau 'ke'
  const dari = searchParams.get('dari') || ''
  const ke = searchParams.get('ke') || ''

  const handleSelect = (lokasi: string) => {
    // Kembali ke halaman utama dengan query parameter baru
    const newParams =
      tipe === 'dari'
        ? `?dari=${encodeURIComponent(lokasi)}&ke=${encodeURIComponent(ke)}`
        : `?dari=${encodeURIComponent(dari)}&ke=${encodeURIComponent(lokasi)}`
    router.push(`/customer/motor${newParams}`)
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Search bar */}
      <div className="px-4 pt-6 flex items-center gap-3">
        <button
          className="p-2 rounded-full hover:bg-gray-100 transition"
          onClick={() => router.back()}
        >
          <ArrowLeft />
        </button>
        <div className="flex-1 bg-gray-100 rounded-full px-4 py-2 flex items-center gap-2">
          <Search className="w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Cari lokasi anda"
            className="bg-transparent outline-none text-sm flex-1"
          />
        </div>
      </div>

        {/* List lokasi */}
      <div className="mt-4 px-4">
        {dummyLocations.map((lokasi, index) => (
          <div
            key={index}
            onClick={() => handleSelect(lokasi)}
            className="border-b py-4 cursor-pointer hover:bg-gray-100 transition"
          >
            <h2 className="font-semibold text-sm">{lokasi}</h2>
            <p className="text-xs text-gray-500 leading-tight">
              PATEHAN, KECAMATAN KRATON, KOTA YOGYAKARTA, DAERAH ISTIMEWA YOGYAKARTA 55133
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}
