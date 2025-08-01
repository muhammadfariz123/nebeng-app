"use client"

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface ServiceUsageChartProps {
  serviceUsageMonth: string
  setServiceUsageMonth: (month: string) => void
  // In a real app, you might pass dynamic percentages or data here
  nebengMobilPercentage: number
  nebengBarangPercentage: number
}

export function ServiceUsageChart({
  serviceUsageMonth,
  setServiceUsageMonth,
  nebengMobilPercentage,
  nebengBarangPercentage,
}: ServiceUsageChartProps) {
  // Calculate the conic gradient based on percentages
  const conicGradient = `conic-gradient(#3B82F6 0% ${nebengMobilPercentage}%, #F59E0B ${nebengMobilPercentage}% ${
    nebengMobilPercentage + nebengBarangPercentage
  }%, #10B981 ${nebengMobilPercentage + nebengBarangPercentage}% 100%)`

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Penggunaan Layanan</h3>
        <Select value={serviceUsageMonth} onValueChange={setServiceUsageMonth}>
          <SelectTrigger className="w-24">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="bulan">Bulan</SelectItem>
            <SelectItem value="jan">Januari</SelectItem>
            <SelectItem value="feb">Februari</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="flex justify-center items-center h-48 relative">
        {/* Donut Chart Simulation */}
        <div
          className="relative w-40 h-40 rounded-full flex items-center justify-center"
          style={{
            background: conicGradient,
          }}
        >
          <div className="absolute w-24 h-24 bg-white rounded-full"></div>
        </div>
      </div>
      <div className="flex justify-around mt-4 text-sm text-gray-700">
        <div className="flex items-center space-x-2">
          <span className="w-3 h-3 rounded-full bg-blue-600"></span>
          <span>Nebeng Mobil {nebengMobilPercentage}%</span>
        </div>
        <div className="flex items-center space-x-2">
          <span className="w-3 h-3 rounded-full bg-orange-500"></span>
          <span>Nebeng Barang {nebengBarangPercentage}%</span>
        </div>
      </div>
    </div>
  )
}
