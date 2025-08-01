// app/(customer)/notifications/page.tsx
'use client'

import { useEffect, useState } from 'react'
import { BellIcon } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'

interface Notification {
  id: number
  message: string
  is_read: boolean
  created_at: string
}

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<Notification[]>([])

  useEffect(() => {
    // Dummy fetch simulation
    const dummyData: Notification[] = [
      {
        id: 1,
        message: 'Pesanan Anda telah diterima oleh driver.',
        is_read: false,
        created_at: '2025-08-01T10:30:00',
      },
      {
        id: 2,
        message: 'Pembayaran berhasil diverifikasi.',
        is_read: true,
        created_at: '2025-07-31T15:12:00',
      },
      {
        id: 3,
        message: 'Driver Anda telah sampai di lokasi penjemputan.',
        is_read: false,
        created_at: '2025-07-30T08:45:00',
      },
    ]
    setNotifications(dummyData)
  }, [])

  return (
    <div className="space-y-4">
      <h1 className="text-xl font-semibold text-gray-800 mb-4">Notifikasi</h1>
      {notifications.map((notif) => (
        <Card key={notif.id} className={`border ${notif.is_read ? 'bg-white' : 'bg-blue-50 border-blue-300'}`}>
          <CardContent className="p-4 flex items-start justify-between">
            <div className="space-y-1">
              <div className="text-sm text-gray-700 flex items-center">
                <BellIcon className="w-4 h-4 mr-2 text-blue-600" />
                {notif.message}
              </div>
              <div className="text-xs text-gray-400">
                {new Date(notif.created_at).toLocaleString('id-ID', {
                  day: '2-digit',
                  month: 'short',
                  year: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </div>
            </div>
            {!notif.is_read && (
              <span className="text-xs text-blue-600 font-medium">Baru</span>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
