// app/customer/profile/notifications/page.tsx
"use client";

import { Bell, Megaphone } from "lucide-react";
import { useState } from "react";
import Link from "next/link";

export default function NotificationsPage() {
  const [pointsNotif, setPointsNotif] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="flex items-center p-4 border-b bg-white">
        <Link href="/customer/profile" className="mr-2 text-blue-600">
          ←
        </Link>
        <h1 className="text-lg font-semibold flex-1 text-center">Notifikasi</h1>
      </div>

      {/* Content */}
      <div className="bg-white mt-2">
        {/* Update Penting */}
        <div className="flex items-start p-4 border-b">
          <Bell className="w-5 h-5 text-blue-900 mt-1" />
          <div className="ml-3 flex-1">
            <p className="font-semibold text-blue-900">Update penting</p>
            <p className="text-sm text-gray-600">
              Berisi update perihal perjalanan, lokasi, transaksi dan info akun. Jadi harus diaktifin.
            </p>
          </div>
        </div>

        {/* Poin dan perjalanan */}
        <div className="flex items-start p-4">
          <Megaphone className="w-5 h-5 text-blue-900 mt-1" />
          <div className="ml-3 flex-1">
            <p className="font-semibold text-blue-900">Poin dan perjalanan</p>
            <p className="text-sm text-gray-600">
              Nonaktifkan notifikasi perihal poin, penukaran merchandise, dan info perjalanan.
            </p>
          </div>
          <label className="inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={pointsNotif}
              onChange={() => setPointsNotif(!pointsNotif)}
              className="sr-only"
            />
            <div
              className={`w-10 h-5 rounded-full p-1 transition-colors ${
                pointsNotif ? "bg-blue-600" : "bg-gray-300"
              }`}
            >
              <div
                className={`w-4 h-4 bg-white rounded-full shadow-md transform transition-transform ${
                  pointsNotif ? "translate-x-5" : "translate-x-0"
                }`}
              />
            </div>
          </label>
        </div>
      </div>
    </div>
  );
}
