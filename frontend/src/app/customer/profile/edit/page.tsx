"use client";

import { useEffect, useState } from "react";
import { Camera } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation"; // ⬅️ tambahkan ini

export default function EditProfilePage() {
  const router = useRouter(); // ⬅️ buat instance router

  const [profile, setProfile] = useState({
    phone: "",
    email: "",
    idType: "",
    idNumber: "",
    fullName: "",
    gender: "",
    birthDate: "",
  });

  // Load dari localStorage
  useEffect(() => {
    const storedProfile = localStorage.getItem("profileData");
    if (storedProfile) {
      setProfile(JSON.parse(storedProfile));
    } else {
      // Default data
      const defaultData = {
        phone: "0812188391212",
        email: "nadya01mei@gmail.com",
        idType: "KTP",
        idNumber: "2012302901921",
        fullName: "Nadya Amalya",
        gender: "Perempuan",
        birthDate: "01 Mei 2000",
      };
      setProfile(defaultData);
      localStorage.setItem("profileData", JSON.stringify(defaultData));
    }
  }, []);

  // Simpan ke localStorage lalu redirect
  const handleSave = () => {
    localStorage.setItem("profileData", JSON.stringify(profile));
    alert("Data berhasil disimpan!");
    router.push("/customer/profile"); // ⬅️ redirect setelah simpan
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
          Informasi Diri
        </h1>
        <div className="w-5"></div>
      </div>

      {/* Avatar */}
      <div className="flex justify-center mt-6 relative">
        <div className="w-20 h-20 bg-blue-500 rounded-full flex items-center justify-center text-white">
          <Image
            src="/icons/user-avatar.svg"
            alt="Avatar"
            width={40}
            height={40}
          />
        </div>
        <div className="absolute bottom-0 translate-x-8 translate-y-4 bg-gray-200 rounded-full p-1 border border-white cursor-pointer">
          <Camera className="w-4 h-4 text-gray-700" />
        </div>
      </div>

      {/* Form Fields */}
      <div className="mt-8 px-4 space-y-4">
        <Field
          label="No Telepon"
          value={profile.phone}
          editable
          editHref="/customer/profile/edit-phone"
        />
        <Field
          label="Email"
          value={profile.email}
          editable
          editHref="/customer/profile/edit-email"
        />
        <Field
          label="Tipe ID"
          value={profile.idType}
          subLabel="No ID"
          subValue={profile.idNumber}
          editable
          editHref="/customer/profile/edit-id"
        />
        <Field
          label="Nama Lengkap"
          value={profile.fullName}
          subLabel="Jenis Kelamin"
          subValue={profile.gender}
          extraSubLabel="Tanggal Lahir"
          extraSubValue={profile.birthDate}
          editable
          editHref="/customer/profile/edit-info"
        />
      </div>

      {/* Save Button */}
      <div className="mt-auto p-4">
        <button
          onClick={handleSave}
          className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700"
        >
          Simpan
        </button>
      </div>
    </div>
  );
}

function Field({
  label,
  value,
  subValue,
  editable,
  subLabel,
  extraSubLabel,
  extraSubValue,
  editHref,
}: {
  label: string;
  value: string;
  subValue?: string;
  editable?: boolean;
  subLabel?: string;
  extraSubLabel?: string;
  extraSubValue?: string;
  editHref?: string;
}) {
  return (
    <div className="border border-gray-200 rounded-lg p-3">
      <div className="flex justify-between items-center">
        <span className="text-xs text-gray-500">{label}</span>
        {editable && editHref && (
          <Link
            href={editHref}
            className="text-blue-600 text-xs font-medium cursor-pointer"
          >
            UBAH
          </Link>
        )}
      </div>
      <div className="text-gray-900 font-medium mt-1">{value}</div>

      {subLabel && (
        <div className="flex justify-between mt-1">
          <div>
            <span className="text-xs text-gray-500">{subLabel}</span>
            <div className="text-gray-900">{subValue}</div>
          </div>
          {extraSubLabel && (
            <div className="text-right">
              <span className="text-xs text-gray-500">{extraSubLabel}</span>
              <div className="text-gray-900">{extraSubValue}</div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
