"use client"

import { useState } from "react"
import { Filter, Search, Edit, Trash2, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const dummyData = [
  {
    id: 1,
    dari: "Purwokerto (Pos 1)",
    ke: "Yogyakarta (Pos 1)",
    jarak: "100 Km",
    tarifKecil: "Rp 100.000",
    tarifSedang: "Rp 100.000",
    tarifBesar: "Rp 100.000",
    tarif: "Rp 100.000",
  },
  {
    id: 2,
    dari: "Purwokerto (Pos 2)",
    ke: "Yogyakarta (Pos 2)",
    jarak: "100 Km",
    tarifKecil: "Rp 100.000",
    tarifSedang: "Rp 140.000",
    tarifBesar: "Rp 140.000",
    tarif: "Rp 140.000",
  },
  {
    id: 3,
    dari: "Purwokerto (Pos 1)",
    ke: "Yogyakarta (Pos 3)",
    jarak: "100 Km",
    tarifKecil: "Rp 100.000",
    tarifSedang: "Rp 180.000",
    tarifBesar: "Rp 180.000",
    tarif: "Rp 180.000",
  },
  {
    id: 4,
    dari: "Purwokerto (Pos 2)",
    ke: "Yogyakarta (Pos 4)",
    jarak: "100 Km",
    tarifKecil: "Rp 100.000",
    tarifSedang: "Rp 100.000",
    tarifBesar: "Rp 100.000",
    tarif: "Rp 100.000",
  },
  {
    id: 5,
    dari: "Semarang (Pos 2)",
    ke: "Purwokerto (Pos 2)",
    jarak: "100 Km",
    tarifKecil: "Rp 100.000",
    tarifSedang: "Rp 100.000",
    tarifBesar: "Rp 100.000",
    tarif: "Rp 100.000",
  },
  {
    id: 6,
    dari: "Malang (Pos 1)",
    ke: "Semarang (Pos 2)",
    jarak: "100 Km",
    tarifKecil: "Rp 100.000",
    tarifSedang: "Rp 100.000",
    tarifBesar: "Rp 100.000",
    tarif: "Rp 100.000",
  },
  {
    id: 7,
    dari: "Malang (Pos 2)",
    ke: "Semarang (Pos 3)",
    jarak: "100 Km",
    tarifKecil: "Rp 100.000",
    tarifSedang: "Rp 100.000",
    tarifBesar: "Rp 100.000",
    tarif: "Rp 100.000",
  },
  {
    id: 8,
    dari: "Malang (Pos 2)",
    ke: "Semarang (Pos 3)",
    jarak: "100 Km",
    tarifKecil: "Rp 100.000",
    tarifSedang: "Rp 100.000",
    tarifBesar: "Rp 100.000",
    tarif: "Rp 100.000",
  },
  {
    id: 9,
    dari: "Semarang (Pos 1)",
    ke: "Malang (Pos 2)",
    jarak: "100 Km",
    tarifKecil: "Rp 100.000",
    tarifSedang: "Rp 100.000",
    tarifBesar: "Rp 100.000",
    tarif: "Rp 100.000",
  },
]

export default function TarifPage() {
  const [filter, setFilter] = useState("")
  const [activeTab, setActiveTab] = useState("mobil")

  const filteredData = dummyData.filter(
    (item) =>
      item.dari.toLowerCase().includes(filter.toLowerCase()) || item.ke.toLowerCase().includes(filter.toLowerCase()),
  )

  const getTitle = () => {
    switch (activeTab) {
      case "mobil":
        return "Tarif Nebeng Mobil"
      case "motor":
        return "Tarif Nebeng Motor"
      case "barang":
        return "Tarif Nebeng Barang"
      default:
        return "Tarif Nebeng Mobil"
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex">
        {/* Main Content */}
        <div className="flex-1 p-6">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-900">{getTitle()}</h2>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            {/* Controls */}
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <Filter className="w-4 h-4 text-gray-400" />
                    <Select value={activeTab} onValueChange={setActiveTab}>
                      <SelectTrigger className="w-32">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="mobil">Mobil</SelectItem>
                        <SelectItem value="motor">Motor</SelectItem>
                        <SelectItem value="barang">Barang</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
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
                <Button className="bg-green-500 hover:bg-green-600 text-white">+ Tambah</Button>
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
                      Pos Awal
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Pos Tujuan
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Jarak (Km)
                    </th>
                    {activeTab === "barang" ? (
                      <>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Barang Kecil
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Barang Sedang
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Barang Besar
                        </th>
                      </>
                    ) : (
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Tarif (per penumpang)
                      </th>
                    )}
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Aksi
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredData.map((item, index) => (
                    <tr key={item.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{index + 1}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.dari}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.ke}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.jarak}</td>
                      {activeTab === "barang" ? (
                        <>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.tarifKecil}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.tarifSedang}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.tarifBesar}</td>
                        </>
                      ) : (
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.tarif}</td>
                      )}
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <div className="flex space-x-2">
                          <button className="p-1 hover:bg-gray-100 rounded">
                            <Edit className="w-4 h-4 text-gray-400" />
                          </button>
                          <button className="p-1 hover:bg-gray-100 rounded">
                            <Trash2 className="w-4 h-4 text-red-400" />
                          </button>
                        </div>
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
