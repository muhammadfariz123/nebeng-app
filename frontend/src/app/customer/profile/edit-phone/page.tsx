"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function EditPhonePage() {
  const router = useRouter();
  const [phone, setPhone] = useState("");

  // Ambil data awal dari localStorage
  useEffect(() => {
    const storedProfile = localStorage.getItem("profileData");
    if (storedProfile) {
      const profile = JSON.parse(storedProfile);
      setPhone(profile.phone || "");
    }
  }, []);

  // Simpan perubahan
  const handleSave = () => {
    const storedProfile = localStorage.getItem("profileData");
    if (storedProfile) {
      const profile = JSON.parse(storedProfile);
      profile.phone = phone;
      localStorage.setItem("profileData", JSON.stringify(profile));
    }
    router.push("/customer/profile/edit"); // arahkan kembali ke halaman utama profil
  };

  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Header */}
      <div className="flex items-center px-4 py-3 border-b border-gray-200">
        <Link href="/customer/profile">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-5 h-5 text-gray-700"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </Link>
        <h1 className="flex-1 text-center font-semibold text-gray-900">
          Ganti No. Telepon
        </h1>
        <div className="w-5"></div>
      </div>

      {/* Form */}
      <div className="flex-1 px-4 mt-6">
        <p className="text-gray-500 text-sm mb-3">
          Apakah Anda yakin untuk mengganti no telepon?
        </p>
        <input
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="No Telepon"
          className="w-full border border-gray-300 rounded-lg p-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Button */}
      <div className="p-4">
        <button
          onClick={handleSave}
          className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700"
        >
          Lanjutkan
        </button>
      </div>
    </div>
  );
}
