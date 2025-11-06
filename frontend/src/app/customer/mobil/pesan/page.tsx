'use client'

import { useEffect, useState } from 'react'
import { ArrowLeft, ChevronDown, Plus, Trash, Phone, Mail, User } from 'lucide-react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import axios from 'axios'

interface User {
  id: number
  username: string
  email: string
  user_type?: string
}

interface Driver {
  id: number
  username: string
  email?: string
  phone?: string
}

interface TebenganMobil {
  id: number
  asal: string
  tujuan: string
  waktu: string
  harga: number
  type: string
  jumlahPenumpang: number
  driver: Driver
  kendaraan?: string
}

interface Passenger {
  name: string
  idType: string
  idNumber: string
}

export default function PesanMobilPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const id = searchParams.get('id')

  const [tebengan, setTebengan] = useState<TebenganMobil | null>(null)
  const [penumpangUtama, setPenumpangUtama] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [passengers, setPassengers] = useState<Passenger[]>([])

  // 🔹 Ambil data detail tebengan dari backend
  useEffect(() => {
    if (!id) return
    const fetchTebengan = async () => {
      try {
        const res = await axios.get<TebenganMobil>(`http://localhost:3001/tebengan/${id}`)
        setTebengan(res.data)
      } catch (err) {
        console.error('Gagal mengambil detail tebengan:', err)
        setError('Gagal memuat detail tebengan.')
      } finally {
        setLoading(false)
      }
    }
    fetchTebengan()
  }, [id])

  // 🔹 Ambil data user utama dari localStorage
  useEffect(() => {
    const userData = localStorage.getItem('user')
    if (userData) {
      try {
        const parsed: User = JSON.parse(userData)
        setPenumpangUtama(parsed)
      } catch {
        console.warn('Data user di localStorage tidak valid')
      }
    }
  }, [])

  // 🔹 Ambil data penumpang tambahan dari localStorage
  useEffect(() => {
    const saved = localStorage.getItem('passengers')
    if (saved) {
      try {
        const parsed: Passenger[] = JSON.parse(saved)
        setPassengers(parsed)
      } catch {
        setPassengers([])
      }
    }
  }, [])

  // 🔹 Simpan data penumpang tambahan setiap kali berubah
  useEffect(() => {
    localStorage.setItem('passengers', JSON.stringify(passengers))
  }, [passengers])

  // Tambah penumpang baru
  const handleAddPassenger = () => {
    if (!tebengan) return
    if (passengers.length >= tebengan.jumlahPenumpang - 1) {
      alert(`Kapasitas maksimal penumpang adalah ${tebengan.jumlahPenumpang}`)
      return
    }
    const newPassenger: Passenger = { name: '', idType: 'KTP', idNumber: '' }
    setPassengers([...passengers, newPassenger])
  }

  // Hapus penumpang
  const handleDeletePassenger = (index: number) => {
    const updated = [...passengers]
    updated.splice(index, 1)
    setPassengers(updated)
  }

  // Edit data penumpang
  const handleEditPassenger = (index: number, field: keyof Passenger, value: string) => {
    const updated = [...passengers]
    updated[index][field] = value
    setPassengers(updated)
  }

  // 🔹 Lanjutkan ke pembayaran (simpan penumpang dulu)
  const handleLanjutkan = async () => {
    if (!tebengan) return
    try {
      const allPassengers = [
        {
          name: penumpangUtama?.username || 'User Utama',
          idType: 'KTP',
          idNumber: penumpangUtama?.id.toString() || '0',
        },
        ...passengers,
      ]

      await axios.post('http://localhost:3001/penumpang', {
        tebenganId: tebengan.id,
        passengers: allPassengers,
      })

      router.push(
        `/customer/mobil/pembayaran?id=${tebengan.id}&harga=${tebengan.harga}&asal=${encodeURIComponent(
          tebengan.asal
        )}&tujuan=${encodeURIComponent(tebengan.tujuan)}&jumlahPenumpang=${allPassengers.length}`
      )
    } catch (err) {
      console.error('Gagal menyimpan penumpang:', err)
      alert('Terjadi kesalahan saat menyimpan data penumpang.')
    }
  }

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

  // 🔹 Format waktu
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

  const jamTiba = new Date(new Date(tebengan.waktu).getTime() + 120 * 60000).toLocaleTimeString(
    'id-ID',
    {
      hour: '2-digit',
      minute: '2-digit',
    }
  )

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      {/* HEADER */}
      <div
        className="pt-10 pb-24 px-4 text-white relative"
        style={{
          backgroundImage: "url('/bg.png')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="flex items-center mb-5">
          <Link href="/customer/mobil/hasil">
            <ArrowLeft className="w-5 h-5 text-white" />
          </Link>
          <h1 className="flex-1 text-center font-semibold text-base">Pesan Mobil</h1>
          <div className="w-5" />
        </div>

        {/* Ringkasan Perjalanan */}
        <div
          onClick={() => router.push(`/customer/mobil/detail?id=${tebengan.id}`)}
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
          <p className="text-xs">Kapasitas: {tebengan.jumlahPenumpang} Penumpang</p>
          <p className="text-xs">Driver: {tebengan.driver?.username}</p>
        </div>
      </div>

      {/* DETAIL PENUMPANG */}
      <div className="relative z-10 -mt-8 bg-gray-100 rounded-t-2xl px-4 flex-1 space-y-4 text-gray-800 pt-6 pb-6">
        <div className="bg-white rounded-xl p-4 space-y-3 shadow">
          <h3 className="text-sm font-semibold text-gray-800">Detail Penumpang</h3>
          {penumpangUtama && (
            <div className="bg-gray-50 rounded-lg p-3 space-y-1">
              <p className="text-xs text-gray-500">Penumpang Utama</p>
              <p className="text-sm font-semibold">{penumpangUtama.username}</p>
              <p className="text-xs text-gray-500">Email</p>
              <p className="text-sm">{penumpangUtama.email}</p>
            </div>
          )}

          {/* Penumpang Tambahan */}
          {passengers.map((p, index) => (
            <div key={index} className="bg-gray-50 rounded-lg p-3 border space-y-2">
              <div className="flex justify-between items-center">
                <p className="text-sm font-semibold">Penumpang {index + 2}</p>
                <button onClick={() => handleDeletePassenger(index)}>
                  <Trash className="w-4 h-4 text-red-500" />
                </button>
              </div>

              <input
                type="text"
                placeholder="Nama Penumpang"
                value={p.name}
                onChange={(e) => handleEditPassenger(index, 'name', e.target.value)}
                className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="text"
                placeholder="Nomor ID"
                value={p.idNumber}
                onChange={(e) => handleEditPassenger(index, 'idNumber', e.target.value)}
                className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          ))}

          {tebengan && passengers.length < tebengan.jumlahPenumpang - 1 && (
            <button
              onClick={handleAddPassenger}
              className="flex items-center justify-center gap-2 w-full py-3 border border-blue-600 text-blue-600 rounded-xl mt-3"
            >
              <Plus className="w-4 h-4" /> Tambah Penumpang
            </button>
          )}
        </div>

        {/* 🔹 Informasi Driver */}
        {tebengan.driver && (
          <div className="bg-white rounded-xl p-4 space-y-3 shadow">
            <h3 className="text-sm font-semibold text-gray-800">Informasi Driver</h3>
            <div className="space-y-2 text-sm text-gray-700">
              <p className="flex items-center gap-2">
                <User className="w-4 h-4 text-blue-600" />
                <span>Nama: {tebengan.driver.username}</span>
              </p>
              <p className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-blue-600" />
                <span>Email: {tebengan.driver.email || '-'}</span>
              </p>
              <p className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-blue-600" />
                <span>Telepon: {tebengan.driver.phone || '-'}</span>
              </p>
            </div>
          </div>
        )}

        {/* Tombol Lanjutkan */}
        <button
          onClick={handleLanjutkan}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl text-sm"
        >
          Lanjutkan
        </button>
      </div>
    </div>
  )
}
