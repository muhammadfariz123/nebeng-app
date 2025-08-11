import React from 'react'

interface RideCardProps {
  ride: {
    id: number
    driver: string
    departure_terminal: string
    arrival_terminal: string
    departure_time: string
    seats_available: number
    price_per_seat: number
    vehicle_type: 'Motor' | 'Mobil'
  }
}

export default function RideCard({ ride }: RideCardProps) {
  return (
    <div className="border rounded-lg p-4 shadow-sm bg-white space-y-2">
      <h3 className="text-lg font-semibold">{ride.driver}</h3>
      <p>
        <strong>Dari:</strong> {ride.departure_terminal}
      </p>
      <p>
        <strong>Tujuan:</strong> {ride.arrival_terminal}
      </p>
      <p>
        <strong>Berangkat:</strong>{' '}
        {new Date(ride.departure_time).toLocaleString('id-ID', {
          dateStyle: 'long',
          timeStyle: 'short'
        })}
      </p>
      <p>
        <strong>Jenis Kendaraan:</strong> {ride.vehicle_type}
      </p>
      <p>
        <strong>Sisa Kursi:</strong> {ride.seats_available}
      </p>
      <p>
        <strong>Harga per Kursi:</strong> Rp{ride.price_per_seat.toLocaleString('id-ID')}
      </p>
      <button className="mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
        Pesan Sekarang
      </button>
    </div>
  )
}
