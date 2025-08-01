'use client'

import { useState, useEffect } from 'react'
import RideCard from '@/components/RideCard'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Calendar } from '@/components/ui/calendar'
import { format } from 'date-fns'

interface DummyRide {
  id: number
  driver: string
  departure_terminal: string
  arrival_terminal: string
  departure_time: string
  seats_available: number
  price_per_seat: number
  vehicle_type: 'Motor' | 'Mobil'
}

export default function BookRidePage() {
  const [rides, setRides] = useState<DummyRide[]>([])
  const [departure, setDeparture] = useState('')
  const [arrival, setArrival] = useState('')
  const [date, setDate] = useState<Date | undefined>(undefined)

  useEffect(() => {
    // Dummy data
    setRides([
      {
        id: 1,
        driver: 'Ahmad Syahroni',
        departure_terminal: 'Terminal Bekasi',
        arrival_terminal: 'Stasiun Bandung',
        departure_time: '2025-08-05T08:30:00Z',
        seats_available: 4,
        price_per_seat: 35000,
        vehicle_type: 'Mobil'
      },
      {
        id: 2,
        driver: 'Budi Santoso',
        departure_terminal: 'Stasiun Jakarta Kota',
        arrival_terminal: 'Terminal Cirebon',
        departure_time: '2025-08-05T10:00:00Z',
        seats_available: 2,
        price_per_seat: 28000,
        vehicle_type: 'Motor'
      }
    ])
  }, [])

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Cari Jadwal Perjalanan Penumpang</h1>

      <div className="grid md:grid-cols-3 gap-4 items-end">
        <div>
          <Label htmlFor="departure">Terminal Keberangkatan</Label>
          <Input
            id="departure"
            value={departure}
            onChange={(e) => setDeparture(e.target.value)}
            placeholder="Contoh: Terminal Bekasi"
          />
        </div>

        <div>
          <Label htmlFor="arrival">Terminal Tujuan</Label>
          <Input
            id="arrival"
            value={arrival}
            onChange={(e) => setArrival(e.target.value)}
            placeholder="Contoh: Terminal Bandung"
          />
        </div>

        <div>
          <Label htmlFor="date">Tanggal Keberangkatan</Label>
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            className="rounded-md border"
          />
        </div>
      </div>

      <div>
        <h2 className="text-lg font-semibold mt-6 mb-2">Daftar Perjalanan Tersedia</h2>
        <div className="grid gap-4">
          {rides.map((ride) => (
            <RideCard key={ride.id} ride={ride} />
          ))}
        </div>
      </div>
    </div>
  )
}
