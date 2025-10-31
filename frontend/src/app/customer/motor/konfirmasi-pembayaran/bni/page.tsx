"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { ArrowLeft, ChevronDown } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import axios from "axios";

interface User {
  id: number;
  username: string;
  email: string;
}

interface Tebengan {
  id: number;
  asal: string;
  tujuan: string;
  waktu: string;
  harga: number;
  driverId: number;
  driverName: string;
}

interface CheckoutResponse {
  message: string;
  booking: {
    id: number;
    tebenganId: number;
    customerId: number;
    status: string;
  };
  payment: {
    id: number;
    userId: number;
    transactionId: number | null;
    tebenganId: number;
    bank_name: string;
    total_amount: number;
    payment_status: string;
  };
}

export default function DetailPembayaranPage() {
  const params = useSearchParams();
  const router = useRouter();

  const id = params.get("id");
  const customerId = params.get("customerId");

  const [showInstructions, setShowInstructions] = useState(false);
  const [loading, setLoading] = useState(false);
  const [tebengan, setTebengan] = useState<Tebengan | null>(null);
  const [customer, setCustomer] = useState<User | null>(null);

  const bankInfo = {
    name: "BANK BNI",
    image: "/bni.png",
  };

  // 🔹 Ambil data tebengan & user
  useEffect(() => {
    if (!id || !customerId) return;

    const fetchData = async () => {
      try {
        const [tebRes, userRes] = await Promise.all([
          axios.get<Tebengan>(`http://localhost:3001/tebengan/${id}`),
          axios.get<User>(`http://localhost:3001/users/${customerId}`),
        ]);

        setTebengan(tebRes.data);
        setCustomer(userRes.data);
      } catch (err) {
        console.error("❌ Gagal mengambil data:", err);
      }
    };

    fetchData();
  }, [id, customerId]);

  // 🔹 Proses pembayaran
  const handlePay = async () => {
    if (!tebengan || !customer) {
      alert("Data belum lengkap. Pastikan sudah memilih perjalanan dan penumpang.");
      console.error("❌ Data belum lengkap:", { tebengan, customer });
      return;
    }

    const payload = {
      userId: customer.id,
      tebenganId: tebengan.id,
      totalAmount: tebengan.harga,
      bankName: bankInfo.name,
    };

    console.log("📤 Mengirim ke backend:", payload);

    try {
      setLoading(true);

      const res = await axios.post<CheckoutResponse>(
        "http://localhost:3001/checkout",
        payload,
        { headers: { "Content-Type": "application/json" } }
      );

      console.log("✅ Respon dari backend:", res.data);

      // ✅ Ambil payment ID langsung dari response root (bukan res.data.data)
      const paymentId = res.data?.payment?.id;

      if (paymentId) {
        console.log("💰 Payment ID:", paymentId);
        router.push(`/customer/motor/pembayaran-berlangsung?paymentId=${paymentId}`);
      } else {
        alert("⚠️ Gagal mendapatkan ID pembayaran dari server.");
      }
    } catch (err: any) {
      console.error("❌ Gagal checkout:", err.response?.data || err.message);
      alert(`Terjadi kesalahan: ${err.response?.data?.message || err.message}`);
    } finally {
      setLoading(false);
    }
  };

  if (!tebengan || !customer) {
    return <div className="p-8 text-center">Memuat data...</div>;
  }

  return (
    <div className="min-h-screen bg-white text-gray-800">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-white border-b px-4 py-4 flex items-center">
        <Link href={`/customer/motor/konfirmasi-pembayaran?id=${id}&customerId=${customerId}`}>
          <ArrowLeft className="w-5 h-5 text-gray-800" />
        </Link>
        <h1 className="flex-1 text-center text-base font-semibold">Bayar</h1>
        <div className="w-5" />
      </div>

      {/* Bank Info */}
      <div className="mx-4 mt-4 p-4 border rounded-lg flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Image src={bankInfo.image} alt={bankInfo.name} width={24} height={24} />
          <span className="text-sm font-semibold">{bankInfo.name}</span>
        </div>
        <Link href={`/customer/motor/konfirmasi-pembayaran?id=${id}&customerId=${customerId}`}>
          <span className="text-blue-500 text-sm font-medium">Ubah</span>
        </Link>
      </div>

      {/* Detail Perjalanan */}
      <div className="px-4 mt-6">
        <h2 className="font-semibold text-sm mb-2">Detail Perjalanan</h2>
        <div className="text-sm text-gray-600 space-y-1">
          <p><b>Asal:</b> {tebengan.asal}</p>
          <p><b>Tujuan:</b> {tebengan.tujuan}</p>
          <p><b>Driver:</b> {tebengan.driverName}</p>
          <p><b>Penumpang:</b> {customer.username}</p>
        </div>

        <div className="flex justify-between items-center mt-4 p-3 bg-gray-100 rounded-lg">
          <span className="text-sm font-medium text-gray-600">Total Harga</span>
          <span className="text-base font-bold text-gray-800">
            Rp. {tebengan.harga.toLocaleString("id-ID")}
          </span>
        </div>
      </div>

      {/* Instruksi Pembayaran */}
      <div className="px-4 mt-6">
        <div className="border rounded-lg overflow-hidden">
          <button
            onClick={() => setShowInstructions(!showInstructions)}
            className="bg-gray-100 px-4 py-3 flex justify-between items-center w-full"
          >
            <div className="flex items-center gap-2">
              <Image src="/icons/wallet.svg" alt="Wallet" width={20} height={20} />
              <span className="font-semibold text-sm text-gray-800">
                Lihat tata cara pembayaran
              </span>
            </div>
            <ChevronDown
              className={`w-5 h-5 text-gray-600 transition-transform duration-300 ${
                showInstructions ? "rotate-180" : ""
              }`}
            />
          </button>

          {showInstructions && (
            <div className="p-4 text-sm text-gray-700 space-y-2">
              <p>1. Masuk ke ATM BNI atau aplikasi Mobile Banking.</p>
              <p>2. Pilih menu Transfer ke Virtual Account.</p>
              <p>3. Masukkan jumlah sesuai total harga.</p>
              <p>4. Konfirmasi pembayaran.</p>
              <p>5. Simpan bukti transaksi.</p>
            </div>
          )}
        </div>
      </div>

      {/* Tombol Bayar */}
      <div className="px-4 py-6">
        <button
          onClick={handlePay}
          disabled={loading}
          className={`w-full ${
            loading ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"
          } text-white py-3 rounded-lg font-semibold transition-all duration-200`}
        >
          {loading ? "Membuat transaksi..." : `Bayar Dengan ${bankInfo.name}`}
        </button>
      </div>
    </div>
  );
}
