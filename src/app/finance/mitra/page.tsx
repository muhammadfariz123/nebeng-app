"use client"

import { useState } from "react"
import { Filter, Search, Users, BarChart3, ChevronDown, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const mitraData = [
  {
    id: 1,
    nama: "Christine Brooks",
    hargaPerjalanan: 120000,
    pendapatanMitra: 18000,
    statusPembayaran: "Belum Dibayar",
    totalPerjalanan: 12,
    kodeBooking: "NB001",
  },
  {
    id: 2,
    nama: "Rosie Pearson",
    hargaPerjalanan: 90000,
    pendapatanMitra: 13500,
    statusPembayaran: "Dibayar",
    totalPerjalanan: 8,
    kodeBooking: "NB002",
  },
  {
    id: 3,
    nama: "Darrell Caldwell",
    hargaPerjalanan: 80000,
    pendapatanMitra: 12000,
    statusPembayaran: "Dibayar",
    totalPerjalanan: 15,
    kodeBooking: "NB003",
  },
  {
    id: 4,
    nama: "Gilbert Johnston",
    hargaPerjalanan: 65000,
    pendapatanMitra: 9750,
    statusPembayaran: "Dibayar",
    totalPerjalanan: 6,
    kodeBooking: "NB004",
  },
  {
    id: 5,
    nama: "Alan Cain",
    hargaPerjalanan: 75000,
    pendapatanMitra: 11250,
    statusPembayaran: "Belum Dibayar",
    totalPerjalanan: 9,
    kodeBooking: "NB005",
  },
  {
    id: 6,
    nama: "Alfred Murray",
    hargaPerjalanan: 88000,
    pendapatanMitra: 13200,
    statusPembayaran: "Dibayar",
    totalPerjalanan: 11,
    kodeBooking: "NB006",
  },
  {
    id: 7,
    nama: "Maggie Sullivan",
    hargaPerjalanan: 70000,
    pendapatanMitra: 10500,
    statusPembayaran: "Dibayar",
    totalPerjalanan: 7,
    kodeBooking: "NB007",
  },
  {
    id: 8,
    nama: "Rosie Todd",
    hargaPerjalanan: 110000,
    pendapatanMitra: 16500,
    statusPembayaran: "Belum Dibayar",
    totalPerjalanan: 13,
    kodeBooking: "NB008",
  },
  {
    id: 9,
    nama: "Dollie Hines",
    hargaPerjalanan: 60000,
    pendapatanMitra: 9000,
    statusPembayaran: "Dibayar",
    totalPerjalanan: 5,
    kodeBooking: "NB009",
  },
]

export default function MitraPage() {
  const [filter, setFilter] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")

  const filteredData = mitraData.filter((item) => {
    const matchesSearch =
      item.nama.toLowerCase().includes(filter.toLowerCase()) ||
      item.kodeBooking.toLowerCase().includes(filter.toLowerCase())
    const matchesStatus = statusFilter === "all" || item.statusPembayaran === statusFilter
    return matchesSearch && matchesStatus
  })

  const totalMitra = mitraData.length
  const totalPerjalanan = mitraData.reduce((sum, item) => sum + item.totalPerjalanan, 0)
  const belumDibayar = mitraData.filter((item) => item.statusPembayaran === "Belum Dibayar").length

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(amount)
  }

  const resetFilter = () => {
    setFilter("")
    setStatusFilter("all")
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex">
        {/* Main Content */}
        <div className="flex-1 p-6">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Mitra</h2>
          </div>

          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-blue-100 rounded-lg">
                    <Users className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Mitra Terdaftar</p>
                    <p className="text-2xl font-bold text-gray-900">{totalMitra}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-orange-100 rounded-lg">
                    <BarChart3 className="w-6 h-6 text-orange-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Total Semua Perjalanan</p>
                    <p className="text-2xl font-bold text-gray-900">{totalPerjalanan}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-red-100 rounded-lg">
                    <span className="text-red-600 font-bold text-lg">Rp</span>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Belum Dibayar</p>
                    <p className="text-2xl font-bold text-gray-900">{belumDibayar}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            {/* Controls */}
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <Filter className="w-4 h-4 text-gray-400" />
                    <Select value={statusFilter} onValueChange={setStatusFilter}>
                      <SelectTrigger className="w-48">
                        <SelectValue placeholder="Status Pembayaran" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Semua Status</SelectItem>
                        <SelectItem value="Dibayar">Dibayar</SelectItem>
                        <SelectItem value="Belum Dibayar">Belum Dibayar</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <Button variant="ghost" className="text-red-500 hover:text-red-600" onClick={resetFilter}>
                    Reset Filter
                  </Button>
                  <div className="relative">
                    <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                    <Input
                      placeholder="Cari disini"
                      className="pl-10 w-64"
                      value={filter}
                      onChange={(e) => setFilter(e.target.value)}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      No
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Nama Mitra
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Kode Booking
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Harga Perjalanan (100%)
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Pendapatan Mitra (15%)
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status Pembayaran
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Aksi
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredData.map((item, index) => (
                    <tr key={item.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{index + 1}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.nama}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-600 font-medium">
                        {item.kodeBooking}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {formatCurrency(item.hargaPerjalanan)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {formatCurrency(item.pendapatanMitra)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <Badge
                          variant={item.statusPembayaran === "Dibayar" ? "default" : "destructive"}
                          className={
                            item.statusPembayaran === "Dibayar"
                              ? "bg-green-100 text-green-800 hover:bg-green-100"
                              : "bg-red-100 text-red-800 hover:bg-red-100"
                          }
                        >
                          {item.statusPembayaran}
                        </Badge>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-600">
                        <button className="flex items-center space-x-1 hover:text-blue-800">
                          <span>Detail</span>
                          <ChevronRight className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="px-6 py-3 border-t border-gray-200 bg-gray-50">
              <div className="flex items-center justify-between">
                <div className="text-sm text-gray-500">
                  Menampilkan data 1 hingga {filteredData.length} dari {mitraData.length}
                </div>
                <div className="flex space-x-1">
                  <button className="px-3 py-1 text-sm text-gray-500 hover:bg-gray-100 rounded">{"<"}</button>
                  <button className="px-3 py-1 text-sm text-gray-500 hover:bg-gray-100 rounded">{">"}</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
