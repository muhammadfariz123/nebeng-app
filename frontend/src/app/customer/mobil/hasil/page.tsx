'use client'

import { useEffect, useState } from 'react'
import { ArrowLeft, User2, MapPin, Calendar, Clock, CarFront } from 'lucide-react'
import Link from 'next/link'
import axios from 'axios'
import { useSearchParams, useRouter } from 'next/navigation'

// 🔹 Interface untuk struktur data
interface Driver {
  id: number
  username: string
  email?: string
  user_type?: string
}

interface TebenganMobil {
  id: number
  asal: string
  tujuan: string
  waktu: string
  harga: number
  type: string
  jumlahPenumpang: number
  driverId: number
  driver?: Driver
}

export default function HasilPencarianMobilPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const dari = searchParams.get('dari') || ''
  const ke = searchParams.get('ke') || ''
  const tanggal = searchParams.get('tanggal') || ''

  const [data, setData] = useState<TebenganMobil[]>([])
  const [filtered, setFiltered] = useState<TebenganMobil[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [showTrips, setShowTrips] = useState(false)
  const [confirmVisible, setConfirmVisible] = useState(true)

  // 🔹 Ambil data tebengan mobil dari backend
  const fetchData = async () => {
    setLoading(true)
    setError(null)
    try {
      const res = await axios.get<TebenganMobil[]>('http://localhost:3001/tebengan?type=mobil')
      setData(res.data)
      setShowTrips(true)
      setConfirmVisible(false)
    } catch (err) {
      console.error('Gagal memuat data:', err)
      setError('Gagal memuat data. Pastikan backend berjalan di port 3001.')
    } finally {
      setLoading(false)
    }
  }

  // 🔹 Filter hasil sesuai parameter pencarian
  useEffect(() => {
    if (data.length > 0) {
      const hasil = data.filter((item) => {
        const tglItem = new Date(item.waktu).toISOString().split('T')[0]
        return (
          item.asal.toLowerCase().includes(dari.toLowerCase()) &&
          item.tujuan.toLowerCase().includes(ke.toLowerCase()) &&
          tglItem === tanggal
        )
      })
      setFiltered(hasil)
    }
  }, [data, dari, ke, tanggal])

  // 🔹 Format tanggal dan jam
  const formatTanggalDanJam = (waktu: string) => {
    const date = new Date(waktu)
    const tanggal = date.toLocaleDateString('id-ID', {
      weekday: 'long',
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    })
    const jam = date.toLocaleTimeString('id-ID', {
      hour: '2-digit',
      minute: '2-digit',
    })
    return { tanggal, jam }
  }

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header */}
      <div className="sticky top-0 z-30 bg-white shadow-sm border-b flex items-center px-4 py-3">
        <button onClick={() => router.back()} className="text-gray-700">
          <ArrowLeft size={22} />
        </button>
        <h1 className="ml-3 text-base font-semibold text-gray-800">
          Hasil Pencarian Tebengan Mobil
        </h1>
      </div>

      {/* Konfirmasi Sebelum Cari */}
      {confirmVisible && (
        <div className="flex flex-col justify-center items-center flex-1 p-6 text-center">
          <div className="border rounded-xl shadow-md p-6 bg-white w-full max-w-sm">
            <MapPin className="w-8 h-8 text-blue-500 mx-auto mb-3" />
            <h2 className="text-lg font-semibold text-gray-800 mb-2">
              Konfirmasi Perjalanan
            </h2>
            <p className="text-sm text-gray-600 mb-4">
              Apakah Anda ingin mencari tebengan dari{' '}
              <span className="font-semibold text-blue-600">{dari}</span> ke{' '}
              <span className="font-semibold text-blue-600">{ke}</span> pada{' '}
              <span className="font-semibold text-blue-600">
                {new Date(tanggal).toLocaleDateString('id-ID', {
                  day: '2-digit',
                  month: 'long',
                  year: 'numeric',
                })}
              </span>
              ?
            </p>

            <div className="flex flex-col gap-2 mt-4">
              <button
                onClick={fetchData}
                className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-lg transition"
              >
                Ya, cari tebengan
              </button>
              <button
                onClick={() => router.push('/customer/mobil/pilih-lokasi')}
                className="bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-2 rounded-lg transition"
              >
                Ubah lokasi
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Loading / Error */}
      {loading && (
        <div className="flex justify-center items-center flex-1 text-gray-500">
          Memuat data tebengan mobil...
        </div>
      )}
      {error && (
        <div className="flex justify-center items-center flex-1 text-red-500">
          {error}
        </div>
      )}

      {/* Daftar Tebengan Mobil */}
      {showTrips && !loading && !error && (
        <div className="flex-1 overflow-y-auto px-4 py-4 bg-white space-y-4">
          <h2 className="text-sm font-semibold text-gray-700 mb-2">
            Pilih tebengan mobil yang sesuai
          </h2>

          {filtered.length === 0 ? (
            <p className="text-center text-gray-500">
              Tidak ditemukan tebengan untuk rute ini.
            </p>
          ) : (
            filtered.map((trip) => {
              const { tanggal, jam } = formatTanggalDanJam(trip.waktu)
              const jamTiba = new Date(new Date(trip.waktu).getTime() + 150 * 60000).toLocaleTimeString('id-ID', {
                hour: '2-digit',
                minute: '2-digit',
              })

              return (
                <Link
                  key={trip.id}
                  href={{
                    pathname: '/customer/mobil/pesan',
                    query: {
                      id: trip.id,
                      asal: trip.asal,
                      tujuan: trip.tujuan,
                      waktu: trip.waktu,
                      harga: trip.harga,
                      driver: trip.driver?.username || 'Tidak Diketahui',
                      jumlahPenumpang: trip.jumlahPenumpang,
                    },
                  }}
                  className="block border rounded-xl p-4 shadow-sm bg-white hover:bg-gray-50 transition"
                >
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="text-sm font-bold text-blue-700">
                      {trip.driver?.username || 'Driver tidak diketahui'}
                    </h3>
                    <span className="text-right">
                      <span className="text-xs text-gray-500">Harga per orang</span>
                      <br />
                      <span className="text-base font-semibold text-black">
                        Rp {trip.harga.toLocaleString('id-ID')}
                      </span>
                    </span>
                  </div>

                  <div className="flex items-center gap-2 text-xs text-gray-600 mb-1">
                    <Calendar className="w-3 h-3" />
                    <span>
                      <strong>Tanggal Keberangkatan:</strong> {tanggal}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-gray-600 mb-2">
                    <Clock className="w-3 h-3" />
                    <span>
                      <strong>Jam Keberangkatan:</strong> {jam} —{' '}
                      <strong>Perkiraan Tiba:</strong> {jamTiba}
                    </span>
                  </div>

                  {/* 🔹 Tambahan: Nama Driver */}
                  <div className="flex items-center gap-2 text-xs text-gray-700 mb-2">
                    <CarFront className="w-3 h-3 text-blue-500" />
                    <span>
                      <strong>Driver:</strong> {trip.driver?.username || 'Tidak diketahui'}
                    </span>
                  </div>

                  <div className="flex items-start gap-3 text-sm text-gray-700">
                    <div className="flex flex-col items-center">
                      <div className="w-3 h-3 bg-green-500 rounded-full" />
                      <div className="h-5 border-l border-gray-300" />
                      <div className="w-3 h-3 bg-blue-600 rounded-full" />
                    </div>
                    <div className="flex flex-col gap-1">
                      <div>
                        <span className="font-semibold">{trip.asal}</span>
                      </div>
                      <div className="text-xs text-gray-400">
                        Durasi sekitar 2–3 jam
                      </div>
                      <div>
                        <span className="font-semibold">{trip.tujuan}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-1 text-sm text-gray-600 mt-2">
                    <User2 className="w-4 h-4" />
                    <span>{trip.jumlahPenumpang} Orang</span>
                  </div>
                </Link>
              )
            })
          )}
        </div>
      )}
    </div>
  )
}
