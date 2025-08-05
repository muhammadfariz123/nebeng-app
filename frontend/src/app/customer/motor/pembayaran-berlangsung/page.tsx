"use client";

import { useState, useEffect } from "react";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function PembayaranBerlangsungPage() {
  // Timer 1 jam
  const [secondsLeft, setSecondsLeft] = useState(3600);

  useEffect(() => {
    const timer = setInterval(() => {
      setSecondsLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    const h = Math.floor(m / 60);
    const mm = m % 60;
    return [
      String(h).padStart(2, "0"),
      String(mm).padStart(2, "0"),
      String(s).padStart(2, "0"),
    ];
  };

  const [hh, mm, ss] = formatTime(secondsLeft);

  return (
    <div className="min-h-screen bg-white text-gray-800 flex flex-col">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-blue-600 px-4 py-4 flex items-center text-white">
        <Link href="/customer/motor/konfirmasi-pembayaran">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <h1 className="flex-1 text-center text-base font-semibold">
          Lakukan Pembayaran
        </h1>
        <div className="w-5" />
      </div>

      {/* Timer */}
      <div className="flex justify-center items-center gap-2 mt-4">
        <div className="bg-gray-100 rounded-lg px-3 py-2 text-lg font-bold">
          {hh}
        </div>
        :
        <div className="bg-gray-100 rounded-lg px-3 py-2 text-lg font-bold">
          {mm}
        </div>
        :
        <div className="bg-gray-100 rounded-lg px-3 py-2 text-lg font-bold">
          {ss}
        </div>
      </div>

      {/* Batas waktu pembayaran */}
      <div className="bg-orange-100 border-l-4 border-orange-500 mx-4 mt-4 p-3 rounded">
        <p className="text-sm text-orange-700">
          Selesaikan pembayaran sebelum{" "}
          <span className="font-bold">10:30 14 September 2024</span>
        </p>
      </div>

      {/* Kode Pembayaran */}
      <div className="mx-4 mt-4 p-4 border rounded-lg">
        <p className="text-sm text-gray-500 mb-1">Total yang harus dibayar</p>
        <p className="text-xl font-bold mb-3">Rp 110.000</p>
        <p className="text-sm text-gray-500 mb-1">Kode Pembayaran</p>
        <p className="text-lg font-mono font-bold">202398719029109</p>
        <div className="flex items-center mt-2">
          <Image src="/bni.png" alt="BNI" width={32} height={32} />
          <span className="ml-2 text-sm font-semibold">VIRTUAL ACCOUNT BNI</span>
        </div>
      </div>

      {/* Detail perjalanan */}
      <div className="mx-4 mt-4 p-4 border rounded-lg">
        <p className="text-sm text-gray-500">Sabtu, 14 September 2024 • 07.00 - 08.30</p>
        <p className="mt-1 font-semibold">YOG POS 2 → SOLO POS 1</p>
        <p className="text-sm text-gray-600">YAMAHA NMAX</p>
        <p className="text-xs text-gray-500">1 Penumpang</p>
      </div>

      {/* Tombol */}
      <div className="mt-auto px-4 py-6 space-y-3">
        <button className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold shadow hover:bg-blue-700 transition">
          CEK STATUS PEMBAYARAN
        </button>
        <Link
          href="/customer/motor"
          className="block w-full border border-blue-600 text-blue-600 py-3 rounded-lg font-semibold text-center"
        >
          KEMBALI KE BERANDA
        </Link>
      </div>
    </div>
  );
}
