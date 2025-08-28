"use client";

import { useState, useEffect } from "react";
import {
  ArrowLeft,
  ChevronDown,
  ChevronUp,
  Copy,
  ArrowRight,
  Clock,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function PembayaranMobilPage() {
  const [secondsLeft, setSecondsLeft] = useState(3600);
  const [showDetail, setShowDetail] = useState(false);
  const [copied, setCopied] = useState(false);

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

  const handleCopy = () => {
    navigator.clipboard.writeText("202398719029110");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      {/* Bagian atas dengan background */}
      <div className="relative">
        <Image
          src="/bg.png"
          alt="Background"
          width={500}
          height={200}
          className="w-full h-48 object-cover"
        />
        {/* Overlay konten header */}
        <div className="absolute top-0 left-0 w-full px-4 pt-6 text-white">
          <div className="flex items-center">
            <Link href="/customer/mobil/konfirmasi-pembayaran">
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <h1 className="flex-1 text-center text-base font-semibold">
              Lakukan Pembayaran
            </h1>
            <div className="w-5" />
          </div>
          <p className="text-center text-sm mt-4 opacity-90">
            Waktu Anda tersisa
          </p>
          <div className="flex justify-center items-center gap-2 mt-2">
            <div className="bg-white/20 backdrop-blur-sm rounded-lg px-3 py-2 text-lg font-bold">
              {hh}
            </div>
            :
            <div className="bg-white/20 backdrop-blur-sm rounded-lg px-3 py-2 text-lg font-bold">
              {mm}
            </div>
            :
            <div className="bg-white/20 backdrop-blur-sm rounded-lg px-3 py-2 text-lg font-bold">
              {ss}
            </div>
          </div>
        </div>

        {/* Radius di bawah */}
        <div className="absolute bottom-0 w-full h-6 bg-white rounded-t-2xl" />
      </div>

      {/* Konten bawah */}
      <div className="flex-1 bg-white -mt-4 rounded-t-2xl pt-4">
        {/* Batas waktu pembayaran */}
        <div className="mx-4 mt-2 bg-orange-50 border border-orange-200 rounded-lg p-3 flex items-center gap-3">
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
          <p className="text-xl font-bold mb-3">Rp 350.000</p>
          <p className="text-sm text-gray-500 mb-1">Kode Pembayaran</p>
          <div className="flex items-center gap-2">
            <p className="text-lg font-mono font-bold">202398719029110</p>
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

        {/* Ringkasan Perjalanan */}
        <div className="bg-white border rounded-xl shadow-sm mt-4 mx-4">
          <button
            onClick={() => setShowDetail(!showDetail)}
            className="w-full flex flex-col items-start p-4"
          >
            <div className="text-xs text-gray-500 mb-1">
              Sabtu, 14 September 2024 • 07.00 - 09.30
            </div>

            <div className="flex items-center gap-2 mb-1">
              <span className="text-sm font-bold text-gray-800">YOG POS 1</span>
              <ArrowRight className="w-5 h-5 text-blue-600" />
              <span className="text-sm font-bold text-gray-800">SEM POS 3</span>
            </div>

            <div className="text-xs text-gray-600">TOYOTA AVANZA</div>
            <div className="text-xs text-gray-600">3 Penumpang</div>

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
                <p className="font-medium text-gray-800">Nama Penumpang 1</p>
                <p className="text-xs text-gray-500">Penumpang</p>
              </div>
              <div className="flex justify-between items-center text-sm pt-2 border-t">
                <p className="text-gray-600">Total</p>
                <p className="font-bold text-gray-900">Rp 350.000</p>
              </div>
            </div>
          )}
        </div>

        {/* Tombol */}
        <div className="mt-auto px-4 py-6 space-y-3">
          <Link
            href="/customer/mobil/status-pembayaran"
            className="block w-full bg-blue-600 text-white py-3 rounded-lg font-semibold text-center shadow hover:bg-blue-700 transition"
          >
            CEK STATUS PEMBAYARAN
          </Link>
          <Link
            href="/customer/mobil"
            className="block w-full border border-blue-600 text-blue-600 py-3 rounded-lg font-semibold text-center"
          >
            KEMBALI KE BERANDA
          </Link>
        </div>
      </div>
    </div>
  );
}
