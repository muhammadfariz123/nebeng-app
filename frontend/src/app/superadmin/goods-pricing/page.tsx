'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

export default function GoodsPricingPage() {
  const [formData, setFormData] = useState({
    transport_type: '',
    departure_terminal_id: '',
    arrival_terminal_id: '',
    price_per_kg: '',
    commission_percentage: '',
  })

  const handleChange = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Tarif Barang:', formData)
    // TODO: Integrasikan dengan backend (POST ke /goods-pricing)
  }

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Tambah Tarif Barang</h2>
      <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="transport_type">Jenis Transportasi</Label>
          <Select onValueChange={(value) => handleChange('transport_type', value)}>
            <SelectTrigger>
              <SelectValue placeholder="Pilih Jenis Transportasi" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Sendiri">Sendiri</SelectItem>
              <SelectItem value="Umum">Umum</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="departure_terminal_id">Terminal Keberangkatan</Label>
          <Input
            id="departure_terminal_id"
            name="departure_terminal_id"
            type="text"
            placeholder="ID Terminal"
            onChange={(e) => handleChange('departure_terminal_id', e.target.value)}
          />
        </div>

        <div>
          <Label htmlFor="arrival_terminal_id">Terminal Tujuan</Label>
          <Input
            id="arrival_terminal_id"
            name="arrival_terminal_id"
            type="text"
            placeholder="ID Terminal"
            onChange={(e) => handleChange('arrival_terminal_id', e.target.value)}
          />
        </div>

        <div>
          <Label htmlFor="price_per_kg">Harga per Kg</Label>
          <Input
            id="price_per_kg"
            name="price_per_kg"
            type="number"
            placeholder="Contoh: 2000"
            onChange={(e) => handleChange('price_per_kg', e.target.value)}
          />
        </div>

        <div>
          <Label htmlFor="commission_percentage">Komisi (%)</Label>
          <Input
            id="commission_percentage"
            name="commission_percentage"
            type="number"
            placeholder="Contoh: 10"
            onChange={(e) => handleChange('commission_percentage', e.target.value)}
          />
        </div>

        <div className="col-span-2">
          <Button type="submit" className="w-full">Simpan Tarif Barang</Button>
        </div>
      </form>
    </div>
  )
}
