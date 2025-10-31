"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import axios from "axios";
import { useSearchParams } from "next/navigation";
import { Clock, XCircle, CheckCircle } from "lucide-react";

export default function StatusPembayaranPage() {
  const params = useSearchParams();
  const paymentId = params.get("paymentId");

  const [status, setStatus] = useState<"Pending" | "Success" | "Failed" | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!paymentId) return;

    const fetchStatus = async () => {
      try {
        const res = await axios.get<{ status: string }>(
          `http://localhost:3001/checkout/payment/${paymentId}/status`
        );
        setStatus(res.data.status as any);
      } catch (err) {
        console.error("❌ Gagal memuat status pembayaran:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchStatus();
  }, [paymentId]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500">
        Memuat...
      </div>
    );
  }

  // === Jika masih Pending ===
  if (status === "Pending") {
    return (
      <div className="min-h-screen flex flex-col justify-between items-center bg-yellow-50 text-yellow-700">
        <div className="pt-32 text-center px-6">
          <Clock className="w-14 h-14 mx-auto mb-4 text-yellow-600" />
          <h1 className="text-xl font-bold mb-3">Menunggu Konfirmasi Admin</h1>
          <p className="text-sm text-yellow-700/80">
            Pembayaran kamu sedang diproses. Mohon tunggu sampai admin memverifikasi transaksi.
          </p>
        </div>

        <div className="w-full px-6 pb-10">
          <Link href="/customer/motor">
            <button className="w-full bg-yellow-600 text-white font-medium py-3 rounded-xl shadow hover:bg-yellow-700 transition">
              Kembali ke Beranda
            </button>
          </Link>
        </div>
      </div>
    );
  }

  // === Jika Berhasil ===
  if (status === "Success") {
    return (
      <div className="min-h-screen flex flex-col justify-between items-center bg-gradient-to-b from-blue-500 to-blue-900 text-white">
        <div className="pt-32 text-center px-6">
          <CheckCircle className="w-14 h-14 mx-auto mb-4 text-green-300" />
          <h1 className="text-xl font-bold mb-3">Pembayaran Berhasil!</h1>
          <p className="text-sm text-white/80">
            Pembayaran telah diterima. Silahkan cek pesanan anda.
          </p>
        </div>
        <div className="w-full px-6 pb-10">
          <Link href="/customer/motor">
            <button className="w-full bg-white text-blue-700 font-medium py-3 rounded-xl shadow">
              Lihat Tebengan
            </button>
          </Link>
        </div>
      </div>
    );
  }

  // === Jika Gagal ===
  if (status === "Failed") {
    return (
      <div className="min-h-screen flex flex-col justify-between items-center bg-red-50 text-red-700">
        <div className="pt-32 text-center px-6">
          <XCircle className="w-14 h-14 mx-auto mb-4 text-red-600" />
          <h1 className="text-xl font-bold mb-3">Pembayaran Gagal!</h1>
          <p className="text-sm text-red-700/80">
            Pembayaran tidak berhasil. Silahkan coba lagi atau hubungi admin.
          </p>
        </div>

        <div className="w-full px-6 pb-10">
          <Link href="/customer">
            <button className="w-full bg-red-600 text-white font-medium py-3 rounded-xl shadow hover:bg-red-700 transition">
              Kembali ke Beranda
            </button>
          </Link>
        </div>
      </div>
    );
  }

  // === Jika tidak ada status ditemukan ===
  return (
    <div className="min-h-screen flex items-center justify-center text-gray-500">
      Status tidak ditemukan.
    </div>
  );
}
