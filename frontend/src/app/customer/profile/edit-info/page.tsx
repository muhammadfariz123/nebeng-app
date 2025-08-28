"use client";

import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export default function EditInfoPage() {
  const router = useRouter();
  const [fullName, setFullName] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [gender, setGender] = useState("");

  // Ambil data dari localStorage
  useEffect(() => {
    const storedProfile = localStorage.getItem("profileData");
    if (storedProfile) {
      const profile = JSON.parse(storedProfile);
      setFullName(profile.fullName || "");
      setBirthDate(profile.birthDate || "");
      setGender(profile.gender || "");
    } else {
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
    }
  }, []);

  const handleSave = () => {
    const storedProfile = localStorage.getItem("profileData");
    if (storedProfile) {
      const profile = JSON.parse(storedProfile);
      profile.fullName = fullName;
      profile.birthDate = birthDate;
      profile.gender = gender;
      localStorage.setItem("profileData", JSON.stringify(profile));
    }
    alert("Informasi diri berhasil diperbarui!");
    router.back();
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <div className="flex items-center p-4 bg-white shadow-sm">
        <button onClick={() => router.back()} className="mr-2">
          <ArrowLeft className="w-6 h-6" />
        </button>
        <h1 className="text-lg font-semibold">Informasi Diri</h1>
      </div>

      {/* Form */}
      <div className="flex flex-col gap-4 px-4 py-6">
        {/* Nama Lengkap */}
        <div className="bg-white rounded-xl shadow-sm p-4">
          <label className="text-gray-500 text-sm">Nama Lengkap</label>
          <input
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="w-full mt-1 text-gray-800 font-medium outline-none"
          />
        </div>

        {/* Tanggal Lahir */}
        <div className="bg-white rounded-xl shadow-sm p-4">
          <label className="text-gray-500 text-sm">Tanggal Lahir</label>
          <input
            type="date"
            value={birthDate}
            onChange={(e) => setBirthDate(e.target.value)}
            className="w-full mt-1 text-gray-800 font-medium outline-none"
          />
        </div>

        {/* Jenis Kelamin */}
        <div className="bg-white rounded-xl shadow-sm p-4">
          <label className="text-gray-500 text-sm">Jenis Kelamin</label>
          <div className="flex items-center gap-6 mt-2">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="gender"
                value="Laki-Laki"
                checked={gender === "Laki-Laki"}
                onChange={() => setGender("Laki-Laki")}
                className="w-4 h-4"
              />
              Laki-Laki
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="gender"
                value="Perempuan"
                checked={gender === "Perempuan"}
                onChange={() => setGender("Perempuan")}
                className="w-4 h-4"
              />
              Perempuan
            </label>
          </div>
        </div>
      </div>

      {/* Tombol Selesai */}
      <div className="mt-auto p-4">
        <button
          onClick={handleSave}
          className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition"
        >
          Selesai
        </button>
      </div>
    </div>
  );
}
