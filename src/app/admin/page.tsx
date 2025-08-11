'use client'

import { Card } from '@/components/Card'
import { ChartBar } from '../../components/Chart'
import { PopularDestinations } from '../../components/PopularDestinations'
import { ActivityLog } from '../../components/ActivityLog'

export default function AdminDashboard() {
  return (
    <div className="p-4 sm:p-6 bg-gray-50 min-h-screen pl-64">
      {/* Header */}
      <h1 className="text-xl sm:text-2xl font-bold mb-2 text-gray-900">Selamat Datang, Jaylon 👋</h1>
      <p className="text-sm sm:text-base text-gray-600 mb-6 sm:mb-8">
        Track aktivitas aplikasi nebeng disini. Semangat!
      </p>

      {/* Kartu Statistik */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8">
        <Card title="Total Perjalanan" value="280" icon="HiOutlineChartBar" />
        <Card title="Jumlah Customer" value="1.000" icon="HiOutlineUsers" />
        <Card title="Mitra" value="1.000" icon="HiOutlineUserCircle" />
        <Card title="Mitra Mendaftar" value="30" icon="HiOutlineClipboardList" />
      </div>

      {/* Chart + Destinasi Populer */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
        <div className="lg:col-span-2 bg-white p-4 sm:p-6 rounded-lg shadow-sm border">
          <ChartBar />
        </div>
        <div className="bg-white p-4 sm:p-6 rounded-lg shadow-sm border">
          <PopularDestinations />
        </div>
      </div>

      {/* Log Aktivitas */}
      <div className="mt-6 sm:mt-8">
        <ActivityLog />
      </div>
    </div>
  )
}
