// frontend/src/app/admin/customer/page.tsx
'use client';

import { useState } from 'react';
import BadgeStatus from '@/components/BadgeStatus';
import FilterDropdown from '@/components/FilterDropdown';

const dummyCustomers = [
  { id: 1, name: 'Christine Brooks', email: 'ChristineBrooks@gmail.com', trips: '-', rating: '-', status: 'Terblokir' },
  { id: 2, name: 'Rosie Pearson', email: 'RosiePearson@gmail.com', trips: 3, rating: 4.9, status: 'Terverifikasi' },
  { id: 3, name: 'Darrell Caldwell', email: 'DarrellCaldwell@gmail.com', trips: 10, rating: 4.8, status: 'Terverifikasi' },
  { id: 4, name: 'Gilbert Johnston', email: 'GilbertJohnston@gmail.com', trips: 4, rating: 4.8, status: 'Terverifikasi' },
  { id: 5, name: 'Alan Cain', email: 'AlanCain@gmail.com', trips: '-', rating: '-', status: 'Terblokir' },
  { id: 6, name: 'Alfred Murray', email: 'AlfredMurray@gmail.com', trips: 3, rating: 4.8, status: 'Terverifikasi' },
  { id: 7, name: 'Maggie Sullivan', email: 'MaggieSullivan@gmail.com', trips: 2, rating: 4.8, status: 'Terverifikasi' },
  { id: 8, name: 'Rosie Todd', email: 'RosieTodd@gmail.com', trips: '-', rating: '-', status: 'Terblokir' },
  { id: 9, name: 'Dollie Hines', email: 'DollieHines@gmail.com', trips: 1, rating: 4.8, status: 'Terverifikasi' }
];

export default function CustomerPage() {
  const [statusFilter, setStatusFilter] = useState('');
  const [search, setSearch] = useState('');

  const filteredCustomers = dummyCustomers.filter((cust) => {
    const matchStatus = statusFilter ? cust.status === statusFilter : true;
    const matchSearch = search ? cust.name.toLowerCase().includes(search.toLowerCase()) : true;
    return matchStatus && matchSearch;
  });

  return (
    <div className="p-6">
      <h1 className="text-xl font-semibold mb-6  text-gray-800">Data Semua Customer</h1>

      <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-6  text-gray-800">
        <FilterDropdown
          label="Status"
          value={statusFilter}
          onChange={setStatusFilter}
          options={['Terverifikasi', 'Terblokir']}
        />

        <button onClick={() => { setSearch(''); setStatusFilter(''); }} className="bg-rose-100 text-rose-500 rounded px-3 py-1 text-sm">Reset Filter</button>

        <input
          type="text"
          placeholder="Cari disini"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border rounded px-3 py-1 text-sm flex-1 sm:flex-none"
        />
      </div>

      <div className="overflow-x-auto rounded bg-white">
        <table className="min-w-full text-sm">
          <thead className="text-left text-gray-600 border-b">
            <tr>
              <th className="px-4 py-2">No</th>
              <th className="px-4 py-2">Nama Customer</th>
              <th className="px-4 py-2">Email</th>
              <th className="px-4 py-2">Total Perjalanan</th>
              <th className="px-4 py-2">Rating</th>
              <th className="px-4 py-2">Status</th>
              <th className="px-4 py-2">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {filteredCustomers.map((cust, i) => (
              <tr key={cust.id} className="border-b">
                <td className="px-4 py-2  text-gray-800">{i + 1}</td>
                <td className="px-4 py-2  text-gray-800">{cust.name}</td>
                <td className="px-4 py-2  text-gray-800">{cust.email}</td>
                <td className="px-4 py-2  text-gray-800">{cust.trips}</td>
                <td className="px-4 py-2  text-gray-800">{cust.rating}</td>
                <td className="px-4 py-2  text-gray-800">
                  <BadgeStatus status={cust.status} />
                </td>
                <td className="px-4 py-2 text-blue-600 cursor-pointer">Detail</td>
              </tr>
            ))}
          </tbody>
        </table>
        <p className="text-xs text-gray-500 px-4 py-3">Menampilkan data 1 hingga {filteredCustomers.length} dari {dummyCustomers.length}</p>
      </div>
    </div>
  );
}
