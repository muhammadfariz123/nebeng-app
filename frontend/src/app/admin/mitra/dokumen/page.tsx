'use client'

import { useState } from 'react'

const dataDokumen = [
  { id: 1, nama: 'Christine Brooks', email: 'ChristineBrooks@gmail.com', telp: '+6272349482665', perubahan: 'SIM', status: 'Belum diverifikasi' },
  { id: 2, nama: 'Rosie Pearson', email: 'RosiePearson@gmail.com', telp: '+6272349482665', perubahan: 'SKCK', status: 'Terverifikasi' },
  { id: 3, nama: 'Darrell Caldwell', email: 'DarrellCaldwell@gmail.com', telp: '+6272349482665', perubahan: 'Rekening Bank', status: 'Terverifikasi' },
  { id: 4, nama: 'Gilbert Johnston', email: 'GilbertJohnston@gmail.com', telp: '+6272349482665', perubahan: 'SIM', status: 'Terverifikasi' },
  { id: 5, nama: 'Alan Cain', email: 'AlanCain@gmail.com', telp: '+6272349482665', perubahan: 'SIM, SKCK', status: 'Belum diverifikasi' },
  { id: 6, nama: 'Alfred Murray', email: 'AlfredMurray@gmail.com', telp: '+6272349482665', perubahan: 'SIM', status: 'Terverifikasi' },
  { id: 7, nama: 'Maggie Sullivan', email: 'MaggieSullivan@gmail.com', telp: '+6272349482665', perubahan: 'Rekening Bank', status: 'Terverifikasi' },
  { id: 8, nama: 'Rosie Todd', email: 'RosieTodd@gmail.com', telp: '+6272349482665', perubahan: 'Rekening Bank', status: 'Belum diverifikasi' },
  { id: 9, nama: 'Dollie Hines', email: 'DollieHines@gmail.com', telp: '+6272349482665', perubahan: 'Rekening Bank', status: 'Terverifikasi' },
]

export default function DokumenMitraPage() {
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('')

  const filtered = dataDokumen.filter((m) => {
    const byStatus = statusFilter ? m.status === statusFilter : true
    const bySearch = m.nama.toLowerCase().includes(search.toLowerCase())
    return byStatus && bySearch
  })

  return (
    <div className="p-6">
      <h1 className="text-xl font-semibold text-gray-800 mb-6">Ubah Dokumen</h1>

      <div className="flex flex-wrap items-center gap-3 mb-4">
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="border px-4 py-2 rounded-md text-sm  text-gray-800"
        >
          <option value="">Status</option>
          <option value="Terverifikasi">Terverifikasi</option>
          <option value="Belum diverifikasi">Belum diverifikasi</option>
        </select>

        <button
          onClick={() => {
            setStatusFilter('')
            setSearch('')
          }}
          className="text-red-500 border border-red-300 px-4 py-2 rounded-md text-sm"
        >
          Reset Filter
        </button>

        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Cari di sini"
          className="border px-4 py-2 rounded-md text-sm w-64  text-gray-800"
        />
      </div>

      <div className="overflow-x-auto bg-white shadow rounded-lg border">
        <table className="w-full text-sm text-gray-800">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left">No</th>
              <th className="px-4 py-3 text-left">Nama Mitra</th>
              <th className="px-4 py-3 text-left">Email</th>
              <th className="px-4 py-3 text-left">No. Telepon</th>
              <th className="px-4 py-3 text-left">Jenis Perubahan</th>
              <th className="px-4 py-3 text-left">Status</th>
              <th className="px-4 py-3 text-center">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((item, index) => (
              <tr key={item.id} className="hover:bg-gray-50">
                <td className="px-4 py-2">{index + 1}</td>
                <td className="px-4 py-2">{item.nama}</td>
                <td className="px-4 py-2">{item.email}</td>
                <td className="px-4 py-2">{item.telp}</td>
                <td className="px-4 py-2">{item.perubahan}</td>
                <td className="px-4 py-2">
                  <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                    item.status === 'Terverifikasi'
                      ? 'bg-green-100 text-green-700'
                      : 'bg-red-100 text-red-700'
                  }`}>
                    {item.status}
                  </span>
                </td>
                <td className="px-4 py-2 text-center">
                  <button className="text-blue-600 hover:underline text-sm">Detail</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="p-4 text-xs text-gray-500">
          Menampilkan data {filtered.length > 0 ? `1 hingga ${filtered.length}` : '0'} dari {dataDokumen.length}
        </div>
      </div>
    </div>
  )
}
