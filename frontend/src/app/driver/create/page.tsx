"use client"

import { useSearchParams } from "next/navigation";
import { useState } from "react";

const tebenganLabels: Record<string, string> = {
  motor: "Motor",
  mobil: "Mobil",
  barang: "Barang",
  "transportasi-umum": "Transportasi Umum"
};

export default function CreateTebengan() {
  const searchParams = useSearchParams();
  const type = searchParams.get("type") || "motor";
  const [form, setForm] = useState({
    asal: "",
    tujuan: "",
    waktu: "",
    harga: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simpan ke localStorage
    const newTebengan = {
      ...form,
      type,
      typeLabel: tebenganLabels[type]
    };
    const existing = localStorage.getItem("tebenganList");
    const list = existing ? JSON.parse(existing) : [];
    list.push(newTebengan);
    localStorage.setItem("tebenganList", JSON.stringify(list));
    // Kirim event ke dashboard
    window.dispatchEvent(new Event("tebenganCreated"));
    alert(`Tebengan ${tebenganLabels[type]} berhasil dibuat!`);
    // Optional: redirect ke dashboard
    window.location.href = "/driver";
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-8 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-center">Buat Tebengan {tebenganLabels[type]}</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1 font-semibold">Asal</label>
          <input type="text" name="asal" value={form.asal} onChange={handleChange} className="w-full border rounded px-3 py-2" required />
        </div>
        <div>
          <label className="block mb-1 font-semibold">Tujuan</label>
          <input type="text" name="tujuan" value={form.tujuan} onChange={handleChange} className="w-full border rounded px-3 py-2" required />
        </div>
        <div>
          <label className="block mb-1 font-semibold">Waktu Berangkat</label>
          <input type="datetime-local" name="waktu" value={form.waktu} onChange={handleChange} className="w-full border rounded px-3 py-2" required />
        </div>
        <div>
          <label className="block mb-1 font-semibold">Harga</label>
          <input type="number" name="harga" value={form.harga} onChange={handleChange} className="w-full border rounded px-3 py-2" required />
        </div>
        <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded font-bold hover:bg-blue-700 transition">Buat Tebengan</button>
      </form>
    </div>
  );
}
