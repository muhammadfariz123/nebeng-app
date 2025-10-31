"use client";

import { ArrowLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

export default function KonfirmasiPembayaranPage() {
  const params = useSearchParams();
  const id = params.get("id");
  const customerId = params.get("customerId");

  return (
    <div className="min-h-screen bg-white text-gray-800">
      <div className="sticky top-0 z-10 bg-white border-b px-4 py-4 flex items-center">
        <Link href={`/customer/motor/pembayaran?id=${id}`}>
          <ArrowLeft className="w-5 h-5 text-gray-800" />
        </Link>
        <h1 className="flex-1 text-center text-base font-semibold">
          Pilih Metode Pembayaran
        </h1>
        <div className="w-5" />
      </div>

      <div className="px-4 py-6 space-y-5">
        <h2 className="text-sm font-semibold text-gray-800">
          Bayar dengan{" "}
          <span className="font-bold">ATM / MOBILE / INTERNET BANKING</span>
        </h2>

        <div className="space-y-3">
          {["bni", "bri", "mandiri", "btn"].map((bank) => (
            <Link
              key={bank}
              href={`/customer/motor/konfirmasi-pembayaran/${bank}?id=${id}&customerId=${customerId}`}
              className="flex items-center justify-between bg-white border rounded-lg p-4 shadow-sm"
            >
              <div className="flex items-center gap-3">
                <Image src={`/${bank}.png`} alt={bank} width={28} height={28} />
                <span className="text-sm font-semibold text-gray-800">
                  BANK {bank.toUpperCase()}
                </span>
              </div>
              <ChevronRight className="text-gray-400 w-4 h-4" />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
