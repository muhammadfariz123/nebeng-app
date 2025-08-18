'use client'

import { useEffect, useState } from 'react'
import axios from 'axios'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Users, MapPin, DollarSign, CreditCard } from 'lucide-react'

import BookingChart from '@/components/BookingChart'
import PassengerBookingTable from '@/components/PassengerBookingTable'
import GoodsBookingTable from '@/components/GoodsBookingTable'

// Definisi tipe data sesuai response backend
interface DashboardStats {
  users: number
  terminals: number
  transactions: number
  totalCommission: number
}

interface Transaction {
  id: string
  customer: string
  amount: number
  date: string
  status: string
}

interface DashboardResponse {
  stats: DashboardStats
  recentTransactions: Transaction[]
}

export default function SuperadminHome() {
  const [stats, setStats] = useState<DashboardStats>({
    users: 0,
    terminals: 0,
    transactions: 0,
    totalCommission: 0,
  })
  const [recentTransactions, setRecentTransactions] = useState<Transaction[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const res = await axios.get<DashboardResponse>(
          'http://localhost:3001/superadmin/dashboard'
        )
        setStats(res.data.stats)
        setRecentTransactions(res.data.recentTransactions)
      } catch (err) {
        console.error('Gagal mengambil data dashboard:', err)
        setError('Tidak dapat mengambil data dashboard.')
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  if (loading) {
    return (
      <div className="p-6">
        <p>Sedang memuat data dashboard...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="p-6 text-red-500">
        <p>{error}</p>
      </div>
    )
  }

  return (
    <div className="p-6 space-y-10">
      <div>
        <h1 className="text-2xl font-bold mb-4">Dashboard Superadmin</h1>
        <p className="text-muted-foreground">
          Selamat datang! Berikut ringkasan sistem yang sedang berjalan:
        </p>
      </div>

      {/* Statistik */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="shadow-md">
          <CardContent className="p-4 flex items-center gap-4">
            <Users className="w-10 h-10 text-blue-600" />
            <div>
              <p className="text-sm text-muted-foreground">Total Users</p>
              <p className="text-xl font-semibold">{stats.users}</p>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-md">
          <CardContent className="p-4 flex items-center gap-4">
            <MapPin className="w-10 h-10 text-green-600" />
            <div>
              <p className="text-sm text-muted-foreground">Total Terminals</p>
              <p className="text-xl font-semibold">{stats.terminals}</p>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-md">
          <CardContent className="p-4 flex items-center gap-4">
            <CreditCard className="w-10 h-10 text-purple-600" />
            <div>
              <p className="text-sm text-muted-foreground">Transaksi</p>
              <p className="text-xl font-semibold">{stats.transactions}</p>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-md">
          <CardContent className="p-4 flex items-center gap-4">
            <DollarSign className="w-10 h-10 text-yellow-500" />
            <div>
              <p className="text-sm text-muted-foreground">Total Komisi Driver</p>
              <p className="text-xl font-semibold">
                Rp {stats.totalCommission.toLocaleString()}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Chart */}
      <div>
        <BookingChart />
      </div>

      {/* Transaksi Terbaru */}
      <div>
        <h2 className="text-lg font-semibold mb-3">Transaksi Terbaru</h2>
        <Card className="shadow-sm">
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID Transaksi</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Jumlah</TableHead>
                  <TableHead>Tanggal</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentTransactions.map((tx) => (
                  <TableRow key={tx.id}>
                    <TableCell>{tx.id}</TableCell>
                    <TableCell>{tx.customer}</TableCell>
                    <TableCell>Rp {tx.amount.toLocaleString()}</TableCell>
                    <TableCell>
                      {new Date(tx.date).toLocaleDateString('id-ID', {
                        day: '2-digit',
                        month: 'short',
                        year: 'numeric',
                      })}
                    </TableCell>
                    <TableCell>
                      <Badge variant={tx.status === 'Diterima' ? 'default' : 'outline'}>
                        {tx.status}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>

      {/* Tabel Pemesanan */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <PassengerBookingTable />
        <GoodsBookingTable />
      </div>
    </div>
  )
}
