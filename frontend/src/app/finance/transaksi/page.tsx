"use client";

import { useState } from "react";
import { Filter, Search, ChevronDown, X } from "lucide-react";
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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";

type Transaction = {
  id: string;
  namaCustomer: string;
  namaMitra: string;
  tanggal: string;
  status: "Selesai" | "Belum Selesai";
  detailStatus: "Belum diverifikasi" | "Terverifikasi";
  tanggalPembayaran: string;
  metodePembayaran: string;
  totalPembayaran: string;
};

const initialTransaksiData: Transaction[] = [
  {
    id: "00001",
    namaCustomer: "Christine Brooks",
    namaMitra: "Corey Saris",
    tanggal: "14 Okt 2024",
    status: "Belum Selesai",
    detailStatus: "Belum diverifikasi",
    tanggalPembayaran: "14/10/2024, 10.30 AM",
    metodePembayaran: "BNI",
    totalPembayaran: "Rp 30.000",
  },
  {
    id: "00002",
    namaCustomer: "Rosie Pearson",
    namaMitra: "Ahmad Ekstrom Bothman",
    tanggal: "14 Okt 2024",
    status: "Selesai",
    detailStatus: "Terverifikasi",
    tanggalPembayaran: "14/10/2024, 09.00 AM",
    metodePembayaran: "Mandiri",
    totalPembayaran: "Rp 50.000",
  },
  {
    id: "00003",
    namaCustomer: "Darrell Caldwell",
    namaMitra: "Alfredo Passaquindici Arcand",
    tanggal: "13 Okt 2024",
    status: "Selesai",
    detailStatus: "Terverifikasi",
    tanggalPembayaran: "13/10/2024, 11.45 AM",
    metodePembayaran: "BRI",
    totalPembayaran: "Rp 75.000",
  },
  {
    id: "00004",
    namaCustomer: "Gilbert Johnston",
    namaMitra: "Philip Vetrovs",
    tanggal: "13 Okt 2024",
    status: "Selesai",
    detailStatus: "Terverifikasi",
    tanggalPembayaran: "13/10/2024, 08.15 AM",
    metodePembayaran: "BNI",
    totalPembayaran: "Rp 40.000",
  },
  {
    id: "00005",
    namaCustomer: "Alan Cain",
    namaMitra: "Skylar Vaccaro",
    tanggal: "13 Okt 2024",
    status: "Belum Selesai",
    detailStatus: "Belum diverifikasi",
    tanggalPembayaran: "13/10/2024, 10.00 AM",
    metodePembayaran: "Mandiri",
    totalPembayaran: "Rp 60.000",
  },
  {
    id: "00006",
    namaCustomer: "Alfred Murray",
    namaMitra: "Carla Press",
    tanggal: "12 Okt 2024",
    status: "Selesai",
    detailStatus: "Terverifikasi",
    tanggalPembayaran: "12/10/2024, 14.00 PM",
    metodePembayaran: "BRI",
    totalPembayaran: "Rp 90.000",
  },
  {
    id: "00007",
    namaCustomer: "Maggie Sullivan",
    namaMitra: "Kadin Dias",
    tanggal: "12 Okt 2024",
    status: "Selesai",
    detailStatus: "Terverifikasi",
    tanggalPembayaran: "12/10/2024, 16.30 PM",
    metodePembayaran: "BNI",
    totalPembayaran: "Rp 110.000",
  },
  {
    id: "00008",
    namaCustomer: "Rosie Todd",
    namaMitra: "Allison Kenter",
    tanggal: "11 Okt 2024",
    status: "Belum Selesai",
    detailStatus: "Belum diverifikasi",
    tanggalPembayaran: "11/10/2024, 12.00 PM",
    metodePembayaran: "Mandiri",
    totalPembayaran: "Rp 80.000",
  },
  {
    id: "00009",
    namaCustomer: "Dollie Hines",
    namaMitra: "Ashlynn Bergson",
    tanggal: "11 Okt 2024",
    status: "Selesai",
    detailStatus: "Terverifikasi",
    tanggalPembayaran: "11/10/2024, 09.45 AM",
    metodePembayaran: "BRI",
    totalPembayaran: "Rp 150.000",
  },
];

export default function TransaksiPage() {
  const [filter, setFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [transaksiData, setTransaksiData] =
    useState<Transaction[]>(initialTransaksiData);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTransaction, setSelectedTransaction] =
    useState<Transaction | null>(null);

  const filteredData = transaksiData.filter((item) => {
    const matchesSearch =
      item.id.toLowerCase().includes(filter.toLowerCase()) ||
      item.namaCustomer.toLowerCase().includes(filter.toLowerCase()) ||
      item.namaMitra.toLowerCase().includes(filter.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || item.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const resetFilter = () => {
    setStatusFilter("all");
    setFilter("");
  };

  const handleVerifyTransaction = (transactionId: string) => {
    setTransaksiData((prevData) =>
      prevData.map((item) =>
        item.id === transactionId
          ? { ...item, status: "Selesai", detailStatus: "Terverifikasi" }
          : item
      )
    );
    setIsModalOpen(false);
    setSelectedTransaction(null);
  };

  const openVerificationModal = (transaction: Transaction) => {
    setSelectedTransaction(transaction);
    setIsModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex">
        {/* Main Content */}
        <div className="flex-1 p-6">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-900">
              Riwayat Transaksi
            </h2>
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
                      <SelectTrigger className="w-48">
                        <SelectValue placeholder="Status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Semua Status</SelectItem>
                        <SelectItem value="Selesai">Selesai</SelectItem>
                        <SelectItem value="Belum Selesai">
                          Belum Selesai
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
                      ID
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Nama Customer
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Nama Mitra
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Tanggal
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Detail
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredData.map((item) => (
                    <tr key={item.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {item.id}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {item.namaCustomer}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {item.namaMitra}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {item.tanggal}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <Badge
                          variant={
                            item.status === "Selesai"
                              ? "default"
                              : "destructive"
                          }
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
                        {item.detailStatus === "Belum diverifikasi" ? (
                          <Button
                            variant="destructive"
                            size="sm"
                            className="bg-red-100 text-red-800 hover:bg-red-200"
                            onClick={() => openVerificationModal(item)}
                          >
                            {item.detailStatus}
                          </Button>
                        ) : (
                          <Button
                            variant="default"
                            size="sm"
                            className="bg-green-100 text-green-800 hover:bg-green-200"
                            disabled
                          >
                            {item.detailStatus}
                          </Button>
                        )}
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

      {/* Verification Modal */}
      {selectedTransaction && (
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <DialogContent className="sm:max-w-[425px] p-6">
            <DialogHeader className="flex flex-row items-center justify-between pb-4">
              <DialogTitle className="text-lg font-semibold">
                Verifikasi Transaksi
              </DialogTitle>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsModalOpen(false)}
              >
                <X className="h-4 w-4" />
                <span className="sr-only">Close</span>
              </Button>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-3 items-center gap-4">
                <Label htmlFor="tanggalPembayaran" className="text-right">
                  Tanggal Pembayaran:
                </Label>
                <Input
                  id="tanggalPembayaran"
                  defaultValue={selectedTransaction.tanggalPembayaran}
                  readOnly
                  className="col-span-2 bg-gray-100 border-none"
                />
              </div>
              <div className="grid grid-cols-3 items-center gap-4">
                <Label htmlFor="namaCustomerModal" className="text-right">
                  Nama Customer:
                </Label>
                <Input
                  id="namaCustomerModal"
                  defaultValue={selectedTransaction.namaCustomer}
                  readOnly
                  className="col-span-2 bg-gray-100 border-none"
                />
              </div>
              <div className="grid grid-cols-3 items-center gap-4">
                <Label htmlFor="metodePembayaran" className="text-right">
                  Metode Pembayaran:
                </Label>
                <Input
                  id="metodePembayaran"
                  defaultValue={selectedTransaction.metodePembayaran}
                  readOnly
                  className="col-span-2 bg-gray-100 border-none"
                />
              </div>
              <div className="grid grid-cols-3 items-center gap-4">
                <Label htmlFor="totalPembayaran" className="text-right">
                  Total pembayaran:
                </Label>
                <Input
                  id="totalPembayaran"
                  defaultValue={selectedTransaction.totalPembayaran}
                  readOnly
                  className="col-span-2 bg-gray-100 border-none"
                />
              </div>
            </div>
            <div className="flex justify-center pt-4">
              <Button
                className="bg-blue-600 hover:bg-blue-700 text-white w-full"
                onClick={() => handleVerifyTransaction(selectedTransaction.id)}
              >
                Verifikasi
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
