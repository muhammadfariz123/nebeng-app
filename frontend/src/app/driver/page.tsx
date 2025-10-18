"use client"

import { Card, CardContent, CardTitle } from "@/components/ui/card"
import '@fortawesome/fontawesome-free/css/all.min.css';
import Link from "next/link";
import { useEffect, useState } from "react";

export default function DriverDashboard() {
  const [tebenganList, setTebenganList] = useState<any[]>([]);
  // ...existing code...

  useEffect(() => {
    // Ambil data tebengan dari localStorage
    const data = localStorage.getItem("tebenganList");
    if (data) {
      setTebenganList(JSON.parse(data));
    }
    // Listen event dari halaman create
    const handler = () => {
      const updated = localStorage.getItem("tebenganList");
      if (updated) setTebenganList(JSON.parse(updated));
    };
    window.addEventListener("tebenganCreated", handler);
    return () => window.removeEventListener("tebenganCreated", handler);
  }, []);

  // Pisahkan tebengan berdasarkan kriteria
  const tebenganByType: Record<string, any[]> = {
    motor: [],
    mobil: [],
    barang: [],
    "transportasi-umum": []
  };
  tebenganList.forEach((t) => {
    if (tebenganByType[t.type]) tebenganByType[t.type].push(t);
  });
  // Urutkan tiap kriteria berdasarkan waktu
  Object.keys(tebenganByType).forEach((key) => {
    tebenganByType[key] = tebenganByType[key].sort((a, b) => new Date(a.waktu).getTime() - new Date(b.waktu).getTime());
  });

  return (
    <div className=" ">
      {/* Header */}
      <div className="bg-blue-600 text-white rounded-lg mb-8 shadow-lg flex items-center justify-between">
        <div className="flex flex-col">
          <div className="p-5">
            <p>Selamat Pagi,</p>
            <h1 className="text-3xl font-bold">Omar Vetrov</h1>
          </div>
          <div className="flex justify-between items-center px-5 -mb-20" >
            <div className="text-black bg-white p-5 pr-253 w-full rounded-lg shadow-lg">
              <p className="text-xl">Pendapatan</p>
              <div className="text-4xl font-semibold mt-4">Rp 0</div>
            </div>
          </div>
        </div>
      </div>

      {/* Buat Tebengan */}
      <div className="text-center mb-8 pt-20">
        <h3 className="text-xl font-semibold mb-4 p-10">Buat Tebengan</h3>
  <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-8">
          <Link href="/driver/create?type=motor" className="p-4 rounded-lg flex flex-col items-center hover:bg-gray-50 transition">
            <div className="bg-green-100 text-white rounded-full p-5 px-8 mb-5 hover:shadow-xl hover:scale-105 transition-transform duration-300 ease-in-out">
              <img src="motor.png" alt="Motor" className="w-8 h-12" />
            </div>
            <span>Motor</span>
          </Link>
          <Link href="/driver/create?type=mobil" className="p-4 rounded-lg flex flex-col items-center hover:bg-gray-50 transition">
            <div className="bg-blue-100 text-white rounded-full p-5 mb-5 hover:shadow-xl hover:scale-105 transition-transform duration-300 ease-in-out">
              <img src="mobil.png" alt="Mobil" className="w-12 h-12" />
            </div>
            <span>Mobil</span>
          </Link>
          <Link href="/driver/create?type=barang" className="p-4 rounded-lg flex flex-col items-center hover:bg-gray-50 transition">
            <div className="bg-yellow-100 text-white rounded-full p-5 mb-5 hover:shadow-xl hover:scale-105 transition-transform duration-300 ease-in-out">
              <img src="barang.png" alt="Barang" className="w-12 h-12" />
            </div>
            <span>Barang</span>
          </Link>
          <Link href="/driver/create?type=transportasi-umum" className="p-4 rounded-lg flex flex-col items-center hover:bg-gray-50 transition">
            <div className="bg-red-100 text-white rounded-full p-5 py-7 mb-5 hover:shadow-xl hover:scale-105 transition-transform duration-300 ease-in-out">
              <img src="barang_tu.png" alt="Transportasi Umum" className="w-12 h-8" />
            </div>
            <span>Transportasi Umum</span>
          </Link>
        </div>

        {/* Daftar Tebengan Dibuat per Kriteria */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-6 mt-8">
          {Object.entries(tebenganByType).map(([key, list]) => (
            <div key={key} className="bg-gray-50 rounded-lg p-4 shadow">
              <h4 className="text-lg font-bold mb-4 text-center">{key === "motor" ? "Motor" : key === "mobil" ? "Mobil" : key === "barang" ? "Barang" : "Transportasi Umum"}</h4>
              {list.length === 0 ? (
                <div className="text-gray-400 text-center">Belum ada tebengan</div>
              ) : (
                <div className="space-y-4">
                  {list.map((t, idx) => (
                    <div key={idx} className="border rounded-lg p-3 shadow flex flex-col items-start">
                      <div className="font-semibold">{t.asal} → {t.tujuan}</div>
                      <div className="text-sm text-gray-500">{new Date(t.waktu).toLocaleString()}</div>
                      <div className="font-bold text-blue-600">Rp {t.harga}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
  </div>


      {/* Tebengan Mendatang */}
      <div className="text-center mt-8 pb-20 pt-10">
        <h3 className="text-xl font-semibold mb-4 p-10">Tebengan Mendatang</h3>
        <div className="bg-blue-100 p-6 rounded-lg inline-block px-20">
          <img src="beranda_kosong.png" alt="No Bookings" className="mx-auto -mt-10 -mb-6" />
        </div>
        <div className="p-6">
          <h3 className="text-xl font-semibold">Belum ada tebengan</h3>
          <p className="text-lg">Buat tebengan dulu yuk!</p>
        </div>
      </div>
    </div>
  );
}
