"use client";

import { ArrowLeft, Pencil, Trash, Plus, ChevronDown, ChevronUp, Car } from "lucide-react";
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
  const penumpang = Math.min(parseInt(searchParams.get("penumpang") || "1"), 4); // maksimal 4

  const [passengers, setPassengers] = useState<Passenger[]>([]);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("passengers");
    if (saved) {
      // Filter agar hanya menampilkan data yang terisi
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
    updatedPassengers.splice(index, 1); // hapus langsung dari array
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
      {/* Header */}
      <div className="bg-blue-600 text-white px-4 pt-10 pb-4 flex items-center">
        <Link href="/customer/mobil/hasil">
          <ArrowLeft className="w-5 h-5 text-white" />
        </Link>
        <h1 className="flex-1 text-center font-semibold text-base">
          Pesan Mobil
        </h1>
        <div className="w-5" />
      </div>

      {/* Ringkasan Perjalanan dengan dropdown */}
      <div className="bg-white rounded-lg shadow mx-4 mt-4 p-4">
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex justify-between w-full items-center"
        >
          <div>
            <p className="text-xs text-gray-500">
              Sabtu, 14 September 2024 • 07.00 - 08.30
            </p>
            <h2 className="text-sm font-bold text-gray-800">
              YOG POS 2 → SOLO POS 1
            </h2>
            <p className="text-xs text-gray-600">DAIHATSU AYLA</p>
            <p className="text-xs text-gray-600">{passengers.length} Penumpang</p>
          </div>
          {isExpanded ? (
            <ChevronUp className="w-4 h-4 text-gray-500" />
          ) : (
            <ChevronDown className="w-4 h-4 text-gray-500" />
          )}
        </button>

        {isExpanded && (
          <div className="mt-3 border-t pt-3 text-sm">
            <div className="flex gap-4 items-start">
              {/* Waktu awal */}
              <div className="flex flex-col items-center">
                <span className="text-xs font-semibold">07.00</span>
                <span className="text-[10px] text-gray-500">Sab, 14 Sep</span>
                <div className="w-px flex-1 bg-gray-300 my-1"></div>
                <span className="text-xs font-semibold">09.30</span>
                <span className="text-[10px] text-gray-500">Sab, 14 Sep</span>
              </div>

              {/* Rute */}
              <div className="flex flex-col gap-3">
                <div>
                  <p className="text-sm font-semibold">YOGYAKARTA POS 2</p>
                  <div className="flex items-center gap-2 mt-1">
                    <Car className="w-4 h-4 text-blue-600" />
                    <span className="text-xs text-gray-500">DAIHATSU AYLA • AB1292XZ</span>
                  </div>
                </div>
                <div>
                  <p className="text-sm font-semibold">SOLO POS 1</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Detail Pemesanan */}
      <div className="flex-1 mt-6 px-4">
        <div className="space-y-6">
          {/* Data pemesan */}
          <div>
            <h3 className="text-sm font-semibold text-gray-800 mb-2">
              Detail Pemesanan
            </h3>
            <div className="bg-white rounded-xl p-4 text-sm text-gray-800 space-y-3 shadow-sm">
              <div>
                <p className="text-xs text-gray-500">Nama</p>
                <p className="font-semibold">NADYA AMALYA FATHONI</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Email</p>
                <p>nadya01mei@gmail.com</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">No Telepon</p>
                <p>08218839121</p>
              </div>
            </div>
          </div>

          {/* Detail Penumpang */}
          <div>
            <h3 className="text-sm font-semibold text-gray-800 mb-2 flex justify-between">
              <span>Detail Penumpang</span>
            </h3>
            {passengers.length === 0 ? (
              <p className="text-gray-500 text-sm">
                Belum ada penumpang yang ditambahkan
              </p>
            ) : (
              passengers.map((p, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center bg-white rounded-xl p-4 mb-3 shadow-sm text-sm"
                >
                  <div>
                    <p className="font-semibold">{p.name}</p>
                    <p className="text-xs text-gray-500">
                      {p.idType || "KTP"} -{" "}
                      {p.idNumber ? p.idNumber : "Belum diisi"}
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
        </div>
      </div>

      {/* Tombol Lanjutkan */}
      <div className="p-4 bg-gray-100">
        <button
          onClick={() => router.push("/customer/mobil/pembayaran")}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl text-sm"
        >
          LANJUTKAN
        </button>
      </div>
    </div>
  );
}
