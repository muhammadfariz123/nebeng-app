// frontend/src/app/admin/pesanan/page.tsx
'use client';

import { useState } from 'react';

type OrderStatus = 'Selesai' | 'Dalam Proses' | 'Tidak Selesai';

interface Order {
  id: number;
  name: string;
  date: string;
  service: string;
  price: string;
  status: OrderStatus;
}

const dummyOrders: Order[] = [
  { id: 1, name: 'Christine Brooks', date: '14 Oktober 2024', service: 'Nebeng Mobil', price: 'Rp 90.000', status: 'Dalam Proses' },
  { id: 2, name: 'Rosie Pearson', date: '14 Oktober 2024', service: 'Nebeng Motor', price: 'Rp 90.000', status: 'Selesai' },
  { id: 3, name: 'Darrell Caldwell', date: '14 Oktober 2024', service: 'Nebeng Barang', price: 'Rp 90.000', status: 'Selesai' },
  { id: 4, name: 'Gilbert Johnston', date: '14 Oktober 2024', service: 'Nebeng Mobil', price: 'Rp 90.000', status: 'Selesai' },
  { id: 5, name: 'Alan Cain', date: '14 Oktober 2024', service: 'Nebeng Motor', price: 'Rp 90.000', status: 'Tidak Selesai' },
  { id: 6, name: 'Alfred Murray', date: '14 Oktober 2024', service: 'Nebeng Barang', price: 'Rp 90.000', status: 'Dalam Proses' },
  { id: 7, name: 'Maggie Sullivan', date: '14 Oktober 2024', service: 'Nebeng Mobil', price: 'Rp 90.000', status: 'Dalam Proses' },
  { id: 8, name: 'Rosie Todd', date: '14 Oktober 2024', service: 'Nebeng Motor', price: 'Rp 90.000', status: 'Selesai' },
  { id: 9, name: 'Dollie Hines', date: '14 Oktober 2024', service: 'Nebeng Barang', price: 'Rp 90.000', status: 'Selesai' },
];

const statusColor: Record<OrderStatus, string> = {
  'Selesai': 'bg-green-100 text-green-700',
  'Dalam Proses': 'bg-yellow-100 text-yellow-700',
  'Tidak Selesai': 'bg-red-100 text-red-700',
};

export default function PesananPage() {
  const [statusFilter, setStatusFilter] = useState('');
  const [search, setSearch] = useState('');

  const filteredOrders = dummyOrders.filter((order) => {
    const matchStatus = statusFilter ? order.status === statusFilter : true;
    const matchSearch = search ? order.name.toLowerCase().includes(search.toLowerCase()) : true;
    return matchStatus && matchSearch;
  });

  return (
    <div className="p-6 text-gray-900">
      <h1 className="text-2xl font-bold mb-6">Daftar Pesanan</h1>

      <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-6">
        <select
          className="border rounded px-3 py-2 text-sm text-gray-900 bg-white"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="">Status</option>
          <option value="Selesai">Selesai</option>
          <option value="Dalam Proses">Dalam Proses</option>
          <option value="Tidak Selesai">Tidak Selesai</option>
        </select>

        <button
          onClick={() => { setSearch(''); setStatusFilter(''); }}
          className="bg-rose-100 text-rose-600 rounded px-4 py-2 text-sm hover:bg-rose-200 transition"
        >
          Reset Filter
        </button>

        <input
          type="text"
          placeholder="Cari nama customer..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border rounded px-3 py-2 text-sm flex-1 sm:flex-none text-gray-900 bg-white"
        />

        <button className="bg-blue-600 text-white text-sm px-4 py-2 rounded ml-auto hover:bg-blue-700 transition">
          Unduh PDF
        </button>
      </div>

      <div className="overflow-x-auto bg-white rounded-xl shadow">
        <table className="min-w-full text-sm text-gray-900">
          <thead className="text-gray-700 bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-5 py-3 text-left">No</th>
              <th className="px-5 py-3 text-left">Nama Customer</th>
              <th className="px-5 py-3 text-left">Tanggal</th>
              <th className="px-5 py-3 text-left">Layanan</th>
              <th className="px-5 py-3 text-left">Total Harga</th>
              <th className="px-5 py-3 text-left">Status</th>
              <th className="px-5 py-3 text-left">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.map((order, i) => (
              <tr key={order.id} className="border-b border-gray-200 hover:bg-gray-50 transition">
                <td className="px-5 py-3">{i + 1}</td>
                <td className="px-5 py-3">{order.name}</td>
                <td className="px-5 py-3">{order.date}</td>
                <td className="px-5 py-3">{order.service}</td>
                <td className="px-5 py-3">{order.price}</td>
                <td className="px-5 py-3">
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${statusColor[order.status]}`}>
                    {order.status}
                  </span>
                </td>
                <td className="px-5 py-3 text-blue-600 font-medium cursor-pointer hover:underline">Detail</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="px-5 py-3 text-xs text-gray-600 bg-gray-50 rounded-b-xl">
          Menampilkan data 1 hingga {filteredOrders.length} dari {dummyOrders.length}
        </div>
      </div>
    </div>
  );
}
