"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import {
  ArrowLeft,
  ArrowUpCircle,
  CalendarDays,
  MapPin,
  User2,
  Shuffle,
} from "lucide-react";
import { useEffect, useState } from "react";

export default function MotorSearchPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [lokasiDari, setLokasiDari] = useState("Lokasi Anda");
  const [lokasiKe, setLokasiKe] = useState("Lokasi Tujuan");
  const [tanggal, setTanggal] = useState<string>(() => {
    const today = new Date().toISOString().split("T")[0];
    return today;
  });

  // ✅ state untuk nama penumpang
  const [username, setUsername] = useState<string>("");

  useEffect(() => {
    // ambil data user dari localStorage
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      try {
        const parsed = JSON.parse(savedUser);
        setUsername(parsed.username || "");
      } catch (err) {
        console.error("Gagal parsing user dari localStorage", err);
      }
    }

    // ambil query string
    const dari = searchParams.get("dari");
    const ke = searchParams.get("ke");
    const tgl = searchParams.get("tanggal");
    if (dari) setLokasiDari(dari);
    if (ke) setLokasiKe(ke);
    if (tgl) setTanggal(tgl);
  }, [searchParams]);

  const handleTukar = () => {
    const newDari = lokasiKe;
    const newKe = lokasiDari;

    setLokasiDari(newDari);
    setLokasiKe(newKe);

    router.replace(
      `/customer/motor?dari=${encodeURIComponent(
        newDari
      )}&ke=${encodeURIComponent(newKe)}&tanggal=${tanggal}`
    );
  };

  const formatTanggal = (tanggal: string) => {
    const date = new Date(tanggal);
    return date.toLocaleDateString("id-ID", {
      weekday: "short",
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-gradient-to-b from-blue-700 to-blue-500 text-white rounded-b-3xl pb-8 shadow-lg">
        <div className="px-6 pt-4 flex items-center">
          <Link
            href="/customer"
            className="text-white hover:bg-blue-600 p-2 rounded-full transition"
            aria-label="Kembali ke beranda customer"
          >
            <ArrowLeft size={24} />
          </Link>
        </div>
        <div className="px-6 pt-2">
          <h1 className="text-2xl font-bold text-center">
            Pilih Perjalanan Motor
          </h1>
          <p className="text-sm text-blue-100 mt-1 text-center">
            Temukan perjalanan yang sesuai dengan kebutuhanmu
          </p>
        </div>
      </div>

      {/* Form Box */}
      <div className="mt-[-20px] px-6">
        <div className="bg-white rounded-xl shadow-lg p-5 space-y-5">
          {/* Lokasi Dari */}
          <div className="space-y-1">
            <label className="text-xs text-gray-500">Dari</label>
            <Link
              href={`/customer/motor/pilih-lokasi?tipe=dari&dari=${encodeURIComponent(
                lokasiDari
              )}&ke=${encodeURIComponent(lokasiKe)}&tanggal=${tanggal}`}
              className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50"
            >
              <div className="flex items-center gap-2 text-sm text-gray-700">
                <ArrowUpCircle className="text-green-600 w-5 h-5" />
                <span>{lokasiDari}</span>
              </div>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  handleTukar();
                }}
                className="p-2 hover:bg-gray-100 rounded-full transition"
              >
                <Shuffle className="w-4 h-4" />
              </button>
            </Link>
          </div>

          {/* Lokasi Tujuan */}
          <div className="space-y-1">
            <label className="text-xs text-gray-500">Ke</label>
            <Link
              href={`/customer/motor/pilih-lokasi?tipe=ke&dari=${encodeURIComponent(
                lokasiDari
              )}&ke=${encodeURIComponent(lokasiKe)}&tanggal=${tanggal}`}
              className="flex items-center gap-2 p-3 border rounded-lg text-sm text-gray-700 hover:bg-gray-100 transition"
            >
              <MapPin className="text-blue-600 w-5 h-5" />
              <span>{lokasiKe}</span>
            </Link>
          </div>

          {/* Tanggal Berangkat */}
          <div className="space-y-1">
            <label className="text-xs text-gray-500">Tanggal berangkat</label>
            <div className="flex items-center gap-2 p-3 border rounded-lg text-sm text-gray-700">
              <CalendarDays className="text-blue-600 w-5 h-5" />
              <input
                type="date"
                value={tanggal}
                onChange={(e) => setTanggal(e.target.value)}
                className="outline-none bg-transparent w-full"
              />
            </div>
            <p className="text-xs text-gray-400 px-1">
              {formatTanggal(tanggal)}
            </p>
          </div>

          {/* ✅ Nama Penumpang */}
          <div className="space-y-1">
            <label className="text-xs text-gray-500">Nama penumpang</label>
            <div className="flex items-center gap-2 p-3 border rounded-lg text-sm text-gray-700">
              <User2 className="text-blue-600 w-5 h-5" />
              <span>{username || "Memuat..."}</span>
            </div>
          </div>

          {/* Tombol Cari */}
          <button
            onClick={() => router.push(`/customer/motor/hasil`)}
            className="w-full mt-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-full py-3 transition"
          >
            Cari
          </button>
        </div>
      </div>
    </div>
  );
}
