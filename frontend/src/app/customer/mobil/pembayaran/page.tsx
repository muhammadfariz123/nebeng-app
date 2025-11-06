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

interface Tebengan {
  id: number;
  asal: string;
  tujuan: string;
  waktu: string;
  harga: number;
  type: string;
  driverName: string;
  jumlahPenumpang: number;
}

export default function PembayaranPage() {
  const router = useRouter();
  const [passengers, setPassengers] = useState<Passenger[]>([]);
  const [selectedTebengan, setSelectedTebengan] = useState<Tebengan | null>(
    null
  );
  const [isExpanded, setIsExpanded] = useState(false);
  const [totalHarga, setTotalHarga] = useState(0);

  // 🔹 Ambil data dari localStorage (hasil dari pesan/page.tsx)
  useEffect(() => {
    const storedPassengers = localStorage.getItem("passengers");
    const storedTebengan = localStorage.getItem("selectedTebengan");

    if (storedPassengers) {
      const filtered = JSON.parse(storedPassengers).filter(
        (p: Passenger) => p.name.trim() !== "" && p.idNumber.trim() !== ""
      );
      setPassengers(filtered);
    }

    if (storedTebengan) {
      const parsed = JSON.parse(storedTebengan);
      setSelectedTebengan(parsed);

      // Hitung total harga
      const harga = Number(parsed.harga || 0);
      const total = harga * (JSON.parse(storedPassengers || "[]").length || 0);
      setTotalHarga(total);
    }
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-[#f5f7fa]">
      {/* 🔹 Header */}
      <div
        className="relative text-white px-4 pt-10 pb-4 flex items-center"
        style={{
          backgroundImage: "url('/bg.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <Link href="/customer/mobil/pesan">
          <ArrowLeft className="w-5 h-5 text-white" />
        </Link>
        <h1 className="flex-1 text-center font-semibold text-base">
          Pesan Mobil
        </h1>
        <div className="w-5" />
      </div>

      {/* 🔹 Card Detail Nebeng */}
      <div className="bg-white rounded-2xl shadow mx-4 mt-4 p-4">
        {selectedTebengan ? (
          <>
            <p className="text-xs text-gray-500">
              {new Date(selectedTebengan.waktu).toLocaleDateString("id-ID", {
                weekday: "long",
                day: "numeric",
                month: "long",
                year: "numeric",
              })}{" "}
              •{" "}
              {new Date(selectedTebengan.waktu).toLocaleTimeString("id-ID", {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </p>
            <h2 className="text-sm font-bold text-gray-800 mt-1">
              {selectedTebengan.asal} → {selectedTebengan.tujuan}
            </h2>
            <p className="text-xs text-gray-600">
              {selectedTebengan.driverName?.toUpperCase() || "Driver Tidak Dikenal"}
            </p>
          </>
        ) : (
          <p className="text-sm text-gray-500">Memuat data tebengan...</p>
        )}

        {/* 🔹 Tombol dropdown penumpang */}
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

        {/* 🔹 Detail Penumpang */}
        {isExpanded && (
          <div className="mt-3 space-y-2">
            {passengers.map((p, index) => (
              <div
                key={index}
                className="border rounded-xl p-3 text-sm bg-[#f9fafb]"
              >
                <p className="font-semibold">{p.name}</p>
                <p className="text-xs text-gray-500">
                  {p.idType} • {p.idNumber}
                </p>
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

        {/* 🔹 Total */}
        <div className="flex justify-between items-center mt-3 border-t pt-3">
          <span className="text-sm font-medium">Total</span>
          <span className="text-sm font-bold text-blue-600">
            Rp {totalHarga.toLocaleString("id-ID")}
          </span>
        </div>
      </div>

      {/* 🔹 Rincian Harga */}
      <div className="mx-4 mt-6 bg-white rounded-2xl shadow p-4">
        <h3 className="text-sm font-semibold mb-3">Rincian Harga</h3>
        {selectedTebengan && (
          <>
            <div className="flex justify-between text-sm mb-2">
              <span>{selectedTebengan.type.toUpperCase()}</span>
              <span>
                Rp {Number(selectedTebengan.harga).toLocaleString("id-ID")}
              </span>
            </div>
            <div className="flex justify-between text-xs text-gray-500">
              <span>{passengers.length} Penumpang</span>
              <span>Rp {totalHarga.toLocaleString("id-ID")}</span>
            </div>
          </>
        )}
      </div>

      {/* 🔹 Total Harga */}
      <div className="mx-4 mt-6 bg-white rounded-2xl shadow p-4">
        <div className="flex justify-between items-center text-sm font-semibold">
          <span>Total Harga</span>
          <span className="text-blue-600 text-base">
            Rp {totalHarga.toLocaleString("id-ID")}
          </span>
        </div>
      </div>

      {/* 🔹 Checkbox Syarat */}
      <div className="mx-4 mt-4 flex items-start gap-2 text-xs">
        <input type="checkbox" className="mt-1" />
        <p>
          Saya telah membaca dan setuju terhadap{" "}
          <span className="text-blue-600 underline">
            Syarat dan ketentuan pemesanan nebeng
          </span>
        </p>
      </div>

      {/* 🔹 Tombol Bayar */}
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
