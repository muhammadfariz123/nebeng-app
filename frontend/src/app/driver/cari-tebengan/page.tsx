"use client";


import { JSX, useEffect, useMemo, useState } from "react";
import {
  CarFront,
  Bike,
  Package,
  Bus,
  Clock,
  MapPin,
  Users,
  ChevronRight,
  Info,
} from "lucide-react";

type RideType = "mobil" | "motor" | "barang" | "tu";
type Ride = {
  id: string;
  code: string;
  type: RideType;
  title: string;
  from: string;
  to: string;
  paxLabel: string;
  sizeLabel?: string;
  dateISO: string; // start datetime
};

const MOCK: Ride[] = [
  // Hari ini
  {
    id: "1",
    code: "ZVH33ED",
    type: "barang",
    title: "Nebeng Barang",
    from: "YOG POS 2",
    to: "SOLO POS 1",
    paxLabel: "1 Barang Besar",
    dateISO: new Date(Date.now() + 4.5 * 60 * 60 * 1000).toISOString(), // +4.5 jam
  },
  // 18 Sep
  {
    id: "2",
    code: "BNT32CH",
    type: "mobil",
    title: "Nebeng Mobil",
    from: "SOLO POS 1",
    to: "YOG POS 2",
    paxLabel: "2 Penumpang",
    dateISO: new Date("2024-09-18T07:00:00").toISOString(),
  },
  // 24 Sep
  {
    id: "3",
    code: "UVH21HY",
    type: "motor",
    title: "Nebeng Motor",
    from: "SOLO POS 2",
    to: "YOG POS 2",
    paxLabel: "1 Penumpang",
    dateISO: new Date("2024-09-24T09:00:00").toISOString(),
  },
  // 30 Sep
  {
    id: "4",
    code: "JKU21UH",
    type: "tu",
    title: "Nebeng Barang (Transportasi Umum)",
    from: "YOG POS 2",
    to: "SOLO POS 1",
    paxLabel: "1 Barang Besar",
    dateISO: new Date("2024-09-30T09:00:00").toISOString(),
  },
];

const typeMeta: Record<
  RideType,
  { label: string; icon: JSX.Element; dot: string; bg: string }
> = {
  mobil: {
    label: "Mobil",
    icon: <CarFront className="w-5 h-5 text-blue-600" />,
    dot: "bg-blue-100",
    bg: "bg-blue-50",
  },
  motor: {
    label: "Motor",
    icon: <Bike className="w-5 h-5 text-indigo-600" />,
    dot: "bg-indigo-100",
    bg: "bg-indigo-50",
  },
  barang: {
    label: "Barang",
    icon: <Package className="w-5 h-5 text-amber-600" />,
    dot: "bg-amber-100",
    bg: "bg-amber-50",
  },
  tu: {
    label: "Barang (Transportasi Umum)",
    icon: <Bus className="w-5 h-5 text-rose-600" />,
    dot: "bg-rose-100",
    bg: "bg-rose-50",
  },
};

function chipClass(active: boolean) {
  return [
    "px-4 py-2 rounded-full border",
    active
      ? "bg-blue-600 text-white border-blue-600"
      : "bg-white text-gray-700 border-gray-200 hover:bg-gray-50",
    "transition",
  ].join(" ");
}

function Badge({ children, tone = "gray" }: { children: React.ReactNode; tone?: "gray" | "orange" | "blue" }) {
  const style =
    tone === "orange"
      ? "bg-orange-50 text-orange-600 border-orange-200"
      : tone === "blue"
        ? "bg-blue-50 text-blue-600 border-blue-200"
        : "bg-gray-50 text-gray-600 border-gray-200";
  return (
    <span className={`text-xs px-2.5 py-1 rounded-full border ${style}`}>{children}</span>
  );
}

function daysDiff(fromISO: string) {
  const a = new Date(fromISO);
  const now = new Date();
  const one = 1000 * 60 * 60 * 24;
  return Math.ceil((a.setHours(0, 0, 0, 0) - now.setHours(0, 0, 0, 0)) / one);
}

function formatDateLabel(dateISO: string) {
  const d = new Date(dateISO);
  const hari = d.toLocaleDateString("id-ID", { weekday: "long" });
  const tgl = d.toLocaleDateString("id-ID", { day: "2-digit", month: "long", year: "numeric" });
  const jam = d.toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" });
  const end = new Date(d.getTime() + 90 * 60 * 1000).toLocaleTimeString("id-ID", {
    hour: "2-digit",
    minute: "2-digit",
  });
  return `${hari}, ${tgl.split(" ")[0]} ${tgl.split(" ")[1]} jam ${jam} - ${end}`;
}

function Countdown({ target }: { target: string }) {
  const [text, setText] = useState("--:--:--");
  useEffect(() => {
    const tick = () => {
      const diff = new Date(target).getTime() - Date.now();
      if (diff <= 0) return setText("00:00:00");
      const h = Math.floor(diff / 3_600_000);
      const m = Math.floor((diff % 3_600_000) / 60_000);
      const s = Math.floor((diff % 60_000) / 1000);
      const pad = (n: number) => String(n).padStart(2, "0");
      setText(`${pad(h)}:${pad(m)}:${pad(s)}`);
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [target]);
  return (
    <div className="flex items-center gap-1 text-rose-600">
      <Clock className="w-4 h-4" />
      <span className="text-sm font-medium">{text}</span>
    </div>
  );
}

export default function UpcomingRides() {
  const [tab, setTab] = useState<"semua" | RideType>("semua");

  const grouped = useMemo(() => {
    // filter
    const list =
      tab === "semua" ? MOCK : MOCK.filter((r) => r.type === tab);

    // group by day label
    const groups: Record<string, Ride[]> = {};
    for (const r of list) {
      const d = new Date(r.dateISO);
      const today = new Date();
      const isToday =
        d.toDateString() === today.toDateString();
      const key = isToday
        ? "Hari Ini"
        : d.toLocaleDateString("id-ID", { day: "2-digit", month: "long", year: "numeric" });
      groups[key] = groups[key] ? [...groups[key], r] : [r];
    }
    // keep chronological
    return Object.entries(groups).sort((a, b) => {
      const pa = new Date(a[1][0].dateISO).getTime();
      const pb = new Date(b[1][0].dateISO).getTime();
      return pa - pb;
    });
  }, [tab]);

  return (
    <div className="max-w-md mx-auto px-4 py-4 sm:max-w-2xl lg:max-w-3xl">
      {/* Top bar */}
      <div className="flex items-center gap-3 mb-4">
        <button className="rounded-full bg-gray-100 p-2 hover:bg-gray-200">
          <Info className="w-5 h-5 text-gray-600" />
        </button>
        <h1 className="text-lg font-semibold">Tebengan Mendatang</h1>
      </div>

      {/* Filter chips */}
      {/* Filter chips */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        <button className={chipClass(tab === "semua")} onClick={() => setTab("semua")}>Semua</button>
        <button className={chipClass(tab === "mobil")} onClick={() => setTab("mobil")}>Mobil</button>
        <button className={chipClass(tab === "motor")} onClick={() => setTab("motor")}>Motor</button>
        <button className={chipClass(tab === "barang")} onClick={() => setTab("barang")}>Barang</button>
        <button className={chipClass(tab === "tu")} onClick={() => setTab("tu")}>Barang (Transportasi Umum)</button>
      </div>


      {/* Groups */}
      <div className="mt-4 space-y-6">
        {grouped.map(([label, rides]) => (
          <section key={label} className="space-y-3">
            <h3 className="text-sm font-medium text-gray-600">{label}</h3>

            {rides.map((r) => {
              const meta = typeMeta[r.type];
              const days = daysDiff(r.dateISO);
              const isToday = label === "Hari Ini";
              return (
                <article
                  key={r.id}
                  className="rounded-2xl bg-white shadow-sm ring-1 ring-gray-100 p-3"
                >
                  {/* top row: code + badge + right: countdown (if today) */}
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-gray-500">Kode Pemesanan</span>
                      <span className="text-xs font-semibold text-blue-600 tracking-wide">
                        {r.code}
                      </span>
                    </div>
                    {isToday ? (
                      <Badge tone="blue">Hari Ini</Badge>
                    ) : (
                      <Badge tone="orange">{days} Hari Lagi</Badge>
                    )}
                  </div>

                  {/* title row */}
                  <div className="flex gap-3">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center ${meta.dot}`}
                    >
                      {meta.icon}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900 text-sm">
                        {r.title}
                      </h4>
                      <div className="mt-1 flex items-center gap-1 text-xs text-gray-600">
                        <MapPin className="w-4 h-4 text-gray-400" />
                        <span>{r.from}</span>
                        <span className="mx-1">›</span>
                        <span>{r.to}</span>
                      </div>

                      <div className="mt-2 flex flex-wrap items-center gap-3 text-xs text-gray-600">
                        <span className="flex items-center gap-1">
                          <Users className="w-4 h-4 text-gray-400" />
                          {r.paxLabel}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-4 h-4 text-gray-400" />
                          {isToday ? (
                            <Countdown target={r.dateISO} />
                          ) : (
                            <span>{formatDateLabel(r.dateISO)}</span>
                          )}
                        </span>
                      </div>
                    </div>

                    <button className="self-center rounded-full bg-gray-100 p-2 hover:bg-gray-200">
                      <ChevronRight className="w-4 h-4 text-gray-700" />
                    </button>
                  </div>
                </article>
              );
            })}
          </section>
        ))}
      </div>
    </div>
  );
}
