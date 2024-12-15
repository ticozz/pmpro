import { Redis, RedisOptions } from "ioredis";
import { RateLimiterRedis } from "rate-limiter-flexible";

const redisOptions: RedisOptions = {
  host: process.env.REDIS_HOST || "localhost",
  port: parseInt(process.env.REDIS_PORT || "6379"),
  password: process.env.REDIS_PASSWORD,
  enableOfflineQueue: false,
};

const redisClient = new Redis(redisOptions);

export const rateLimiter = new RateLimiterRedis({
  storeClient: redisClient,
  keyPrefix: "middleware",
  points: 10, // 10 requests
  duration: 1, // per 1 second by IP
});

export async function checkRateLimit(ip: string) {
  try {
    await rateLimiter.consume(ip);
    return true;
  } catch (error) {
    return false;
  }
}
