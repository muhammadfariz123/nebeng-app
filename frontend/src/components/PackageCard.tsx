'use client'

import { Card, CardContent } from '@/components/ui/card'
import { PackageCheck, ClockIcon, ScaleIcon } from 'lucide-react'

interface PackageCardProps {
  from: string
  to: string
  departureTime: string
  maxWeight: number
  pricePerKg: number
}

export default function PackageCard({ from, to, departureTime, maxWeight, pricePerKg }: PackageCardProps) {
  return (
    <Card className="shadow-sm">
      <CardContent className="p-4 space-y-2">
        <div className="flex justify-between items-center">
          <div className="text-sm font-medium text-gray-700">
            <PackageCheck className="inline-block w-4 h-4 mr-1" />
            {from} → {to}
          </div>
          <div className="text-primary font-semibold">
            Rp {pricePerKg.toLocaleString('id-ID')}/kg
          </div>
        </div>
        <div className="flex justify-between text-xs text-gray-500">
          <span><ClockIcon className="inline w-4 h-4 mr-1" />{new Date(departureTime).toLocaleString()}</span>
          <span><ScaleIcon className="inline w-4 h-4 mr-1" />Maks {maxWeight} kg</span>
        </div>
      </CardContent>
    </Card>
  )
}