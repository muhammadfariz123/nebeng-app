'use client'

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

const chartData = [
  { name: 'Penumpang', jumlah: 120 },
  { name: 'Barang', jumlah: 75 },
]

export default function BookingChart() {
  return (
    <div className="mb-6">
      <h2 className="text-lg font-semibold mb-2">Grafik Jumlah Pemesanan</h2>
      <div className="w-full h-64 bg-white rounded shadow">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="jumlah" fill="#2563eb" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
