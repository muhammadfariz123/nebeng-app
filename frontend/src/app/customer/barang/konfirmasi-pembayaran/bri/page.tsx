"use client";

import { useParams } from "next/navigation";
import { ArrowLeft, ChevronDown } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

export default function DetailPembayaranBarangPage() {
  const { bank } = useParams();
  const [showInstructions, setShowInstructions] = useState(false);

  const bankInfo: Record<string, { name: string; image: string }> = {
    bni: { name: "BANK BNI", image: "/bni.png" },
    bri: { name: "BANK BRI", image: "/bri.png" },
    mandiri: { name: "BANK MANDIRI", image: "/mandiri.png" },
    btn: { name: "BANK BTN", image: "/btn.png" },
  };

  const selectedBank = bankInfo[bank as string] || {
    name: "BANK",
    image: "/bri.png",
  };

  return (
    <div className="min-h-screen bg-white text-gray-800">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-white border-b px-4 py-4 flex items-center">
        <Link href="/customer/barang/konfirmasi-pembayaran">
          <ArrowLeft className="w-5 h-5 text-gray-800" />
        </Link>
        <h1 className="flex-1 text-center text-base font-semibold">Bayar</h1>
        <div className="w-5" />
      </div>

      {/* Bank Info */}
      <div className="mx-4 mt-4 p-4 border rounded-lg flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Image
            src={selectedBank.image}
            alt={selectedBank.name}
            width={24}
            height={24}
          />
          <span className="text-sm font-semibold">{selectedBank.name}</span>
        </div>
        <Link href="/customer/barang/konfirmasi-pembayaran">
          <span className="text-blue-500 text-sm font-medium">Ubah</span>
        </Link>
      </div>

      {/* Detail Harga */}
      <div className="px-4 mt-6">
        <h2 className="font-semibold text-sm mb-2">Detail Harga</h2>
        <div className="flex justify-between text-sm text-gray-600">
          <span>DAIHATSU AYLA</span>
          <span>Rp 50.000</span>
        </div>
        <div className="text-xs text-gray-500 mt-1">1 Barang Besar</div>

        <div className="flex justify-between items-center mt-4 p-3 bg-gray-100 rounded-lg">
          <span className="text-sm font-medium text-gray-600">Total Harga</span>
          <span className="text-base font-bold text-gray-800">Rp 50.000</span>
        </div>
      </div>

      {/* Tata Cara Pembayaran */}
      <div className="px-4 mt-6">
        <div className="border rounded-lg overflow-hidden">
          <button
            onClick={() => setShowInstructions(!showInstructions)}
            className="bg-gray-100 px-4 py-3 flex justify-between items-center w-full"
          >
            <div className="flex items-center gap-2">
              <Image
                src="/icons/wallet.svg"
                alt="Wallet Icon"
                width={20}
                height={20}
              />
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
            <div className="p-4 text-sm text-gray-700 space-y-4">
              <div>
                <div className="font-medium mb-1">
                  Pembayaran via ATM {selectedBank.name.replace("BANK ", "")}
                </div>
                <ol className="list-decimal ml-4 space-y-1 text-xs text-gray-700">
                  <li>Masukkan ATM dan PIN {selectedBank.name} kamu</li>
                  <li>Pilih Menu Lainnya</li>
                  <li>
                    Lalu pilih “Transfer” &gt; “Rekening Tabungan” &gt; ke
                    “Rekening {selectedBank.name}”
                  </li>
                  <li>Masukkan nomor Virtual Account</li>
                  <li>Masukkan jumlah pembayaran sesuai tagihan</li>
                  <li>
                    Di halaman konfirmasi, pastikan data transaksi sudah benar
                    lalu pilih “Ya”
                  </li>
                </ol>
              </div>

              <div>
                <div className="font-medium mb-1">
                  Pembayaran via Mobile Banking{" "}
                  {selectedBank.name.replace("BANK ", "")}
                </div>
                <ol className="list-decimal ml-4 space-y-1 text-xs text-gray-700">
                  <li>Masukkan User ID dan MPIN</li>
                  <li>Pilih Menu Pembayaran</li>
                </ol>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Tombol Bayar */}
      <div className="px-4 py-6">
        <Link href="/customer/barang/pembayaran-berlangsung">
          <button className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold shadow hover:bg-blue-700 transition">
            Bayar Dengan {selectedBank.name}
          </button>
        </Link>
      </div>
    </div>
  );
}
