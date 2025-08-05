'use client'

import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function PembayaranMotorPage() {
const router = useRouter()

return (
<div className="min-h-screen bg-white flex flex-col">
{/* Header */}
<div className="bg-white sticky top-0 z-20 border-b px-4 py-4 flex items-center gap-4 shadow-sm">
<Link href="/customer/motor/pesan">
<ArrowLeft className="text-gray-800 w-5 h-5" />
</Link>
<h1 className="text-base font-semibold text-gray-800">Nebeng Motor</h1>
</div>
  {/* Konten */}
  <div className="flex-1 overflow-y-auto px-4 py-6 space-y-6">
    {/* Ringkasan */}
    <div className="bg-white border rounded-xl p-4 space-y-4 shadow-sm">
      <div className="text-xs text-gray-500">
        14 September 2024 • 07.00 - 08.30
      </div>
      <div className="text-sm font-semibold text-gray-800">
        YOG POS 2 → SOLO POS 1
      </div>
      <p className="text-xs text-gray-600">YAMAHA NMAX</p>

      {/* Info Penumpang */}
      <div className="border rounded-lg p-3 text-sm bg-gray-50">
        <p className="font-medium text-gray-800">NADYA AMALYA FATHONI</p>
        <p className="text-xs text-gray-500">Penumpang</p>
        <div className="bg-white border rounded-lg p-2 text-xs mt-2">
          Potensi mendapatkan <span className="text-blue-600 font-medium">15 Poin</span>
        </div>
      </div>

      {/* Total Harga */}
      <div className="flex justify-between items-center text-sm pt-2 border-t">
        <p className="text-gray-600">Total</p>
        <p className="font-bold text-gray-900">Rp 110.000</p>
      </div>
    </div>

    {/* Rincian Harga */}
    <div className="space-y-3">
      <h3 className="text-sm font-semibold text-gray-800">Rincian Harga</h3>

      <div className="text-sm">
        <p className="text-gray-800 font-medium">YAMAHA NMAX</p>
        <p className="text-gray-500 text-xs">1 Penumpang</p>
        <p className="text-gray-500 text-xs">Orang (x1)</p>
        <p className="text-gray-800 text-right font-semibold mt-1">Rp 110.000</p>
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
        <span className="text-blue-600 underline">
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
      className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl text-sm"
    >
      Bayar
    </button>
  </div>
</div>
)
}