"use client";

import { useState, useEffect } from "react";
import axios from "axios";
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
import { Button } from "@/components/ui/button";
import MapSelector from "@/components/MapSelector";

interface Wilayah {
  id: string;
  name: string;
}

interface NominatimResponse {
  lat: string;
  lon: string;
  display_name: string;
}

export default function TerminalForm() {
  const [provinces, setProvinces] = useState<Wilayah[]>([]);
  const [regencies, setRegencies] = useState<Wilayah[]>([]);
  const [districts, setDistricts] = useState<Wilayah[]>([]);

  const [form, setForm] = useState({
    name: "",
    terminal_type: "Public",
    public_terminal_subtype: "",
    province_id: "",
    regency_id: "",
    district_id: "",
    full_address: "",
    latitude: "",
    longitude: "",
  });

  const [mapCenter, setMapCenter] = useState<[number, number]>([
    -6.200000, 106.816666,
  ]);

  // Fetch Provinces
  useEffect(() => {
    axios
      .get<Wilayah[]>(
        "https://www.emsifa.com/api-wilayah-indonesia/api/provinces.json"
      )
      .then((res) => setProvinces(res.data));
  }, []);

  // Fetch Regencies
  useEffect(() => {
    if (!form.province_id) return;
    axios
      .get<Wilayah[]>(
        `https://www.emsifa.com/api-wilayah-indonesia/api/regencies/${form.province_id}.json`
      )
      .then((res) => {
        setRegencies(res.data);
        setDistricts([]);
        setForm((prev) => ({ ...prev, regency_id: "", district_id: "" }));
      });
  }, [form.province_id]);

  // Fetch Districts
  useEffect(() => {
    if (!form.regency_id) return;
    axios
      .get<Wilayah[]>(
        `https://www.emsifa.com/api-wilayah-indonesia/api/districts/${form.regency_id}.json`
      )
      .then((res) => {
        setDistricts(res.data);
        setForm((prev) => ({ ...prev, district_id: "" }));
      });
  }, [form.regency_id]);

  // Fetch koordinat dari Nominatim
  const fetchCoordinates = async (query: string) => {
    try {
      const res = await axios.get<NominatimResponse[]>(
        "https://nominatim.openstreetmap.org/search",
        {
          params: {
            q: query,
            format: "json",
            countrycodes: "id",
            limit: 1,
          },
        }
      );
      if (res.data && res.data.length > 0) {
        const { lat, lon } = res.data[0];
        setForm((prev) => ({ ...prev, latitude: lat, longitude: lon }));
        setMapCenter([parseFloat(lat), parseFloat(lon)]);
      }
    } catch (err) {
      console.error("Gagal ambil koordinat:", err);
    }
  };

  // Auto update map
  useEffect(() => {
    if (form.district_id) {
      const district = districts.find((d) => d.id === form.district_id)?.name;
      if (district) fetchCoordinates(district);
    } else if (form.regency_id) {
      const regency = regencies.find((r) => r.id === form.regency_id)?.name;
      if (regency) fetchCoordinates(regency);
    } else if (form.province_id) {
      const province = provinces.find((p) => p.id === form.province_id)?.name;
      if (province) fetchCoordinates(province);
    }
  }, [form.province_id, form.regency_id, form.district_id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const province =
      provinces.find((p) => p.id === form.province_id)?.name || "";
    const regency =
      regencies.find((r) => r.id === form.regency_id)?.name || "";
    const district =
      districts.find((d) => d.id === form.district_id)?.name || "";

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
      await axios.post("http://localhost:3001/superadmin/terminals", payload);
      alert("Terminal berhasil disimpan!");
      window.location.reload();
    } catch (err: any) {
      console.error("Error:", err.response?.data || err.message);
      alert("Gagal menyimpan terminal.");
    }
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      {/* Nama Terminal */}
      <div>
        <Label>Nama Terminal</Label>
        <Input
          placeholder="Terminal Gambir"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
      </div>

      {/* Jenis Terminal */}
      <div>
        <Label>Jenis Terminal</Label>
        <Select
          onValueChange={(val) => setForm({ ...form, terminal_type: val })}
          value={form.terminal_type}
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

      {/* Subjenis */}
      {form.terminal_type === "Public" && (
        <div>
          <Label>Sub-Jenis Terminal</Label>
          <Select
            onValueChange={(val) =>
              setForm({ ...form, public_terminal_subtype: val })
            }
            value={form.public_terminal_subtype}
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
          value={form.province_id}
        >
          <SelectTrigger>
            <SelectValue placeholder="Pilih provinsi" />
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
          value={form.regency_id}
          disabled={!form.province_id}
        >
          <SelectTrigger>
            <SelectValue placeholder="Pilih kabupaten/kota" />
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
          value={form.district_id}
          disabled={!form.regency_id}
        >
          <SelectTrigger>
            <SelectValue placeholder="Pilih kecamatan" />
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

      {/* Alamat */}
      <div>
        <Label>Alamat Lengkap</Label>
        <Input
          placeholder="Jl. Medan Merdeka Barat No.1, Jakarta"
          value={form.full_address}
          onChange={(e) => setForm({ ...form, full_address: e.target.value })}
        />
      </div>

      {/* Map */}
      <div className="mt-6 relative">
        <Label>Pilih Lokasi di Peta</Label>
        <div className="h-96 w-full rounded-lg border mt-2 relative z-0">
          <MapSelector
            center={mapCenter}
            onSelect={(lat, lng) =>
              setForm((prev) => ({ ...prev, latitude: lat, longitude: lng }))
            }
          />
        </div>
      </div>

      {/* Lat Long */}
      <div className="grid grid-cols-2 gap-2 mt-2">
        <div>
          <Label>Latitude</Label>
          <Input value={form.latitude} readOnly />
        </div>
        <div>
          <Label>Longitude</Label>
          <Input value={form.longitude} readOnly />
        </div>
      </div>

      <Button type="submit" className="mt-4">
        Simpan Terminal
      </Button>
    </form>
  );
}
