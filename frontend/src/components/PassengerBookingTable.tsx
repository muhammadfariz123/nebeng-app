'use client'

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'

const passengerBookings = [
  { id: 1, name: 'Andi Wijaya', seats: 2, total: 100000, status: 'Diterima', date: '2025-07-30' },
  { id: 2, name: 'Siti Nurhaliza', seats: 1, total: 50000, status: 'Pending', date: '2025-07-30' },
]

export default function PassengerBookingTable() {
  return (
    <div className="mb-6">
      <h2 className="text-lg font-semibold mb-2">Pemesanan Penumpang Terbaru</h2>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nama</TableHead>
            <TableHead>Kursi</TableHead>
            <TableHead>Total</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Tanggal</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {passengerBookings.map((item) => (
            <TableRow key={item.id}>
              <TableCell>{item.name}</TableCell>
              <TableCell>{item.seats}</TableCell>
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
