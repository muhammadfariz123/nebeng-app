'use client'

import { useEffect, useState } from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { Star } from 'lucide-react'

interface Rating {
  id: number
  driver: {
    full_name: string
    profile_img: string
  }
  customer: {
    full_name: string
  }
  rating: number
  feedback: string | null
  created_at: string
}

export function RatingsTable() {
  const [ratings, setRatings] = useState<Rating[]>([])

  useEffect(() => {
    // Simulasi fetch data rating dari backend (ganti nanti dengan API call)
    setRatings([
      {
        id: 1,
        driver: {
          full_name: 'Rizky Maulana',
          profile_img: '/img/driver1.jpg',
        },
        customer: {
          full_name: 'Andi Saputra',
        },
        rating: 4,
        feedback: 'Pengemudi ramah dan tepat waktu',
        created_at: '2025-07-31T10:15:00Z',
      },
      {
        id: 2,
        driver: {
          full_name: 'Siti Aisyah',
          profile_img: '/img/driver2.jpg',
        },
        customer: {
          full_name: 'Dewi Ratna',
        },
        rating: 5,
        feedback: null,
        created_at: '2025-07-29T08:45:00Z',
      },
    ])
  }, [])

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Driver</TableHead>
          <TableHead>Customer</TableHead>
          <TableHead>Rating</TableHead>
          <TableHead>Feedback</TableHead>
          <TableHead>Tanggal</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {ratings.map((r) => (
          <TableRow key={r.id}>
            <TableCell className="flex items-center gap-3">
              <img
                src={r.driver.profile_img}
                alt="Driver"
                className="w-10 h-10 rounded-full object-cover"
              />
              {r.driver.full_name}
            </TableCell>
            <TableCell>{r.customer.full_name}</TableCell>
            <TableCell>
              <div className="flex items-center gap-1">
                {[...Array(r.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                ))}
                {[...Array(5 - r.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-gray-300" />
                ))}
              </div>
            </TableCell>
            <TableCell>{r.feedback ?? <Badge variant="outline">Tidak ada</Badge>}</TableCell>
            <TableCell>{new Date(r.created_at).toLocaleDateString('id-ID')}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}