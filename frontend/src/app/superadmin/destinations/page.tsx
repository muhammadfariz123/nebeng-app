'use client';

import Image from 'next/image';
import { useEffect, useMemo, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';

interface PopularDestination {
  id: number;
  title: string;
  destination_img: string;
  maps_url: string | null;
}

const BACKEND_URL =
  process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:3001';

export default function PopularDestinationsPage() {
  const [destinations, setDestinations] = useState<PopularDestination[]>([]);
  const [newTitle, setNewTitle] = useState('');
  const [newImage, setNewImage] = useState<File | null>(null);
  const [newMapsUrl, setNewMapsUrl] = useState('');
  const [loading, setLoading] = useState(false);

  const listUrl = useMemo(
    () => `${BACKEND_URL}/superadmin/popular-destinations`,
    []
  );
  const absoluteImg = (path: string) =>
    path.startsWith('http') ? path : `${BACKEND_URL}${path}`;

  useEffect(() => {
    const load = async () => {
      const res = await fetch(listUrl, { cache: 'no-store' });
      const data = await res.json();
      setDestinations(data);
    };
    load();
  }, [listUrl]);

  const handleUpload = async () => {
    if (!newTitle || !newImage) return alert('Lengkapi data!');
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('title', newTitle);
      if (newMapsUrl) formData.append('maps_url', newMapsUrl);
      formData.append('destination_img', newImage);

      const res = await fetch(listUrl, { method: 'POST', body: formData });
      if (!res.ok) throw new Error('Gagal upload');

      const created = await res.json();
      setDestinations((prev) => [created, ...prev]);
      setNewTitle('');
      setNewImage(null);
      setNewMapsUrl('');
    } catch (e: any) {
      alert(e.message || 'Upload gagal');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Yakin hapus?')) return;
    const res = await fetch(`${listUrl}/${id}`, { method: 'DELETE' });
    if (res.ok) {
      setDestinations((prev) => prev.filter((d) => d.id !== id));
    } else {
      alert('Gagal hapus');
    }
  };

  return (
    <div className="p-6 space-y-6">
      <h2 className="text-2xl font-bold">Kelola Tujuan Populer</h2>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {destinations.map((dest) => (
          <Card key={dest.id} className="overflow-hidden">
            <Image
              src={absoluteImg(dest.destination_img)}
              alt={dest.title}
              width={300}
              height={200}
              className="w-full h-[150px] object-cover"
            />
            <CardContent className="p-4 space-y-1">
              <p className="text-center font-medium text-sm">{dest.title}</p>
              {dest.maps_url && (
                <a
                  href={dest.maps_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-xs text-blue-600 underline text-center"
                >
                  Lihat di Maps
                </a>
              )}
              <Button
                variant="destructive"
                size="sm"
                className="mt-2 w-full"
                onClick={() => handleDelete(dest.id)}
              >
                Hapus
              </Button>
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
            <Label>Link Google Maps (opsional)</Label>
            <Input
              placeholder="https://maps.app.goo.gl/xxxx"
              value={newMapsUrl}
              onChange={(e) => setNewMapsUrl(e.target.value)}
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
            <Button onClick={handleUpload} disabled={loading}>
              {loading ? 'Mengunggah...' : 'Tambah'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
