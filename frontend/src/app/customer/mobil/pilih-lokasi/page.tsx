'use client'

import { useRouter } from 'next/navigation'
import {
  ArrowLeft,
  MapPin,
  Clock,
  DollarSign,
  Info,
  Calendar,
  User,
  ShieldCheck,
  Car,
  Users,
} from 'lucide-react'
import { useEffect, useState } from 'react'
import axios from 'axios'

interface Driver {
  id: number
  username: string
  email?: string
}

interface Tebengan {
  id: number
  asal: string
  tujuan: string
  waktu: string
  harga: number
  type: string
  driverId: number
  jumlahPenumpang: number | null
  driver?: Driver
}

export default function PilihLokasiMobilPage() {
  const router = useRouter()
  const [tebenganList, setTebenganList] = useState<Tebengan[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchTebengan = async () => {
      try {
        const res = await axios.get<Tebengan[]>('http://localhost:3001/tebengan')
        const list = (res.data || []).filter((t) => t.type === 'mobil')

        // Pastikan data driver tersedia (ambil dari endpoint jika belum ada)
        const withDriverData = await Promise.all(
          list.map(async (teb) => {
            if (teb.driver && teb.driver.username) return teb
            try {
              const driverRes = await axios.get<{ username: string }>(
                `http://localhost:3001/driver/${teb.driverId}`
              )
              return { ...teb, driver: { username: driverRes.data.username, id: teb.driverId } }
            } catch {
              return { ...teb, driver: { username: 'Tidak diketahui', id: teb.driverId } }
            }
          })
        )

        setTebenganList(withDriverData)
      } catch (err) {
        console.error('❌ Gagal mengambil data tebengan mobil:', err)
        setError('Gagal memuat daftar tebengan mobil.')
      } finally {
        setLoading(false)
      }
    }

    fetchTebengan()
  }, [])

  const handleSelect = (teb: Tebengan) => {
    const params = new URLSearchParams({
      dari: teb.asal,
      ke: teb.tujuan,
      tanggal: teb.waktu,
      penumpang: (teb.jumlahPenumpang ?? 1).toString(),
    })
    router.push(`/customer/mobil?${params.toString()}`)
  }

  const formatTanggalDanJam = (waktu: string) => {
    const date = new Date(waktu)
    const tanggal = date.toLocaleDateString('id-ID', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
    const jam = date.toLocaleTimeString('id-ID', {
      hour: '2-digit',
      minute: '2-digit',
    })
    return { tanggal, jam }
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="flex items-center px-4 pt-6 pb-3 border-b bg-gray-50">
        <button
          className="p-2 rounded-full hover:bg-gray-200 transition"
          onClick={() => router.back()}
        >
          <ArrowLeft />
        </button>
        <h1 className="ml-3 text-lg font-semibold text-gray-800">Pilih Tebengan Mobil</h1>
      </div>

      {/* Info Section */}
      <div className="px-4 py-4 bg-blue-50 border-b border-blue-100">
        <div className="flex items-start gap-3">
          <Info className="w-5 h-5 text-blue-600 mt-[2px]" />
          <p className="text-sm text-blue-700 leading-relaxed">
            Berikut adalah daftar <strong>tebengan mobil</strong> yang sedang tersedia dan siap
            berangkat. Kamu dapat memilih berdasarkan rute, waktu keberangkatan, dan kapasitas
            penumpang yang sesuai.
            <br />
            Semua driver yang tertera <strong>telah terverifikasi</strong> dalam sistem.
          </p>
        </div>
      </div>

      {/* Daftar Tebengan Mobil */}
      <div className="px-4 py-4">
        {loading && <p className="text-gray-500 text-sm">Memuat daftar tebengan mobil...</p>}
        {error && <p className="text-red-500 text-sm">{error}</p>}

        {!loading && tebenganList.length > 0 && (
          <div className="space-y-3">
            {tebenganList.map((teb) => {
              const { tanggal, jam } = formatTanggalDanJam(teb.waktu)
              return (
                <div
                  key={teb.id}
                  onClick={() => handleSelect(teb)}
                  className="border rounded-xl p-4 shadow-sm hover:bg-gray-50 transition cursor-pointer"
                >
                  {/* Rute */}
                  <div className="flex items-center gap-2 mb-1">
                    <MapPin className="w-4 h-4 text-blue-500" />
                    <span className="text-sm font-medium text-gray-800">
                      {teb.asal} → {teb.tujuan}
                    </span>
                  </div>

                  {/* Nama Driver */}
                  <div className="flex items-center gap-2 mt-1 text-xs text-gray-600">
                    <User className="w-3 h-3" />
                    <span>
                      <strong>Driver:</strong> {teb.driver?.username || 'Tidak diketahui'}
                    </span>
                    <ShieldCheck className="w-3 h-3 text-green-600" />
                    <span className="text-[11px] text-green-600">Terverifikasi</span>
                  </div>

                  {/* Jenis Tebengan */}
                  <div className="flex items-center gap-2 mt-1 text-xs text-gray-600">
                    <Car className="w-3 h-3" />
                    <span>
                      <strong>Jenis Tebengan:</strong> {teb.type}
                    </span>
                  </div>

                  {/* Kapasitas Penumpang */}
                  <div className="flex items-center gap-2 mt-1 text-xs text-gray-600">
                    <Users className="w-3 h-3 text-blue-600" />
                    <span>
                      <strong>Kapasitas Penumpang:</strong>{' '}
                      {teb.jumlahPenumpang ? `${teb.jumlahPenumpang} orang` : 'Tidak diketahui'}
                    </span>
                  </div>

                  {/* Waktu */}
                  <div className="flex flex-col sm:flex-row sm:items-center sm:gap-4 mt-2 text-xs text-gray-600">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      <span>
                        <strong>Tanggal:</strong> {tanggal}
                      </span>
                    </div>
                    <div className="flex items-center gap-1 mt-1 sm:mt-0">
                      <Clock className="w-3 h-3" />
                      <span>
                        <strong>Jam:</strong> {jam}
                      </span>
                    </div>
                  </div>

                  {/* Harga */}
                  <div className="flex items-center gap-1 mt-2 text-xs text-gray-600">
                    <DollarSign className="w-3 h-3" />
                    <span>
                      <strong>Biaya Tebengan:</strong> Rp {teb.harga.toLocaleString('id-ID')}
                    </span>
                  </div>

                  {/* Catatan */}
                  <p className="text-[11px] mt-2 text-gray-400 italic">
                    Pastikan kamu datang tepat waktu di titik keberangkatan ya 🙂
                  </p>
                </div>
              )
            })}
          </div>
        )}

        {!loading && tebenganList.length === 0 && !error && (
          <p className="text-center text-gray-500 text-sm">
            Belum ada tebengan mobil yang tersedia.
          </p>
        )}
      </div>
    </div>
  )
}
