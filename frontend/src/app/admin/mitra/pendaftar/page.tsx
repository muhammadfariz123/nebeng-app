'use client'

import { useState } from 'react'

type Mitra = {
  no: number
  tanggal: string
  nama: string
  email: string
  telepon: string
}

const mitraList: Mitra[] = [
  { no: 1, tanggal: '14 Okt 2024', nama: 'Roger Franci', email: 'RogerFranci@gmail.com', telepon: '+6272349482665' },
  { no: 2, tanggal: '14 Okt 2024', nama: 'Jaxson Stanton', email: 'JaxsonStanton@gmail.com', telepon: '+6210193936259' },
  { no: 3, tanggal: '14 Okt 2024', nama: 'Chance Mango', email: 'ChanceMango@gmail.com', telepon: '+6287841498623' },
  { no: 4, tanggal: '14 Okt 2024', nama: 'Jakob Levin', email: 'JakobLevin@gmail.com', telepon: '+6256934513128' },
  { no: 5, tanggal: '13 Okt 2024', nama: 'Jakob Saris', email: 'JakobSaris@gmail.com', telepon: '+6235385451407' },
  { no: 6, tanggal: '13 Okt 2024', nama: 'Jaxson Press', email: 'JaxsonPress@gmail.com', telepon: '+6242835854595' },
  { no: 7, tanggal: '13 Okt 2024', nama: 'Abram Baptista', email: 'AbramBaptista@gmail.com', telepon: '+6269223900367' },
  { no: 8, tanggal: '13 Okt 2024', nama: 'Corey Rosser', email: 'CoreyRosser@gmail.com', telepon: '+6242468559958' },
  { no: 9, tanggal: '13 Okt 2024', nama: 'Lincoln Schleifer', email: 'LincolnSchleifer@gmail.com', telepon: '+6224162482463' }
]

export default function MitraPendaftarPage() {
  const [search, setSearch] = useState('')
  const [selectedTanggal, setSelectedTanggal] = useState('')
  const [selectedMitra, setSelectedMitra] = useState<Mitra | null>(null)

  const filteredData = mitraList.filter((m) =>
    m.nama.toLowerCase().includes(search.toLowerCase()) &&
    (selectedTanggal ? m.tanggal === selectedTanggal : true)
  )

  const uniqueDates = [...new Set(mitraList.map((m) => m.tanggal))]

  return (
    <div className="p-6">
      <div className="text-2xl font-semibold text-gray-800 mb-6">Data Pendaftar Mitra</div>

      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-4">
        <div className="flex items-center gap-2">
          <select
            className="text-sm px-4 py-2 border border-gray-300 rounded-md"
            value={selectedTanggal}
            onChange={(e) => setSelectedTanggal(e.target.value)}
          >
            <option value="">Tanggal</option>
            {uniqueDates.map((tgl) => (
              <option key={tgl} value={tgl}>{tgl}</option>
            ))}
          </select>
          <button
            onClick={() => {
              setSearch('')
              setSelectedTanggal('')
              setSelectedMitra(null)
            }}
            className="text-sm text-rose-600 border border-rose-300 bg-white px-3 py-2 rounded-md hover:bg-rose-50"
          >
            Reset Filter
          </button>
        </div>
        <input
          type="text"
          placeholder="Cari di sini"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="px-4 py-2 w-full md:w-72 border border-gray-300 rounded-md text-sm"
        />
      </div>

      <div className="overflow-x-auto rounded-lg bg-white shadow border border-gray-200">
        <table className="w-full text-sm text-gray-700">
          <thead className="bg-gray-50 text-xs text-gray-500 uppercase">
            <tr>
              <th className="px-4 py-3 text-left">No</th>
              <th className="px-4 py-3 text-left">Tanggal Mendaftar</th>
              <th className="px-4 py-3 text-left">Nama Pendaftar</th>
              <th className="px-4 py-3 text-left">Email</th>
              <th className="px-4 py-3 text-left">No Telepon</th>
              <th className="px-4 py-3 text-right">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((mitra) => (
              <tr key={mitra.no} className="border-t hover:bg-gray-50 transition duration-200">
                <td className="px-4 py-3">{mitra.no}</td>
                <td className="px-4 py-3">{mitra.tanggal}</td>
                <td className="px-4 py-3">{mitra.nama}</td>
                <td className="px-4 py-3">{mitra.email}</td>
                <td className="px-4 py-3">{mitra.telepon}</td>
                <td className="px-4 py-3 text-right">
                  <button
                    onClick={() => setSelectedMitra(mitra)}
                    className="text-blue-600 hover:underline text-sm"
                  >
                    Detail &rsaquo;
                  </button>
                </td>
              </tr>
            ))}
            {filteredData.length === 0 && (
              <tr>
                <td colSpan={6} className="px-4 py-6 text-center text-gray-400">
                  Tidak ada data mitra ditemukan.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="text-sm text-gray-500 mt-4">
        Menampilkan data 1 hingga {filteredData.length} dari {mitraList.length}
      </div>

      {selectedMitra && (
        <div className="mt-6 bg-white shadow rounded-lg p-6 border border-gray-200">
          <div className="text-lg font-semibold text-gray-800 mb-4">Detail Pendaftar Mitra</div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-700">
            <div><strong>Nama:</strong> {selectedMitra.nama}</div>
            <div><strong>Email:</strong> {selectedMitra.email}</div>
            <div><strong>Telepon:</strong> {selectedMitra.telepon}</div>
            <div><strong>Tanggal Mendaftar:</strong> {selectedMitra.tanggal}</div>
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
