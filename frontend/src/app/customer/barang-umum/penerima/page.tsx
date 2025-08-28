"use client";

import { useEffect, useState } from "react";
import { ArrowLeft, Plus } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface Penerima {
  id: number;
  nama: string;
  tipeID: string;
  noID: string;
}

export default function PenerimaBarangPage() {
  const [penerimaList, setPenerimaList] = useState<Penerima[]>([]);
  const [search, setSearch] = useState("");
  const router = useRouter();

  useEffect(() => {
    const savedList = localStorage.getItem("penerimaList");
    if (savedList) {
      try {
        const parsed = JSON.parse(savedList).filter(
          (p: Penerima) =>
            p.nama.trim() !== "" &&
            p.noID.trim() !== "" &&
            p.tipeID.trim() !== ""
        );
        setPenerimaList(parsed);
      } catch {
        setPenerimaList([]);
      }
    }
  }, []);

  const filteredList = penerimaList.filter((p) =>
    p.nama.toLowerCase().includes(search.toLowerCase())
  );

  const handleSelect = (penerima: Penerima) => {
    localStorage.setItem("selectedPenerima", JSON.stringify(penerima));
    router.push("/customer/barang-umum/pesan");
  };

  return (
    <div className="min-h-screen bg-white text-black flex flex-col">
      {/* Header */}
      <div className="sticky top-0 z-30 flex items-center gap-3 px-4 py-3 bg-white border-b">
        <Link href="/customer/barang-umum/pesan" className="text-black">
          <ArrowLeft size={24} />
        </Link>
        <h1 className="flex-1 text-center text-sm font-semibold">
          Informasi Penerima Barang
        </h1>
        <div className="w-6" />
      </div>

      <div className="p-4 space-y-4">
        {/* Tombol Tambah Data Baru */}
        <Link
          href="/customer/barang-umum/penerima/tambah"
          className="flex items-center gap-2 w-full bg-white border border-gray-300 rounded-xl p-4 shadow-sm hover:shadow-md transition"
        >
          <Plus size={18} className="text-blue-600" />
          <span className="text-sm font-semibold text-blue-600">
            Tambah Data Baru
          </span>
        </Link>

        {/* Search */}
        <div>
          <p className="text-xs text-gray-500 mb-2">
            atau, pilih dari daftar data tersimpan
          </p>
          <input
            type="text"
            placeholder="Cari data tersimpan"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-white border border-gray-300 rounded-lg px-3 py-2 text-sm outline-none"
          />
        </div>

        {/* List Penerima */}
        <div className="space-y-2">
          {filteredList.length > 0 ? (
            filteredList.map((p) => (
              <button
                key={p.id}
                onClick={() => handleSelect(p)}
                className="flex items-center justify-between w-full bg-white border border-gray-200 rounded-xl px-4 py-3 shadow-sm hover:shadow-md transition"
              >
                <div className="text-left">
                  <p className="text-sm font-semibold">{p.nama}</p>
                  <p className="text-xs text-gray-500">
                    {p.tipeID} - {p.noID}
                  </p>
                </div>
                <span className="text-gray-400 text-lg">›</span>
              </button>
            ))
          ) : (
            <p className="text-sm text-gray-500">
              {search
                ? "Tidak ada penerima yang cocok"
                : "Belum ada data penerima tersimpan."}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
