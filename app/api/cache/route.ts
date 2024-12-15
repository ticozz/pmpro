import { NextResponse } from "next/server";
import { redis } from "@/lib/redis";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const key = searchParams.get("key");

  if (!key) {
    return NextResponse.json({ error: "Key required" }, { status: 400 });
  }

  const value = await redis?.get(key);
  return NextResponse.json({ value: value ? JSON.parse(value) : null });
}

export async function POST(request: Request) {
  const { key, value, ttl = 3600 } = await request.json();

  if (!key || !value) {
    return NextResponse.json(
      { error: "Key and value required" },
      { status: 400 }
    );
  }

  await redis?.setex(key, ttl, JSON.stringify(value));
  return NextResponse.json({ success: true });
}
