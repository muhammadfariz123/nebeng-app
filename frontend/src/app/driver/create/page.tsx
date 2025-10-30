"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import axios from "axios";

type Driver = {
  id: number;
  username: string;
  email?: string;
  user_type?: string;
};

const tebenganLabels: Record<string, string> = {
  motor: "Motor",
  mobil: "Mobil",
  barang: "Barang",
  "transportasi-umum": "Transportasi Umum",
};

export default function CreateTebengan() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const type = searchParams.get("type") || "motor";

  const [form, setForm] = useState({
    asal: "",
    tujuan: "",
    waktu: "",
    harga: "",
  });

  const [driver, setDriver] = useState<Driver | null>(null);
  const [loading, setLoading] = useState(false);

  // 🔹 Ambil data driver berdasarkan token yang tersimpan
  useEffect(() => {
    const fetchDriverProfile = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          alert("Anda belum login!");
          router.push("/login");
          return;
        }

        // ✅ Ambil data driver dari backend (autentikasi JWT)
        const res = await axios.get<Driver>("http://localhost:3001/driver/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setDriver(res.data);
      } catch (error) {
        console.error("Gagal memuat profil driver:", error);
        alert("Sesi login sudah berakhir, silakan login ulang.");
        router.push("/login");
      }
    };

    fetchDriverProfile();
  }, [router]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!driver) {
      alert("Data driver belum tersedia!");
      return;
    }

    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("Token tidak ditemukan, silakan login kembali.");
        router.push("/login");
        return;
      }

      await axios.post(
        "http://localhost:3001/tebengan",
        {
          ...form,
          type,
          driverId: driver.id,
          driverName: driver.username, // ✅ Nama diambil dari data driver
          waktu: new Date(form.waktu),
          harga: Number(form.harga),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert(`Tebengan ${tebenganLabels[type]} berhasil dibuat oleh ${driver.username}! 🚀`);
      router.push("/driver");
    } catch (error) {
      console.error("Gagal membuat tebengan:", error);
      alert("Terjadi kesalahan saat membuat tebengan. Coba lagi nanti.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-8 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-center">
        Buat Tebengan {tebenganLabels[type]}
      </h2>

      {driver && (
        <p className="text-center text-gray-500 mb-4">
          👤 Dibuat oleh: <b>{driver.username}</b>
        </p>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1 font-semibold">Asal</label>
          <input
            type="text"
            name="asal"
            value={form.asal}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-semibold">Tujuan</label>
          <input
            type="text"
            name="tujuan"
            value={form.tujuan}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-semibold">Waktu Berangkat</label>
          <input
            type="datetime-local"
            name="waktu"
            value={form.waktu}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-semibold">Harga</label>
          <input
            type="number"
            name="harga"
            value={form.harga}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`w-full ${
            loading ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"
          } text-white py-2 rounded font-bold transition`}
        >
          {loading ? "Membuat..." : "Buat Tebengan"}
        </button>
      </form>
    </div>
  );
}
