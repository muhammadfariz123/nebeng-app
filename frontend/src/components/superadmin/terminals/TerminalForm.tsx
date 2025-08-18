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
import { terminalTypes, publicTerminalSubtypes } from "@/lib/data/terminalTypes";
import { Button } from "@/components/ui/button";

// tipe untuk API wilayah emsifa
interface Wilayah {
  id: string;
  name: string;
}

export default function TerminalForm() {
  const [type, setType] = useState<string>("Public");
  const [provinces, setProvinces] = useState<Wilayah[]>([]);
  const [regencies, setRegencies] = useState<Wilayah[]>([]);
  const [districts, setDistricts] = useState<Wilayah[]>([]);

  const [form, setForm] = useState<any>({
    name: "",
    terminal_type: "Public",
    public_terminal_subtype: null,
    province_id: "",
    regency_id: "",
    district_id: "",
    full_address: "",
    latitude: "",
    longitude: "",
  });

  // Fetch provinces
  useEffect(() => {
    axios
      .get<Wilayah[]>(
        "https://www.emsifa.com/api-wilayah-indonesia/api/provinces.json"
      )
      .then((res) => setProvinces(res.data));
  }, []);

  // Fetch regencies berdasarkan province_id
  useEffect(() => {
    if (form.province_id) {
      axios
        .get<Wilayah[]>(
          `https://www.emsifa.com/api-wilayah-indonesia/api/regencies/${form.province_id}.json`
        )
        .then((res) => setRegencies(res.data));
      setDistricts([]); // reset kecamatan kalau ganti provinsi
      setForm({ ...form, regency_id: "", district_id: "" });
    }
  }, [form.province_id]);

  // Fetch districts berdasarkan regency_id
  useEffect(() => {
    if (form.regency_id) {
      axios
        .get<Wilayah[]>(
          `https://www.emsifa.com/api-wilayah-indonesia/api/districts/${form.regency_id}.json`
        )
        .then((res) => setDistricts(res.data));
      setForm({ ...form, district_id: "" });
    }
  }, [form.regency_id]);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    await axios.post("http://localhost:3000/superadmin/terminals", form);
    alert("Terminal berhasil disimpan!");
    window.location.reload();
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <div>
        <Label>Nama Terminal</Label>
        <Input
          placeholder="Terminal Gambir"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
      </div>

      <div>
        <Label>Jenis Terminal</Label>
        <Select
          onValueChange={(val) => setForm({ ...form, terminal_type: val })}
          defaultValue={form.terminal_type}
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

      {form.terminal_type === "Public" && (
        <div>
          <Label>Sub-Jenis Terminal</Label>
          <Select
            onValueChange={(val) =>
              setForm({ ...form, public_terminal_subtype: val })
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Pilih subjenis" />
            </SelectTrigger>
            <SelectContent>
              {publicTerminalSubtypes.map((sub) => (
                <SelectItem key={sub} value={sub}>
                  {sub}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      )}

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

      <div>
        <Label>Alamat Lengkap</Label>
        <Input
          placeholder="Jl. Medan Merdeka Barat No.1, Jakarta"
          value={form.full_address}
          onChange={(e) => setForm({ ...form, full_address: e.target.value })}
        />
      </div>

      <div className="grid grid-cols-2 gap-2">
        <div>
          <Label>Latitude</Label>
          <Input
            placeholder="-6.1754"
            value={form.latitude}
            onChange={(e) => setForm({ ...form, latitude: e.target.value })}
          />
        </div>
        <div>
          <Label>Longitude</Label>
          <Input
            placeholder="106.8272"
            value={form.longitude}
            onChange={(e) => setForm({ ...form, longitude: e.target.value })}
          />
        </div>
      </div>

      <Button type="submit" className="mt-4">
        Simpan Terminal
      </Button>
    </form>
  );
}
