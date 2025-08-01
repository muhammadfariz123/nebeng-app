'use client'

import { useState } from 'react'

interface FilterDropdownProps {
  label?: string
  value: string
  onChange: (value: string) => void
  options: string[]
}

export default function FilterDropdown({
  label = 'Filter',
  value,
  onChange,
  options,
}: FilterDropdownProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="relative inline-block text-left">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-2 border border-gray-300 bg-white text-sm rounded-md shadow-sm"
      >
        <span>🔽</span>
        {value || label}
      </button>

      {isOpen && (
        <ul className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg">
          {options.map((option) => (
            <li
              key={option}
              onClick={() => {
                onChange(option)
                setIsOpen(false)
              }}
              className={`px-4 py-2 cursor-pointer hover:bg-gray-100 text-sm ${
                value === option ? 'font-semibold text-blue-600' : 'text-gray-700'
              }`}
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
