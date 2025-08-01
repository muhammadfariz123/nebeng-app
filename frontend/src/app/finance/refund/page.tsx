"use client";

import { useState } from "react";
import { Filter, Search, ChevronDown, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";

const refundData = [
  {
    id: 1,
    tanggal: "14 Okt 2024",
    namaCustomer: "Alfredo Rhiel Madsen",
    kodePemesanan: "XSH12HQ",
    jumlahRefund: "Rp 90.000",
    status: "Belum Diterima",
  },
  {
    id: 2,
    tanggal: "14 Okt 2024",
    namaCustomer: "Talan Philips",
    kodePemesanan: "NP34NJI",
    jumlahRefund: "Rp 90.000",
    status: "Diterima",
  },
  {
    id: 3,
    tanggal: "14 Okt 2024",
    namaCustomer: "Nolan Kenter",
    kodePemesanan: "HU123UJ",
    jumlahRefund: "Rp 90.000",
    status: "Diterima",
  },
  {
    id: 4,
    tanggal: "14 Okt 2024",
    namaCustomer: "Marcus Torff",
    kodePemesanan: "KL987UI",
    jumlahRefund: "Rp 90.000",
    status: "Diterima",
  },
  {
    id: 5,
    tanggal: "14 Okt 2024",
    namaCustomer: "Brandon Kenter",
    kodePemesanan: "JY918UH",
    jumlahRefund: "Rp 90.000",
    status: "Belum Diterima",
  },
  {
    id: 6,
    tanggal: "13 Okt 2024",
    namaCustomer: "Emerson Bergson",
    kodePemesanan: "NHB21IJ",
    jumlahRefund: "Rp 90.000",
    status: "Diterima",
  },
  {
    id: 7,
    tanggal: "13 Okt 2024",
    namaCustomer: "Davis Workman",
    kodePemesanan: "BG281KL",
    jumlahRefund: "Rp 90.000",
    status: "Diterima",
  },
  {
    id: 8,
    tanggal: "13 Okt 2024",
    namaCustomer: "Jaylon Herwitz",
    kodePemesanan: "XC918MN",
    jumlahRefund: "Rp 90.000",
    status: "Belum Diterima",
  },
  {
    id: 9,
    tanggal: "13 Okt 2024",
    namaCustomer: "Phillip Botosh",
    kodePemesanan: "IHB891SH",
    jumlahRefund: "Rp 90.000",
    status: "Diterima",
  },
];

export default function RefundPage() {
  const [filter, setFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const filteredData = refundData.filter((item) => {
    const matchesSearch =
      item.namaCustomer.toLowerCase().includes(filter.toLowerCase()) ||
      item.kodePemesanan.toLowerCase().includes(filter.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || item.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const resetFilter = () => {
    setStatusFilter("all");
    setFilter("");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex">
        {/* Main Content */}
        <div className="flex-1 p-6">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Daftar Refund</h2>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            {/* Controls */}
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <Filter className="w-4 h-4 text-gray-400" />
                    <Select
                      value={statusFilter}
                      onValueChange={setStatusFilter}
                    >
                      <SelectTrigger className="w-32">
                        <SelectValue placeholder="Status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Semua</SelectItem>
                        <SelectItem value="Diterima">Diterima</SelectItem>
                        <SelectItem value="Belum Diterima">
                          Belum Diterima
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <Button
                    variant="ghost"
                    className="text-red-500 hover:text-red-600"
                    onClick={resetFilter}
                  >
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
                      Tanggal
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Nama Customer
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Kode Pemesanan
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Jumlah Refund
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
                  {filteredData.map((item, index) => (
                    <tr key={item.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {index + 1}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {item.tanggal}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {item.namaCustomer}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        <Badge variant="outline" className="font-mono">
                          {item.kodePemesanan}
                        </Badge>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {item.jumlahRefund}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <Badge
                          variant={
                            item.status === "Diterima"
                              ? "default"
                              : "destructive"
                          }
                          className={
                            item.status === "Diterima"
                              ? "bg-green-100 text-green-800 hover:bg-green-100"
                              : "bg-red-100 text-red-800 hover:bg-red-100"
                          }
                        >
                          {item.status}
                        </Badge>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-blue-600 hover:text-blue-800"
                        >
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
                <div className="text-sm text-gray-500">
                  Menampilkan data 1 hingga {filteredData.length} dari 40
                </div>
                <div className="flex space-x-1">
                  <button className="px-3 py-1 text-sm text-gray-500 hover:bg-gray-100 rounded">
                    {"<"}
                  </button>
                  <button className="px-3 py-1 text-sm text-gray-500 hover:bg-gray-100 rounded">
                    {">"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
