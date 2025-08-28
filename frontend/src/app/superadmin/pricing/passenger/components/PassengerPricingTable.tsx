'use client'

import { useEffect, useMemo, useState } from 'react'
import axios from 'axios'
import { Pencil, Trash2, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue
} from '@/components/ui/select'

type Pricing = {
  id: number
  vehicle_type: 'Car' | 'Motorbike' | 'Bus' | 'Train'
  price_per_seat: number
  commission_percentage: number
  departure_terminal_id: number
  arrival_terminal_id: number
  departure_terminal: { id: number; name: string; regency_name: string }
  arrival_terminal: { id: number; name: string; regency_name: string }
}

type Terminal = {
  id: number
  name: string
  regency_name: string
}

export function PassengerPricingTable({
  reloadKey,
  onChanged
}: {
  reloadKey?: number
  onChanged?: () => void
}) {
  const [rows, setRows] = useState<Pricing[]>([])
  const [loading, setLoading] = useState(true)

  const [terminals, setTerminals] = useState<Terminal[]>([])
  const [editing, setEditing] = useState<Pricing | null>(null)
  const [form, setForm] = useState<any>({})

  useEffect(() => {
    const fetchAll = async () => {
      setLoading(true)
      try {
        const [priceRes, termRes] = await Promise.all([
          axios.get<Pricing[]>('http://localhost:3001/superadmin/passenger-pricing'),
          axios.get<Terminal[]>('http://localhost:3001/superadmin/terminals')
        ])
        setRows(priceRes.data ?? [])
        setTerminals(termRes.data ?? [])
      } catch (e) {
        console.error(e)
        setRows([])
      } finally {
        setLoading(false)
      }
    }
    fetchAll()
  }, [reloadKey])

  const handleDelete = async (id: number) => {
    if (!confirm('Hapus tarif ini?')) return
    try {
      await axios.delete(`http://localhost:3001/superadmin/passenger-pricing/${id}`)
      setRows((r) => r.filter((x) => x.id !== id))
      onChanged?.()
    } catch (e) {
      console.error(e)
      alert('Gagal menghapus')
    }
  }

  const openEdit = (p: Pricing) => {
    setEditing(p)
    setForm({
      vehicle_type: p.vehicle_type,
      departure_terminal_id: String(p.departure_terminal_id),
      arrival_terminal_id: String(p.arrival_terminal_id),
      price_per_seat: String(p.price_per_seat),
      commission_percentage: String(p.commission_percentage)
    })
  }

  const handleUpdate = async () => {
    if (!editing) return
    try {
      await axios.put(`http://localhost:3001/superadmin/passenger-pricing/${editing.id}`, {
        vehicle_type: form.vehicle_type, // enum harus sesuai Prisma: Car, Motorbike, Bus, Train
        departure_terminal_id: Number(form.departure_terminal_id),
        arrival_terminal_id: Number(form.arrival_terminal_id),
        price_per_seat: Number(form.price_per_seat),
        commission_percentage: Number(form.commission_percentage)
      })
      setEditing(null)
      onChanged?.()
    } catch (e) {
      console.error(e)
      alert('Gagal menyimpan perubahan')
    }
  }

  const tmap = useMemo(() => {
    const m = new Map<number, string>()
    terminals.forEach((t) => m.set(t.id, `${t.name} — ${t.regency_name}`))
    return m
  }, [terminals])

  const vehicleLabel = (v: string) => {
    switch (v) {
      case 'Car': return 'Mobil'
      case 'Motorbike': return 'Motor'
      default: return v
    }
  }

  if (loading) return <div className="border rounded-md p-4">Memuat...</div>

  return (
    <div className="border rounded-md p-4">
      <h2 className="font-semibold mb-4">Daftar Tarif Penumpang</h2>
      <table className="w-full text-sm text-left">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2">#</th>
            <th className="p-2">Jenis Kendaraan</th>
            <th className="p-2">Terminal Asal</th>
            <th className="p-2">Terminal Tujuan</th>
            <th className="p-2">Harga/Kursi</th>
            <th className="p-2">Komisi (%)</th>
            <th className="p-2">Aksi</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((tarif, i) => (
            <tr key={tarif.id} className="border-t">
              <td className="p-2">{i + 1}</td>
              <td className="p-2">{vehicleLabel(tarif.vehicle_type)}</td>
              <td className="p-2">
                {tmap.get(tarif.departure_terminal_id) ??
                  `${tarif.departure_terminal?.name ?? '-'} — ${tarif.departure_terminal?.regency_name ?? ''}`}
              </td>
              <td className="p-2">
                {tmap.get(tarif.arrival_terminal_id) ??
                  `${tarif.arrival_terminal?.name ?? '-'} — ${tarif.arrival_terminal?.regency_name ?? ''}`}
              </td>
              <td className="p-2">Rp {tarif.price_per_seat.toLocaleString()}</td>
              <td className="p-2">{tarif.commission_percentage}%</td>
              <td className="p-2 flex gap-2">
                <Pencil className="w-4 h-4 cursor-pointer text-blue-500" onClick={() => openEdit(tarif)} />
                <Trash2 className="w-4 h-4 cursor-pointer text-red-500" onClick={() => handleDelete(tarif.id)} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal Edit */}
      {editing && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-4 w-[560px] shadow">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold">Edit Tarif #{editing.id}</h3>
              <button onClick={() => setEditing(null)}><X className="w-5 h-5" /></button>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label>Jenis Kendaraan</Label>
                <Select
                  value={form.vehicle_type}
                  onValueChange={(v) => setForm((s: any) => ({ ...s, vehicle_type: v }))}
                >
                  <SelectTrigger><SelectValue placeholder="Pilih Kendaraan" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Car">Mobil</SelectItem>
                    <SelectItem value="Motorbike">Motor</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label>Harga/Kursi</Label>
                <Input
                  value={form.price_per_seat}
                  onChange={(e) => setForm((s: any) => ({ ...s, price_per_seat: e.target.value }))}
                />
              </div>

              <div>
                <Label>Komisi (%)</Label>
                <Input
                  value={form.commission_percentage}
                  onChange={(e) => setForm((s: any) => ({ ...s, commission_percentage: e.target.value }))}
                />
              </div>

              <div>
                <Label>Terminal Asal</Label>
                <Select
                  value={form.departure_terminal_id}
                  onValueChange={(v) => setForm((s: any) => ({ ...s, departure_terminal_id: v }))}
                >
                  <SelectTrigger><SelectValue placeholder="Pilih terminal" /></SelectTrigger>
                  <SelectContent>
                    {terminals.map((t) => (
                      <SelectItem key={t.id} value={String(t.id)}>
                        {t.name} — {t.regency_name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label>Terminal Tujuan</Label>
                <Select
                  value={form.arrival_terminal_id}
                  onValueChange={(v) => setForm((s: any) => ({ ...s, arrival_terminal_id: v }))}
                >
                  <SelectTrigger><SelectValue placeholder="Pilih terminal" /></SelectTrigger>
                  <SelectContent>
                    {terminals.map((t) => (
                      <SelectItem key={t.id} value={String(t.id)}>
                        {t.name} — {t.regency_name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex justify-end gap-2 mt-4">
              <Button variant="outline" onClick={() => setEditing(null)}>Batal</Button>
              <Button onClick={handleUpdate}>Simpan</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
