'use client'

import { useSearchParams } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'

export default function DetailPengirimanBarangUmumPage() {
  const params = useSearchParams()

  const tanggal = params.get('tanggal') || 'Sab, 14 Sep'
  const berangkat = params.get('berangkat') || '07.00'
  const tiba = params.get('tiba') || '09.30'
  const durasi = params.get('durasi') || '02j 30m'
  const dari = params.get('dari') || 'STASIUN YOGYAKARTA'
  const ke = params.get('ke') || 'STASIUN PURWOKERTO'
  const kendaraan = params.get('kendaraan') || 'FAJAR UTAMA (YK)'
  const harga = params.get('harga') || '90000'
  const jenisBarang = params.get('jenisBarang') || 'Barang Besar'
  const catatan =
    params.get('catatan') || 'Jangan dibanting, vas bunganya mudah pecah. :)'
  const foto = params.get('foto') || '/vas.png'
  const plat = params.get('plat') || 'AB3412AH'

  return (
    <div className="min-h-screen bg-white text-gray-800">
      {/* Header */}
      <div className="sticky top-0 z-30 flex items-center justify-between px-4 py-3 border-b bg-white">
        <Link href="/customer/barang-umum/pesan" className="text-black">
          <ArrowLeft size={24} />
        </Link>
        <h1 className="text-sm font-semibold">{kendaraan}</h1>
        <div className="w-6" />
      </div>

      <div className="p-4 space-y-6">
        {/* Rute Pengiriman Barang */}
        <div className="space-y-2">
          <h2 className="text-sm font-semibold">Rute Pengiriman Barang</h2>
          <div className="relative rounded-xl border p-4">
            <div className="flex justify-between">
              {/* Kolom kiri: Jam & Tanggal */}
              <div className="flex flex-col justify-between text-xs text-gray-600">
                <div>
                  <p className="font-semibold">{berangkat}</p>
                  <p>{tanggal}</p>
                </div>
                <div>
                  <p className="font-semibold">{tiba}</p>
                  <p>{tanggal}</p>
                </div>
              </div>

              {/* Kolom tengah: Jalur + Kendaraan */}
              <div className="relative flex flex-col items-center px-4">
                <div className="w-2 h-2 bg-blue-600 rounded-full" />
                <div className="h-10 border-l-2 border-dashed border-blue-400" />

                {/* Icon kereta dari public/icons */}
                <Image
                  src="/icons/kereta.svg"
                  alt="Kereta"
                  width={20}
                  height={20}
                  className="my-1"
                />
                <span className="text-[10px] text-black font-semibold">
                  {kendaraan}
                </span>
                <span className="text-[10px] text-gray-500">{plat}</span>

                <div className="h-10 border-l-2 border-dashed border-blue-400" />
                <div className="w-2 h-2 border border-blue-600 rounded-full" />

                {/* Durasi */}
                <div className="absolute left-full top-1/2 -translate-y-1/2 ml-2 text-xs text-gray-500 whitespace-nowrap">
                  {durasi}
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

        {/* Detail Harga */}
        <div className="space-y-2">
          <h2 className="text-sm font-semibold">Detail Harga</h2>
          <div className="flex justify-between items-center text-sm">
            <p className="text-gray-500">{jenisBarang}</p>
            <p className="font-bold text-blue-700">
              Rp {parseInt(harga).toLocaleString('id-ID')}
            </p>
          </div>
        </div>

        {/* Catatan Barang */}
        <div className="space-y-2">
          <h2 className="text-sm font-semibold">Catatan Barang</h2>
          <div className="bg-white rounded-xl p-4 border text-sm text-gray-700">
            {catatan}
          </div>
        </div>

        {/* Foto Barang */}
        <div className="space-y-2">
          <h2 className="text-sm font-semibold">Foto Barang</h2>
          <Image
            src={foto}
            alt="Foto Barang"
            width={100}
            height={100}
            className="rounded-xl object-cover"
          />
        </div>
      </div>
    </div>
  )
}
