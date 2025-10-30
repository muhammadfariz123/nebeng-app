"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

interface Tebengan {
  id: number;
  asal: string;
  tujuan: string;
  waktu: string;
  harga: number;
  type: string;
  driverId: number;
}

interface Driver {
  id: number;
  username: string;
  email?: string;
  user_type: string;
}

export default function DriverDashboard() {
  const [tebenganList, setTebenganList] = useState<Tebengan[]>([]);
  const [driver, setDriver] = useState<Driver | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // ✅ Ambil profil driver dari backend menggunakan token JWT
  useEffect(() => {
    const fetchDriver = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          alert("Silakan login terlebih dahulu!");
          router.push("/login");
          return;
        }

        const res = await axios.get<Driver>("http://localhost:3001/driver/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (res.data.user_type !== "Driver") {
          alert("Akun ini bukan akun driver!");
          router.push("/");
          return;
        }

        setDriver(res.data);
      } catch (err) {
        console.error("Gagal mengambil profil driver:", err);
        alert("Sesi kamu berakhir, silakan login ulang.");
        router.push("/login");
      }
    };

    fetchDriver();
  }, [router]);

  // ✅ Ambil semua tebengan lalu filter sesuai driver login
  useEffect(() => {
    const fetchTebengan = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;

        const res = await axios.get<Tebengan[]>("http://localhost:3001/tebengan", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!driver) return;

        const data = res.data.filter((t) => String(t.driverId) === String(driver.id));
        setTebenganList(data);
      } catch (err) {
        console.error("Gagal mengambil data tebengan:", err);
      } finally {
        setLoading(false);
      }
    };

    if (driver) fetchTebengan();
  }, [driver]);

  // 🔹 Kelompokkan berdasarkan tipe
  const tebenganByType: Record<string, Tebengan[]> = {
    motor: [],
    mobil: [],
    barang: [],
    "transportasi-umum": [],
  };

  tebenganList.forEach((t) => {
    if (tebenganByType[t.type]) {
      tebenganByType[t.type].push(t);
    }
  });

  Object.keys(tebenganByType).forEach((key) => {
    tebenganByType[key].sort(
      (a, b) => new Date(a.waktu).getTime() - new Date(b.waktu).getTime()
    );
  });

  return (
    <div>
      {/* Header */}
      <div className="bg-blue-600 text-white rounded-lg mb-8 shadow-lg flex items-center justify-between">
        <div className="flex flex-col">
          <div className="p-5">
            <p>Selamat Pagi,</p>
            <h1 className="text-3xl font-bold">
              {driver ? driver.username : "Memuat..."}
            </h1>
          </div>

          <div className="flex justify-between items-center px-5 -mb-20">
            <div className="text-black bg-white p-5 w-full rounded-lg shadow-lg">
              <p className="text-xl">Pendapatan</p>
              <div className="text-4xl font-semibold mt-4">Rp 0</div>
            </div>
          </div>
        </div>
      </div>

      {/* Buat Tebengan */}
      <div className="text-center mb-8 pt-20">
        <h3 className="text-xl font-semibold mb-4 p-10">Buat Tebengan</h3>
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-8">
          <Link href="/driver/create?type=motor" className="p-4 rounded-lg flex flex-col items-center hover:bg-gray-50 transition">
            <div className="bg-green-100 text-white rounded-full p-5 px-8 mb-5 hover:shadow-xl hover:scale-105 transition-transform duration-300 ease-in-out">
              <img src="motor.png" alt="Motor" className="w-8 h-12" />
            </div>
            <span>Motor</span>
          </Link>
          <Link href="/driver/create?type=mobil" className="p-4 rounded-lg flex flex-col items-center hover:bg-gray-50 transition">
            <div className="bg-blue-100 text-white rounded-full p-5 mb-5 hover:shadow-xl hover:scale-105 transition-transform duration-300 ease-in-out">
              <img src="mobil.png" alt="Mobil" className="w-12 h-12" />
            </div>
            <span>Mobil</span>
          </Link>
          <Link href="/driver/create?type=barang" className="p-4 rounded-lg flex flex-col items-center hover:bg-gray-50 transition">
            <div className="bg-yellow-100 text-white rounded-full p-5 mb-5 hover:shadow-xl hover:scale-105 transition-transform duration-300 ease-in-out">
              <img src="barang.png" alt="Barang" className="w-12 h-12" />
            </div>
            <span>Barang</span>
          </Link>
          <Link href="/driver/create?type=transportasi-umum" className="p-4 rounded-lg flex flex-col items-center hover:bg-gray-50 transition">
            <div className="bg-red-100 text-white rounded-full p-5 py-7 mb-5 hover:shadow-xl hover:scale-105 transition-transform duration-300 ease-in-out">
              <img src="barang_tu.png" alt="Transportasi Umum" className="w-12 h-8" />
            </div>
            <span>Transportasi Umum</span>
          </Link>
        </div>

        {/* Daftar Tebengan Dibuat */}
        {loading ? (
          <p className="text-gray-500 mt-10">Memuat data...</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-6 mt-8">
            {Object.entries(tebenganByType).map(([key, list]) => (
              <div key={key} className="bg-gray-50 rounded-lg p-4 shadow">
                <h4 className="text-lg font-bold mb-4 text-center capitalize">
                  {key.replace("-", " ")}
                </h4>
                {list.length === 0 ? (
                  <div className="text-gray-400 text-center">
                    Belum ada tebengan
                  </div>
                ) : (
                  <div className="space-y-4">
                    {list.map((t) => (
                      <div
                        key={t.id}
                        className="border rounded-lg p-3 shadow flex flex-col items-start"
                      >
                        <div className="font-semibold">
                          {t.asal} → {t.tujuan}
                        </div>
                        <div className="text-sm text-gray-500">
                          {new Date(t.waktu).toLocaleString("id-ID")}
                        </div>
                        <div className="font-bold text-blue-600">
                          Rp {t.harga.toLocaleString("id-ID")}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
