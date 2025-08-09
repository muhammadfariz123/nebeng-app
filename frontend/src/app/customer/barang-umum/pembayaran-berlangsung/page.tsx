"use client";

import { useState, useEffect } from "react";
import { ArrowLeft, Copy } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function PembayaranBarangUmumPage() {
  // 24 jam = 86400 detik
  const [secondsLeft, setSecondsLeft] = useState(86400);

  useEffect(() => {
    const timer = setInterval(() => {
      setSecondsLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (secs: number) => {
    const h = Math.floor(secs / 3600);
    const m = Math.floor((secs % 3600) / 60);
    const s = secs % 60;
    return [
      String(h).padStart(2, "0"),
      String(m).padStart(2, "0"),
      String(s).padStart(2, "0"),
    ];
  };

  const [hh, mm, ss] = formatTime(secondsLeft);

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* HEADER */}
      <div className="bg-gradient-to-b from-blue-600 to-blue-500 text-white px-4 pt-6 pb-8 rounded-b-3xl shadow">
        <div className="flex items-center mb-4">
          <Link href="/customer/barang-umum/konfirmasi-pembayaran">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <h1 className="flex-1 text-center text-base font-semibold">
            Lakukan Pembayaran
          </h1>
          <div className="w-5" />
        </div>

        {/* Timer */}
        <div className="flex justify-center items-center gap-2 text-lg font-bold">
          <div className="bg-white text-gray-800 rounded-lg px-3 py-2">
            {hh}
          </div>
          :
          <div className="bg-white text-gray-800 rounded-lg px-3 py-2">
            {mm}
          </div>
          :
          <div className="bg-white text-gray-800 rounded-lg px-3 py-2">
            {ss}
          </div>
        </div>
      </div>

      {/* BATAS WAKTU */}
      <div className="bg-orange-100 border-l-4 border-orange-500 mx-4 mt-4 p-3 rounded">
        <p className="text-sm text-orange-700">
          Selesaikan pembayaran sebelum{" "}
          <span className="font-bold">10:30 14 September 2024</span>
        </p>
      </div>

      {/* KODE PEMBAYARAN */}
      <div className="mx-4 mt-4 p-4 border rounded-lg shadow-sm">
        <p className="text-sm text-gray-500 mb-1">Total yang harus dibayar</p>
        <p className="text-xl font-bold mb-3">Rp 90.000</p>

        <p className="text-sm text-gray-500 mb-1">Kode Pembayaran</p>
        <div className="flex items-center justify-between font-mono text-lg font-bold">
          392019394203902
          <Copy className="w-5 h-5 text-blue-600 cursor-pointer" />
        </div>

        <div className="flex items-center mt-3">
          <Image src="/bni.png" alt="BNI" width={40} height={40} />
          <span className="ml-2 text-sm font-semibold">
            VIRTUAL ACCOUNT BNI
          </span>
        </div>
      </div>

      {/* DETAIL PENGIRIMAN */}
      <div className="mx-4 mt-4 p-4 border rounded-lg shadow-sm">
        <p className="text-sm text-gray-500">
          Sabtu, 14 September 2024 • 07.00 - 09.30
        </p>
        <p className="mt-1 font-semibold">YOGYAKARTA → PURWOKERTO</p>
        <p className="text-sm text-gray-600">FAJAR UTAMA (YK)</p>
        <p className="text-xs text-gray-500">Barang Besar</p>
      </div>

      {/* TOMBOL */}
      <div className="mt-auto px-4 py-6 space-y-3">
        <Link
          href="/customer/barang-umum/status-pembayaran"
          className="block w-full bg-blue-600 text-white py-3 rounded-lg font-semibold text-center shadow hover:bg-blue-700 transition"
        >
          CEK STATUS PEMBAYARAN
        </Link>

        <Link
          href="/customer/barang-umum"
          className="block w-full border border-blue-600 text-blue-600 py-3 rounded-lg font-semibold text-center"
        >
          KEMBALI KE BERANDA
        </Link>
      </div>
    </div>
  );
}
