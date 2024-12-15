import Redis from "ioredis";

const globalForRedis = globalThis as unknown as {
  redis: Redis | undefined;
};

// Only create Redis client in production or if URL exists
export const redis: Redis | undefined =
  globalForRedis.redis ??
  (process.env.REDIS_URL && process.env.NODE_ENV === "production"
    ? new Redis(process.env.REDIS_URL, {
        maxRetriesPerRequest: 1,
        connectTimeout: 500,
        retryStrategy: (times) => Math.min(times * 50, 2000),
      })
    : undefined);

if (process.env.NODE_ENV !== "production" && process.env.REDIS_URL) {
  globalForRedis.redis = redis;
}
