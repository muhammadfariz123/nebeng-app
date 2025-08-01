'use client'

import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useState } from 'react'

export default function FilterPanel() {
  const [search, setSearch] = useState('')

  return (
    <div className="flex flex-wrap gap-4 items-end">
      <div>
        <label>Status Pembayaran</label>
        <Select>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Pilih Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Pending">Pending</SelectItem>
            <SelectItem value="Diterima">Diterima</SelectItem>
            <SelectItem value="Ditolak">Ditolak</SelectItem>
            <SelectItem value="Credited">Credited</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <label>Cari Customer</label>
        <Input
          type="text"
          placeholder="Nama customer"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
    </div>
  )
}