"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import Image from "next/image";

interface Slider {
  id: number;
  slider_img: string;
  is_active: boolean;
}

export default function SlidersPage() {
  const [sliders, setSliders] = useState<Slider[]>([]);
  const [newImage, setNewImage] = useState<File | null>(null);

  useEffect(() => {
    // TODO: Replace with fetch to backend API
    setSliders([
      { id: 1, slider_img: "/demo1.jpg", is_active: true },
      { id: 2, slider_img: "/demo2.jpg", is_active: false },
    ]);
  }, []);

  const handleUpload = () => {
    if (!newImage) return;
    // TODO: Upload image to server (API call)
    console.log("Uploading:", newImage);
  };

  const handleToggle = (id: number) => {
    const updated = sliders.map((s) =>
      s.id === id ? { ...s, is_active: !s.is_active } : s
    );
    setSliders(updated);
    // TODO: Sync with backend
  };

  return (
    <div className="p-6 space-y-6">
      <h2 className="text-2xl font-semibold">Kelola Slider Beranda</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {sliders.map((slider) => (
          <Card key={slider.id}>
            <CardContent className="p-2">
              <Image
                src={slider.slider_img}
                alt="slider"
                width={300}
                height={200}
                className="rounded w-full h-[200px] object-cover"
              />
              <div className="mt-2 flex justify-between items-center">
                <span className="text-sm">Aktif</span>
                <Switch
                  checked={slider.is_active}
                  onCheckedChange={() => handleToggle(slider.id)}
                />
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