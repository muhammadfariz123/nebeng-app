"use client";

import { ArrowLeft, Plus } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface Receiver {
  name: string;
  idType: string;
  idNumber: string;
}

export default function InformasiPenerimaBarangPage() {
  const router = useRouter();
  const [receivers, setReceivers] = useState<Receiver[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const stored = localStorage.getItem("receivers");
    if (stored) {
      const filtered = JSON.parse(stored).filter(
        (r: Receiver) => r.name.trim() !== "" && r.idNumber.trim() !== ""
      );
      setReceivers(filtered);
    } else {
      setReceivers([]);
    }
  }, []);

  const filteredReceivers = receivers.filter((r) =>
    r.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Header */}
      <div className="bg-white border-b px-4 pt-10 pb-4 flex items-center">
        <Link href="/customer/barang/barang-umum">
          <ArrowLeft className="w-5 h-5 text-gray-700" />
        </Link>
        <h1 className="flex-1 text-center font-semibold text-base">
          Informasi Penerima Barang
        </h1>
        <div className="w-5" />
      </div>

      {/* Tombol Tambah Penerima Baru */}
      <div className="p-4">
        <button
          onClick={() => router.push("/customer/barang-umum/penerima/tambah")}
          className="flex items-center gap-2 w-full border border-gray-300 rounded-lg px-4 py-3 text-sm font-semibold text-blue-600"
        >
          <Plus className="w-4 h-4" />
          Tambah Data Baru
        </button>
      </div>

      {/* Pencarian */}
      <div className="px-4 mb-2">
        <input
          type="text"
          placeholder="Cari data tersimpan"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full border rounded-lg px-3 py-2 text-sm"
        />
      </div>

      {/* Daftar Penerima */}
      <div className="px-4">
        {filteredReceivers.length === 0 ? (
          <p className="text-gray-500 text-sm text-center mt-4">
            {searchTerm
              ? "Tidak ada penerima yang cocok"
              : "Belum ada data penerima yang ditambahkan"}
          </p>
        ) : (
          filteredReceivers.map((r, index) => (
            <div
              key={index}
              className="flex justify-between items-center border-b py-4 cursor-pointer"
              onClick={() =>
                router.push(`/customer/barang-umum/penerima/edit?index=${index}`)
              }
            >
              <div>
                <p className="font-semibold text-sm">{r.name}</p>
                <p className="text-xs text-gray-500">
                  {r.idType} - {r.idNumber}
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
