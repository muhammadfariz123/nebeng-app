"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { cn } from "@/lib/utils";

// ====== TIPE DATA ======
type OrderStatus = "Menunggu Pembayaran" | "Selesai" | "Dibatalkan";
type OrderType = "Mobil" | "Motor" | "Barang";

export type Order = {
  id: number;
  date: string;
  vehicle: string;
  route: string;
  price: number;
  status: OrderStatus;
  type: OrderType;
};

// ====== WARNA STATUS ======
const statusColors: Record<OrderStatus, string> = {
  "Menunggu Pembayaran": "bg-orange-100 text-orange-600",
  "Selesai": "bg-green-100 text-green-600",
  "Dibatalkan": "bg-red-100 text-red-600",
};

const RiwayatPage = () => {
  const [selectedTab, setSelectedTab] = useState("Riwayat");
  const [typeFilter, setTypeFilter] = useState<"Semua" | OrderType>("Semua");
  const [statusFilter, setStatusFilter] = useState<"Semua" | OrderStatus>("Semua");
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const tabs = ["Riwayat", "Dalam Proses", "Terjadwal"];
  const types: ("Semua" | OrderType)[] = ["Semua", "Mobil", "Motor", "Barang"];
  const statuses: ("Semua" | OrderStatus)[] = [
    "Semua",
    "Menunggu Pembayaran",
    "Selesai",
    "Dibatalkan",
  ];

  // ====== NORMALISASI TIPE ======
  const normalizeType = (raw?: any): OrderType => {
    if (!raw) return "Barang";
    const s = String(raw).toLowerCase();
    if (s.includes("motor")) return "Motor";
    if (s.includes("mobil") || s.includes("car") || s.includes("vehicle")) return "Mobil";
    if (s.includes("barang")) return "Barang";
    if (s.includes("bike") || s.includes("motorbike")) return "Motor";
    return "Barang";
  };

  // ====== NORMALISASI STATUS ======
  const normalizeStatus = (raw?: any): OrderStatus => {
    if (!raw) return "Menunggu Pembayaran";
    const s = String(raw).toLowerCase();
    if (s.includes("pending")) return "Menunggu Pembayaran";
    if (s.includes("success") || s.includes("paid") || s.includes("completed")) return "Selesai";
    if (s.includes("fail") || s.includes("failed") || s.includes("cancel")) return "Dibatalkan";
    return "Menunggu Pembayaran";
  };

  // ====== FORMAT TANGGAL ======
  const formatGroupDate = (rawDate: any) => {
    if (!rawDate) return "Tidak diketahui";
    const d = new Date(rawDate);
    if (isNaN(d.getTime())) return String(rawDate);
    const yyyy = d.getFullYear();
    const mm = String(d.getMonth() + 1).padStart(2, "0");
    const dd = String(d.getDate()).padStart(2, "0");
    return `${yyyy}-${mm}-${dd}`;
  };

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        setLoading(true);
        setError("");
        const userId = 1;

        const res = await axios.get<any[]>(`http://localhost:3001/checkout/history/${userId}`);

        const mapped: Order[] = (res.data || []).map((item) => {
          const rawDate =
            item.date ??
            item.createdAt ??
            item.created_at ??
            item.payment_date ??
            item.updatedAt ??
            null;

          const teb = item.tebengan ?? item.tebeng ?? null;

          const pickup =
            (teb?.asal ??
              teb?.pickup_location ??
              item.pickup_location ??
              teb?.origin ??
              "") || "";

          const destination =
            (teb?.tujuan ??
              teb?.destination ??
              item.destination ??
              item.dropoff_location ??
              "") || "";

          const route =
            pickup && destination
              ? `${pickup} → ${destination}`
              : item.route ?? "Tidak diketahui";

          const vehicle =
            (teb?.vehicle_name ??
              teb?.type ??
              teb?.kendaraan ??
              (item.vehicle ||
                item.vehicle_name ||
                (teb?.driverName ? `${teb.driverName} (motor)` : "")) ??
              "Tidak diketahui") || "Tidak diketahui";

          const price =
            Number(
              (item.total_amount ??
                item.price ??
                teb?.harga ??
                item.harga ??
                0) || 0
            ) || 0;

          const statusRaw =
            item.payment_status ??
            item.status ??
            item.paymentStatus ??
            "";
          const status = normalizeStatus(statusRaw);

          const rawType =
            item.type ??
            item.category ??
            teb?.type ??
            teb?.category ??
            teb?.vehicle_type;
          const type = normalizeType(rawType);

          const id = Number(
            item.id ??
              item.payment_id ??
              item.booking_id ??
              item.transactionId ??
              0
          );

          return {
            id,
            date: formatGroupDate(rawDate),
            vehicle,
            route,
            price,
            status,
            type,
          };
        });

        setOrders(mapped);
      } catch (err: any) {
        console.error("❌ Gagal ambil riwayat:", err);
        setError("Gagal memuat data riwayat.");
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, []);

  // ====== FILTERING ======
  const filteredOrders = orders.filter((order) => {
    const matchType = typeFilter === "Semua" || order.type === typeFilter;
    const matchStatus = statusFilter === "Semua" || order.status === statusFilter;
    return matchType && matchStatus;
  });

  // ====== KELOMPOK BERDASARKAN TANGGAL ======
  const groupedByDate = filteredOrders.reduce<Record<string, Order[]>>((acc, order) => {
    if (!acc[order.date]) acc[order.date] = [];
    acc[order.date].push(order);
    return acc;
  }, {});

  // ====== RENDER ======
  if (loading) {
    return <p className="text-center mt-12 text-gray-500">⏳ Memuat riwayat...</p>;
  }

  if (error) {
    return <p className="text-center mt-12 text-red-500">{error}</p>;
  }

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

      {/* Filter Buttons */}
      <div className="flex flex-wrap items-center gap-2 mb-6">
        {types.map((type) => (
          <button
            key={type}
            onClick={() => setTypeFilter(type)}
            className={cn(
              "px-4 py-1 rounded-full border text-sm transition-all",
              typeFilter === type
                ? "bg-blue-50 border-blue-600 text-blue-600"
                : "bg-gray-100 text-gray-600 border-gray-200 hover:bg-gray-200"
            )}
          >
            {type}
          </button>
        ))}

        <div className="relative ml-2">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as "Semua" | OrderStatus)}
            className="px-4 py-1 rounded-full border text-sm bg-white text-gray-700 border-gray-200 focus:outline-none cursor-pointer"
          >
            {statuses.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Daftar Order */}
      {Object.entries(groupedByDate).length === 0 && (
        <p className="text-center text-gray-500 text-sm mt-12">Tidak ada riwayat ditemukan.</p>
      )}

      {Object.entries(groupedByDate).map(([date, items]) => (
        <div key={date} className="mb-8">
          <p className="text-sm text-gray-500 font-semibold mb-3">{date}</p>
          <div className="space-y-4">
            {items.map((order) => (
              <div
                key={order.id}
                className="bg-white border rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-gray-500">Kode Pemesanan #{order.id}</span>
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
                <div className="text-sm text-gray-500 mb-2">{order.route}</div>
                <div className="text-right text-sm font-semibold text-blue-600">
                  Rp {order.price.toLocaleString("id-ID")}
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default RiwayatPage;
