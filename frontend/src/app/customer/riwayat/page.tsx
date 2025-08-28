"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"

type OrderStatus = "Menunggu Pembayaran" | "Selesai" | "Dibatalkan"
type OrderType = "Mobil" | "Motor" | "Barang"

type Order = {
  id: string
  date: string
  vehicle: string
  plate?: string
  route: string
  price: number
  status: OrderStatus
  type: OrderType
}

const orders: Order[] = [
  {
    id: "ZVH33ED",
    date: "14 September 2024",
    vehicle: "NEBENG BARANG",
    route: "YOG POS 2 → SOLO POS 1",
    price: 50000,
    status: "Menunggu Pembayaran",
    type: "Barang",
  },
  {
    id: "ADX3S2A",
    date: "14 September 2024",
    vehicle: "DAIHATSU AYLA",
    plate: "AB1292ZX",
    route: "YOG POS 2 → SOLO POS 1",
    price: 360000,
    status: "Menunggu Pembayaran",
    type: "Mobil",
  },
  {
    id: "YU32SC4",
    date: "14 September 2024",
    vehicle: "YAMAHA NMAX",
    plate: "AB1234UH",
    route: "YOG POS 2 → SOLO POS 1",
    price: 360000,
    status: "Menunggu Pembayaran",
    type: "Motor",
  },
  {
    id: "AB1292UH",
    date: "13 Juni 2024",
    vehicle: "TOYOTA AVANZA VELOZ",
    plate: "AB1292UH",
    route: "YOG POS 2 → SOLO POS 1",
    price: 90000,
    status: "Selesai",
    type: "Mobil",
  },
  {
    id: "GH12UW3",
    date: "10 Februari 2024",
    vehicle: "DAIHATSU AYLA",
    plate: "AB1292UH",
    route: "YOG POS 2 → SOLO POS 1",
    price: 0,
    status: "Dibatalkan",
    type: "Mobil",
  },
  {
    id: "GH12UW2",
    date: "1 Februari 2024",
    vehicle: "NEBENG BARANG",
    route: "YOG POS 2 → SOLO POS 1",
    price: 50000,
    status: "Selesai",
    type: "Barang",
  },
  {
    id: "ZH12M3T",
    date: "8 Januari 2024",
    vehicle: "YAMAHA NMAX",
    plate: "AB1234UH",
    route: "YOG POS 2 → SOLO POS 1",
    price: 110000,
    status: "Selesai",
    type: "Motor",
  },
]

const statusColors = {
  "Menunggu Pembayaran": "bg-orange-100 text-orange-600",
  "Selesai": "bg-green-100 text-green-600",
  "Dibatalkan": "bg-red-100 text-red-600",
}

const RiwayatPage = () => {
  const [selectedTab, setSelectedTab] = useState("Riwayat")
  const [typeFilter, setTypeFilter] = useState("Semua")
  const [statusFilter, setStatusFilter] = useState("Semua")

  const tabs = ["Riwayat", "Dalam Proses", "Terjadwal"]
  const types = ["Mobil", "Motor", "Barang"]
  const statuses = ["Semua", "Menunggu Pembayaran", "Selesai", "Dibatalkan"]

  const filteredOrders = orders.filter((order) => {
    const matchType = typeFilter === "Semua" || order.type === typeFilter
    const matchStatus = statusFilter === "Semua" || order.status === statusFilter
    return matchType && matchStatus
  })

  const groupedByDate = filteredOrders.reduce<Record<string, Order[]>>((acc, order) => {
    acc[order.date] = acc[order.date] || []
    acc[order.date].push(order)
    return acc
  }, {})

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Aktivitas</h1>

      {/* Tabs */}
      <div className="flex space-x-6 border-b mb-4">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setSelectedTab(tab)}
            className={cn(
              "pb-2",
              selectedTab === tab
                ? "border-b-2 border-blue-600 text-blue-600 font-semibold"
                : "text-gray-500"
            )}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-2 mb-6">
        <button
          onClick={() => setTypeFilter("Semua")}
          className={cn(
            "px-4 py-1 rounded-full border text-sm",
            typeFilter === "Semua"
              ? "bg-blue-50 border-blue-600 text-blue-600"
              : "bg-gray-100 text-gray-600 border-gray-200"
          )}
        >
          Semua
        </button>
        {types.map((type) => (
          <button
            key={type}
            onClick={() => setTypeFilter(type)}
            className={cn(
              "px-4 py-1 rounded-full border text-sm",
              typeFilter === type
                ? "bg-blue-50 border-blue-600 text-blue-600"
                : "bg-gray-100 text-gray-600 border-gray-200"
            )}
          >
            {type}
          </button>
        ))}

        {/* Status Dropdown */}
        <div className="relative">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-1 rounded-full border text-sm bg-white text-gray-700 border-gray-200 focus:outline-none"
          >
            {statuses.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Order List */}
      {Object.entries(groupedByDate).map(([date, items]) => (
        <div key={date} className="mb-8">
          <p className="text-sm text-gray-500 font-semibold mb-3">{date}</p>
          <div className="space-y-4">
            {items.map((order) => (
              <div
                key={order.id}
                className="bg-white border rounded-xl p-4 shadow-sm"
              >
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-gray-500">Kode Pemesanan {order.id}</span>
                  <span
                    className={cn(
                      "px-2 py-0.5 rounded text-xs font-medium",
                      statusColors[order.status]
                    )}
                  >
                    {order.status}
                  </span>
                </div>
                <div className="text-sm font-semibold mb-1">{order.vehicle}</div>
                {order.plate && (
                  <div className="text-xs text-gray-500">{order.plate}</div>
                )}
                <div className="text-sm text-gray-500 mb-2">{order.route}</div>
                <div className="text-right text-sm font-semibold text-blue-600">
                  Rp {order.price.toLocaleString("id-ID")}
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}

      {/* Empty State */}
      {filteredOrders.length === 0 && (
        <p className="text-center text-gray-500 text-sm mt-12">Tidak ada riwayat ditemukan.</p>
      )}
    </div>
  )
}

export default RiwayatPage
