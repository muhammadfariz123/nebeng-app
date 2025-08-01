'use client'

import { Card, CardContent } from '@/components/ui/card'
import { Coins, History } from 'lucide-react'

interface WalletEntry {
  id: number
  type: 'Topup' | 'Penggunaan Kredit'
  amount: number
  date: string
  note: string
}

export default function WalletPage() {
  const creditAmount = 120000 // Ini dummy, diambil dari customers.credit_amount

  const walletHistory: WalletEntry[] = [
    {
      id: 1,
      type: 'Topup',
      amount: 100000,
      date: '2025-07-30T10:15:00Z',
      note: 'Top up via Bank BCA'
    },
    {
      id: 2,
      type: 'Penggunaan Kredit',
      amount: -20000,
      date: '2025-07-31T12:45:00Z',
      note: 'Bayar booking penumpang Bekasi → Bandung'
    },
    {
      id: 3,
      type: 'Topup',
      amount: 40000,
      date: '2025-08-01T08:30:00Z',
      note: 'Top up via Bank Mandiri'
    }
  ]

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold flex items-center gap-2">
        <Coins className="w-6 h-6 text-yellow-500" />
        Dompet Saya
      </h1>

      <Card className="bg-green-50 border-green-200">
        <CardContent className="p-4">
          <p className="text-sm text-gray-600">Jumlah Kredit Saat Ini</p>
          <p className="text-3xl font-bold text-green-700">Rp {creditAmount.toLocaleString('id-ID')}</p>
        </CardContent>
      </Card>

      <div>
        <h2 className="text-lg font-semibold flex items-center gap-2 mt-6 mb-3">
          <History className="w-5 h-5 text-gray-700" /> Riwayat Transaksi Kredit
        </h2>
        <div className="space-y-3">
          {walletHistory.map((entry) => (
            <Card key={entry.id} className="shadow-sm">
              <CardContent className="p-3 text-sm">
                <div className="flex justify-between items-center">
                  <span className="font-medium text-gray-800">{entry.note}</span>
                  <span
                    className={`font-bold ${entry.amount > 0 ? 'text-green-600' : 'text-red-600'}`}
                  >
                    {entry.amount > 0 ? '+' : '-'} Rp {Math.abs(entry.amount).toLocaleString('id-ID')}
                  </span>
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  {new Date(entry.date).toLocaleString('id-ID', {
                    dateStyle: 'medium',
                    timeStyle: 'short'
                  })}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
