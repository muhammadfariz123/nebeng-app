"use client";

import { ArrowLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function KonfirmasiPembayaranPage() {
  return (
    <div className="min-h-screen bg-white text-gray-800">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-white border-b px-4 py-4 flex items-center">
        <Link href="/customer/mobil/konfirmasi-pesanan">
          <ArrowLeft className="w-5 h-5 text-gray-800" />
        </Link>
        <h1 className="flex-1 text-center text-base font-semibold">
          Pilihar Metode Pembayaran
        </h1>
        <div className="w-5" />
      </div>

      {/* Body */}
      <div className="px-4 py-6 space-y-5">
        <h2 className="text-sm font-semibold text-gray-800">
          Bayar dengan{" "}
          <span className="font-bold">ATM / MOBILE / INTERNET BANKING</span>
        </h2>

        {/* Bank List */}
        <div className="space-y-3">
          <Link
            href="/customer/mobil/konfirmasi-pembayaran/bni"
            className="flex items-center justify-between bg-white border rounded-lg p-4 shadow-sm"
          >
            <div className="flex items-center gap-3">
              <Image src="/bni.png" alt="Bank BNI" width={28} height={28} />
              <span className="text-sm font-semibold text-gray-800">
                BANK BNI
              </span>
            </div>
            <ChevronRight className="text-gray-400 w-4 h-4" />
          </Link>

          <Link
            href="/customer/mobil/konfirmasi-pembayaran/bri"
            className="flex items-center justify-between bg-white border rounded-lg p-4 shadow-sm"
          >
            <div className="flex items-center gap-3">
              <Image src="/bri.png" alt="Bank BRI" width={28} height={28} />
              <span className="text-sm font-semibold text-gray-800">
                BANK BRI
              </span>
            </div>
            <ChevronRight className="text-gray-400 w-4 h-4" />
          </Link>

          <Link
            href="/customer/mobil/konfirmasi-pembayaran/mandiri"
            className="flex items-center justify-between bg-white border rounded-lg p-4 shadow-sm"
          >
            <div className="flex items-center gap-3">
              <Image
                src="/mandiri.png"
                alt="Bank Mandiri"
                width={28}
                height={28}
              />
              <span className="text-sm font-semibold text-gray-800">
                BANK MANDIRI
              </span>
            </div>
            <ChevronRight className="text-gray-400 w-4 h-4" />
          </Link>

          <Link
            href="/customer/mobil/konfirmasi-pembayaran/btn"
            className="flex items-center justify-between bg-white border rounded-lg p-4 shadow-sm"
          >
            <div className="flex items-center gap-3">
              <Image src="/btn.png" alt="Bank BTN" width={28} height={28} />
              <span className="text-sm font-semibold text-gray-800">
                BANK BTN
              </span>
            </div>
            <ChevronRight className="text-gray-400 w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
