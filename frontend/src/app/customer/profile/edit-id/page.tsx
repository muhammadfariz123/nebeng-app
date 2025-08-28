"use client";

import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export default function GantiNomorIdentitasPage() {
  const router = useRouter();
  const [idType, setIdType] = useState("");
  const [idNumber, setIdNumber] = useState("");

  // Ambil data dari profileData di localStorage saat pertama kali render
  useEffect(() => {
    const storedProfile = localStorage.getItem("profileData");
    if (storedProfile) {
      const profile = JSON.parse(storedProfile);
      setIdType(profile.idType || "KTP");
      setIdNumber(profile.idNumber || "");
    } else {
      // Kalau belum ada, buat default
      const defaultProfile = {
        phone: "",
        email: "",
        idType: "KTP",
        idNumber: "",
        fullName: "",
        gender: "",
        birthDate: "",
      };
      localStorage.setItem("profileData", JSON.stringify(defaultProfile));
      setIdType(defaultProfile.idType);
      setIdNumber(defaultProfile.idNumber);
    }
  }, []);

  // Simpan perubahan ke profileData
  const handleSave = () => {
    const storedProfile = localStorage.getItem("profileData");
    if (storedProfile) {
      const profile = JSON.parse(storedProfile);
      profile.idType = idType;
      profile.idNumber = idNumber;
      localStorage.setItem("profileData", JSON.stringify(profile));
    }
    alert("Nomor identitas berhasil diperbarui!");
    router.back();
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <div className="flex items-center p-4 bg-white shadow-sm">
        <button onClick={() => router.back()} className="mr-2">
          <ArrowLeft className="w-6 h-6" />
        </button>
        <h1 className="text-lg font-semibold">Ganti Nomor Identitas</h1>
      </div>

      {/* Info */}
      <p className="text-gray-500 text-sm px-4 py-3">
        Anda hanya bisa mengganti Nomor ID mu sebanyak 2 kali
      </p>

      {/* Form */}
      <div className="bg-white rounded-xl shadow-sm mx-4 p-4">
        <div className="flex items-center justify-between border-b border-gray-200 pb-2 mb-2">
          <span className="text-gray-500 text-sm">Tipe ID</span>
          <input
            type="text"
            value={idType}
            onChange={(e) => setIdType(e.target.value)}
            className="text-sm text-gray-800 font-medium text-right outline-none"
          />
        </div>
        <div className="flex items-center justify-between">
          <span className="text-gray-500 text-sm">No ID</span>
          <input
            type="text"
            value={idNumber}
            onChange={(e) => setIdNumber(e.target.value)}
            className="text-sm text-gray-800 font-medium text-right outline-none"
          />
        </div>
      </div>

      {/* Tombol Lanjutkan */}
      <div className="mt-auto p-4">
        <button
          onClick={handleSave}
          className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition"
        >
          Lanjutkan
        </button>
      </div>
    </div>
  );
}
