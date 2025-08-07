"use client";

import { ArrowLeft } from "lucide-react";
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

  const tanggal = params.get("tanggal") || "Sabtu, 14 September 2024";
  const berangkat = params.get("berangkat") || "07.00";
  const tiba = params.get("tiba") || "09.30";
  const dari = params.get("dari") || "YOGYAKARTA POS 2";
  const ke = params.get("ke") || "SOLO POS 1";
  const kendaraan = params.get("kendaraan") || "DAIHATSU AYLA";
  const harga = 50000;

  const barang: Barang = {
    nama: "NADYA AMALYA FATHONI",
    kategori: "Barang Besar",
    poin: 20,
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#f5f7fa]">
      {/* Header */}
      <div className="bg-blue-600 text-white px-4 pt-10 pb-4 flex items-center">
        <Link href="/customer/barang/pesan">
          <ArrowLeft className="w-5 h-5 text-white" />
        </Link>
        <h1 className="flex-1 text-center font-semibold text-base">Barang</h1>
        <div className="w-5" />
      </div>

      {/* Card Info Barang */}
      <div className="bg-white rounded-2xl shadow mx-4 mt-4 p-4">
        <p className="text-xs text-gray-500">
          {tanggal} • {berangkat} - {tiba}
        </p>
        <h2 className="text-sm font-bold text-gray-800 mt-1">
          {dari} → {ke}
        </h2>
        <p className="text-xs text-gray-600">{kendaraan}</p>

        {/* Info Barang */}
        <div className="border rounded-xl p-3 mt-3 text-sm bg-[#f9fafb]">
          <p className="font-semibold">{barang.nama}</p>
          <p className="text-xs text-gray-500">{barang.kategori}</p>
          <p className="text-xs text-blue-600 mt-1">
            Potensi mendapatkan {barang.poin} Poin
          </p>
        </div>

        <div className="flex justify-between items-center mt-3 border-t pt-3">
          <span className="text-sm font-medium">Total</span>
          <span className="text-sm font-bold">
            Rp {harga.toLocaleString()}
          </span>
        </div>
      </div>

      {/* Rincian Harga */}
      <div className="mx-4 mt-6 bg-white rounded-2xl shadow p-4">
        <h3 className="text-sm font-semibold mb-3">Rincian Harga</h3>
        <div className="flex justify-between text-sm mb-2">
          <span>{kendaraan}</span>
          <span>Rp {harga.toLocaleString()}</span>
        </div>
        <div className="flex justify-between text-xs text-gray-500">
          <span>{barang.kategori} (MAX 100 Kg)</span>
          <span>Rp {harga.toLocaleString()}</span>
        </div>
      </div>

      {/* Total Harga */}
      <div className="mx-4 mt-6 bg-white rounded-2xl shadow p-4">
        <div className="flex justify-between items-center text-sm font-semibold">
          <span>Total Harga</span>
          <span className="text-blue-600 text-base">
            Rp {harga.toLocaleString()}
          </span>
        </div>
      </div>

      {/* Checkbox Syarat */}
      <div className="mx-4 mt-4 flex items-start gap-2 text-xs">
        <input type="checkbox" className="mt-1" />
        <p>
          Saya telah membaca dan setuju terhadap{" "}
          <span className="text-blue-600 underline">
            Syarat dan ketentuan pemesanan nebeng
          </span>
        </p>
      </div>

      {/* Tombol Bayar */}
      <div className="p-4 mt-auto">
        <button
          className="w-full bg-blue-600 text-white font-semibold py-3 rounded-xl text-sm hover:bg-blue-700"
          onClick={() => router.push("/customer/barang/konfirmasi-pesanan")}
        >
          BAYAR
        </button>
      </div>
    </div>
  );
}
