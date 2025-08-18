"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { Pencil, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function TerminalTable() {
  const [terminals, setTerminals] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTerminals = async () => {
      try {
        const res = await axios.get("http://localhost:3000/superadmin/terminals");

        if (Array.isArray(res.data)) {
          setTerminals(res.data);
        } else {
          console.warn("Response bukan array:", res.data);
          setTerminals([]);
        }
      } catch (err) {
        console.error("Error fetching terminals:", err);
        setTerminals([]);
      } finally {
        setLoading(false);
      }
    };

    fetchTerminals();
  }, []);

  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`http://localhost:3000/superadmin/terminals/${id}`);
      setTerminals((prev) => prev.filter((t) => t.id !== id));
    } catch (err) {
      console.error("Gagal hapus terminal:", err);
    }
  };

  if (loading) {
    return <p className="text-gray-500">Loading...</p>;
  }

  return (
    <div className="border rounded-lg overflow-hidden mt-6">
      <table className="w-full text-sm">
        <thead className="bg-gray-100 text-left">
          <tr>
            <th className="px-4 py-2">Nama</th>
            <th className="px-4 py-2">Jenis</th>
            <th className="px-4 py-2">Sub-Jenis</th>
            <th className="px-4 py-2">Alamat</th>
            <th className="px-4 py-2 text-right">Aksi</th>
          </tr>
        </thead>
        <tbody>
          {terminals.length > 0 ? (
            terminals.map((t) => (
              <tr key={t.id} className="border-t">
                <td className="px-4 py-2">{t.name}</td>
                <td className="px-4 py-2">{t.terminal_type}</td>
                <td className="px-4 py-2">{t.public_terminal_subtype || "-"}</td>
                <td className="px-4 py-2">{t.full_address}</td>
                <td className="px-4 py-2 text-right space-x-2">
                  <Button size="sm" variant="outline">
                    <Pencil size={16} />
                  </Button>
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => handleDelete(t.id)}
                  >
                    <Trash2 size={16} />
                  </Button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={5} className="text-center text-gray-500 py-4">
                Tidak ada terminal
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
