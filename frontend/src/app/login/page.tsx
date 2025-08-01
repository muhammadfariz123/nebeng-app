'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'
import axios from 'axios'
import { FaEye, FaEyeSlash } from 'react-icons/fa'

type UserResponse = {
  user: {
    id: number
    email: string
    username: string
    user_type: 'Superadmin' | 'Admin' | 'Finance' | 'Customer' | 'Driver'
  }
  message: string
}

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const res = await axios.post<UserResponse>('http://localhost:3000/auth/login', {
        email,
        password,
      })

      const { user } = res.data

      switch (user.user_type) {
        case 'Superadmin':
          router.push('/superadmin')
          break
        case 'Admin':
          router.push('/admin')
          break
        case 'Finance':
          router.push('/finance')
          break
        case 'Customer':
          router.push('/customer')
          break
        case 'Driver':
          router.push('/driver')
          break
        default:
          router.push('/')
      }
    } catch (error) {
      console.error('Login gagal:', error)
      alert('Email atau password salah')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="relative flex items-center justify-center min-h-screen overflow-hidden bg-gradient-to-br from-blue-500 via-purple-600 to-pink-500 animate-gradient-xy">
      {/* Background animasi */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-indigo-400 via-purple-500 to-pink-500 opacity-60 animate-gradient-move z-0" />

      {/* Form Login */}
      <div className="relative z-10 bg-white p-10 rounded-xl shadow-lg w-full max-w-md backdrop-blur-md">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-2">Masuk</h2>
        <p className="text-sm text-center text-gray-500 mb-6">Masukkan email dan password anda</p>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="text-sm font-medium text-gray-700">Email / Username</label>
            <input
              type="email"
              className="w-full mt-1 p-3 border border-gray-300 rounded-lg bg-gray-50 text-sm text-gray-800"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="example@mail.com"
              required
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700">Password</label>
            <div className="relative mt-1">
              <input
                type={showPassword ? 'text' : 'password'}
                className="w-full p-3 border border-gray-300 rounded-lg bg-gray-50 text-sm text-gray-800 pr-10"
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="••••••••"
                required
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
            <div className="text-right mt-2">
              <a className="text-sm text-blue-600 hover:underline cursor-pointer">Lupa Password?</a>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full ${
              loading ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700'
            } text-white p-3 rounded-lg text-sm font-semibold transition`}
          >
            {loading ? 'Memproses...' : 'Masuk'}
          </button>
        </form>

        {/* Link ke Register */}
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Belum punya akun?{' '}
            <button
              className="text-blue-600 hover:underline font-medium"
              onClick={() => router.push('/register')}
            >
              Daftar di sini
            </button>
          </p>
        </div>
      </div>
    </div>
  )
}
