'use client'

import { useRouter } from 'next/navigation'
import Image from 'next/image'

export default function KonfirmasiPesananPage() {
const router = useRouter()

return (
<div className="min-h-screen flex flex-col items-center justify-center bg-white px-6 py-10 text-center text-gray-800">
{/* Ilustrasi */}
<div className="mb-6">
<Image
src="/confirm.png" // Pastikan kamu sudah punya gambar ini di public/
alt="Konfirmasi Pesanan"
width={220}
height={220}
className="mx-auto"
/>
</div>
  {/* Judul & Deskripsi */}
  <h1 className="text-lg font-semibold mb-2">Cek Lagi Pesanan Kamu!</h1>
  <p className="text-sm text-gray-500 mb-6">
    Sebelum bayar, pastikan lokasi dan tanggal tebengan sudah benar ya.
  </p>

  {/* Tombol Aksi */}
  <div className="w-full max-w-xs space-y-3">
    <button
      onClick={() => router.back()}
      className="w-full border border-blue-600 text-blue-600 font-semibold py-2 rounded-lg hover:bg-blue-50 text-sm"
    >
      Cek Ulang
    </button>

    <button
      onClick={() => router.push('/customer/barang-umum/konfirmasi-pembayaran')}
      className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg text-sm"
    >
      Lanjut Bayar
    </button>
  </div>
</div>
)
}