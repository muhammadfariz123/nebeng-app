'use client'

import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'

export default function BankForm() {
  const [formData, setFormData] = useState({
    bank_name: '',
    account_name: '',
    account_number: '',
  })

  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e: any) => {
    e.preventDefault()
    console.log('Submit ke backend:', formData)
    // TODO: fetch POST to /api/payment-methods
  }

  return (
    <Card>
      <CardContent className="p-4 space-y-4">
        <h2 className="text-lg font-semibold">Tambah Metode Pembayaran</h2>
        <form onSubmit={handleSubmit} className="grid grid-cols-3 gap-4">
          <div>
            <Label>Nama Bank</Label>
            <Input name="bank_name" onChange={handleChange} />
          </div>
          <div>
            <Label>Nama Rekening</Label>
            <Input name="account_name" onChange={handleChange} />
          </div>
          <div>
            <Label>Nomor Rekening</Label>
            <Input name="account_number" onChange={handleChange} />
          </div>
          <div className="col-span-3">
            <Button type="submit" className="w-full">Simpan Bank</Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
