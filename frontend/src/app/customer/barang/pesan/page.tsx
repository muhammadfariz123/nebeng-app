"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { ArrowLeft, ChevronDown } from "lucide-react";
import Link from "next/link";

export default function DetailPesananBarangPage() {
  const router = useRouter();
  const params = useSearchParams();

  const tanggal = params.get("tanggal") || "Sabtu, 14 September 2024";
  const berangkat = params.get("berangkat") || "07.00";
  const tiba = params.get("tiba") || "09.30";
  const dari = params.get("dari") || "YOG POS 2";
  const ke = params.get("ke") || "SOLO POS 1";
  const kendaraan = params.get("kendaraan") || "DAIHATSU AYLA";

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      {/* Header + Background */}
      <div
        className="pt-10 pb-24 px-4 text-white relative"
        style={{
          backgroundImage: "url('/bg.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* Header */}
        <div className="flex items-center mb-5">
          <Link href="/customer/barang">
            <ArrowLeft className="w-5 h-5 text-white" />
          </Link>
          <h1 className="flex-1 text-center font-semibold text-base">
            Barang
          </h1>
          <div className="w-5" />
        </div>

        {/* Box Ringkasan Perjalanan */}
        <div
          onClick={() =>
            router.push(
              `/customer/barang/detail?tanggal=${tanggal}&berangkat=${berangkat}&tiba=${tiba}&dari=${dari}&ke=${ke}&kendaraan=${kendaraan}`
            )
          }
          className="bg-white text-gray-800 rounded-xl shadow p-4 space-y-1 cursor-pointer hover:bg-gray-50 transition"
        >
          <p className="text-xs text-gray-500">
            {tanggal} • {berangkat} - {tiba}
          </p>
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold">
              {dari} <span className="text-blue-600">→</span> {ke}
            </h2>
            <ChevronDown className="w-4 h-4 text-gray-500" />
          </div>
          <p className="text-xs">{kendaraan}</p>
          <p className="text-xs">Barang Besar</p>
        </div>
      </div>

      {/* Container Putih */}
      <div className="relative z-10 -mt-8 bg-gray-100 rounded-t-2xl px-4 flex-1 space-y-4 text-gray-800 pt-6 pb-6">
        {/* Detail Pemesanan */}
        <div className="bg-white rounded-xl p-4 space-y-3 shadow">
          <h3 className="text-sm font-semibold text-gray-800">
            Detail Pemesanan
          </h3>
          <div className="bg-gray-50 rounded-lg p-3 space-y-1">
            <p className="text-xs text-gray-500">Nama</p>
            <p className="text-sm font-semibold">NADYA AMALYA FATHONI</p>
          </div>
          <div className="bg-gray-50 rounded-lg p-3 space-y-1">
            <p className="text-xs text-gray-500">Email</p>
            <p className="text-sm">nadya01mei@gmail.com</p>
          </div>
          <div className="bg-gray-50 rounded-lg p-3 space-y-1">
            <p className="text-xs text-gray-500">No Telepon</p>
            <p className="text-sm">08218839121</p>
          </div>
        </div>

        {/* Detail Pengirim Barang */}
        <div className="bg-white rounded-xl p-4 space-y-3 shadow">
          <h3 className="text-sm font-semibold text-gray-800">
            Detail Pengirim Barang
          </h3>
          <div className="bg-gray-50 rounded-lg p-3 space-y-1">
            <p className="text-xs text-gray-500">Pengirim</p>
            <p className="text-sm font-semibold">NADYA AMALYA FATHONI</p>
            <p className="text-xs text-gray-500">KTP - 2013202901921</p>
          </div>
        </div>

        {/* Tombol Lanjutkan */}
        <button
          onClick={() =>
            router.push(
              `/customer/barang/konfirmasi?tanggal=${tanggal}&berangkat=${berangkat}&tiba=${tiba}&dari=${dari}&ke=${ke}&kendaraan=${kendaraan}`
            )
          }
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl text-sm"
        >
          Lanjutkan
        </button>
      </div>
    </div>
  );
}
