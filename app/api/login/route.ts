import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  const { password } = await request.json()

  if (password === process.env.ADMIN_PASSWORD) {
    const response = NextResponse.json({ ok: true })
    response.cookies.set('admin_auth', 'true', {
      httpOnly: true,
      path: '/',
      maxAge: 60 * 60 * 8, // 8 hours
    })
    return response
  }

  return NextResponse.json({ ok: false }, { status: 401 })
}
