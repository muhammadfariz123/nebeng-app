'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { RiMotorbikeFill, RiCarFill, RiBox3Fill, RiBusFill, RiMapPin2Fill, RiNotification3Line } from 'react-icons/ri'
import Image from 'next/image'
import { Card, CardContent } from '@/components/ui/card'

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
  const router = useRouter()
  const [customer, setCustomer] = useState<Customer | null>(null)
  const [sliders, setSliders] = useState<Slider[]>([])
  const [destinations, setDestinations] = useState<Destination[]>([])

  useEffect(() => {
    setCustomer({
      full_name: 'Nadya Amalya',
      credit_amount: 0,
    })

    setSliders([
      { id: 1, slider_img: '/slider1.png', is_active: true },
    ])

    setDestinations([
      {
        id: 1,
        title: 'Jakarta',
        destination_img: '/destinations/jakarta.jpg',
      },
      {
        id: 2,
        title: 'Bandung',
        destination_img: '/destinations/bandung.jpg',
      },
    ])
  }, [])

  return (
    <div className="space-y-6">

      {/* Header Welcome */}
      <div className="relative h-48 bg-gradient-to-b from-blue-700 to-blue-500 rounded-b-3xl text-white px-6 pt-6">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-sm">Selamat Siang,</p>
            <h1 className="text-lg font-bold">{customer?.full_name ?? 'Customer'}</h1>
          </div>
          <RiNotification3Line className="w-6 h-6" />
        </div>

        {/* Poin Box */}
        <div className="absolute left-6 right-6 top-28">
          <div className="bg-white rounded-xl shadow p-4 flex items-center justify-between">
            <div className="text-gray-800 font-medium">Poin saya</div>
            <div className="text-red-500 font-bold text-xl">{customer?.credit_amount}</div>
          </div>
        </div>
      </div>

      <div className="px-6 pt-20 space-y-6 pb-20">

        {/* Kategori Layanan */}
        <div className="flex justify-between items-center text-center">
          {/* Motor */}
          <button
            onClick={() => router.push('/customer/motor')}
            className="flex flex-col items-center gap-1"
          >
            <div className="bg-green-100 p-3 rounded-full">
              <RiMotorbikeFill className="text-green-600 w-6 h-6" />
            </div>
            <p className="text-xs mt-1">Motor</p>
          </button>

          <div className="flex flex-col items-center gap-1">
            <div className="bg-blue-100 p-3 rounded-full">
              <RiCarFill className="text-blue-600 w-6 h-6" />
            </div>
            <p className="text-xs mt-1">Mobil</p>
          </div>

          <div className="flex flex-col items-center gap-1">
            <div className="bg-yellow-100 p-3 rounded-full">
              <RiBox3Fill className="text-yellow-600 w-6 h-6" />
            </div>
            <p className="text-xs mt-1">Barang</p>
          </div>

          <div className="flex flex-col items-center gap-1">
            <div className="bg-rose-100 p-3 rounded-full">
              <RiBusFill className="text-rose-600 w-6 h-6" />
            </div>
            <p className="text-xs text-center mt-1 leading-tight">
              Barang<br />(Transportasi Umum)
            </p>
          </div>
        </div>

        {/* Slider */}
        <div className="space-y-2">
          <Image
            src={sliders[0]?.slider_img || '/slider1.png'}
            alt="Promo"
            width={600}
            height={200}
            className="rounded-xl w-full object-cover"
          />
        </div>

        {/* Destinasi Populer */}
        <div className="space-y-2">
          <h2 className="text-base font-semibold">Tujuan Populer</h2>
          <p className="text-sm text-gray-500">Berikut adalah kota-kota yang populer!</p>
          <div className="grid grid-cols-2 gap-4 mt-2">
            {destinations.map(dest => (
              <Card key={dest.id} className="overflow-hidden rounded-xl shadow">
                <Image
                  src={dest.destination_img}
                  alt={dest.title}
                  width={400}
                  height={200}
                  className="w-full h-28 object-cover"
                />
                <CardContent className="p-3 flex items-center gap-2">
                  <RiMapPin2Fill className="w-5 h-5 text-primary" />
                  <p className="text-sm font-medium">{dest.title}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

      </div>
    </div>
  )
}
