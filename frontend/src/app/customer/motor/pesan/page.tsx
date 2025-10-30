'use client'

import { useEffect, useState } from 'react'
import { ArrowLeft, ChevronDown } from 'lucide-react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import axios from 'axios'

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
  driver: {
    id: number
    username: string
    email: string
    phone?: string
  }
}

export default function PesanMotorPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const id = searchParams.get('id')

  const [tebengan, setTebengan] = useState<Tebengan | null>(null)
  const [penumpang, setPenumpang] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // 🔹 Ambil data detail tebengan berdasarkan ID
  useEffect(() => {
    if (!id) return
    const fetchData = async () => {
      try {
        const res = await axios.get<Tebengan>(`http://localhost:3001/tebengan/${id}`)
        setTebengan(res.data)
      } catch (err) {
        console.error('Gagal mengambil detail tebengan:', err)
        setError('Gagal memuat detail tebengan.')
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [id])

  // 🔹 Ambil data user (penumpang) dari localStorage
  useEffect(() => {
    const userData = localStorage.getItem('user')
    if (userData) {
      try {
        const parsedUser: User = JSON.parse(userData)
        setPenumpang(parsedUser)
      } catch {
        console.warn('Data user di localStorage tidak valid')
      }
    }
  }, [])

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500">
        Memuat detail pesanan...
      </div>
    )

  if (error)
    return (
      <div className="min-h-screen flex items-center justify-center text-red-500">
        {error}
      </div>
    )

  if (!tebengan)
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500">
        Tidak ada data tebengan ditemukan.
      </div>
    )

  // 🔹 Format tanggal dan waktu keberangkatan
  const tanggalKeberangkatan = new Date(tebengan.waktu).toLocaleDateString('id-ID', {
    weekday: 'long',
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  })

  const jamBerangkat = new Date(tebengan.waktu).toLocaleTimeString('id-ID', {
    hour: '2-digit',
    minute: '2-digit',
  })

  const jamTiba = new Date(new Date(tebengan.waktu).getTime() + 90 * 60000).toLocaleTimeString(
    'id-ID',
    {
      hour: '2-digit',
      minute: '2-digit',
    }
  )

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      {/* Header + Background */}
      <div
        className="pt-10 pb-24 px-4 text-white relative"
        style={{
          backgroundImage: "url('/bg.png')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        {/* Header */}
        <div className="flex items-center mb-5">
          <Link href="/customer/motor/hasil">
            <ArrowLeft className="w-5 h-5 text-white" />
          </Link>
          <h1 className="flex-1 text-center font-semibold text-base">Pesan Motor</h1>
          <div className="w-5" />
        </div>

        {/* Box Ringkasan Perjalanan */}
        <div
          onClick={() => router.push(`/customer/motor/detail?id=${tebengan.id}`)}
          className="bg-white text-gray-800 rounded-xl shadow p-4 space-y-1 cursor-pointer hover:bg-gray-50 transition"
        >
          <p className="text-xs text-gray-500">
            {tanggalKeberangkatan} • {jamBerangkat} - {jamTiba}
          </p>
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold">
              {tebengan.asal} → {tebengan.tujuan}
            </h2>
            <ChevronDown className="w-4 h-4 text-gray-500" />
          </div>
          <p className="text-xs">Tipe: {tebengan.type}</p>
          <p className="text-xs">Harga: Rp {tebengan.harga.toLocaleString('id-ID')}</p>
          <p className="text-xs">Driver: {tebengan.driver?.username}</p>
        </div>
      </div>

      {/* Container Putih */}
      <div className="relative z-10 -mt-8 bg-gray-100 rounded-t-2xl px-4 flex-1 space-y-4 text-gray-800 pt-6 pb-6">
        {/* Detail Pemesanan */}
        <div className="bg-white rounded-xl p-4 space-y-3 shadow">
          <h3 className="text-sm font-semibold text-gray-800">Detail Pemesanan</h3>
          <div className="bg-gray-50 rounded-lg p-3 space-y-1">
            <p className="text-xs text-gray-500">Nama Driver</p>
            <p className="text-sm font-semibold">{tebengan.driver?.username}</p>
          </div>
          <div className="bg-gray-50 rounded-lg p-3 space-y-1">
            <p className="text-xs text-gray-500">Email Driver</p>
            <p className="text-sm">{tebengan.driver?.email || '-'}</p>
          </div>
          {tebengan.driver?.phone && (
            <div className="bg-gray-50 rounded-lg p-3 space-y-1">
              <p className="text-xs text-gray-500">Nomor Telepon Driver</p>
              <p className="text-sm">{tebengan.driver.phone}</p>
            </div>
          )}
        </div>

        {/* Detail Penumpang */}
        <div className="bg-white rounded-xl p-4 space-y-3 shadow">
          <h3 className="text-sm font-semibold text-gray-800">Detail Penumpang</h3>

          {penumpang ? (
            <div className="bg-gray-50 rounded-lg p-3 space-y-1">
              <p className="text-xs text-gray-500">Nama Penumpang</p>
              <p className="text-sm font-semibold">{penumpang.username}</p>
              <p className="text-xs text-gray-500">Email</p>
              <p className="text-sm">{penumpang.email}</p>
            </div>
          ) : (
            <p className="text-xs text-gray-500">Data penumpang belum ditemukan.</p>
          )}
        </div>

        {/* Tombol Lanjutkan */}
        <button
          onClick={() =>
            router.push(
              `/customer/motor/pembayaran?id=${tebengan.id}&harga=${tebengan.harga}&asal=${tebengan.asal}&tujuan=${tebengan.tujuan}`
            )
          }
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl text-sm"
        >
          Lanjutkan
        </button>
      </div>
    </div>
  )
}
