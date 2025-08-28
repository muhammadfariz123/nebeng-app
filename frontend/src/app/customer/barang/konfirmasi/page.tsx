"use client";

import { ArrowLeft, ChevronDown, ChevronUp } from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

interface Barang {
  nama: string;
  kategori: string;
  poin: number;
}

export default function KonfirmasiBarangPage() {
  const router = useRouter();
  const params = useSearchParams();

  const tanggal = params.get("tanggal") || "14 September 2024";
  const berangkat = params.get("berangkat") || "07.00";
  const tiba = params.get("tiba") || "09.30";
  const dari = params.get("dari") || "YOG POS 2";
  const ke = params.get("ke") || "SOLO POS 1";
  const kendaraan = params.get("kendaraan") || "DAIHATSU AYLA";
  const harga = 50000;

  const barang: Barang = {
    nama: "NADYA AMALYA FATHONI",
    kategori: "Barang Besar",
    poin: 20,
  };

  const [showDetail, setShowDetail] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      {/* Header Biru */}
      <div
        className="pt-10 pb-6 px-4 text-white relative"
        style={{
          backgroundImage: "url('/bg.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* Header */}
        <div className="flex items-center mb-5">
          <Link href="/customer/barang/pesan">
            <ArrowLeft className="w-5 h-5 text-white" />
          </Link>
          <h1 className="flex-1 text-center font-semibold text-base">
            Barang
          </h1>
          <div className="w-5" />
        </div>
      </div>

      {/* Konten Putih full lebar */}
      <div className="relative z-10 -mt-5 flex-1 pb-6">
        <div className="bg-white rounded-t-2xl shadow p-4 space-y-4">
          {/* Ringkasan Jadwal & Rute */}
          <div className="bg-white text-gray-800 rounded-xl shadow p-4 space-y-3">
            <p className="text-xs text-gray-500">
              {tanggal} • {berangkat} - {tiba}
            </p>
            <h2 className="text-sm font-bold">
              {dari} <span className="text-blue-600">→</span> {ke}
            </h2>

            {/* Kendaraan + toggle */}
            <button
              onClick={() => setShowDetail(!showDetail)}
              className="w-full flex justify-between items-center text-xs text-gray-600"
            >
              <span>{kendaraan}</span>
              {showDetail ? (
                <ChevronUp className="w-4 h-4 text-gray-500" />
              ) : (
                <ChevronDown className="w-4 h-4 text-gray-500" />
              )}
            </button>

            {/* Info Barang (expanded) */}
            {showDetail && (
              <div className="border rounded-xl p-3 mt-2 text-sm bg-[#f9fafb]">
                <p className="font-semibold">{barang.nama}</p>
                <p className="text-xs text-gray-500">{barang.kategori}</p>
                <p className="text-xs text-blue-600 mt-1">
                  Potensi mendapatkan {barang.poin} Poin
                </p>
              </div>
            )}

            <div className="flex justify-between items-center border-t pt-3">
              <span className="text-sm font-medium">Total</span>
              <span className="text-sm font-bold">
                Rp {harga.toLocaleString()}
              </span>
            </div>
          </div>

          {/* Rincian Harga */}
          <div className="bg-white rounded-xl shadow p-4 space-y-2">
            <h3 className="text-sm font-semibold">Rincian Harga</h3>
            <div className="flex justify-between text-sm">
              <span>{kendaraan}</span>
              <span>Rp {harga.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-xs text-gray-500">
              <span>{barang.kategori} (MAX 100 Kg)</span>
              <span>Rp {harga.toLocaleString()}</span>
            </div>
          </div>

          {/* Total Harga */}
          <div className="bg-white rounded-xl shadow p-4 flex justify-between items-center">
            <span className="text-sm font-semibold">Total Harga</span>
            <span className="text-blue-600 text-base font-bold">
              Rp {harga.toLocaleString()}
            </span>
          </div>

          {/* Checkbox Syarat */}
          <div className="flex items-start gap-2 text-xs bg-white rounded-xl shadow p-4">
            <input type="checkbox" className="mt-1" />
            <p>
              Saya telah membaca dan setuju terhadap{" "}
              <span className="text-blue-600 underline">
                Syarat dan ketentuan pemesanan nebeng
              </span>
            </p>
          </div>

          {/* Tombol Bayar */}
          <button
            className="w-full bg-blue-600 text-white font-semibold py-3 rounded-xl text-sm hover:bg-blue-700"
            onClick={() => router.push("/customer/barang/konfirmasi-pesanan")}
          >
            BAYAR
          </button>
        </div>
      </div>
    </div>
  );
}
