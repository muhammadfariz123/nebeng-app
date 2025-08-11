'use client'

import { PassengerPricingTable } from './components/PassengerPricingTable'
import { PassengerPricingForm } from './components/PassengerPricingForm'

export default function PassengerPricingPage() {
  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-semibold">Tarif Penumpang</h1>
      <PassengerPricingForm />
      <PassengerPricingTable />
    </div>
  )
}
