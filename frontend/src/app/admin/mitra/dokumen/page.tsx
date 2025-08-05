'use client'; // Add this directive to mark the file as a Client Component

import { useState } from 'react';
import { ChevronDown, Filter, Search } from 'lucide-react';

// Type definition for the Mitra object
type Mitra = {
  id: number;
  nama: string;
  email: string;
  telp: string;
  perubahan: string;
  status: string;
};

// StatusBadge component with explicit type for props
const StatusBadge = ({ status }: { status: string }) => {
  const getStatusColor = (status: string) => {
    if (status === 'Terverifikasi') {
      return 'bg-green-100 text-green-800 border-green-200';
    } else if (status === 'Belum diverifikasi') {
      return 'bg-red-100 text-red-800 border-red-200';
    }
    return 'bg-gray-100 text-gray-800 border-gray-200';
  };

  return (
    <span className={`px-2 py-1 text-xs font-medium rounded-full border ${getStatusColor(status)}`}>
      {status}
    </span>
  );
};

// Sample data of Mitra (partner) documents
const dataDokumen: Mitra[] = [
  { id: 1, nama: 'Christine Brooks', email: 'ChristineBrooks@gmail.com', telp: '+6272349482665', perubahan: 'SIM', status: 'Belum diverifikasi' },
  { id: 2, nama: 'Rosie Pearson', email: 'RosiePearson@gmail.com', telp: '+6272349482665', perubahan: 'SKCK', status: 'Terverifikasi' },
  { id: 3, nama: 'Darrell Caldwell', email: 'DarrellCaldwell@gmail.com', telp: '+6272349482665', perubahan: 'Rekening Bank', status: 'Terverifikasi' },
  { id: 4, nama: 'Gilbert Johnston', email: 'GilbertJohnston@gmail.com', telp: '+6272349482665', perubahan: 'SIM', status: 'Terverifikasi' },
  { id: 5, nama: 'Alan Cain', email: 'AlanCain@gmail.com', telp: '+6272349482665', perubahan: 'SIM, SKCK', status: 'Belum diverifikasi' },
  { id: 6, nama: 'Alfred Murray', email: 'AlfredMurray@gmail.com', telp: '+6272349482665', perubahan: 'SIM', status: 'Terverifikasi' },
  { id: 7, nama: 'Maggie Sullivan', email: 'MaggieSullivan@gmail.com', telp: '+6272349482665', perubahan: 'Rekening Bank', status: 'Terverifikasi' },
  { id: 8, nama: 'Rosie Todd', email: 'RosieTodd@gmail.com', telp: '+6272349482665', perubahan: 'Rekening Bank', status: 'Belum diverifikasi' },
  { id: 9, nama: 'Dollie Hines', email: 'DollieHines@gmail.com', telp: '+6272349482665', perubahan: 'Rekening Bank', status: 'Terverifikasi' },
];

export default function DokumenMitraPage() {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [selectedMitra, setSelectedMitra] = useState<Mitra | null>(null);

  // Filter documents based on status, search, and other criteria
  const filtered = dataDokumen.filter((m) => {
    const byStatus = statusFilter ? m.status === statusFilter : true;
    const bySearch = m.nama.toLowerCase().includes(search.toLowerCase());
    return byStatus && bySearch;
  });

  // Reset all filters
  const resetFilters = () => {
    setStatusFilter('');
    setSearch('');
    setSelectedMitra(null);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-semibold text-gray-900 mb-6">Ubah Dokumen</h1>

          {/* Filters */}
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <div className="relative">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="appearance-none bg-white border border-gray-300 rounded-md px-4 py-2 pr-8 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Status</option>
                <option value="Terverifikasi">Terverifikasi</option>
                <option value="Belum diverifikasi">Belum diverifikasi</option>
              </select>
              <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
            </div>

            <button 
              onClick={resetFilters}
              className="flex items-center gap-2 px-4 py-2 text-sm text-red-600 border border-red-300 rounded-md bg-white hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-red-500"
            >
              <Filter className="h-4 w-4" />
              Reset Filter
            </button>

            <div className="relative flex-1 max-w-md ml-auto">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Cari di sini"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2 text-sm border border-gray-300 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    No
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Nama Mitra
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Email
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    No. Telepon
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Jenis Perubahan
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Aksi
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filtered.map((item, index) => (
                  <tr key={item.id} className="hover:bg-gray-50 transition-colors duration-150">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {index + 1}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {item.nama}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {item.email}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {item.telp}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {item.perubahan}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <StatusBadge status={item.status} />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      <button
                        onClick={() => setSelectedMitra(item)}
                        className="text-blue-600 hover:text-blue-800 text-sm font-medium hover:underline focus:outline-none"
                      >
                        Detail ›
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {filtered.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 text-sm">Tidak ada data dokumen mitra yang ditemukan.</p>
            </div>
          )}
        </div>

        {/* Footer info */}
        <div className="mt-4 flex items-center justify-between text-sm text-gray-500">
          <div>
            Menampilkan data 1 hingga {filtered.length} dari {dataDokumen.length}
          </div>
          <div className="flex items-center gap-2">
            <button className="p-1 rounded hover:bg-gray-100 disabled:opacity-50" disabled>
              <ChevronDown className="h-4 w-4 rotate-90" />
            </button>
            <button className="p-1 rounded hover:bg-gray-100">
              <ChevronDown className="h-4 w-4 -rotate-90" />
            </button>
          </div>
        </div>

        {/* Detail Modal */}
        {selectedMitra && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Detail Dokumen Mitra</h3>
                <button
                  onClick={() => setSelectedMitra(null)}
                  className="text-gray-400 hover:text-gray-600 text-xl font-bold"
                >
                  ×
                </button>
              </div>
              
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Nama:</span>
                  <span className="font-medium text-gray-900">{selectedMitra.nama}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Email:</span>
                  <span className="font-medium text-gray-900">{selectedMitra.email}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">No. Telepon:</span>
                  <span className="font-medium text-gray-900">{selectedMitra.telp}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Jenis Perubahan:</span>
                  <span className="font-medium text-gray-900">{selectedMitra.perubahan}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Status:</span>
                  <StatusBadge status={selectedMitra.status} />
                </div>
              </div>
              
              <div className="mt-6 flex justify-end gap-3">
                <button
                  onClick={() => setSelectedMitra(null)}
                  className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800 hover:underline"
                >
                  Tutup Detail
                </button>
                <button className="px-4 py-2 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500">
                  Verifikasi Dokumen
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
