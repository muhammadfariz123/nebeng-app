'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

interface CustomerProfile {
  full_name: string
  telephone: string
  full_address: string
  profile_img: string
  credit_amount: number
  verified: boolean
  id_card_number?: string
  id_card_fullname?: string
  id_card_birtdate?: string
}

export default function ProfilePage() {
  const [profile, setProfile] = useState<CustomerProfile | null>(null)

  useEffect(() => {
    // Dummy data (replace with real API call)
    setProfile({
      full_name: 'Kevin Jonathan',
      telephone: '081234567890',
      full_address: 'Jl. Melati No. 10, Bekasi',
      profile_img: '/avatar-placeholder.png',
      credit_amount: 120000,
      verified: true,
      id_card_number: '320105XXXXXXXXXX',
      id_card_fullname: 'Kevin Jonathan',
      id_card_birtdate: '2000-05-17'
    })
  }, [])

  if (!profile) return <div className="p-6">Memuat data profil...</div>

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Profil Saya</h1>

      <Card>
        <CardContent className="flex flex-col md:flex-row gap-6 p-6 items-start">
          <div>
            <Image
              src={profile.profile_img}
              alt="Profile Image"
              width={120}
              height={120}
              className="rounded-full border"
            />
            <p className={`mt-2 text-sm font-medium ${profile.verified ? 'text-green-600' : 'text-yellow-600'}`}>
              {profile.verified ? 'Terverifikasi' : 'Belum Terverifikasi'}
            </p>
          </div>

          <div className="w-full space-y-4">
            <div>
              <Label>Nama Lengkap</Label>
              <Input value={profile.full_name} readOnly />
            </div>
            <div>
              <Label>Nomor Telepon</Label>
              <Input value={profile.telephone} readOnly />
            </div>
            <div>
              <Label>Alamat Lengkap</Label>
              <Input value={profile.full_address} readOnly />
            </div>
            <div>
              <Label>Kredit Tersedia</Label>
              <Input value={`Rp ${profile.credit_amount.toLocaleString('id-ID')}`} readOnly />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6 space-y-4">
          <h2 className="font-semibold text-lg">Data KTP</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <Label>Nomor KTP</Label>
              <Input value={profile.id_card_number || '-'} readOnly />
            </div>
            <div>
              <Label>Nama di KTP</Label>
              <Input value={profile.id_card_fullname || '-'} readOnly />
            </div>
            <div>
              <Label>Tanggal Lahir</Label>
              <Input value={profile.id_card_birtdate || '-'} readOnly />
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="text-right">
        <Button variant="default">Edit Profil</Button>
      </div>
    </div>
  )
}
