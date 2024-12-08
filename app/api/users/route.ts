import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { UserRole } from '@prisma/client';

export async function GET() {
  try {
    const users = await prisma.user.findMany({
      where: {
        role: UserRole.MANAGER,
        status: 'ACTIVE',
      },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
      },
    });

    return NextResponse.json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    return new NextResponse(
      JSON.stringify({ error: 'Failed to fetch users' }), 
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
} 