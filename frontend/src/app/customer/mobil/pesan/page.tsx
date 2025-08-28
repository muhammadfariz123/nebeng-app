"use client";

import {
  ArrowLeft,
  Pencil,
  Trash,
  Plus,
  ChevronDown,
} from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

interface Passenger {
  name: string;
  idType: string;
  idNumber: string;
}

export default function PesanMobilPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const penumpang = Math.min(
    parseInt(searchParams.get("penumpang") || "1"),
    4
  ); // maksimal 4

  const [passengers, setPassengers] = useState<Passenger[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem("passengers");
    if (saved) {
      const filtered = JSON.parse(saved).filter(
        (p: Passenger) => p.name.trim() !== "" && p.idNumber.trim() !== ""
      );
      setPassengers(filtered);
    } else {
      setPassengers([]);
    }
  }, [penumpang]);

  const goToEditPassenger = (index: number) => {
    router.push(`/customer/mobil/penumpang?page=edit&index=${index}`);
  };

  const handleDeletePassenger = (index: number) => {
    const updatedPassengers = [...passengers];
    updatedPassengers.splice(index, 1);
    setPassengers(updatedPassengers);
    localStorage.setItem("passengers", JSON.stringify(updatedPassengers));
  };

  const handleAddPassenger = () => {
    if (passengers.length < 4) {
      const updatedPassengers = [
        ...passengers,
        { name: "", idType: "KTP", idNumber: "" },
      ];
      setPassengers(updatedPassengers);
      localStorage.setItem("passengers", JSON.stringify(updatedPassengers));
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      {/* Header + Background */}
      <div
        className="pt-10 pb-24 px-4 text-white relative"
        style={{
          backgroundImage: "url('/bg.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* Header */}
        <div className="flex items-center mb-5">
          <Link href="/customer/mobil/hasil">
            <ArrowLeft className="w-5 h-5 text-white" />
          </Link>
          <h1 className="flex-1 text-center font-semibold text-base">
            Pesan Mobil
          </h1>
          <div className="w-5" />
        </div>

        {/* Ringkasan Perjalanan */}
        <div
          onClick={() => router.push("/customer/mobil/detail")}
          className="bg-white text-gray-800 rounded-xl shadow p-4 space-y-1 cursor-pointer hover:bg-gray-50 transition"
        >
          <p className="text-xs text-gray-500">
            Sabtu, 14 September 2024 • 07.00 - 08.30
          </p>
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold">YOG POS 2 → SOLO POS 1</h2>
            <ChevronDown className="w-4 h-4 text-gray-500" />
          </div>
          <p className="text-xs">DAIHATSU AYLA</p>
          <p className="text-xs">{passengers.length} Penumpang</p>
        </div>
      </div>

      {/* Container Putih */}
      <div className="relative z-10 -mt-8 bg-gray-100 rounded-t-2xl px-4 flex-1 space-y-4 text-gray-800 pt-6 pb-6">
        {/* Detail Pemesanan */}
        <div className="bg-white rounded-xl p-4 space-y-3 shadow">
          <h3 className="text-sm font-semibold text-gray-800">
            Detail Pemesanan
          </h3>
          <div className="bg-gray-50 rounded-lg p-3 space-y-1">
            <p className="text-xs text-gray-500">Nama</p>
            <p className="text-sm font-semibold">NADYA AMALYA FATHONI</p>
          </div>
          <div className="bg-gray-50 rounded-lg p-3 space-y-1">
            <p className="text-xs text-gray-500">Email</p>
            <p className="text-sm">nadya01mei@gmail.com</p>
          </div>
          <div className="bg-gray-50 rounded-lg p-3 space-y-1">
            <p className="text-xs text-gray-500">No Telepon</p>
            <p className="text-sm">08218839121</p>
          </div>
        </div>

        {/* Detail Penumpang */}
        <div className="bg-white rounded-xl p-4 space-y-3 shadow">
          <h3 className="text-sm font-semibold text-gray-800">
            Detail Penumpang
          </h3>
          {passengers.length === 0 ? (
            <p className="text-gray-500 text-sm">
              Belum ada penumpang yang ditambahkan
            </p>
          ) : (
            passengers.map((p, index) => (
              <div
                key={index}
                className="bg-gray-50 rounded-lg p-3 space-y-1 flex justify-between items-center"
              >
                <div>
                  <p className="text-sm font-semibold">{p.name}</p>
                  <p className="text-xs text-gray-500">
                    {p.idType || "KTP"} - {p.idNumber || "Belum diisi"}
                  </p>
                </div>
                <div className="flex gap-3">
                  <button onClick={() => goToEditPassenger(index)}>
                    <Pencil className="w-4 h-4 text-gray-400" />
                  </button>
                  <button onClick={() => handleDeletePassenger(index)}>
                    <Trash className="w-4 h-4 text-red-500" />
                  </button>
                </div>
              </div>
            ))
          )}

          {/* Tombol Tambah Penumpang */}
          {passengers.length < 4 && (
            <button
              onClick={handleAddPassenger}
              className="flex items-center justify-center gap-2 w-full py-3 border border-blue-600 text-blue-600 rounded-xl mt-3"
            >
              <Plus className="w-4 h-4" /> Tambah Penumpang
            </button>
          )}
        </div>

        {/* Tombol Lanjutkan */}
        <button
          onClick={() => router.push("/customer/mobil/pembayaran")}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl text-sm"
        >
          Lanjutkan
        </button>
      </div>
    </div>
  );
}
