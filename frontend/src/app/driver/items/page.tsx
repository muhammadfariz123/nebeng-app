"use client";

import { useState } from "react";
import { MapPin, Clock, Truck, CheckCircle, XCircle } from "lucide-react";

// Mock data perjalanan barang
const journeys = [
  {
    id: "1",
    code: "BNT32CH",
    from: "YOGYAKARTA POS 2",
    to: "SOLO POS 1",
    status: "Selesai",
    departure: "2024-09-18 07:00",
    arrival: "2024-09-18 10:00",
    item: "Barang Besar",
  },
  {
    id: "2",
    code: "BNT33DF",
    from: "SOLO POS 1",
    to: "YOGYAKARTA POS 2",
    status: "Dalam Perjalanan",
    departure: "2024-09-19 08:00",
    arrival: "2024-09-19 11:00",
    item: "Kardus",
  },
  {
    id: "3",
    code: "BNT34EG",
    from: "YOGYAKARTA POS 2",
    to: "SEMARANG POS 1",
    status: "Selesai",
    departure: "2024-09-20 09:00",
    arrival: "2024-09-20 12:00",
    item: "Kendaraan",
  },
];

export default function PerjalananBarang() {
  const [showDetail, setShowDetail] = useState<string | null>(null);

  const handleDetailToggle = (id: string) => {
    setShowDetail((prevState) => (prevState === id ? null : id));
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-6">Perjalanan Barang</h2>

      <div className="space-y-4">
        {journeys.map((journey) => (
          <div key={journey.id} className="bg-gray-100 p-4 rounded-lg shadow-sm hover:shadow-md transition">
            <div className="flex items-center justify-between">
              <div className="flex flex-col">
                <div className="text-lg font-semibold text-gray-800">
                  {journey.from} → {journey.to}
                </div>
                <div className="text-sm text-gray-600">{journey.item}</div>
              </div>
              <div className="flex flex-col items-end">
                <div className="text-xl font-semibold text-green-600">{journey.status}</div>
                <div className="text-sm text-gray-500">{journey.departure}</div>
              </div>
            </div>

            {/* Show Details */}
            <div className="mt-4">
              <button
                onClick={() => handleDetailToggle(journey.id)}
                className="text-blue-600 hover:text-blue-800 flex items-center gap-1"
              >
                <Truck className="w-4 h-4" />
                {showDetail === journey.id ? "Tutup Detail" : "Lihat Detail"}
              </button>
              {showDetail === journey.id && (
                <div className="mt-4 p-4 bg-gray-50 rounded-lg shadow-inner">
                  <div className="flex justify-between">
                    <div>
                      <div className="text-sm text-gray-500">Waktu Keberangkatan</div>
                      <div className="text-lg font-semibold text-gray-800">{journey.departure}</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-500">Waktu Kedatangan</div>
                      <div className="text-lg font-semibold text-gray-800">{journey.arrival}</div>
                    </div>
                  </div>

                  <div className="mt-2 flex justify-between">
                    <div>
                      <div className="text-sm text-gray-500">Durasi Perjalanan</div>
                      <div className="text-lg font-semibold text-gray-800">3 jam</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-500">Kode Pemesanan</div>
                      <div className="text-lg font-semibold text-gray-800">{journey.code}</div>
                    </div>
                  </div>

                  <div className="mt-4 flex items-center gap-2 text-sm text-gray-600">
                    <Clock className="w-4 h-4 text-gray-400" />
                    <span>Durasi Perjalanan: 3 jam</span>
                  </div>
                  <div className="mt-2 flex items-center gap-2 text-sm text-gray-600">
                    <MapPin className="w-4 h-4 text-gray-400" />
                    <span>Lokasi Awal: {journey.from}</span>
                  </div>
                  <div className="mt-2 flex items-center gap-2 text-sm text-gray-600">
                    <MapPin className="w-4 h-4 text-gray-400" />
                    <span>Lokasi Tujuan: {journey.to}</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
