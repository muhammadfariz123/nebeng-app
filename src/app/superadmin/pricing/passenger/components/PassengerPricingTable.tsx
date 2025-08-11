'use client'

import { useEffect, useState } from 'react'
import { Pencil, Trash2 } from 'lucide-react'

interface PassengerPricing {
  id: number
  vehicle_type: string
  departure_terminal_id: number
  arrival_terminal_id: number
  price_per_seat: number
  commission_percentage: number
}

export function PassengerPricingTable() {
  const [data, setData] = useState<PassengerPricing[]>([])

  useEffect(() => {
    // Simulasi fetch data
    setData([
      {
        id: 1,
        vehicle_type: 'Mobil',
        departure_terminal_id: 2,
        arrival_terminal_id: 4,
        price_per_seat: 50000,
        commission_percentage: 10
      }
    ])
  }, [])

  return (
    <div className="border rounded-md p-4">
      <h2 className="font-semibold mb-4">Daftar Tarif Penumpang</h2>
      <table className="w-full text-sm text-left">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2">#</th>
            <th className="p-2">Jenis Kendaraan</th>
            <th className="p-2">Terminal Asal</th>
            <th className="p-2">Terminal Tujuan</th>
            <th className="p-2">Harga/Kursi</th>
            <th className="p-2">Komisi (%)</th>
            <th className="p-2">Aksi</th>
          </tr>
        </thead>
        <tbody>
          {data.map((tarif, i) => (
            <tr key={tarif.id} className="border-t">
              <td className="p-2">{i + 1}</td>
              <td className="p-2">{tarif.vehicle_type}</td>
              <td className="p-2">{tarif.departure_terminal_id}</td>
              <td className="p-2">{tarif.arrival_terminal_id}</td>
              <td className="p-2">Rp {tarif.price_per_seat.toLocaleString()}</td>
              <td className="p-2">{tarif.commission_percentage}%</td>
              <td className="p-2 flex gap-2">
                <Pencil className="w-4 h-4 cursor-pointer text-blue-500" />
                <Trash2 className="w-4 h-4 cursor-pointer text-red-500" />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
