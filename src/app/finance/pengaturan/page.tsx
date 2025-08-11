"use client"

import { useState } from "react"
import Image from "next/image"
import { ChevronDown, Eye, EyeOff } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"

export default function PengaturanPage() {
  const [activeTab, setActiveTab] = useState("profil")
  const [showOldPassword, setShowOldPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const renderContent = () => {
    switch (activeTab) {
      case "profil":
        return (
          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-6">Informasi Pribadi</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="namaDepan">Nama Depan</Label>
                <Input id="namaDepan" defaultValue="Gustavo" />
              </div>
              <div>
                <Label htmlFor="namaBelakang">Nama Belakang</Label>
                <Input id="namaBelakang" defaultValue="Dorwart" />
              </div>
              <div className="md:col-span-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" defaultValue="GustavoDorwart@gmail.com" />
              </div>
              <div className="md:col-span-2">
                <Label htmlFor="alamat">Alamat</Label>
                <Input id="alamat" defaultValue="Jl. Ateka No.47, Sewon, Bantul, DIY" />
              </div>
              <div>
                <Label htmlFor="nomorTelepon">Nomor Telepon</Label>
                <Input id="nomorTelepon" defaultValue="(+62) 8128084822" />
              </div>
              <div>
                <Label htmlFor="tanggalLahir">Tanggal Lahir</Label>
                <Input id="tanggalLahir" type="date" defaultValue="1990-06-21" />
              </div>
              <div>
                <Label htmlFor="kota">Kota</Label>
                <Input id="kota" defaultValue="Daerah Istimewa Yogyakarta" />
              </div>
              <div>
                <Label htmlFor="bahasa">Bahasa</Label>
                <Select defaultValue="id">
                  <SelectTrigger id="bahasa">
                    <SelectValue placeholder="Pilih Bahasa" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="id">Bahasa Indonesia</SelectItem>
                    <SelectItem value="en">English</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="flex justify-end space-x-4 mt-8">
              <Button variant="outline" className="border-blue-600 text-blue-600 hover:bg-blue-50 bg-transparent">
                Buang Perubahan
              </Button>
              <Button className="bg-blue-600 hover:bg-blue-700 text-white">Simpan Perubahan</Button>
            </div>
          </div>
        )
      case "password":
        return (
          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-6">Password Akun</h3>
            <p className="text-gray-600 mb-6">
              Silahkan masukkan password lama dan password baru Anda untuk mengubah password baru.
            </p>
            <div className="space-y-4">
              <div className="relative">
                <Label htmlFor="passwordLama">Password Lama</Label>
                <Input id="passwordLama" type={showOldPassword ? "text" : "password"} className="pr-10" />
                <button
                  type="button"
                  onClick={() => setShowOldPassword(!showOldPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 top-6"
                >
                  {showOldPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
              <div className="relative">
                <Label htmlFor="passwordBaru">Password Baru</Label>
                <Input id="passwordBaru" type={showNewPassword ? "text" : "password"} className="pr-10" />
                <button
                  type="button"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 top-6"
                >
                  {showNewPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
              <div className="relative">
                <Label htmlFor="konfirmasiPasswordBaru">Konfirmasi Password Baru</Label>
                <Input id="konfirmasiPasswordBaru" type={showConfirmPassword ? "text" : "password"} className="pr-10" />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 top-6"
                >
                  {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>
            <div className="flex justify-end mt-8">
              <Button className="bg-blue-600 hover:bg-blue-700 text-white">Simpan</Button>
            </div>
          </div>
        )
      case "keamanan":
        return (
          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-6">Keamanan Akun</h3>
            <ul className="list-decimal pl-5 space-y-4 text-gray-700">
              <li>
                <p className="font-medium">Kebijakan Kata Sandi</p>
                <ul className="list-disc pl-5 text-sm text-gray-600">
                  <li>Pastikan kata sandi akun Anda kuat dengan mengikuti kebijakan keamanan:</li>
                  <li>Minimal 6 karakter</li>
                  <li>Kombinasi huruf besar, huruf kecil, angka, dan simbol.</li>
                  <li>Anda juga dapat mengatur masa berlaku kata sandi untuk memastikan pembaruan berkala.</li>
                </ul>
              </li>
              <li>
                <p className="font-medium">Notifikasi Aktivitas Mencurigakan</p>
                <ul className="list-disc pl-5 text-sm text-gray-600">
                  <li>
                    Aktifkan notifikasi otomatis yang akan mengirimkan pemberitahuan jika ada aktivitas mencurigakan di
                    akun Anda, seperti percobaan login yang gagal atau perubahan informasi penting.
                  </li>
                </ul>
              </li>
              <li>
                <p className="font-medium">Kontrol Akses Berbasis Peran (RBAC)</p>
                <ul className="list-disc pl-5 text-sm text-gray-600">
                  <li>
                    Batasi akses hanya untuk admin yang memiliki izin sesuai peran. Admin dengan hak tertentu dapat
                    melakukan pengaturan, sedangkan admin lain memiliki akses yang terbatas.
                  </li>
                </ul>
              </li>
              <li>
                <p className="font-medium">Log Aktivitas</p>
                <ul className="list-disc pl-5 text-sm text-gray-600">
                  <li>
                    Pantau setiap perubahan yang dilakukan di sistem melalui log aktivitas. Anda dapat melihat siapa
                    yang melakukan perubahan, kapan, dan dari mana aktivitas tersebut dilakukan.
                  </li>
                </ul>
              </li>
              <li>
                <p className="font-medium">Pengaturan Timeout Otomatis</p>
                <ul className="list-disc pl-5 text-sm text-gray-600">
                  <li>
                    Untuk melindungi akun saat tidak digunakan, aktifkan timeout otomatis yang akan mengeluarkan admin
                    dari sistem setelah periode tertentu tanpa aktivitas.
                  </li>
                </ul>
              </li>
              <li>
                <p className="font-medium">Pengelolaan IP Terpercaya</p>
                <ul className="list-disc pl-5 text-sm text-gray-600">
                  <li>
                    Batasi akses ke halaman admin hanya dari alamat IP yang terverifikasi. Ini akan membantu mengurangi
                    risiko akses tidak sah dari perangkat atau lokasi yang tidak dikenal.
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        )
      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">

      <div className="flex">
        {/* Main Content */}
        <div className="flex-1 p-6">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Pengaturan</h2>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 flex flex-col md:flex-row gap-6">
            {/* Left Navigation / Profile Card */}
            <div className="w-full md:w-64 flex-shrink-0">
              <div className="flex flex-col items-center mb-6">
                <div className="relative w-24 h-24 rounded-full overflow-hidden border-2 border-blue-600">
                  <Image
                    src="/placeholder.svg?height=96&width=96"
                    alt="Profile Picture"
                    width={96}
                    height={96}
                    className="object-cover"
                  />
                  <div className="absolute bottom-0 right-0 bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">
                    2
                  </div>
                </div>
                <p className="mt-3 text-lg font-semibold text-gray-900">Gustavo Dorwart</p>
                <p className="text-sm text-gray-500">Finance</p>
              </div>

              <nav className="space-y-1">
                <Button
                  variant="ghost"
                  className={`w-full justify-start text-base px-4 py-2 ${
                    activeTab === "profil"
                      ? "bg-blue-100 text-blue-600 hover:bg-blue-100"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                  onClick={() => setActiveTab("profil")}
                >
                  Profil
                </Button>
                <Button
                  variant="ghost"
                  className={`w-full justify-start text-base px-4 py-2 ${
                    activeTab === "password"
                      ? "bg-blue-100 text-blue-600 hover:bg-blue-100"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                  onClick={() => setActiveTab("password")}
                >
                  Password
                </Button>
                <Button
                  variant="ghost"
                  className={`w-full justify-start text-base px-4 py-2 ${
                    activeTab === "keamanan"
                      ? "bg-blue-100 text-blue-600 hover:bg-blue-100"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                  onClick={() => setActiveTab("keamanan")}
                >
                  Keamanan Akun
                </Button>
              </nav>
            </div>

            {/* Right Content Area */}
            <div className="flex-1 p-6 border border-gray-200 rounded-lg">{renderContent()}</div>
          </div>
        </div>
      </div>
    </div>
  )
}
