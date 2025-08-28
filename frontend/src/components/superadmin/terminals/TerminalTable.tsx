"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { Pencil, Trash2, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  terminalTypes,
  publicTerminalSubtypes,
} from "@/lib/data/terminalTypes";

import dynamic from "next/dynamic";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { useMapEvents } from "react-leaflet";

// Map component dinamis (supaya aman di Next.js)
const MapContainer = dynamic(
  () => import("react-leaflet").then((mod) => mod.MapContainer),
  { ssr: false }
);
const TileLayer = dynamic(
  () => import("react-leaflet").then((mod) => mod.TileLayer),
  { ssr: false }
);
const Marker = dynamic(
  () => import("react-leaflet").then((mod) => mod.Marker),
  { ssr: false }
);

interface Wilayah {
  id: string;
  name: string;
}

export default function TerminalTable() {
  const [terminals, setTerminals] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Data wilayah
  const [provinces, setProvinces] = useState<Wilayah[]>([]);
  const [regencies, setRegencies] = useState<Wilayah[]>([]);
  const [districts, setDistricts] = useState<Wilayah[]>([]);

  // State untuk edit
  const [editing, setEditing] = useState<any | null>(null);
  const [form, setForm] = useState<any>({});

  // State alert
  const [alertMessage, setAlertMessage] = useState<string | null>(null);
  const [alertType, setAlertType] = useState<"success" | "error">("success");

  const subtypeLabel = (value: string | null) => {
    if (!value) return "-";
    const sub = publicTerminalSubtypes.find((s) => s.value === value);
    return sub ? sub.label : value;
  };

  const fetchTerminals = async () => {
    try {
      const res = await axios.get("http://localhost:3001/superadmin/terminals");
      setTerminals(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.error("Error fetching terminals:", err);
      setTerminals([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTerminals();
  }, []);

  // Fetch provinces ketika modal dibuka
  useEffect(() => {
    if (!editing) return;
    axios
      .get<Wilayah[]>(
        "https://www.emsifa.com/api-wilayah-indonesia/api/provinces.json"
      )
      .then((res) => setProvinces(res.data));
  }, [editing]);

  // Fetch regencies ketika pilih provinsi
  useEffect(() => {
    if (!form.province_id) return;
    axios
      .get<Wilayah[]>(
        `https://www.emsifa.com/api-wilayah-indonesia/api/regencies/${form.province_id}.json`
      )
      .then((res) => {
        setRegencies(res.data);
        setDistricts([]);
        setForm((prev: any) => ({ ...prev, regency_id: "", district_id: "" }));
      });
  }, [form.province_id]);

  // Fetch districts ketika pilih kabupaten
  useEffect(() => {
    if (!form.regency_id) return;
    axios
      .get<Wilayah[]>(
        `https://www.emsifa.com/api-wilayah-indonesia/api/districts/${form.regency_id}.json`
      )
      .then((res) => {
        setDistricts(res.data);
        setForm((prev: any) => ({ ...prev, district_id: "" }));
      });
  }, [form.regency_id]);

  // Delete
  const handleDelete = async (id: number) => {
    if (!confirm("Yakin mau hapus terminal ini?")) return;
    try {
      await axios.delete(`http://localhost:3001/superadmin/terminals/${id}`);
      setTerminals(terminals.filter((t) => t.id !== id));
      setAlertMessage("Terminal berhasil dihapus.");
      setAlertType("success");
    } catch (err) {
      console.error("Error deleting:", err);
      setAlertMessage("Gagal menghapus terminal.");
      setAlertType("error");
    }
  };

  // Edit
  const handleEdit = (terminal: any) => {
    setEditing(terminal);
    setForm({
      ...terminal,
      province_id: "",
      regency_id: "",
      district_id: "",
    });
  };

  const handleUpdate = async () => {
    const province =
      provinces.find((p) => p.id === form.province_id)?.name ||
      form.province_name;
    const regency =
      regencies.find((r) => r.id === form.regency_id)?.name ||
      form.regency_name;
    const district =
      districts.find((d) => d.id === form.district_id)?.name ||
      form.district_name;

    const payload = {
      name: form.name,
      terminal_type: form.terminal_type,
      public_terminal_subtype: form.public_terminal_subtype,
      province_name: province,
      regency_name: regency,
      district_name: district,
      full_address: form.full_address,
      latitude: form.latitude,
      longitude: form.longitude,
    };

    try {
      await axios.put(
        `http://localhost:3001/superadmin/terminals/${editing.id}`,
        payload
      );
      setEditing(null);
      fetchTerminals();
      setAlertMessage("Terminal berhasil diperbarui.");
      setAlertType("success");
    } catch (err) {
      console.error("Error updating:", err);
      setAlertMessage("Gagal memperbarui terminal.");
      setAlertType("error");
    }
  };

  // Komponen untuk klik peta
  const LocationPicker = ({ setForm }: { setForm: any }) => {
    useMapEvents({
      click(e: any) {
        const { lat, lng } = e.latlng;
        setForm((prev: any) => ({ ...prev, latitude: lat, longitude: lng }));
      },
    });
    return null;
  };

  if (loading) {
    return <p className="text-gray-500">Loading...</p>;
  }

  return (
    <div className="border rounded-lg overflow-hidden mt-6">
      {/* Alert */}
      {alertMessage && (
        <div
          className={`p-3 mb-4 text-sm rounded ${
            alertType === "success"
              ? "bg-green-100 text-green-700 border border-green-300"
              : "bg-red-100 text-red-700 border border-red-300"
          }`}
        >
          {alertMessage}
        </div>
      )}

      {/* Table */}
      <table className="w-full text-sm">
        <thead className="bg-gray-100 text-left">
          <tr>
            <th className="px-4 py-2">Nama</th>
            <th className="px-4 py-2">Jenis</th>
            <th className="px-4 py-2">Sub-Jenis</th>
            <th className="px-4 py-2">Provinsi</th>
            <th className="px-4 py-2">Kabupaten/Kota</th>
            <th className="px-4 py-2">Kecamatan</th>
            <th className="px-4 py-2">Alamat</th>
            <th className="px-4 py-2">Latitude</th>
            <th className="px-4 py-2">Longitude</th>
            <th className="px-4 py-2">Aksi</th>
          </tr>
        </thead>
        <tbody>
          {terminals.length > 0 ? (
            terminals.map((t) => (
              <tr key={t.id} className="border-t">
                <td className="px-4 py-2">{t.name || "-"}</td>
                <td className="px-4 py-2">{t.terminal_type || "-"}</td>
                <td className="px-4 py-2">
                  {subtypeLabel(t.public_terminal_subtype)}
                </td>
                <td className="px-4 py-2">{t.province_name || "-"}</td>
                <td className="px-4 py-2">{t.regency_name || "-"}</td>
                <td className="px-4 py-2">{t.district_name || "-"}</td>
                <td className="px-4 py-2">{t.full_address || "-"}</td>
                <td className="px-4 py-2">{t.latitude || "-"}</td>
                <td className="px-4 py-2">{t.longitude || "-"}</td>
                <td className="px-4 py-2 flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleEdit(t)}
                  >
                    <Pencil className="w-4 h-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => handleDelete(t.id)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={10} className="text-center text-gray-500 py-4">
                Tidak ada terminal
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Modal Edit */}
      {editing && (
        <div className="fixed inset-0 flex items-center justify-center p-6 bg-black/50 z-50">
          <div className="bg-white p-6 rounded-lg w-[600px] shadow-lg">
            <div className="flex justify-between mb-4">
              <h2 className="text-lg font-bold">Edit Terminal</h2>
              <button onClick={() => setEditing(null)}>
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 max-h-[80vh] overflow-y-auto">
              {/* Nama */}
              <div>
                <Label>Nama Terminal</Label>
                <Input
                  value={form.name || ""}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="Nama Terminal"
                />
              </div>

              {/* Jenis Terminal */}
              <div>
                <Label>Jenis Terminal</Label>
                <Select
                  onValueChange={(val) =>
                    setForm({ ...form, terminal_type: val })
                  }
                  value={form.terminal_type || ""}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Pilih jenis terminal" />
                  </SelectTrigger>
                  <SelectContent>
                    {terminalTypes.map((val) => (
                      <SelectItem key={val} value={val}>
                        {val}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Sub-Jenis */}
              {form.terminal_type === "Public" && (
                <div>
                  <Label>Sub-Jenis Terminal</Label>
                  <Select
                    onValueChange={(val) =>
                      setForm({ ...form, public_terminal_subtype: val })
                    }
                    value={form.public_terminal_subtype || ""}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Pilih subjenis" />
                    </SelectTrigger>
                    <SelectContent>
                      {publicTerminalSubtypes.map((sub) => (
                        <SelectItem key={sub.value} value={sub.value}>
                          {sub.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}

              {/* Wilayah */}
              <div>
                <Label>Provinsi</Label>
                <Select
                  onValueChange={(val) => setForm({ ...form, province_id: val })}
                  value={form.province_id || ""}
                >
                  <SelectTrigger>
                    <SelectValue
                      placeholder={form.province_name || "Pilih provinsi"}
                    />
                  </SelectTrigger>
                  <SelectContent>
                    {provinces.map((p) => (
                      <SelectItem key={p.id} value={p.id}>
                        {p.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label>Kabupaten/Kota</Label>
                <Select
                  onValueChange={(val) => setForm({ ...form, regency_id: val })}
                  value={form.regency_id || ""}
                  disabled={!form.province_id}
                >
                  <SelectTrigger>
                    <SelectValue
                      placeholder={form.regency_name || "Pilih kabupaten/kota"}
                    />
                  </SelectTrigger>
                  <SelectContent>
                    {regencies.map((r) => (
                      <SelectItem key={r.id} value={r.id}>
                        {r.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label>Kecamatan</Label>
                <Select
                  onValueChange={(val) => setForm({ ...form, district_id: val })}
                  value={form.district_id || ""}
                  disabled={!form.regency_id}
                >
                  <SelectTrigger>
                    <SelectValue
                      placeholder={form.district_name || "Pilih kecamatan"}
                    />
                  </SelectTrigger>
                  <SelectContent>
                    {districts.map((d) => (
                      <SelectItem key={d.id} value={d.id}>
                        {d.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Alamat & Koordinat */}
              <div>
                <Label>Alamat Lengkap</Label>
                <Input
                  value={form.full_address || ""}
                  onChange={(e) =>
                    setForm({ ...form, full_address: e.target.value })
                  }
                  placeholder="Alamat Lengkap"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <Label>Latitude</Label>
                  <Input
                    value={form.latitude || ""}
                    onChange={(e) =>
                      setForm({ ...form, latitude: e.target.value })
                    }
                    placeholder="-6.1754"
                  />
                </div>
                <div>
                  <Label>Longitude</Label>
                  <Input
                    value={form.longitude || ""}
                    onChange={(e) =>
                      setForm({ ...form, longitude: e.target.value })
                    }
                    placeholder="106.8272"
                  />
                </div>
              </div>

              {/* Peta */}
              <div className="h-64 w-full mt-3">
                <MapContainer
                  center={[
                    form.latitude ? parseFloat(form.latitude) : -6.1754,
                    form.longitude ? parseFloat(form.longitude) : 106.8272,
                  ]}
                  zoom={13}
                  className="h-full w-full rounded"
                >
                  <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                  {form.latitude && form.longitude && (
                    <Marker
                      position={[
                        parseFloat(form.latitude),
                        parseFloat(form.longitude),
                      ]}
                      icon={L.icon({
                        iconUrl:
                          "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
                        shadowUrl:
                          "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
                        iconAnchor: [12, 41],
                      })}
                    />
                  )}
                  <LocationPicker setForm={setForm} />
                </MapContainer>
              </div>
            </div>

            <div className="flex justify-end gap-2 mt-4">
              <Button variant="outline" onClick={() => setEditing(null)}>
                Batal
              </Button>
              <Button onClick={handleUpdate}>Simpan</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
