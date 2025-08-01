'use client'

import { useState } from 'react'
import StatusBadge from '@/components/StatusBadge'

const allMitraData = [
  { no: 1, nama: 'Christine Brooks', email: 'ChristineBrooks@gmail.com', perjalanan: 0, rating: 0, status: 'Terblokir' },
  { no: 2, nama: 'Rosie Pearson', email: 'RosiePearson@gmail.com', perjalanan: 32, rating: 4.8, status: 'Terverifikasi' },
  { no: 3, nama: 'Darrell Caldwell', email: 'DarrellCaldwell@gmail.com', perjalanan: 32, rating: 4.8, status: 'Terverifikasi' },
  { no: 4, nama: 'Gilbert Johnston', email: 'GilbertJohnston@gmail.com', perjalanan: 32, rating: 4.8, status: 'Terverifikasi' },
  { no: 5, nama: 'Alan Cain', email: 'AlanCain@gmail.com', perjalanan: 0, rating: 0, status: 'Terblokir' },
  { no: 6, nama: 'Alfred Murray', email: 'AlfredMurray@gmail.com', perjalanan: 32, rating: 4.8, status: 'Terverifikasi' },
  { no: 7, nama: 'Maggie Sullivan', email: 'MaggieSullivan@gmail.com', perjalanan: 32, rating: 4.8, status: 'Terverifikasi' },
  { no: 8, nama: 'Rosie Todd', email: 'RosieTodd@gmail.com', perjalanan: 0, rating: 0, status: 'Terblokir' },
  { no: 9, nama: 'Dollie Hines', email: 'DollieHines@gmail.com', perjalanan: 32, rating: 4.8, status: 'Terverifikasi' }
]

export default function MitraSemuaPage() {
  const [statusFilter, setStatusFilter] = useState('')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedMitra, setSelectedMitra] = useState<null | typeof allMitraData[0]>(null)

  const filteredData = allMitraData.filter((mitra) => {
    const matchStatus = statusFilter ? mitra.status === statusFilter : true
    const matchSearch = mitra.nama.toLowerCase().includes(searchQuery.toLowerCase())
    return matchStatus && matchSearch
  })

  return (
    <div className="p-6">
      <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="text-2xl font-semibold text-gray-800">Data Semua Mitra</div>
        <div className="flex flex-wrap gap-3 items-center">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2 text-sm border rounded-md bg-white border-gray-300 text-gray-700 shadow-sm"
          >
            <option value="">Status</option>
            <option value="Terverifikasi">Terverifikasi</option>
            <option value="Terblokir">Terblokir</option>
          </select>
          <input
            type="text"
            placeholder="Cari mitra..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="px-4 py-2 text-sm border rounded-md bg-white border-gray-300 w-64 shadow-sm"
          />
          <button
            onClick={() => {
              setStatusFilter('')
              setSearchQuery('')
              setSelectedMitra(null)
            }}
            className="px-4 py-2 text-sm text-rose-600 border rounded-md border-rose-300 bg-white hover:bg-rose-50 shadow-sm"
          >
            Reset Filter
          </button>
        </div>
      </div>

      <div className="overflow-x-auto rounded-lg bg-white shadow border border-gray-200">
        <table className="w-full text-sm text-gray-700">
          <thead className="bg-gray-50 text-xs text-gray-500 uppercase">
            <tr>
              <th className="px-4 py-3 text-left">No</th>
              <th className="px-4 py-3 text-left">Nama Mitra</th>
              <th className="px-4 py-3 text-left">Email</th>
              <th className="px-4 py-3 text-center">Total Perjalanan</th>
              <th className="px-4 py-3 text-center">Rating</th>
              <th className="px-4 py-3 text-center">Status</th>
              <th className="px-4 py-3 text-center">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((mitra, index) => (
              <tr key={index} className="border-t hover:bg-gray-50 transition duration-200">
                <td className="px-4 py-3">{mitra.no}</td>
                <td className="px-4 py-3">{mitra.nama}</td>
                <td className="px-4 py-3">{mitra.email}</td>
                <td className="px-4 py-3 text-center">{mitra.perjalanan}</td>
                <td className="px-4 py-3 text-center">{mitra.rating}</td>
                <td className="px-4 py-3 text-center">
                  <StatusBadge status={mitra.status} />
                </td>
                <td className="px-4 py-3 text-center">
                  <button
                    onClick={() => setSelectedMitra(mitra)}
                    className="text-blue-600 hover:underline"
                  >
                    Detail
                  </button>
                </td>
              </tr>
            ))}
            {filteredData.length === 0 && (
              <tr>
                <td colSpan={7} className="px-4 py-6 text-center text-gray-400">
                  Tidak ada data mitra yang ditemukan.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="text-sm text-gray-500 mt-4">
        Menampilkan data 1 hingga {filteredData.length} dari {allMitraData.length}
      </div>

      {selectedMitra && (
        <div className="mt-6 bg-white shadow rounded-lg p-6 border border-gray-200">
          <div className="text-xl font-semibold text-gray-800 mb-4">Detail Mitra</div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-700">
            <div><strong>Nama:</strong> {selectedMitra.nama}</div>
            <div><strong>Email:</strong> {selectedMitra.email}</div>
            <div><strong>Total Perjalanan:</strong> {selectedMitra.perjalanan}</div>
            <div><strong>Rating:</strong> {selectedMitra.rating}</div>
            <div><strong>Status:</strong> <StatusBadge status={selectedMitra.status} /></div>
          </div>
          <button
            onClick={() => setSelectedMitra(null)}
            className="mt-4 text-sm text-gray-500 hover:text-red-500 underline"
          >
            Tutup Detail
          </button>
        </div>
      )}
    </div>
  )
}
