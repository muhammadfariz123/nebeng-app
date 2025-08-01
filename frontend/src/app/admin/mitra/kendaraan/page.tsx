"use client";

import { useState } from "react";

const mitraKendaraan = [
  {
    id: 1,
    nama: "Christine Brooks",
    email: "ChristineBrooks@gmail.com",
    telp: "+62 812-3456-7890",
    perubahan: "Penambahan",
    status: "Belum diverifikasi",
  },
  {
    id: 2,
    nama: "Rosie Pearson",
    email: "RosiePearson@gmail.com",
    telp: "+62 813-4567-8901",
    perubahan: "Perubahan",
    status: "Terverifikasi",
  },
  {
    id: 3,
    nama: "Darrell Caldwell",
    email: "DarrellCaldwell@gmail.com",
    telp: "+62 814-5678-9012",
    perubahan: "Penambahan",
    status: "Terverifikasi",
  },
  {
    id: 4,
    nama: "Gilbert Johnston",
    email: "GilbertJohnston@gmail.com",
    telp: "+62 815-6789-0123",
    perubahan: "Penambahan",
    status: "Terverifikasi",
  },
  {
    id: 5,
    nama: "Alan Cain",
    email: "AlanCain@gmail.com",
    telp: "+62 816-7890-1234",
    perubahan: "Penambahan",
    status: "Belum diverifikasi",
  },
  {
    id: 6,
    nama: "Alfred Murray",
    email: "AlfredMurray@gmail.com",
    telp: "+62 817-8901-2345",
    perubahan: "Perubahan",
    status: "Terverifikasi",
  },
  {
    id: 7,
    nama: "Maggie Sullivan",
    email: "MaggieSullivan@gmail.com",
    telp: "+62 818-9012-3456",
    perubahan: "Perubahan",
    status: "Terverifikasi",
  },
  {
    id: 8,
    nama: "Rosie Todd",
    email: "RosieTodd@gmail.com",
    telp: "+62 819-0123-4567",
    perubahan: "Penambahan",
    status: "Belum diverifikasi",
  },
  {
    id: 9,
    nama: "Dollie Hines",
    email: "DollieHines@gmail.com",
    telp: "+62 820-1234-5678",
    perubahan: "Perubahan",
    status: "Terverifikasi",
  },
];

export default function MitraKendaraanPage() {
  const [filterStatus, setFilterStatus] = useState("");
  const [filterJenis, setFilterJenis] = useState("");
  const [selected, setSelected] = useState<number | null>(null);
  const [search, setSearch] = useState("");

  const filtered = mitraKendaraan.filter((m) => {
    const byStatus = filterStatus ? m.status === filterStatus : true;
    const byJenis = filterJenis ? m.perubahan === filterJenis : true;
    const bySearch = m.nama.toLowerCase().includes(search.toLowerCase());
    return byStatus && byJenis && bySearch;
  });

  return (
    <div className="p-6">
      <h1 className="mb-4 text-2xl font-bold text-gray-800">
        Ubah / Tambah Data Kendaraan Mitra
      </h1>

      <div className="flex flex-wrap gap-3 items-center mb-6">
        <select
          value={filterJenis}
          onChange={(e) => setFilterJenis(e.target.value)}
          className="border px-4 py-2 rounded-md text-sm text-gray-800"
        >
          <option value="">Filter: Jenis Perubahan</option>
          <option value="Penambahan">Penambahan</option>
          <option value="Perubahan">Perubahan</option>
        </select>
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="border px-4 py-2 rounded-md text-sm text-gray-800"
        >
          <option value="">Filter: Status Verifikasi</option>
          <option value="Terverifikasi">Terverifikasi</option>
          <option value="Belum diverifikasi">Belum diverifikasi</option>
        </select>
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Cari berdasarkan nama mitra..."
          className="border px-4 py-2 rounded-md text-sm w-64 text-gray-800"
        />
        <button
          onClick={() => {
            setFilterJenis("");
            setFilterStatus("");
            setSearch("");
          }}
          className="text-red-500 border border-red-300 px-4 py-2 rounded-md text-sm"
        >
          Reset Filter
        </button>
      </div>

      <div className="overflow-x-auto border rounded-md bg-white shadow">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-gray-700 font-semibold">
            <tr>
              <th className="px-4 py-3 text-left">No</th>
              <th className="px-4 py-3 text-left">Nama Mitra</th>
              <th className="px-4 py-3 text-left">Email</th>
              <th className="px-4 py-3 text-left">No. Telepon</th>
              <th className="px-4 py-3 text-left">Jenis Perubahan Kendaraan</th>
              <th className="px-4 py-3 text-left">Status Verifikasi</th>
              <th className="px-4 py-3 text-center">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((item, index) => (
              <>
                <tr key={item.id} className="hover:bg-gray-50 text-gray-800">
                  <td className="px-4 py-2">{index + 1}</td>
                  <td className="px-4 py-2">{item.nama}</td>
                  <td className="px-4 py-2">{item.email}</td>
                  <td className="px-4 py-2">{item.telp}</td>
                  <td className="px-4 py-2">{item.perubahan}</td>
                  <td className="px-4 py-2">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        item.status === "Terverifikasi"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {item.status}
                    </span>
                  </td>
                  <td className="px-4 py-2 text-center">
                    <button
                      className="text-blue-600 hover:underline text-sm"
                      onClick={() =>
                        setSelected(selected === item.id ? null : item.id)
                      }
                    >
                      {selected === item.id ? "Tutup" : "Detail"}
                    </button>
                  </td>
                </tr>
                {selected === item.id && (
                  <tr className="bg-blue-50 text-gray-800">
                    <td colSpan={7} className="px-4 py-4">
                      <div className="text-sm space-y-1">
                        <p>
                          <strong>Nama Mitra:</strong> {item.nama}
                        </p>
                        <p>
                          <strong>Email:</strong> {item.email}
                        </p>
                        <p>
                          <strong>No. Telepon:</strong> {item.telp}
                        </p>
                        <p>
                          <strong>Jenis Perubahan:</strong> {item.perubahan}
                        </p>
                        <p>
                          <strong>Status Verifikasi:</strong> {item.status}
                        </p>
                      </div>
                    </td>
                  </tr>
                )}
              </>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
