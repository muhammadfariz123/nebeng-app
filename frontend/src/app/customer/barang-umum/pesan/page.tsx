"use client";

import {
  ArrowLeft,
  Pencil,
  ChevronDown,
  ChevronUp,
  Package,
  Trash,
  Plus,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

interface Receiver {
  name: string;
  idType: string;
  idNumber: string;

}

export default function BarangUmumPage() {


  const router = useRouter();
  const [isExpanded, setIsExpanded] = useState(false);
  const [receivers, setReceivers] = useState<Receiver[]>([]);

  const tripData = {
    tanggal: "Sabtu, 14 September 2024",
    berangkat: "07.00",
    tiba: "09.30",
    dari: "YOGYAKARTA",
    ke: "PURWOKERTO",
    kendaraan: "FAJAR UTAMA (YK)",
    jenisBarang: "Barang Besar",
  };

  useEffect(() => {
    const saved = localStorage.getItem("receivers");
    if (saved) {
      try {
        const list = JSON.parse(saved).filter(
          (r: Receiver) => r.name.trim() !== "" && r.idNumber.trim() !== ""


        );
        setReceivers(list);
      } catch (e) {
        console.error("Error parsing receivers", e);
      }
    }
  }, []);

  const goToEditReceiver = (index: number) => {
    router.push(`/customer/barang-umum/penerima/edit?index=${index}`);
  };

  const handleDeleteReceiver = (index: number) => {
    const updated = [...receivers];
    updated.splice(index, 1);
    setReceivers(updated);
    localStorage.setItem("receivers", JSON.stringify(updated));
  };

  const handleAddReceiver = () => {
    router.push("/customer/barang-umum/penerima");
  };

  const handleTripClick = () => {
    router.push(
      `/customer/barang-umum/detail?` +
        new URLSearchParams({
          tanggal: tripData.tanggal,
          berangkat: tripData.berangkat,
          tiba: tripData.tiba,
          dari: tripData.dari,
          ke: tripData.ke,
          kendaraan: tripData.kendaraan,
          jenisBarang: tripData.jenisBarang,
        }).toString()
    );
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      {/* Header */}
      <div className="bg-blue-600 text-white px-4 pt-10 pb-4 flex items-center">
        <Link href="/customer/barang/hasil">
          <ArrowLeft className="w-5 h-5 text-white" />
        </Link>
        <h1 className="flex-1 text-center font-semibold text-base">
          Barang (Transportasi Umum)
        </h1>
        <div className="w-5" />
      </div>

      {/* Ringkasan Perjalanan */}
      <div
        className="bg-white rounded-lg shadow mx-4 mt-4 p-4 cursor-pointer hover:shadow-md transition"
        onClick={handleTripClick}
      >
        <div className="flex justify-between w-full items-center">
          <div>
            <p className="text-xs text-gray-500">
              {tripData.tanggal} • {tripData.berangkat} - {tripData.tiba}
            </p>
            <h2 className="text-sm font-bold text-gray-800">
              {tripData.dari} → {tripData.ke}
            </h2>
            <p className="text-xs text-gray-600">{tripData.kendaraan}</p>
            <p className="text-xs text-gray-600">{tripData.jenisBarang}</p>
          </div>
          <button
            onClick={(e) => {
              e.stopPropagation();
              setIsExpanded(!isExpanded);
            }}
          >
            {isExpanded ? (
              <ChevronUp className="w-4 h-4 text-gray-500" />
            ) : (
              <ChevronDown className="w-4 h-4 text-gray-500" />
            )}
          </button>
        </div>

        {isExpanded && (
          <div className="mt-3 border-t pt-3 text-sm">
            <div className="flex gap-4 items-start">
              <div className="flex flex-col items-center">
                <span className="text-xs font-semibold">
                  {tripData.berangkat}
                </span>
                <span className="text-[10px] text-gray-500">Sab, 14 Sep</span>
                <div className="w-px flex-1 bg-gray-300 my-1"></div>
                <span className="text-xs font-semibold">{tripData.tiba}</span>
                <span className="text-[10px] text-gray-500">Sab, 14 Sep</span>
              </div>
              <div className="flex flex-col gap-3">
                <div>
                  <p className="text-sm font-semibold">{tripData.dari}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <Package className="w-4 h-4 text-blue-600" />
                    <span className="text-xs text-gray-500">
                      {tripData.jenisBarang}
                    </span>
                  </div>
                </div>
                <div>
                  <p className="text-sm font-semibold">{tripData.ke}</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Detail Pemesanan */}
      <div className="flex-1 mt-6 px-4 space-y-6">
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

        {/* Detail Pengirim */}
        <div>
          <h3 className="text-sm font-semibold text-gray-800 mb-2">
            Detail Pengirim Barang
          </h3>
          <div className="bg-white rounded-xl p-4 text-sm text-gray-800 shadow-sm">
            <p className="font-semibold">NADYA AMALYA FATHONI</p>
            <p className="text-xs text-gray-500">KTP - 2013209201921</p>
          </div>



        </div>

        {/* Detail Penerima */}
        <div>
          <h3 className="text-sm font-semibold text-gray-800 mb-2">
            Detail Penerima Barang
          </h3>

          {receivers.length === 0 ? (
            <p className="text-gray-500 text-sm">
              Belum ada penerima yang ditambahkan
            </p>
          ) : (
            receivers.map((r, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-4 flex justify-between items-center text-sm text-gray-800 shadow-sm mb-2"
              >
                <div className="flex flex-col">
                  <span className="font-semibold">{r.name}</span>
                  <span className="text-xs text-gray-500">
                    {r.idType || "KTP"} - {r.idNumber || "Belum diisi"}
                  </span>
                </div>
                <div className="flex gap-3">
                  <Pencil
                    className="w-4 h-4 text-gray-400 cursor-pointer"
                    onClick={() => goToEditReceiver(index)}
                  />
                  <Trash
                    className="w-4 h-4 text-red-500 cursor-pointer"
                    onClick={() => handleDeleteReceiver(index)}
                  />
                </div>
              </div>
            ))






          )}

          <button
            onClick={handleAddReceiver}
            className="w-full border border-blue-600 text-blue-600 font-semibold py-2 rounded-xl text-sm hover:bg-blue-50 flex items-center justify-center gap-2"
          >
            <Plus className="w-4 h-4" /> Tambah Detail Penerima
          </button>
        </div>
      </div>

      {/* Tombol Lanjutkan */}
      <div className="p-4 bg-gray-100">
        <button
          onClick={() => router.push("/customer/barang-umum/pembayaran")}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl text-sm"
        >
          LANJUTKAN
        </button>
      </div>
    </div>
  );
}