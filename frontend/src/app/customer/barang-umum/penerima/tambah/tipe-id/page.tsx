"use client";

import { useState, useEffect } from "react";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function PilihTipeIDPage() {
  const router = useRouter();
  const [selected, setSelected] = useState("");

  // Ambil data dari localStorage saat halaman dibuka
  useEffect(() => {
    const saved = localStorage.getItem("selectedTipeID");
    if (saved) {
      setSelected(saved);
    }
  }, []);

  // Fungsi memilih tipe ID
  const handleSelect = (value: string) => {
    setSelected(value);
    localStorage.setItem("selectedTipeID", value);
    router.push("/customer/barang-umum/penerima/tambah"); // kembali ke form tambah
  };

  return (
    <div className="min-h-screen bg-white text-black">
      {/* Header */}
      <div className="sticky top-0 z-30 flex items-center gap-3 px-4 py-3 border-b">
        <Link href="/customer/barang-umum/penerima/tambah" className="text-black">
          <ArrowLeft size={24} />
        </Link>
        <h1 className="text-sm font-semibold">Pilih Tipe ID</h1>
      </div>

      {/* List pilihan */}
      <div className="divide-y">
        <button
          onClick={() => handleSelect("KTP")}
          className="w-full text-left px-4 py-3 hover:bg-gray-50 flex items-center justify-between"
        >
          <span>KTP</span>
          <input
            type="radio"
            name="tipe-id"
            checked={selected === "KTP"}
            readOnly
          />
        </button>
        <button
          onClick={() => handleSelect("KK")}
          className="w-full text-left px-4 py-3 hover:bg-gray-50 flex items-center justify-between"
        >
          <span>KK</span>
          <input
            type="radio"
            name="tipe-id"
            checked={selected === "KK"}
            readOnly
          />
        </button>
      </div>
    </div>
  );
}
