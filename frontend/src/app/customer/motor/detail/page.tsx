"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import Image from "next/image";
import axios from "axios";

interface Tebengan {
  id: number;
  asal: string;
  tujuan: string;
  waktu: string;
  harga: number;
  type: string;
  driver: {
    id: number;
    username: string;
    email: string;
    phone?: string;
  };
  vehicle_name?: string;
  vehicle_plate?: string;
}

export default function DetailMotorPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  const [data, setData] = useState<Tebengan | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    const fetchDetail = async () => {
      try {
        const res = await axios.get<Tebengan>(`http://localhost:3001/tebengan/${id}`);
        setData(res.data);
      } catch (error) {
        console.error("Gagal mengambil detail:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDetail();
  }, [id]);

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500">
        Memuat detail...
      </div>
    );

  if (!data)
    return (
      <div className="min-h-screen flex items-center justify-center text-red-500">
        Data tidak ditemukan.
      </div>
    );

  // Format tanggal & waktu
  const waktu = new Date(data.waktu);
  const jamBerangkat = waktu.toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" });
  const jamTiba = new Date(waktu.getTime() + 90 * 60000).toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" });
  const tanggal = waktu.toLocaleDateString("id-ID", { weekday: "short", day: "2-digit", month: "short" });

  return (
    <div className="min-h-screen bg-white px-5 py-6">
      {/* Tombol Kembali */}
      <button
        onClick={() => router.back()}
        className="flex items-center text-sm text-gray-700 hover:text-blue-600 mb-6"
      >
        <ArrowLeft className="w-5 h-5 mr-1" />
      </button>

      {/* Judul */}
      <h1 className="text-sm font-bold">{data.vehicle_name || data.type}</h1>

      {/* Subjudul */}
      <h2 className="mt-4 text-sm font-semibold">Rute Motor</h2>

      {/* Kartu Rute */}
      <div className="mt-3 rounded-xl shadow-md border border-gray-100 p-4">
        <div className="flex justify-between">
          {/* Kolom kiri: Waktu */}
          <div className="flex flex-col justify-between text-xs text-gray-600">
            <div>
              <p className="text-sm font-bold">{jamBerangkat}</p>
              <p>{tanggal}</p>
            </div>
            <div>
              <p className="text-sm font-bold">{jamTiba}</p>
              <p>{tanggal}</p>
            </div>
          </div>

          {/* Kolom tengah */}
          <div className="relative flex flex-col items-center px-4">
            <div className="w-2 h-2 bg-blue-500 rounded-full" />
            <div className="h-10 border-l-2 border-dotted border-blue-500" />

            <div className="my-1 flex flex-col items-center">
              <Image src="/icons/motor2.svg" alt="Motor Icon" width={16} height={16} />
              <span className="text-[10px] font-semibold text-blue-600">{data.vehicle_name || data.type}</span>
              <span className="text-[10px] text-gray-500">{data.vehicle_plate || "-"}</span>
            </div>

            <div className="h-10 border-l-2 border-dotted border-blue-500" />
            <div className="w-2 h-2 border border-blue-500 rounded-full" />

            <div className="absolute left-full top-1/2 -translate-y-1/2 ml-2 text-xs text-gray-500">
              01j 30m
            </div>
          </div>

          {/* Kolom kanan: Lokasi */}
          <div className="flex flex-col justify-between text-xs text-gray-600">
            <p className="font-semibold text-blue-900">{data.asal}</p>
            <p className="font-semibold text-blue-900">{data.tujuan}</p>
          </div>
        </div>
      </div>

      {/* Detail Harga */}
      <h2 className="mt-6 text-sm font-semibold">Detail Harga</h2>
      <div className="mt-2 flex justify-between text-sm">
        <p className="text-gray-500">Total Harga</p>
        <p className="font-semibold">Rp {data.harga.toLocaleString("id-ID")}</p>
      </div>
    </div>
  );
}
