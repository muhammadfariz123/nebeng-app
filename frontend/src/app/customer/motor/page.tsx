"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import {
  ArrowLeft,
  ArrowUpCircle,
  MapPin,
  User2,
  Shuffle,
  Info,
  XCircle,
} from "lucide-react";
import { useEffect, useState } from "react";
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

interface Customer {
  id: number;
  username: string;
  credit_amount: number;
}

export default function MotorSearchPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [lokasiDari, setLokasiDari] = useState("Lokasi Anda");
  const [lokasiKe, setLokasiKe] = useState("Lokasi Tujuan");
  const [tanggal, setTanggal] = useState<string>("");
  const [tanggalTersedia, setTanggalTersedia] = useState<string[]>([]);
  const [customer, setCustomer] = useState<Customer | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  // Ambil profil customer dari token
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
      return;
    }

    const fetchCustomer = async () => {
      try {
        const res = await axios.get<Customer>("http://localhost:3001/customer/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setCustomer(res.data);
      } catch (err) {
        console.error("Gagal mengambil profil customer:", err);
        setCustomer(null);
      }
    };

    fetchCustomer();
  }, [router]);

  // Ambil parameter dari URL
  useEffect(() => {
    const dari = searchParams.get("dari");
    const ke = searchParams.get("ke");
    const tgl = searchParams.get("tanggal");

    if (dari) setLokasiDari(dari);
    if (ke) setLokasiKe(ke);
    if (tgl) setTanggal(tgl);
  }, [searchParams]);

  // Ambil tanggal tersedia berdasarkan asal & tujuan
  useEffect(() => {
    const fetchTanggal = async () => {
      if (
        !lokasiDari ||
        !lokasiKe ||
        lokasiDari === "Lokasi Anda" ||
        lokasiKe === "Lokasi Tujuan"
      ) {
        setTanggalTersedia([]);
        return;
      }
      try {
        const res = await axios.get<Tebengan[]>("http://localhost:3001/tebengan");
        const tebenganList = res.data.filter(
          (t) =>
            t.asal.toLowerCase() === lokasiDari.toLowerCase() &&
            t.tujuan.toLowerCase() === lokasiKe.toLowerCase() &&
            t.type === "motor"
        );
        const uniqueDates = Array.from(
          new Set(
            tebenganList.map(
              (t) => new Date(t.waktu).toISOString().split("T")[0]
            )
          )
        );
        setTanggalTersedia(uniqueDates);
        if (uniqueDates.length > 0 && !uniqueDates.includes(tanggal)) {
          setTanggal(uniqueDates[0]);
        }
      } catch (err) {
        console.error("Gagal mengambil tanggal tebengan:", err);
      }
    };
    fetchTanggal();
  }, [lokasiDari, lokasiKe]);

  // Tukar lokasi asal <-> tujuan
  const handleTukar = () => {
    const newDari = lokasiKe;
    const newKe = lokasiDari;
    setLokasiDari(newDari);
    setLokasiKe(newKe);
    router.replace(
      `/customer/motor?dari=${encodeURIComponent(newDari)}&ke=${encodeURIComponent(newKe)}&tanggal=${tanggal}`
    );
  };

  // Format tanggal ke bahasa Indonesia
  const formatTanggal = (tanggal: string) => {
    if (!tanggal) return "-";
    const date = new Date(tanggal);
    return date.toLocaleDateString("id-ID", {
      weekday: "short",
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  // Cari perjalanan
  const handleCari = async () => {
    if (
      !lokasiDari ||
      !lokasiKe ||
      lokasiDari === "Lokasi Anda" ||
      lokasiKe === "Lokasi Tujuan"
    ) {
      setModalMessage("Silakan pilih lokasi asal dan tujuan terlebih dahulu.");
      setShowModal(true);
      return;
    }
    try {
      const res = await axios.get<Tebengan[]>("http://localhost:3001/tebengan");
      const hasil = res.data.filter(
        (t) =>
          t.asal.toLowerCase() === lokasiDari.toLowerCase() &&
          t.tujuan.toLowerCase() === lokasiKe.toLowerCase() &&
          t.type === "motor"
      );
      if (hasil.length === 0) {
        setModalMessage(
          "Maaf, belum ada driver yang menyediakan rute ini. Silakan coba lokasi lain."
        );
        setShowModal(true);
        return;
      }
      router.push(
        `/customer/motor/hasil?dari=${encodeURIComponent(lokasiDari)}&ke=${encodeURIComponent(
          lokasiKe
        )}&tanggal=${tanggal}`
      );
    } catch (err) {
      console.error(err);
      setModalMessage("Terjadi kesalahan saat memeriksa data perjalanan.");
      setShowModal(true);
    }
  };

  return (
    <div className="min-h-screen bg-white relative">
      {/* Header */}
      <div className="bg-gradient-to-b from-blue-700 to-blue-500 text-white rounded-b-3xl pb-8 shadow-lg">
        <div className="px-6 pt-4 flex items-center">
          <Link
            href="/customer"
            className="text-white hover:bg-blue-600 p-2 rounded-full transition"
          >
            <ArrowLeft size={24} />
          </Link>
        </div>
        <div className="px-6 pt-2 text-center">
          <h1 className="text-2xl font-bold">Pilih Perjalanan Motor</h1>
          <p className="text-sm text-blue-100 mt-1">
            Temukan perjalanan yang sesuai dengan kebutuhanmu
          </p>
          <div className="mt-4">
            <p className="text-sm">Selamat Datang,</p>
            <h1 className="text-lg font-bold">
              {customer?.username ?? "Memuat..."}
            </h1>
          </div>
        </div>
      </div>

      {/* Form Pencarian */}
      <div className="mt-[-20px] px-6">
        <div className="bg-white rounded-xl shadow-lg p-5 space-y-5">
          <div className="bg-blue-50 border border-blue-200 text-blue-800 p-3 rounded-lg flex items-start gap-2 text-sm">
            <Info className="w-5 h-5 text-blue-600 mt-[2px]" />
            <p>
              Silakan pilih <strong>lokasi keberangkatan</strong> dan{" "}
              <strong>tujuan</strong>. Tanggal akan menyesuaikan dengan jadwal{" "}
              <strong>tebengan motor</strong> yang tersedia.
            </p>
          </div>

          {/* Lokasi Dari */}
          <div className="space-y-1">
            <label className="text-xs text-gray-500">Dari</label>
            <Link
              href={`/customer/motor/pilih-lokasi?tipe=dari&dari=${encodeURIComponent(
                lokasiDari
              )}&ke=${encodeURIComponent(
                lokasiKe
              )}&tanggal=${tanggal}`}
              className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50"
            >
              <div className="flex items-center gap-2 text-sm text-gray-700">
                <ArrowUpCircle className="text-green-600 w-5 h-5" />
                <span>{lokasiDari}</span>
              </div>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  handleTukar();
                }}
                className="p-2 hover:bg-gray-100 rounded-full transition"
              >
                <Shuffle className="w-4 h-4" />
              </button>
            </Link>
          </div>

          {/* Lokasi Ke */}
          <div className="space-y-1">
            <label className="text-xs text-gray-500">Ke</label>
            <Link
              href={`/customer/motor/pilih-lokasi?tipe=ke&dari=${encodeURIComponent(
                lokasiDari
              )}&ke=${encodeURIComponent(
                lokasiKe
              )}&tanggal=${tanggal}`}
              className="flex items-center gap-2 p-3 border rounded-lg text-sm text-gray-700 hover:bg-gray-100 transition"
            >
              <MapPin className="text-blue-600 w-5 h-5" />
              <span>{lokasiKe}</span>
            </Link>
          </div>

          {/* Tanggal */}
          <div className="space-y-1">
            <label className="text-xs text-gray-500">Tanggal berangkat</label>
            {tanggalTersedia.length > 0 ? (
              <select
                value={tanggal}
                onChange={(e) => setTanggal(e.target.value)}
                className="w-full p-3 border rounded-lg text-sm text-gray-700 bg-white"
              >
                {tanggalTersedia.map((tgl) => (
                  <option key={tgl} value={tgl}>
                    {formatTanggal(tgl)}
                  </option>
                ))}
              </select>
            ) : (
              <p className="text-sm text-gray-500 border rounded-lg p-3">
                Pilih lokasi terlebih dahulu
              </p>
            )}
          </div>

          {/* Nama Customer */}
          <div className="space-y-1">
            <label className="text-xs text-gray-500">Nama penumpang</label>
            <div className="flex items-center gap-2 p-3 border rounded-lg text-sm text-gray-700">
              <User2 className="text-blue-600 w-5 h-5" />
              <span>{customer?.username ?? "Memuat..."}</span>
            </div>
          </div>

          {/* Tombol Cari */}
          <button
            onClick={handleCari}
            className={`w-full mt-2 ${
              tanggal
                ? "bg-blue-600 hover:bg-blue-700"
                : "bg-gray-400 cursor-not-allowed"
            } text-white font-semibold rounded-full py-3 transition`}
          >
            Cari
          </button>
        </div>
      </div>

      {/* Modal Informasi */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 max-w-sm mx-4 shadow-lg text-center">
            <XCircle className="w-10 h-10 text-red-500 mx-auto mb-3" />
            <h2 className="text-lg font-semibold text-gray-800 mb-2">
              Informasi
            </h2>
            <p className="text-sm text-gray-600 mb-4">{modalMessage}</p>
            <button
              onClick={() => setShowModal(false)}
              className="bg-blue-600 text-white px-5 py-2 rounded-full text-sm hover:bg-blue-700 transition"
            >
              Oke
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
