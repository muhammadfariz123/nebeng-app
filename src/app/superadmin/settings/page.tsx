'use client'

import BankForm from './BankForm'
import RegionForm from './RegionForm'

export default function SettingsPage() {
  return (
    <div className="p-6 space-y-8">
      <h1 className="text-2xl font-bold">Pengaturan Sistem</h1>

      <div className="grid gap-6">
        {/* Form pengaturan bank */}
        <BankForm />

        {/* Form pengaturan wilayah (provinsi, kabupaten, kecamatan) */}
        <RegionForm />
      </div>
    </div>
  )
}
