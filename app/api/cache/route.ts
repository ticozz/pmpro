import { NextResponse } from "next/server";
import redis from "@/lib/redis";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  if (!redis) {
    return NextResponse.json({ error: "Cache not available" }, { status: 503 });
  }

  try {
    const url = new URL(request.url);
    const key = url.searchParams.get("key");

    if (!key) {
      return NextResponse.json({ error: "Key required" }, { status: 400 });
    }

    const data = await redis.get(key);
    return NextResponse.json({ data: data ? JSON.parse(data) : null });
  } catch (error) {
    console.error("Cache GET error:", error);
    return NextResponse.json(
      { error: "Failed to fetch from cache" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  if (!redis) {
    return NextResponse.json({ error: "Cache not available" }, { status: 503 });
  }

  try {
    const { key, value, expirationInSeconds = 3600 } = await request.json();

    if (!key || value === undefined) {
      return NextResponse.json(
        { error: "Key and value required" },
        { status: 400 }
      );
    }

    await redis.setex(key, expirationInSeconds, JSON.stringify(value));
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Cache POST error:", error);
    return NextResponse.json(
      { error: "Failed to write to cache" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  if (!redis) {
    return NextResponse.json({ error: "Cache not available" }, { status: 503 });
  }

  try {
    const url = new URL(request.url);
    const key = url.searchParams.get("key");

    if (!key) {
      return NextResponse.json({ error: "Key required" }, { status: 400 });
    }

    await redis.del(key);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Cache DELETE error:", error);
    return NextResponse.json(
      { error: "Failed to delete from cache" },
      { status: 500 }
    );
  }
}
