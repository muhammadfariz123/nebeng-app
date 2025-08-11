'use client';

import { useEffect, useRef, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';

export default function PilihPenumpangPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Query parameter dari halaman sebelumnya
  const dari = searchParams.get('dari') || '';
  const ke = searchParams.get('ke') || '';
  const tanggal = searchParams.get('tanggal') || '';

  // Konfigurasi angka 1–10 untuk pilihan penumpang
  const options = Array.from({ length: 10 }, (_, i) => i + 1);
  const [selected, setSelected] = useState(1);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Scroll ke angka default saat pertama kali render
  useEffect(() => {
    const itemHeight = 48;
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top: (selected - 1) * itemHeight,
        behavior: 'auto',
      });
    }
  }, []);

  // Deteksi angka yang sedang di tengah scroll
  const handleScroll = () => {
    const itemHeight = 48;
    if (scrollRef.current) {
      const scrollTop = scrollRef.current.scrollTop;
      const index = Math.round(scrollTop / itemHeight);
      setSelected(options[index]);
    }
  };

  // Navigasi kembali ke halaman mobil dengan pilihan penumpang
  const handleSelesai = () => {
    router.push(
      `/customer/mobil?dari=${encodeURIComponent(dari)}&ke=${encodeURIComponent(ke)}&tanggal=${tanggal}&penumpang=${selected}`
    );
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header */}
      <div className="p-4 flex items-center gap-3 border-b">
        <button
          onClick={() => router.back()}
          className="p-2 rounded-full hover:bg-gray-100 transition"
        >
          <ArrowLeft />
        </button>
        <h1 className="text-base font-semibold">Tambah Penumpang</h1>
      </div>

      {/* Konten utama */}
      <div className="flex flex-col items-center justify-center flex-1 px-6 relative">
        <h2 className="text-lg font-semibold mb-1">Jumlah</h2>
        <p className="text-sm text-gray-500 mb-6">Jumlah penumpang</p>

        {/* Scroll Picker */}
        <div className="relative h-48 w-full flex items-center justify-center">
          {/* Highlight angka aktif */}
          <div className="absolute top-1/2 left-1/2 w-12 h-12 -translate-x-1/2 -translate-y-1/2 bg-blue-100 rounded-full z-10 pointer-events-none flex items-center justify-center font-bold text-blue-600 text-lg">
            {selected}
          </div>

          {/* List angka scrollable */}
          <div
            ref={scrollRef}
            onScroll={handleScroll}
            className="overflow-y-scroll snap-y snap-mandatory h-48 w-full px-24 py-2 scrollbar-hide"
          >
            <div className="flex flex-col items-center space-y-2">
              {options.map((num) => (
                <div
                  key={num}
                  className="h-12 flex items-center justify-center w-full text-lg text-gray-400 snap-center"
                >
                  {num}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Tombol SELESAI */}
      <div className="p-4">
        <button
          onClick={handleSelesai}
          className="w-full bg-blue-600 text-white rounded-full py-3 font-semibold hover:bg-blue-700 transition"
        >
          SELESAI
        </button>
      </div>
    </div>
  );
}
