"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { ArrowLeft } from "lucide-react";

const ukuranOptions = [
  { label: "Besar", detail: "MAX 100 Kg" },
  { label: "Sedang", detail: "MAX 20 Kg" },
  { label: "Kecil", detail: "MAX 5 Kg" },
];

export default function UkuranBarangUmumPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const dari = searchParams.get("dari") || "";
  const ke = searchParams.get("ke") || "";
  const tanggal = searchParams.get("tanggal") || "";
  const selectedUkuran = searchParams.get("ukuran") || "";

  const handleSelect = (ukuran: string) => {
    router.push(
      `/customer/barang-umum/informasi?dari=${encodeURIComponent(
        dari
      )}&ke=${encodeURIComponent(ke)}&tanggal=${encodeURIComponent(
        tanggal
      )}&ukuran=${encodeURIComponent(ukuran)}`
    );
  };

  return (
    <div className="min-h-screen bg-white px-6 pt-6 pb-10">
      {/* Header */}
      <div className="flex items-center mb-4">
        <button
          onClick={() => router.back()}
          className="p-2 rounded-full hover:bg-gray-100 transition"
        >
          <ArrowLeft />
        </button>
        <h1 className="text-lg font-semibold ml-3">Ukuran Barang Umum</h1>
      </div>

      <div className="space-y-4">
        {ukuranOptions.map((item, idx) => {
          const isSelected = item.label === selectedUkuran;
          return (
            <div
              key={idx}
              onClick={() => handleSelect(item.label)}
              className="p-4 border rounded-lg flex items-center justify-between cursor-pointer hover:bg-gray-50"
            >
              <div>
                <p className="text-sm font-medium">{item.label}</p>
                <p className="text-xs text-red-500">{item.detail}</p>
              </div>
              <div
                className={`w-5 h-5 border-2 rounded-full flex items-center justify-center ${
                  isSelected ? "border-blue-600" : "border-gray-300"
                }`}
              >
                {isSelected && (
                  <div className="w-2.5 h-2.5 bg-blue-600 rounded-full" />
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
