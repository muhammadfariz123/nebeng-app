'use client';

import { useState } from 'react';
import { ChevronRight } from 'lucide-react';

interface Refund {
  id: number;
  date: string;
  name: string;
  service: string;
  code: string;
  amount: string;
  payment: string;
}

const dummyRefunds: Refund[] = [
  { id: 1, date: '14 Okt 2024', name: 'Chance Franci', service: 'Nebeng Mobil', code: 'XSH12HQ', amount: 'Rp 90.000', payment: 'Mandiri' },
  { id: 2, date: '14 Okt 2024', name: 'Talan Philips', service: 'Nebeng Motor', code: 'NP34NJI', amount: 'Rp 90.000', payment: 'BNI' },
  { id: 3, date: '14 Okt 2024', name: 'Nolan Kenter', service: 'Nebeng Barang', code: 'HU123UJ', amount: 'Rp 90.000', payment: 'BRI' },
  { id: 4, date: '14 Okt 2024', name: 'Marcus Torff', service: 'Nebeng Mobil', code: 'KL987UI', amount: 'Rp 90.000', payment: 'BNI' },
  { id: 5, date: '14 Okt 2024', name: 'Brandon Kenter', service: 'Nebeng Motor', code: 'JY918UH', amount: 'Rp 90.000', payment: 'BNI' },
  { id: 6, date: '13 Okt 2024', name: 'Emerson Bergson', service: 'Nebeng Barang', code: 'NHB21IJ', amount: 'Rp 90.000', payment: 'Mandiri' },
  { id: 7, date: '13 Okt 2024', name: 'Davis Workman', service: 'Nebeng Mobil', code: 'BG281KL', amount: 'Rp 90.000', payment: 'BNI' },
  { id: 8, date: '13 Okt 2024', name: 'Jaylon Herwitz', service: 'Nebeng Motor', code: 'XC918MN', amount: 'Rp 90.000', payment: 'BNI' },
  { id: 9, date: '13 Okt 2024', name: 'Phillip Botosh', service: 'Nebeng Barang', code: 'IHB891SH', amount: 'Rp 90.000', payment: 'Mandiri' },
];

export default function RefundPage() {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  const filteredRefunds = dummyRefunds.filter((r) => {
    return r.name.toLowerCase().includes(search.toLowerCase());
  });

  return (
    <div className="p-6 text-gray-900">
      <h1 className="text-xl font-semibold mb-6">Daftar Refund</h1>

      <div className="bg-white rounded-lg p-4 flex flex-col sm:flex-row sm:items-center gap-3 mb-6 shadow-sm border">
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="border px-3 py-2 rounded text-sm text-gray-900 w-full sm:w-auto"
        >
          <option value="">Status</option>
          <option value="Diproses">Diproses</option>
          <option value="Selesai">Selesai</option>
        </select>

        <button
          onClick={() => { setStatusFilter(''); setSearch(''); }}
          className="text-rose-600 bg-rose-100 px-3 py-2 rounded text-sm"
        >
          ⟳ Reset Filter
        </button>

        <input
          type="text"
          placeholder="Cari disini"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border px-4 py-2 rounded text-sm flex-1 text-gray-900"
        />
      </div>

      <div className="overflow-x-auto bg-white rounded-xl shadow-sm">
        <table className="min-w-full text-sm text-gray-900">
          <thead className="text-left border-b border-gray-200">
            <tr>
              <th className="px-4 py-3 font-medium">No</th>
              <th className="px-4 py-3 font-medium">Tanggal</th>
              <th className="px-4 py-3 font-medium">Nama Customer</th>
              <th className="px-4 py-3 font-medium">Layanan</th>
              <th className="px-4 py-3 font-medium">Kode Pemesanan</th>
              <th className="px-4 py-3 font-medium">Jumlah Refund</th>
              <th className="px-4 py-3 font-medium">Pembayaran</th>
              <th className="px-4 py-3 font-medium">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {filteredRefunds.map((r, index) => (
              <tr key={r.id} className="border-b border-gray-100 hover:bg-gray-50">
                <td className="px-4 py-3">{index + 1}</td>
                <td className="px-4 py-3">{r.date}</td>
                <td className="px-4 py-3">{r.name}</td>
                <td className="px-4 py-3">{r.service}</td>
                <td className="px-4 py-3">{r.code}</td>
                <td className="px-4 py-3">{r.amount}</td>
                <td className="px-4 py-3">{r.payment}</td>
                <td className="px-4 py-3 text-blue-600 flex items-center gap-1 cursor-pointer">
                  Detail <ChevronRight size={16} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <p className="text-sm text-gray-600 px-4 py-4">
          Menampilkan data 1 hingga {filteredRefunds.length} dari {dummyRefunds.length}
        </p>
      </div>
    </div>
  );
}
