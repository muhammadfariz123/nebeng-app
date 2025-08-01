// File: app/(customer)/ratings/page.tsx
'use client'

import { useEffect, useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Star, UserIcon, MessageSquare } from 'lucide-react'

interface RatingEntry {
  id: number
  driver_name: string
  profile_img: string
  rating: number
  feedback?: string
  created_at: string
}

export default function RatingsPage() {
  const [ratings, setRatings] = useState<RatingEntry[]>([])

  useEffect(() => {
    // Dummy data for now, replace with API fetch later
    setRatings([
      {
        id: 1,
        driver_name: 'Budi Santoso',
        profile_img: '/drivers/budi.jpg',
        rating: 5,
        feedback: 'Sangat ramah dan berkendara aman!',
        created_at: '2025-07-30T10:00:00Z'
      },
      {
        id: 2,
        driver_name: 'Siti Aminah',
        profile_img: '/drivers/siti.jpg',
        rating: 4,
        feedback: 'Perjalanan nyaman, hanya sedikit terlambat.',
        created_at: '2025-07-28T15:45:00Z'
      }
    ])
  }, [])

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Riwayat Penilaian Driver</h1>
      <div className="space-y-4">
        {ratings.map((entry) => (
          <Card key={entry.id} className="shadow-sm">
            <CardContent className="p-4 space-y-2">
              <div className="flex items-center space-x-4">
                <img
                  src={entry.profile_img}
                  alt={entry.driver_name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div className="flex-1">
                  <div className="font-medium text-gray-800 flex items-center gap-1">
                    <UserIcon className="w-4 h-4 text-gray-500" />
                    {entry.driver_name}
                  </div>
                  <div className="text-sm text-gray-500">
                    {new Date(entry.created_at).toLocaleDateString('id-ID', {
                      day: '2-digit',
                      month: 'long',
                      year: 'numeric'
                    })}
                  </div>
                </div>
                <div className="flex items-center space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${i < entry.rating ? 'text-yellow-400' : 'text-gray-300'}`}
                      fill={i < entry.rating ? 'currentColor' : 'none'}
                    />
                  ))}
                </div>
              </div>
              {entry.feedback && (
                <div className="text-sm text-gray-700 mt-2 flex items-start gap-2">
                  <MessageSquare className="w-4 h-4 mt-0.5 text-gray-500" />
                  {entry.feedback}
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
