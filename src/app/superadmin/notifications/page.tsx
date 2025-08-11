'use client'

import { useEffect, useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'
import { BellIcon } from 'lucide-react'
import axios from 'axios'

type Notification = {
  id: number
  user_id: number
  message: string
  is_read: boolean
  created_at: string
}

export default function NotificationPage() {
  const [notifications, setNotifications] = useState<Notification[]>([])

  useEffect(() => {
    axios
      .get<Notification[]>('/api/notifications')
      .then((res) => {
        if (Array.isArray(res.data) && res.data.length > 0) {
          setNotifications(res.data)
        } else {
          // Gunakan dummy jika kosong
          setNotifications([
            {
              id: 1,
              user_id: 101,
              message: 'Pembayaran untuk pesanan #INV-001 telah diterima.',
              is_read: false,
              created_at: new Date().toISOString(),
            },
            {
              id: 2,
              user_id: 102,
              message: 'Akun Anda berhasil diverifikasi.',
              is_read: true,
              created_at: new Date(Date.now() - 86400000).toISOString(), // kemarin
            },
            {
              id: 3,
              user_id: 103,
              message: 'Permintaan tarik saldo telah diterima.',
              is_read: false,
              created_at: new Date(Date.now() - 3600000).toISOString(), // 1 jam lalu
            },
          ])
        }
      })
      .catch((err) => {
        console.error('Gagal memuat notifikasi:', err)
        // Tampilkan dummy data saat gagal fetch
        setNotifications([
          {
            id: 1,
            user_id: 101,
            message: 'Gagal ambil notifikasi dari server, ini dummy.',
            is_read: false,
            created_at: new Date().toISOString(),
          },
        ])
      })
  }, [])

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4 flex items-center gap-2">
        <BellIcon className="w-6 h-6" /> Notifikasi Pengguna
      </h1>
      <div className="grid gap-4">
        {notifications.map((notif) => (
          <Card
            key={notif.id}
            className={cn(
              notif.is_read
                ? 'opacity-60'
                : 'border-l-4 border-blue-500 shadow-sm'
            )}
          >
            <CardContent className="p-4">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-gray-800">{notif.message}</p>
                  <p className="text-xs text-gray-500 mt-1">
                    {new Date(notif.created_at).toLocaleString()}
                  </p>
                </div>
                {!notif.is_read && (
                  <Badge className="bg-blue-500 text-white">Baru</Badge>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
