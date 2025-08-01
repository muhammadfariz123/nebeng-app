'use client'

import { useEffect, useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ClockIcon, PackageCheck, UserIcon } from 'lucide-react'

interface Booking {
  id: number
  type: 'passenger' | 'goods'
  from: string
  to: string
  departureTime: string
  seatsOrWeight: number
  totalPrice: number
  status: string
}

export default function BookingsPage() {
  const [bookings, setBookings] = useState<Booking[]>([])

  useEffect(() => {
    // Dummy data for now
    setBookings([
      {
        id: 1,
        type: 'passenger',
        from: 'Terminal Depok',
        to: 'Stasiun Jogja',
        departureTime: '2025-08-10T08:00:00Z',
        seatsOrWeight: 2,
        totalPrice: 150000,
        status: 'Diterima',
      },
      {
        id: 2,
        type: 'goods',
        from: 'Bandara Soetta',
        to: 'Pelabuhan Makassar',
        departureTime: '2025-08-12T14:30:00Z',
        seatsOrWeight: 15,
        totalPrice: 330000,
        status: 'Pending',
      },
    ])
  }, [])

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Riwayat Pemesanan</h1>
      <Tabs defaultValue="passenger" className="w-full">
        <TabsList>
          <TabsTrigger value="passenger">Penumpang</TabsTrigger>
          <TabsTrigger value="goods">Barang</TabsTrigger>
        </TabsList>
        <TabsContent value="passenger">
          <div className="grid gap-4">
            {bookings
              .filter((b) => b.type === 'passenger')
              .map((booking) => (
                <Card key={booking.id} className="shadow-sm">
                  <CardContent className="p-4 space-y-2">
                    <div className="flex justify-between items-center">
                      <div className="text-sm font-medium text-gray-700">
                        <UserIcon className="inline w-4 h-4 mr-1" />
                        {booking.from} → {booking.to}
                      </div>
                      <div className="text-sm font-semibold text-primary">
                        Rp {booking.totalPrice.toLocaleString('id-ID')}
                      </div>
                    </div>
                    <div className="flex justify-between text-xs text-gray-500">
                      <span>
                        <ClockIcon className="inline w-4 h-4 mr-1" />
                        {new Date(booking.departureTime).toLocaleString()}
                      </span>
                      <span>{booking.seatsOrWeight} kursi</span>
                      <span className="text-xs bg-green-100 text-green-600 px-2 py-0.5 rounded">
                        {booking.status}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </div>
        </TabsContent>

        <TabsContent value="goods">
          <div className="grid gap-4">
            {bookings
              .filter((b) => b.type === 'goods')
              .map((booking) => (
                <Card key={booking.id} className="shadow-sm">
                  <CardContent className="p-4 space-y-2">
                    <div className="flex justify-between items-center">
                      <div className="text-sm font-medium text-gray-700">
                        <PackageCheck className="inline w-4 h-4 mr-1" />
                        {booking.from} → {booking.to}
                      </div>
                      <div className="text-sm font-semibold text-primary">
                        Rp {booking.totalPrice.toLocaleString('id-ID')}
                      </div>
                    </div>
                    <div className="flex justify-between text-xs text-gray-500">
                      <span>
                        <ClockIcon className="inline w-4 h-4 mr-1" />
                        {new Date(booking.departureTime).toLocaleString()}
                      </span>
                      <span>{booking.seatsOrWeight} kg</span>
                      <span className="text-xs bg-yellow-100 text-yellow-600 px-2 py-0.5 rounded">
                        {booking.status}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
