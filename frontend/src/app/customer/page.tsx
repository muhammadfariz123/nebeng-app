"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { RiMapPin2Fill, RiNotification3Line } from "react-icons/ri";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";

interface Slider {
  id: number;
  slider_img: string;
  is_active: boolean;
}

interface Destination {
  id: number;
  title: string;
  destination_img: string;
  maps_url: string;
}

interface Customer {
  full_name: string;
  credit_amount: number;
}

export default function CustomerHomePage() {
  const router = useRouter();
  const [customer, setCustomer] = useState<Customer | null>(null);
  const [sliders, setSliders] = useState<Slider[]>([]);
  const [destinations, setDestinations] = useState<Destination[]>([]);

  useEffect(() => {
    setCustomer({
      full_name: "Nadya Amalya",
      credit_amount: 0,
    });

    setSliders([{ id: 1, slider_img: "/promo1.png", is_active: true }]);

    setDestinations([
      {
        id: 1,
        title: "Jakarta",
        destination_img: "/jakarta.jpg",
        maps_url: "https://maps.app.goo.gl/Pk6V8ydxcGJS7Brr6",
      },
      {
        id: 2,
        title: "Bandung",
        destination_img: "/bandung.jpg",
        maps_url: "https://maps.app.goo.gl/ZnPKQdyfF5ocM7DZ8",
      },
    ]);
  }, []);

  const layanan = [
    {
      title: "Motor",
      img: "/icons/motor.svg",
      to: "/customer/motor",
      bg: "bg-green-100",
      imgClass: "w-8 h-12",
    },
    {
      title: "Mobil",
      img: "/icons/mobil.svg",
      to: "/customer/mobil",
      bg: "bg-blue-100",
      imgClass: "w-12 h-12",
    },
    {
      title: "Barang",
      img: "/icons/barang.svg",
      to: "/customer/barang",
      bg: "bg-yellow-100",
      imgClass: "w-12 h-12",
    },
    {
      title: (
        <>
          Barang <br /> (Transportasi Umum)
        </>
      ),
      img: "/icons/barang-umum.svg",
      to: "/customer/barang-umum",
      bg: "bg-red-100",
      imgClass: "w-12 h-8",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header Welcome */}
      <div className="relative h-48 bg-gradient-to-b from-blue-700 to-blue-500 rounded-b-3xl text-white px-6 pt-6 shadow-md overflow-hidden">
        {/* Gambar Background */}
        <Image
          src="/bgprf.png"
          alt="Background Header"
          fill
          className="object-cover opacity-20"
        />

        <div className="relative z-10 flex justify-between items-start">
          <div>
            <p className="text-sm">Selamat Siang,</p>
            <h1 className="text-lg font-bold">
              {customer?.full_name ?? "Customer"}
            </h1>
          </div>
          {/* Klik lonceng untuk ke halaman inbox */}
          <div
            className="w-10 h-10 bg-white bg-opacity-30 rounded-full flex items-center justify-center cursor-pointer"
            onClick={() => router.push("/customer/inbox")}
          >
            <RiNotification3Line className="w-6 h-6 text-gray-800" />
          </div>
        </div>

        {/* Poin Box */}
        <div className="absolute left-6 right-6 top-28 z-10">
          <div className="bg-white rounded-xl shadow p-4 flex items-center justify-between">
            <div className="text-gray-800 font-medium">Poin saya</div>
            <div className="text-red-500 font-bold text-xl">
              {customer?.credit_amount}
            </div>
          </div>
        </div>
      </div>

      <div className="px-6 pt-20 space-y-6 pb-20">
        {/* Kategori Layanan */}
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
                  <Image
                    src={item.img}
                    alt="icon"
                    width={48}
                    height={48}
                    className={`object-contain ${item.imgClass}`}
                  />
                </div>
                <span className="text-sm font-medium leading-tight text-center">
                  {item.title}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Slider Full Gambar */}
        <div className="space-y-2">
          <div className="w-full h-40 sm:h-56 md:h-64 lg:h-72 relative rounded-xl overflow-hidden shadow-md">
            <Image
              src={sliders[0]?.slider_img || "/promo1.png"}
              alt="Promo"
              fill
              className="object-cover"
            />
          </div>
        </div>

        {/* Destinasi Populer */}
        <div className="space-y-2">
          <h2 className="text-base font-semibold">Tujuan Populer</h2>
          <p className="text-sm text-gray-500">
            Berikut adalah kota-kota yang populer!
          </p>
          <div className="grid grid-cols-2 gap-4 mt-2">
            {destinations.map((dest) => (
              <Card
                key={dest.id}
                onClick={() => window.open(dest.maps_url, "_blank")}
                className="overflow-hidden rounded-xl shadow-md transition-transform hover:scale-[1.02] cursor-pointer"
              >
                <div className="w-full h-28 relative">
                  <Image
                    src={dest.destination_img}
                    alt={dest.title}
                    fill
                    className="object-cover"
                  />
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
    </div>
  );
}
