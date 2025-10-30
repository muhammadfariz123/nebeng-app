"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import {
  Home,
  Bus,
  Truck,
  CreditCard,
  Wallet,
  Star,
  Bell,
  User,
  LogOut,
  X,
  Menu,
} from "lucide-react";

const menu = [
  { href: "/driver", icon: Home, label: "Beranda" },
  { href: "/driver/cari-tebengan", icon: Bus, label: "Cari Tebengan" },
  { href: "/driver/items", icon: Truck, label: "Perjalanan Barang" },
  { href: "/driver/transactions", icon: CreditCard, label: "Transaksi" },
  { href: "/driver/komisi", icon: Wallet, label: "Komisi" },
  { href: "/driver/penarikan", icon: Wallet, label: "Penarikan" },
  { href: "/driver/ratings", icon: Star, label: "Ulasan & Rating" },
  { href: "/driver/notifications", icon: Bell, label: "Notifikasi" },
  { href: "/driver/profile", icon: User, label: "Profil Saya" },
];

export default function SidebarDriver() {
  const pathname = usePathname();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("driverId");
    localStorage.removeItem("nebeng_token");
    localStorage.removeItem("nebeng_user");
    router.push("/login");
  };

  // Tutup sidebar jika ukuran layar besar
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) setIsOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      {/* Tombol buka sidebar di mobile */}
      <button
        onClick={() => setIsOpen(true)}
        className="lg:hidden fixed top-4 left-4 z-50 bg-white p-2 rounded-md shadow-md hover:bg-gray-100"
      >
        <Menu className="w-6 h-6 text-gray-700" />
      </button>

      {/* Overlay mobile */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 bg-black bg-opacity-40 z-40 lg:hidden"
        />
      )}

      <aside
        className={cn(
          "fixed top-0 left-0 h-full w-64 bg-white border-r p-4 z-50 transform transition-transform duration-300 ease-in-out shadow-lg",
          isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        )}
      >
        {/* Tombol close di mobile */}
        <button
          onClick={() => setIsOpen(false)}
          className="absolute top-4 right-4 text-gray-500 hover:text-black lg:hidden"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Judul Sidebar */}
        <h2 className="text-xl font-bold mb-6 mt-8 lg:mt-0">Driver</h2>

        {/* Menu Navigasi */}
        <nav className="space-y-2">
          {menu.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className={cn(
                  "flex items-center px-4 py-2 rounded transition cursor-pointer",
                  isActive
                    ? "bg-blue-500 text-white font-semibold"
                    : "text-gray-700 hover:bg-gray-100"
                )}
              >
                <item.icon
                  className={cn(
                    "w-5 h-5 mr-3 transition-colors",
                    isActive ? "text-white" : "text-gray-500"
                  )}
                />
                {item.label}
              </Link>
            );
          })}

          {/* Tombol Logout */}
          <button
            onClick={handleLogout}
            className="w-full text-left flex items-center px-4 py-2 mt-6 rounded hover:bg-red-100 text-red-600 font-medium cursor-pointer"
          >
            <LogOut className="w-5 h-5 mr-3 transition-colors text-gray-500 hover:text-black" />
            Keluar
          </button>
        </nav>
      </aside>
    </>
  );
}
