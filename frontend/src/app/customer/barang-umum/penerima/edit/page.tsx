"use client";

import { useEffect, useState } from "react";
import { ArrowLeft, ChevronDown } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface Penerima {
  id: number;
  tipeID: string;
  noID: string;
  nama: string;
}

export default function EditPenerimaPage() {
  const [penerima, setPenerima] = useState<Penerima | null>(null);
  const [simpan, setSimpan] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const stored = localStorage.getItem("penerimaBarang");
    if (stored) {
      const parsed: Penerima = JSON.parse(stored);
      setPenerima(parsed);

      // cek apakah penerima ini sudah ada di daftar simpan
      const listStr = localStorage.getItem("penerimaList");
      if (listStr) {
        const list: Penerima[] = JSON.parse(listStr);
        const found = list.some((p) => p.id === parsed.id);
        setSimpan(found);
      }
    }
  }, []);

  const handleNoIDChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!penerima) return;
    const value = e.target.value.replace(/\D/g, "");
    setPenerima({ ...penerima, noID: value });
  };

  const handleChangeNama = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!penerima) return;
    setPenerima({ ...penerima, nama: e.target.value });
  };

  const handleSave = () => {
    if (!penerima?.tipeID || !penerima.noID || !penerima.nama) {
      alert("Harap lengkapi semua data penerima!");
      return;
    }

    // Update data di localStorage
    localStorage.setItem("penerimaBarang", JSON.stringify(penerima));

    const listStr = localStorage.getItem("penerimaList");
    let list: Penerima[] = listStr ? JSON.parse(listStr) : [];

    if (simpan) {
      // jika sudah ada, update; jika belum, tambah
      const existingIndex = list.findIndex((p) => p.id === penerima.id);
      if (existingIndex !== -1) {
        list[existingIndex] = penerima;
      } else {
        list.push(penerima);
      }
    } else {
      // jika tidak disimpan, hapus dari daftar
      list = list.filter((p) => p.id !== penerima.id);
    }

    localStorage.setItem("penerimaList", JSON.stringify(list));

    // arahkan ke halaman pesan
    router.push("/customer/barang-umum/pesan");
  };

  if (!penerima) {
    return (
      <div className="p-4">
        <p>Data penerima tidak ditemukan.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white text-black">
      {/* Header */}
      <div className="sticky top-0 z-30 flex items-center gap-3 px-4 py-4 border-b border-gray-200">
        <Link href="/customer/barang-umum/detail" className="text-black">
          <ArrowLeft size={24} />
        </Link>
        <h1 className="text-base font-semibold">Edit Data Penerima</h1>
      </div>

      {/* Form */}
      <div className="p-4 space-y-5">
        <div className="flex gap-3">
          <Link
            href="/customer/barang-umum/penerima/edit/tipe-id"
            className="flex items-center justify-between bg-white border border-gray-300 rounded-lg px-3 py-3 text-sm w-1/2"
          >
            <span className={penerima.tipeID ? "text-black" : "text-gray-400"}>
              {penerima.tipeID || "Pilih"}
            </span>
            <ChevronDown size={16} className="text-gray-500" />
          </Link>

          <input
            type="tel"
            placeholder="Nomor Identitas"
            value={penerima.noID}
            onChange={handleNoIDChange}
            className="w-1/2 bg-white border border-gray-300 rounded-lg px-3 py-3 text-sm outline-none placeholder:text-gray-400"
            inputMode="numeric"
            pattern="[0-9]*"
          />
        </div>

        <input
          type="text"
          placeholder="Masukkan nama lengkap sesuai ID"
          value={penerima.nama}
          onChange={handleChangeNama}
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
