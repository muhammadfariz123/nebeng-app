"use client";

import { Edit, Globe, Bell, Lock, Info, FileText, User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { JSX, useEffect, useState } from "react";

export default function ProfilePage() {
  const [profile, setProfile] = useState({
    fullName: "Nadya Amalya",
    email: "nadya01mei@gmail.com",
    birthDate: "",
    gender: "",
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedProfile = localStorage.getItem("profileData");
      if (storedProfile) {
        const parsed = JSON.parse(storedProfile);
        setProfile({
          fullName: parsed.fullName || "Nadya Amalya",
          email: parsed.email || "nadya01mei@gmail.com",
          birthDate: parsed.birthDate || "",
          gender: parsed.gender || "",
        });
      }
    }
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Header */}
      <div className="relative pt-12 pb-20 px-4 overflow-hidden bg-gradient-to-b from-blue-800 to-blue-500">
        <Image
          src="/bgprf.png"
          alt="Background Profile"
          fill
          className="object-cover opacity-20"
        />
        <h1 className="relative z-10 text-white text-lg font-semibold">Akun</h1>
      </div>

      {/* Profile Card */}
      <div className="px-4 -mt-14 relative z-10">
        <div className="bg-white rounded-xl shadow-md p-4">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold">
              <Image
                src="/icons/user-avatar.svg"
                alt="Avatar"
                width={40}
                height={40}
                className="rounded-full"
              />
            </div>
            <div className="ml-3 flex-1">
              <p className="text-gray-900 font-semibold">{profile.fullName}</p>
              <p className="text-gray-500 text-sm">{profile.email}</p>
            </div>
            <Link href="/customer/profile/edit">
              <Edit className="w-5 h-5 text-gray-400 cursor-pointer hover:text-gray-600" />
            </Link>
          </div>

          {/* Verifikasi KTP */}
          <div className="mt-3">
            <div className="bg-red-50 border border-red-200 rounded-lg p-2 text-sm text-black-600">
              Verifikasi KTP dulu yuk{" "}
              <span className="font-semibold cursor-pointer text-red-500 underline">
                Verifikasi sekarang
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Menu */}
      <div className="mt-6 flex-1">
        <div className="bg-white">
          <div className="px-4 py-3 text-gray-500 text-xs uppercase">Akun</div>

          <MenuItem icon={<User />} text="Pengaturan akun" href="/customer/profile/settings" />
          <MenuItem icon={<Globe />} text="Pilihan bahasa" href="/customer/profile/language" />
          <MenuItem icon={<Bell />} text="Notifikasi" href="/customer/profile/notifications" />
          <MenuItem icon={<Lock />} text="Password akun" href="/customer/profile/change-password" />

          <div className="px-4 py-3 text-gray-500 text-xs uppercase">Info Lainnya</div>
          <MenuItem icon={<Info />} text="Pusat bantuan" href="/customer/profile/help-center" />
          <MenuItem icon={<FileText />} text="Ketentuan & privasi" extraRight={<span className="text-xs text-gray-400">setujui</span>} />
        </div>
      </div>
    </div>
  );
}

function MenuItem({
  icon,
  text,
  extraRight,
  href,
}: {
  icon: JSX.Element;
  text: string;
  extraRight?: JSX.Element;
  href?: string;
}) {
  const content = (
    <div className="flex items-center px-4 py-3 border-b border-gray-100 cursor-pointer hover:bg-gray-50">
      <div className="w-5 h-5 text-gray-700">{icon}</div>
      <span className="ml-3 text-gray-800 flex-1">{text}</span>
      {extraRight && <div className="mr-2">{extraRight}</div>}
      <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
      </svg>
    </div>
  );

  return href ? <Link href={href}>{content}</Link> : content;
}
