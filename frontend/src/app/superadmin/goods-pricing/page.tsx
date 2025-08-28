'use client'

import { useEffect, useMemo, useState } from 'react'
import axios from 'axios'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Pencil, Trash2, X } from 'lucide-react'

type Terminal = {
  id: number
  name: string
  regency_name: string
}

type GoodsPricing = {
  id: number
  transport_type: 'Sendiri' | 'Umum'
  departure_terminal_id: number
  arrival_terminal_id: number
  price_per_kg: number
  commission_percentage: number
  departure_terminal?: { id: number; name: string; regency_name: string }
  arrival_terminal?: { id: number; name: string; regency_name: string }
}

const transportOptions = [
  { label: 'Sendiri', value: 'Sendiri' },
  { label: 'Umum', value: 'Umum' },
]

export default function GoodsPricingPage() {
  const [terminals, setTerminals] = useState<Terminal[]>([])
  const [rows, setRows] = useState<GoodsPricing[]>([])
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)

  const [form, setForm] = useState({
    transport_type: '',
    departure_terminal_id: '',
    arrival_terminal_id: '',
    price_per_kg: '',
    commission_percentage: '',
  })

  const [editing, setEditing] = useState<GoodsPricing | null>(null)
  const [editForm, setEditForm] = useState<any>({})

  // Fetch terminals + goods pricing
  useEffect(() => {
    const fetchAll = async () => {
      setLoading(true)
      try {
        const [tRes, gRes] = await Promise.all([
          axios.get<Terminal[]>('http://localhost:3001/superadmin/terminals'),
          axios.get<GoodsPricing[]>('http://localhost:3001/superadmin/goods-pricing'),
        ])
        setTerminals(Array.isArray(tRes.data) ? tRes.data : [])
        setRows(Array.isArray(gRes.data) ? gRes.data : [])
      } catch (e) {
        console.error(e)
        setTerminals([])
        setRows([])
      } finally {
        setLoading(false)
      }
    }
    fetchAll()
  }, [])

  const tmap = useMemo(() => {
    const m = new Map<number, string>()
    terminals.forEach((t) => m.set(t.id, `${t.name} — ${t.regency_name}`))
    return m
  }, [terminals])

  const handleFormChange = (field: string, value: string) => {
    setForm((s) => ({ ...s, [field]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    try {
      await axios.post('http://localhost:3001/superadmin/goods-pricing', {
        transport_type: form.transport_type, // "Sendiri" | "Umum"
        departure_terminal_id: Number(form.departure_terminal_id),
        arrival_terminal_id: Number(form.arrival_terminal_id),
        price_per_kg: Number(form.price_per_kg),
        commission_percentage: Number(form.commission_percentage),
      })
      // refresh rows
      const gRes = await axios.get<GoodsPricing[]>('http://localhost:3001/superadmin/goods-pricing')
      setRows(gRes.data ?? [])
      // reset form
      setForm({
        transport_type: '',
        departure_terminal_id: '',
        arrival_terminal_id: '',
        price_per_kg: '',
        commission_percentage: '',
      })
      alert('Tarif barang ditambahkan')
    } catch (err: any) {
      console.error('Gagal menambah goods pricing:', err?.response?.data || err.message)
      alert(`Gagal menambah: ${err?.response?.data?.message || 'Terjadi kesalahan'}`)
    } finally {
      setSubmitting(false)
    }
  }

  const openEdit = (row: GoodsPricing) => {
    setEditing(row)
    setEditForm({
      transport_type: row.transport_type,
      departure_terminal_id: String(row.departure_terminal_id),
      arrival_terminal_id: String(row.arrival_terminal_id),
      price_per_kg: String(row.price_per_kg),
      commission_percentage: String(row.commission_percentage),
    })
  }

  const handleUpdate = async () => {
    if (!editing) return
    try {
      await axios.put(`http://localhost:3001/superadmin/goods-pricing/${editing.id}`, {
        transport_type: editForm.transport_type, // "Sendiri" | "Umum"
        departure_terminal_id: Number(editForm.departure_terminal_id),
        arrival_terminal_id: Number(editForm.arrival_terminal_id),
        price_per_kg: Number(editForm.price_per_kg),
        commission_percentage: Number(editForm.commission_percentage),
      })
      // refresh rows
      const gRes = await axios.get<GoodsPricing[]>('http://localhost:3001/superadmin/goods-pricing')
      setRows(gRes.data ?? [])
      setEditing(null)
      alert('Perubahan disimpan')
    } catch (e: any) {
      console.error(e)
      alert(`Gagal menyimpan perubahan: ${e?.response?.data?.message || 'Terjadi kesalahan'}`)
    }
  }

  const handleDelete = async (id: number) => {
    if (!confirm('Hapus tarif barang ini?')) return
    try {
      await axios.delete(`http://localhost:3001/superadmin/goods-pricing/${id}`)
      setRows((r) => r.filter((x) => x.id !== id))
      alert('Terhapus')
    } catch (e) {
      console.error(e)
      alert('Gagal menghapus')
    }
  }

  if (loading) return <div className="p-6">Memuat...</div>

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-8">
      <section>
        <h2 className="text-2xl font-bold mb-4">Tambah Tarif Barang</h2>
        <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
          <div>
            <Label>Jenis Transportasi</Label>
            <Select value={form.transport_type} onValueChange={(v) => handleFormChange('transport_type', v)}>
              <SelectTrigger>
                <SelectValue placeholder="Pilih Jenis Transportasi" />
              </SelectTrigger>
              <SelectContent>
                {transportOptions.map((opt) => (
                  <SelectItem key={opt.value} value={opt.value}>
                    {opt.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label>Terminal Keberangkatan</Label>
            <Select
              value={form.departure_terminal_id}
              onValueChange={(v) => handleFormChange('departure_terminal_id', v)}
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
              onValueChange={(v) => handleFormChange('arrival_terminal_id', v)}
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
            <Label>Harga per Kg</Label>
            <Input
              type="number"
              placeholder="Contoh: 2000"
              value={form.price_per_kg}
              onChange={(e) => handleFormChange('price_per_kg', e.target.value)}
            />
          </div>

          <div>
            <Label>Komisi (%)</Label>
            <Input
              type="number"
              placeholder="Contoh: 10"
              value={form.commission_percentage}
              onChange={(e) => handleFormChange('commission_percentage', e.target.value)}
            />
          </div>

          <div className="col-span-2">
            <Button type="submit" className="w-full" disabled={submitting}>
              {submitting ? 'Menyimpan...' : 'Simpan Tarif Barang'}
            </Button>
          </div>
        </form>
      </section>

      <section>
        <h3 className="text-xl font-semibold mb-3">Daftar Tarif Barang</h3>
        <div className="border rounded-md">
          <table className="w-full text-sm text-left">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-2">#</th>
                <th className="p-2">Jenis</th>
                <th className="p-2">Terminal Asal</th>
                <th className="p-2">Terminal Tujuan</th>
                <th className="p-2">Harga/Kg</th>
                <th className="p-2">Komisi (%)</th>
                <th className="p-2">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row, i) => (
                <tr key={row.id} className="border-t">
                  <td className="p-2">{i + 1}</td>
                  <td className="p-2">{row.transport_type}</td>
                  <td className="p-2">
                    {tmap.get(row.departure_terminal_id) ??
                      `${row.departure_terminal?.name ?? '-'} — ${row.departure_terminal?.regency_name ?? ''}`}
                  </td>
                  <td className="p-2">
                    {tmap.get(row.arrival_terminal_id) ??
                      `${row.arrival_terminal?.name ?? '-'} — ${row.arrival_terminal?.regency_name ?? ''}`}
                  </td>
                  <td className="p-2">Rp {row.price_per_kg.toLocaleString()}</td>
                  <td className="p-2">{row.commission_percentage}%</td>
                  <td className="p-2 flex gap-2">
                    <Pencil className="w-4 h-4 cursor-pointer text-blue-500" onClick={() => openEdit(row)} />
                    <Trash2 className="w-4 h-4 cursor-pointer text-red-500" onClick={() => handleDelete(row.id)} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Modal Edit */}
        {editing && (
          <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg p-4 w-[560px] shadow">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold">Edit Tarif Barang #{editing.id}</h3>
                <button onClick={() => setEditing(null)}><X className="w-5 h-5" /></button>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label>Jenis Transportasi</Label>
                  <Select
                    value={editForm.transport_type}
                    onValueChange={(v) => setEditForm((s: any) => ({ ...s, transport_type: v }))}
                  >
                    <SelectTrigger><SelectValue placeholder="Pilih jenis" /></SelectTrigger>
                    <SelectContent>
                      {transportOptions.map((opt) => (
                        <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label>Harga/Kg</Label>
                  <Input
                    value={editForm.price_per_kg}
                    onChange={(e) => setEditForm((s: any) => ({ ...s, price_per_kg: e.target.value }))}
                  />
                </div>

                <div>
                  <Label>Komisi (%)</Label>
                  <Input
                    value={editForm.commission_percentage}
                    onChange={(e) => setEditForm((s: any) => ({ ...s, commission_percentage: e.target.value }))}
                  />
                </div>

                <div>
                  <Label>Terminal Asal</Label>
                  <Select
                    value={editForm.departure_terminal_id}
                    onValueChange={(v) => setEditForm((s: any) => ({ ...s, departure_terminal_id: v }))}
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
                    value={editForm.arrival_terminal_id}
                    onValueChange={(v) => setEditForm((s: any) => ({ ...s, arrival_terminal_id: v }))}
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
      </section>
    </div>
  )
}
