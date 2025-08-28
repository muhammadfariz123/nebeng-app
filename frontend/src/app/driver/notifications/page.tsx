"use client"

import { useState } from "react"

interface Notification {
  id: number
  type: string
  message: string
  timestamp: string
}

export default function Notifikasi() {
  const [notifications, setNotifications] = useState<Notification[]>([
    { id: 1, type: "nebeng", message: "Pelanggan ingin nebeng ke tujuan Jakarta", timestamp: "2 menit yang lalu" },
    { id: 2, type: "barang", message: "Ada barang yang ingin dikirim ke Bandung", timestamp: "5 menit yang lalu" },
    { id: 3, type: "nebeng", message: "Pelanggan ingin nebeng ke tujuan Bogor", timestamp: "15 menit yang lalu" },
    { id: 4, type: "barang", message: "Barang ingin dikirim ke Surabaya", timestamp: "30 menit yang lalu" },
  ])

  return (
    <div className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-center mb-6">Notifikasi</h2>
      <div className="space-y-4">
        {notifications.map((notif) => (
          <div
            key={notif.id}
            className={`p-4 border-l-4 rounded-md flex items-center ${
              notif.type === "nebeng" ? "border-blue-500 bg-blue-50" : "border-green-500 bg-green-50"
            }`}
          >
            <div className="flex-1">
              <p className="font-semibold">{notif.message}</p>
              <p className="text-sm text-gray-500">{notif.timestamp}</p>
            </div>
            <button
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
              onClick={() => alert(`Menanggapi: ${notif.message}`)}
            >
              Tanggapi
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
