'use client'

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'

const goodsBookings = [
  { id: 1, name: 'Budi Santoso', weight: 10, total: 200000, status: 'Diterima', date: '2025-07-30' },
  { id: 2, name: 'Rina Marlina', weight: 5, total: 100000, status: 'Pending', date: '2025-07-30' },
]

export default function GoodsBookingTable() {
  return (
    <div className="mb-6">
      <h2 className="text-lg font-semibold mb-2">Pemesanan Barang Terbaru</h2>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nama</TableHead>
            <TableHead>Berat (kg)</TableHead>
            <TableHead>Total</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Tanggal</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {goodsBookings.map((item) => (
            <TableRow key={item.id}>
              <TableCell>{item.name}</TableCell>
              <TableCell>{item.weight}</TableCell>
              <TableCell>Rp {item.total.toLocaleString()}</TableCell>
              <TableCell>{item.status}</TableCell>
              <TableCell>{item.date}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
