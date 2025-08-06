"use client";

import { ArrowLeft, ChevronDown, ChevronUp } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

interface Passenger {
  name: string;
  idType: string;
  idNumber: string;
}

export default function PembayaranPage() {
  const router = useRouter();
  const [passengers, setPassengers] = useState<Passenger[]>([]);
  const [isExpanded, setIsExpanded] = useState(false);
  const hargaPerPenumpang = 90000; // contoh harga per penumpang
  const totalHarga = passengers.length * hargaPerPenumpang;

  useEffect(() => {
    const stored = localStorage.getItem("passengers");
    if (stored) {
      const filtered = JSON.parse(stored).filter(
        (p: Passenger) => p.name.trim() !== "" && p.idNumber.trim() !== ""
      );
      setPassengers(filtered);
    }
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-[#f5f7fa]">
      {/* Header */}
      <div className="bg-blue-600 text-white px-4 pt-10 pb-4 flex items-center">
        <Link href="/customer/mobil/pesan">
          <ArrowLeft className="w-5 h-5 text-white" />
        </Link>
        <h1 className="flex-1 text-center font-semibold text-base">
          Pesan Mobil
        </h1>
        <div className="w-5" />
      </div>

      {/* Card Nebeng Mobil */}
      <div className="bg-white rounded-2xl shadow mx-4 mt-4 p-4">
        <p className="text-xs text-gray-500">
          Sabtu, 14 September 2024 • 07.00 - 08.30
        </p>
        <h2 className="text-sm font-bold text-gray-800 mt-1">
          YOG POS 2 → SOLO POS 1
        </h2>
        <p className="text-xs text-gray-600">DAIHATSU AYLA</p>

        {/* Dropdown toggle */}
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex justify-between items-center w-full mt-2"
        >
          <span className="text-xs text-blue-600 font-medium">
            {isExpanded ? "Sembunyikan Penumpang" : "Lihat Penumpang"}
          </span>
          {isExpanded ? (
            <ChevronUp className="w-4 h-4 text-gray-500" />
          ) : (
            <ChevronDown className="w-4 h-4 text-gray-500" />
          )}
        </button>

        {/* Detail Penumpang */}
        {isExpanded && (
          <div className="mt-3 space-y-2">
            {passengers.map((p, index) => (
              <div
                key={index}
                className="border rounded-xl p-3 text-sm bg-[#f9fafb]"
              >
                <p className="font-semibold">{p.name}</p>
                <p className="text-xs text-gray-500">
                  Penumpang {index + 1}
                </p>
              </div>
            ))}
            <p className="text-xs text-blue-600 mt-1">
              Potensi mendapatkan {passengers.length * 25} Poin
            </p>
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
        <div className="flex justify-between text-sm mb-2">
          <span>DAIHATSU AYLA</span>
          <span>Rp {totalHarga.toLocaleString()}</span>
        </div>
        <div className="flex justify-between text-xs text-gray-500">
          <span>{passengers.length} Penumpang</span>
          <span>Rp {totalHarga.toLocaleString()}</span>
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
          onClick={() => router.push("/customer/mobil/konfirmasi-pesanan")}
        >
          BAYAR
        </button>
      </div>
    </div>
  );
}
