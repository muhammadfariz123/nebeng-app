'use client'

import { ArrowLeft, Train } from 'lucide-react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'

export default function RingkasanPerjalananBarang() {
  const router = useRouter()

  const data = {
    tanggal: 'Sab, 14 Sep',
    berangkat: '07.00',
    tiba: '09.30',
    durasi: '02j 30m',
    dari: 'STASIUN YOGYAKARTA',
    ke: 'STASIUN PURWOKERTO',
    kendaraan: 'FAJAR UTAMA (YK)',
    harga: 90000,
    jenisBarang: 'Barang Besar',
    catatan: 'Jangan dibanting, vas bunganya mudah pecah. :)',
    foto: '/vas.png'
  }

  return (
    <div className="min-h-screen bg-white text-gray-800">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-white border-b px-4 py-4 flex items-center">
        <Link href="/customer/barang-umum/pesan" className="text-black">
          <ArrowLeft size={24} />
        </Link>
        <h1 className="flex-1 text-center text-sm font-semibold">
          {data.kendaraan} - {data.dari}
        </h1>
        <div className="w-6" />
      </div>

      {/* Rute Pengiriman Barang */}
      <div className="px-4 mt-4">
        <h3 className="font-semibold mb-2">Rute Pengiriman Barang</h3>
        <div className="border rounded-lg p-3">
          <div className="flex items-start gap-4">
            {/* Waktu dan garis */}
            <div className="flex flex-col items-center">
              <span className="text-xs font-semibold">{data.berangkat}</span>
              <span className="text-[10px] text-gray-500">{data.tanggal}</span>
              <div className="w-px flex-1 bg-gray-300 my-1"></div>
              <span className="text-xs font-semibold">{data.tiba}</span>
              <span className="text-[10px] text-gray-500">{data.tanggal}</span>
            </div>
            {/* Rute */}
            <div className="flex flex-col gap-3">
              <p className="text-sm">{data.dari}</p>
              <div className="flex items-center gap-2 text-blue-600">
                <Train className="w-4 h-4" />
                <span className="text-sm font-semibold">{data.kendaraan}</span>
              </div>
              <p className="text-sm">{data.ke}</p>
            </div>
            {/* Durasi */}
            <div className="ml-auto text-xs text-gray-500">{data.durasi}</div>
          </div>
        </div>
      </div>

      {/* Detail Harga */}
      <div className="px-4 mt-4">
        <h3 className="font-semibold mb-1">Detail Harga</h3>
        <div className="flex justify-between text-sm">
          <span>{data.jenisBarang}</span>
          <span className="font-bold">Rp {data.harga.toLocaleString('id-ID')}</span>
        </div>
      </div>

      {/* Catatan Barang */}
      <div className="px-4 mt-4">
        <h3 className="font-semibold mb-1">Catatan Barang</h3>
        <div className="border rounded-lg p-2 text-sm text-gray-700">
          {data.catatan}
        </div>
      </div>

      {/* Foto Barang */}
      <div className="px-4 mt-4">
        <h3 className="font-semibold mb-1">Foto Barang</h3>
        <Image
          src={data.foto}
          alt="Foto Barang"
          width={80}
          height={80}
          className="rounded-lg object-cover"
        />
      </div>
    </div>
  )
}
