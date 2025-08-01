'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function RegisterPage() {
  const router = useRouter()
  const [form, setForm] = useState({ email: '', username: '', password: '', user_type: 'Customer' })
  const [loading, setLoading] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      const res = await fetch('http://localhost:3000/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })

      const data = await res.json()

      if (res.ok) {
        alert('Registrasi berhasil! Silakan login.')
        router.push('/login')
      } else {
        alert(data.message || 'Registrasi gagal')
      }
    } catch (err) {
      console.error(err)
      alert('Terjadi kesalahan')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-10 space-y-4">
      <h2 className="text-xl font-bold">Daftar Akun Baru</h2>

      <input name="email" type="email" placeholder="Email" value={form.email} onChange={handleChange} required className="w-full border p-2 rounded" />
      <input name="username" type="text" placeholder="Username" value={form.username} onChange={handleChange} required className="w-full border p-2 rounded" />
      <input name="password" type="password" placeholder="Password" value={form.password} onChange={handleChange} required className="w-full border p-2 rounded" />

      <select name="user_type" value={form.user_type} onChange={handleChange} className="w-full border p-2 rounded">
        <option value="Customer">Customer</option>
        <option value="Driver">Driver</option>
        <option value="Admin">Admin</option>
        <option value="Finance">Finance</option>
        <option value="Superadmin">Superadmin</option>
      </select>

      <button type="submit" disabled={loading} className="w-full bg-blue-600 text-white p-2 rounded">
        {loading ? 'Mendaftarkan...' : 'Daftar'}
      </button>
    </form>
  )
}
