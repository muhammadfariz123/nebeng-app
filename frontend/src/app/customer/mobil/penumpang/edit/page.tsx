"use client";

import { ArrowLeft } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

interface Passenger {
  name: string;
  idType: string;
  idNumber: string;
}

export default function EditPenumpangPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const index = parseInt(searchParams.get("index") || "0");

  const [passenger, setPassenger] = useState<Passenger>({
    name: "",
    idType: "KTP",
    idNumber: "",
  });

  useEffect(() => {
    const stored = localStorage.getItem("passengers");
    if (stored) {
      const passengers: Passenger[] = JSON.parse(stored);
      if (passengers[index]) {
        setPassenger(passengers[index]);
      }
    }
  }, [index]);

  const handleSave = () => {
    const stored = localStorage.getItem("passengers");
    if (stored) {
      const passengers: Passenger[] = JSON.parse(stored);
      passengers[index] = passenger;
      localStorage.setItem("passengers", JSON.stringify(passengers));
    }
    router.push("/customer/mobil/penumpang");
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header */}
      <div className="bg-white border-b px-4 pt-10 pb-4 flex items-center">
        <button onClick={() => router.back()}>
          <ArrowLeft className="w-5 h-5 text-gray-700" />
        </button>
        <h1 className="flex-1 text-center font-semibold text-base">
          Edit Penumpang
        </h1>
        <div className="w-5" />
      </div>

      {/* Form */}
      <div className="p-4 space-y-4">
        <div>
          <label className="text-xs text-gray-500">Nama Lengkap</label>
          <input
            type="text"
            value={passenger.name}
            onChange={(e) =>
              setPassenger({ ...passenger, name: e.target.value })
            }
            className="w-full border rounded-lg px-3 py-2 text-sm"
          />
        </div>

        <div>
          <label className="text-xs text-gray-500">Jenis ID</label>
          <select
            value={passenger.idType}
            onChange={(e) =>
              setPassenger({ ...passenger, idType: e.target.value })
            }
            className="w-full border rounded-lg px-3 py-2 text-sm"
          >
            <option value="KTP">KTP</option>
            <option value="KK">KK</option>
          </select>
        </div>

        <div>
          <label className="text-xs text-gray-500">Nomor ID</label>
          <input
            type="text"
            value={passenger.idNumber}
            onChange={(e) =>
              setPassenger({ ...passenger, idNumber: e.target.value })
            }
            className="w-full border rounded-lg px-3 py-2 text-sm"
          />
        </div>

        <button
          onClick={handleSave}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl text-sm"
        >
          Simpan
        </button>
      </div>
    </div>
  );
}
