"use client";

import { ArrowLeft, ChevronDown, ChevronUp } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

interface Barang {
  pengirim: string;
  jenis: string;
  berat: number; // dalam Kg
}

export default function PembayaranBarangUmumPage() {
  const router = useRouter();
  const [barangList, setBarangList] = useState<Barang[]>([]);
  const [isExpanded, setIsExpanded] = useState(false);

  const hargaPerBarang = 90000; // harga contoh
  const totalHarga = barangList.length * hargaPerBarang;

  useEffect(() => {
    const stored = localStorage.getItem("barangUmum");
    if (stored) {
      const filtered = JSON.parse(stored).filter(
        (b: Barang) => b.pengirim.trim() !== "" && b.jenis.trim() !== ""
      );
      setBarangList(filtered);
    } else {
      // Dummy data untuk contoh
      setBarangList([
        { pengirim: "NADYA AMALYA FATHONI", jenis: "Barang Besar", berat: 100 }
      ]);
    }
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Header */}
      <div className="bg-blue-600 text-white px-4 pt-10 pb-4 flex items-center">
        <Link href="/customer/barang-umum">
          <ArrowLeft className="w-5 h-5 text-white" />
        </Link>
        <h1 className="flex-1 text-center font-semibold text-base">
          Barang (Transportasi Umum)
        </h1>
        <div className="w-5" />
      </div>

      {/* Card Nebeng Barang */}
      <div className="bg-white mx-4 mt-4 p-4 rounded-2xl shadow">
        <p className="text-xs text-gray-500">
          14 September 2024 • 07.00 - 09.30
        </p>
        <h2 className="text-sm font-bold text-gray-800 mt-1">
          YOGYAKARTA → PURWOKERTO
        </h2>
        <p className="text-xs text-gray-600">FAJAR UTAMA (YK)</p>

        {/* Toggle Detail */}
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex justify-between items-center w-full mt-2"
        >
          <span className="text-xs text-blue-600 font-medium">
            {isExpanded ? "Sembunyikan Detail" : "Lihat Detail"}
          </span>
          {isExpanded ? (
            <ChevronUp className="w-4 h-4 text-gray-500" />
          ) : (
            <ChevronDown className="w-4 h-4 text-gray-500" />
          )}
        </button>

        {/* Detail Barang */}
        {isExpanded && (
          <div className="mt-3 space-y-2">
            {barangList.map((b, index) => (
              <div
                key={index}
                className="border rounded-xl p-3 text-sm bg-[#f9fafb]"
              >
                <p className="font-semibold">{b.pengirim}</p>
                <p className="text-xs text-gray-500">{b.jenis}</p>
                <p className="text-xs text-blue-600 mt-1">
                  Potensi mendapatkan {18} Poin
                </p>
              </div>
            ))}
          </div>
        )}

        <div className="flex justify-between items-center mt-3 border-t pt-3">
          <span className="text-sm font-medium">Total</span>
          <span className="text-sm font-bold">
            Rp {totalHarga.toLocaleString()}
          </span>
        </div>
      </div>

      {/* Rincian Harga */}
      <div className="mx-4 mt-6 bg-white rounded-2xl shadow p-4">
        <h3 className="text-sm font-semibold mb-3">Rincian Harga</h3>
        {barangList.map((b, index) => (
          <div key={index} className="flex justify-between text-sm mb-2">
            <span>{b.jenis}</span>
            <span>Rp {hargaPerBarang.toLocaleString()}</span>
          </div>
        ))}
        <div className="flex justify-between text-xs text-gray-500">
          <span>Barang besar (MAX 100 Kg)</span>
          <span>Rp {hargaPerBarang.toLocaleString()}</span>
        </div>
      </div>

      {/* Total Harga */}
      <div className="mx-4 mt-6 bg-white rounded-2xl shadow p-4">
        <div className="flex justify-between items-center text-sm font-semibold">
          <span>Total Harga</span>
          <span className="text-blue-600 text-base">
            Rp {totalHarga.toLocaleString()}
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
          onClick={() => router.push("/customer/barang-umum/konfirmasi")}
        >
          BAYAR
        </button>
      </div>
    </div>
  );
}
