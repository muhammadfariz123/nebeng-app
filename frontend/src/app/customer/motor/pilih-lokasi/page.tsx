'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { ArrowLeft, Search } from 'lucide-react'
import { useEffect, useState } from 'react'
import axios from 'axios'

interface Terminal {
  id: number
  name: string
  full_address: string
  province_name?: string
  regency_name?: string
  district_name?: string
}

export default function PilihLokasiPage() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const tipe = searchParams.get('tipe') // 'dari' atau 'ke'
  const dari = searchParams.get('dari') || ''
  const ke = searchParams.get('ke') || ''

  const [locations, setLocations] = useState<Terminal[]>([])
  const [filtered, setFiltered] = useState<Terminal[]>([])
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(true)

  // Fetch lokasi dari backend
  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const res = await axios.get<Terminal[]>('http://localhost:3001/superadmin/terminals')
        setLocations(res.data)
        setFiltered(res.data)
      } catch (err) {
        console.error('Gagal mengambil data lokasi', err)
      } finally {
        setLoading(false)
      }
    }
    fetchLocations()
  }, [])

  // Filter saat user mengetik
  useEffect(() => {
    const lower = search.toLowerCase()
    setFiltered(
      locations.filter(
        (loc) =>
          loc.name.toLowerCase().includes(lower) ||
          (loc.full_address || '').toLowerCase().includes(lower)
      )
    )
  }, [search, locations])

  const handleSelect = (lokasi: string) => {
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
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {/* List lokasi */}
      <div className="mt-4 px-4">
        {loading && <p className="text-gray-500">Memuat lokasi...</p>}
        {!loading && filtered.length === 0 && (
          <p className="text-gray-500">Tidak ada lokasi ditemukan</p>
        )}
        {filtered.map((loc) => (
          <div
            key={loc.id}
            onClick={() => handleSelect(loc.name)}
            className="border-b py-4 cursor-pointer hover:bg-gray-100 transition"
          >
            <h2 className="font-semibold text-sm">{loc.name}</h2>
            <p className="text-xs text-gray-500 leading-tight">
              {loc.full_address ||
                `${loc.district_name || ''}, ${loc.regency_name || ''}, ${loc.province_name || ''}`}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}
