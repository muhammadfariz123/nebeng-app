"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import Image from "next/image";

export default function DetailMotorPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-white px-5 py-6">
      {/* Tombol Kembali */}
      <button
        onClick={() => router.push("/customer/motor/pesan")}
        className="flex items-center text-sm text-gray-700 hover:text-blue-600 mb-6"
      >
        <ArrowLeft className="w-5 h-5 mr-1" />
              </button>

      {/* Judul */}
      <h1 className="text-sm font-bold">YAMAHA NMAX</h1>

      {/* Subjudul */}
      <h2 className="mt-4 text-sm font-semibold">Rute Motor</h2>

      {/* Kartu Rute */}
      <div className="mt-3 rounded-xl shadow-md border border-gray-100 p-4">
        <div className="flex justify-between">
          {/* Kolom kiri: Waktu */}
          <div className="flex flex-col justify-between text-xs text-gray-600">
            <div>
              <p className="text-sm font-bold">07.00</p>
              <p>Sab, 14 Sep</p>
            </div>
            <div>
              <p className="text-sm font-bold">08.30</p>
              <p>Sab, 14 Sep</p>
            </div>
          </div>

          {/* Kolom tengah: Garis & Ikon Motor */}
          <div className="relative flex flex-col items-center px-4">
            {/* Titik atas */}
            <div className="w-2 h-2 bg-blue-500 rounded-full" />
            {/* Garis atas */}
            <div className="h-10 border-l-2 border-dotted border-blue-500" />

            {/* Ikon Motor dari public/icons/motor.svg */}
            <div className="my-1 flex flex-col items-center">
              <Image
                src="/icons/motor2.svg"
                alt="Motor Icon"
                width={16}
                height={16}
                className="text-blue-500"
              />
              <span className="text-[10px] font-semibold text-blue-600">
                YAMAHA NMAX
              </span>
              <span className="text-[10px] text-gray-500">AB1234UH</span>
            </div>

            {/* Garis bawah */}
            <div className="h-10 border-l-2 border-dotted border-blue-500" />
            {/* Titik bawah */}
            <div className="w-2 h-2 border border-blue-500 rounded-full" />

            {/* Durasi */}
            <div className="absolute left-full top-1/2 -translate-y-1/2 ml-2 text-xs text-gray-500 whitespace-nowrap">
              01j 30m
            </div>
          </div>

          {/* Kolom kanan: Lokasi */}
          <div className="flex flex-col justify-between text-xs text-gray-600">
            <p className="font-semibold text-blue-900">YOGYAKARTA POS 2</p>
            <p className="font-semibold text-blue-900">SOLO POS 1</p>
          </div>
        </div>
      </div>

      {/* Detail Harga */}
      <h2 className="mt-6 text-sm font-semibold">Detail Harga</h2>
      <div className="mt-2 flex justify-between text-sm">
        <p className="text-gray-500">Total Harga</p>
        <p className="font-semibold">Rp 110.000</p>
      </div>
    </div>
  );
}
