"use client";

import { useState } from "react";
import { Eye, EyeOff, Lock } from "lucide-react";
import Link from "next/link";

export default function ChangePasswordPage() {
  const [showOld, setShowOld] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Header */}
      <div className="flex items-center p-4 border-b border-gray-200">
        <Link href="/customer/profile" className="mr-3 text-blue-600">
          ←
        </Link>
        <h1 className="text-lg font-semibold">Ubah Password</h1>
      </div>

      <p className="px-4 mt-4 text-gray-500 text-sm">
        Anda maksimal mengubah password 2x
      </p>

      {/* Form */}
      <div className="px-4 mt-4 space-y-4">
        {/* Old Password */}
        <div className="flex items-center bg-gray-100 rounded-lg px-3 py-2">
          <Lock className="text-gray-400 w-5 h-5" />
          <input
            type={showOld ? "text" : "password"}
            placeholder="Masukkan password"
            className="flex-1 ml-2 bg-transparent outline-none"
          />
          <button onClick={() => setShowOld(!showOld)}>
            {showOld ? (
              <EyeOff className="text-gray-400 w-5 h-5" />
            ) : (
              <Eye className="text-gray-400 w-5 h-5" />
            )}
          </button>
        </div>

        {/* New Password */}
        <div className="flex items-center bg-gray-100 rounded-lg px-3 py-2">
          <Lock className="text-gray-400 w-5 h-5" />
          <input
            type={showNew ? "text" : "password"}
            placeholder="Masukkan password baru"
            className="flex-1 ml-2 bg-transparent outline-none"
          />
          <button onClick={() => setShowNew(!showNew)}>
            {showNew ? (
              <EyeOff className="text-gray-400 w-5 h-5" />
            ) : (
              <Eye className="text-gray-400 w-5 h-5" />
            )}
          </button>
        </div>

        {/* Confirm Password */}
        <div className="flex items-center bg-gray-100 rounded-lg px-3 py-2">
          <Lock className="text-gray-400 w-5 h-5" />
          <input
            type={showConfirm ? "text" : "password"}
            placeholder="Konfirmasi password"
            className="flex-1 ml-2 bg-transparent outline-none"
          />
          <button onClick={() => setShowConfirm(!showConfirm)}>
            {showConfirm ? (
              <EyeOff className="text-gray-400 w-5 h-5" />
            ) : (
              <Eye className="text-gray-400 w-5 h-5" />
            )}
          </button>
        </div>
      </div>

      {/* Submit Button */}
      <div className="px-4 mt-6">
        <button className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold">
          Lanjutkan
        </button>
      </div>
    </div>
  );
}
