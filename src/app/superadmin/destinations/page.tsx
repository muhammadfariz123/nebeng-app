'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent } from '@/components/ui/card'

interface PopularDestination {
  id: number
  title: string
  destination_img: string
}

export default function PopularDestinationsPage() {
  const [destinations, setDestinations] = useState<PopularDestination[]>([])
  const [newTitle, setNewTitle] = useState('')
  const [newImage, setNewImage] = useState<File | null>(null)

  useEffect(() => {
    // Simulasi fetch data
    const dummy: PopularDestination[] = [
      { id: 1, title: 'Bandara Soekarno Hatta', destination_img: '/demo1.jpg' },
      { id: 2, title: 'Stasiun Gambir', destination_img: '/demo2.jpg' },
    ]
    setDestinations(dummy)
  }, [])

  const handleUpload = () => {
    if (!newTitle || !newImage) return alert('Lengkapi data!')
    console.log('Upload tujuan:', newTitle, newImage.name)
    // TODO: fetch POST ke backend
  }

  return (
    <div className="p-6 space-y-6">
      <h2 className="text-2xl font-bold">Kelola Tujuan Populer</h2>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {destinations.map((dest) => (
          <Card key={dest.id} className="overflow-hidden">
            <Image
              src={dest.destination_img}
              alt={dest.title}
              width={300}
              height={200}
              className="w-full h-[150px] object-cover"
            />
            <CardContent className="p-4">
              <p className="text-center font-medium text-sm">{dest.title}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="border-t pt-6">
        <h3 className="text-lg font-semibold mb-2">Tambah Tujuan Baru</h3>
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <Label>Nama Tujuan</Label>
            <Input
              placeholder="Contoh: Terminal Bungurasih"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
            />
          </div>
          <div className="flex-1">
            <Label>Upload Gambar</Label>
            <Input
              type="file"
              accept="image/*"
              onChange={(e) => setNewImage(e.target.files?.[0] || null)}
            />
          </div>
          <div className="flex items-end">
            <Button onClick={handleUpload}>Tambah</Button>
          </div>
        </div>
      </div>
    </div>
  )
}