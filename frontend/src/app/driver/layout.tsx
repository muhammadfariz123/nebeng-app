"use client";

import SidebarDriver from "@/components/SidebarDriver";

export default function DriverLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <SidebarDriver />

      {/* Konten Utama */}
      <main className="flex-1 p-4 md:p-6 lg:ml-64 transition-all duration-300">
        {children}
      </main>
    </div>
  );
}
