'use client'

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'

interface BookingTableProps {
  bookings: Array<{
    id: string
    type: 'Penumpang' | 'Barang'
    route: string
    date: string
    total: number
    status: string
  }>
}

export default function BookingTable({ bookings }: BookingTableProps) {
  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Jenis</TableHead>
            <TableHead>Rute</TableHead>
            <TableHead>Tanggal</TableHead>
            <TableHead>Total</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {bookings.map((booking) => (
            <TableRow key={booking.id}>
              <TableCell>{booking.id}</TableCell>
              <TableCell>{booking.type}</TableCell>
              <TableCell>{booking.route}</TableCell>
              <TableCell>{booking.date}</TableCell>
              <TableCell>Rp {booking.total.toLocaleString('id-ID')}</TableCell>
              <TableCell>
                <Badge variant={booking.status === 'Diterima' ? 'default' : 'outline'}>
                  {booking.status}
                </Badge>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}