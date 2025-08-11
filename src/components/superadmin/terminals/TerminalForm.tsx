"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { terminalTypes, publicTerminalSubtypes } from "@/lib/data/terminalTypes";
import { Button } from "@/components/ui/button";

export default function TerminalForm() {
  const [type, setType] = useState<string>("Public");

  return (
    <form className="space-y-4">
      <div>
        <Label>Nama Terminal</Label>
        <Input placeholder="Terminal Gambir" />
      </div>

      <div>
        <Label>Jenis Terminal</Label>
        <Select onValueChange={setType} defaultValue={type}>
          <SelectTrigger>
            <SelectValue placeholder="Pilih jenis terminal" />
          </SelectTrigger>
          <SelectContent>
            {terminalTypes.map((val) => (
              <SelectItem key={val} value={val}>{val}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {type === "Public" && (
        <div>
          <Label>Sub-Jenis Terminal</Label>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Pilih subjenis" />
            </SelectTrigger>
            <SelectContent>
              {publicTerminalSubtypes.map((sub) => (
                <SelectItem key={sub} value={sub}>{sub}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      )}

      <div>
        <Label>Alamat Lengkap</Label>
        <Input placeholder="Jl. Medan Merdeka Barat No.1, Jakarta" />
      </div>

      <div className="grid grid-cols-2 gap-2">
        <div>
          <Label>Latitude</Label>
          <Input placeholder="-6.1754" />
        </div>
        <div>
          <Label>Longitude</Label>
          <Input placeholder="106.8272" />
        </div>
      </div>

      {/* Simpan Button */}
      <Button type="submit" className="mt-4">Simpan Terminal</Button>
    </form>
  );
}
