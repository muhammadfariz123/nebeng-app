"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import Image from "next/image";
import axios from "axios";

interface Slider {
  id: number;
  slider_img: string;
  is_active: boolean;
}

export default function SlidersPage() {
  const [sliders, setSliders] = useState<Slider[]>([]);
  const [newImage, setNewImage] = useState<File | null>(null);

  // ✅ Ganti ke port backend NestJS
  const API_URL = "http://localhost:3001/sliders";

  useEffect(() => {
    fetchSliders();
  }, []);

  const fetchSliders = async () => {
    try {
      const res = await axios.get<Slider[]>(API_URL);
      setSliders(res.data);
    } catch (err) {
      console.error("Gagal fetch sliders:", err);
    }
  };

  const handleUpload = async () => {
    if (!newImage) return;
    const formData = new FormData();
    formData.append("file", newImage);

    await axios.post(API_URL, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    setNewImage(null);
    fetchSliders();
  };

  const handleToggle = async (id: number) => {
    await axios.post(`${API_URL}/${id}/toggle`);
    fetchSliders();
  };

  const handleDelete = async (id: number) => {
    await axios.delete(`${API_URL}/${id}`);
    fetchSliders();
  };

  return (
    <div className="p-6 space-y-6">
      <h2 className="text-2xl font-semibold">Kelola Slider Beranda</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {sliders.map((slider) => (
          <Card key={slider.id}>
            <CardContent className="p-2">
              <Image
                src={`http://localhost:3001${slider.slider_img}`} // ✅ backend port
                alt="slider"
                width={300}
                height={200}
                className="rounded w-full h-[200px] object-cover"
              />
              <div className="mt-2 flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <span className="text-sm">Aktif</span>
                  <Switch
                    checked={slider.is_active}
                    onCheckedChange={() => handleToggle(slider.id)}
                  />
                </div>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => handleDelete(slider.id)}
                >
                  Hapus
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-10 border-t pt-6">
        <h3 className="font-semibold mb-2">Tambah Slider Baru</h3>
        <div className="flex items-center gap-4">
          <Input
            type="file"
            accept="image/*"
            onChange={(e) => {
              if (e.target.files?.[0]) setNewImage(e.target.files[0]);
            }}
          />
          <Button onClick={handleUpload}>Upload</Button>
        </div>
      </div>
    </div>
  );
}
