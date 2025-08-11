"use client"

import { useState } from "react"
import { format } from "date-fns"
import { id } from "date-fns/locale" // Import locale for Indonesian date formatting
import {
  Wallet,
  TrendingUp,
  LineChart,
  Filter,
  CalendarIcon,
  Search,
  Download,
  ChevronDown,
  ChevronRight,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { cn } from "@/lib/utils"

const pendapatanData = [
  {
    id: "00001",
    tanggal: "14 Okt 2024",
    namaCustomer: "Dulce Mango",
    layanan: "Nebeng Mobil",
    pembayaran: "Mandiri",
    total: "Rp 90.000",
    status: "Belum Selesai",
  },
  {
    id: "00002",
    tanggal: "14 Okt 2024",
    namaCustomer: "Chance Donin",
    layanan: "Nebeng Motor",
    pembayaran: "BNI",
    total: "Rp 120.000",
    status: "Selesai",
  },
  {
    id: "00003",
    tanggal: "14 Okt 2024",
    namaCustomer: "Justin Donih",
    layanan: "Nebeng Barang",
    pembayaran: "BRI",
    total: "Rp 70.000",
    status: "Selesai",
  },
  {
    id: "00004",
    tanggal: "14 Okt 2024",
    namaCustomer: "Cooper Siphron",
    layanan: "Nebeng Mobil",
    pembayaran: "BNI",
    total: "Rp 340.000",
    status: "Selesai",
  },
  {
    id: "00005",
    tanggal: "14 Okt 2024",
    namaCustomer: "Charlie Torff",
    layanan: "Nebeng Motor",
    pembayaran: "BNI",
    total: "Rp 90.000",
    status: "Belum Selesai",
  },
  {
    id: "00006",
    tanggal: "13 Okt 2024",
    namaCustomer: "Lydia Donin",
    layanan: "Nebeng Barang",
    pembayaran: "Mandiri",
    total: "Rp 90.000",
    status: "Selesai",
  },
  {
    id: "00007",
    tanggal: "13 Okt 2024",
    namaCustomer: "Makenna Geidt",
    layanan: "Nebeng Motor",
    pembayaran: "BNI",
    total: "Rp 120.000",
    status: "Selesai",
  },
  {
    id: "00008",
    tanggal: "13 Okt 2024",
    namaCustomer: "Ruben Franci",
    layanan: "Nebeng Mobil",
    pembayaran: "BNI",
    total: "Rp 120.000",
    status: "Belum Selesai",
  },
  {
    id: "00009",
    tanggal: "13 Okt 2024",
    namaCustomer: "Alfredo Vetrovs",
    layanan: "Nebeng Mobil",
    pembayaran: "Mandiri",
    total: "Rp 240.000",
    status: "Selesai",
  },
]

export default function PendapatanPage() {
  const [filter, setFilter] = useState("")
  const [date, setDate] = useState<Date | undefined>(undefined)

  const filteredData = pendapatanData.filter((item) => {
    const matchesSearch =
      item.namaCustomer.toLowerCase().includes(filter.toLowerCase()) ||
      item.id.toLowerCase().includes(filter.toLowerCase()) ||
      item.layanan.toLowerCase().includes(filter.toLowerCase()) ||
      item.pembayaran.toLowerCase().includes(filter.toLowerCase())

    const matchesDate = date ? item.tanggal === format(date, "dd MMM yyyy", { locale: id }) : true
    return matchesSearch && matchesDate
  })

  const resetFilter = () => {
    setFilter("")
    setDate(undefined)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex">
        {/* Main Content */}
        <div className="flex-1 p-6">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Pendapatan</h2>
          </div>

          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
              <div className="flex items-center">
                <div className="p-3 bg-blue-100 rounded-lg">
                  <Wallet className="w-6 h-6 text-blue-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm text-gray-500">Total Pendapatan</p>
                  <p className="text-2xl font-bold text-gray-900">Rp 10.320.000</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
              <div className="flex items-center">
                <div className="p-3 bg-orange-100 rounded-lg">
                  <TrendingUp className="w-6 h-6 text-orange-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm text-gray-500">Pendapatan Hari Ini</p>
                  <div className="flex items-center">
                    <p className="text-2xl font-bold text-gray-900">Rp 1.000.000</p>
                    <Badge className="ml-2 bg-green-100 text-green-800 hover:bg-green-100">+2.1%</Badge>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
              <div className="flex items-center">
                <div className="p-3 bg-green-100 rounded-lg">
                  <LineChart className="w-6 h-6 text-green-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm text-gray-500">Rata - Rata Harian</p>
                  <p className="text-2xl font-bold text-gray-900">Rp 2.300.000</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            {/* Controls */}
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <Filter className="w-4 h-4 text-gray-400" />
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-[180px] justify-start text-left font-normal",
                            !date && "text-muted-foreground",
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {date ? format(date, "dd MMM yyyy", { locale: id }) : <span>Tanggal</span>}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={date}
                          onSelect={setDate}
                          initialFocus
                          locale={id} // Set locale to Indonesian
                        />
                      </PopoverContent>
                    </Popover>
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
                <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                  <Download className="w-4 h-4 mr-2" /> Unduh PDF
                </Button>
              </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      <Checkbox />
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      ID
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Tanggal
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Nama Customer
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Layanan
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Pembayaran
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Total
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Aksi
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredData.map((item) => (
                    <tr key={item.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        <Checkbox />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.id}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.tanggal}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.namaCustomer}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.layanan}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.pembayaran}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.total}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <Badge
                          variant={item.status === "Selesai" ? "default" : "destructive"}
                          className={
                            item.status === "Selesai"
                              ? "bg-green-100 text-green-800 hover:bg-green-100"
                              : "bg-red-100 text-red-800 hover:bg-red-100"
                          }
                        >
                          {item.status}
                        </Badge>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-800">
                          Detail
                          <ChevronRight className="w-4 h-4 ml-1" />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="px-6 py-3 border-t border-gray-200 bg-gray-50">
              <div className="flex items-center justify-between">
                <div className="text-sm text-gray-500">Menampilkan data 1 hingga {filteredData.length} dari 40</div>
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
