import { NextResponse } from 'next/server'

export async function POST() {
  try {
    const response = NextResponse.json({ message: 'Signed out successfully' })
    response.cookies.set('token', '', { maxAge: -1 }) // Clear the token cookie
    return response
  } catch (error) {
    return NextResponse.json({ message: 'Sign out failed' }, { status: 500 })
  }
} 