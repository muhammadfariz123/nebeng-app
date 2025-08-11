// frontend/src/app/admin/laporan/page.tsx
"use client";

import { useState } from "react";
import { FiFilter } from "react-icons/fi";
import { FaCarSide, FaMotorcycle, FaBoxOpen } from 'react-icons/fa';

interface Laporan {
  id: number;
  customer: string;
  driver: string;
  date: string;
  layanan: string;
  status: "Selesai" | "Tidak Selesai";
}

const data: Laporan[] = [
  {
    id: 1,
    customer: "Christine Brooks",
    driver: "Carter Franci",
    date: "13 Oktober 2024",
    layanan: "Nebeng Mobil",
    status: "Selesai",
  },
  {
    id: 2,
    customer: "Rosie Pearson",
    driver: "Jaxson Lipshutz",
    date: "13 Oktober 2024",
    layanan: "Nebeng Motor",
    status: "Selesai",
  },
  {
    id: 3,
    customer: "Darrell Caldwell",
    driver: "Justin Vaccaro",
    date: "13 Oktober 2024",
    layanan: "Nebeng Barang",
    status: "Selesai",
  },
  {
    id: 4,
    customer: "Gilbert Johnston",
    driver: "Jaxson Bergson",
    date: "13 Oktober 2024",
    layanan: "Nebeng Mobil",
    status: "Selesai",
  },
  {
    id: 5,
    customer: "Alan Cain",
    driver: "Randy Baptista",
    date: "13 Oktober 2024",
    layanan: "Nebeng Motor",
    status: "Tidak Selesai",
  },
  {
    id: 6,
    customer: "Alfred Murray",
    driver: "Marcus Culhane",
    date: "13 Oktober 2024",
    layanan: "Nebeng Barang",
    status: "Tidak Selesai",
  },
  {
    id: 7,
    customer: "Maggie Sullivan",
    driver: "Jaylon Septimus",
    date: "13 Oktober 2024",
    layanan: "Nebeng Mobil",
    status: "Tidak Selesai",
  },
  {
    id: 8,
    customer: "Rosie Todd",
    driver: "Phillip Levin",
    date: "13 Oktober 2024",
    layanan: "Nebeng Motor",
    status: "Selesai",
  },
  {
    id: 9,
    customer: "Dollie Hines",
    driver: "Talan Carder",
    date: "13 Oktober 2024",
    layanan: "Nebeng Mobil",
    status: "Selesai",
  },
];

export default function LaporanPage() {
  const [layananFilter, setLayananFilter] = useState("");
  const [search, setSearch] = useState("");

  const filteredData = data.filter((item) => {
    const matchLayanan = layananFilter ? item.layanan === layananFilter : true;
    const matchSearch = search
      ? item.customer.toLowerCase().includes(search.toLowerCase())
      : true;
    return matchLayanan && matchSearch;
  });

  return (
    <div className="p-6 text-gray-900">
      <h1 className="text-xl font-semibold mb-6">Laporan Masalah</h1>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <div className="flex items-center gap-4 bg-[#F5F8FF] p-4 rounded-xl shadow border border-[#E3E8F2]">
          <div className="bg-[#3D8BFF] p-2 rounded-lg text-white text-xl">
            <FaCarSide />
          </div>
          <div>
            <p className="text-sm text-gray-500">Nebeng Mobil</p>
            <p className="text-xl font-semibold text-gray-900">20</p>
          </div>
        </div>
        <div className="flex items-center gap-4 bg-[#ECFDF3] p-4 rounded-xl shadow border border-[#D1FADF]">
          <div className="bg-[#12B76A] p-2 rounded-lg text-white text-xl">
            <FaMotorcycle />
          </div>
          <div>
            <p className="text-sm text-gray-500">Nebeng Motor</p>
            <p className="text-xl font-semibold text-gray-900">10</p>
          </div>
        </div>
        <div className="flex items-center gap-4 bg-[#FFF6ED] p-4 rounded-xl shadow border border-[#FECDCA]">
          <div className="bg-[#F97316] p-2 rounded-lg text-white text-xl">
            <FaBoxOpen />
          </div>
          <div>
            <p className="text-sm text-gray-500">Nebeng Barang</p>
            <p className="text-xl font-semibold text-gray-900">4</p>
          </div>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-6">
        <div className="flex items-center gap-2 border rounded px-3 py-1 text-sm text-gray-900">
          <FiFilter className="text-gray-500" />
          <select
            className="outline-none text-sm"
            value={layananFilter}
            onChange={(e) => setLayananFilter(e.target.value)}
          >
            <option value="">Layanan</option>
            <option value="Nebeng Mobil">Nebeng Mobil</option>
            <option value="Nebeng Motor">Nebeng Motor</option>
            <option value="Nebeng Barang">Nebeng Barang</option>
          </select>
        </div>

        <button
          onClick={() => {
            setSearch("");
            setLayananFilter("");
          }}
          className="bg-rose-100 text-rose-600 rounded px-3 py-1 text-sm"
        >
          Reset Filter
        </button>

        <input
          type="text"
          placeholder="Cari disini"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border rounded px-3 py-1 text-sm flex-1 sm:flex-none text-gray-900"
        />
      </div>

      <div className="overflow-x-auto rounded bg-white">
        <table className="min-w-full text-sm text-gray-900 rounded-xl">
          <thead className="text-left text-gray-700 border-b border-gray-200">
            <tr>
              <th className="px-4 py-3">No</th>
              <th className="px-4 py-3">Nama Customer</th>
              <th className="px-4 py-3">Nama Driver</th>
              <th className="px-4 py-3">Tanggal</th>
              <th className="px-4 py-3">Layanan</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((item, i) => (
              <tr key={item.id} className="border-b border-gray-200">
                <td className="px-4 py-3">{i + 1}</td>
                <td className="px-4 py-3">{item.customer}</td>
                <td className="px-4 py-3">{item.driver}</td>
                <td className="px-4 py-3">{item.date}</td>
                <td className="px-4 py-3">{item.layanan}</td>
                <td className="px-4 py-3">
                  <span
                    className={`px-2 py-1 text-xs font-medium rounded ${
                      item.status === "Selesai"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-600"
                    }`}
                  >
                    {item.status}
                  </span>
                </td>
                <td className="px-4 py-3 text-blue-600 cursor-pointer">
                  Detail
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <p className="text-xs text-gray-700 px-4 py-3">
          Menampilkan data 1 hingga {filteredData.length} dari {data.length}
        </p>
      </div>
    </div>
  );
}
