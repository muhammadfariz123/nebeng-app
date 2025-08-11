"use client"

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface AnalysisChartProps {
  analysisData: { month: string; pendapatan: number; pengeluaran: number }[]
  analysisYear: string
  setAnalysisYear: (year: string) => void
}

export function AnalysisChart({ analysisData, analysisYear, setAnalysisYear }: AnalysisChartProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Analisis</h3>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <span className="w-3 h-3 rounded-full bg-green-500"></span>
            <span className="text-sm text-gray-600">Pendapatan</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="w-3 h-3 rounded-full bg-red-500"></span>
            <span className="text-sm text-gray-600">Pengeluaran</span>
          </div>
          <Select value={analysisYear} onValueChange={setAnalysisYear}>
            <SelectTrigger className="w-24">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="2024">2024</SelectItem>
              <SelectItem value="2023">2023</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      {/* Bar Chart Simulation */}
      <div className="h-64 flex items-end justify-around border-b border-l border-gray-200 pt-4 relative">
        {/* Y-axis labels */}
        <div className="absolute left-0 bottom-0 h-full flex flex-col justify-between text-xs text-gray-500 -ml-10 pb-2">
          <span>2.500K</span>
          <span>2.000K</span>
          <span>1.500K</span>
          <span>1.000K</span>
          <span>500K</span>
          <span>0</span>
        </div>
        {analysisData.map((data) => (
          <div key={data.month} className="flex flex-col items-center w-10 mx-1">
            <div className="flex items-end h-full w-full">
              <div
                className="w-4 bg-green-500 rounded-t-sm"
                style={{ height: `${(data.pendapatan / 2500) * 100}%` }}
              ></div>
              <div
                className="w-4 bg-red-500 rounded-t-sm ml-1"
                style={{ height: `${(data.pengeluaran / 2500) * 100}%` }}
              ></div>
            </div>
            <span className="text-xs text-gray-600 mt-2">{data.month}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
