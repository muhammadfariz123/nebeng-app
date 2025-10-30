'use client'

import { ArrowLeft, ArrowRight, ChevronUp, ChevronDown } from 'lucide-react'
import { useRouter, useSearchParams } from 'next/navigation'
import axios from 'axios'
import { useEffect, useState } from 'react'

interface User {
  id: number
  username: string
  email: string
  user_type?: string
}

interface Tebengan {
  id: number
  asal: string
  tujuan: string
  waktu: string
  harga: number
  type: string
}

export default function PembayaranMotorPage() {
  const router = useRouter()
  const params = useSearchParams()
  const id = params.get('id') // Ambil ID tebengan dari URL

  const [showDetail, setShowDetail] = useState(true)
  const [penumpang, setPenumpang] = useState<User | null>(null) // Data penumpang
  const [data, setData] = useState<Tebengan | null>(null) // Data tebengan
  const [loading, setLoading] = useState(true)

  // ✅ Ambil data penumpang dari localStorage (bukan token)
  useEffect(() => {
    const storedUser = localStorage.getItem('user')
    if (storedUser) {
      try {
        const parsedUser: User = JSON.parse(storedUser)
        setPenumpang(parsedUser)
      } catch (err) {
        console.warn('Data user di localStorage tidak valid')
      }
    }
  }, [])

  // ✅ Ambil data tebengan sesuai ID
  useEffect(() => {
    if (!id) return

    const fetchDetail = async () => {
      try {
        setLoading(true)
        const res = await axios.get<Tebengan>(`http://localhost:3001/tebengan/${id}`)
        setData(res.data)
      } catch (err) {
        console.error('Gagal mengambil detail pembayaran:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchDetail()
  }, [id])

  if (loading) return <div className="min-h-screen flex items-center justify-center">Memuat...</div>
  if (!data) return <div className="min-h-screen flex items-center justify-center text-red-500">Data tidak ditemukan.</div>

  // Format waktu
  const waktu = new Date(data.waktu)
  const tanggal = waktu.toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })
  const jamBerangkat = waktu.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })
  const jamTiba = new Date(waktu.getTime() + 90 * 60000).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Header */}
      <div
        className="sticky top-0 z-20 px-4 pt-10 pb-4 relative flex items-center justify-center"
        style={{
          backgroundImage: 'url("/bg.png")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <button onClick={() => router.back()} className="absolute left-4">
          <ArrowLeft className="text-white w-5 h-5" />
        </button>
        <h1 className="text-base font-semibold text-white">Pembayaran</h1>
      </div>

      {/* Konten */}
      <div className="flex-1 overflow-y-auto px-4 py-6 space-y-6">

        {/* Ringkasan Perjalanan */}
        <div className="bg-white border rounded-2xl shadow-md overflow-hidden">
          <button
            onClick={() => setShowDetail(!showDetail)}
            className="w-full flex flex-col items-start p-4 relative"
          >
            <div className="text-xs text-gray-500 mb-2">
              {tanggal} • {jamBerangkat} - {jamTiba}
            </div>

            <div className="flex items-center gap-2 mb-1">
              <span className="text-sm font-bold">{data.asal}</span>
              <ArrowRight className="w-4 h-4 text-[#007BFF]" />
              <span className="text-sm font-bold">{data.tujuan}</span>
            </div>

            <div className="text-xs text-gray-600">{data.type}</div>

            <div className="absolute right-4 top-1/2 -translate-y-1/2">
              {showDetail ? <ChevronUp /> : <ChevronDown />}
            </div>
          </button>

          {/* Detail jika Expand */}
          {showDetail && (
            <div className="px-4 pb-4 space-y-4">
              {/* Data Penumpang */}
              <div className="border rounded-lg p-3 text-sm bg-white">
                <p className="font-medium text-gray-800">{penumpang?.username || 'Penumpang'}</p>
                <p className="text-xs text-gray-500">{penumpang?.email || '-'}</p>

                <div className="border rounded-lg p-2 text-xs mt-2">
                  Potensi mendapatkan <span className="text-blue-600 font-medium">15 Poin</span>
                </div>
              </div>

              {/* Total Harga */}
              <div className="flex justify-between text-sm border-t pt-2">
                <p className="text-gray-600">Total</p>
                <p className="font-bold text-gray-900">Rp {data.harga.toLocaleString('id-ID')}</p>
              </div>
            </div>
          )}
        </div>

        {/* Rincian Harga */}
        <div>
          <h3 className="text-sm font-semibold">Rincian Harga</h3>
          <p className="text-xs text-gray-500">1 Penumpang</p>

          <div className="bg-gray-50 rounded-lg p-3 flex justify-between text-sm mt-2">
            <p className="font-medium">Total Harga</p>
            <p className="font-bold">Rp {data.harga.toLocaleString('id-ID')}</p>
          </div>
        </div>

        {/* Checkbox persetujuan */}
        <div className="flex items-start gap-2 text-sm">
          <input type="checkbox" id="agree" className="mt-1" />
          <label htmlFor="agree" className="text-gray-600">
            Saya setuju dengan ketentuan pemesanan
          </label>
        </div>
      </div>

      {/* Tombol Bayar */}
      <div className="border-t bg-white p-4">
        <button
          type="button"
          onClick={() => router.push(`/customer/motor/konfirmasi?id=${id}`)}
          className="w-full bg-blue-600 text-white font-semibold py-3 rounded-xl"
        >
          Bayar
        </button>
      </div>
    </div>
  )
}
