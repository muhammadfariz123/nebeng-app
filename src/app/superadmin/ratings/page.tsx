'use client'

import { Card, CardContent } from '@/components/ui/card'
import { RatingsTable } from './components/RatingsTable'

export default function RatingsPage() {
  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-semibold">Daftar Rating Driver</h1>
      <Card>
        <CardContent>
          <RatingsTable />
        </CardContent>
      </Card>
    </div>
  )
}
