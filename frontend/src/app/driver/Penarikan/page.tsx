"use client"

import { useState } from "react"

export default function Penarikan() {
  const [amount, setAmount] = useState("")
  const [account, setAccount] = useState("")

  const handleWithdraw = () => {
    // Logika untuk penarikan (misalnya, API call)
    console.log("Penarikan berhasil:", { amount, account })
  }

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-center mb-6">Penarikan</h2>
      
      <div className="mb-4">
        <label htmlFor="balance" className="block text-sm font-semibold text-gray-600">Saldo Saat Ini</label>
        <input
          type="text"
          id="balance"
          value="Rp 5.800.000"
          readOnly
          className="w-full p-3 mt-1 border border-gray-300 rounded-md text-gray-600 bg-gray-100"
        />
      </div>

      <div className="mb-4">
        <label htmlFor="amount" className="block text-sm font-semibold text-gray-600">Jumlah Penarikan</label>
        <input
          type="text"
          id="amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="w-full p-3 mt-1 border border-gray-300 rounded-md"
          placeholder="Masukkan jumlah"
        />
      </div>

      <div className="mb-4">
        <label htmlFor="account" className="block text-sm font-semibold text-gray-600">Pilih Rekening Tujuan</label>
        <select
          id="account"
          value={account}
          onChange={(e) => setAccount(e.target.value)}
          className="w-full p-3 mt-1 border border-gray-300 rounded-md"
        >
          <option value="">Pilih Rekening</option>
          <option value="BCA 1294587850">BCA 1294587850</option>
          <option value="BNI 1294587850">BNI 1294587850</option>
          <option value="Mandiri 1294587850">Mandiri 1294587850</option>
        </select>
      </div>

      <div className="text-center">
        <button
          onClick={handleWithdraw}
          className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 transition"
        >
          Tarik Dana
        </button>
      </div>
    </div>
  )
}
