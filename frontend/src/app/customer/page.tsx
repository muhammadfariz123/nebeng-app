'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { CreditCardIcon, MapPinIcon, ClockIcon } from 'lucide-react'

interface Slider {
  id: number
  slider_img: string
  is_active: boolean
}

interface Destination {
  id: number
  title: string
  destination_img: string
}

interface Customer {
  full_name: string
  credit_amount: number
}

export default function CustomerHomePage() {
  const [customer, setCustomer] = useState<Customer | null>(null)
  const [sliders, setSliders] = useState<Slider[]>([])
  const [destinations, setDestinations] = useState<Destination[]>([])

  useEffect(() => {
    // Simulasi API
    setCustomer({
      full_name: 'Putri Ayu',
      credit_amount: 150_000,
    })

    setSliders([
      { id: 1, slider_img: '/slider1.jpg', is_active: true },
      { id: 2, slider_img: '/slider2.jpg', is_active: true },
    ])

    setDestinations([
      {
        id: 1,
        title: 'Bandara Soekarno-Hatta',
        destination_img: '/destinations/soetta.jpg',
      },
      {
        id: 2,
        title: 'Terminal Pulogebang',
        destination_img: '/destinations/pulogebang.jpg',
      },
    ])
  }, [])

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">
        Selamat datang, {customer?.full_name ?? 'Customer'}!
      </h1>

      {/* Kartu Saldo */}
      <Card className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-md">
        <CardContent className="flex items-center justify-between p-5">
          <div>
            <h2 className="text-sm font-medium">Saldo Kredit</h2>
            <p className="text-2xl font-semibold">
              Rp {customer?.credit_amount.toLocaleString('id-ID')}
            </p>
          </div>
          <CreditCardIcon className="w-10 h-10" />
        </CardContent>
      </Card>

      {/* Slider */}
      <div className="space-y-2">
        <h2 className="text-lg font-semibold">Promo & Info</h2>
        <div className="flex gap-4 overflow-x-auto scrollbar-hide">
          {sliders.map(slider => (
            <Image
              key={slider.id}
              src={slider.slider_img}
              alt="Slider"
              width={300}
              height={150}
              className="rounded-lg object-cover"
            />
          ))}
        </div>
      </div>

      {/* Destinasi Populer */}
      <div className="space-y-2">
        <h2 className="text-lg font-semibold">Destinasi Populer</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {destinations.map(dest => (
            <Card key={dest.id} className="overflow-hidden shadow-sm">
              <Image
                src={dest.destination_img}
                alt={dest.title}
                width={400}
                height={200}
                className="w-full h-32 object-cover"
              />
              <CardContent className="p-3 flex items-center gap-2">
                <MapPinIcon className="w-5 h-5 text-primary" />
                <p className="text-sm font-medium">{dest.title}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Aktivitas Terakhir */}
      <div>
        <h2 className="text-lg font-semibold mb-2">Aktivitas Terakhir</h2>
        <div className="bg-white rounded-lg shadow-sm p-4 text-gray-600 flex items-center gap-2">
          <ClockIcon className="w-5 h-5 text-gray-400" />
          <p className="text-sm">Belum ada transaksi terbaru.</p>
        </div>
      </div>
    </div>
  )
}
