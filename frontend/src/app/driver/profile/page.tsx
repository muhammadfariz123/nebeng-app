"use client"

import { useState } from "react"

export default function Profil() {
  const [name, setName] = useState("John Doe")
  const [email, setEmail] = useState("johndoe@example.com")
  const [phone, setPhone] = useState("081234567890")
  const [address, setAddress] = useState("Jl. Contoh No.123, Jakarta")
  
  const handleSave = () => {
    // Simulasikan menyimpan perubahan (misalnya, API call)
    console.log("Profil diperbarui:", { name, email, phone, address })
  }

  return (
    <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-lg">
      <div className="flex justify-center mb-8">
        <div className="w-24 h-24 rounded-full bg-gray-300"></div> {/* Placeholder gambar profil */}
      </div>
      
      <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">Profil Saya</h2>
      
      <div className="space-y-6">
        {/* Nama */}
        <div className="flex flex-col">
          <label htmlFor="name" className="text-lg font-semibold text-gray-700">Nama Lengkap</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="p-4 mt-2 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Masukkan nama lengkap"
          />
        </div>

        {/* Email */}
        <div className="flex flex-col">
          <label htmlFor="email" className="text-lg font-semibold text-gray-700">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="p-4 mt-2 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Masukkan email"
          />
        </div>

        {/* Nomor Telepon */}
        <div className="flex flex-col">
          <label htmlFor="phone" className="text-lg font-semibold text-gray-700">Nomor Telepon</label>
          <input
            type="tel"
            id="phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="p-4 mt-2 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Masukkan nomor telepon"
          />
        </div>

        {/* Alamat */}
        <div className="flex flex-col">
          <label htmlFor="address" className="text-lg font-semibold text-gray-700">Alamat</label>
          <textarea
            id="address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="p-4 mt-2 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Masukkan alamat lengkap"
            rows={4}
          />
        </div>

        {/* Tombol Simpan */}
        <div className="text-center mt-8">
          <button
            onClick={handleSave}
            className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition duration-300"
          >
            Simpan Perubahan
          </button>
        </div>
      </div>
    </div>
  )
}
