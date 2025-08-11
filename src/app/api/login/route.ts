import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  const { email, password } = await req.json()

  const res = await fetch('http://localhost:3001/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  })

  const result = await res.json()
  if (!res.ok) {
    return NextResponse.json({ message: result.message }, { status: 401 })
  }

  return NextResponse.json(result)
}
