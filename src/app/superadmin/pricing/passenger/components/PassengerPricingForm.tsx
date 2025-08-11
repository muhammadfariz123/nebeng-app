'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'

export function PassengerPricingForm() {
  const [formData, setFormData] = useState({
    vehicle_type: '',
    departure_terminal_id: '',
    arrival_terminal_id: '',
    price_per_seat: '',
    commission_percentage: ''
  })

  const handleSelectChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log('Kirim data:', formData)
    // TODO: fetch POST ke backend
  }

  return (
    <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
      <div>
        <Label htmlFor="vehicle_type">Jenis Kendaraan</Label>
        <Select
          value={formData.vehicle_type}
          onValueChange={(val) => handleSelectChange('vehicle_type', val)}
        >
          <SelectTrigger id="vehicle_type">
            <SelectValue placeholder="Pilih Kendaraan" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Motor">Motor</SelectItem>
            <SelectItem value="Mobil">Mobil</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label htmlFor="departure_terminal_id">Terminal Keberangkatan</Label>
        <Input
          name="departure_terminal_id"
          placeholder="ID Terminal"
          onChange={handleInputChange}
        />
      </div>

      <div>
        <Label htmlFor="arrival_terminal_id">Terminal Tujuan</Label>
        <Input
          name="arrival_terminal_id"
          placeholder="ID Terminal"
          onChange={handleInputChange}
        />
      </div>

      <div>
        <Label htmlFor="price_per_seat">Harga per Kursi</Label>
        <Input
          name="price_per_seat"
          type="number"
          placeholder="Contoh: 75000"
          onChange={handleInputChange}
        />
      </div>

      <div>
        <Label htmlFor="commission_percentage">Komisi (%)</Label>
        <Input
          name="commission_percentage"
          type="number"
          placeholder="Contoh: 10"
          onChange={handleInputChange}
        />
      </div>

      <div className="col-span-2">
        <Button type="submit" className="w-full">
          Tambah Tarif
        </Button>
      </div>
    </form>
  )
}
