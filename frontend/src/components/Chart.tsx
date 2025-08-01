'use client'

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts'

const data = [
  { bulan: 'Jan', Mobil: 30, Motor: 50, Barang: 40 },
  { bulan: 'Feb', Mobil: 25, Motor: 80, Barang: 70 },
  { bulan: 'Mar', Mobil: 30, Motor: 40, Barang: 50 },
  { bulan: 'Apr', Mobil: 40, Motor: 80, Barang: 30 },
  { bulan: 'Mei', Mobil: 100, Motor: 25, Barang: 70 },
  { bulan: 'Jun', Mobil: 40, Motor: 50, Barang: 30 },
  { bulan: 'Jul', Mobil: 80, Motor: 20, Barang: 60 },
  { bulan: 'Agu', Mobil: 30, Motor: 25, Barang: 20 }
]

export function ChartBar() {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-base font-semibold text-gray-900">Layanan</h3>
        <select className="text-sm text-gray-800 bg-white border border-gray-300 rounded-md px-3 py-1 focus:outline-none">
          <option>2024</option>
        </select>
      </div>

      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="bulan" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="Mobil" fill="#3b82f6" />
          <Bar dataKey="Motor" fill="#10b981" />
          <Bar dataKey="Barang" fill="#f59e0b" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
