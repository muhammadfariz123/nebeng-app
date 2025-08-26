'use client'

import { useEffect, useState } from 'react'
import axios from 'axios'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { BellIcon } from 'lucide-react'

type Notification = {
  id: number
  user_id: number
  message: string
  is_read: boolean
  created_at: string
}

const BACKEND = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:3001'

export default function NotificationPage() {
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [loading, setLoading] = useState(false)

  const fetchList = async () => {
    setLoading(true)
    try {
      const res = await axios.get<Notification[]>(`${BACKEND}/superadmin/notifications`)
      setNotifications(res.data)
    } catch (err) {
      console.error(err)
      setNotifications([])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchList()
  }, [])

  const markRead = async (id: number) => {
    try {
      await axios.put(`${BACKEND}/superadmin/notifications/${id}/read`)
      setNotifications((s) => s.map((n) => (n.id === id ? { ...n, is_read: true } : n)))
    } catch (err) {
      console.error(err)
      alert('Gagal menandai terbaca')
    }
  }

  const remove = async (id: number) => {
    if (!confirm('Hapus notifikasi ini?')) return
    try {
      await axios.delete(`${BACKEND}/superadmin/notifications/${id}`)
      setNotifications((s) => s.filter((n) => n.id !== id))
    } catch (err) {
      console.error(err)
      alert('Gagal menghapus')
    }
  }

  const markAllRead = async () => {
    try {
      await axios.put(`${BACKEND}/superadmin/notifications/mark-all-read`)
      setNotifications((s) => s.map((n) => ({ ...n, is_read: true })))
    } catch (err) {
      console.error(err)
      alert('Gagal menandai semua')
    }
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4 flex items-center gap-2">
        <BellIcon className="w-6 h-6" /> Notifikasi Pengguna
      </h1>

      <div className="flex gap-2 mb-4">
        <Button onClick={fetchList} disabled={loading}>{loading ? 'Memuat...' : 'Muat Ulang'}</Button>
        <Button onClick={markAllRead} variant="outline">Tandai Semua Dibaca</Button>
      </div>

      <div className="grid gap-4">
        {notifications.length === 0 && <div className="text-sm text-gray-500">Belum ada notifikasi</div>}

        {notifications.map((notif) => (
          <Card
            key={notif.id}
            className={cn(
              notif.is_read ? 'opacity-60' : 'border-l-4 border-blue-500 shadow-sm'
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

                <div className="flex flex-col items-end gap-2">
                  {!notif.is_read ? <Badge className="bg-blue-500 text-white">Baru</Badge> : null}
                  <div className="flex gap-2">
                    {!notif.is_read && (
                      <Button size="sm" onClick={() => markRead(notif.id)}>Tandai Dibaca</Button>
                    )}
                    <Button size="sm" variant="destructive" onClick={() => remove(notif.id)}>Hapus</Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
