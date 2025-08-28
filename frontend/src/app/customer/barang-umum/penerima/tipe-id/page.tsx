"use client";

import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export default function PilihTipeIDPage() {
  const router = useRouter();

  const pilihTipe = (type: string) => {
    // Kirim tipe ID ke halaman tambah dengan query param
    router.push(`/customer/barang-umum/penerima/tambah?idType=${encodeURIComponent(type)}`);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-white border-b px-4 pt-10 pb-4 flex items-center">
        <button onClick={() => router.back()}>
          <ArrowLeft className="w-5 h-5 text-gray-700" />
        </button>
        <h1 className="flex-1 text-center font-semibold text-base">
          Pilih Tipe ID
        </h1>
        <div className="w-5" />
      </div>

      {/* List */}
      <div className="p-4 space-y-4">
        {["KTP", "KK"].map((item) => (
          <div
            key={item}
            onClick={() => pilihTipe(item)}
            className="flex justify-between items-center border-b py-3 cursor-pointer"
          >
            <span className="text-sm">{item}</span>
            <span className="w-4 h-4 border rounded-full" />
          </div>
        ))}
      </div>
    </div>
  );
}
