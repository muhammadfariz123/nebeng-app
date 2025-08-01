import { Pencil, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function TerminalTable() {
  const terminals = [
    {
      id: 1,
      name: "Terminal Gambir",
      type: "Public",
      subtype: "Stasiun Kereta",
      address: "Jl. Medan Merdeka Timur No.1, Jakarta",
    },
    {
      id: 2,
      name: "Terminal Kampung Rambutan",
      type: "Public",
      subtype: "Terminal Bis",
      address: "Jl. Raya Bogor No.2, Jakarta Timur",
    },
  ];

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
          {terminals.map((t) => (
            <tr key={t.id} className="border-t">
              <td className="px-4 py-2">{t.name}</td>
              <td className="px-4 py-2">{t.type}</td>
              <td className="px-4 py-2">{t.subtype}</td>
              <td className="px-4 py-2">{t.address}</td>
              <td className="px-4 py-2 text-right space-x-2">
                <Button size="sm" variant="outline">
                  <Pencil size={16} />
                </Button>
                <Button size="sm" variant="destructive">
                  <Trash2 size={16} />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
