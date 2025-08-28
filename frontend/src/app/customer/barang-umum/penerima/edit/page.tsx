"use client";

import { useEffect, useState } from "react";
import { ArrowLeft, ChevronDown } from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";

interface Receiver {
  id: number;
  idType: string;
  idNumber: string;
  name: string;
}

export default function EditPenerimaBarangUmumPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const index = parseInt(searchParams.get("index") || "0");

  const [receiver, setReceiver] = useState<Receiver | null>(null);
  const [saveToList, setSaveToList] = useState(false);

  // Ambil data dari localStorage saat halaman dibuka
  useEffect(() => {
    const stored = localStorage.getItem("receivers");
    if (stored) {
      const receivers: Receiver[] = JSON.parse(stored);
      if (receivers[index]) {
        setReceiver(receivers[index]);
      }
    }

    // Cek apakah receiver ini sudah ada di daftar simpan
    const listStr = localStorage.getItem("receiverList");
    if (listStr && receiver) {
      const list: Receiver[] = JSON.parse(listStr);
      const found = list.some((r) => r.id === receiver.id);
      setSaveToList(found);
    }
  }, [index]);

  const handleSave = () => {
    if (!receiver?.idType || !receiver.idNumber || !receiver.name) {
      alert("Harap lengkapi semua data penerima!");
      return;
    }

    // Simpan perubahan ke daftar receiver utama
    const stored = localStorage.getItem("receivers");
    let receivers: Receiver[] = stored ? JSON.parse(stored) : [];
    receivers[index] = receiver;
    localStorage.setItem("receivers", JSON.stringify(receivers));

    // Update daftar simpan
    const listStr = localStorage.getItem("receiverList");
    let list: Receiver[] = listStr ? JSON.parse(listStr) : [];

    if (saveToList) {
      const existingIndex = list.findIndex((r) => r.id === receiver.id);
      if (existingIndex !== -1) {
        list[existingIndex] = receiver;
      } else {
        list.push(receiver);
      }
    } else {
      list = list.filter((r) => r.id !== receiver.id);
    }

    localStorage.setItem("receiverList", JSON.stringify(list));

    router.push("/customer/barang-umum/pesan");
  };

  if (!receiver) {
    return (
      <div className="p-4">
        <p>Data penerima tidak ditemukan.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header */}
      <div className="bg-white border-b px-4 pt-10 pb-4 flex items-center">
        <button onClick={() => router.back()}>
          <ArrowLeft className="w-5 h-5 text-gray-700" />
        </button>
        <h1 className="flex-1 text-center font-semibold text-base">
          Edit Penerima
        </h1>
        <div className="w-5" />
      </div>

      {/* Form */}
      <div className="p-4 space-y-4">
        <div className="flex gap-3">
          <Link
            href="/customer/barang-umum/penerima/edit/tipe-id"
            className="flex items-center justify-between bg-white border border-gray-300 rounded-lg px-3 py-3 text-sm w-1/2"
          >
            <span
              className={receiver.idType ? "text-black" : "text-gray-400"}
            >
              {receiver.idType || "Pilih"}
            </span>
            <ChevronDown size={16} className="text-gray-500" />
          </Link>

          <input
            type="tel"
            placeholder="Nomor Identitas"
            value={receiver.idNumber}
            onChange={(e) =>
              setReceiver({
                ...receiver,
                idNumber: e.target.value.replace(/\D/g, ""),
              })
            }
            className="w-1/2 bg-white border border-gray-300 rounded-lg px-3 py-3 text-sm outline-none placeholder:text-gray-400"
            inputMode="numeric"
            pattern="[0-9]*"
          />
        </div>

        <input
          type="text"
          placeholder="Masukkan nama lengkap sesuai ID"
          value={receiver.name}
          onChange={(e) =>
            setReceiver({ ...receiver, name: e.target.value })
          }
          className="w-full bg-white border border-gray-300 rounded-lg px-3 py-3 text-sm outline-none placeholder:text-gray-400"
        />

        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-800">Simpan ke daftar data</span>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={saveToList}
              onChange={(e) => setSaveToList(e.target.checked)}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-blue-600 transition-colors"></div>
            <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full shadow transform peer-checked:translate-x-5 transition-transform"></div>
          </label>
        </div>

        <button
          onClick={handleSave}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl text-sm"
        >
          Simpan
        </button>
      </div>
    </div>
  );
}
