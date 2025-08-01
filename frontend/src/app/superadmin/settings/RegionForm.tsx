'use client'

import { useEffect, useState } from 'react'
import { Label } from '@/components/ui/label'
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

export default function RegionForm() {
  const [provinces, setProvinces] = useState([])
  const [regencies, setRegencies] = useState([])
  const [districts, setDistricts] = useState([])

  const [selectedProvince, setSelectedProvince] = useState('')
  const [selectedRegency, setSelectedRegency] = useState('')
  const [selectedDistrict, setSelectedDistrict] = useState('')

  const [fullAddress, setFullAddress] = useState('')

  // Simulasi Fetch
  useEffect(() => {
    fetch('/api/provinces')
      .then(res => res.json())
      .then(data => setProvinces(data))
  }, [])

  useEffect(() => {
    if (selectedProvince) {
      fetch(`/api/regencies?province_id=${selectedProvince}`)
        .then(res => res.json())
        .then(data => setRegencies(data))
    } else {
      setRegencies([])
      setDistricts([])
      setSelectedRegency('')
      setSelectedDistrict('')
    }
  }, [selectedProvince])

  useEffect(() => {
    if (selectedRegency) {
      fetch(`/api/districts?regency_id=${selectedRegency}`)
        .then(res => res.json())
        .then(data => setDistricts(data))
    } else {
      setDistricts([])
      setSelectedDistrict('')
    }
  }, [selectedRegency])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log({ selectedProvince, selectedRegency, selectedDistrict, fullAddress })
    // TODO: Kirim ke backend
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h2 className="text-lg font-semibold">Pengaturan Wilayah</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Provinsi */}
        <div>
          <Label htmlFor="province">Provinsi</Label>
          <Select value={selectedProvince} onValueChange={setSelectedProvince}>
            <SelectTrigger>
              <SelectValue placeholder="Pilih Provinsi" />
            </SelectTrigger>
            <SelectContent>
              {provinces.map((prov: any) => (
                <SelectItem key={prov.id} value={String(prov.id)}>
                  {prov.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Kabupaten/Kota */}
        <div>
          <Label htmlFor="regency">Kabupaten/Kota</Label>
          <Select value={selectedRegency} onValueChange={setSelectedRegency} disabled={!selectedProvince}>
            <SelectTrigger>
              <SelectValue placeholder="Pilih Kabupaten/Kota" />
            </SelectTrigger>
            <SelectContent>
              {regencies.map((reg: any) => (
                <SelectItem key={reg.id} value={String(reg.id)}>
                  {reg.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Kecamatan */}
        <div>
          <Label htmlFor="district">Kecamatan</Label>
          <Select value={selectedDistrict} onValueChange={setSelectedDistrict} disabled={!selectedRegency}>
            <SelectTrigger>
              <SelectValue placeholder="Pilih Kecamatan" />
            </SelectTrigger>
            <SelectContent>
              {districts.map((dist: any) => (
                <SelectItem key={dist.id} value={String(dist.id)}>
                  {dist.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Alamat Lengkap */}
        <div>
          <Label htmlFor="address">Alamat Lengkap</Label>
          <Input
            id="address"
            value={fullAddress}
            onChange={(e) => setFullAddress(e.target.value)}
            placeholder="Jalan, No. Rumah, RT/RW"
          />
        </div>
      </div>

      <Button type="submit" className="mt-4">Simpan Wilayah</Button>
    </form>
  )
}
