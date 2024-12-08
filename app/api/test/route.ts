import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    // Try to count users
    const count = await prisma.user.count();
    return NextResponse.json({ success: true, userCount: count });
  } catch (error) {
    console.error('Database test error:', error);
    return NextResponse.json({ success: false, error: 'Database connection failed' }, { status: 500 });
  }
}