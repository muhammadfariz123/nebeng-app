"use client";

import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function HapusAkunPage() {
  const [isChecked, setIsChecked] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const handleDelete = () => {
    setShowModal(false);
    // TODO: logika hapus akun di sini
    alert("Akun kamu berhasil dihapus.");
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header */}
      <div className="flex items-center px-4 py-3 border-b border-gray-200">
        <Link href="/customer/profile">
          <ArrowLeft className="w-5 h-5 text-gray-700 mr-3" />
        </Link>
        <h1 className="text-gray-900 font-semibold">Hapus Akun</h1>
      </div>

      {/* Konten */}
      <div className="px-4 py-5 flex-1">
        <p className="text-gray-700 text-sm mb-4">
          Setelah dihapus, kamu akan kehilangan akses ke informasi berikut:
        </p>

        <ol className="list-decimal list-inside text-sm text-gray-900 space-y-3 mb-5">
          <li>
            <span className="font-medium">Riwayat pesanan</span>
            <p className="text-gray-500 text-xs">
              Rincian riwayat transaksi, alamat tersimpan, dan metode pembayaran, dst.
            </p>
          </li>
          <li>
            <span className="font-medium">Poin</span>
            <p className="text-gray-500 text-xs">
              Semua poin yang kamu punya.
            </p>
          </li>
          <li>
            <span className="font-medium">Profil nebeng</span>
            <p className="text-gray-500 text-xs">
              Info personal di profil aplikasi nebengmu.
            </p>
          </li>
        </ol>

        <p className="text-xs text-gray-500 mb-4">
          nebeng tidak bertanggung jawab atas hilangnya informasi, data, atau poin setelah akun resmi dihapus.
        </p>

        {/* Checkbox Persetujuan */}
        <label
          className={`flex items-start p-3 rounded-md border cursor-pointer transition ${
            isChecked ? "bg-blue-50 border-blue-400" : "bg-white border-gray-300"
          }`}
        >
          <input
            type="checkbox"
            checked={isChecked}
            onChange={() => setIsChecked(!isChecked)}
            className="mt-1 mr-3 w-4 h-4 accent-blue-500"
          />
          <span className="text-sm text-gray-700">
            Saya setuju dan bersedia menghapus akun ini secara permanen.
          </span>
        </label>
      </div>

      {/* Tombol Aksi */}
      <div className="px-4 py-4 border-t bg-white">
        <button
          disabled={!isChecked}
          onClick={() => setShowModal(true)}
          className={`w-full py-3 rounded-md text-white font-semibold transition ${
            isChecked ? "bg-red-500 hover:bg-red-600" : "bg-gray-300 cursor-not-allowed"
          }`}
        >
          LANJUT
        </button>

        <button
          onClick={() => history.back()}
          className="w-full py-3 rounded-md border border-red-500 text-red-500 font-semibold mt-3"
        >
          BATAL
        </button>
      </div>

      {/* Modal Konfirmasi */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
          <div className="bg-white rounded-lg shadow-lg w-80 p-5 animate-fadeIn">
            <h2 className="text-lg font-semibold text-gray-900 mb-2">
              Konfirmasi Hapus Akun
            </h2>
            <p className="text-sm text-gray-600 mb-5">
              Apakah kamu yakin ingin menghapus akun ini secara permanen? Tindakan ini tidak dapat dibatalkan.
            </p>

            <div className="flex space-x-3">
              <button
                onClick={handleDelete}
                className="flex-1 py-2 rounded-md bg-red-500 text-white font-medium hover:bg-red-600"
              >
                Ya, Hapus
              </button>
              <button
                onClick={() => setShowModal(false)}
                className="flex-1 py-2 rounded-md border border-gray-300 text-gray-700 font-medium hover:bg-gray-100"
              >
                Batal
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
