"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { ArrowLeft, ChevronDown, Pencil, Trash2, Plus } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

interface Penerima {
  id: number;
  tipeID: string;
  noID: string;
  nama: string;
}

export default function DetailPesananBarangUmumPage() {
  const router = useRouter();
  const params = useSearchParams();
  const [penerimaList, setPenerimaList] = useState<Penerima[]>([]);

  useEffect(() => {
    // Ambil list dari localStorage (disamakan dengan key di penerima/page.tsx)
    const storedSelected = localStorage.getItem("penerimaList");
    if (storedSelected) {
      try {
        setPenerimaList(JSON.parse(storedSelected));
      } catch {
        setPenerimaList([]);
      }
    }
  }, []);

  const hapusPenerima = (id: number) => {
    const updatedList = penerimaList.filter((p) => p.id !== id);
    setPenerimaList(updatedList);
    localStorage.setItem("penerimaList", JSON.stringify(updatedList));
  };

  const tanggal = params.get("tanggal") || "Sabtu, 14 September 2024";
  const berangkat = params.get("berangkat") || "07.00";
  const tiba = params.get("tiba") || "09.30";
  const dari = params.get("dari") || "YOGYAKARTA";
  const ke = params.get("ke") || "PURWOKERTO";
  const kendaraan = params.get("kendaraan") || "FAJAR UTAMA (YK)";
  const ukuran = params.get("ukuran") || "Barang Besar";

  // Buat query string untuk navigasi card
  const queryString = `?tanggal=${encodeURIComponent(tanggal)}&berangkat=${encodeURIComponent(
    berangkat
  )}&tiba=${encodeURIComponent(tiba)}&dari=${encodeURIComponent(
    dari
  )}&ke=${encodeURIComponent(ke)}&kendaraan=${encodeURIComponent(
    kendaraan
  )}&ukuran=${encodeURIComponent(ukuran)}`;

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-700 to-blue-500 text-white">
      {/* Header */}
      <div className="sticky top-0 z-30 flex items-center justify-between px-4 py-3 bg-blue-700">
        <Link href="/customer/barang-umum" className="text-white">
          <ArrowLeft size={24} />
        </Link>
        <h1 className="text-sm font-semibold">Barang (Transportasi Umum)</h1>
        <div className="w-6" />
      </div>

      {/* Box Rute */}
      <div className="p-4">
        <Link
          href={`/customer/barang-umum/detail${queryString}`}
          className="block bg-white text-black rounded-xl shadow-md p-4 space-y-1 hover:shadow-lg transition cursor-pointer"
        >
          <p className="text-xs text-gray-500">
            {tanggal} • {berangkat} - {tiba}
          </p>
          <h2 className="text-sm font-semibold">
            {dari} <span className="text-blue-600">→</span> {ke}
          </h2>
          <p className="text-sm text-gray-600">{kendaraan}</p>
          <div className="text-sm mt-1 flex items-center justify-between">
            <span>{ukuran}</span>
            <ChevronDown className="text-gray-500 w-4 h-4" />
          </div>
        </Link>
      </div>

      {/* Detail Form */}
      <div className="bg-gray-50 rounded-t-3xl p-4 mt-6 text-black space-y-6">
        {/* Pemesan */}
        <div>
          <h3 className="text-sm font-semibold mb-2">Detail Pemesanan</h3>
          <div className="bg-white rounded-xl p-4 shadow-sm text-sm space-y-1">
            <p className="font-semibold">NADYA AMALYA FATHONI</p>
            <p className="text-gray-600">nadya01mei@gmail.com</p>
            <p className="text-gray-600">08218839121</p>
          </div>
        </div>

        {/* Pengirim */}
        <div>
          <h3 className="text-sm font-semibold mb-2">Detail Pengirim Barang</h3>
          <div className="bg-white rounded-xl p-4 shadow-sm text-sm space-y-1">
            <p className="font-semibold">NADYA AMALYA FATHONI</p>
            <p className="text-gray-600">KTP - 2013202901921</p>
          </div>
        </div>

        {/* Penerima */}
        <div>
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-sm font-semibold">Detail Penerima Barang</h3>
            <Link
              href="/customer/barang-umum/penerima"
              className="flex items-center gap-1 text-blue-600 hover:text-blue-800 text-xs font-medium"
            >
              <Plus size={14} />
              Tambah Data Baru
            </Link>
          </div>

          {penerimaList.length > 0 ? (
            <div className="space-y-2">
              {penerimaList.map((p) => (
                <div
                  key={p.id}
                  className="bg-white rounded-xl p-4 shadow-sm text-sm flex justify-between items-start"
                >
                  <div>
                    <p className="font-semibold">{p.nama}</p>
                    <p className="text-gray-600">
                      {p.tipeID} - {p.noID}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => hapusPenerima(p.id)}
                      className="p-2 rounded-lg hover:bg-gray-100"
                    >
                      <Trash2 size={16} className="text-red-500" />
                    </button>
                    <Link
                      href={`/customer/barang-umum/penerima/edit?id=${p.id}`}
                      className="p-2 rounded-lg hover:bg-gray-100"
                    >
                      <Pencil size={16} className="text-gray-600" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-xl p-4 shadow-sm text-sm text-gray-500">
              Penerima Barang belum ditambahkan
            </div>
          )}
        </div>

        {/* Tombol Lanjutkan */}
        <button
          onClick={() =>
            router.push(`/customer/barang-umum/konfirmasi${queryString}`)
          }
          className="w-full bg-blue-600 hover:bg-blue-700 transition text-white font-semibold py-3 rounded-xl mt-4"
        >
          LANJUTKAN
        </button>
      </div>
    </div>
  );
}
