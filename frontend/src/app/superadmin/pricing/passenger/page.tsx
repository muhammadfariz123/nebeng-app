'use client'

import { useState } from 'react'
import { PassengerPricingTable } from './components/PassengerPricingTable'
import { PassengerPricingForm } from './components/PassengerPricingForm'

export default function PassengerPricingPage() {
  const [reloadKey, setReloadKey] = useState(0)
  const triggerReload = () => setReloadKey((k) => k + 1)

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-semibold">Tarif Penumpang</h1>
      <PassengerPricingForm onSuccess={triggerReload} />
      <PassengerPricingTable reloadKey={reloadKey} onChanged={triggerReload} />
    </div>
  )
}
