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
import axios from "axios";
import { useSearchParams } from "next/navigation";

interface Payment {
  id: number;
  payment_status: string;
  total_amount: number;
  bank_name: string;
  virtual_account: string;
  tebengan: {
    asal: string;
    tujuan: string;
    waktu: string;
    harga: number;
    driverName: string;
    kendaraan: string;
  };
  user: {
    username: string;
  };
}

export default function PembayaranBerlangsungPage() {
  const [secondsLeft, setSecondsLeft] = useState(3600);
  const [showDetail, setShowDetail] = useState(false);
  const [copied, setCopied] = useState(false);
  const [payment, setPayment] = useState<Payment | null>(null);
  const [loading, setLoading] = useState(true);

  const params = useSearchParams();
  const paymentId = params.get("paymentId");

  // 🔹 Countdown Timer
  useEffect(() => {
    const timer = setInterval(() => {
      setSecondsLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // 🔹 Format waktu countdown
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

  // 🔹 Ambil data pembayaran dari backend
  useEffect(() => {
    if (!paymentId) return;

    const fetchPayment = async () => {
      try {
        const res = await axios.get<Payment>(`http://localhost:3001/checkout/payment/${paymentId}`);
        setPayment(res.data);
      } catch (err) {
        console.error("❌ Gagal mengambil data pembayaran:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPayment();
  }, [paymentId]);

  // 🔹 Copy kode pembayaran
  const handleCopy = () => {
    if (!payment?.virtual_account) return;
    navigator.clipboard.writeText(payment.virtual_account);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (loading) {
    return <div className="p-8 text-center">Memuat data pembayaran...</div>;
  }

  if (!payment) {
    return (
      <div className="p-8 text-center text-red-600">
        Data pembayaran tidak ditemukan.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white text-gray-800 flex flex-col">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-blue-600 px-4 py-4 flex items-center text-white">
        <Link href="/customer/motor">
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
          <span className="font-bold">60 menit dari sekarang</span>
        </p>
      </div>

      {/* Kode Pembayaran */}
      <div className="mx-4 mt-4 p-4 border rounded-lg">
        <p className="text-sm text-gray-500 mb-1">Total yang harus dibayar</p>
        <p className="text-xl font-bold mb-3">
          Rp {payment.total_amount.toLocaleString("id-ID")}
        </p>
        <p className="text-sm text-gray-500 mb-1">Kode Pembayaran</p>
        <div className="flex items-center gap-2">
          <p className="text-lg font-mono font-bold">
            {payment.virtual_account || "Tidak tersedia"}
          </p>
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
            VIRTUAL ACCOUNT {payment.bank_name}
          </span>
        </div>
      </div>

      {/* Ringkasan Perjalanan */}
      <div className="bg-white border rounded-xl shadow-sm mt-4 mx-4">
        <button
          onClick={() => setShowDetail(!showDetail)}
          className="w-full flex flex-col items-start p-4"
        >
          <div className="text-xs text-gray-500 mb-1">{payment.tebengan.waktu}</div>

          <div className="flex items-center gap-2 mb-1">
            <span className="text-sm font-bold text-gray-800">
              {payment.tebengan.asal}
            </span>
            <ArrowRight className="w-5 h-5 text-blue-600" />
            <span className="text-sm font-bold text-gray-800">
              {payment.tebengan.tujuan}
            </span>
          </div>

          <div className="text-xs text-gray-600">{payment.tebengan.kendaraan}</div>
          <div className="text-xs text-gray-600">
            Driver: {payment.tebengan.driverName}
          </div>

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
              <p className="font-medium text-gray-800">{payment.user.username}</p>
              <p className="text-xs text-gray-500">Penumpang</p>
              <div className="bg-white border rounded-lg p-2 text-xs mt-2">
                Potensi mendapatkan{" "}
                <span className="text-blue-600 font-medium">15 Poin</span>
              </div>
            </div>

            <div className="flex justify-between items-center text-sm pt-2 border-t">
              <p className="text-gray-600">Total</p>
              <p className="font-bold text-gray-900">
                Rp {payment.tebengan.harga.toLocaleString("id-ID")}
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Tombol */}
      <div className="mt-auto px-4 py-6 space-y-3">
        <Link
          href={`/customer/motor/status-pembayaran?paymentId=${payment.id}`}
          className="block w-full bg-blue-600 text-white py-3 rounded-lg font-semibold text-center shadow hover:bg-blue-700 transition"
        >
          CEK STATUS PEMBAYARAN
        </Link>
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
