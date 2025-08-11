"use client";

import { ArrowLeft, Plus } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface Passenger {
  name: string;
  idType: string;
  idNumber: string;
}

export default function InformasiPenumpangPage() {
  const router = useRouter();
  const [passengers, setPassengers] = useState<Passenger[]>([]);
  const [searchTerm, setSearchTerm] = useState(""); // untuk pencarian

  useEffect(() => {
    const stored = localStorage.getItem("passengers");
    if (stored) {
      // Hanya ambil penumpang yang datanya tidak kosong
      const filtered = JSON.parse(stored).filter(
        (p: Passenger) => p.name.trim() !== "" && p.idNumber.trim() !== ""
      );
      setPassengers(filtered);
    } else {
      setPassengers([]);
    }
  }, []);

  // Filter penumpang berdasarkan searchTerm
  const filteredPassengers = passengers.filter((p) =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Header */}
      <div className="bg-white border-b px-4 pt-10 pb-4 flex items-center">
        <Link href="/customer/mobil/pesan">
          <ArrowLeft className="w-5 h-5 text-gray-700" />
        </Link>
        <h1 className="flex-1 text-center font-semibold text-base">
          Informasi Penumpang
        </h1>
        <div className="w-5" />
      </div>

      {/* Tombol Tambah Penumpang Baru */}
      <div className="p-4">
        <button
          onClick={() => router.push("/customer/mobil/penumpang/tambah")}
          className="flex items-center gap-2 w-full border border-gray-300 rounded-lg px-4 py-3 text-sm font-semibold text-blue-600"
        >
          <Plus className="w-4 h-4" />
          Tambah Penumpang Baru
        </button>
      </div>

      {/* Pencarian */}
      <div className="px-4 mb-2">
        <input
          type="text"
          placeholder="Cari nama penumpang"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full border rounded-lg px-3 py-2 text-sm"
        />
      </div>

      {/* Daftar Penumpang */}
      <div className="px-4">
        {filteredPassengers.length === 0 ? (
          <p className="text-gray-500 text-sm text-center mt-4">
            {searchTerm
              ? "Tidak ada penumpang yang cocok"
              : "Belum ada penumpang yang ditambahkan"}
          </p>
        ) : (
          filteredPassengers.map((p, index) => (
            <div
              key={index}
              className="flex justify-between items-center border-b py-4 cursor-pointer"
              onClick={() =>
                router.push(`/customer/mobil/penumpang/edit?index=${index}`)
              }
            >
              <div>
                <p className="font-semibold text-sm">{p.name}</p>
                <p className="text-xs text-gray-500">
                  {p.idType} - {p.idNumber}
                </p>
              </div>
              <span className="text-blue-600 text-sm">{">"}</span>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
