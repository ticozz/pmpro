import { NextResponse } from "next/server";
import { cookies } from 'next/headers';

export const dynamic = 'force-dynamic';

export async function POST() {
  try {
    cookies().delete('token');
    
    return new NextResponse(
      JSON.stringify({ message: "Logged out successfully" }), 
      { status: 200 }
    );
  } catch (error) {
    console.error('Logout error:', error);
    return new NextResponse(
      JSON.stringify({ error: "Failed to logout" }), 
      { status: 500 }
    );
  }
} 