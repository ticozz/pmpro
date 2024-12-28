import Redis from "ioredis";

let redis: Redis | null = null;

// Only create Redis client if URL is provided
if (process.env.REDIS_URL) {
  try {
    redis = new Redis(process.env.REDIS_URL, {
      maxRetriesPerRequest: 1,
      enableOfflineQueue: false,
      retryStrategy: (times: number) => {
        // Don't retry in development if Redis is not available
        if (process.env.NODE_ENV === "development") {
          return null;
        }
        if (times > 3) {
          return null;
        }
        return Math.min(times * 50, 2000);
      },
    });

    redis.on("error", (error: Error) => {
      console.warn("Redis connection error:", error);
      if (process.env.NODE_ENV === "development") {
        redis = null;
      }
    });
  } catch (error) {
    console.warn("Redis initialization error:", error);
    redis = null;
  }
}

export default redis;
