"use client";

import { ArrowLeft, Pencil, Trash, Plus, ChevronDown } from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";

interface Passenger {
  name: string;
  idType: string;
  idNumber: string;
}

interface Driver {
  id: number;
  username: string;
  email?: string;
  phone?: string;
}

interface TebenganMobil {
  id: number;
  asal: string;
  tujuan: string;
  waktu: string; // ISO string
  harga: number;
  type: string;
  driverId: number;
  driver?: Driver;
  jumlahPenumpang?: number | null; // kapasitas mobil (nullable)
  kendaraan?: string; // optional nama kendaraan
}

export default function PesanMobilPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const idParam = searchParams.get("id"); // id tebengan (opsional)
  const penumpangQuery = searchParams.get("penumpang"); // optional fallback

  const [tebengan, setTebengan] = useState<TebenganMobil | null>(null);
  const [loadingTebengan, setLoadingTebengan] = useState<boolean>(!!idParam);
  const [errorTebengan, setErrorTebengan] = useState<string | null>(null);

  // passengers stored in localStorage (array of Passenger)
  const [passengers, setPassengers] = useState<Passenger[]>([]);

  // maximal allowed penumpang for current booking:
  // derived from (1) query param `penumpang` (if present)
  // (2) tebengan.jumlahPenumpang (if present), and always bounded by 4
  const computeMaxAllowed = (): number => {
    const q = penumpangQuery ? parseInt(penumpangQuery || "1") : NaN;
    const qValid = Number.isFinite(q) && q > 0 ? q : NaN;
    const tebCap = tebengan?.jumlahPenumpang
      ? Number(tebengan.jumlahPenumpang)
      : NaN;
    // candidates: qValid, tebCap, 4
    const candidates = [qValid, tebCap, 4].filter((n) => Number.isFinite(n) && n > 0) as number[];
    if (candidates.length === 0) return 4;
    return Math.min(...candidates);
  };

  const [maxAllowed, setMaxAllowed] = useState<number>(() => {
    const q = penumpangQuery ? parseInt(penumpangQuery || "1") : NaN;
    const qValid = Number.isFinite(q) && q > 0 ? q : NaN;
    const initial = Number.isFinite(qValid) ? Math.min(qValid, 4) : 4;
    return initial;
  });

  // Ambil detail tebengan bila ada id di query
  useEffect(() => {
    if (!idParam) {
      setLoadingTebengan(false);
      return;
    }

    const fetchDetail = async () => {
      setLoadingTebengan(true);
      setErrorTebengan(null);
      try {
        const res = await axios.get<TebenganMobil>(`http://localhost:3001/tebengan/${idParam}`);
        // backend mungkin mengembalikan jumlahPenumpang sebagai null/undefined
        setTebengan(res.data);
      } catch (err) {
        console.error("Gagal mengambil detail tebengan:", err);
        setErrorTebengan("Gagal memuat detail tebengan. Coba lagi nanti.");
      } finally {
        setLoadingTebengan(false);
      }
    };

    fetchDetail();
  }, [idParam]);

  // Update maxAllowed ketika tebengan atau query berubah
  useEffect(() => {
    setMaxAllowed(computeMaxAllowed());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tebengan, penumpangQuery]);

  // Ambil daftar penumpang dari localStorage pada mount
  useEffect(() => {
    const saved = localStorage.getItem("passengers");
    if (saved) {
      try {
        const parsed: Passenger[] = JSON.parse(saved);
        // only keep entries with non-empty fields
        const filtered = parsed.filter(
          (p) =>
            p &&
            typeof p.name === "string" &&
            p.name.trim() !== "" &&
            typeof p.idNumber === "string" &&
            p.idNumber.trim() !== ""
        );
        setPassengers(filtered.slice(0, maxAllowed));
      } catch {
        setPassengers([]);
      }
    } else {
      setPassengers([]);
    }
    // we want to re-run when maxAllowed changes to trim array if needed
  }, [maxAllowed]);

  // Whenever passengers change, persist to localStorage
  useEffect(() => {
    localStorage.setItem("passengers", JSON.stringify(passengers));
  }, [passengers]);

  // navigation helpers
  const goToEditPassenger = (index: number) => {
    router.push(`/customer/mobil/penumpang?page=edit&index=${index}`);
  };

  const handleDeletePassenger = (index: number) => {
    const updatedPassengers = [...passengers];
    updatedPassengers.splice(index, 1);
    setPassengers(updatedPassengers);
    localStorage.setItem("passengers", JSON.stringify(updatedPassengers));
  };

  const handleAddPassenger = () => {
    // allow adding only up to maxAllowed
    if (passengers.length >= maxAllowed) {
      alert(`Kapasitas maksimal penumpang adalah ${maxAllowed} orang.`);
      return;
    }
    const updatedPassengers = [
      ...passengers,
      { name: "", idType: "KTP", idNumber: "" },
    ];
    setPassengers(updatedPassengers);
    localStorage.setItem("passengers", JSON.stringify(updatedPassengers));
    // navigate to edit for the newly added passenger
    const newIndex = updatedPassengers.length - 1;
    router.push(`/customer/mobil/penumpang?page=edit&index=${newIndex}`);
  };

  // Shortcut: formatted tanggal/time display
  const formatTanggalKeberangkatan = (iso: string | undefined) => {
    if (!iso) return "-";
    const d = new Date(iso);
    return d.toLocaleDateString("id-ID", {
      weekday: "long",
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  };

  const formatJam = (iso: string | undefined) => {
    if (!iso) return "-";
    const d = new Date(iso);
    return d.toLocaleTimeString("id-ID", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // handle lanjut ke pembayaran: sertakan id tebengan jika ada
  const handleLanjutkan = () => {
    // simple validation: at least 1 passenger with name/id? not required but recommended
    // we'll allow proceeding; real validation can be added later
    const query: Record<string, string> = {};

    if (tebengan) {
      query["id"] = String(tebengan.id);
      query["asal"] = tebengan.asal;
      query["tujuan"] = tebengan.tujuan;
      query["waktu"] = tebengan.waktu;
      query["harga"] = String(tebengan.harga);
      query["mobil"] = tebengan.kendaraan ?? "";
      query["jumlahPenumpang"] = String(tebengan.jumlahPenumpang ?? maxAllowed);
    }
    // include number of passengers actually added
    query["penumpangCount"] = String(passengers.length);
    // push to pembayaran route
    const params = new URLSearchParams(query).toString();
    router.push(`/customer/mobil/pembayaran?${params}`);
  };

  // RENDER
  if (loadingTebengan) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500">
        Memuat detail tebengan...
      </div>
    );
  }

  if (errorTebengan) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-500 px-4 text-center">
        {errorTebengan}
      </div>
    );
  }

  // If no tebengan found and no id provided, fall back to showing a basic empty summary
  const displayedAsal = tebengan?.asal ?? "—";
  const displayedTujuan = tebengan?.tujuan ?? "—";
  const displayedWaktu = tebengan?.waktu ?? undefined;
  const displayedKendaraan = tebengan?.kendaraan ?? "Tidak diketahui";
  const displayedJumlahPenumpang = tebengan?.jumlahPenumpang ?? maxAllowed;

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      {/* Header + Background */}
      <div
        className="pt-10 pb-24 px-4 text-white relative"
        style={{
          backgroundImage: "url('/bg.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* Header */}
        <div className="flex items-center mb-5">
          <Link href={tebengan ? `/customer/mobil/hasil?dari=${encodeURIComponent(tebengan.asal)}&ke=${encodeURIComponent(tebengan.tujuan)}&tanggal=${encodeURIComponent(displayedWaktu ?? "")}` : "/customer/mobil/hasil"}>
            <ArrowLeft className="w-5 h-5 text-white" />
          </Link>
          <h1 className="flex-1 text-center font-semibold text-base">Pesan Mobil</h1>
          <div className="w-5" />
        </div>

        {/* Ringkasan Perjalanan */}
        <div
          onClick={() => {
            if (tebengan) router.push(`/customer/mobil/detail?id=${tebengan.id}`);
          }}
          className="bg-white text-gray-800 rounded-xl shadow p-4 space-y-1 cursor-pointer hover:bg-gray-50 transition"
        >
          <p className="text-xs text-gray-500">
            {formatTanggalKeberangkatan(displayedWaktu)} • {formatJam(displayedWaktu)}
          </p>
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold">
              {displayedAsal} → {displayedTujuan}
            </h2>
            <ChevronDown className="w-4 h-4 text-gray-500" />
          </div>
          <p className="text-xs">{displayedKendaraan}</p>
          <p className="text-xs">
            Kapasitas: {displayedJumlahPenumpang} orang • Ditawarkan:{" "}
            {tebengan ? `${tebengan.harga ? `Rp ${tebengan.harga.toLocaleString("id-ID")}` : "-"}` : "-"}
          </p>
        </div>
      </div>

      {/* Container Putih */}
      <div className="relative z-10 -mt-8 bg-gray-100 rounded-t-2xl px-4 flex-1 space-y-4 text-gray-800 pt-6 pb-6">
        {/* Detail Pemesanan */}
        <div className="bg-white rounded-xl p-4 space-y-3 shadow">
          <h3 className="text-sm font-semibold text-gray-800">Detail Pemesanan</h3>

          <div className="bg-gray-50 rounded-lg p-3 space-y-1">
            <p className="text-xs text-gray-500">Nama Driver</p>
            <p className="text-sm font-semibold">{tebengan?.driver?.username ?? "-"}</p>
          </div>

          <div className="bg-gray-50 rounded-lg p-3 space-y-1">
            <p className="text-xs text-gray-500">Email Driver</p>
            <p className="text-sm">{tebengan?.driver?.email ?? "-"}</p>
          </div>

          {tebengan?.driver?.phone && (
            <div className="bg-gray-50 rounded-lg p-3 space-y-1">
              <p className="text-xs text-gray-500">Nomor Telepon Driver</p>
              <p className="text-sm">{tebengan.driver.phone}</p>
            </div>
          )}
        </div>

        {/* Detail Penumpang */}
        <div className="bg-white rounded-xl p-4 space-y-3 shadow">
          <h3 className="text-sm font-semibold text-gray-800">Detail Penumpang</h3>

          {passengers.length === 0 ? (
            <p className="text-gray-500 text-sm">Belum ada penumpang yang ditambahkan</p>
          ) : (
            passengers.map((p, index) => (
              <div
                key={index}
                className="bg-gray-50 rounded-lg p-3 space-y-1 flex justify-between items-center"
              >
                <div>
                  <p className="text-sm font-semibold">{p.name || "Belum diisi"}</p>
                  <p className="text-xs text-gray-500">
                    {p.idType || "KTP"} - {p.idNumber || "Belum diisi"}
                  </p>
                </div>
                <div className="flex gap-3">
                  <button onClick={() => goToEditPassenger(index)}>
                    <Pencil className="w-4 h-4 text-gray-400" />
                  </button>
                  <button onClick={() => handleDeletePassenger(index)}>
                    <Trash className="w-4 h-4 text-red-500" />
                  </button>
                </div>
              </div>
            ))
          )}

          {/* Tombol Tambah Penumpang */}
          {passengers.length < maxAllowed && (
            <button
              onClick={handleAddPassenger}
              className="flex items-center justify-center gap-2 w-full py-3 border border-blue-600 text-blue-600 rounded-xl mt-3"
            >
              <Plus className="w-4 h-4" /> Tambah Penumpang
            </button>
          )}

          {passengers.length >= maxAllowed && (
            <p className="text-xs text-gray-500 mt-2">
              Maks. penumpang: {maxAllowed} orang. (Kapasitas tebengan)
            </p>
          )}
        </div>

        {/* Tombol Lanjutkan */}
        <button
          onClick={handleLanjutkan}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl text-sm"
        >
          Lanjutkan
        </button>
      </div>
    </div>
  );
}
