"use client";

import { ArrowLeft, Trash2, LogOut } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function PengaturanAkunPage() {
  const [faceID, setFaceID] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="flex items-center px-4 py-3 bg-white shadow-sm">
        <Link href="/customer/profile">
          <ArrowLeft className="w-5 h-5 text-gray-700 mr-3" />
        </Link>
        <h1 className="text-gray-900 font-semibold">Pengaturan Akun</h1>
      </div>

      {/* Menu */}
      <div className="mt-4 bg-white">
        {/* Face ID */}
        <div className="flex items-center justify-between px-4 py-4 border-b border-gray-100">
          <div>
            <p className="text-gray-900 font-medium">Masuk via Face ID</p>
            <p className="text-gray-500 text-sm">
              Cepat, aman, dan tidak perlu OTP.
            </p>
          </div>
          <label className="inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={faceID}
              onChange={() => setFaceID(!faceID)}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:bg-blue-500 relative transition-all">
              <span
                className={`absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-all ${
                  faceID ? "translate-x-5" : ""
                }`}
              ></span>
            </div>
          </label>
        </div>

        {/* Keluar */}
        <Link href="/logout">
          <div className="flex items-center px-4 py-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50">
            <LogOut className="w-5 h-5 text-gray-600 mr-3" />
            <div>
              <p className="text-gray-900 font-medium">Keluar</p>
              <p className="text-gray-500 text-sm">
                Kamu harus masuk lagi kalau mau pakai layanan nebeng.
              </p>
            </div>
          </div>
        </Link>

        {/* Hapus Akun */}
        <Link href="/customer/profile/hapus-akun">
          <div className="flex items-center px-4 py-4 cursor-pointer hover:bg-gray-50">
            <Trash2 className="w-5 h-5 text-red-500 mr-3" />
            <div>
              <p className="text-red-500 font-medium">Hapus Akun</p>
              <p className="text-gray-500 text-sm">
                Akunmu akan dihapus secara permanen.
              </p>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
}
