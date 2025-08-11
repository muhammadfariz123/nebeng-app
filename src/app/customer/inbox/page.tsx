"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";

export default function InboxPage() {
  const router = useRouter();

  return (
    <div className="flex flex-col h-screen bg-white">
      {/* Header */}
      <div className="flex items-center px-4 py-3 border-b border-gray-200">
        <button onClick={() => router.back()} className="mr-3 text-lg">
          ←
        </button>
        <h1 className="text-lg font-semibold flex-1 text-center">Inbox</h1>
      </div>

      {/* Tab */}
      <div className="flex border-b border-gray-200">
        <button className="flex-1 py-2 text-blue-600 border-b-2 border-blue-600 font-medium">
          Notifikasi
        </button>
        <button className="flex-1 py-2 text-gray-500">Promo</button>
      </div>

      {/* Konten Kosong */}
      <div className="flex flex-col items-center justify-center flex-1 p-6 text-center">
        <Image
          src="/inbox.png" // Pastikan file ada di folder public/
          alt="Empty Notification"
          width={200}
          height={200}
          priority
        />
        <h2 className="mt-4 text-lg font-semibold">Belum Ada Notifikasi</h2>
        <p className="text-gray-500 text-sm mt-2 max-w-sm">
          Saat ini belum ada notifikasi. Semua notifikasi yang kami kirim akan
          tampil di sini!
        </p>
      </div>
    </div>
  );
}
