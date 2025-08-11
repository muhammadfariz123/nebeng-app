"use client";

import { useEffect, useState } from "react";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { RiTrainFill } from "react-icons/ri";

const dummyTripsBarangUmum = [
  {
    id: 1,
    nama: "FAJAR UTAMA (YK)",
    dari: "YOGYAKARTA",
    ke: "PURWOKERTO",
    berangkat: "07.00",
    tiba: "09.30",
    durasi: "02j 30m",
    harga: 90000,
    jenis: "Kereta",
  },
  {
    id: 2,
    nama: "ARGO SEMERU",
    dari: "YOGYAKARTA",
    ke: "PURWOKERTO",
    berangkat: "12.58",
    tiba: "15.05",
    durasi: "02j 30m",
    harga: 90000,
    jenis: "Kereta",
  },
  {
    id: 3,
    nama: "FAJAR UTAMA (YK)",
    dari: "YOGYAKARTA",
    ke: "PURWOKERTO",
    berangkat: "07.00",
    tiba: "09.30",
    durasi: "02j 30m",
    harga: 90000,
    jenis: "Kereta",
  },
  {
    id: 4,
    nama: "ARGO SEMERU",
    dari: "YOGYAKARTA",
    ke: "PURWOKERTO",
    berangkat: "12.58",
    tiba: "15.05",
    durasi: "02j 30m",
    harga: 90000,
    jenis: "Kereta",
  },
];

export default function HasilPencarianBarangUmumPage() {
  const [showTrips, setShowTrips] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      setShowTrips(window.scrollY < 100);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Sticky Header */}
      <div className="sticky top-0 z-30 bg-white shadow-md border-b">
        <div className="flex items-center justify-between px-4 py-3">
          <Link href="/customer/barang-umum" className="text-gray-700">
            <ArrowLeft size={22} />
          </Link>
          <div className="flex-1 text-center">
            <p className="text-xs text-gray-500">Sabtu, 14 September 2024</p>
            <h1 className="text-sm font-semibold text-gray-800">
              YOGYAKARTA → PURWOKERTO
            </h1>
          </div>
          <div className="w-6" />
        </div>

        {/* Tab tanggal */}
        <div className="flex overflow-x-auto border-t bg-white">
          {["Sab, 14", "Min, 15", "Sen, 16", "Sel, 17"].map((tgl, i) => (
            <button
              key={i}
              className={`flex-1 px-4 py-2 text-sm border-b-2 transition-colors ${
                i === 0
                  ? "text-blue-600 border-blue-600 font-semibold"
                  : "text-gray-500 border-transparent"
              }`}
            >
              {tgl}
            </button>
          ))}
        </div>
      </div>

      {/* List perjalanan */}
      <div className="flex-1 overflow-y-auto px-4 pt-4 pb-8 space-y-4">
        <h2 className="text-sm font-semibold text-gray-700">
          Pilih mau nebeng yang mana
        </h2>

        {showTrips &&
          dummyTripsBarangUmum.map((trip) => (
            <Link
              key={trip.id}
              href={{
                pathname: "/customer/barang-umum/pesan",
                query: { id: trip.id },
              }}
              className="relative block border rounded-xl p-4 shadow-sm bg-white hover:bg-gray-50 transition"
            >
              {/* Header */}
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-sm font-bold text-blue-700">{trip.nama}</h3>
                <div className="text-right">
                  <p className="text-xs text-gray-500">Harga per barang</p>
                  <p className="text-sm font-bold">
                    Rp {trip.harga.toLocaleString("id-ID")}
                  </p>
                </div>
              </div>

              {/* Rute */}
              <div className="flex items-start gap-3 text-sm">
                <div className="flex flex-col items-center">
                  <div className="w-3 h-3 bg-green-500 rounded-full" />
                  <div className="h-5 border-l border-gray-300" />
                  <div className="w-3 h-3 bg-blue-600 rounded-full" />
                </div>
                <div className="flex flex-col gap-1 text-gray-700">
                  <div>
                    <span className="font-semibold">{trip.berangkat}</span> –{" "}
                    {trip.dari}
                  </div>
                  <div className="text-xs text-gray-400">{trip.durasi}</div>
                  <div>
                    <span className="font-semibold">{trip.tiba}</span> –{" "}
                    {trip.ke}
                  </div>
                </div>
              </div>

              {/* Icon jenis kendaraan */}
              <div className="absolute bottom-3 right-3 flex items-center gap-1 text-xs text-gray-500">
                <RiTrainFill size={16} className="text-gray-500" />
                {trip.jenis}
              </div>
            </Link>
          ))}
      </div>
    </div>
  );
}
