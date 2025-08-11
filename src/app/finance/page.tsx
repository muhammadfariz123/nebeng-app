"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronDown, ArrowUpRight, ArrowDownRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { AnalysisChart } from "@/components/analysis-chart"; // Import new component
import { ServiceUsageChart } from "@/components/service-usage-chart"; // Import new component

const bankCards = [
  {
    id: 1,
    bank: "mandiri",
    logo: "/mandiri.png",
    saldo: "Rp 3.330.000",
    cardNumber: "5282 3456 7890 1289",
    expiry: "09/25",
    bgColor: "bg-blue-600",
  },
  {
    id: 2,
    bank: "bni",
    logo: "/bni.png",
    saldo: "Rp 3.330.000",
    cardNumber: "5282 3456 7890 1289",
    expiry: "09/25",
    bgColor: "bg-gray-700",
  },
  {
    id: 3,
    bank: "bri",
    logo: "/bri.png",
    saldo: "Rp 3.330.000",
    cardNumber: "5282 3456 7890 1289",
    expiry: "09/25",
    bgColor: "bg-blue-800",
  },
  {
    id: 4,
    bank: "btn",
    logo: "/btn.png",
    saldo: "Rp 3.330.000",
    cardNumber: "5282 3456 7890 1289",
    expiry: "09/25",
    bgColor: "bg-yellow-500",
  },
];

const latestTransactions = [
  {
    id: "001",
    namaPelanggan: "Alisa Nasywa",
    waktu: "2 jam yang lalu",
    jumlahDana: "Rp 90.000",
    pembayaran: "BNI",
  },
  {
    id: "002",
    namaPelanggan: "Paityn Dorwart",
    waktu: "3 jam yang lalu",
    jumlahDana: "Rp 360.000",
    pembayaran: "BRI",
  },
  {
    id: "003",
    namaPelanggan: "Haylie Korigaard",
    waktu: "12 jam yang lalu",
    jumlahDana: "Rp 120.000",
    pembayaran: "Mandiri",
  },
  {
    id: "004",
    namaPelanggan: "Tatiana Westervelt",
    waktu: "13 jam yang lalu",
    jumlahDana: "Rp 360.000",
    pembayaran: "BNI",
  },
  {
    id: "005",
    namaPelanggan: "Giana Westervelt",
    waktu: "17 jam yang lalu",
    jumlahDana: "Rp 90.000",
    pembayaran: "BNI",
  },
  {
    id: "006",
    namaPelanggan: "Desirae Dias",
    waktu: "Kemarin",
    jumlahDana: "Rp 90.000",
    pembayaran: "BTN",
  },
  {
    id: "007",
    namaPelanggan: "Alena Lipshutz",
    waktu: "Kemarin",
    jumlahDana: "Rp 120.000",
    pembayaran: "Mandiri",
  },
  {
    id: "008",
    namaPelanggan: "Maren Rosser",
    waktu: "Kemarin",
    jumlahDana: "Rp 90.000",
    pembayaran: "BNI",
  },
  {
    id: "009",
    namaPelanggan: "Kaiya Saris",
    waktu: "Kemarin",
    jumlahDana: "Rp 120.000",
    pembayaran: "BNI",
  },
  {
    id: "010",
    namaPelanggan: "Cheyenne Dokidis",
    waktu: "Kemarin",
    jumlahDana: "Rp 90.000",
    pembayaran: "BRI",
  },
];

export default function FinancePage() {
  const [activeCardIndex, setActiveCardIndex] = useState(0);
  const [analysisYear, setAnalysisYear] = useState("2024");
  const [serviceUsageMonth, setServiceUsageMonth] = useState("bulan");
  const [transactionTypeFilter, setTransactionTypeFilter] =
    useState("Pendapatan");

  const handleCardDotClick = (index: number) => {
    setActiveCardIndex(index);
  };

  const currentCard = bankCards[activeCardIndex];

  // Dummy data for analysis chart.
  const analysisData = [
    { month: "Jan", pendapatan: 1500, pengeluaran: 800 },
    { month: "Feb", pendapatan: 1800, pengeluaran: 1200 },
    { month: "Mar", pendapatan: 1000, pengeluaran: 1500 },
    { month: "Apr", pendapatan: 2200, pengeluaran: 700 },
    { month: "Mei", pendapatan: 2500, pengeluaran: 1000 },
    { month: "Jun", pendapatan: 1200, pengeluaran: 1800 },
    { month: "Jul", pendapatan: 1700, pengeluaran: 900 },
    { month: "Agu", pendapatan: 1900, pengeluaran: 1100 },
  ];

  // Dummy data for service usage chart percentages
  const nebengMobilPercentage = 48;
  const nebengBarangPercentage = 48;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex">
        {/* Main Content */}
        <div className="flex-1 p-6">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-900">
              Selamat Datang, Gustavo 👋
            </h2>
            <p className="text-gray-600">
              Track keuangan nebeng disini. Semangat!
            </p>
          </div>

          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200 flex items-center">
              <div className="p-3 bg-green-100 rounded-lg">
                <ArrowUpRight className="w-6 h-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-500">Total Pendapatan</p>
                <p className="text-2xl font-bold text-gray-900">
                  Rp 10.320.000
                </p>
              </div>
              <Badge className="ml-auto bg-green-100 text-green-800 hover:bg-green-100">
                +2.1%
              </Badge>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200 flex items-center">
              <div className="p-3 bg-red-100 rounded-lg">
                <ArrowDownRight className="w-6 h-6 text-red-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-500">Total Pengeluaran</p>
                <p className="text-2xl font-bold text-gray-900">Rp 2.100.000</p>
              </div>
              <Badge className="ml-auto bg-red-100 text-red-800 hover:bg-red-100">
                +2.1%
              </Badge>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Analysis Section - Now a separate component */}
            <div className="lg:col-span-2">
              <AnalysisChart
                analysisData={analysisData}
                analysisYear={analysisYear}
                setAnalysisYear={setAnalysisYear}
              />
            </div>

            {/* My Cards Section */}
            <div className="lg:col-span-1 bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Kartu Saya
              </h3>
              <p className="text-sm text-gray-600 mb-4">
                Total Saldo Keseluruhan Rp 10.000.000
              </p>
              <Card
                className={`relative w-full h-48 rounded-lg p-6 text-white shadow-lg ${currentCard.bgColor}`}
              >
                <div className="absolute top-6 right-6">
                  <Image
                    src={currentCard.logo || "/placeholder.svg"}
                    alt={`${currentCard.bank} logo`}
                    width={90}
                    height={24}
                  />
                </div>
                <p className="text-sm opacity-80">Saldo</p>
                <p className="text-3xl font-bold mt-1">{currentCard.saldo}</p>
                <p className="absolute bottom-6 left-6 text-sm opacity-80">
                  {currentCard.cardNumber}
                </p>
                <p className="absolute bottom-6 right-6 text-sm opacity-80">
                  {currentCard.expiry}
                </p>
              </Card>
              <div className="flex justify-center space-x-2 mt-4">
                {bankCards.map((_, index) => (
                  <button
                    key={index}
                    className={`w-2 h-2 rounded-full ${
                      activeCardIndex === index ? "bg-blue-600" : "bg-gray-300"
                    }`}
                    onClick={() => handleCardDotClick(index)}
                  ></button>
                ))}
              </div>
              <div className="flex space-x-2 mt-6">
                <Button
                  variant="outline"
                  className="flex-1 border-blue-600 text-blue-600 hover:bg-blue-50 bg-transparent"
                >
                  Kelola Kartu
                </Button>
                <Button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white">
                  Transfer
                </Button>
              </div>
            </div>

            {/* Latest Transactions Section */}
            <div className="lg:col-span-2 bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">
                  Transaksi Terbaru
                </h3>
                <Select
                  value={transactionTypeFilter}
                  onValueChange={setTransactionTypeFilter}
                >
                  <SelectTrigger className="w-32">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Pendapatan">Pendapatan</SelectItem>
                    <SelectItem value="Pengeluaran">Pengeluaran</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="text-left text-gray-500 border-b border-gray-200">
                      <th className="py-2 px-4">ID</th>
                      <th className="py-2 px-4">Nama Pelanggan</th>
                      <th className="py-2 px-4">Waktu</th>
                      <th className="py-2 px-4">Jumlah Dana</th>
                      <th className="py-2 px-4">Pembayaran</th>
                    </tr>
                  </thead>
                  <tbody>
                    {latestTransactions.map((transaction) => (
                      <tr
                        key={transaction.id}
                        className="border-b border-gray-100 last:border-b-0 hover:bg-gray-50"
                      >
                        <td className="py-3 px-4">{transaction.id}</td>
                        <td className="py-3 px-4">
                          {transaction.namaPelanggan}
                        </td>
                        <td className="py-3 px-4">{transaction.waktu}</td>
                        <td className="py-3 px-4 text-green-600 font-medium">
                          {transaction.jumlahDana}
                        </td>
                        <td className="py-3 px-4">{transaction.pembayaran}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Service Usage Section - Now a separate component */}
            <div className="lg:col-span-1">
              <ServiceUsageChart
                serviceUsageMonth={serviceUsageMonth}
                setServiceUsageMonth={setServiceUsageMonth}
                nebengMobilPercentage={nebengMobilPercentage}
                nebengBarangPercentage={nebengBarangPercentage}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
