"use client";

import Link from "next/link";

export default function StatusPembayaranBerhasilPage() {
  return (
    <div className="min-h-screen flex flex-col justify-between items-center bg-gradient-to-b from-blue-500 to-blue-900 text-white">
      {/* Atur padding top agar teks tidak menempel ke atas */}
      <div className="pt-32 text-center px-6">
        <h1 className="text-xl font-bold mb-3">Pembayaran Berhasil!</h1>
        <p className="text-sm text-white/80">
          Pembayaran telah diterima. Silahkan cek pesanan anda.
        </p>
      </div>

      {/* Tombol di bagian bawah */}
      <div className="w-full px-6 pb-10">
        <Link href="/customer/barang-umum">
          <button className="w-full bg-white text-blue-700 font-medium py-3 rounded-xl shadow">
            Lihat tebengan
          </button>
        </Link>
      </div>
    </div>
  );
}
