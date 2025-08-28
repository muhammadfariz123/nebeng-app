"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { ArrowLeft, ImagePlus, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";
import Image from "next/image";

export default function InformasiBarangPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [ukuran, setUkuran] = useState("");
  const [catatan, setCatatan] = useState("");
  const [foto, setFoto] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const dari = searchParams.get("dari") || "";
  const ke = searchParams.get("ke") || "";
  const tanggal = searchParams.get("tanggal") || "";
  const ukuranParam = searchParams.get("ukuran") || "";

  useEffect(() => {
    if (ukuranParam) setUkuran(ukuranParam);
  }, [ukuranParam]);

  useEffect(() => {
    if (foto) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(foto);
    } else {
      setPreview(null);
    }
  }, [foto]);

  const handleUkuranClick = () => {
    router.push(
      `/customer/barang/informasi/ukuran?dari=${encodeURIComponent(dari)}&ke=${encodeURIComponent(
        ke
      )}&tanggal=${tanggal}&ukuran=${encodeURIComponent(ukuran)}`
    );
  };

  const handleSimpan = () => {
    const detail = `${ukuran}${catatan ? " - " + catatan : ""}`;

    // Simpan dummy data ke localStorage (opsional)
    const barangData = {
      dari,
      ke,
      tanggal,
      ukuran,
      catatan,
      foto: preview || null,
    };
    localStorage.setItem("dataBarang", JSON.stringify(barangData));

    // Redirect ke halaman barang dengan parameter
    router.push(
      `/customer/barang?dari=${encodeURIComponent(dari)}&ke=${encodeURIComponent(
        ke
      )}&tanggal=${tanggal}&barang=${encodeURIComponent(detail)}`
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
        <h1 className="text-lg font-semibold ml-3">Detail Barang</h1>
      </div>

      {/* Pilih ukuran */}
      <div className="mb-4">
        <label className="text-sm font-medium text-gray-700 mb-1 block">
          Ukuran Barang
        </label>
        <button
          onClick={handleUkuranClick}
          className="w-full border p-3 rounded-lg flex items-center justify-between text-sm hover:bg-gray-50 cursor-pointer"
        >
          <span>{ukuran || "Pilih ukuran barang anda"}</span>
          <ChevronRight className="w-4 h-4 text-gray-500" />
        </button>
      </div>

      {/* Catatan barang */}
      <div className="mb-4">
        <label className="text-sm font-medium text-gray-700 mb-1 block">
          Catatan Barang
        </label>
        <textarea
          value={catatan}
          onChange={(e) => setCatatan(e.target.value)}
          placeholder="Contoh: berisi dokumen"
          className="w-full border p-3 rounded-lg text-sm resize-none h-24"
        />
      </div>

      {/* Foto barang */}
      <div className="mb-6">
        <label className="text-sm font-medium text-gray-700 mb-1 block">
          Foto Barang
        </label>
        <div className="w-24 h-24 border rounded-lg flex items-center justify-center overflow-hidden bg-gray-50">
          {preview ? (
            <Image
              src={preview}
              alt="Preview"
              width={96}
              height={96}
              className="object-cover w-full h-full"
            />
          ) : (
            <label className="cursor-pointer flex flex-col items-center text-gray-400 text-sm">
              <ImagePlus className="w-6 h-6 mb-1" />
              <span className="text-xs">Upload</span>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) setFoto(file);
                }}
                className="hidden"
              />
            </label>
          )}
        </div>
      </div>

      {/* Simpan button */}
      <button
        onClick={handleSimpan}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-full py-3 transition"
      >
        SIMPAN
      </button>
    </div>
  );
}
