'use client'

import { useEffect, useState } from 'react'
import { Badge } from '@/components/ui/badge'

// Dummy data, bisa diganti dengan fetch dari API
const dummyTransactions = [
  {
    id: 1,
    type: 'Penumpang',
    customer: 'Budi Santoso',
    total: 50000,
    status: 'Diterima',
    tanggal: '2025-07-31',
  },
  {
    id: 2,
    type: 'Barang',
    customer: 'Siti Aminah',
    total: 75000,
    status: 'Pending',
    tanggal: '2025-07-30',
  },
]

export default function TransactionTable() {
  const [data, setData] = useState(dummyTransactions)

  useEffect(() => {
    // TODO: fetch transaksi dari backend di sini nanti
  }, [])

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Diterima': return 'bg-green-500'
      case 'Pending': return 'bg-yellow-500'
      case 'Ditolak': return 'bg-red-500'
      case 'Credited': return 'bg-blue-500'
      default: return 'bg-gray-300'
    }
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full table-auto border">
        <thead>
          <tr className="bg-gray-100 text-left">
            <th className="p-2">ID</th>
            <th className="p-2">Jenis</th>
            <th className="p-2">Customer</th>
            <th className="p-2">Total</th>
            <th className="p-2">Status</th>
            <th className="p-2">Tanggal</th>
          </tr>
        </thead>
        <tbody>
          {data.map((trx) => (
            <tr key={trx.id} className="border-t">
              <td className="p-2">{trx.id}</td>
              <td className="p-2">{trx.type}</td>
              <td className="p-2">{trx.customer}</td>
              <td className="p-2">Rp {trx.total.toLocaleString()}</td>
              <td className="p-2">
                <Badge className={getStatusColor(trx.status)}>{trx.status}</Badge>
              </td>
              <td className="p-2">{trx.tanggal}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
