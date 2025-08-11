'use client';

import { useState } from 'react'
import { ChevronDown, Filter, Search } from 'lucide-react'

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

  const resetFilters = () => {
    setSearch('')
    setSelectedTanggal('')
    setSelectedMitra(null)
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-semibold text-gray-900 mb-6">Data Pendaftar Mitra</h1>
          
          {/* Filters */}
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <div className="relative">
              <select
                value={selectedTanggal}
                onChange={(e) => setSelectedTanggal(e.target.value)}
                className="appearance-none bg-white border border-gray-300 rounded-md px-4 py-2 pr-8 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Tanggal</option>
                {uniqueDates.map((tgl) => (
                  <option key={tgl} value={tgl}>{tgl}</option>
                ))}
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
                    Tanggal Mendaftar
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Nama Pendaftar
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Email
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    No Telepon
                  </th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Aksi
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredData.map((mitra) => (
                  <tr key={mitra.no} className="hover:bg-gray-50 transition-colors duration-150">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {mitra.no}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {mitra.tanggal}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {mitra.nama}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {mitra.email}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {mitra.telepon}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      <button
                        onClick={() => setSelectedMitra(mitra)}
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
          
          {filteredData.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 text-sm">Tidak ada data mitra ditemukan.</p>
            </div>
          )}
        </div>

        {/* Footer info */}
        <div className="mt-4 flex items-center justify-between text-sm text-gray-500">
          <div>
            Menampilkan data 1 hingga {filteredData.length} dari {mitraList.length}
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
                <h3 className="text-lg font-semibold text-gray-900">Detail Pendaftar Mitra</h3>
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
                  <span className="text-gray-600">Telepon:</span>
                  <span className="font-medium text-gray-900">{selectedMitra.telepon}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Tanggal Mendaftar:</span>
                  <span className="font-medium text-gray-900">{selectedMitra.tanggal}</span>
                </div>
              </div>
              
              <div className="mt-6 flex justify-end">
                <button
                  onClick={() => setSelectedMitra(null)}
                  className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800 hover:underline"
                >
                  Tutup Detail
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}