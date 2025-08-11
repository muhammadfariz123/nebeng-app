"use client";

import { useEffect, useState } from "react";
import { ArrowLeft, ChevronDown } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";

export default function TambahPenerimaBarangPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [tipeID, setTipeID] = useState("Pilih");
  const [noID, setNoID] = useState("");
  const [nama, setNama] = useState("");
  const [simpan, setSimpan] = useState(false);

  // Ambil tipe ID dari parameter URL jika ada
  useEffect(() => {
    const selectedType = searchParams.get("idType");
    if (selectedType) {
      setTipeID(selectedType);
    } else {
      const savedTipeID = localStorage.getItem("selectedTipeID");
      if (savedTipeID) setTipeID(savedTipeID);
    }
  }, [searchParams]);

  // Hanya izinkan angka untuk No ID
  const handleNoIDChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "");
    setNoID(value);
  };

  const handleSave = () => {
    if (!tipeID || tipeID === "Pilih" || !noID || !nama) {
      alert("Harap lengkapi semua data penerima!");
      return;
    }

    const penerimaData = {
      id: Date.now(),
      tipeID,
      noID,
      nama,
      saved: simpan,
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
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header */}
      <div className="bg-white border-b px-4 pt-10 pb-4 flex items-center">
        <button onClick={() => router.back()}>
          <ArrowLeft className="w-5 h-5 text-gray-700" />
        </button>
        <h1 className="flex-1 text-center font-semibold text-base">
          Tambah Penerima Barang Baru
        </h1>
        <div className="w-5" />
      </div>

      {/* Form */}
      <div className="p-4 space-y-4">
        {/* Pilih Tipe ID */}
        <div>
          <label className="text-xs text-gray-500">Tipe ID</label>
          <div
            onClick={() =>
              router.push("/customer/barang-umum/penerima/tipe-id")
            }
            className="flex justify-between items-center border rounded-lg px-3 py-3 text-sm mt-1 cursor-pointer"
          >
            <span className={`${tipeID === "Pilih" ? "text-gray-400" : ""}`}>
              {tipeID}
            </span>
            <ChevronDown className="w-4 h-4 text-gray-400" />
          </div>
        </div>

        {/* No ID */}
        <div>
          <label className="text-xs text-gray-500">No.ID</label>
          <input
            type="tel"
            placeholder="Nomor Identitas"
            value={noID}
            onChange={handleNoIDChange}
            className="w-full border rounded-lg px-3 py-3 text-sm mt-1 placeholder-gray-400"
            inputMode="numeric"
            pattern="[0-9]*"
          />
        </div>

        {/* Nama Lengkap */}
        <div>
          <label className="text-xs text-gray-500">Nama Lengkap</label>
          <input
            type="text"
            placeholder="Masukkan nama lengkap sesuai ID"
            value={nama}
            onChange={(e) => setNama(e.target.value)}
            className="w-full border rounded-lg px-3 py-3 text-sm mt-1 placeholder-gray-400"
          />
        </div>

        {/* Toggle Simpan ke daftar */}
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-700">
            Simpan ke daftar penerima barang
          </span>
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
      </div>

      {/* Tombol Simpan */}
      <div className="p-4 mt-auto">
        <button
          onClick={handleSave}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold text-sm"
        >
          SIMPAN
        </button>
      </div>
    </div>
  );
}
