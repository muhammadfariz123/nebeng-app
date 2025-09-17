"use client"

import { Card, CardContent, CardTitle } from "@/components/ui/card"
import '@fortawesome/fontawesome-free/css/all.min.css';

export default function DriverDashboard() {
  return (
    <div className=" ">
      {/* Header */}
      <div className="bg-blue-600 text-white rounded-lg mb-8 shadow-lg flex items-center justify-between">
        <div className="flex flex-col">
          <div className="p-5">
            <p>Selamat Pagi,</p>
            <h1 className="text-3xl font-bold">Omar Vetrov</h1>
          </div>
          <div className="flex justify-between items-center px-5 -mb-20" >
            <div className="text-black bg-white p-5 pr-253 w-full rounded-lg shadow-lg">
              <p className="text-xl">Pendapatan</p>
              <div className="text-4xl font-semibold mt-4">Rp 0</div>
            </div>
          </div>
        </div>
      </div>

      {/* Buat Tebengan */}
      <div className="text-center mb-8 pt-20">
        <h3 className="text-xl font-semibold mb-4 p-10">Buat Tebengan</h3>
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-8">
          <button className="p-4 rounded-lg flex flex-col items-center">
            <div className="bg-green-100 text-white rounded-full p-5 px-8 mb-5 hover:shadow-xl hover:scale-105 transition-transform duration-300 ease-in-out">
              <img src="motor.png" alt="Motor" className="w-8 h-12" />
            </div>
            <span>Motor</span>
          </button>
          <button className="p-4 rounded-lg flex flex-col items-center">
            <div className="bg-blue-100 text-white rounded-full p-5 mb-5 hover:shadow-xl hover:scale-105 transition-transform duration-300 ease-in-out">
              <img src="mobil.png" alt="Mobil" className="w-12 h-12" />
            </div>
            <span>Mobil</span>
          </button>
          <button className="p-4 rounded-lg flex flex-col items-center">
            <div className="bg-yellow-100 text-white rounded-full p-5 mb-5 hover:shadow-xl hover:scale-105 transition-transform duration-300 ease-in-out">
              <img src="barang.png" alt="Barang" className="w-12 h-12" />
            </div>
            <span>Barang</span>
          </button>
          <button className="p-4 rounded-lg flex flex-col items-center">
            <div className="bg-red-100 text-white rounded-full p-5 py-7 mb-5 hover:shadow-xl hover:scale-105 transition-transform duration-300 ease-in-out">
              <img src="barang_tu.png" alt="Transportasi Umum" className="w-12 h-8" />
            </div>
            <span>Transportasi Umum</span>
          </button>
        </div>
      </div>


      {/* Tebengan Mendatang */}
      <div className="text-center mt-8 pb-20 pt-10">
        <h3 className="text-xl font-semibold mb-4 p-10">Tebengan Mendatang</h3>
        <div className="bg-blue-100 p-6 rounded-lg inline-block px-20">
          <img src="beranda_kosong.png" alt="No Bookings" className="mx-auto -mt-10 -mb-6" />
        </div>
        <div className="p-6">
          <h3 className="text-xl font-semibold">Belum ada tebengan</h3>
          <p className="text-lg">Buat tebengan dulu yuk!</p>
        </div>
      </div>
    </div>
  );
}
