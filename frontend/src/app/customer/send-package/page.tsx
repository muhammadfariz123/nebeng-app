'use client'

import { useState, useEffect } from 'react'
import PackageCard from '@/components/PackageCard'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Calendar } from '@/components/ui/calendar'

interface DummyPackage {
  id: number
  from: string
  to: string
  departureTime: string
  maxWeight: number
  pricePerKg: number
}

export default function SendPackagePage() {
  const [packages, setPackages] = useState<DummyPackage[]>([])
  const [from, setFrom] = useState('')
  const [to, setTo] = useState('')
  const [date, setDate] = useState<Date | undefined>(undefined)

  useEffect(() => {
    setPackages([
      {
        id: 1,
        from: 'Terminal Depok',
        to: 'Stasiun Jogja',
        departureTime: '2025-08-07T07:00:00Z',
        maxWeight: 100,
        pricePerKg: 15000,
      },
      {
        id: 2,
        from: 'Bandara Soekarno Hatta',
        to: 'Pelabuhan Makassar',
        departureTime: '2025-08-07T15:00:00Z',
        maxWeight: 200,
        pricePerKg: 22000,
      },
    ])
  }, [])

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Kirim Barang</h1>

      <div className="grid md:grid-cols-3 gap-4 items-end">
        <div>
          <Label htmlFor="from">Terminal Keberangkatan</Label>
          <Input
            id="from"
            value={from}
            onChange={(e) => setFrom(e.target.value)}
            placeholder="Contoh: Terminal Depok"
          />
        </div>

        <div>
          <Label htmlFor="to">Terminal Tujuan</Label>
          <Input
            id="to"
            value={to}
            onChange={(e) => setTo(e.target.value)}
            placeholder="Contoh: Stasiun Jogja"
          />
        </div>

        <div>
          <Label htmlFor="date">Tanggal Pengiriman</Label>
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            className="rounded-md border"
          />
        </div>
      </div>

      <div>
        <h2 className="text-lg font-semibold mt-6 mb-2">Jadwal Pengiriman Tersedia</h2>
        <div className="grid gap-4">
          {packages.map((pkg) => (
            <PackageCard
              key={pkg.id}
              from={pkg.from}
              to={pkg.to}
              departureTime={pkg.departureTime}
              maxWeight={pkg.maxWeight}
              pricePerKg={pkg.pricePerKg}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
