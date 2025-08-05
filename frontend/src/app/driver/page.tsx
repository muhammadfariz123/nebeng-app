'use client'

import { Card, CardContent, CardTitle } from "@/components/ui/card"

export default function DriverDashboard() {
  return (
    <div className="grid gap-6 p-6">
      <h1 className="text-2xl font-bold">Selamat Datang, Driver!</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <CardTitle className="text-sm">Saldo</CardTitle>
            <div className="text-xl font-semibold text-green-600 mt-2">Rp 1.250.000</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <CardTitle className="text-sm">Perjalanan Aktif</CardTitle>
            <div className="text-xl font-semibold mt-2">2 Penumpang, 1 Barang</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <CardTitle className="text-sm">Total Booking</CardTitle>
            <div className="text-xl font-semibold mt-2">24</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <CardTitle className="text-sm">Skor Kredit</CardTitle>
            <div className="text-xl font-semibold text-blue-600 mt-2">85</div>
          </CardContent>
        </Card>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <Card>
          <CardContent className="p-4">
            <CardTitle className="text-base">Kendaraan Terdaftar</CardTitle>
            <ul className="mt-2 text-sm space-y-2">
              <li>Mobil - Toyota Avanza 2020</li>
              <li>Warna: Silver</li>
              <li>Status: <span className="text-green-600 font-medium">Terverifikasi</span></li>
            </ul>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <CardTitle className="text-base">Dokumen Verifikasi</CardTitle>
            <ul className="mt-2 text-sm space-y-1">
              <li>KTP: ✔️</li>
              <li>SIM: ✔️</li>
              <li>SKCK: ❌ <span className="text-red-600">Belum diverifikasi</span></li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
