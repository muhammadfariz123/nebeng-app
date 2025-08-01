// src/components/Card.tsx
import { HiOutlineChartBar } from '@react-icons/all-files/hi/HiOutlineChartBar'
import { HiOutlineUsers } from '@react-icons/all-files/hi/HiOutlineUsers'
import { HiOutlineUserCircle } from '@react-icons/all-files/hi/HiOutlineUserCircle'
import { HiOutlineClipboardList } from '@react-icons/all-files/hi/HiOutlineClipboardList'

const icons = {
  HiOutlineChartBar,
  HiOutlineUsers,
  HiOutlineUserCircle,
  HiOutlineClipboardList
} as const

type Props = {
  title: string
  value: string
  icon: keyof typeof icons
}

export function Card({ title, value, icon }: Props) {
  const Icon = icons[icon]

  return (
    <div className="bg-white rounded-lg p-6 shadow-sm border hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between mb-3">
        <p className="text-sm text-gray-500 font-medium">{title}</p>
        <Icon className="w-6 h-6 text-blue-500" />
      </div>
      <p className="text-2xl font-bold text-gray-900">{value}</p>
    </div>
  )
}
