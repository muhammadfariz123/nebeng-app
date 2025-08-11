'use client'

import { useEffect, useState } from 'react'
import { ArrowLeft, User2 } from 'lucide-react'
import Link from 'next/link'

const dummyTrips = [
  {
    id: 1,
    motor: 'YAMAHA NMAX',
    dari: 'YOGYAKARTA POS 2',
    ke: 'SOLO POS 1',
    berangkat: '07.00',
    tiba: '08.30',
    durasi: '01j 30m',
    harga: 110000,
    penumpang: 1,
  },
  {
    id: 2,
    motor: 'HONDA BEAT',
    dari: 'YOGYAKARTA POS 2',
    ke: 'SOLO POS 1',
    berangkat: '08.00',
    tiba: '10.00',
    durasi: '01j 30m',
    harga: 80000,
    penumpang: 1,
  },
  {
    id: 3,
    motor: 'HONDA SCOOPY',
    dari: 'YOGYAKARTA POS 2',
    ke: 'SOLO POS 1',
    berangkat: '11.00',
    tiba: '12.30',
    durasi: '01j 30m',
    harga: 90000,
    penumpang: 1,
  },
]

export default function HasilPencarianMotorPage() {
  const [showTrips, setShowTrips] = useState(true)

  useEffect(() => {
    const handleScroll = () => {
      setShowTrips(window.scrollY < 100)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Sticky Header & Tabs */}
      <div className="sticky top-0 z-30 bg-white shadow-md border-b">
        <div className="flex items-center justify-between px-4 py-3 bg-white">
          <Link href="/customer/motor" className="text-gray-700">
            <ArrowLeft size={24} />
          </Link>
          <div className="text-center">
            <p className="text-xs text-gray-500">Sabtu, 14 September 2024</p>
            <h1 className="text-sm font-semibold text-gray-800">
              YOG POS 2 → SOLO POS 1
            </h1>
          </div>
          <div className="w-6" />
        </div>

        {/* Tab Tanggal */}
        <div className="flex overflow-x-auto border-t bg-white">
          {['Sab, 14', 'Min, 15', 'Sen, 16', 'Sel, 17', 'Rab, 18'].map((tgl, i) => (
            <button
              key={i}
              className={`flex-1 px-4 py-2 text-sm border-b-2 transition-colors ${
                i === 0
                  ? 'text-blue-600 border-blue-600 font-semibold'
                  : 'text-gray-500 border-transparent'
              }`}
            >
              {tgl}
            </button>
          ))}
        </div>
      </div>

      {/* Konten Scrollable */}
      <div className="flex-1 overflow-y-auto px-4 pt-4 pb-8 bg-white space-y-4">
        <h2 className="text-sm font-semibold text-gray-700">
          Pilih mau nebeng yang mana
        </h2>

        {showTrips &&
          dummyTrips.map((trip) => (
            <Link
              key={trip.id}
              href={{
                pathname: '/customer/motor/pesan',
                query: {
                  motor: trip.motor,
                  dari: trip.dari,
                  ke: trip.ke,
                  berangkat: trip.berangkat,
                  tiba: trip.tiba,
                  harga: trip.harga,
                  penumpang: trip.penumpang,
                },
              }}
              className="block border rounded-xl p-4 space-y-2 shadow-sm bg-white hover:bg-gray-50 transition"
            >
              <div className="flex justify-between items-center">
                <h3 className="text-sm font-bold text-blue-700">{trip.motor}</h3>
                <span className="text-xs text-gray-600">
                  Harga per orang <br />
                  <span className="text-sm font-bold text-black">
                    Rp {trip.harga.toLocaleString('id-ID')}
                  </span>
                </span>
              </div>

              <div className="flex items-start gap-3 text-sm text-gray-700">
                <div className="flex flex-col items-center">
                  <div className="w-3 h-3 bg-green-500 rounded-full" />
                  <div className="h-5 border-l border-gray-300" />
                  <div className="w-3 h-3 bg-blue-600 rounded-full" />
                </div>
                <div className="flex flex-col gap-1">
                  <div>
                    <span className="font-semibold">{trip.berangkat}</span> – {trip.dari}
                  </div>
                  <div className="text-xs text-gray-400">{trip.durasi}</div>
                  <div>
                    <span className="font-semibold">{trip.tiba}</span> – {trip.ke}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-1 text-sm text-gray-600">
                <User2 className="w-4 h-4" />
                <span>{trip.penumpang} Orang</span>
              </div>
            </Link>
          ))}
      </div>
    </div>
  )
}
