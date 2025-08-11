"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import {
  ArrowLeft,
  ArrowUpCircle,
  CalendarDays,
  MapPin,
  PackageSearch,
  Shuffle,
} from "lucide-react";
import { useEffect, useState } from "react";

export default function BarangSearchPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [lokasiDari, setLokasiDari] = useState("YOGYAKARTA POS 2");
  const [lokasiKe, setLokasiKe] = useState("SOLO POS 1");
  const [tanggal, setTanggal] = useState(() => {
    const today = new Date().toISOString().split("T")[0];
    return today;
  });
  const [detailBarang, setDetailBarang] = useState("Informasi Barang");

  useEffect(() => {
    const dari = searchParams.get("dari");
    const ke = searchParams.get("ke");
    const tgl = searchParams.get("tanggal");
    const barang = searchParams.get("barang");

    if (dari) setLokasiDari(dari);
    if (ke) setLokasiKe(ke);
    if (tgl) setTanggal(tgl);
    if (barang) setDetailBarang(barang);
  }, [searchParams]);

  const handleTukar = () => {
    const newDari = lokasiKe;
    const newKe = lokasiDari;

    setLokasiDari(newDari);
    setLokasiKe(newKe);

    router.replace(
      `/customer/barang?dari=${encodeURIComponent(newDari)}&ke=${encodeURIComponent(
        newKe
      )}&tanggal=${tanggal}&barang=${encodeURIComponent(detailBarang)}`
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
          <h1 className="text-2xl font-bold text-center">Barang</h1>
        </div>
      </div>

      {/* Form */}
      <div className="mt-[-20px] px-6 pb-20">
        <div className="bg-white rounded-xl shadow-lg p-5 space-y-5">
          {/* Lokasi Dari */}
          <div className="space-y-1">
            <label className="text-xs text-gray-500">Dari</label>
            <Link
              href={`/customer/barang/pilih-lokasi?tipe=dari&dari=${encodeURIComponent(
                lokasiDari
              )}&ke=${encodeURIComponent(lokasiKe)}&tanggal=${tanggal}&barang=${encodeURIComponent(
                detailBarang
              )}`}
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
              href={`/customer/barang/pilih-lokasi?tipe=ke&dari=${encodeURIComponent(
                lokasiDari
              )}&ke=${encodeURIComponent(lokasiKe)}&tanggal=${tanggal}&barang=${encodeURIComponent(
                detailBarang
              )}`}
              className="flex items-center gap-2 p-3 border rounded-lg text-sm text-gray-700 hover:bg-gray-100 transition"
            >
              <MapPin className="text-blue-600 w-5 h-5" />
              <span>{lokasiKe}</span>
            </Link>
          </div>

          {/* Tanggal Pengantaran */}
          <div className="space-y-1">
            <label className="text-xs text-gray-500">Tanggal pengantaran</label>
            <div className="flex items-center gap-2 p-3 border rounded-lg text-sm text-gray-700">
              <CalendarDays className="text-blue-600 w-5 h-5" />
              <input
                type="date"
                value={tanggal}
                onChange={(e) => setTanggal(e.target.value)}
                className="outline-none bg-transparent w-full"
              />
            </div>
            <p className="text-xs text-gray-400 px-1">{formatTanggal(tanggal)}</p>
          </div>

          {/* Detail Barang */}
          <div className="space-y-1">
            <label className="text-xs text-gray-500">Detail Barang</label>
            <Link
              href={`/customer/barang/informasi?dari=${encodeURIComponent(
                lokasiDari
              )}&ke=${encodeURIComponent(lokasiKe)}&tanggal=${tanggal}`}
              className="flex items-center gap-2 p-3 border rounded-lg text-sm text-gray-700 hover:bg-gray-100 transition"
            >
              <PackageSearch className="text-blue-600 w-5 h-5" />
              <span>{detailBarang}</span>
            </Link>
          </div>

          {/* Tombol Cari */}
          <button
            onClick={() =>
              router.push(
                `/customer/barang/hasil?dari=${encodeURIComponent(
                  lokasiDari
                )}&ke=${encodeURIComponent(lokasiKe)}&tanggal=${tanggal}&barang=${encodeURIComponent(
                  detailBarang
                )}`
              )
            }
            className="w-full mt-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-full py-3 transition"
          >
            Cari
          </button>
        </div>
      </div>
    </div>
  );
}
