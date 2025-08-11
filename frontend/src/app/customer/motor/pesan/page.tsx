"use client";

import { ArrowLeft, ChevronDown } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function PesanMotorPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      {/* Bagian Header + Background */}
      <div
        className="pt-10 pb-20 px-4 text-white relative"
        style={{
          backgroundImage: "url('/bg.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* Header */}
        <div className="flex items-center mb-4">
          <Link href="/customer/motor/hasil">
            <ArrowLeft className="w-5 h-5 text-white" />
          </Link>
          <h1 className="flex-1 text-center font-semibold text-base">
            Pesan Motor
          </h1>
          <div className="w-5" />
        </div>

        {/* Box Ringkasan Perjalanan */}
        <div
          onClick={() => router.push("/customer/motor/detail")}
          className="bg-white text-gray-800 rounded-xl shadow p-4 space-y-1 cursor-pointer hover:bg-gray-50 transition"
        >
          <p className="text-xs text-gray-500">
            Sabtu, 14 September 2024 • 07.00 - 08.30
          </p>
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold">YOG POS 2 → SOLO POS 1</h2>
            <ChevronDown className="w-4 h-4 text-gray-500" />
          </div>
          <p className="text-xs">YAMAHA NMAX</p>
          <p className="text-xs">1 Penumpang</p>
        </div>
      </div>

      {/* Container Abu-Abu */}
      <div className="relative z-10 -mt-10 bg-gray-100 rounded-t-2xl px-4 flex-1 space-y-6 text-gray-800 pt-6 pb-6">
        {/* Rute Motor dan Harga */}
        <div className="bg-white rounded-xl p-4 space-y-4 shadow">
          <h2 className="text-sm font-bold text-gray-800">YAMAHA NMAX</h2>
          <p className="text-sm font-semibold text-gray-600 mt-1">Rute Motor</p>

          <div className="bg-white rounded-xl p-4 mt-2 shadow-sm border border-gray-100">
            <div className="flex justify-between text-sm text-gray-600">
              <div className="flex flex-col gap-1">
                <p className="text-sm font-semibold text-gray-800">07.00</p>
                <p className="text-xs text-gray-500">Sab, 14 Sep</p>
              </div>

              <div className="flex flex-col items-center justify-center gap-1 text-xs text-gray-500">
                <div className="w-2 h-2 rounded-full bg-blue-600" />
                <div className="w-0.5 h-4 bg-blue-200" />
                <div className="text-[10px] font-semibold text-blue-600">
                  🛵 YAMAHA NMAX
                </div>
                <div className="text-[10px]">AB1234UH</div>
                <div className="w-0.5 h-4 bg-blue-200" />
                <div className="w-2 h-2 rounded-full border border-blue-600" />
              </div>

              <div className="flex flex-col gap-1 text-right">
                <p className="text-sm font-semibold text-gray-800">08.30</p>
                <p className="text-xs text-gray-500">Sab, 14 Sep</p>
              </div>
            </div>

            <div className="flex justify-between mt-2 text-xs text-gray-600 font-medium">
              <p>YOGYAKARTA POS 2</p>
              <p>SOLO POS 1</p>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-800 mb-1">
              Detail Harga
            </h3>
            <div className="flex justify-between text-sm text-gray-800">
              <p className="text-gray-500">Total Harga</p>
              <p className="font-bold">Rp 110.000</p>
            </div>
          </div>
        </div>

        {/* Detail Penumpang */}
        <div className="bg-white rounded-xl p-4 space-y-4 text-sm shadow">
          <h3 className="text-sm font-semibold text-gray-800">
            Detail Penumpang
          </h3>

          <div className="space-y-1">
            <p className="text-xs text-gray-500">Nama</p>
            <p className="font-semibold">NADYA AMALYA FATHONI</p>
          </div>
          <div className="space-y-1">
            <p className="text-xs text-gray-500">Email</p>
            <p>nadya01mei@gmail.com</p>
          </div>
          <div className="space-y-1">
            <p className="text-xs text-gray-500">No Telepon</p>
            <p>08218839121</p>
          </div>
          <div className="space-y-1">
            <p className="text-xs text-gray-500">KTP</p>
            <p>201230920191921</p>
          </div>
        </div>

        {/* Tombol Lanjutkan */}
        <button
          onClick={() => router.push("/customer/motor/pembayaran")}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl text-sm"
        >
          Lanjutkan
        </button>
      </div>
    </div>
  );
}
