'use client'

import { useSearchParams } from 'next/navigation'
import { ArrowLeft, CarFront } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'

export default function DetailPengirimanBarangPage() {
  const params = useSearchParams()

  const tanggal = params.get('tanggal') || 'Sabtu, 14 September 2024'
  const berangkat = params.get('berangkat') || '07.00'
  const tiba = params.get('tiba') || '09.30'
  const dari = params.get('dari') || 'YOGYAKARTA POS 2'
  const ke = params.get('ke') || 'SOLO POS 1'
  const kendaraan = params.get('kendaraan') || 'DAIHATSU AYLA'
  const plat = 'AB3412AH' // hardcode dulu

  return (
    <div className="min-h-screen bg-white text-black">
      {/* Header */}
      <div className="sticky top-0 z-30 flex items-center justify-between px-4 py-3 border-b bg-white">
        <Link href="/customer/barang/pesan" className="text-black">
          <ArrowLeft size={24} />
        </Link>
        <h1 className="text-sm font-semibold">DAIHATSU AYLA</h1>
        <div className="w-6" />
      </div>

      <div className="p-4 space-y-6">
        {/* Box Rute Pengiriman */}
    <div className="space-y-2">
  <h2 className="text-sm font-semibold">Rute Pengiriman Barang</h2>

  <div className="relative rounded-xl border p-4">
    <div className="flex justify-between">
      {/* Kolom kiri: Jam & Tanggal */}
      <div className="flex flex-col justify-between text-xs text-gray-600">
        <div>
          <p className="font-semibold">{berangkat}</p>
          <p>Sab, 14 Sep</p>
        </div>
        <div>
          <p className="font-semibold">{tiba}</p>
          <p>Sab, 14 Sep</p>
        </div>
      </div>

      {/* Kolom tengah: Jalur vertikal + mobil */}
      <div className="relative flex flex-col items-center px-4">
        {/* Titik atas */}
        <div className="w-2 h-2 bg-blue-600 rounded-full" />
        {/* Garis atas */}
        <div className="h-10 border-l-2 border-dashed border-blue-400" />

        {/* Ikon kendaraan */}
        <CarFront size={18} className="text-blue-600 my-1" />
        <span className="text-[10px] text-black font-semibold">{kendaraan}</span>
        <span className="text-[10px] text-gray-500">{plat}</span>

        {/* Garis bawah */}
        <div className="h-10 border-l-2 border-dashed border-blue-400" />
        {/* Titik bawah */}
        <div className="w-2 h-2 border border-blue-600 rounded-full" />

        {/* Durasi waktu (posisi absolute di tengah) */}
        <div className="absolute left-full top-1/2 -translate-y-1/2 ml-2 text-xs text-gray-500 whitespace-nowrap">
          02j 30m
        </div>
      </div>

      {/* Kolom kanan: Lokasi */}
      <div className="flex flex-col justify-between text-xs text-gray-600">
        <p className="font-semibold text-blue-900">{dari}</p>
        <p className="font-semibold text-blue-900">{ke}</p>
      </div>
    </div>
  </div>
</div>

        {/* Harga */}
        <div className="space-y-2">
          <h2 className="text-sm font-semibold">Detail Harga</h2>
          <div className="flex justify-between items-center text-sm">
            <p className="text-gray-500">Barang Besar</p>
            <p className="font-bold text-blue-700">Rp 50.000</p>
          </div>
        </div>

        {/* Catatan Barang */}
        <div className="space-y-2">
          <h2 className="text-sm font-semibold">Catatan Barang</h2>
          <div className="bg-white rounded-xl p-4 border text-sm text-gray-700">
            Jangan dibanting, vas bunganya mudah pecah. :)
          </div>
        </div>

        {/* Foto Barang */}
        <div className="space-y-2">
          <h2 className="text-sm font-semibold">Foto Barang</h2>
          <Image
            src="/vas.png"
            alt="Foto Barang"
            width={80}
            height={80}
            className="rounded-xl"
          />
        </div>
      </div>
    </div>
  )
}
