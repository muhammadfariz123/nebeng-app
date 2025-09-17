// src/app/driver/transactions/page.tsx
"use client";

import { useState } from "react";
import { CreditCard, Calendar, Eye, DollarSign, CheckCircle, XCircle } from "lucide-react";

// Mock data untuk transaksi
const transactions = [
  {
    id: "1",
    date: "2024-09-18",
    amount: 50000,
    commission: 5000,
    total: 45000,
    status: "Completed",
    details: "YOG POS 2 → SOLO POS 1 | 2 Penumpang",
  },
  {
    id: "2",
    date: "2024-09-19",
    amount: 80000,
    commission: 8000,
    total: 72000,
    status: "Pending",
    details: "YOG POS 1 → SOLO POS 2 | 1 Barang",
  },
  {
    id: "3",
    date: "2024-09-20",
    amount: 60000,
    commission: 6000,
    total: 54000,
    status: "Completed",
    details: "YOG POS 2 → SEMARANG POS 1 | 1 Penumpang",
  },
];

export default function DriverTransactions() {
  const [showDetail, setShowDetail] = useState<string | null>(null);

  const handleDetailToggle = (id: string) => {
    setShowDetail((prevState) => (prevState === id ? null : id));
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-6">Daftar Transaksi</h2>

      <div className="space-y-4">
        {transactions.map((transaction) => (
          <div
            key={transaction.id}
            className="bg-gray-100 p-4 rounded-lg shadow-sm hover:shadow-md transition"
          >
            <div className="flex items-center justify-between">
              <div className="flex flex-col">
                <div className="text-lg font-semibold text-gray-800">{transaction.details}</div>
                <div className="text-sm text-gray-600">{transaction.date}</div>
              </div>
              <div className="flex flex-col items-end">
                <div className="text-xl font-semibold text-green-600">Rp {transaction.total}</div>
                <div
                  className={`text-sm font-semibold ${
                    transaction.status === "Completed" ? "text-green-600" : "text-orange-600"
                  }`}
                >
                  {transaction.status}
                </div>
              </div>
            </div>

            {/* Show Details */}
            <div className="mt-4">
              <button
                onClick={() => handleDetailToggle(transaction.id)}
                className="text-blue-600 hover:text-blue-800 flex items-center gap-1"
              >
                <Eye className="w-4 h-4" />
                {showDetail === transaction.id ? "Tutup Detail" : "Lihat Detail"}
              </button>
              {showDetail === transaction.id && (
                <div className="mt-4 p-4 bg-gray-50 rounded-lg shadow-inner">
                  <div className="flex justify-between">
                    <div>
                      <div className="text-sm text-gray-500">Pemasukan</div>
                      <div className="text-lg font-semibold text-gray-800">Rp {transaction.amount}</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-500">Komisi</div>
                      <div className="text-lg font-semibold text-gray-800">Rp {transaction.commission}</div>
                    </div>
                  </div>
                  <div className="mt-2 flex justify-between">
                    <div>
                      <div className="text-sm text-gray-500">Tanggal Transaksi</div>
                      <div className="text-lg font-semibold text-gray-800">{transaction.date}</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-500">Status Pembayaran</div>
                      <div
                        className={`text-lg font-semibold ${
                          transaction.status === "Completed" ? "text-green-600" : "text-orange-600"
                        }`}
                      >
                        {transaction.status === "Completed" ? <CheckCircle /> : <XCircle />}
                        {transaction.status}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
