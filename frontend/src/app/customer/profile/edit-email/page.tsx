"use client";

import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export default function GantiEmailPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");

  // Ambil email dari profileData
  useEffect(() => {
    const storedProfile = localStorage.getItem("profileData");
    if (storedProfile) {
      const profile = JSON.parse(storedProfile);
      setEmail(profile.email || "");
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
      setEmail(defaultProfile.email);
    }
  }, []);

  // Simpan perubahan email
  const handleSave = () => {
    const storedProfile = localStorage.getItem("profileData");
    if (storedProfile) {
      const profile = JSON.parse(storedProfile);
      profile.email = email;
      localStorage.setItem("profileData", JSON.stringify(profile));
    }
    alert("Email berhasil diperbarui!");
    router.back();
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <div className="flex items-center p-4 bg-white shadow-sm">
        <button onClick={() => router.back()} className="mr-2">
          <ArrowLeft className="w-6 h-6" />
        </button>
        <h1 className="text-lg font-semibold">Ganti Email</h1>
      </div>

      {/* Info */}
      <p className="text-gray-500 text-sm px-4 py-3">
        Kami akan mengirimkan kode OTP verifikasi ke email lamamu
      </p>

      {/* Form */}
      <div className="bg-white rounded-xl shadow-sm mx-4 p-4">
        <div className="flex flex-col">
          <label className="text-gray-500 text-sm mb-1">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full text-gray-800 font-medium outline-none"
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
