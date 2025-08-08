"use client";

import { ArrowLeft, ChevronDown } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function TambahPenerimaBarangPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [idType, setIdType] = useState("Pilih");
  const [idNumber, setIdNumber] = useState("");
  const [fullName, setFullName] = useState("");
  const [saveToList, setSaveToList] = useState(false);

  useEffect(() => {
    const selectedType = searchParams.get("idType");
    if (selectedType) {
      setIdType(selectedType);
    }
  }, [searchParams]);

  const handleSave = () => {
    const newReceiver = {
      name: fullName || "Nama Dummy",
      idType: idType === "Pilih" ? "KTP" : idType,
      idNumber: idNumber || "0000000000",
      saved: saveToList,
    };

    // Simpan ke daftar penerima jika toggle aktif
    if (saveToList) {
      const existing = localStorage.getItem("receivers");
      const receivers = existing ? JSON.parse(existing) : [];
      receivers.push(newReceiver);
      localStorage.setItem("receivers", JSON.stringify(receivers));
    }

    // Simpan sebagai penerima aktif (untuk halaman utama)
    localStorage.setItem("currentReceiver", JSON.stringify(newReceiver));

    // Arahkan kembali ke halaman utama barang umum
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
            <span className={`${idType === "Pilih" ? "text-gray-400" : ""}`}>
              {idType}
            </span>
            <ChevronDown className="w-4 h-4 text-gray-400" />
          </div>
        </div>

        {/* No ID */}
        <div>
          <label className="text-xs text-gray-500">No.ID</label>
          <input
            type="text"
            placeholder="Nomor Identitas"
            value={idNumber}
            onChange={(e) => setIdNumber(e.target.value)}
            className="w-full border rounded-lg px-3 py-3 text-sm mt-1 placeholder-gray-400"
          />
        </div>

        {/* Nama Lengkap */}
        <div>
          <label className="text-xs text-gray-500">Nama Lengkap</label>
          <input
            type="text"
            placeholder="Masukkan nama lengkap sesuai ID"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="w-full border rounded-lg px-3 py-3 text-sm mt-1 placeholder-gray-400"
          />
        </div>

        {/* Toggle Simpan ke daftar */}
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-700">
            Simpan ke daftar penerima barang
          </span>
          <button
            onClick={() => setSaveToList(!saveToList)}
            className={`w-10 h-6 flex items-center rounded-full p-1 transition-colors duration-300 ${
              saveToList ? "bg-blue-600" : "bg-gray-300"
            }`}
          >
            <div
              className={`w-4 h-4 bg-white rounded-full shadow-md transform transition-transform ${
                saveToList ? "translate-x-4" : "translate-x-0"
              }`}
            />
          </button>
        </div>
      </div>

      {/* Tombol Simpan */}
      <div className="p-4 mt-auto">
        <button
          onClick={handleSave}
          className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold text-sm"
        >
          SIMPAN
        </button>
      </div>
    </div>
  );
}
