'use client'

import { useEffect, useState } from 'react'
import axios from 'axios'
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

type Terminal = {
  id: number
  name: string
  province_name: string
  regency_name: string
  district_name: string
}

// ✅ enum harus sesuai schema.prisma (Car, Motorbike, Bus, Train)
const vehicleOptions = [
  { label: 'Mobil', value: 'Car' },
  { label: 'Motor', value: 'Motorbike' },
]

export function PassengerPricingForm({ onSuccess }: { onSuccess?: () => void }) {
  const [terminals, setTerminals] = useState<Terminal[]>([])
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    vehicle_type: '',
    departure_terminal_id: '',
    arrival_terminal_id: '',
    price_per_seat: '',
    commission_percentage: ''
  })

  useEffect(() => {
    const fetchTerminals = async () => {
      try {
        const res = await axios.get('http://localhost:3001/superadmin/terminals')
        setTerminals(Array.isArray(res.data) ? res.data : [])
      } catch (e) {
        console.error(e)
        setTerminals([])
      } finally {
        setLoading(false)
      }
    }
    fetchTerminals()
  }, [])

  const handleSelectChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    // ✅ validasi sebelum submit
    if (!formData.vehicle_type) {
      alert("Pilih jenis kendaraan dulu")
      return
    }
    if (!formData.departure_terminal_id || !formData.arrival_terminal_id) {
      alert("Pilih terminal keberangkatan & tujuan")
      return
    }
    if (formData.departure_terminal_id === formData.arrival_terminal_id) {
      alert("Terminal keberangkatan dan tujuan tidak boleh sama")
      return
    }
    if (!formData.price_per_seat || Number(formData.price_per_seat) <= 0) {
      alert("Isi harga per kursi dengan benar")
      return
    }

    setSubmitting(true)
    try {
      // log dulu biar gampang debug
      console.log("Payload yang dikirim:", {
        vehicle_type: formData.vehicle_type,
        departure_terminal_id: Number(formData.departure_terminal_id),
        arrival_terminal_id: Number(formData.arrival_terminal_id),
        price_per_seat: Number(formData.price_per_seat),
        commission_percentage: Number(formData.commission_percentage)
      })

      await axios.post('http://localhost:3001/superadmin/passenger-pricing', {
        vehicle_type: formData.vehicle_type,
        departure_terminal_id: Number(formData.departure_terminal_id),
        arrival_terminal_id: Number(formData.arrival_terminal_id),
        price_per_seat: Number(formData.price_per_seat),
        commission_percentage: Number(formData.commission_percentage)
      })

      setFormData({
        vehicle_type: '',
        departure_terminal_id: '',
        arrival_terminal_id: '',
        price_per_seat: '',
        commission_percentage: ''
      })
      onSuccess?.()
    } catch (err) {
      console.error('Gagal menambah pricing:', err)
      alert('Gagal menambah pricing')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
      {/* Jenis kendaraan */}
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
            {vehicleOptions.map((opt) => (
              <SelectItem key={opt.value} value={opt.value}>
                {opt.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Terminal Keberangkatan */}
      <div>
        <Label>Terminal Keberangkatan</Label>
        <Select
          value={formData.departure_terminal_id}
          onValueChange={(val) => handleSelectChange('departure_terminal_id', val)}
          disabled={loading}
        >
          <SelectTrigger>
            <SelectValue placeholder={loading ? 'Memuat...' : 'Pilih terminal'} />
          </SelectTrigger>
          <SelectContent>
            {terminals.map((t) => (
              <SelectItem key={t.id} value={String(t.id)}>
                {t.name} — {t.regency_name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Terminal Tujuan */}
      <div>
        <Label>Terminal Tujuan</Label>
        <Select
          value={formData.arrival_terminal_id}
          onValueChange={(val) => handleSelectChange('arrival_terminal_id', val)}
          disabled={loading}
        >
          <SelectTrigger>
            <SelectValue placeholder={loading ? 'Memuat...' : 'Pilih terminal'} />
          </SelectTrigger>
          <SelectContent>
            {terminals.map((t) => (
              <SelectItem key={t.id} value={String(t.id)}>
                {t.name} — {t.regency_name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Harga per kursi */}
      <div>
        <Label htmlFor="price_per_seat">Harga per Kursi</Label>
        <Input
          name="price_per_seat"
          type="number"
          placeholder="Contoh: 75000"
          value={formData.price_per_seat}
          onChange={handleInputChange}
        />
      </div>

      {/* Komisi */}
      <div>
        <Label htmlFor="commission_percentage">Komisi (%)</Label>
        <Input
          name="commission_percentage"
          type="number"
          placeholder="Contoh: 10"
          value={formData.commission_percentage}
          onChange={handleInputChange}
        />
      </div>

      {/* Submit */}
      <div className="col-span-2">
        <Button type="submit" className="w-full" disabled={submitting || loading}>
          {submitting ? 'Menyimpan...' : 'Tambah Tarif'}
        </Button>
      </div>
    </form>
  )
}
