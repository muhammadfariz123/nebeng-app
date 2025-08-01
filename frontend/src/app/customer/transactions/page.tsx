'use client'

import { useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'

interface TransactionCardProps {
  type: 'Penumpang' | 'Barang'
  from: string
  to: string
  amount: number
  method: string
  status: 'Pending' | 'Diterima' | 'Ditolak' | 'Credited'
  date: string
}

const dummyTransactions: TransactionCardProps[] = [
  {
    type: 'Penumpang',
    from: 'Terminal Bekasi',
    to: 'Terminal Bandung',
    amount: 150000,
    method: 'BCA - 1234567890',
    status: 'Diterima',
    date: '2025-07-31T10:00:00'
  },
  {
    type: 'Barang',
    from: 'Bandara Soekarno-Hatta',
    to: 'Pelabuhan Makassar',
    amount: 90000,
    method: 'Mandiri - 7654321',
    status: 'Pending',
    date: '2025-07-30T12:45:00'
  },
  {
    type: 'Penumpang',
    from: 'Terminal Cikarang',
    to: 'Terminal Yogyakarta',
    amount: 200000,
    method: 'BNI - 111222333',
    status: 'Ditolak',
    date: '2025-07-29T08:30:00'
  }
]

function TransactionCard({ from, to, amount, method, status, date, type }: TransactionCardProps) {
  const statusColor = {
    Pending: 'bg-yellow-100 text-yellow-800',
    Diterima: 'bg-green-100 text-green-800',
    Ditolak: 'bg-red-100 text-red-800',
    Credited: 'bg-blue-100 text-blue-800'
  }[status]

  return (
    <Card className="shadow-sm">
      <CardContent className="p-4 space-y-2">
        <div className="flex justify-between text-sm font-medium">
          <span>{type === 'Penumpang' ? 'Tiket Penumpang' : 'Kirim Barang'}</span>
          <span className="font-semibold text-primary">Rp {amount.toLocaleString('id-ID')}</span>
        </div>
        <div className="text-sm text-gray-700">{from} → {to}</div>
        <div className="text-xs text-gray-500">{new Date(date).toLocaleString()}</div>
        <div className="text-xs text-gray-500">Metode: {method}</div>
        <Badge className={`${statusColor} w-fit text-xs`}>{status}</Badge>
      </CardContent>
    </Card>
  )
}

export default function TransactionsPage() {
  const [tab, setTab] = useState<'Penumpang' | 'Barang'>('Penumpang')

  return (
    <div className="space-y-6">
      <h1 className="text-xl font-semibold">Daftar Transaksi</h1>
      <Tabs defaultValue="Penumpang" value={tab} onValueChange={(v) => setTab(v as any)}>
        <TabsList className="w-full max-w-md">
          <TabsTrigger value="Penumpang">Transaksi Penumpang</TabsTrigger>
          <TabsTrigger value="Barang">Transaksi Barang</TabsTrigger>
        </TabsList>
        <TabsContent value="Penumpang" className="mt-4 space-y-4">
          {dummyTransactions.filter(t => t.type === 'Penumpang').map((tx, i) => (
            <TransactionCard key={i} {...tx} />
          ))}
        </TabsContent>
        <TabsContent value="Barang" className="mt-4 space-y-4">
          {dummyTransactions.filter(t => t.type === 'Barang').map((tx, i) => (
            <TransactionCard key={i} {...tx} />
          ))}
        </TabsContent>
      </Tabs>
    </div>
  )
}
