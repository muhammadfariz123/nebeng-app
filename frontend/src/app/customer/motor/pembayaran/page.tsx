'use client'

import { ArrowLeft, ArrowRight, ChevronUp, ChevronDown } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function PembayaranMotorPage() {
  const router = useRouter()
  const [showDetail, setShowDetail] = useState(true) // default terbuka

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Header dengan background biru gambar */}
      <div
        className="sticky top-0 z-20 px-4 pt-10 pb-4 relative flex items-center justify-center"
        style={{
          backgroundImage: 'url("/bg.png")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <Link href="/customer/motor/pesan" className="absolute left-4">
          <ArrowLeft className="text-white w-5 h-5" />
        </Link>
        <h1 className="text-base font-semibold text-white">Pesan Motor</h1>
      </div>

      {/* Konten */}
      <div className="flex-1 overflow-y-auto px-4 py-6 space-y-6">
        {/* Ringkasan Perjalanan */}
        <div className="bg-white border rounded-2xl shadow-md overflow-hidden">
          <button
            onClick={() => setShowDetail(!showDetail)}
            className="w-full flex flex-col items-start p-4 relative"
          >
            {/* Tanggal & Jam */}
            <div className="text-xs text-gray-500 mb-2">
              14 September 2024 • 07.00 - 08.30
            </div>

            {/* Rute Perjalanan */}
            <div className="flex items-center gap-2 mb-1">
              <span className="text-sm font-bold text-gray-800">YOG POS 2</span>
              <ArrowRight className="w-5 h-5 text-[#007BFF]" />
              <span className="text-sm font-bold text-gray-800">SOLO POS 1</span>
            </div>

            {/* Info Kendaraan */}
            <div className="text-xs text-gray-600">YAMAHA NMAX</div>

            {/* Chevron */}
            <div className="absolute right-4 top-1/2 -translate-y-1/2">
              {showDetail ? (
                <ChevronUp className="w-5 h-5 text-gray-400" />
              ) : (
                <ChevronDown className="w-5 h-5 text-gray-400" />
              )}
            </div>
          </button>

          {showDetail && (
            <div className="px-4 pb-4 space-y-4">
              {/* Info Penumpang */}
              <div className="border rounded-lg p-3 text-sm bg-white">
                <p className="font-medium text-gray-800">
                  NADYA AMALYA FATHONI
                </p>
                <p className="text-xs text-gray-500">Penumpang</p>
                <div className="border rounded-lg p-2 text-xs mt-2">
                  Potensi mendapatkan{' '}
                  <span className="text-[#007BFF] font-medium">15 Poin</span>
                </div>
              </div>

              {/* Total Harga */}
              <div className="flex justify-between items-center text-sm pt-2 border-t">
                <p className="text-gray-600">Total</p>
                <p className="font-bold text-gray-900">Rp 110.000</p>
              </div>
            </div>
          )}
        </div>

        {/* Rincian Harga */}
        <div className="space-y-3">
          <h3 className="text-sm font-semibold text-gray-800">Rincian Harga</h3>

          <div className="text-sm space-y-1">
            <p className="text-gray-800 font-medium">YAMAHA NMAX</p>
            <p className="text-gray-500 text-xs">1 Penumpang</p>
            <p className="text-gray-500 text-xs">Orang (x1)</p>
            <p className="text-gray-800 text-right font-semibold mt-1">
              Rp 110.000
            </p>
          </div>

          <div className="bg-gray-50 rounded-lg p-3 text-sm flex justify-between items-center">
            <p className="font-medium">Total Harga</p>
            <p className="font-bold text-gray-900">Rp 110.000</p>
          </div>
        </div>

        {/* Syarat & Ketentuan */}
        <div className="flex items-start gap-2 text-sm">
          <input type="checkbox" id="agree" className="mt-1" />
          <label htmlFor="agree" className="text-gray-600">
            Saya telah membaca dan setuju terhadap{' '}
            <span className="text-[#007BFF] underline">
              Syarat dan ketentuan pemesanan nebeng
            </span>
          </label>
        </div>
      </div>

      {/* Tombol Bayar */}
      <div className="border-t bg-white p-4">
        <button
          type="button"
          onClick={() => router.push('/customer/motor/konfirmasi')}
          className="w-full bg-[#007BFF] hover:bg-[#0069d9] text-white font-semibold py-3 rounded-xl text-sm"
        >
          Bayar
        </button>
      </div>
    </div>
  )
}
