"use client";

import { useState, useEffect } from "react";
import {
  ArrowLeft,
  Copy,
  ArrowRight,
  Clock,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function PembayaranBarangUmumPage() {
  const [secondsLeft, setSecondsLeft] = useState(86400); // 24 jam
  const [showDetail, setShowDetail] = useState(false);
  const [copied, setCopied] = useState(false);

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

  const handleCopy = () => {
    navigator.clipboard.writeText("392019394203902");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-white text-gray-800 flex flex-col">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-blue-600 px-4 py-4 flex items-center text-white">
        <Link href="/customer/barang-umum/konfirmasi-pembayaran">
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
      <div className="mx-4 mt-4 bg-orange-50 border border-orange-200 rounded-lg p-3 flex items-center gap-3">
        <div className="bg-orange-100 p-2 rounded-full flex items-center justify-center">
          <Clock className="w-5 h-5 text-orange-500" />
        </div>
        <p className="text-sm text-orange-700 leading-snug">
          Selesaikan pembayaran sebelum{" "}
          <span className="font-bold">10:30 14 September 2024</span>
        </p>
      </div>

      {/* Kode Pembayaran */}
      <div className="mx-4 mt-4 p-4 border rounded-lg">
        <p className="text-sm text-gray-500 mb-1">Total yang harus dibayar</p>
        <p className="text-xl font-bold mb-3">Rp 90.000</p>

        <p className="text-sm text-gray-500 mb-1">Kode Pembayaran</p>
        <div className="flex items-center gap-2">
          <p className="text-lg font-mono font-bold">392019394203902</p>
          <button
            onClick={handleCopy}
            className="p-1 rounded hover:bg-gray-100 transition"
          >
            <Copy className="w-4 h-4 text-gray-600" />
          </button>
          {copied && <span className="text-xs text-green-600">Tersalin!</span>}
        </div>

        <div className="flex items-center mt-2">
          <Image src="/bni.png" alt="BNI" width={32} height={32} />
          <span className="ml-2 text-sm font-semibold">
            VIRTUAL ACCOUNT BNI
          </span>
        </div>
      </div>

      {/* Ringkasan Pengiriman */}
      <div className="bg-white border rounded-xl shadow-sm mt-4 mx-4">
        <button
          onClick={() => setShowDetail(!showDetail)}
          className="w-full flex flex-col items-start p-4"
        >
          <div className="text-xs text-gray-500 mb-1">
            Sabtu, 14 September 2024 • 07.00 - 09.30
          </div>

          <div className="flex items-center gap-2 mb-1">
            <span className="text-sm font-bold text-gray-800">YOGYAKARTA</span>
            <ArrowRight className="w-5 h-5 text-blue-600" />
            <span className="text-sm font-bold text-gray-800">PURWOKERTO</span>
          </div>

          <div className="text-xs text-gray-600">FAJAR UTAMA (YK)</div>
          <div className="text-xs text-gray-600">Barang Besar</div>

          <div className="ml-auto">
            {showDetail ? (
              <ChevronUp className="w-5 h-5 text-gray-500" />
            ) : (
              <ChevronDown className="w-5 h-5 text-gray-500" />
            )}
          </div>
        </button>

        {showDetail && (
          <div className="px-4 pb-4 space-y-4">
            <div className="border rounded-lg p-3 text-sm bg-gray-50">
              <p className="font-medium text-gray-800">Pengiriman Barang</p>
              <p className="text-xs text-gray-500">Detail layanan</p>
              <div className="bg-white border rounded-lg p-2 text-xs mt-2">
                Potensi mendapatkan{" "}
                <span className="text-blue-600 font-medium">10 Poin</span>
              </div>
            </div>

            <div className="flex justify-between items-center text-sm pt-2 border-t">
              <p className="text-gray-600">Total</p>
              <p className="font-bold text-gray-900">Rp 90.000</p>
            </div>
          </div>
        )}
      </div>

      {/* Tombol */}
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
