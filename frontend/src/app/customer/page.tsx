"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { RiMapPin2Fill, RiNotification3Line } from "react-icons/ri";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import axios from "axios";

interface Slider {
  id: number;
  slider_img: string;
  is_active: boolean;
}

interface Destination {
  id: number;
  title: string;
  destination_img: string;
  maps_url: string | null;
}

interface Customer {
  id: number;
  username: string;
  credit_amount: number;
}

export default function CustomerHomePage() {
  const router = useRouter();
  const [customer, setCustomer] = useState<Customer | null>(null);
  const [sliders, setSliders] = useState<Slider[]>([]);
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [current, setCurrent] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      // jika belum login arahkan ke /login
      router.push("/login");
      return;
    }

    // ✅ Ambil profil customer
    const fetchCustomer = async () => {
      try {
        const res = await axios.get<Customer>("http://localhost:3001/customer/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setCustomer(res.data);
      } catch (err) {
        console.error("Gagal fetch customer profile:", err);
      }
    };

    const fetchSliders = async () => {
      try {
        const res = await axios.get<Slider[]>("http://localhost:3001/sliders");
        setSliders(res.data.filter((s) => s.is_active));
      } catch (err) {
        console.error("Gagal fetch sliders:", err);
      }
    };

    const fetchDestinations = async () => {
      try {
        const res = await axios.get<Destination[]>("http://localhost:3001/popular-destinations");
        setDestinations(res.data);
      } catch (err) {
        console.error("Gagal fetch destinasi populer:", err);
      }
    };

    fetchCustomer();
    fetchSliders();
    fetchDestinations();
  }, [router]);

  // Auto slide
  useEffect(() => {
    if (sliders.length > 1) {
      intervalRef.current = setInterval(() => {
        setCurrent((prev) => (prev + 1) % sliders.length);
      }, 4000);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [sliders]);

  const nextSlide = () => setCurrent((p) => (p + 1) % sliders.length);
  const prevSlide = () => setCurrent((p) => (p - 1 + sliders.length) % sliders.length);

  const layanan = [
    { title: "Motor", img: "/icons/motor.svg", to: "/customer/motor", bg: "bg-green-100", imgClass: "w-8 h-12" },
    { title: "Mobil", img: "/icons/mobil.svg", to: "/customer/mobil", bg: "bg-blue-100", imgClass: "w-12 h-12" },
    { title: "Barang", img: "/icons/barang.svg", to: "/customer/barang", bg: "bg-yellow-100", imgClass: "w-12 h-12" },
    {
      title: <>Barang <br /> (Transportasi Umum)</>,
      img: "/icons/barang-umum.svg",
      to: "/customer/barang-umum",
      bg: "bg-red-100",
      imgClass: "w-12 h-8",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="relative h-48 bg-gradient-to-b from-blue-700 to-blue-500 rounded-b-3xl text-white px-6 pt-6 shadow-md overflow-hidden">
        <Image src="/bgprf.png" alt="Background Header" fill className="object-cover opacity-20" />

        <div className="relative z-10 flex justify-between items-start">
          <div>
            <p className="text-sm">Selamat Siang,</p>
            <h1 className="text-lg font-bold">
              {customer?.username ?? "Customer"}
            </h1>
          </div>
          <div
            className="w-10 h-10 bg-white/30 rounded-full flex items-center justify-center cursor-pointer"
            onClick={() => router.push("/customer/inbox")}
          >
            <RiNotification3Line className="w-6 h-6 text-gray-800" />
          </div>
        </div>

        <div className="absolute left-6 right-6 top-28 z-10">
          <div className="bg-white rounded-xl shadow p-4 flex items-center justify-between">
            <div className="text-gray-800 font-medium">Poin saya</div>
            <div className="text-red-500 font-bold text-xl">
              {customer?.credit_amount ?? 0}
            </div>
          </div>
        </div>
      </div>

      <div className="px-6 pt-20 space-y-6 pb-20">
        {/* Layanan */}
        <div className="text-center">
          <h3 className="text-xl font-semibold mb-2">Layanan</h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
            {layanan.map((item, i) => (
              <button
                key={i}
                onClick={() => router.push(item.to)}
                className="p-4 rounded-lg flex flex-col items-center hover:scale-105 transition-transform cursor-pointer"
              >
                <div
                  className={`rounded-full ${item.bg} flex items-center justify-center mb-5`}
                  style={{ width: 80, height: 80 }}
                >
                  <Image src={item.img} alt="icon" width={48} height={48} className={`object-contain ${item.imgClass}`} />
                </div>
                <span className="text-sm font-medium leading-tight text-center">{item.title}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Slider */}
        <div className="space-y-2">
          {sliders.length > 0 ? (
            <div className="relative w-full h-40 sm:h-56 md:h-64 lg:h-72 overflow-hidden rounded-xl shadow-md">
              <div
                className="flex h-full w-full transition-transform duration-700 ease-in-out"
                style={{ transform: `translateX(-${current * 100}%)` }}
              >
                {sliders.map((slide) => (
                  <div
                    key={slide.id}
                    className="relative w-full flex-shrink-0 cursor-pointer"
                    onClick={() => setPreview(`http://localhost:3001${slide.slider_img}`)}
                  >
                    <Image src={`http://localhost:3001${slide.slider_img}`} alt="Promo" fill className="object-cover" />
                  </div>
                ))}
              </div>
              {sliders.length > 1 && (
                <>
                  <button
                    onClick={prevSlide}
                    className="absolute left-3 top-1/2 -translate-y-1/2 bg-black/40 text-white p-2 rounded-full hover:bg-black/60"
                  >
                    ‹
                  </button>
                  <button
                    onClick={nextSlide}
                    className="absolute right-3 top-1/2 -translate-y-1/2 bg-black/40 text-white p-2 rounded-full hover:bg-black/60"
                  >
                    ›
                  </button>
                </>
              )}
            </div>
          ) : (
            <div className="w-full h-40 sm:h-56 md:h-64 lg:h-72 relative rounded-xl overflow-hidden shadow-md">
              <Image src="/promo1.png" alt="Default Promo" fill className="object-cover" />
            </div>
          )}
        </div>

        {/* Destinasi Populer */}
        <div className="space-y-2">
          <h2 className="text-base font-semibold">Tujuan Populer</h2>
          <p className="text-sm text-gray-500">Berikut adalah kota-kota yang populer!</p>
          <div className="grid grid-cols-2 gap-4 mt-2">
            {destinations.map((dest) => (
              <Card
                key={dest.id}
                onClick={() => dest.maps_url && window.open(dest.maps_url, "_blank")}
                className="overflow-hidden rounded-xl shadow-md transition-transform hover:scale-[1.02] cursor-pointer"
              >
                <div className="w-full h-28 relative">
                  <Image src={`http://localhost:3001${dest.destination_img}`} alt={dest.title} fill className="object-cover" />
                </div>
                <CardContent className="p-3 flex items-center gap-2">
                  <RiMapPin2Fill className="w-5 h-5 text-primary" />
                  <p className="text-sm font-medium">{dest.title}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Modal Preview */}
      {preview && (
        <div
          className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center cursor-zoom-out"
          onClick={() => setPreview(null)}
        >
          <div className="relative w-full h-full">
            <Image src={preview} alt="Preview" fill className="object-contain" priority />
          </div>
        </div>
      )}
    </div>
  );
}
