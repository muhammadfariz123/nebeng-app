"use client";

import { useEffect, useState } from "react";
import { ArrowLeft, ChevronDown } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function TambahPenerimaPage() {
  const [tipeID, setTipeID] = useState("");
  const [noID, setNoID] = useState("");
  const [nama, setNama] = useState("");
  const [simpan, setSimpan] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const savedTipeID = localStorage.getItem("selectedTipeID");
    if (savedTipeID) {
      setTipeID(savedTipeID);
    }
  }, []);

  const handleNoIDChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "");
    setNoID(value);
  };

  const handleSave = () => {
    if (!tipeID || !noID || !nama) {
      alert("Harap lengkapi semua data penerima!");
      return;
    }

    const penerimaData = {
      id: Date.now(),
      tipeID,
      noID,
      nama,
    };

    // Simpan penerima yang dipilih untuk halaman /pesan
    localStorage.setItem("selectedPenerimaBarang", JSON.stringify(penerimaData));

    // Kalau "Simpan ke daftar data" dicentang
    if (simpan) {
      const existingList = JSON.parse(localStorage.getItem("penerimaList") || "[]");
      existingList.push(penerimaData);
      localStorage.setItem("penerimaList", JSON.stringify(existingList));
    }

    router.push("/customer/barang-umum/pesan");
  };

  return (
    <div className="min-h-screen bg-white text-black">
      <div className="sticky top-0 z-30 flex items-center gap-3 px-4 py-4 border-b border-gray-200">
        <Link href="/customer/barang-umum/penerima" className="text-black">
          <ArrowLeft size={24} />
        </Link>
        <h1 className="text-base font-semibold">Tambah Data Baru</h1>
      </div>

      <div className="p-4 space-y-5">
        <div className="flex gap-3">
          <Link
            href="/customer/barang-umum/penerima/tambah/tipe-id"
            className="flex items-center justify-between bg-white border border-gray-300 rounded-lg px-3 py-3 text-sm w-1/2"
          >
            <span className={tipeID ? "text-black" : "text-gray-400"}>
              {tipeID || "Pilih"}
            </span>
            <ChevronDown size={16} className="text-gray-500" />
          </Link>

          <input
            type="tel"
            placeholder="Nomor Identitas"
            value={noID}
            onChange={handleNoIDChange}
            className="w-1/2 bg-white border border-gray-300 rounded-lg px-3 py-3 text-sm outline-none placeholder:text-gray-400"
            inputMode="numeric"
            pattern="[0-9]*"
          />
        </div>

        <input
          type="text"
          placeholder="Masukkan nama lengkap sesuai ID"
          value={nama}
          onChange={(e) => setNama(e.target.value)}
          className="w-full bg-white border border-gray-300 rounded-lg px-3 py-3 text-sm outline-none placeholder:text-gray-400"
        />

        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-800">Simpan ke daftar data</span>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={simpan}
              onChange={(e) => setSimpan(e.target.checked)}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-blue-600 transition-colors"></div>
            <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full shadow transform peer-checked:translate-x-5 transition-transform"></div>
          </label>
        </div>

        <button
          onClick={handleSave}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold"
        >
          SIMPAN
        </button>
      </div>
    </div>
  );
}
