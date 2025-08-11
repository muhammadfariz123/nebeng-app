"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { ArrowLeft, ChevronDown } from "lucide-react";
import Link from "next/link";

export default function DetailPesananBarangPage() {
  const router = useRouter(); // ✅ Pindahkan ke sini
  const params = useSearchParams();

  const tanggal = params.get("tanggal") || "Sabtu, 14 September 2024";
  const berangkat = params.get("berangkat") || "08.00";
  const tiba = params.get("tiba") || "10.30";
  const dari = params.get("dari") || "YOGYAKARTA POS 2";
  const ke = params.get("ke") || "SOLO POS 1";
  const kendaraan = params.get("kendaraan") || "TOYOTA AGYA";

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-700 to-blue-500 text-white">
      {/* Header */}
      <div className="sticky top-0 z-30 flex items-center justify-between px-4 py-3 bg-blue-700">
        <Link href="/customer/barang" className="text-white">
          <ArrowLeft size={24} />
        </Link>
        <h1 className="text-sm font-semibold">Barang</h1>
        <div className="w-6" />
      </div>

      {/* Box Rute & Info */}
      <div className="p-4">
        <Link
          href={{
            pathname: "/customer/barang/detail",
            query: {
              tanggal,
              berangkat,
              tiba,
              dari,
              ke,
              kendaraan,
            },
          }}
          className="block"
        >
          <div className="bg-white text-black rounded-xl shadow-md p-4 space-y-1 hover:shadow-lg transition">
            <p className="text-xs text-gray-500">
              {tanggal} • {berangkat} - {tiba}
            </p>
            <h2 className="text-sm font-semibold">
              {dari} <span className="text-blue-600">→</span> {ke}
            </h2>
            <p className="text-sm text-gray-600">{kendaraan}</p>
            <div className="text-sm mt-1 flex items-center justify-between">
              <span>Barang Besar</span>
              <ChevronDown className="text-gray-500 w-4 h-4" />
            </div>
          </div>
        </Link>
      </div>

      {/* Form Detail Pemesanan */}
      <div className="bg-gray-50 rounded-t-3xl p-4 mt-6 text-black space-y-6">
        <div>
          <h3 className="text-sm font-semibold mb-2">Detail Pemesanan</h3>
          <div className="bg-white rounded-xl p-4 shadow-sm text-sm space-y-1">
            <p className="font-semibold">NADYA AMALYA FATHONI</p>
            <p className="text-gray-600">nadya01mei@gmail.com</p>
            <p className="text-gray-600">08218839121</p>
          </div>
        </div>

        <div>
          <h3 className="text-sm font-semibold mb-2">Detail Pengirim Barang</h3>
          <div className="bg-white rounded-xl p-4 shadow-sm text-sm space-y-1">
            <p className="font-semibold">NADYA AMALYA FATHONI</p>
            <p className="text-gray-600">KTP - 2013202901921</p>
          </div>
        </div>

        {/* Tombol Lanjutkan */}
        <button
          onClick={() =>
            router.push(
              `/customer/barang/konfirmasi?tanggal=${tanggal}&berangkat=${berangkat}&tiba=${tiba}&dari=${dari}&ke=${ke}&kendaraan=${kendaraan}`
            )
          }
          className="w-full bg-blue-600 hover:bg-blue-700 transition text-white font-semibold py-3 rounded-xl mt-4"
        >
          LANJUTKAN
        </button>
      </div>
    </div>
  );
}
