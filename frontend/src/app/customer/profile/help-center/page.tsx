"use client";

import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function HelpCenterPage() {
  const helpItems = [
    {
      title: "Saya mengalami kecelakaan",
      content: `Jika Anda mengalami kecelakaan saat perjalanan dengan Nebeng:
1. Pastikan Anda dalam keadaan aman.
2. Segera hubungi pihak darurat (ambulans, polisi).
3. Hubungi layanan pelanggan Nebeng melalui menu "Pusat Bantuan" atau nomor darurat kami di 0800-123-NEBENG.
4. Sertakan detail perjalanan, nama driver, dan waktu kejadian.`
    },
    {
      title: "Barang saya tertinggal di motor",
      content: `Jika barang Anda tertinggal di motor driver:
1. Coba hubungi driver langsung melalui riwayat perjalanan.
2. Jika tidak bisa, hubungi layanan pelanggan Nebeng.
3. Sertakan informasi perjalanan dan deskripsi barang.`
    },
    {
      title: "Barang saya tertinggal di mobil",
      content: `Langkah sama seperti kehilangan di motor, hubungi driver terlebih dahulu, lalu layanan pelanggan jika tidak berhasil.`
    },
    {
      title: "Saya mengalami penipuan",
      content: `Jika mengalami penipuan:
1. Jangan kirim uang atau informasi pribadi ke pihak tak dikenal.
2. Laporkan segera melalui aplikasi atau email support@nebeng.com.
3. Sertakan bukti percakapan atau transaksi.`
    },
    {
      title: "Driver melakukan pelecehan terhadap saya",
      content: `Keselamatan Anda prioritas kami. Segera:
1. Akhiri perjalanan jika memungkinkan.
2. Hubungi pihak berwenang.
3. Laporkan melalui aplikasi dengan bukti yang ada.`
    },
    {
      title: "Cara mengubah nama, no hp, email, dan foto di akun nebeng",
      content: `Buka menu Profil > Pengaturan Akun > Ubah Data. Simpan perubahan dan pastikan email/no hp aktif.`
    },
    {
      title: "Saya ingin menghapus akun saya",
      content: `Hubungi layanan pelanggan atau gunakan menu 'Hapus Akun' di Pengaturan. Data Anda akan dihapus sesuai kebijakan privasi.`
    },
    {
      title: "Cara mengubah bahasa aplikasi",
      content: `Buka menu Pengaturan > Bahasa > Pilih bahasa yang diinginkan.`
    },
    {
      title: "Akun saya terblokir",
      content: `Akun bisa terblokir karena pelanggaran kebijakan. Hubungi layanan pelanggan untuk klarifikasi dan proses pemulihan akun.`
    },
    {
      title: "Bagaimana Proses Refund Bekerja?",
      content: `Refund akan diproses dalam 3-5 hari kerja ke metode pembayaran awal Anda setelah disetujui.`
    },
    {
      title: "Kebijakan Refund",
      content: `Refund diberikan jika perjalanan dibatalkan oleh driver atau kesalahan sistem. Tidak berlaku jika pembatalan dilakukan penumpang mendekati waktu keberangkatan.`
    }
  ];

  const [selectedHelp, setSelectedHelp] = useState<null | number>(null);

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="flex items-center p-4 border-b">
        {selectedHelp === null ? (
          <Link href="/customer/profile">
            <ArrowLeft className="w-6 h-6 text-gray-700" />
          </Link>
        ) : (
          <button onClick={() => setSelectedHelp(null)}>
            <ArrowLeft className="w-6 h-6 text-gray-700" />
          </button>
        )}
        <h1 className="flex-1 text-center text-lg font-semibold">Pusat Bantuan</h1>
      </div>

      {/* List Bantuan */}
      {selectedHelp === null ? (
        <div className="divide-y">
          {helpItems.map((item, idx) => (
            <div
              key={idx}
              className="p-4 cursor-pointer hover:bg-gray-50"
              onClick={() => setSelectedHelp(idx)}
            >
              {item.title}
            </div>
          ))}
        </div>
      ) : (
        <div className="p-4">
          <h2 className="text-lg font-semibold mb-3">{helpItems[selectedHelp].title}</h2>
          <p className="whitespace-pre-line text-gray-700">
            {helpItems[selectedHelp].content}
          </p>
        </div>
      )}
    </div>
  );
}
