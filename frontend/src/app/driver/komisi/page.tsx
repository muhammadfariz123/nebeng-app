"use client"

import { useState } from "react"

export default function Komisi() {
  const [totalCommission, setTotalCommission] = useState(1500000)
  const [pendingCommission, setPendingCommission] = useState(500000)
  const [paidCommission, setPaidCommission] = useState(1000000)

  return (
    <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-lg">
      <h2 className="text-3xl font-semibold text-center text-gray-800 mb-8">Komisi Saya</h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {/* Total Komisi */}
        <div className="bg-blue-50 p-6 rounded-lg shadow-md text-center">
          <h3 className="text-lg font-semibold text-blue-600">Total Komisi</h3>
          <p className="text-2xl font-bold text-gray-800 mt-2">Rp {totalCommission.toLocaleString()}</p>
        </div>

        {/* Komisi Tertunda */}
        <div className="bg-yellow-50 p-6 rounded-lg shadow-md text-center">
          <h3 className="text-lg font-semibold text-yellow-600">Komisi Tertunda</h3>
          <p className="text-2xl font-bold text-gray-800 mt-2">Rp {pendingCommission.toLocaleString()}</p>
        </div>

        {/* Komisi Terbayar */}
        <div className="bg-green-50 p-6 rounded-lg shadow-md text-center">
          <h3 className="text-lg font-semibold text-green-600">Komisi Terbayar</h3>
          <p className="text-2xl font-bold text-gray-800 mt-2">Rp {paidCommission.toLocaleString()}</p>
        </div>
      </div>

      {/* Riwayat Komisi */}
      <div className="mt-8">
        <h3 className="text-2xl font-semibold text-gray-800 mb-4">Riwayat Komisi</h3>
        <div className="overflow-x-auto">
          <table className="w-full table-auto border-collapse border border-gray-300">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Tanggal</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Deskripsi</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Jumlah Komisi</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Status</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="px-6 py-4 text-sm text-gray-700">01-09-2025</td>
                <td className="px-6 py-4 text-sm text-gray-700">Penarikan komisi pertama</td>
                <td className="px-6 py-4 text-sm text-gray-700">Rp 500.000</td>
                <td className="px-6 py-4 text-sm text-gray-700">Terbayar</td>
              </tr>
              <tr>
                <td className="px-6 py-4 text-sm text-gray-700">15-09-2025</td>
                <td className="px-6 py-4 text-sm text-gray-700">Komisi perjalanan</td>
                <td className="px-6 py-4 text-sm text-gray-700">Rp 1.000.000</td>
                <td className="px-6 py-4 text-sm text-gray-700">Tertunda</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
