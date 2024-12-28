import redis from "./redis";

export async function getCachedData<T>(key: string): Promise<T | null> {
  if (!redis) return null;

  try {
    const data = await redis.get(key);
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error("Cache get error:", error);
    return null;
  }
}

export async function setCachedData(
  key: string,
  data: any,
  expirationInSeconds = 3600
): Promise<void> {
  if (!redis) return;

  try {
    await redis.setex(key, expirationInSeconds, JSON.stringify(data));
  } catch (error) {
    console.error("Cache set error:", error);
  }
}

export async function invalidateCache(key: string): Promise<void> {
  if (!redis) return;

  try {
    await redis.del(key);
  } catch (error) {
    console.error("Cache invalidation error:", error);
  }
}
